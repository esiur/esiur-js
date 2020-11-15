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
 * Created by Ahmed Zamil on 06/11/2017.
 */

"use strict";  
import IDestructible from '../Core/IDestructible.js';

export default class KeyList
 {
     constructor()
     {
         this.keys = [];
         this.values = [];
     }

     toObject()
     {
        var rt = {};
        for(var i = 0; i < this.keys.length; i++)
            rt[this.keys[i]]=this.values[i];
        return rt;
     }

     at(index)
     {
        return this.values[index];
     }

     item(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return this.values[i];
     }

     get(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return this.values[i];
     }

     _item_destroyed(sender)
     {
         for(var i = 0; i < this.values.length; i++)
            if (sender == this.values[i])
            {
                this.removeAt(i);
                break;
            }
     }
 
     add(key, value)
     {
        this.remove(key);

        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed, this);

        this.keys.push(key);
        this.values.push(value);
     }

     contains(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return true;

        return false;
     }

     containsKey(key)
     {
         return this.contains(key);
     }
     
     set(key, value)
     {
        this.remove(key);
        this.add(key, value);
     }

     remove(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (key == this.keys[i])
            {
                this.removeAt(i);
                break;
            }   
     }

     removeAt(index)
     {
        if (this.values[index] instanceof IDestructible)
            this.values[index].off("destroy", this._item_destroyed);

        this.keys.splice(index, 1);
        this.values.splice(index, 1);
     }

     clear()
     {
        while(this.length > 0)
            this.removeAt(0);
     }

    filter(selector)
    {	
        if (selector instanceof Function){
            return this.values.filter(selector);
        }
        else
        {
            let match = function(small, big)
            {
                if (small == big)
                {
                    return true;
                }
                else if (typeof small == "object" && typeof big == "object" && small != null && big != null)
                {
                    if (small.constructor.name == "Object")
                    {
                        for(var i in small)
                            if (!match(small[i], big[i]))
                                return false;
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                    return false;
            };

            return this.values.filter((x) => match(selector, x));
        }
     }
 
     get length()
     {
         return this.keys.length;
     }
 }