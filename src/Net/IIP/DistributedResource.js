/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";  

import IResource from '../../Resource/IResource.js';
import AsyncReply from '../../Core/AsyncReply.js';
import Codec from '../../Data/Codec.js';
import IIPPacketAction from '../Packets//IIPPacketAction.js';
import EventTemplate from '../../Resource/Template/EventTemplate.js';
import AsyncException from '../../Core/AsyncException.js';
import ExceptionCode from '../../Core//ExceptionCode.js';
import ErrorType from '../../Core/ErrorType.js';
import {UInt8} from '../../Data/ExtendedTypes.js';
import TypedMap from '../../Data/TypedMap.js';
import PropertyValueArray from '../../Data/PropertyValueArray.js';
import PropertyValue  from '../../Data/PropertyValue.js';

export default class DistributedResource extends IResource
{
    destroy()
    {
        this.destroyed = true;
        this._p.attached = false;
        this._p.connection.sendDetachRequest(this._p.instanceId);
        this._emit("destroy", this);
    }

    _suspend()
    {
      this._p.suspended = true;
      this._p.attached = false;
    }

    trigger(type)
    {
        return new AsyncReply(true);
    }

    constructor(connection, instanceId, age, link)
    {
        super();

        this._p = {
            suspended: false,
            attached: false,
            connection: connection,
            instanceId: instanceId,
            age: age,
            link: link,
            properties: []
        };
    }

    _serialize()
    {
        var props = new PropertyValueArray();

        for (var i = 0; i < this._p.properties.length; i++)
            props.push(new PropertyValue(this._p.properties[i], 
                                         this.instance.getAge(i), 
                                         this.instance.getModificationDate(i)));
        
        return props;
    }

    _attach(properties)
    {

        if (this._p.attached)
        {
            console.log("Already attached.");
            return false;
        }
        else
        { 

            this._p.attached = true;

            this._p.suspended = false;

            this._p.properties = [];
            
            for(let i = 0; i  < properties.length; i++)
            {
                this.instance.setAge(i, properties[i].age);
                this.instance.setModificationDate(i, properties[i].date);
                this._p.properties.push(properties[i].value);
            }



            var self = this;

            var makeFunc = function(ft)
            {
              var func = function () {

                var argsMap = new (TypedMap.of(UInt8, Object));

                  if (   arguments.length == 1 
                      && arguments[0] instanceof Object 
                      && arguments[0].constructor.name == "Object")
                  {
                      
                      let argsObj = arguments[0];
                      // named args
                      for (let i = 0; i < ft.args.length; i++){
                            let arg = ft.args[i];
                            if (argsObj[arg.name] != undefined) {
                                argsMap.set(new UInt8(arg.index), argsObj[arg.name]);
                            }
                        }

                      return self._invoke(ft.index, argsMap);
                  }
                  else
                  {
                      for(let i = 0; (i < arguments.length) && (i < ft.args.length); i++)
                        argsMap.set(new UInt8(i), arguments[i]);
                      return self._invoke(ft.index, argsMap);
                  }
              };

              // get annotation
              func.help = self.instance.template.functions[ft.index].annotation;
              return func;
            };

            var makeGetter = function(index)
            {
                return function () {
                    return self._get(index);
                };
            };

            var makeSetter = function(index)
            {
                return function (value) {
                    self._set(index, value);
                };
            };

            for(let i = 0; i < this.instance.template.functions.length; i++)
            {
                let ft = this.instance.template.functions[i];
                this[ft.name] = makeFunc(ft);
            }

            for(let i = 0; i < this.instance.template.properties.length; i++)
            {
                let pt = this.instance.template.properties[i];

                Object.defineProperty(this, pt.name, {
                    get: makeGetter(pt.index),
                    set: makeSetter(pt.index),
                    enumerable: true,
                    configurable: true
                });

            }
        }
        return true;
    }

    listen(event)
    {
      let et = event instanceof EventTemplate ? event : this.instance.template.getEventTemplateByName(event);
  
      if (et == null)
          return new AsyncReply().triggerError(new AsyncException(ErrorType.Management, ExceptionCode.MethodNotFound, ""));
  
      if (!et.listenable)
          return new AsyncReply().triggerError(new AsyncException(ErrorType.Management, ExceptionCode.NotListenable, ""));
  
      return this._p.connection.sendListenRequest(this._p.instanceId, et.index);  
    }
  
    unlisten(event)
    {  
      let et = event instanceof EventTemplate ? event : this.instance.template.getEventTemplateByName(event);
  
      if (et == null)
          return new AsyncReply().triggerError(new AsyncException(ErrorType.Management, ExceptionCode.MethodNotFound, ""));
  
      if (!et.listenable)
          return  new AsyncReply().triggerError(new AsyncException(ErrorType.Management, ExceptionCode.NotListenable, ""));
  
      return this._p.connection.sendUnlistenRequest(this._p.instanceId, et.index);
    }

    _emitEventByIndex(index, args)
    {
        var et = this.instance.template.getEventTemplateByIndex(index);
        //@TODO if  array _emitArgs
        //this._emitArgs(et.name, [args]);
        this._emit(et.name, args);
        this.instance._emitResourceEvent(null, null, et, args);
    }

    _invoke(index, args) {
        if (this.destroyed)
            throw new Error("Trying to access destroyed object");

        if (this._p.suspended)
            throw new Error("Trying to access suspended object");

        if (index >= this.instance.template.functions.length)
            throw new Error("Function index is incorrect");

        return this._p.connection.sendInvoke(this._p.instanceId, index, args);
    }

    _get(index)
    {
        if (index >= this._p.properties.length)
            return null;
        return this._p.properties[index];
    }


    _updatePropertyByIndex(index, value)
    {
        var pt = this.instance.template.getPropertyTemplateByIndex(index);
        this._p.properties[index] = value;
        this.instance.emitModification(pt, value);

        // this to invoke other property setters
        this._p.neglect = true;
        this[pt.name] = null;
        this._p.neglect = false;
    }

    _set(index, value)
    {
        if (!this._p.attached)
        {
            console.log("Resource not attached.");
            return;
        }

        if (this._p.neglect)
            return;

        if (index >= this._p.properties.length)
            return null;

        var reply = new AsyncReply();

        var parameters = Codec.compose(value, this._p.connection);
        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.SetProperty)
            .addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters)
            .done()
            .then(function(res)
        {
            // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
            self._p.properties[index] = value;
            reply.trigger(null);
        });

        return reply;
    }
}