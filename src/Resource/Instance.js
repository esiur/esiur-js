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
import StructureArray from '../Data/StructureArray.js';
import AutoList from '../Data/AutoList.js';
import KeyList from '../Data/KeyList.js';
import Structure from '../Data/Structure.js';
import PropertyValue from '../Data/PropertyValue.js';
import CustomResourceEvent from './CustomResourceEvent.js';
import Warehouse from './Warehouse.js';

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
        var pt = this.template.getPropertyTemplateByName(name);

        if (pt == null)
            return false;

        this.resource[name] = value;

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
        var props = [];

        for (var i = 0; i < this.template.properties.length; i++)
            props.push(new PropertyValue(this.resource[this.template.properties[i].name], 
                                         this.ages[this.template.properties[i].index], 
                                         this.modificationDates[this.template.properties[i].index]));
        
        return props;
    }

    isStorable()
    {
        return resource instanceof Storable;
    }

    emitModification(pt, value)
    {
        this.instanceAge++;

        var now = new Date();

        this.ages[pt.index] = this.instanceAge;
        this.modificationDates[pt.index] = now;
        
        if (pt.recordable)
            this.store.record(this.resource, pt.name, value, this.ages[pt.index], now);

        super._emit("ResourceModified", this.resource, pt.name, value);  
        this.resource._emit("modified", pt.name, value);
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

    _emitResourceEvent(issuer, receivers, name, args)
    {
        super._emit("ResourceEventOccurred", this.resource, issuer, receivers, name, args);
    }

    getPropertyValue(name, resultObject)
    {
        for (var i = 0; i < this.template.properties.length; i++)
            if (this.template.properties[i].name == name)
            {
                resultObject.value = this.resource[name];
                return true;
            }

        return false;
    }



    constructor(id, name, resource, store, customTemplate = null, age = 0)
    {
        super();

        this.store = store;
        this.resource = resource;
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
            value.instance.parents.add(self.resource);
        });

        this.children.on("remove", function(value){
            value.instance.parents.remove(self.resource);
        });


        this.resource.on("Destroy", function(sender){
            self._emit("ResourceDestroyed", sender);
        });

        if (customTemplate != null)
            this.template = customTemplate;
        else
            this.template = Warehouse.getTemplateByType(this.resource.constructor);

        // set ages
        this.ages = [];
        this.modificationDates = [];

        for(var i = 0; i < this.template.properties.length; i++)
        {
            this.ages.push(0);
            this.modificationDates.push(new Date(0));
        }

        // connect events
        for (var i = 0; i < this.template.events.length; i++)
           this.resource.on(this.template.events[i].name, this._makeHandler(this.template.events[i].name));
        
    }

    _makeHandler(name)
    {
        var self = this;
        return function(args)
        {
            if (args instanceof CustomResourceEvent)
                self._emitResourceEvent(args.issuer, args.receivers, name, args.params);
            else
                self._emitResourceEvent(null, null, name, args);
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
        for (var i = 0; i < this.managers.length; i++)
        {
            var r = this.managers.item(i).applicable(this.resource, session, action, member, inquirer);
            if (r != Ruling.DontCare)
                return r;
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
        var st = new Structure();

        if (attributes == null)
        {
            attributes = this.attributes.keys.slice(0);
            attributes.push("managers");
        }

        for(var i = 0; i < attributes.length; i++)
        {
            var attr = attributes[i];

            if (attr == "name")
                st["name"] = this.name;

            else if (attr == "managers")
            {
                var mngrs = new StructureArray();

                for(var j = 0; j < this.managers.length; j++)
                {
                    var manager = this.managers.item(j);
                    var sm = new Structure();
                    sm["type"] = manager.constructor.name;
                    sm["settings"] = manager.settings;
                    
                    mngrs.push(sm);
                }

                st["managers"] = mngrs;

            }
            else
                st[attr] = this.attributes.item(attr);
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
                            manager.initialize(settings, this.resource);
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
}