/*
* Copyright (c) 2017-2021 Ahmed Kh. Zamil
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
 * Created by Ahmed Zamil on 2/18/2021.
 */

"use strict";  

import { ResourceTrigger } from '../Resource/IResource.js';
import IStore from '../Resource/IStore.js'
import AsyncReply from '../Core/AsyncReply.js';

export default class IndexDBStore extends IStore
 {
     constructor()
     {
         super();
     }

     put(resource)
     {
        let rt = new AsyncReply();

        var transaction = this.db.transaction(["resources"], "readwrite");
        var objectStore = transaction.objectStore("resources");

        // copy resource data
        let props = resource.instance.template.properties;
        
        var snap = {};
        for(var i = 0; i < props.length; i++)
            snap[props[i].name] = resource[props[i].name];

        // debugger;

        var request = objectStore.add(snap);

        request.onerror = function(event) {
            rt.trigger(null);
        };

        request.onsuccess = function(event) {
            rt.trigger(request.result);
        };

        return rt;
     }

     retrive(id)
     {
        let rt = new AsyncReply();

        var transaction = this.db.transaction(["resources"]);
        var objectStore = transaction.objectStore("resources");
        var request = objectStore.get(id);

        request.onerror = function(event) {
            rt.trigger(null);
        };

        request.onsuccess = function(event) {
            rt.trigger(request.result);
        };

        return rt;
     }

     get(resource)
     {
         return new AsyncReply(null);
     }

     link(resource)
     {
        if (resource.instance.store == this)
            return this.instance.name + "/" + resource.id;
     }

     trigger(trigger)
     {
         if (trigger == ResourceTrigger.Initialize)
         {
            let dbName = this.instance.attributes.item("db") ?? "esiur";
            let request = indexedDB.open(dbName, 3);
            let self = this;
            let rt = new AsyncReply();
            
            request.onupgradeneeded = function(event) {
                self._store = request.result.createObjectStore("resources", {keyPath: "id", autoIncrement: true});
                console.log(self._store);
              };
            
            request.onerror = function(event) {
                console.error("Database error: " + event.target.errorCode);
                rt.trigger(false);
            };

            request.onsuccess = function(event) {
                console.log(event);
                self.db = request.result;
                rt.trigger(true);
            };
              
            return rt;
         }

         return new AsyncReply(true);
     }

     record(resource, propertyName, value, age, dateTime)
     {

     }

     getRecord(resource, fromDate, toDate)
     {

     }
 }