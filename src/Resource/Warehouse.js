/*
* Copyright (c) 2017 - 2024 Ahmed Kh. Zamil
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

import AsyncReply from '../Core/AsyncReply.js';
import TypeTemplate from '../Resource/Template/TypeTemplate.js';
import IEventHandler from '../Core/IEventHandler.js';
import AutoList from '../Data/AutoList.js';
import KeyList from '../Data/KeyList.js';
import DistributedConnection from '../Net/IIP/DistributedConnection.js';
import MemoryStore from '../Stores/MemoryStore.js';
import Instance from '../Resource/Instance.js';
import IStore from './IStore.js';
import IResource, { ResourceTrigger } from './IResource.js';
import IndexedDBStore from '../Stores/IndexedDBStore.js';
import ResourceProxy from '../Proxy/ResourceProxy.js';
import AsyncBag from '../Core/AsyncBag.js';
import IRecord from '../Data/IRecord.js';
import TemplateType from './Template/TemplateType.js';
import DistributedResource from '../Net/IIP/DistributedResource.js';
import IEnum from '../Data/IEnum.js';
import AsyncException from '../Core/AsyncException.js';
import ExceptionCode from '../Core/ExceptionCode.js';
 
export class WH extends IEventHandler
{
    constructor()
    {
        super();

        //this.stores =  new AutoList();
        this.stores = new KeyList();
        this.resources = new KeyList();
        this.resourceCounter = 0;
        this.templates = new KeyList();

        this.templates.add(TemplateType.Resource, new KeyList());
        this.templates.add(TemplateType.Record, new KeyList());
        this.templates.add(TemplateType.Enum, new KeyList());

        this.protocols = new KeyList();

        this._register("connected");
        this._register("disconnected");

        
        this._urlRegex = /^(?:([^\s|:]*):\/\/([^/]*)\/?)/;

    }

    newInstance(type, properties)
    {
        var proxyType = ResourceProxy.getProxy(type);
        var res = new proxyType();
        if (properties != null)
            Object.assign(res, properties);
        return type;
    }

    new(type, name, store = null, parent = null, manager = null, attributes = null, properties = null)
    {
        var proxyType = ResourceProxy.getProxy(type);

        var res = new proxyType();

        if (properties != null)
        Object.assign(res, properties);

        if (properties != null)
            Object.assign(res, properties);

        if (store != null || parent != null || res instanceof IStore)
        {
            var rt = new AsyncReply();

            this.put(name, res, store, parent, null, 0, manager, attributes)
                        .then(()=>rt.trigger(res))
                        .catch((ex)=>rt.triggerError(ex));

            return rt;
        }
        else
        {
            return new AsyncReply(res);
        }
    }

    getById(id)
    {
        let r = this.resources.item(id)?.deref();
        return new AsyncReply(r);
    }
    
    get(path, attributes = null)//, parent = null, manager = null)
    {        
        var rt = new AsyncReply();
       // var self = this;

        // Should we create a new store ?
        if (path.match(this._urlRegex))
        {
            // with port
            //var url = path.split(/(?:):\/\/([^:\/]*):?(\d*)/);
            // without port
            let url = path.split(this._urlRegex);
            
            var handler;

            const initResource = ()=>{
                handler(url[2], attributes).then(store => {
                    if (url[3].length > 0 && url[3] != "")
                        store.get(url[3]).then(r=>rt.trigger(r)).error(ex=>rt.triggerError(ex));
                    else
                        rt.trigger(store);
                }).error(ex=>{
                    rt.triggerError(ex);
                });
            }

            if (handler = this.protocols.item(url[1]))
            {
                if (!this.warehouseIsOpen)
                {
                    this.open().then(()=>{
                        initResource();
                    }).error(ex=>rt.triggerError(ex));
                }
                else
                    initResource();
     
                 return rt;
            }
        }
        
        
        this.query(path).then(rs => {
            if (rs != null && rs.length > 0)
                rt.trigger(rs[0]);
            else
                rt.trigger( null);
        }).error(ex => rt.triggerError(ex));

        return rt;
    }


    remove(resource)
    {
        if (resource.instance == null)
            return;

        if (this.resources.contains(resource.instance.id))
            this.resources.remove(resource.instance.id); 
        else
            return false;

        if (resource instanceof IStore)
        {
            this.stores.remove(resource);

            // remove all objects associated with the store
            var toBeRemoved = null;

            for (var i = 0; i < this.resources.length; i++)
            {
                var o = this.resources.at(i).deref();
                if (o == null)
                    continue;
                
                if (o.instance.store == resource)
                {
                    if (toBeRemoved == null)
                        toBeRemoved = [];
                    toBeRemoved.push(o);
                }
            }

            if (toBeRemoved != null)
                for(let i = 0; i < toBeRemoved.length; i++)
                this.remove(toBeRemoved[i]);

            this._emit("disconnected", resource);
        }

        if (resource.instance.store != null)
            resource.instance.store.remove(resource);

        resource.destroy();
        
        resource.instance = null;

        return true;
    }

    async put(name, resource, store, parent, customTemplate = null, age = 0, manager = null, attributes = null){
        

        let rt = new AsyncReply();

        if (resource.instance != null){
            rt.triggerError(0, ExceptionCode.GeneralFailure, "Resource has a store");
            return rt;
        }

         // trim '/' character 
        let path = name.replace(/^[\/]+/, '').split('/');

        if (path.length > 1)
        {
            if (parent != null){
                rt.triggerError(0, ExceptionCode.GeneralFailure, "Parent can't be set when using path in instance name");
                return rt;
            }

            parent = await Warehouse.get(path.slice(0, -1).join("/"));

            if (parent == null){
                rt.triggerError(0, ExceptionCode.GeneralFailure, "Can't find parent.");
                return rt;
            }

            store = store ?? parent.Instance.Store;
        }

        let instanceName = path.at(-1);


        let resourceReference = new WeakRef(resource);

        if (store == null)
        {
            // assign parent's store as a store
            if (parent != null)
            {
                // assign parent as a store
                if (parent instanceof IStore)
                {
                    store = parent;
                    let list = this.stores.get(store); 
                    if (list)
                        list.add(resourceReference);
                }
                else
                {
                    store = parent.instance.store;

                    let list = this.stores.get(store); 
                    if (list)
                        list.add(resourceReference);
                }
            }
            // assign self as a store (root store)
            else if (resource instanceof IStore)
            {
                store = resource;
            }
            else
            {
                rt.triggerError(0, ExceptionCode.GeneralFailure, "Can't find a store for the resource.");
                return rt;
            }
        }

        resource.instance = new Instance(this.resourceCounter++, instanceName, resource, store, customTemplate, age);

        if (attributes != null)
            resource.instance.setAttributes(attributes);

        if (manager != null)
            resource.instance.managers.add(manager);

        if (store == parent)
            parent = null;

        try
        {
            if (resource instanceof IStore)
                this.stores.add(resource, []);


            if (!await store.put(resource)){
                rt.triggerError(0, ExceptionCode.GeneralFailure, "Store failed to put the resource.");
                return rt;
            }

            if (parent != null)
            {
                await parent.instance.store.addChild(parent, resource);
                await store.addParent(resource, parent);
            }



            this.resources.add(resource.instance.id, resourceReference);

            if (this.warehouseIsOpen)
            {
                await resource.trigger(ResourceTrigger.Initialize);
                if (resource instanceof IStore)
                    await resource.trigger(ResourceTrigger.Open);
            }

            if (resource instanceof IStore)
                this._emit("StoreConnected", resource);
        }
        catch (ex)
        {
            this.remove(resource);            
            rt.triggerError(ex);
            return rt;
        }

        rt.trigger(resource);
        return rt;







        // let rt = new AsyncReply();

        // if (resource.instance != null){
        //     rt.triggerError(new AsyncException(0, ExceptionCode.GeneralFailure, "Resource has a store"));
        //     return rt;
        // }

        // let path = name.replace(/^\\/g, "").split("/");

        // if (path.length > 1)
        // {
        //     if (parent != null)
        //         throw new Error("Parent can't be set when using path in instance name");

        //     parent = await Warehouse.get(path.slice(0, path.length - 1).join("/"));

        //     if (parent == null)
        //         throw new Error("Can't find parent");

        //     store = store ?? parent.instance.store;
        // }

        // let instanceName = path[path.length - 1];

        // let resourceReference = new WeakRef(resource);

        // if (store == null)
        // {
        //     // assign parent's store as a store
        //     if (parent != null)
        //     {
        //         // assign parent as a store
        //         if (parent instanceof IStore)
        //         {
        //             store = parent;
        //             let list = Warehouse.stores.get(store); 
        //             if (list)
        //                 list.add(resourceReference);
        //         }
        //         else
        //         {
        //             store = parent.instance.store;

        //             let list = Warehouse.stores.get(store); 
        //             if (list)
        //                 list.add(resourceReference);
        //         }
        //     }
        //     // assign self as a store (root store)
        //     else if (resource instanceof IStore)
        //     {
        //         store = resource;
        //     }
        //     else
        //         throw new Error("Can't find a store for the resource.");
        // }

        // resource.instance = new Instance(Warehouse.resourceCounter++, instanceName, resource, store, customTemplate, age);

        // if (attributes != null)
        //     resource.instance.setAttributes(attributes);

        // if (manager != null)
        //     resource.instance.managers.add(manager);

        // if (store == parent)
        //     parent = null;

        // try
        // {
        //     if (resource instanceof IStore)
        //         this.stores.add(resource, []);


        //     if (!await store.put(resource))
        //         throw new Error("Store failed to put the resource");


        //     if (parent != null)
        //     {
        //         await parent.instance.store.addChild(parent, resource);
        //         await store.addParent(resource, parent);
        //     }    

        //     Warehouse.resources.add(resource.instance.Id, resourceReference);

        //     if (Warehouse.warehouseIsOpen)
        //     {
        //         await resource.trigger(ResourceTrigger.Initialize);
        //         if (resource instanceof IStore)
        //             await resource.trigger(ResourceTrigger.Open);
        //     }

        //     if (resource instanceof IStore)
        //         Warehouse._emit("StoreConnected", resource);
        // }
        // catch (ex)
        // {
        //     Warehouse.remove(resource);
        //     throw ex;
        // }

        // return resource;





        // var rt = new AsyncReply();      

        // resource.instance = new Instance(this.resourceCounter++, name, resource, store, customTemplate, age);

        
        // if (attributes != null)
        //     resource.instance.setAttributes(attributes);

        // if (manager != null)
        //     resource.instance.managers.add(manager);

        // if (parent)
        // {
        //     parent.instance.children.add(resource);
        // }
        // else
        // {
        //     if (!(resource instanceof IStore))
        //         store.instance.children.add(resource);
        // }

        // let self = this;

        // const initResource = ()=>{

        //     self.resources.add(resource.instance.id, resource);

        //     if (self.warehouseIsOpen)
        //     {
        //         resource.trigger(ResourceTrigger.Initialize).then(()=>{
        //             if (resource instanceof IStore)
        //                 resource.trigger(ResourceTrigger.Open).then(()=>{ rt.trigger(true); 
        //                                                                 self._emit("connected", resource) 
        //                                                             }).error(ex => {
        //                                                                 Warehouse.remove(resource);
        //                                                                 rt.triggerError(ex)
        //                                                             });
        //             else
        //                 rt.trigger(true);
                    
        //         }).error(ex => {
        //             Warehouse.remove(resource);
        //             rt.triggerError(ex)
        //         });
        //     }
        //     else
        //     {
        //         if (resource instanceof IStore)
        //             self._emit("connected", resource);
        //         rt.trigger(true);
        //     }
        // }

        // if (resource instanceof IStore)
        // {
        //     this.stores.add(resource);
        //     initResource();
        // }
        // else
        //     store.put(resource).then(()=>{
        //         initResource();
        //     }).error(ex=> { 
        //         // failed to put
        //         Warehouse.remove(resource);
        //         rt.triggerError(ex);
        //     });

        // return rt;
    }

    _onParentsRemove(value)
    {
        if (value.instance.children.contains(value))
            value.instance.children.remove(value);
    }

    _onParentsAdd(value)
    {
        if (!value.instance.children.contains(value))
            value.instance.children.add(value);
    }

    _onChildrenRemove(value)
    {
        if (value.instance.parents.contains(value))
            value.instance.parents.remove(value);
    }

    _onChildrenAdd(value)
    {
        if (!value.instance.parents.contains(value))
            value.instance.parents.add(value);
    }

    putTemplate(template)
    {
        if (this.templates.get(template.type).containsKey(template.classId))
            throw new Error("Template with same class Id already exists.");
  
        this.templates.get(template.type).add(template.classId, template);
    }

    getTemplateByType(type)
    {

        let baseType = ResourceProxy.getBaseType(type);

        if (baseType == IResource || baseType == IRecord || baseType == IEnum)
            return null;

        // search our records

        let templateType;

        if (baseType.prototype instanceof IResource)
            templateType = TemplateType.Resource;
        else if (baseType.prototype instanceof IRecord)
            templateType = TemplateType.Record;
        else if (baseType.prototype instanceof IEnum)
            templateType = TemplateType.Enum;
        else
            return null;

        let template = this.templates.item(templateType).first(x=> x.definedType == baseType);
        if (template != null)
            return template;
    
        template = new TypeTemplate(baseType, true);
        TypeTemplate.getDependencies(template);

        return template;
    }

    getTemplateByClassId(classId, templateType = null)
    {
        if (templateType == null)
        {
            // look into resources
            var template = this.templates.get(TemplateType.Resource).get(classId);
            if (template != null)
                return template;
            
            // look into records
            template = this.templates.get(TemplateType.Record).get(classId);
            if (template != null)
                return template;

            // look into enums
            template = this.templates.get(TemplateType.Enum).get(classId);
            return template;
        }
        else
            return this.templates.get(templateType).get(classId);
    }

    getTemplateByClassName(className, templateType = null)
    {
        if (templateType == null)
        {
            // look into resources
            var template = this.templates.get(TemplateType.Resource).values.find(x => x.className == className);
            if (template != null)
                return template;

            // look into records
            template = this.templates.get(TemplateType.Record).values.find(x => x.className == className);
            if (template != null)
                return template;

            // look into enums
            template = this.templates.get(TemplateType.Enum).values.find(x => x.className == className);
            return template;
        }
        else
        {
            return this.templates.get(templateType).values.find(x => x.className == className);
        }
    }

    _qureyIn(path, index, resources)
    {
        var rt = [];

        if (index == path.length - 1)
        {
            if (path[index] == "")
                for(let i = 0; i < resources.length; i++)
                    rt.push(resources.at(i));
             else
                for(let i = 0; i < resources.length; i++)
                    if (resources.at(i).instance.name == path[index])
                        rt.push(resources.at(i));
        }
        else
            for(let i = 0; i < resources.length; i++)
                if (resources.at(i).instance.name == path[index])
                    rt = rt.concat(this._qureyIn(path, index+1, resources.at(i).instance.children));

        return rt;
    }

    async query(path)
    {
        let p = path.replace(/^\\/g, "").split("/");
        let resource;

        for(let store of this.stores.keys)
        {
            if (p[0] == store.instance.name)
            {

                if (p.length == 1)
                    return new AsyncReply([store]);
                
                let res = await store.get(p.slice(1).join("/"));
                if (res != null)
                    return new AsyncReply([res]);

                resource = store;

                for (var i = 1; i < p.length; i++)
                {
                    var children = await resource.instance.children(p[i]);
                    if (children != null && children.length > 0)
                    {
                        if (i == p.length - 1)
                            return new AsyncReply(children);
                        else
                            resource = children[0];
                    }
                    else
                        break;
                }

                return new AsyncReply(null);
            }
        }

        return new AsyncReply(null);    
    }


    open()
    {
        if (this.warehouseIsOpen)
            return new AsyncReply(false);

        var initBag = new AsyncBag();

        let rt = new AsyncReply();
        let self = this;

        for (var i = 0; i < this.resources.length; i++)
        {
            let r = this.resources.at(i).deref();
            if (r) {
                initBag.add(r.trigger(ResourceTrigger.Initialize));
            }
            //if (!rt)
              //  console.log(`Resource failed at Initialize ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
        }

        initBag.seal();

        initBag.then(ar => {

            for(let i = 0; i < ar.length; i++)
                if (!ar[i])
                    console.log(`Resource failed at Initialize ${self.resources.at(i).instance.name} [${self.resources.at(i).instance.template.className}]`);

            var sysBag = new AsyncBag();

            for (let i = 0; i < this.resources.length; i++)
            {
                var r = this.resources.at(i).deref();
                if (r){
                    sysBag.add(r.trigger(ResourceTrigger.SystemInitialized));
                }
            }
    
            sysBag.seal();
            sysBag.then(ar2 => {
                for(var i = 0; i < ar2.length; i++)
                if (!ar2[i])
                    console.log(`Resource failed at Initialize ${self.resources.at(i).instance.name} [${self.resources.at(i).instance.template.className}]`);
                
                self.warehouseIsOpen = true;
                rt.trigger(true);

            }).error(ex => rt.triggerError(ex));

        }).error(ex => rt.triggerError(ex));

        // for (var i = 0; i < this.resources.length; i++)
        // {
        //     var r = this.resources.at(i);
        //     var rt = await r.trigger(ResourceTrigger.SystemInitialized);
        //     if (!rt)
        //     console.log(`Resource failed at SystemInitialized ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
        // }

        return rt;
    }  


    defineType(type){
        let template = this.getTemplateByType(type);
        if (template == null)
            throw new Error("Unsupported type.");
        this.putTemplate(template);
    }
}

let Warehouse  = new WH();

Warehouse.protocols.add("iip", (name, attributes) => Warehouse.new(DistributedConnection, name, null, null, null, attributes));
Warehouse.protocols.add("mem", (name, attributes) => Warehouse.new(MemoryStore, name, null, null, null, attributes));
Warehouse.protocols.add("db", (name, attributes) => Warehouse.new(IndexedDBStore, name, null, null, null, attributes));


export default Warehouse;

