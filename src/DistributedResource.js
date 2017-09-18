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


class DistributedResource extends IResource
{
    destroy()
    {
        this.destroyed = true;
        this._emit("destroy");
    }



    constructor(connection, template, instanceId, age)
    {
        super();

        this._p = {
            isAttached: false,
            connection: connection,
            instanceId: instanceId,
            age: age,
            template: template
        };
    }

    _attached(properties)
    {

        if (this._isAttached)
            return false;
        else
        {
            this._p.properties = properties;
            this._p.ages = new Uint32Array(properties.length);
            //this.events = [];//new [this.template.events.length];
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

            for(var i = 0; i < this._p.template.functions.length; i++)
            {
                var ft = this._p.template.functions[i];
                this[ft.name] = makeFunc(ft.index);
            }

            for(var i = 0; i < this._p.template.properties.length; i++)
            {
                var pt = this._p.template.properties[i];

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
        var et = this._p.template.getEventTemplateByIndex(index);
        this._emit(et.name, args);
        this.instance.emitResourceEvent(et.name, null, args);
    }

    _invoke(index, args) {
        if (this.destroyed)
            throw new Exception("Trying to access destroyed object");

        if (index >= this._p.template.functions.length)
            throw new Exception("Function index is incorrect");

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

    }


    _get(index)
    {
        if (index >= this._p.properties.length)
            return null;
        return this._p.properties[index];
    }



    _updatePropertyByIndex(index, value)
    {
        var pt = this._p.template.getPropertyTemplateByIndex(index);
        this._p.properties[index] = value;
        this.instance.modified(pt.name, value);
    }

    _set(index, value)
    {
        if (index >= this._p.properties.length)
            return null;

        var reply = new AsyncReply();

        var parameters = Codec.compose(value, this._p.connection);
        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.SetProperty,
            BL().addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters))
            .then(function(res)
        {
            // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
            //Update(index, value);
            reply.trigger(null);
        // nothing to do here
    });

        return reply;
    }
}