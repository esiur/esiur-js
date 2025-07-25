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

"use strict";

import FunctionTemplate from './FunctionTemplate.js';
import PropertyTemplate from './PropertyTemplate.js';
import EventTemplate from './EventTemplate.js';
import SHA256 from '../../Security/Integrity/SHA256.js';
import {DC, BL} from '../../Data/DC.js';
import ArgumentTemplate from './ArgumentTemplate.js';
import IResource from '../IResource.js';
import IRecord from '../../Data/IRecord.js';
import TemplateType from './TemplateType.js'
import Warehouse from '../Warehouse.js';
import DistributedConnection from '../../Net/IIP/DistributedConnection.js';

import ConstantTemplate from './ConstantTemplate.js';
import IEnum from '../../Data/IEnum.js';
import DistributedResource from '../../Net/IIP/DistributedResource.js';
import RepresentationType from '../../Data/RepresentationType.js';
import Codec from '../../Data/Codec.js';

export default class TypeTemplate {

    isWrapper = false;
    properties = [];
    events = [];
    functions = [];
    members = [];
    constants = [];

    getEventTemplateByName(eventName) {
        for (var i = 0; i < this.events.length; i++)
            if (this.events[i].name == eventName)
                return this.events[i];
        return null;
    }

    getEventTemplateByIndex(index) {
        for (var i = 0; i < this.events.length; i++)
            if (this.events[i].index == index)
                return this.events[i];
        return null;
    }

    getFunctionTemplateByName(functionName) {
        for (var i = 0; i < this.functions.length; i++)
            if (this.functions[i].name == functionName)
                return this.functions[i];
        return null;
    }

    getFunctionTemplateByIndex(index) {
        for (var i = 0; i < this.functions.length; i++)
            if (this.functions[i].index == index)
                return this.functions[i];
        return null;
    }

    getPropertyTemplateByName(propertyName) {
        for (var i = 0; i < this.properties.length; i++)
            if (this.properties[i].name == propertyName)
                return this.properties[i];
        return null;
    }

    getPropertyTemplateByIndex(index) {
        for (var i = 0; i < this.properties.length; i++)
            if (this.properties[i].index == index)
                return this.properties[i];
        return null;
    }

    getConstantTemplateByName(constantName) {
        for (var i = 0; i < this.constants.length; i++)
            if (this.constants[i].name == constantName)
                return this.constants[i];
        return null;
    }

    getConstantTemplateByIndex(index) {
        for (var i = 0; i < this.constants.length; i++)
            if (this.constants[i].index == index)
                return this.constants[i];
        return null;
    }


    /*

     template: {
     properties: [
     {name: 'size', read: null, write: null}
     ],
     functions: [

     ],
     events: [

     ]
     }
     */

     
     static getTypeUUID(type) {
        return this.getTypeUUIDByName(type.template.namespace + "." + type.prototype.constructor.name);
     }

     static getTypeUUIDByName(typeName)
     {
         let hash =  SHA256.compute(DC.stringToBytes(typeName));
 
         hash.setUint8(6, (hash.getUint8(6) & 0xF) | 0x80);
         hash.setUint8(8, (hash.getUint8(8) & 0xF) | 0x80);

         return hash.getUUID(0);
     }


     static getDependencies(template)
     {

         var list = [];

         list.push(template);

         var getDependenciesFunc = null;

         getDependenciesFunc = (tmp, bag) =>
         {
             if (template.definedType == null)
                 return;

             // functions
             for(let i = 0; i < tmp.functions.length; i++)
             {
                 let ft = tmp.functions[i];

                 var frtt = Warehouse.getTemplateByType(ft.methodInfo.returnType);
                 if (frtt != null)
                 {
                     if (!bag.includes(frtt))
                     {
                         list.push(frtt);
                         getDependenciesFunc(frtt, bag);
                     }
                 }

                 var args = ft.methodInfo.args;

                 for(let j = 0; j < args.length - 1; j++)
                 {
                     var fpt = Warehouse.getTemplateByType(args[j].type);
                     if (fpt != null)
                     {
                         if (!bag.includes(fpt))
                         {
                             bag.push(fpt);
                             getDependenciesFunc(fpt, bag);
                         }
                     }
                 }

                 // skip DistributedConnection argument
                 if (args.length > 0)
                 {
                     var last = args[args.length - 1];
                     if (last.type == DistributedConnection)
                     {
                         let fpt = Warehouse.getTemplateByType(last.type);
                         if (fpt != null)
                         {
                             if (!bag.includes(fpt))
                             {
                                 bag.push(fpt);
                                 getDependenciesFunc(fpt, bag);
                             }
                         }
                     }
                 }

             }

             // properties
             for (let i = 0; i < tmp.properties.length; i++)
             {
                 var p = tmp.properties[i];
                 var pt = Warehouse.getTemplateByType(p.propertyInfo.type);
                 if (pt != null)
                 {
                     if (!bag.includes(pt))
                     {
                         bag.push(pt);
                         getDependenciesFunc(pt, bag);
                     }
                 }
             }

             // events
             for(let i = 0; i < tmp.events.length; i++)
             {
                 var e = tmp.events[i];
                 var et = Warehouse.getTemplateByType(e.eventInfo.type);

                 if (et != null)
                 {
                     if (!bag.includes(et))
                     {
                         bag.add(et);
                         getDependenciesFunc(et, bag);
                     }
                 }
             }
         };

         getDependenciesFunc(template, list);

         return list.filter((value, index, self) => self.indexOf(value) === index);
     }

     get type() {
        return this.templateType;
     }

    constructor(type, addToWarehouse) {

     
        if (type === undefined)
            return;
        
            
        if (type.prototype instanceof IRecord)
            this.templateType = TemplateType.Record;
        else if (type.prototype instanceof IResource)
            this.templateType = TemplateType.Resource;
        else if (type.prototype instanceof IEnum)
            this.templateType = TemplateType.Enum;
        else
            throw new Error("Type must implement IResource, IRecord, IEnum or a subtype of DistributedResource.");

        this.isWrapper = (type.prototype instanceof DistributedResource);

        this.definedType = type;

        let describer = type.template;

        // set UUID
        this.className = describer.namespace + "." + (describer.className ?? type.prototype.constructor.name);
        this.classId = describer.classId ?? TypeTemplate.getTypeUUIDByName(this.className);// SHA256.compute(DC.stringToBytes(this.className)).getUUID(0);


        if (addToWarehouse)
            Warehouse.putTemplate(this);

        //byte currentIndex = 0;

        if (describer.properties != null)
            for (let i = 0; i < describer.properties.length; i++) {
                //[name, type, {read: comment, write: comment, recordable: }]
                let pi = describer.properties[i];
                let pt = new PropertyTemplate(this, i, pi.name, false,
                     RepresentationType.fromType(pi.type) ?? RepresentationType.Void, 
                     pi.readAnnotation, pi.writeAnnotation, pi.recordable);
                pt.propertyInfo = pi;
                this.properties.push(pt);
            }

        
        if (describer.constants != null)
            for (let i = 0; i < describer.constants.length; i++) {
                let ci = describer.constants[i];
                let ct = new ConstantTemplate(this, i, ci.name, false,
                     RepresentationType.fromType(ci.type) ?? RepresentationType.Void, 
                     ci.value, ci.annotation);
                ct.propertyInfo = ci;
                this.constants.push(ct);
            }

        if (this.templateType == TemplateType.Resource)
        {
            if (describer.events != null)
            {
                for (let i = 0; i < describer.events.length; i++) {

                    // [name, type, {listenable: true/false, help: ""}]
                    var ei = describer.events[i];
                    var et = new EventTemplate(this, i, ei.name, false,
                         RepresentationType.fromType(ei.type) ?? RepresentationType.Void, 
                         ei.annotation, ei.listenable)
                    et.eventInfo = ei;
                    this.events.push(et);
                }
            }

            if (describer.functions != null)
            {
                for (let i = 0; i < describer.functions.length; i++) {

                    var fi = describer.functions[i];

                    let args = [];
                    for(let ai = 0; ai < fi.args.length; ai++)
                        args.push(new ArgumentTemplate(fi.args[ai].name, RepresentationType.fromType(fi.args[ai].type)
                        ?? RepresentationType.Dynamic, fi.args[ai].optional, ai));

                // [name, {param1: type, param2: int}, returnType, "Description"]
                    let isStatic = type[fi.name] instanceof Function;

                    var ft = new FunctionTemplate(this, i, fi.name, false, isStatic, args,
                         RepresentationType.fromType(fi.returnType) ?? RepresentationType.Void,
                          fi.annotation);

                    ft.methodInfo = fi;

                    this.functions.push(ft);
                }
            }
        }


        // append signals
        for (let i = 0; i < this.events.length; i++)
            this.members.push(this.events[i]);
        // append slots
        for (let i = 0; i < this.functions.length; i++)
            this.members.push(this.functions[i]);
        // append properties
        for (let i = 0; i < this.properties.length; i++)
            this.members.push(this.properties[i]);
        // append constants
        for (let i = 0; i < this.constants.length; i++)
            this.members.push(this.constants[i]);

        // bake it binarily
        let b = BL();
        let hasClassAnnotation = describer.annotation != null;

        var cls = DC.stringToBytes(this.className);
        b.addUint8( (hasClassAnnotation ? 0x40 : 0 ) | this.templateType)
            .addUint8Array(this.classId.value)
            .addUint8(cls.length)
            .addUint8Array(cls);

        if (hasClassAnnotation)
        {
            var classAnnotationBytes = DC.stringToBytes(describer.annotation);
            b.addUint16(classAnnotationBytes.length)
             .addUint8Array(classAnnotationBytes);
            this.annotation = describer.annotation;
        }

        b.addUint32(describer.version)
            .addUint16(this.members.length);

        for (let i = 0; i < this.functions.length; i++)
            b.addUint8Array(this.functions[i].compose());

        for (let i = 0; i < this.properties.length; i++)
            b.addUint8Array(this.properties[i].compose());

        for (let i = 0; i < this.events.length; i++)
            b.addUint8Array(this.events[i].compose());

        this.content = b.toArray();
    }

    static getFunctionParameters(func)
    {
        var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
        //var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    static _getParamNames(func) {
        var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
        if(result === null)
            result = [];
        return result;
    }

    static parse(data, offset = 0, contentLength = -1) {

        if (contentLength == -1)
            contentLength = data.length;

        //var ends = offset + contentLength;
        //var oOffset = offset;

        // start parsing...

        var od = new TypeTemplate();
        od.content = data.clip(offset, contentLength);

        let hasParent = (data.getUint8(offset) & 0x80) > 0;
        let hasClassAnnotation = (data.getUint8(offset) & 0x40) > 0;

        od.templateType = data.getUint8(offset++) & 0xF;
    

        od.classId = data.getUUID(offset);
        offset += 16;
        od.className = data.getString(offset + 1, data.getUint8(offset));
        offset += data.getUint8(offset) + 1;

        if (hasParent) {
            od.parentId = data.getUUID(offset);
            offset += 16;
        }

        if (hasClassAnnotation) {
            let len = data.getUint16(offset);
            offset += 2;
            od.annotation = data.getString(offset, len);
            offset += len;
        }

        od.version = data.getInt32(offset);
        offset += 4;

        let methodsCount = data.getUint16(offset);
        offset += 2;

        let functionIndex = 0;
        let propertyIndex = 0;
        let eventIndex = 0;
        let constantIndex = 0;

        for (let i = 0; i < methodsCount; i++) {

            let inherited = (data.getUint8(offset) & 0x80) > 0;
            let type = (data.getUint8(offset) >> 5) & 0x3;
      
            if (type == 0) // function
            {
                let annotation = null;
                let isStatic = ((data[offset] & 0x4) == 0x4);
                let hasAnnotation = ((data.getUint8(offset++) & 0x10) == 0x10);

                let len = data.getUint8(offset++);
                let name = data.getString(offset, len);
                offset += len;

                // return type
                let dt = RepresentationType.parse(data, offset);

                offset += dt.size;

                //ft.returnType = returnType;

                // arguments count
                var argsCount = data.getUint8(offset++);
                var args = [];

                for (var a = 0; a < argsCount; a++)
                {
                    let {size: argSize, value: argType} = ArgumentTemplate.parse(data, offset, a);
                    args.push(argType);
                    offset += argSize;
                }

                if (hasAnnotation) // annotation ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    annotation = data.getString(offset, cs);
                    offset += cs;
                }

                let ft = new FunctionTemplate(od, functionIndex++, name, inherited, isStatic,
                    args, dt.type, annotation);
        
                od.functions.push(ft);
            }
            else if (type == 1)    // property
            {

                let hasReadAnnotation = ((data.getUint8(offset) & 0x8) == 0x8);
                let hasWriteAnnotation = ((data.getUint8(offset) & 0x10) == 0x10);
                let readAnnotation, writeAnnotation;
                let recordable = ((data.getUint8(offset) & 1) == 1);
                let permission = ((data.getUint8(offset++) >> 1) & 0x3);
                let len = data.getUint8(offset++);
                let name = data.getString(offset, len);
                offset += len;

                var dt = RepresentationType.parse(data, offset);

                offset += dt.size;

                if (hasReadAnnotation) // annotation ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    readAnnotation = data.getString(offset, cs);
                    offset += cs;
                }

                if (hasWriteAnnotation) // annotation ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    writeAnnotation = data.getString(offset, cs);
                    offset += cs;
                }

                let pt = new PropertyTemplate(od, propertyIndex++, name, inherited, dt.type, readAnnotation, writeAnnotation, recordable);

                od.properties.push(pt);
            }
            else if (type == 2) // Event
            {
                let hasAnnotation = ((data.getUint8(offset) & 0x10) == 0x10);
                let listenable = ((data.getUint8(offset++) & 0x8) == 0x8);
                let len = data.getUint8(offset++);
                let name = data.getString(offset, len);
                let annotation;

                offset += len;

                let dt = RepresentationType.parse(data, offset);
                    
                offset += dt.size;

                
                if (hasAnnotation) // annotation ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    annotation = data.getString(offset, cs);
                    offset += cs;
                }

                let et = new EventTemplate(od, eventIndex++, name, inherited, dt.type, annotation, listenable);
                od.events.push(et);

            }
            else if (type == 3) // constant
            {
                let annotation = null;
                let hasAnnotation = ((data[offset++] & 0x10) == 0x10);
        
                let name = data.getString(offset + 1, data[offset]);
                offset += data[offset] + 1;
        
                let dt = RepresentationType.parse(data, offset);
        
                offset += dt.size;
        
                let parsed = Codec.parse(data, offset, null, null);
        
                offset += parsed.size;
        
                if (hasAnnotation) // annotation ?
                {
                  let cs = data.getUint32(offset);
                  offset += 4;
                  annotation = data.getString(offset, cs);
                  offset += cs;
                }
        
                let ct = new ConstantTemplate(this, constantIndex++, name, inherited,
                    dt.type, parsed.reply.result, annotation);
        
                od.constants.push(ct);
            }
        }

        // append signals
        for (let i = 0; i < od.events.length; i++)
            od.members.push(od.events[i]);
        // append slots
        for (let i = 0; i < od.functions.length; i++)
            od.members.push(od.functions[i]);
        // append properties
        for (let i = 0; i < od.properties.length; i++)
            od.members.push(od.properties[i]);
        // append constants
        for (let i = 0; i < od.constants.length; i++)
            od.members.push(od.constants[i]);


        return od;
    }
}