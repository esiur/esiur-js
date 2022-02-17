/*
* Copyright (c) 2017-2021 Ahmed Kh. Zamil
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
 * Created by Ahmed Zamil on 03/05/2021.
 */

"use strict";  

import IResource from '../../Resource/IResource.js';
import AsyncReply from '../../Core/AsyncReply.js';
import Codec from '../../Data/Codec.js';
import Structure from '../../Data/Structure.js';
import IIPPacketAction from '../Packets//IIPPacketAction.js';
import EventTemplate from '../../Resource/Template/EventTemplate.js';
import AsyncException from '../../Core/AsyncException.js';
import ExceptionCode from '../../Core//ExceptionCode.js';
import ErrorType from '../../Core/ErrorType.js';
import DistributedConnection from './DistributedConnection.js';

export default class DistributedServer extends IResource
{
    destroy()
    {
        this.connections = [];
        this.destroyed = true;
        this._emit("destroy", this);
    }

    trigger(type)
    {
        return new AsyncReply(true);
    }

    get membership() {
        return this.instance.attributes.get("membership");
    }

    get entryPoint() {
        return this.instance.attributes.get("entryPoint");
    }

    constructor()
    {
        super();
        this.connections = [];
    }

    //@TODO: con.off("close", ...)
    add() {
        let self = this;
        let con = new DistributedConnection(this);
        con.on("close", () => self.remove(con));
        this.connections.push(con);
        return con;
    }

    remove(connection){
        let i = this.connections.indexOf(connection);
        if (i > -1)
            this.connections.splice(i, 1);
    }
}