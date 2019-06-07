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

class AsyncQueue extends AsyncReply
{

    constructor()
    {
        super();
        this.list = [];

        var self = this;

        this.processQueue = function ()
        {
            for (var i = 0; i < self.list.length; i++)
                if (self.list[i].ready)
                {
                    self.trigger(self.list[i].result);
                    self.list.splice(i, 1);
                    i--;
                }
                else
                    break;

            self.ready = (self.list.length == 0);
        }
    }

    add(reply)
    {
        this.list.push(reply);
        this.ready = false;
        reply.then(this.processQueue);
    }

    remove(reply)
    {
        this.list.splice(this.list.indexOf(reply), 1);
        this.processQueue();
    }



}