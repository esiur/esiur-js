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
 * Created by Ahmed Zamil on 18/11/2017.
 */
"use strict";  

import ExceptionCode from './ExceptionCode.js';

export default class AsyncException extends Error
{
     constructor()
     {
         super();
         this.raised = false;
     }

     raise(type, code, message)
     {
         this.type = (type == 0 ? "Management" : "Execusion");
         this.code = code;

         if (type == 0)
         {
            for(var i in ExceptionCode)
                if (ExceptionCode[i] == code)
                {
                    this.message = i;
                    break;
                }
        }
        else
            this.message = message;

        this.raised = true;
     }

     toString()
     {
         return this.type + " (" + this.code + ") : " + this.message;
     }
 }