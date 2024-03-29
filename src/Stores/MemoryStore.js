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
 * Created by Ahmed Zamil on 12/11/2017.
 */

"use strict";  

import IStore from '../Resource/IStore.js'
import AsyncReply from '../Core/AsyncReply.js';

export default class MemoryStore extends IStore
 {
     constructor()
     {
         super();
         this.resources = new Map();
     }

     put(resource)
     {
        this.resources.set(resource.instance.id, resource);
        return new AsyncReply(true);
     }

     retrive(id)
     {
         if (this.resources[resource.instance.id])
            return new AsyncReply(this.resources[resource.instance.id]);
         else
            return new AsyncReply(null);
     }

     get(path)
     {
        if (path.startsWith("$"))
        {
            let id = parseInt(path.substring(1));
            return new AsyncReply (this.resources.get(id));
        }
        else
        {
            for(let r of this.resources.values())
            {
                if (r.instance.name == path)
                    return new AsyncReply(r);

            }
        }

        return new AsyncReply(null);
     }

     link(resource)
     {
        if (resource.instance.store == this)
            return this.instance.name + "/$" + resource.instance.id;
     }

     trigger(trigger)
     {
         return new AsyncReply(true);
     }

     record(resource, propertyName, value, age, dateTime)
     {

     }

     getRecord(resource, fromDate, toDate)
     {

     }
 }