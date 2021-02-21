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

import AsyncBag from '../Core/AsyncBag.js';
import AsyncReply from '../Core/AsyncReply.js';
import IDestructible from '../Core/IDestructible.js';

export const ResourceTrigger =
{
        Open : 0,
        Initialize: 1,
        Terminate: 2,
        Configure: 3,
        SystemInitialized: 4,
        SystemTerminated: 5,
        SystemReload: 6
};

export default class IResource extends IDestructible
{
    trigger(trigger)
    {
        return new AsyncReply(true);
    }

    constructor()
    {
        super();
    }

    static get template()
    {
        return {
                namespace: "Esiur",
                properties: [],
                functions: [],
                events: []
            }
    }
}
