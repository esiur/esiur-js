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
 * Created by Ahmed Zamil on 16/11/2017.
 */

"use strict";

const ActionType =
{
    Attach: 0,
    Delete: 1,
    Execute: 2,
    GetProperty: 3,
    SetProperty: 4,
    CreateResource: 5,
    UpdateAttributes: 6,
    InquireAttributes: 7,
    AddParent: 8,
    RemoveParent: 9,
    AddChild: 10,
    RemoveChild: 11,
    Rename: 12,
    ReceiveEvent: 13
};

const Ruling = {
    Denied: 0,
    Allowed: 1,
    DontCare: 2,
};

class IPermissionsManager
{
    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="resource">IResource.</param>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Allowed or denined.</returns>
    applicable(resource, session, action, member, inquirer)
    {

    }

    initialize(settings, resource)
    {

    }

    get settings()
    {

    }
}