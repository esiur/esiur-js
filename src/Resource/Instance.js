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
 * Created by Ahmed Zamil on 29/08/2017.
 */

"use strict";  

import IEventHandler from '../Core/IEventHandler.js';
import IPermissionsManager from '../Security/Permissions/IPermissionsManager.js';
import AutoList from '../Data/AutoList.js';
import KeyList from '../Data/KeyList.js';
import PropertyValue from '../Data/PropertyValue.js';
import CustomResourceEvent from './CustomResourceEvent.js';
import Warehouse from './Warehouse.js';
import Ruling from '../Security/Permissions/Ruling.js';
import TypedMap from '../Data/TypedMap.js';
import TypedList from '../Data/TypedList.js';
import EventOccurredInfo from './EventOccurredInfo.js';
import PropertyModificationInfo from './PropertyModificationInfo.js';
import PropertyValueArray from '../Data/PropertyValueArray.js';

export default class Instance extends IEventHandler
{

    getAge(index)
    {
        if (index < this.ages.length)
            return this.ages[index];
        else
            return 0;
    }

    setAge(index, value)
    {
        if (index < this.ages.length)
        {
            this.ages[index] = value;
            if (value > this.instanceAge)
                this.instanceAge = value;
        }
    }
 
    getModificationDate(index)
    {
        if (index < this.modificationDates.length)
            return this.modificationDates[index];
        else
            return new Date(0);
    }

    setModificationDate(index, value)
    {
        if (index < this.modificationDates.length)
        {
            this.modificationDates[index] = value;

            if (value > this.instanceModificationDate)
                this.instanceModificationDate = value;
        }
    }

    loadProperty(name, age, modificationDate, value)
    {
        let r = self.resource.deref();

        if (r == null) return;


        var pt = this.template.getPropertyTemplateByName(name);

        if (pt == null)
            return false;

    

        r[name] = value;

        this.setAge(pt.index, age);
        this.setModificationDate(pt.index, modificationDate);

        return true;
    }

    deserialize(properties)
    {

        for (var i = 0; i < properties.length; i++)
        {
            var pt = this.template.GetPropertyTemplateByIndex(i);
            if (pt != null)
            {
                var pv = properties[i];
                this.loadProperty(pt.name, pv.age, pv.date, pv.value);
            }
        }

        return true;
    }

    serialize()
    {
        let r = this.resource.deref();

        if (r == null) return;


        var props = new PropertyValueArray();

        for (var i = 0; i < this.template.properties.length; i++)
            props.push(new PropertyValue(r[this.template.properties[i].name], 
                                         this.ages[this.template.properties[i].index], 
                                         this.modificationDates[this.template.properties[i].index]));
        
        return props;
    }

    isStorable()
    {
        return false;
    }

    emitModification(pt, value)
    {
        let resource = this.resource.deref();

        if (resource == null) return;


        this.instanceAge++;

        var now = new Date();

        this.ages[pt.index] = this.instanceAge;
        this.modificationDates[pt.index] = now;
        
        if (pt.recordable)
            this.store.record(resource, pt.name, value, this.ages[pt.index], now);
        else
            this.store.modify(resource, pt.name, value, this.ages[pt.index], now);

        let pmInfo = new PropertyModificationInfo(resource, pt, value, this.instanceAge);

        super._emit("PropertyModified", pmInfo);
        resource._emit(`:${pt.name}`, value);
        
    }

    modified(propertyName = null)
    {
        if (propertyName == null)
            propertyName = modified.caller.name;

        var val = {};
        if (this.getPropertyValue(propertyName, val))
        {
            var pt = this.template.getPropertyTemplateByName(propertyName);
            this.emitModification(pt, val.value)
        }
    }

    _emitResourceEvent(issuer, receivers, eventTemplate, value)
    {
        let resource = this.resource.deref();

        if (resource == null) return;

        super._emit("EventOccurred",
            new EventOccurredInfo(resource, eventTemplate, value, issuer, receivers));
        
    }

    getPropertyValue(name, resultObject)
    {
        let resource = this.resource.deref();

        if (resource == null) return;

        for (var i = 0; i < this.template.properties.length; i++)
            if (this.template.properties[i].name == name)
            {
                resultObject.value = resource[name];
                return true;
            }

        return false;
    }


    get age() {
        return this.instanceAge;
    }

    constructor(id, name, resource, store, customTemplate = null, age = 0)
    {
        super();

        this.store = store;
        this.resource = new WeakRef(resource);
        this.id = id;
        this.name = name;

        this.instanceAge = age;
        this.instanceModificationDate = new Date(0);

        this.children = new AutoList();
        this.parents = new AutoList();
        this.managers = new AutoList();

        this.attributes = new KeyList();

        var self = this;

        this.children.on("add", function(value){
            let r = self.resource.deref();
            if (r != null)
                value.instance.parents.add(r);
        });

        this.children.on("remove", function(value){
            let r = self.resource.deref();
            if (r != null)

            value.instance.parents.remove(r);
        });


        resource.on("destroy", function(sender){
            self._emit("ResourceDestroyed", sender);
        });

        if (customTemplate != null)
            this.template = customTemplate;
        else
            this.template = Warehouse.getTemplateByType(resource.constructor);

        // set ages
        this.ages = [];
        this.modificationDates = [];

        for(var i = 0; i < this.template.properties.length; i++)
        {
            this.ages.push(0);
            this.modificationDates.push(new Date(0));
        }

        // connect events
        for (let i = 0; i < this.template.events.length; i++)
           resource.on(this.template.events[i].name, this._makeHandler(this.template.events[i]));
        
    }

    _makeHandler(eventTemplate)
    {
        var self = this;
        return function(argument)
        {
            if (argument instanceof CustomResourceEvent)
                self._emitResourceEvent(argument.issuer, argument.receivers, eventTemplate, argument.value);
            else
                self._emitResourceEvent(null, null, eventTemplate, argument);
        };
    }


    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Ruling.</returns>
    applicable(session, action, member, inquirer)
    {
        let resource = this.resource.deref();

        if (resource == null) return;

        for (var i = 0; i < this.managers.length; i++)
        {
            var ruling = this.managers.item(i).applicable(resource, session, action, member, inquirer);
            if (ruling != Ruling.DontCare)
                return ruling;
        }
        
        return Ruling.DontCare;
    }


    
    removeAttributes(attributes = null)
    {
        if (attributes == null)
            this.attributes.clear();
        else
        {
            for(var i = 0; i < attributes.length; i++)
                this.attributes.remove(attributes[i]);
        }

        return true;
    }

    getAttributes(attributes = null)
    {
        var st = new (TypedMap.of(String, Object))();

        if (attributes == null)
        {
            attributes = this.attributes.keys.slice(0);
            attributes.push("managers");
        }

        for(var i = 0; i < attributes.length; i++)
        {
            var attr = attributes[i];

            if (attr == "name")
                st.set("name", this.name);

            else if (attr == "managers")
            {
                var mngrs = new (TypedList.of(TypedMap.of(String, Object)));

                for(var j = 0; j < this.managers.length; j++)
                {
                    var manager = this.managers.item(j);
                    var sm = new (TypedMap.of(String, Object));
                    sm.set("type",  manager.constructor.name);
                    sm.set("settings", manager.settings);
                    
                    mngrs.push(sm);
                }

                st.set("managers", mngrs);

            }
            else
                st.set(attr, this.attributes.item(attr));
        }

        return st;
    }


    setAttributes(attributes, clearAttributes = false)
    {        

        if (clearAttributes)
            this.attributes.clear();


        for (var attr in attributes)
            if (attr == "name")
                this.name = attributes[attr];
            else if (attr == "managers")
            {
                this.managers.clear();

                var mngrs = attributes[attr];

                for (var i = 0; i < mngrs.length; i++)
                {
                    var mngr = mngrs[i];
                    
                    var type = window[mngr];
                    
                        var settings = mngr["settings"];

                        var manager = new (Function.prototype.bind.apply(type));

                        if (manager instanceof IPermissionsManager)
                        {
                            let r = this.resource.deref();
                            if (r == null) return;
                    
                            manager.initialize(settings, r);
                            this.managers.add(manager);
                        }
                        else
                            return false;
                }
            }
            else
            {
                this.attributes.set(attr, attributes[attr]);
            }
            

        return true;
    }

    get link()
    {
        let resource = this.resource.deref();
        if (resource == null)
            return;

        if (resource == this.store){
            return this.name;
        } else {
            return this.store.link(resource);
        }
    }
}