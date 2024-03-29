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
 * Created by Ahmed Zamil on 05/09/2017.
 */

"use strict";  
import IEventHandler from '../Core/IEventHandler.js';
import IDestructible from '../Core/IDestructible.js';

export default class AutoMap extends IEventHandler
{
    constructor()
    {
        super();
        this.dic = {};
    }

    add(key, value)
    {
        if (value instanceof IDestructible)
            value.on("destroy", this.#_item_destroyed);

        this.dic[key] = value;

        this._emit("add", key, value);
    }

    set(key, value)
    {
        if (this.dic[key] !== undefined)
            this.remove(key);

        this.add(key, value);
    }

    remove(key)
    {
        if (this.dic[key] !== undefined) {
            if (this.dic[key] instanceof IDestructible)
                this.dic[key].off("destroy", this.#_item_destroyed);

            delete this.dic[key];
        }
    }

    #_item_destroyed = function(sender)
    {
        this.remove(sender);
    }
}