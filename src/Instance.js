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
class Instance extends IEventHandler
{

    getAge(index)
    {
        if (index < this.ages.Count)
            return this.ages[index];
        else
            return 0;
    }


    deserialize(properties)
    {
        for(var i = 0; i < this.template.properties.length; i++)
            this.resource[this.template.properties[i].name] = properties[i];
        return true;
    }

    serialize()
    {
        var props = [];

        for (var i = 0; i < this.template.properties.length; i++)
            props.push(this.resource[this.template.properties[i].name]);

        return props;
    }

    isStorable()
    {
        return resource instanceof Storable;
    }


    modified(propertyName = null, newValue = null, oldValue = null)
    {
        if (propertyName == null)
            propertyName = modified.caller.name;

        if (newValue == null)
        {
            var val = {};
            if (this.getPropertyValue(propertyName, val))
              super._emit("ResourceModified", this.resource, propertyName, val.value, oldValue);
        }
        else
            super._emit("ResourceModified", this.resource, propertyName, newValue, oldValue);
    }

    emitResourceEvent(name, receivers, args)
    {
        super._emit("ResourceEventOccured", this.resource, name, receivers, args);
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



    constructor(id, name, resource, store)
    {
        super();

        this.store = store;
        this.resource = resource;
        this.id = id;
        this.name = name;

        this.children = new AutoList();
        this.parents = new AutoList();

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

        this.template = Warehouse.getTemplateByType(this.resource.constructor);

        // set ages
        this.ages = new Uint32Array(this.template.properties.length);


        // connect events
        var makeHandler = function(name, receivers, args)
        {
            return new function(receivers, args)
            {
                self.emitResourceEvent(name, receivers, args);
            };
        };

        for (var i = 0; i < this.template.events.length; i++)
           this.resource.on(this.template.events[i].name, makeHandler(this.template.events[i].name));

    }

}
