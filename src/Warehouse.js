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


class Warehouse
{
    static new(type, name, store = null, parent = null, manager = null)
    {
        var res = type();
        Warehouse.put(res, name, store, parent, null, 0, manager);
        return res;
    }

    static get(id)
    {
        if (Number.isInteger(id))
        {
            //if (Warehouse.resources.contains(id))
                return new AsyncReply(Warehouse.resources.item(id));
            //else
            //    return null;
        }
        else
        {
            var p = id.split('/');
            var res = null;

            for(var s = 0; s < this.stores.length; s++)
            {
                var d = this.stores.at(s);
                if (p[0] == d.instance.name)
                {
                    var i = 1;
                    res = d;
                    while(p.length > i)
                    {
                        var si = i;

                        for (var r = 0; r < res.instance.children.length; r++)
                            if (res.instance.children.item(r).instance.name == p[i])
                            {
                                i++;
                                res = res.instance.children.item(r);
                                break;
                            }

                        if (si == i)
                            // not found, ask the store
                            return d.get(id.substring(p[0].length + 1));
                    }

                    return new AsyncReply(res);
                }
            }

            return new AsyncReply(null);
        }
    }


    static remove(resource)
    {
        
        if (Warehouse.resources.contains(resource.instance.id))
            Warehouse.resources.remove(resource.instance.id); 
        else
            return false;

        if (resource instanceof IStore)
        {
            Warehouse.stores.remove(resource);

            // remove all objects associated with the store
            var toBeRemoved = null;

            for (var i = 0; i < Warehouse.resources.length; i++)
            {
                var o = Warehouse.resources.at(i);
                if (o.instance.store == resource)
                {
                    if (toBeRemoved == null)
                        toBeRemoved = [];
                    toBeRemoved.push(o);
                }
            }

            if (toBeRemoved != null)
                for(var i = 0; i < toBeRemoved.length; i++)
                    Warehouse.remove(toBeRemoved[i]);
        }

        if (resource.instance.store != null)
            resource.instance.store.remove(resource);
        resource.destroy();

        return true;
    }

    static put(resource, name, store, parent, customTemplate = null, age = 0, manager = null){
        resource.instance = new Instance(Warehouse.resourceCounter++, name, resource, store, customTemplate, age);
        //resource.instance.children.on("add", Warehouse._onChildrenAdd).on("remove", Warehouse._onChildrenRemove);
        //resource.instance.parents.on("add", Warehouse._onParentsAdd).on("remove", Warehouse._onParentsRemove);

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
            Warehouse.stores.add(resource);
        else
            store.put(resource);

        Warehouse.resources.add(resource.instance.id, resource);
    }

    static _onParentsRemove(value)
    {
        if (value.instance.children.contains(value))
            value.instance.children.remove(value);
    }

    static _onParentsAdd(value)
    {
        if (!value.instance.children.contains(value))
            value.instance.children.add(value);
    }

    static _onChildrenRemove(value)
    {
        if (value.instance.parents.contains(value))
            value.instance.parents.remove(value);
    }

    static _onChildrenAdd(value)
    {
        if (!value.instance.parents.contains(value))
            value.instance.parents.add(value);
    }

    static putTemplate(template)
    {
        Warehouse.templates.add(template.classId.valueOf(), template);
    }

    static getTemplateByType(type)
    {
        // loaded ?
        for (var i = 0; i < Warehouse.templates.length; i++)
            if (Warehouse.templates.at(i).className == typeof(type))
                return Warehouse.templates.at(i);

        var template = new ResourceTemplate(type);
        Warehouse.templates.add(template.classId.valueOf(), template);
        
        return template;
    }

    static getTemplateByClassId(classId)
    {
        var template = Warehouse.templates.item(classId);
        return new AsyncReply(template);
    }

    static getTemplateByClassName(className)
    {
        for(var i = 0; i < Warehouse.templates.length; i++)
            if (Warehouse.templates.at(i).className == className)
                return new AsyncReply(Warehouse.templates.at(i));
        
        return new AsyncReply(null);
    }

    static _qureyIn(path, index, resources)
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
                    rt = rt.concat(Warehouse._qureyIn(path, index+1, resources.at(i).instance.children));

        return rt;
    }

    static query(path)
    {
        var p = path.split('/');
        return new AsyncReply(Warehouse._qureyIn(p, 0, Warehouse.stores));
    }
}

// Initialize
Warehouse.stores = new AutoList();
Warehouse.resources = new KeyList();
Warehouse.resourceCounter = 0;
Warehouse.templates = new KeyList();
