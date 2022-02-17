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
 import Codec from '../Data/Codec.js';
 import Warehouse from '../Resource/Warehouse.js';
 import DataType from '../Data/DataType.js';
 import AsyncBag from '../Core/AsyncBag.js';
 import ErrorType from '../Core/ErrorType.js';
 import ExceptionCode from '../Core/ExceptionCode.js';
 import { createRequire } from 'module'

 const require = createRequire(import.meta.url);


 export default class MongoDBStore extends IStore
  {
      constructor()
      {
          super();
          this.client = require('mongodb').MongoClient;
          this.resources = new Map();
          this.classes = new Map();
      }
 
      compose(value)
      {
          let type = Codec.getDataType(value, null);
 
          switch (type)
          {
              case DataType.Void:
                  // nothing to do;
                  return null;
 
              case DataType.String:
                  return value;
 
              case DataType.Resource:
              case DataType.DistributedResource:
                  return  { "type": 0 , "link": value.instance.link };
 
              case DataType.Structure:
                  return this.composeStructure(value);
 
              case DataType.VarArray:
                  return this.composeVarArray(value);
 
              case DataType.ResourceArray:
                  return this.composeResourceArray(value);
 
              case DataType.StructureArray:
                  return this.composeStructureArray(value);
 
              default:
                  return value;
          }
      }
 
      parse(value)
      {
         if (value instanceof Array)
         {
             let bag = new AsyncBag();
 
             for(let i = 0; i < value.length; i++)
                 bag.add(this.parse(value[i]));
 
             bag.seal();
 
             return bag;
         }
         else if (value?.type !== undefined)
         {
              if (value.type == 0)
              {
                  return Warehouse.get(value.link);
              } // structure
              else if (value.type == 1)
              {
                  var bag = new AsyncBag();
                  var rt = new AsyncReply();
 
                  let s = new Structure();
 
                  for (let i = 0; i < value.values.length; i++)
                      bag.add(this.parse(value.values[i].value));
 
                  bag.seal();
                  bag.then((x) =>
                  {
                      for (let i = 0; i < x.length; i++)
                          s[value.values[i].name] = x[i];
 
                      rt.trigger(s);
                  });
 
                  return rt;
              }
              else
                  return new AsyncReply(null);
          }
          else
          {
              return new AsyncReply(value);
          }
      }
 
 
      addClass(type)
      {
          let template = type.template;
          let className = template.namespace + "." + type.prototype.constructor.name;
          this.classes.set(className, type);
      }
      
      fetch(id)
      {
         let self = this;
 
          if (this.resources.has(id))
              return new AsyncReply(this.resources.get(id));
          
         let rt = new AsyncReply();
 
 
         this.db.collection(this.collection).findOne({_id: id}, function(err, result) {
            if (err){
                rt.triggerError(err);
            } else {
                var doc = request.result;
             
                if (doc == null)
                {
                    //rt.triggerError(ErrorType.Management, ExceptionCode.ResourceNotFound);
                    rt.trigger(null);
                    return;
                }
    
                if (!self.classes.has(doc.className))
                {
                    rt.triggerError(ErrorType.Management, ExceptionCode.ClassNotFound);
                    return;
                }
    
                //let r = await Warehouse.new(, doc.name, this, null, null, this);
                let type = self.classes.get(doc.className);
                var proxyType = ResourceProxy.getProxy(type);
                var resource = new proxyType();
                self.resources.set(doc.id, resource);
    
                resource._id = doc.id;
    
                Warehouse.put(doc.name, resource, self, null, null, null, null).then(ok=>{
                    self.parse(doc.attributes).then(attributes=>{
    
                        resource.instance.setAttributes(attributes);
            
                        // Apply store managers
                        for (var i = 0; i < self.instance.managers.length; i++)
                            resource.instance.managers.add(self.instance.managers[i]);
            
                        // Load values
            
                        var bag = new AsyncBag();
    
                        for(var i = 0; i < doc.values.length; i++)
                        {
                            let v = doc.values[i];
    
                            bag.add(self.parse(v.value));
                            //var x = await this.parse(v.value);
                            resource.instance.loadProperty(v.name, v.age, v.modification, x);
                        }
    
                        bag.seal();
    
                        bag.then(ar=>{
                            for(var i = 0; i < ar.length; i++)
                            {
                                let v = doc.values[i];
                                resource.instance.loadProperty(v.name, v.age, v.modification, ar[i]);
                            }
    
                            rt.trigger(resource);
                        }).error(ex => rt.triggerError(ex));
                    }).error(ex => rt.triggerError(ex));
                }).error(ex => rt.triggerError(ex));
   
            }
        });
 
         return rt;
      }
 
      put(resource)
      {
        if (resource == this)
            return;

         let rt = new AsyncReply();

         let self = this;

         let attrs = resource.instance.getAttributes();
 
         var record = {
             className: resource.instance.template.className,
             name: resource.instance.name,
             attributes: this.composeStructure(attrs),
         };
 
         if (resource._id != null)
             record.id = resource._id;
 
         // copy resource data
         let props = resource.instance.template.properties;
         
         var snap = {};
         for(var i = 0; i < props.length; i++)
         {
             let pt = props[i];
             snap[pt.name] = { "age": resource.instance.getAge(pt.index),
                                     "modification": resource.instance.getModificationDate(pt.index),
                                     "value": this.compose(resource[pt.name]) 
                               };
         }
 
         record.values = snap;
   
         this.db.collection("resources").insertOne(record, function(err, res) {
            if (err) {
                rt.trigger(false);
            } else {
                console.log("1 document inserted " + res.insertedId);
                resource["_id"] = res.insertedId;
                self.resources.set(res.insertedId, resource);
                rt.trigger(true);
            }
          });

         return rt;
      }
 
     //  retrive(id)
     //  {
     //     let rt = new AsyncReply();
 
     //     var transaction = this.db.transaction(["resources"]);
     //     var objectStore = transaction.objectStore("resources");
     //     var request = objectStore.get(id);
 
     //     request.onerror = function(event) {
     //         rt.trigger(null);
     //     };
 
     //     request.onsuccess = function(event) {
     //         rt.trigger(request.result);
     //     };
 
     //     return rt;
     //  }
   
     get(path)
     {
         var p = path.split('/');
         if (p.length == 2)
             if (p[0] == "id")
             {
                 // load from Id
                 return this.fetch(p[1]);
             }
 
         return new AsyncReply(null);
     }
 
 
      link(resource)
      {
         if (resource.instance.store == this)
             return this.instance.name + "/" + resource._id;
      }
 
      trigger(trigger)
      {
          if (trigger == ResourceTrigger.Initialize)
          {
             let rt = new AsyncReply();

             this.dbName = this.instance.attributes.item("database") ?? "ejs";
             this.collection = this.instance.attributes.item("collection") ?? "resources";
             this.connection = this.instance.attributes.item("connection") ?? "mongodb://localhost:27017";

             let self = this;

             this.client.connect(this.connection, function(err, client) {
                if (err)  {
                    rt.trigger(false);
                    console.log(err);
                }
                else
                {
                    console.log("Database created!");
                    let db = client.db(self.dbName);
                    db.createCollection(self.collection, function(err, res) {
                        //if (err)        
                          //  console.log(err);
                        if (err == null)
                            console.log("Collection created!");

                        rt.trigger(true);
                      });
                    
                    self.db = db;
                    //db.close();
                }
              });
               
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
 
 
      composeStructure(value)
      {
          return {type: 1, values: value.toObject()};
      }
 
      composeVarArray(array)
      {
          var rt = [];
 
          for (var i = 0; i < array.length; i++)
              rt.push(this.compose(array[i]));
          return rt;
      }
 
      composeStructureArray(structures)
      {
         var rt = [];
 
         if (structures == null || structures.length == 0)
              return rt;
 
         for(var i = 0; i < structures.length; i++)
             rt.push(this.composeStructure(structures[s]));
     
          return rt;
      }
 
      composeResourceArray(array)
      {
          var rt = [];
          for (var i = 0; i < array.length; i++)
              rt.push({ "type": 0 , "link": array[i].instance.link });
          return rt;
      }
 
  }