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
var Warehouse = {

    stores: [],
    resources: {},
    resourceCounter: 0,
    templates: {},

    new(type, name, store = null, parent = null)
    {
        var res = type();
        Warehouse.put(res, name, store, parent);
        return res;
    },

get: function(id)
    {
        if (Warehouse.resources[id])
            return new AsyncReply(Warehouse.resources[id]);
        else
            return null;
    },

    put: function(resource, name, store, parent){
        resource.instance = new Instance(Warehouse.resourceCounter++, name, resource, store);
        //resource.instance.children.on("add", Warehouse._onChildrenAdd).on("remove", Warehouse._onChildrenRemove);
        //resource.instance.parents.on("add", Warehouse._onParentsAdd).on("remove", Warehouse._onParentsRemove);

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
            Warehouse.stores.push(resource);
        else
            store.put(resource);

        Warehouse.resources[resource.instance.id] = resource;
    },

    _onParentsRemove: function(value)
    {
        if (value.instance.children.contains(value))
            value.instance.children.remove(value);
    },

    _onParentsAdd: function(value)
    {
        if (!value.instance.children.contains(value))
            value.instance.children.add(value);
    },

    _onChildrenRemove: function(value)
    {
        if (value.instance.parents.contains(value))
            value.instance.parents.remove(value);
    },

    _onChildrenAdd: function(value)
    {
        if (!value.instance.parents.contains(value))
            value.instance.parents.add(value);
    },

    putTemplate: function(template)
    {
        if (Warehouse.templates[template.classId])
            Warehouse.templates[template.classId] = template;
    },

    getTemplateByType: function(type)
    {
        // loaded ?
        for (var t in Warehouse.templates)
            if (Warehouse.templates[t].className == typeof(type))
                return t;

        var template = new ResourceTemplate(type);
        Warehouse.templates[template.classId] = template;

        return template;
    },

    getTemplateByClassId: function(classId)
    {
        if (Warehouse.templates[classId])
            return new AsyncReply(Warehouse.templates[classId]);
         return null;
    },

    getTemplateByClassName: function(className)
    {
        for(var t in Warehouse.templates)
        if (Warehouse.templates[t].className == className)
            return new AsyncReply(t);

        return null;
    }
};