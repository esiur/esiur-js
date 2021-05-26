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

import {DC, BL} from '../../Data/DataConverter.js';
import DataType from "../../Data/DataType.js";
import Structure from '../../Data/Structure.js';
import IResource from '../IResource.js';
import ResourceTemplate from './ResourceTemplate.js';

export default class TemplateDataType
{

    static typesDefinitions = [
        "var",
        "bool",
        "sbyte",
        "byte",
        "char",
        "short",
        "ushort",
        "int",
        "uint",
        "long",
        "ulong",
        "float",
        "double",
        "decimal",
        "date",
        "resource",
        "DistributedResource",
        "ResourceLink",
        "string",
        "structure"
    ];

    get typeTemplate() {
        return this.typeGuid == null ? null : Warehouse.getTemplateByType(this.typeGuid);
    }

    //@TODO: implement this
    static fromType(type)
    {
        var isArray = type instanceof Array;
        if (isArray)
            type = type[0]
        
        var dataType = 0;
        var typeGuid = null;


        if (!isNaN(type))
            dataType = type;
        else if (type == Structure)
            dataType = DataType.Structure;
        else if (typeof type == "string")
        {
            var tIndex = this.typesDefinitions.indexOf(type);
            dataType = tIndex > -1 ? tIndex : 0;
        }
        else if (type?.prototype instanceof IResource)
        {
            dataType = DataType.Resource;
            typeGuid = ResourceTemplate.getTypeGuid(type);
        }

        if (isArray)
            dataType |= DataType.VarArray;

        return new TemplateDataType(DataType.StructureArray);

        
    }

        
    compose()
    {
        if (this.type == DataType.Resource ||
                this.type == DataType.ResourceArray)
        {
            return BL()
                .addUint8(this.type)
                .addUint8Array(this.typeGuid)
                .toDC();
        }
        else
            return DC.from([this.type]);
    }

    constructor(type, guid){
        this.type = type;
        this.typeGuid = guid;
    }

    static parse(data, offset)
    {
        var type = data.getUint8(offset++);
        if (type == DataType.Resource ||
            type == DataType.ResourceArray)
        {
            var guid = data.getGuid(offset);
            return {size: 17, value: new TemplateDataType(type, guid)};
        }
        else
            return {size: 1, value: new TemplateDataType(type)};
    }
}