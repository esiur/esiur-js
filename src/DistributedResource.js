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

class DistributedResource extends IResource
{
    destroy()
    {
        this.destroyed = true;
        this._emit("destroy", this);
    }

    constructor(connection, instanceId, age, link)
    {
        super();

        this._p = {
            isAttached: false,
            connection: connection,
            instanceId: instanceId,
            age: age,
            link: link,
            properties: []
        };
    }

    _serialize()
    {
        var props = [];

        for (var i = 0; i < this._p.properties.length; i++)
            props.push(new PropertyValue(this._p.properties[i], 
                                         this.instance.getAge(i), 
                                         this.instance.getModificationDate(i)));
        
        return props;
    }

    _attached(properties)
    {

        if (this._isAttached)
            return false;
        else
        { 
            for(var i = 0; i  < properties.length; i++)
            {
                this.instance.setAge(i, properties[i].age);
                this.instance.setModificationDate(i, properties[i].date);
                this._p.properties.push(properties[i].value);
            }


            this._p.isAttached = true;

            var self = this;

            var makeFunc = function(index)
            {
              return function () {
                  return self._invoke(index, arguments);
              };
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

            for(var i = 0; i < this.instance.template.functions.length; i++)
            {
                var ft = this.instance.template.functions[i];
                this[ft.name] = makeFunc(ft.index);
            }

            for(var i = 0; i < this.instance.template.properties.length; i++)
            {
                var pt = this.instance.template.properties[i];

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

    _emitEventByIndex(index, args)
    {
        var et = this.instance.template.getEventTemplateByIndex(index);
        this._emitArgs(et.name, args);
        this.instance._emitResourceEvent(null, null, et.name, args);
    }

    _invoke(index, args) {
        if (this.destroyed)
            throw new Exception("Trying to access destroyed object");

        if (index >= this.instance.template.functions.length)
            throw new Exception("Function index is incorrect");

        return this._p.connection.sendInvoke(this._p.instanceId, index, args);

        /*
        var reply = new AsyncReply();

        var parameters = Codec.composeVarArray(args, this._p.connection, true);

        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.InvokeFunction,
                BL().addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters))
            .then(function (res) {
                Codec.parse(res[0], 0, self._p.connection).then(function (rt) {
                reply.trigger(rt);
            });
        });


        return reply;
        */
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
    }

    _set(index, value)
    {
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