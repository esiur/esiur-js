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

import AsyncReply from './AsyncReply.js';

export default class AsyncBag extends AsyncReply
{
    constructor() {
        super();
        this.replies = [];
        this.results = [];
        this.count = 0;
        this.sealedBag = false;
    }

    seal()
    {
        this.sealedBag = true;

        if (this.results.length == 0)
            this.trigger([]);

        var self = this;

        var singleTaskCompleted = function(taskIndex)
        {
            return function(results, reply){
                self.results[taskIndex] = results;
                self.count++;
                if (self.count == self.results.length)
                    self.trigger(self.results);
            };
        };

        for(var i = 0; i < this.results.length; i++)
            this.replies[i].then(singleTaskCompleted(i));

        /*
            this.replies[i].then(function(r, reply){
                self.results[self.replies.indexOf(reply)] = r;
                self.count++;
                if (self.count == self.results.length)
                    self.trigger(self.results);
            });
        */
     }

     add(reply)
     {
         if (!this.sealedBag) {
             this.replies.push(reply);
             this.results.push(null);
         }
     }
}