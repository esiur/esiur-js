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

import AsyncException from './AsyncException.js';

export const ErrorType = {
    Management: 0,
    Exception: 1
};

export const ProgressType =  {
    Execution: 0,
    Network: 1
};

export default class AsyncReply
{
    then(callback)
    {
        this.callbacks.push(callback);
        
        if (this.ready)
        {
            callback(this.result, this);

            if (!this.taskExpired)
            {
                this.taskExpired = true;
                this.resolveTask(this.result);
            }
        }

        return this;
    }

    catch(callback)
    {
        return error(callback);
    }
    
    error(callback)
    {
        this.errorCallbacks.push(callback);

        if (this.exception.raised)
        {
            callback(this.exception);
            
            if (!this.taskExpired)
            {   
                this.taskExpired = true; 
                this.rejectTask(this.exception);
            }
        }

        return this;
    }

    progress(callback)
    {
        this.progressCallbacks.push(callback);
        return this;
    }

    chunk(callback)
    {
        this.chunkCallbacks.push(callback);
        return this;
    }

    trigger(result)
    {
        this.result = result;
        this.ready = true;

        for(var i = 0; i < this.callbacks.length; i++)
            this.callbacks[i](result, this);

        
        if (!this.taskExpired)
        {
            this.taskExpired = true;
            this.resolveTask(this.result);
        }
    }


    triggerError(type, code, message)//exception)
    {
        if (this.ready)
            return;

        if (type instanceof Exception)
        {
            code = type.code;
            message = type.message;
            type = type.type;
        }

        this.exception.raise(type, code, message);// = exception;

        for(var i = 0; i < this.errorCallbacks.length; i++)
            this.errorCallbacks[i](this.exception, this);

            
        if (!this.taskExpired)
        {   
            this.taskExpired = true; 
            this.rejectTask(this.exception);
        }
    }

    triggerProgress(type, value, max)
    {
        if (this.ready)
            return;

        for(var i = 0; i < this.progressCallbacks.length; i++)
            this.progressCallbacks[i](type, value, max, this);
    }

    triggerChunk(value)
    {
        if (this.ready)
            return;

        for(var i = 0; i < this.chunkCallbacks.length; i++)
            this.chunkCallbacks[i](value, this);
    }

    constructor(result)
    {
        this.callbacks = [];
        this.errorCallbacks = [];
        this.progressCallbacks = [];
        this.chunkCallbacks = [];
        this.exception = new AsyncException();// null;

        var self = this;

        this.task = new Promise(function(resolve, reject){
            self.resolveTask = resolve;
            self.rejectTask = reject;    
        });


        if (result !== undefined) {
            this.result = result;
            this.ready = true;
            this.taskExpired = true;            
            this.resolveTask(result);
        }
        else
        {
            this.taskExpired = false;            
            this.ready = false;
            this.result = null;
        }
    }
}