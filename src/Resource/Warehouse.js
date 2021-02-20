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

import AsyncReply from '../Core/AsyncReply.js';
import ResourceTemplate from '../Resource/Template/ResourceTemplate.js';
import IEventHandler from '../Core/IEventHandler.js';
import AutoList from '../Data/AutoList.js';
import KeyList from '../Data/KeyList.js';
import DistributedConnection from '../Net/IIP/DistributedConnection.js';
import MemoryStore from '../Stores/MemoryStore.js';
import Instance from '../Resource/Instance.js';
import IStore from './IStore.js';
import { ResourceTrigger } from './IResource.js';
import IndexDBStore from '../Stores/IndexDBStore.js';
import ResourceProxy from '../Proxy/ResourceProxy.js';


export class WH extends IEventHandler
{
    constructor()
    {
        super();

        this.stores =  new AutoList();
        this.resources = new KeyList();
        this.resourceCounter = 0;
        this.templates = new KeyList();
        this.protocols = new KeyList();
        this._register("connected");
        this._register("disconnected");
        ///this._urlRegex = /^(?:([\S]*):\/\/([^\/]*)\/?)/;
        this._urlRegex = /^(?:([^\s|:]*):\/\/([^\/]*)\/?)/;
    }

    async new(type, name, store = null, parent = null, manager = null, attributes = null, properties = null)
    {
        var proxyType = ResourceProxy.getProxy(type);

        var res = new proxyType();

        if (properties != null)
            Object.assign(res, properties);

        await this.put(res, name, store, parent, null, 0, manager, attributes);
        return res;
    }

    getById(id)
    {
        return new AsyncReply(this.resources.item(id));
    }
    
    async get(path, attributes = null, parent = null, manager = null)
    {
        //var rt = new AsyncReply();
        //var self = this;

        // Should we create a new store ?
        if (path.match(this._urlRegex))
        //if (path.includes("://"))
        {
            // with port
            //var url = path.split(/(?:):\/\/([^:\/]*):?(\d*)/);
            // without port
            let url = path.split(this._urlRegex);
                        
            var handler;

            if (handler = this.protocols.item(url[1]))
            {
                if (!this.warehouseIsOpen)
                    await this.open();

                var store = await handler(url[2], attributes);
                //await this.put(store, url[2], null, parent, null, 0, manager, attributes);
                //await store.trigger(ResourceTrigger.Open);
                //this.warehouseIsOpen = true;

                try
                {
                    if (url[3].length > 0 && url[3] != "")
                        return await store.get(url[3]);
                    else
                        return store;
                } catch(ex)
                {
                    this.remove(resource);
                    throw ex;
                }

                // store.trigger(ResourceTrigger.Open).then(x => {

                //     this.warehouseIsOpen = true;

                //     if (url[3].length > 0 && url[3] != "")
                //         store.get(url[3]).then(r => {
                //             rt.trigger(r);
                //         }).error(e => rt.triggerError(e));
                //     else
                //         rt.trigger(store);
                // }).error(e => {
                //     rt.triggerError(e);
                //     self.remove(store);
                // });

                // return rt;
            }
        }
        
        
        var rs = await this.query(path);
        
        if (rs != null && rs.length > 0)
            return rs[0];
        else
            return null;

        // .then(rs =>
        // {
        //     if (rs != null && rs.length > 0)
        //         rt.trigger(rs[0]);
        //     else
        //         rt.trigger(null);
        // });
        
        //return rt;
  

    }


    remove(resource)
    {
        
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
                var o = this.resources.at(i);
                if (o.instance.store == resource)
                {
                    if (toBeRemoved == null)
                        toBeRemoved = [];
                    toBeRemoved.push(o);
                }
            }

            if (toBeRemoved != null)
                for(var i = 0; i < toBeRemoved.length; i++)
                this.remove(toBeRemoved[i]);

            this._emit("disconnected", resource);
        }

        if (resource.instance.store != null)
            resource.instance.store.remove(resource);
        resource.destroy();

        return true;
    }

    async put(resource, name, store, parent, customTemplate = null, age = 0, manager = null, attributes = null){

        resource.instance = new Instance(this.resourceCounter++, name, resource, store, customTemplate, age);
        //resource.instance.children.on("add", Warehouse._onChildrenAdd).on("remove", Warehouse._onChildrenRemove);
        //resource.instance.parents.on("add", Warehouse._onParentsAdd).on("remove", Warehouse._onParentsRemove);
        
        if (attributes != null)
            resource.instance.setAttributes(attributes);

        if (manager != null)
            resource.instance.managers.add(manager);

        if (parent)
        {
            parent.instance.children.add(resource);
        }
        else
        {
            if (!(resource instanceof IStore))
                store.instance.children.add(resource);
        }

        if (resource instanceof IStore)
            this.stores.add(resource);
        else
            await store.put(resource);

        this.resources.add(resource.instance.id, resource);

        if (this.warehouseIsOpen)
        {
            await resource.trigger(ResourceTrigger.Initialize);

            if (resource instanceof IStore)
                await resource.trigger(ResourceTrigger.Open);
        }

        if (resource instanceof IStore)
            this._emit("connected", resource);

        return new AsyncReply(true);
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
        this.templates.add(template.classId.valueOf(), template);
    }

    getTemplateByType(type)
    {
        //debugger;

        let className = type.prototype.constructor.name;

        if (className.startsWith("E_"))
            className = className.substr(2);
        
        className = type.template.namespace + "." + className;

        // loaded ?
        for (var i = 0; i < this.templates.length; i++)
            if (this.templates.at(i).className == className)
                return this.templates.at(i);

        var template = new ResourceTemplate(type);
        this.templates.add(template.classId.valueOf(), template);
        
        return template;
    }

    getTemplateByClassId(classId)
    {
        var template = this.templates.item(classId);
        return new AsyncReply(template);
    }

    getTemplateByClassName(className)
    {
        for(var i = 0; i < this.templates.length; i++)
            if (this.templates.at(i).className == className)
                return new AsyncReply(this.templates.at(i));
        
        return new AsyncReply(null);
    }

    _qureyIn(path, index, resources)
    {
        var rt = [];

        if (index == path.length - 1)
        {
            if (path[index] == "")
                for(var i = 0; i < resources.length; i++)
                    rt.push(resources.at(i));
             else
                for(var i = 0; i < resources.length; i++)
                    if (resources.at(i).instance.name == path[index])
                        rt.push(resources.at(i));
        }
        else
            for(var i = 0; i < resources.length; i++)
                if (resources.at(i).instance.name == path[index])
                    rt = rt.concat(this._qureyIn(path, index+1, resources.at(i).instance.children));

        return rt;
    }

    async query(path)
    {
        //var p = path.split('/');
        //return new AsyncReply(this._qureyIn(p, 0, this.stores));

        
        
        var rt = new AsyncReply();

        var p = path.trim().split('/');
        var resource;

        for(var i = 0; i < this.stores.length; i++)
        {
            let store = this.stores.at(i);

            if (p[0] == store.instance.name)
            {

                if (p.length == 1)
                    return [store];

                  
                var res = await store.get(p.splice(1).join("/"));
                if (res != null)
                    return [res];
                
                
                resource = store;
                for (var i = 1; i < p.length; i++)
                {
                    var children = await resource.instance.children.list.filter(x=>x.instance.name == p[i]);// <IResource>(p[i]);
                    if (children.length > 0)
                    {
                        if (i == p.length - 1)
                            return children;
                        else
                            resource = children[0];
                    }
                    else
                        break;
                }

                return null;
            }

        }

        return null;
        
    }


    async open()
    {
        if (this.warehouseIsOpen)
            return new AsyncReply(false);

        this.warehouseIsOpen = true;

        for (var i = 0; i < this.resources.length; i++)
        {
            var r = this.resources.at(i);

            var rt = await r.trigger(ResourceTrigger.Initialize);

            if (!rt)
                console.log(`Resource failed at Initialize ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
        }

        for (var i = 0; i < this.resources.length; i++)
        {
            var r = this.resources.at(i);
            var rt = await r.trigger(ResourceTrigger.SystemInitialized);
            if (!rt)
            console.log(`Resource failed at SystemInitialized ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
        }

        return new AsyncReply(true);
    }

}

let Warehouse  = new WH();

Warehouse.protocols.add("iip", (name, attributes) => Warehouse.new(DistributedConnection, name, null, null, null, attributes));
Warehouse.protocols.add("mem", (name, attributes) => Warehouse.new(MemoryStore, name, null, null, null, attributes));
Warehouse.protocols.add("db", (name, attributes) => Warehouse.new(IndexDBStore, name, null, null, null, attributes));


export default Warehouse;

