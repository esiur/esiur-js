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

export default class AutoList extends IEventHandler
{
    constructor()
    {
        super();
        this.list = [];
    }

    get length()
    {
        return this.list.length;
    }

    add(value)
    {
        if (value instanceof IDestructible)
            value.on("destroy", this.#_item_destroyed, this);

        this.list.push(value);

        this._emit("add", value);
    }

    set(index, value)
    {
        if (index >= this.list.length || index < 0)
            return;

        if (value instanceof IDestructible)
            value.on("destroy", this.#_item_destroyed, this);

        if (this.list[index] instanceof IDestructible)
            this.list[index].off("destroy", this.#_item_destroyed);

        this.list[index] = value;
    }

    at(index)
    {
        return this.list[index];
    }

    item(index)
    {
        return this.list[index];
    }
    
    first(selector){
        for(var el of this.list)
            if (selector(el))
                return el;
    }
    
    remove(value)
    {
        this.removeAt(this.list.indexOf(value));
    }

    contains(value)
    {
        return this.list.indexOf(value) > -1;
    }

    toArray()
    {
        return this.list.slice(0);
    }

    removeAt(index)
    {
        if (index >= this.list.length || index < 0)
            return;

        var item = this.list[index];

        if (item instanceof IDestructible)
            item.off("destroy", this.#_item_destroyed);

        this.list.splice(index, 1);

        this._emit("remove", item);
    }

    #_item_destroyed = function(sender)
    {
        this.remove(sender);
    }
}