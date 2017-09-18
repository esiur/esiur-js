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
 * Created by Ahmed Zamil on 30/08/2017.
 */

class IEventHandler
{
    _register(event)
    {
        this._events[event] = [];
    }

    constructor()
    {
        this._events = {};
    }

    _emit(event)
    {
        event = event.toLowerCase();
        var args = Array.prototype.slice.call(arguments, 1);
        if (this._events[event])
            for(var i = 0; i < this._events[event].length; i++)
                if (this._events[event][i].apply(this, args))
                    return true;

        return false;
    }

    on(event, fn)
    {
        event = event.toLowerCase();
        // add
        if (!this._events[event])
            this._events[event] = [];
        this._events[event].push(fn);
        return this;
    }

    off(event, fn)
    {
        event = event.toLocaleString();
        if (this._events[event])
        {
            if (fn)
            {
                var index = this._events[event].indexOf(fn);
                if (index > -1)
                this._events[event].splice(index, 1);
            }
            else
            {
                this._events[event] = [];
            }
        }
    }
}