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
import TypedList from '../Data/TypedList.js';
import { Int8, Int16, Int32, Int64, UInt8, UInt16, UInt32, UInt64, Float32, Float64 } from '../Data/ExtendedTypes.js';
import Record from '../Data/Record.js';
import TypedMap from '../Data/TypedMap.js';
import {RepresentationType, RepresentationTypeIdentifier} from '../Data/RepresentationType.js';
import FactoryEntry from './FactoryEntry.js'; './FactoryEntry.js';
export class WH extends IEventHandler
{
    constructor()
    {
        super();

        this.stores =  new AutoList();
        this.resources = new KeyList();
        this.resourceCounter = 0;
        this.templates = new KeyList();

        this.templates.add(TemplateType.Unspecified, new KeyList());
        this.templates.add(TemplateType.Resource, new KeyList());
        this.templates.add(TemplateType.Record, new KeyList());
        this.templates.add(TemplateType.Wrapper, new KeyList());
        this.templates.add(TemplateType.Enum, new KeyList());

        this.protocols = new KeyList();

        this.typesFactory = this._getBuiltInTypes();

        this._register("connected");
        this._register("disconnected");
        ///this._urlRegex = /^(?:([\S]*):\/\/([^\/]*)\/?)/;
//        this._urlRegex = /^(?:([^\s|:]*):\/\/([^\/]*)\/?)/;
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
                        .error((ex)=>rt.triggerError(ex));

            return rt;
        }
        else
        {
            return new AsyncReply(res);
        }
    }

    getById(id)
    {
        return new AsyncReply(this.resources.item(id));
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
                var o = this.resources.at(i);
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

        return true;
    }

    put(name, resource, store, parent, customTemplate = null, age = 0, manager = null, attributes = null){
        
        var rt = new AsyncReply();

        resource.instance = new Instance(this.resourceCounter++, name, resource, store, customTemplate, age);

        
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

        let self = this;

        const initResource = ()=>{

            self.resources.add(resource.instance.id, resource);

            if (self.warehouseIsOpen)
            {
                resource.trigger(ResourceTrigger.Initialize).then(()=>{
                    if (resource instanceof IStore)
                        resource.trigger(ResourceTrigger.Open).then(()=>{ rt.trigger(true); 
                                                                        self._emit("connected", resource) 
                                                                    }).error(ex => {
                                                                        Warehouse.remove(resource);
                                                                        rt.triggerError(ex)
                                                                    });
                    else
                        rt.trigger(true);
                    
                }).error(ex => {
                    Warehouse.remove(resource);
                    rt.triggerError(ex)
                });
            }
            else
            {
                if (resource instanceof IStore)
                    self._emit("connected", resource);
                rt.trigger(true);
            }
        }

        if (resource instanceof IStore)
        {
            this.stores.add(resource);
            initResource();
        }
        else
            store.put(resource).then(()=>{
                initResource();
            }).error(ex=> { 
                // failed to put
                Warehouse.remove(resource);
                rt.triggerError(ex);
            });

        return rt;
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
        this.templates.get(template.type).add(template.classId, template);
    }

    getTemplateByType(type)
    {
        if (type == null)
            return null;

        var templateType = TemplateType.Unspecified;

        if (type.prototype instanceof DistributedResource)
            templateType = TemplateType.Wrapper;
        if (type.prototype instanceof IResource)
            templateType = TemplateType.Resource;
        else if (type.prototype instanceof IRecord)
            templateType = TemplateType.Record;
        else
            return null;

        if (type == IResource 
            || type == IRecord)
            return null;

        if (!(type.prototype instanceof IResource 
            || type.prototype instanceof IRecord))
            return false;
            
        let className = type.prototype.constructor.name;

        if (className.startsWith("E_"))
            className = className.substr(2);
        
        className = type.template.namespace + "." + className;

        var templates = this.templates.get(templateType);

        
        // loaded ?
        for(var i = 0; i < templates.length; i++)
            if (templates.at(i).className == className)
                return templates.at(i);
                
        var template = new TypeTemplate(type, this);
        
        return template;
    }

    getTemplateByClassId(classId, templateType = TemplateType.Unspecified)
    {
        if (templateType == TemplateType.Unspecified)
        {
            // look in resources
            var template = this.templates.get(TemplateType.Resource).get(classId);
            if (template != null)
                return template;
            
            // look in records
            template = this.templates.get(TemplateType.Record).get(classId);
            if (template != null)
                return template;

            // look in wrappers
            template = this.templates.get(TemplateType.Wrapper).get(classId);
            return template;
        }
        else
            return this.templates.get(templateType).get(classId);
    }

    getTemplateByClassName(className, templateType = TemplateType.Unspecified)
    {
        if (templateType == TemplateType.Unspecified)
        {
            // look in resources
            var template = this.templates.get(TemplateType.Resource).values.find(x => x.className == className);
            if (template != null)
                return template;

            // look in records
            template = this.templates.get(TemplateType.Record).values.find(x => x.className == className);
            if (template != null)
                return template;

            // look in wrappers
            template = this.templates.get(TemplateType.Wrapper).values.find(x => x.className == className);
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

    query(path)
    {

        

        var p = path.trim().split('/');
        var resource;

        for(var i = 0; i < this.stores.length; i++)
        {
            let store = this.stores.at(i);

            if (p[0] == store.instance.name)
            {

                if (p.length == 1)
                    return new AsyncReply([store]);
                  
                var rt = new AsyncReply();

                store.get(p.splice(1).join("/")).then(res=>{
                    if (res != null)
                        rt.trigger([res]);
                    else
                    {
                        resource = store;

                        for (var i = 1; i < p.length; i++)
                        {
                            var children = resource.instance.children.list.filter(x=>x.instance.name == p[i]);// <IResource>(p[i]);
                            if (children.length > 0)
                            {
                                if (i == p.length - 1)
                                {
                                    rt.trigger(children);
                                    return;
                                }
                                else
                                    resource = children[0];
                            }
                            else
                                break;
                        }
        
                        rt.trigger(null);
                    }
                }).error(ex => rt.triggerError(ex));

                return rt;
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
            var r = this.resources.at(i);
            initBag.add(r.trigger(ResourceTrigger.Initialize));
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
                var r = this.resources.at(i);
                sysBag.add(r.trigger(ResourceTrigger.SystemInitialized));
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

    /**
     * @param {Function} instanceCreator - creator
     * @param {RepresentationType} representationType - type
     */
    _getTypeEntries(type, representationType) {

        let listType = TypedList.of(type);
        

        var entry = new FactoryEntry(type, representationType);
        let nullableEntry = new FactoryEntry(entry.nullableType, representationType.toNullable());
        let listEntry = new FactoryEntry(listType, 
            new RepresentationType(RepresentationTypeIdentifier.TypedList, false,
                null, [representationType]));
        let nullableList = new FactoryEntry(listEntry.nullableType,
            new RepresentationType(RepresentationTypeIdentifier.TypedList, true, null,
                [representationType]));

        let nullableItemListType = TypedList.of(entry.nullableType);
        let listNullableItemEntry = new FactoryEntry(nullableItemListType,
            new RepresentationType(RepresentationTypeIdentifier.TypedList, false,
                null, [representationType.toNullable()]));
        
        let nullableListNullableItemEntry = new FactoryEntry(nullableItemListType,
            new RepresentationType(RepresentationTypeIdentifier.TypedList, true, null,
                [representationType.toNullable()]));

      return [
        entry, nullableEntry, listEntry, nullableList, listNullableItemEntry, nullableListNullableItemEntry
      ];
    }
  
    
    /**
     * @param {Function} instanceCreator - creator
     * @param {RepresentationType} representationType - type
     */
    defineType(type, representationType) {
        var entries = this._getTypeEntries(type, representationType);

        for(var e of entries)
            this.typesFactory[e.type] = e; //.push(e);
    }
  
    _getBuiltInTypes() {
      
      let entries =  [
          ...this._getTypeEntries(Int8, new RepresentationType(RepresentationTypeIdentifier.Int8, false)),
          ...this._getTypeEntries(UInt8, new RepresentationType(RepresentationTypeIdentifier.UInt8, false)),
          ...this._getTypeEntries(Int16, new RepresentationType(RepresentationTypeIdentifier.Int16, false)),
          ...this._getTypeEntries(UInt16, new RepresentationType(RepresentationTypeIdentifier.UInt16, false)),
          ...this._getTypeEntries(Int32, new RepresentationType(RepresentationTypeIdentifier.Int32, false)),
          ...this._getTypeEntries(UInt32, new RepresentationType(RepresentationTypeIdentifier.UInt32, false)),
          ...this._getTypeEntries(Int64, new RepresentationType(RepresentationTypeIdentifier.Int64, false)),
          ...this._getTypeEntries(UInt64, new RepresentationType(RepresentationTypeIdentifier.UInt64, false)),
          ...this._getTypeEntries(Float32, new RepresentationType(RepresentationTypeIdentifier.Float32, false)),
          ...this._getTypeEntries(Float64, new RepresentationType(RepresentationTypeIdentifier.Float64, false)),
          ...this._getTypeEntries(String, new RepresentationType(RepresentationTypeIdentifier.String, String)),
          ...this._getTypeEntries(Date, new RepresentationType(RepresentationTypeIdentifier.DateTime, Date)),
          ...this._getTypeEntries(Record, new RepresentationType(RepresentationTypeIdentifier.Record, false)),
          ...this._getTypeEntries(IResource, new RepresentationType(RepresentationTypeIdentifier.Resource, false)),
          ...this._getTypeEntries(Array, new RepresentationType(RepresentationTypeIdentifier.List, false)),
          ...this._getTypeEntries(Map, new RepresentationType(RepresentationTypeIdentifier.Map, false)),
          //...this._getTypeEntries(IResource, new RepresentationType(RepresentationTypeIdentifier.Resource, false)),
          //...this._getTypeEntries(TypedMap, new RepresentationType(RepresentationTypeIdentifier.Resource, false)),

          ...this._getTypeEntries(TypedMap.of(String, Object), new RepresentationType(RepresentationTypeIdentifier.TypedMap, false, null, [
                                            new RepresentationType(RepresentationTypeIdentifier.String, false), 
                                            RepresentationType.Dynamic])),

           ...this._getTypeEntries(TypedMap.of(UInt8, Object), new RepresentationType(RepresentationTypeIdentifier.TypedMap, false, null, [
                new RepresentationType(RepresentationTypeIdentifier.UInt8, false), 
                RepresentationType.Dynamic])),

          ...this._getTypeEntries(TypedMap.of(Int32, Object), new RepresentationType(RepresentationTypeIdentifier.TypedMap, false, null, [
                new RepresentationType(RepresentationTypeIdentifier.Int32, false), 
                RepresentationType.Dynamic])),
        
          ];

        let rt = {};
        for(let entry of entries)
          rt[entry.type] = entry;
        return rt;
    }
}

let Warehouse  = new WH();

Warehouse.protocols.add("iip", (name, attributes) => Warehouse.new(DistributedConnection, name, null, null, null, attributes));
Warehouse.protocols.add("mem", (name, attributes) => Warehouse.new(MemoryStore, name, null, null, null, attributes));
Warehouse.protocols.add("db", (name, attributes) => Warehouse.new(IndexedDBStore, name, null, null, null, attributes));


export default Warehouse;

