/*
* Copyright (c) 2017-2018 Ahmed Kh. Zamil
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
 * Created by Ahmed Zamil on 10/11/2018.
 */

"use strict";  

class CustomResourceEvent
{
    constructor(issuer, receivers, params)
    {
        this.issuer = issuer;
        this.receivers = receivers;
        this.params = params;
    }
}  
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
 * Created by Ahmed Zamil on 01/09/2017.
 */

"use strict";  

class NetworkBuffer {
    constructor() {
        this.neededDataLength = 0;
        this.data = new DC(0);
    }

    get protected() {
        return this.neededDataLength > this.data.length;
    }

    get available() {

        return this.data.length;
    }

    holdAllForNextWrite(src) {
        this.holdFor(src, src.length + 1);
    }

    holdForNextWrite(src, offset, size) {
        this.holdFor(src, offset, size, size + 1);
    }


    holdFor(src, offset, size, needed) {
        if (size >= needed)
            throw new Exception("Size >= Needed !");

        this.data = DC.combine(src, offset, size, this.data, 0, this.data.length);
        this.neededDataLength = needed;
    }

    holdAllFor(src, needed) {
        this.holdFor(src, 0, src.length, needed);
    }

    protect(data, offset, needed) {
        var dataLength = data.length - offset;

        // protection
        if (dataLength < needed) {
            this.holdFor(data, offset, dataLength, needed);
            return true;
        }
        else
            return false;
    }

    writeAll(src) {
        this.write(src, 0, src.length ? src.length : src.byteLength);
    }

    write(src, offset, length) {
        this.data = this.data.append(src, offset, length);
    }

    get canRead() {
        if (this.data.length == 0)
            return false;
        else if (this.data.length < this.neededDataLength)
            return false;
        return true;
    }

    read() {
        if (this.data.length == 0)
            return null;

        var rt = null;

        if (this.neededDataLength == 0) {
            rt = this.data;
            this.data = new DC(0);
        }
        else {
            if (this.data.length >= this.neededDataLength) {
                rt = this.data;
                this.data = new DC(0);
                this.neededDataLength = 0;
                return rt;
            }
            else {
                return null;
            }
        }

        return rt;
    }
}
  
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

const ExceptionCode = 
{
    HostNotReachable: 0,
    AccessDenied: 1,
    ResourceNotFound: 2,
    AttachDenied: 3,
    InvalidMethod: 4,
    InvokeDenied: 5,
    CreateDenied: 6,
    AddParentDenied: 7,
    AddChildDenied: 8,
    ViewAttributeDenied: 9,
    UpdateAttributeDenied: 10,
    StoreNotFound: 11,
    ParentNotFound: 12,
    ChildNotFound: 13,
    ResourceIsNotStore: 14,
    DeleteDenied: 15,
    DeleteFailed: 16,
    UpdateAttributeFailed: 17,
    GetAttributesFailed: 18,
    ClearAttributesFailed: 19,
    TemplateNotFound: 20,
    RenameDenied: 21,
    ClassNotFound: 22,
    MethodNotFound: 23,
    PropertyNotFound: 24,
    SetPropertyDenied: 25,
    ReadOnlyProperty: 26
};

class AsyncException extends Error
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
            for(var i in ExceptionCode)
                if (ExceptionCode[i] == code)
                {
                    this.message = i;
                    break;
                }
        else
            this.message = message;

        this.raised = true;
     }

     toString()
     {
         return this.type + " " + this.code + " " + this.message;
     }
 }  
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

 const AuthenticationType = {
    Host: 0,
    CoHost: 1,
    Client: 2,
    Alien: 3
 };

 class Authentication
{
    constructor(type)
    {
        this.type = type;
        this.state = 0;
        this.domain = null;
        this.username = null;
    }

    get fullName()
    {
        return this.domain + "@" + this.username;
    }
}
  

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

class Session
{
    constructor(localAuthentication, remoteAuthentication)
    {
         
        this.localAuthentication = localAuthentication;
        this.remoteAuthentication = remoteAuthentication;
        this.id = null;
        this.creation = null;
        this.modification = null;
    }
}
  
/*
* Copyright (c) 2017-2018 Ahmed Kh. Zamil
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
 * Created by Ahmed Zamil on 27/10/2018.
 */

"use strict";  

class DistributedPropertyContext
{
    constructor(p1, p2)
    {
        if(arguments.length == 1)
        {
            this.method = p1;
        }
        else if (arguments.length == 2)
        {
            this.connection = p1;
            this.value = p2;
        }
    }
}
  
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
 * Created by Ahmed Zamil on 06/11/2017.
 */

"use strict";  

class KeyList
 {
     constructor()
     {
         this.keys = [];
         this.values = [];
     }

     at(index)
     {
        return this.values[index];
     }

     item(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return this.values[i];
     }

     get(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return this.values[i];
     }

     _item_destroyed(sender)
     {
         for(var i = 0; i < this.values.length; i++)
            if (sender == this.values[i])
            {
                this.removeAt(i);
                break;
            }
     }
 
     add(key, value)
     {
        this.remove(key);

        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed, this);

        this.keys.push(key);
        this.values.push(value);
     }

     contains(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (this.keys[i] == key)
                return true;

        return false;
     }

     set(key, value)
     {
        this.remove(key);
        this.add(key, value);
     }

     remove(key)
     {
        for(var i = 0; i < this.keys.length; i++)
            if (key == this.keys[i])
            {
                this.removeAt(i);
                break;
            }   
     }

     removeAt(index)
     {
        if (this.values[index] instanceof IDestructible)
            this.values[index].off("destroy", this._item_destroyed);

        this.keys.splice(index, 1);
        this.values.splice(index, 1);
     }

     get length()
     {
         return this.keys.length;
     }
 }  
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
 * Created by Ahmed Zamil on 06/11/2017.
 */

"use strict";  

class PropertyValue
 {
     constructor(value, age, date)
     {
         this.value = value;
         this.age = age;
         this.date = date;
     }
 }  
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
 * Created by Ahmed Zamil on 30/08/2017.
 */
"use strict";  

class IEventHandler
{
    _register(event)
    {
        this._events[event] = [];
    }

    constructor()
    {
        this._events = {};
    }

    _emit(event)
    {
        event = event.toLowerCase();
        var args = Array.prototype.slice.call(arguments, 1);
        if (this._events[event])
            for(var i = 0; i < this._events[event].length; i++)
                if (this._events[event][i].f.apply(this._events[event][i].i, args))
                    return true;

        return false;
    }

    _emitArgs(event, args)
    {
        event = event.toLowerCase();
        if (this._events[event])
            for(var i = 0; i < this._events[event].length; i++)
                if (this._events[event][i].f.apply(this._events[event][i].i, args))
                    return true;
        return this;
    }

    on(event, fn, issuer)
    {
        if (!(fn instanceof Function))
            return this;

        event = event.toLowerCase();
        // add
        if (!this._events[event])
            this._events[event] = [];
        this._events[event].push({f: fn, i: issuer == null ? this: issuer});
        return this;
    }

    off(event, fn)
    {
        event = event.toLocaleString();
        if (this._events[event])
        {
            if (fn)
            {
                for(var i = 0; i < this._events[event].length; i++)
                    if (this._events[event][i].f == fn)
                        this._events[event].splice(i--, 1);

                //var index = this._events[event].indexOf(fn);
                //if (index > -1)
                //this._events[event].splice(index, 1);
            }
            else
            {
                this._events[event] = [];
            }
        }
    }
}  

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
 * Created by Ahmed Zamil on 25/12/2017.
 * Ref: https://en.wikipedia.org/wiki/SHA-2
 */

class SHA256
{
 
    static RROT(n, d)
    {
        return (n >>> d)|(n << (32 - d));        
    }

    static compute(msg)
    {
        /*
        Note 1: All variables are 32 bit unsigned integers and addition is calculated modulo 2^32
        Note 2: For each round, there is one round constant k[i] and one entry in the message schedule array w[i], 0 ≤ i ≤ 63
        Note 3: The compression function uses 8 working variables, a through h
        Note 4: Big-endian convention is used when expressing the constants in this pseudocode,
            and when parsing message block data from bytes to words, for example,
            the first word of the input message "abc" after padding is 0x61626380
        */

        // Initialize hash values:
        // (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
        
        const hash = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
        
        // Initialize array of round constants:
        // (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311):
        const k = new Uint32Array([
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
           0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
           0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
           0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
           0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
           0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
           0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);

           

        // Pre-processing:
        // begin with the original message of length L bits
        var L = msg.length * 8;
        
        // append a single '1' bit
        // append K '0' bits, where K is the minimum number >= 0 such that L + 1 + K + 64 is a multiple of 512

        var K = 512 - ((L + 1 + 64) % 512);
        
        if (K == 512)
            K = 0;

        var paddingLength = (K + 1) / 8;
        var paddingBytes = new Uint8Array(paddingLength);
        paddingBytes[0] = 0x80;

        var data = new DC(BL().addUint8Array(msg).addUint8Array(paddingBytes).addUint64(L).toArray());

        
        
        // append L as a 64-bit big-endian integer, making the total post-processed length a multiple of 512 bits
        
        //  Process the message in successive 512-bit chunks:
        // break message into 512-bit chunks
        // for each chunk

        for(var chunk = 0; chunk < data.length; chunk+=64)
        {    
            // create a 64-entry message schedule array w[0..63] of 32-bit words
            // (The initial values in w[0..63] don't matter, so many implementations zero them here)
            // copy chunk into first 16 words w[0..15] of the message schedule array

            var w = new Uint32Array(64);
            for(var i = 0; i < 16; i++)
                w[i] = data.getInt32(chunk + (i * 4));

            //for(var i = 16; i < 64; i++)
              //  w[i] = 0;

            // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
            //    for i from 16 to 63
            //        s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
            //        s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
            //        w[i] := w[i-16] + s0 + w[i-7] + s1
            
            for (var i = 16; i < 64; i++)
            {
                    var s0 = SHA256.RROT(w[i-15], 7) ^ SHA256.RROT(w[i-15], 18) ^ (w[i-15] >>> 3);
                    var s1 = SHA256.RROT(w[i-2], 17) ^ SHA256.RROT(w[i-2], 19) ^ (w[i-2] >>> 10);
                    w[i] = w[i-16] + s0 + w[i-7] + s1;
            }

            // Initialize working variables to current hash value:
            var a = hash[0];
            var b = hash[1];
            var c = hash[2];
            var d = hash[3];
            var e = hash[4];
            var f = hash[5];
            var g = hash[6];
            var h = hash[7];

                    
            // Compression function main loop:
            for (var i = 0; i < 64; i++)
            {
                var S1 = SHA256.RROT(e, 6) ^ SHA256.RROT(e, 11) ^ SHA256.RROT(e, 25);
                var ch = (e & f) ^ ((~e) & g);
                var temp1 = h + S1 + ch + k[i] + w[i];
                var S0 = SHA256.RROT(a, 2) ^ SHA256.RROT(a, 13) ^ SHA256.RROT(a, 22);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var temp2 = S0 + maj;
         
                h = g;
                g = f;
                f = e;
                e = (d + temp1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) >>> 0;
            }

            // Add the compressed chunk to the current hash value:

            hash[0] = (hash[0] + a) >>> 0;
            hash[1] = (hash[1] + b) >>> 0;
            hash[2] = (hash[2] + c) >>> 0;
            hash[3] = (hash[3] + d) >>> 0;
            hash[4] = (hash[4] + e) >>> 0;
            hash[5] = (hash[5] + f) >>> 0;
            hash[6] = (hash[6] + g) >>> 0;
            hash[7] = (hash[7] + h) >>> 0;


        }


 

        // Produce the final hash value (big-endian):
        //digest := hash := h0 append h1 append h2 append h3 append h4 append h5 append h6 append h7

        var results = new BinaryList();
        for(var i = 0; i < 8; i++)
            results.addUint32(hash[i]);
        

        return results.toDC();
     }
}  
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
 * Created by Ahmed Zamil on 31/08/2017.
 */

"use strict";  

class IDestructible extends IEventHandler
{
    destroy()
    {
        this._emit("destroy", this);
    }

    constructor()
    {
        super();
    }
}
  
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
 * Created by Ahmed Zamil on 05/09/2017.
 */

"use strict";  

class AutoList extends IEventHandler
{
    constructor()
    {
        super();
        this.list = [];
    }

    get length()
    {
        return this.list.length;
    }

    add(value)
    {
        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed, this);

        this.list.push(value);

        this._emit("add", value);
    }

    set(index, value)
    {
        if (index >= this.list.length || index < 0)
            return;

        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed, this);

        if (this.list[index] instanceof IDestructible)
            this.list[index].off("destroy", this._item_destroyed);

        this.list[index] = value;
    }

    at(index)
    {
        return this.list[index];
    }

    item(index)
    {
        return this.list[index];
    }
    
    remove(value)
    {
        this.removeAt(this.list.indexOf(value));
    }

    contains(value)
    {
        return this.list.indexOf(value) > -1;
    }

    toArray()
    {
        return this.list.slice(0);
    }

    removeAt(index)
    {
        if (index >= this.list.length || index < 0)
            return;

        var item = this.list[index];

        if (item instanceof IDestructible)
            item.off("destroy", this._item_destroyed);

        this.list.splice(index, 1);

        this._emit("remove", item);
    }

    _item_destroyed(sender)
    {
        this.remove(sender);
    }
}  
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

const ResourceTrigger =
{
    Loaded : 0,
        Initialize: 1,
        Terminate: 2,
        Configure: 3,
        SystemInitialized: 4,
        SystemTerminated: 5,
        SystemReload: 6
};

class IResource extends IDestructible
{
    trigger(trigger)
    {

    }

    constructor()
    {
        super();
    }

    static getTemplate()
    {
        return {
                namespace: "Esiur",
                properties: [],
                functions: [],
                events: []
            }
    }
}
  
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

class IStore extends IResource {
    get(path) {

    }

    retrieve(iid) {

    }

    put(resource) {

    }

    record(resource, propertyName, value, age, dateTime)
    {

    }

    getRecord(resource, fromDate, toDate)
    {

    }
    
    remove(resource)
    {

    }
    
    constructor()
    {
        super();
    }
}
  
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
 * Created by Ahmed Zamil on 26/08/2017.
 */

"use strict";  

class Structure
{
    getKeys() {
        var rt = [];
        for (var i in this)
            if (!(this[i] instanceof Function))
                rt.push(i);

        return rt;
    }

    constructor(data)
    {
        if (data instanceof Object)
            for(var i in data)
                this[i] = data[i];
    }
}  
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
 * Created by Ahmed Zamil on 06/09/2017.
 */

"use strict";  

class StructureArray extends Array
{
    push(value)
    {
        if (value instanceof Structure)
            super.push(value);
        else
            return;
    }
}  
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
 * Created by Ahmed Zamil on 26/08/2017.
 */

"use strict";  

class ResourceArray extends Array
{
    push(value)
    {
        if (value instanceof IResource)
            super.push(value);
        else
            return;
    }
}  
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
 * Created by Ahmed Zamil on 24/08/2017.
 */

"use strict";  

const MemberType = {
    Function: 0,
    Property: 1,
    Event: 2
};

class MemberTemplate {
    compose() {
        return DC.stringToBytes(this.name);
    }
}  
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

const ErrorType = {
    Management: 0,
    Exception: 1
};

const ProgressType =  {
    Execution: 0,
    Network: 1
};

class AsyncReply
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

class AsyncBag extends AsyncReply
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
 * Created by Ahmed Zamil on 25/08/2017.
 */

"use strict";  

function BL(){
    return new BinaryList();
};

class BinaryList
{

    constructor()
    {
        this.list = [];
    }


    addRange(bl)
    {
        for(var i = 0; i < bl.list.length; i++)
            this.list.push(bl.list[i]);

        return this;
    }

    add(typedValue, position)
    {
        if (position !== undefined)
            this.list.splice(position, 0, typedValue);
        else
            this.list.push(typedValue);
        return this;
    }

    get length()
    {
        return this.toArray().length;
    }

    toArray()
    {
        var ars = [];
        // calculate length
        for(var i = 0; i < this.list.length; i++)
        {
            switch (this.list[i].type)
            {
                case DataType.Bool:
                    ars.push(DC.boolToBytes(this.list[i].value));
                    break;
                case DataType.UInt8:
                    ars.push(DC.uint8ToBytes(this.list[i].value));
                    break;
                case DataType.Int8:
                    ars.push(DC.int8ToBytes(this.list[i].value));
                    break;
                case DataType.Char:
                    ars.push(DC.charToBytes(this.list[i].value));
                    break;
                case DataType.UInt16:
                    ars.push(DC.uint16ToBytes(this.list[i].value));
                    break;
                case DataType.Int16:
                    ars.push(DC.int16ToBytes(this.list[i].value));
                    break;
                case DataType.UInt32:
                    ars.push(DC.uint32ToBytes(this.list[i].value));
                    break;
                case DataType.Int32:
                    ars.push(DC.int32ToBytes(this.list[i].value));
                    break;
                case DataType.UInt64:
                    ars.push(DC.uint64ToBytes(this.list[i].value));
                    break;
                case DataType.Int64:
                    ars.push(DC.int64ToBytes(this.list[i].value));
                    break;
                case DataType.Float32:
                    ars.push(DC.float32ToBytes(this.list[i].value));
                    break;
                case DataType.Float64:
                    ars.push(DC.float64ToBytes(this.list[i].value));
                    break;
                case DataType.String:
                    ars.push(DC.stringToBytes(this.list[i].value));
                    break;
                case DataType.DateTime:
                    ars.push(DC.dateTimeToBytes(this.list[i].value));
                    break;
                case DataType.UInt8Array:
                    ars.push(this.list[i].value);

                //case DataType.Resource:
                //    ars.push(DC.uint32ToBytes(this.list[i].value.instance.id));
                //    break;
                //case DataType.DistributedResource:
                //    ars.push(DC.int8ToBytes(this.list[i].value));
                //    break;



            }
        }

        var length = 0;
        ars.forEach(function(a){
            length += a.length;
        });

        var rt = new Uint8Array(length);

        var offset = 0;
        for(var i = 0; i < ars.length; i++) {
            rt.set(ars[i], offset);
            offset+=ars[i].length;
        }

        return rt;
    }

    toDC()
    {
        return new DC(this.toArray());
    }
    
    addDateTime(value, position)
    {
        return this.add({type: DataType.DateTime, value: value}, position);
    }

    addUint8Array(value, position)
    {
        return this.add({type: DataType.UInt8Array, value: value}, position);
    }


    addHex(value, position)
    {
        return this.addUint8Array(DC.hexToBytes(value), position);
    }

    addString(value, position)
    {
        return this.add({type: DataType.String, value: value}, position);
    }

    addUint8(value, position)
    {
        return this.add({type: DataType.UInt8, value: value}, position);
    }

    addInt8(value, position)
    {
        return this.add({type: DataType.Int8, value: value}, position);
    }

    addChar(value, position)
    {
        return this.add({type: DataType.Char, value: value}, position);
    }

    addUint16(value, position)
    {
        return this.add({type: DataType.UInt16, value: value}, position);
    }

    addInt16(value, position)
    {
        return this.add({type: DataType.Int16, value: value}, position);
    }

    addUint32(value, position)
    {
        return this.add({type: DataType.UInt32, value: value}, position);
    }

    addInt32(value, position)
    {
        return this.add({type: DataType.Int32, value: value}, position);
    }

    addUint64(value, position)
    {
        return this.add({type: DataType.UInt64, value: value}, position);
    }

    addInt64(value, position)
    {
        return this.add({type: DataType.Int64, value: value}, position);
    }

    addFloat32(value, position)
    {
        return this.add({type: DataType.Float32, value: value}, position);
    }

    addFloat64(value, position)
    {
        return this.add({type: DataType.Float64, value: value}, position);
    }

}  
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

const ResourceComparisonResult =
    {
        Null: 0,
        Distributed: 1,
        Local: 2,
        Same: 3
    };

const StructureComparisonResult =
    {
        Null: 0,
        Structure: 1,
        StructureSameKeys: 2,
        StructureSameTypes: 3,
        Same: 4
    };

class Codec {

    
    static parse(data, offset, sizeObject, connection, dataType = DataType.Unspecified) {

        var size;

        var reply = new AsyncReply();

        var isArray;
        var t;

        if (dataType == DataType.Unspecified) {
            size = 1;
            dataType = data[offset++];
        }
        else
            size = 0;

        t = dataType & 0x7F;

        isArray = (dataType & 0x80) == 0x80;

        var payloadSize = DataType.sizeOf(dataType);

        var contentLength = 0;

        // check if we have the enough data
        if (payloadSize == -1) {
            contentLength = data.getUint32(offset);
            offset += 4;
            size += 4 + contentLength;
        }
        else
            size += payloadSize;


        sizeObject.size = size;

        if (isArray) {
            switch (t) {
                // VarArray ?
                case DataType.Void:
                    return Codec.parseVarArray(data, offset, contentLength, connection);

                case DataType.Bool:
                    return new AsyncReply(data.getBooleanArray(offset, contentLength));

                case DataType.UInt8:
                    return new AsyncReply(data.getUint8Array(offset, contentLength));

                case DataType.Int8:
                    return new AsyncReply(data.getInt8Array(offset, contentLength));

                case DataType.Char:
                    return new AsyncReply(data.getCharArray(offset, contentLength));

                case DataType.Int16:
                    return new AsyncReply(data.getInt16Array(offset, contentLength));

                case DataType.UInt16:
                    return new AsyncReply(data.getUint16Array(offset, contentLength));

                case DataType.Int32:
                    return new AsyncReply(data.getInt32Array(offset, contentLength));

                case DataType.UInt32:
                    return new AsyncReply(data.getUint32Array(offset, contentLength));

                case DataType.Int64:
                    return new AsyncReply(data.getInt64Array(offset, contentLength));

                case DataType.UInt64:
                    return new AsyncReply(data.getUint64Array(offset, contentLength));

                case DataType.Float32:
                    return new AsyncReply(data.getFloat32Array(offset, contentLength));

                case DataType.Float64:
                    return new AsyncReply(data.getFloat64Array(offset, contentLength));

                case DataType.String:
                    return new AsyncReply(data.getStringArray(offset, contentLength));

                case DataType.Resource:
                case DataType.DistributedResource:
                    return Codec.parseResourceArray(data, offset, contentLength, connection);

                case DataType.DateTime:
                    return new AsyncReply(data.getDateTimeArray(offset, contentLength));

                case DataType.Structure:
                    return Codec.parseStructureArray(data, offset, contentLength, connection);
            }
        }
        else {
            switch (t) {
                case DataType.NotModified:
                    return new AsyncReply(new NotModified());

                case DataType.Void:
                    return new AsyncReply(null);

                case DataType.Bool:
                    return new AsyncReply(data.getBoolean(offset));

                case DataType.UInt8:
                    return new AsyncReply(data[offset]);

                case DataType.Int8:
                    return new AsyncReply(data.getInt8(offset));

                case DataType.Char:
                    return new AsyncReply(data.getChar(offset));

                case DataType.Int16:
                    return new AsyncReply(data.getInt16(offset));

                case DataType.UInt16:
                    return new AsyncReply(data.getUint16(offset));

                case DataType.Int32:
                    return new AsyncReply(data.getInt32(offset));

                case DataType.UInt32:
                    return new AsyncReply(data.getUint32(offset));

                case DataType.Int64:
                    return new AsyncReply(data.getInt64(offset));

                case DataType.UInt64:
                    return new AsyncReply(data.getUint64(offset));

                case DataType.Float32:
                    return new AsyncReply(data.getFloat32(offset));

                case DataType.Float64:
                    return new AsyncReply(data.getFloat64(offset));

                case DataType.String:
                    return new AsyncReply(data.getString(offset, contentLength));

                case DataType.Resource:
                    return Codec.parseResource(data, offset);

                case DataType.DistributedResource:
                    return Codec.parseDistributedResource(data, offset, connection);

                case DataType.DateTime:
                    return new AsyncReply(data.getDateTime(offset));

                case DataType.Structure:
                    return Codec.parseStructure(data, offset, contentLength, connection);
            }
        }


        return null;
    }

    static parseResource(data, offset) {
        return Warehouse.get(data.getUint32(offset));
    }

    static parseDistributedResource(data, offset, connection) {
        //var g = data.getGuid(offset);
        //offset += 16;

        // find the object
        var iid = data.getUint32(offset);

        return connection.fetch(iid);// Warehouse.Get(iid);
    }

            /// <summary>
        /// Parse an array of bytes into array of resources
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns>Array of resources.</returns>
        static parseResourceArray(data, offset, length, connection)
        {
            var reply = new AsyncBag();
            if (length == 0)
            {
                reply.seal();
                return reply;
            }

            var end = offset + length;

            // 
            var result = data[offset++];

            var previous = null;

            if (result == ResourceComparisonResult.Null)
                previous = new AsyncReply(null);
            else if (result == ResourceComparisonResult.Local)
            {
                previous = Warehouse.get(data.getUint32(offset));
                offset += 4;
            }
            else if (result == ResourceComparisonResult.Distributed)
            {
                previous = connection.fetch(data.getUint32(offset));
                offset += 4;
            }

            reply.add(previous);


            while (offset < end)
            {
                result = data[offset++];

                var current = null;

                if (result == ResourceComparisonResult.Null)
                {
                    current = new AsyncReply(null);
                }
                else if (result == ResourceComparisonResult.Same)
                {
                    current = previous;
                }
                else if (result == ResourceComparisonResult.Local)
                {
                    current = Warehouse.get(data.getUint32(offset));
                    offset += 4;
                }
                else if (result == ResourceComparisonResult.Distributed)
                {
                    current = connection.fetch(data.getUint32(offset));
                    offset += 4;
                }

                reply.add(current);

                previous = current;
            }

            reply.seal();
            return reply;
        }

        /// <summary>
        /// Compose an array of property values.
        /// </summary>
        /// <param name="array">PropertyValue array.</param>
        /// <param name="connection">DistributedConnection is required to check locality.</param>
        /// <param name="prependLength">If True, prepend the length as UInt32 at the beginning of the output.</param>
        /// <returns>Array of bytes in the network byte order.</returns>
    
        static composePropertyValueArray(array, connection, prependLength = false)
        {
            var rt = BL();
            for (var i = 0; i < array.Length; i++)
                rt.addUint8Array(Codec.composePropertyValue(array[i], connection));
            if (prependLength)
                rt.addUint32(rt.length, 0);
            return rt.toArray();
        }

        /// <summary>
        /// Compose a property value.
        /// </summary>
        /// <param name="propertyValue">Property value</param>
        /// <param name="connection">DistributedConnection is required to check locality.</param>
        /// <returns>Array of bytes in the network byte order.</returns>
        static composePropertyValue(propertyValue, connection)
        {
            // age, date, value
            return BL().addUint64(propertyValue.age)
                       .addDateTime(propertyValue.date)
                       .addUint8Array(Codec.compose(propertyValue.value, connection))
                       .toArray();
        }


        /// <summary>
        /// Parse property value.
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <param name="cs">Output content size.</param>
        /// <returns>PropertyValue.</returns>
        static parsePropertyValue(data, offset, sizeObject, connection)
        {
            var reply = new AsyncReply();
            
            var age = data.getUint64(offset);
            offset += 8;
    
            var date = data.getDateTime(offset);
            offset += 8;

            var cs = {};

            Codec.parse(data, offset, cs, connection).then(function(value)
            {
                reply.trigger(new PropertyValue(value, age, date));
            });

            sizeObject.size = 16 + cs.size;
            return reply;
        }


        /// <summary>
        /// Parse resource history
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="resource">Resource</param>
        /// <param name="fromAge">Starting age.</param>
        /// <param name="toAge">Ending age.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static parseHistory(data, offset, length, resource, connection)
        {
            var list = new KeyList();

            var reply = new AsyncReply();

            var bagOfBags = new AsyncBag();

            var ends = offset + length;
            while (offset < ends)
            {
                var index = data[offset++];
                var pt = resource.instance.template.getPropertyTemplateByIndex(index);

                list.add(pt, null);

                
                var cs = data.getUint32(offset);
                offset += 4;
                bagOfBags.add(Codec.parsePropertyValueArray(data, offset, cs, connection));
                offset += cs;
            }

            bagOfBags.seal();

            bagOfBags.then(x =>
            {
                for(var i = 0; i < list.length; i++)
                    list.values[i] = x[i];

                reply.trigger(list);
            });

            return reply;
            
        }

        /// <summary>
        /// Compose resource history
        /// </summary>
        /// <param name="history">History</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static composeHistory(history, connection, prependLength = false)
        {
            var rt = new BinaryList();

            for (var i = 0; i < history.length; i++)
                rt.addUint8(history.keys[i].index).addUint8Array(Codec.composePropertyValueArray(history.values[i], connection, true));

            if (prependLength)
                rt.addUint32(rt.length, 0);
                
            return rt.toArray();
        }

        /// <summary>
        /// Parse an array of ProperyValue.
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static parsePropertyValueArray(data, offset, length, connection)
        {
            var rt = new AsyncBag();

            while (length > 0)
            {
                var cs = {};

                rt.add(Codec.parsePropertyValue(data, offset, cs, connection));
                
                if (cs.size > 0)
                {
                    offset += cs.size;
                    length -= cs.size;
                }
                else
                    throw new Exception("Error while parsing ValueInfo structured data");
            }

            rt.seal();
            return rt;
        }

        static parseStructure(data, offset, contentLength, connection, metadata = null, keys = null, types = null) 
        {
            var reply = new AsyncReply();
            var bag = new AsyncBag();


            var keylist = [];
            var typelist = [];


        if (keys == null) {
            while (contentLength > 0) {
                var len = data[offset++];
                keylist.push(data.getString(offset, len));
                offset += len;

                typelist.push(data[offset]);

                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection));
                contentLength -= rt.size + len + 1;
                offset += rt.size;
            }
        }
        else if (types == null) {
            for (var i = 0; i < keys.length; i++)
                keylist.push(keys[i]);

            while (contentLength > 0) {
                typelist.push(data[offset]);

                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection));
                contentLength -= rt.size;
                offset += rt.size;
            }
        }
        else {
            
            for (var i = 0; i < keys.length; i++) {
                keylist.push(keys[i]);
                typelist.push(types[i]);
            }

            var i = 0;
            while (contentLength > 0) {
                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection, types[i]));
                contentLength -= rt.size;
                offset += rt.size;
                i++;
            }
        }

        bag.seal();

        bag.then(function (res) {
            // compose the list
            var s = new Structure();
            for (var i = 0; i < keylist.length; i++)
                s[keylist[i]] = res[i];
            reply.trigger(s);
        });

        if (metadata != null)
        {
            metadata.keys = keylist;
            metadata.types = typelist;
        }
        
        return reply;
    }


    static parseVarArray(data, offset, contentLength, connection) {
        var rt = new AsyncBag();

        while (contentLength > 0) {
            var cs = {};

            rt.add(Codec.parse(data, offset, cs, connection));

            if (cs.size > 0) {
                offset += cs.size;
                contentLength -= cs.size;
            }
            else
                throw new Exception("Error while parsing structured data");

        }

        rt.seal();
        return rt;
    }


    static compose(value, connection, prependType = true) {

        if (value instanceof Function)
            value = value(connection);
        else if (value instanceof DistributedPropertyContext)
            value = value.method(this);
        
        var type = Codec.getDataType(value, connection);
        var rt = new BinaryList();

        switch (type) {
            case DataType.Void:
                // nothing to do;
                break;

            case DataType.String:
                var st = DC.stringToBytes(value);
                rt.addUint32(st.length).addUint8Array(st);
                break;

            case DataType.Resource:
                rt.addUint32(value._p.instanceId);
                break;

            case DataType.DistributedResource:
//                rt.addUint8Array(DC.stringToBytes(value.instance.template.classId)).addUint32(value.instance.id);
                rt.addUint32(value.instance.id);
                break;

            case DataType.Structure:
                rt.addUint8Array(Codec.composeStructure(value, connection, true, true, true));
                break;

            case DataType.VarArray:
                rt.addUint8Array(Codec.composeVarArray(value, connection, true));
                break;

            case DataType.ResourceArray:
                rt.addUint8Array(Codec.composeResourceArray(value, connection, true));
                break;

            case DataType.StructureArray:
                rt.addUint8Array(Codec.composeStructureArray(value, connection, true));
                break;

            default:
                rt.add({type: type, value: value});
                if (DataType.isArray(type))
                    rt.addUint32(rt.length, 0);

                break;
        }

        if (prependType)
            rt.addUint8(type, 0);

        return rt.toArray();
    }

    static composeVarArray(array, connection, prependLength = false) {
        var rt = new BinaryList();

        for (var i = 0; i < array.length; i++)
            rt.addUint8Array(Codec.compose(array[i], connection));

        if (prependLength)
            rt.addUint32(rt.length, 0);
        return rt.toArray();
    }

    static composeStructure(value, connection, includeKeys = true, includeTypes = true, prependLength = false) {
        var rt = new BinaryList();

        var keys = value.getKeys();

        if (includeKeys) {
            for (var i = 0; i < keys.length; i++) {
                var key = DC.stringToBytes(keys[i]);
                rt.addUint8(key.length).addUint8Array(key).addUint8Array(Codec.compose(value[keys[i]], connection));
            }
        }
        else {
            for (var i = 0; i < keys.length; i++)
                rt.addUint8Array(Codec.compose(value[keys[i]], connection, includeTypes));
        }

        if (prependLength)
            rt.addUint32(rt.length, 0);

        return rt.toArray();
    }

    static composeStructureArray(structures, connection, prependLength = false) {
        if (structures == null || structures.length == 0 || !(structures instanceof StructureArray))
            return new DC(0);

        var rt = new BinaryList();
        var comparision = StructureComparisonResult.Structure;

        rt.addUint8(comparision);
        rt.addUint8Array(Codec.composeStructure(structures[0], connection));

        for (var i = 1; i < structures.Length; i++) {
            comparision = Codec.compareStructure(structures[i - 1], structures[i], connection);
            rt.addUint8(comparision);

            if (comparision == StructureComparisonResult.Structure)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection));
            else if (comparision == StructureComparisonResult.StructureSameKeys)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection, false));
            else if (comparision == StructureComparisonResult.StructureSameTypes)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection, false, false));
        }

        if (prependLength)
            rt.addUint32(rt.length, 0);

        return rt.toArray();
    }

    static compareStructure(previous, next, connection) {
        if (next == null)
            return StructureComparisonResult.Null;

        if (previous == null)
            return StructureComparisonResult.Structure;

        if (next == previous)
            return StructureComparisonResult.Same;

        if (previous.length != next.length)
            return StructureComparisonResult.Structure;

        var previousKeys = previous.getKeys();
        var nextKeys = next.getKeys();

        for (var i = 0; i < previousKeys.length; i++)
            if (previousKeys[i] != nextKeys[i])
                return StructureComparisonResult.Structure;

        var previousTypes = Codec.getStructureDateTypes(previous, connection);
        var nextTypes = Codec.getStructureDateTypes(next, connection);

        for (var i = 0; i < previousTypes.length; i++)
            if (previousTypes[i] != nextTypes[i])
                return StructureComparisonResult.StructureSameKeys;

        return StructureComparisonResult.StructureSameTypes;
    }

    static getStructureDateTypes(structure, connection) {
        var keys = structure.getKeys();
        var types = [];

        for (var i = 0; i < keys.length; i++)
            types.push(Codec.getDataType(structure[keys[i]], connection));
        return types;
    }

static isLocalResource(resource, connection) {
    if (resource instanceof DistributedResource)
        if (resource._p.connection == connection)
            return true;

    return false;
}

    static composeResource(resource, connection) {
        if (Codec.isLocalResource(resource, connection))
            return BL().addUint32(resource.id);
        else {
            return BL().addUint8Array(resource.instance.template.classId.value).addUint32(resource.instance.id);
        }
    }

    static compareResource(previous, next, connection) {

        if (next == null)
            return ResourceComparisonResult.Null;
        else if (next == previous)
            return ResourceComparisonResult.Same;
        else if (Codec.isLocalResource(next, connection))
            return ResourceComparisonResult.Local;
        else
            return ResourceComparisonResult.Distributed;
    }

 static composeResourceArray(resources, connection, prependLength = false) {

    if (resources == null || resources.length == 0)// || !(resources instanceof ResourceArray))
        return prependLength ? new DC(4) : new DC(0);

    var rt = new BinaryList();
    var comparsion = Codec.compareResource(null, resources[0], connection);

    rt.addUint8(comparsion);

    if (comparsion == ResourceComparisonResult.Local)
        rt.addUint32(resources[0]._p.instanceId);
    else if (comparsion == ResourceComparisonResult.Distributed)
        rt.addUint32(resources[0].instance.id);

    for (var i = 1; i < resources.Length; i++)
    {
        comparsion = Codec.compareResource(resources[i - 1], resources[i], connection);
        rt.addUint8(comparsion);
        if (comparsion == ResourceComparisonResult.Local)
            rt.addUint32(resources[i]._p.instanceId);
        else if (comparsion == ResourceComparisonResult.Distributed)
            rt.addUint32(resources[i].instance.id);
    }

    if (prependLength)
        rt.addUint32(rt.length, 0);
    

    return rt.toArray();
 }



static getDataType(value) {
        switch (typeof value) {
            case "number":
                // float or ?
                if (Math.floor(value) == value) {
                    if (value > 0) {
                        // larger than byte ?
                        if (value > 0xFF) {
                            // larger than short ?
                            if (value > 0xFFFF) {
                                // larger than int ?
                                if (value > 0xFFFFFFFF) {
                                    return DataType.UInt64;
                                }
                                else {
                                    return DataType.UInt32;
                                }
                            }
                            else {
                                return DataType.UInt16;
                            }
                        }
                        else {
                            return DataType.UInt8;
                        }
                    }
                    else {
                        if (value < -128) {
                            if (value < -32768) {
                                if (value < -2147483648) {
                                    return DataType.Int64;
                                }
                                else {
                                    return DataType.Int32;
                                }
                            }
                            else {
                                return DataType.Int16;
                            }
                        }
                        else {
                            return DataType.Int8;
                        }
                    }
                }
                else {
                    // float or double
                    return DataType.Float64;
                }
                break;

            case "string":
                return DataType.String;
            case "boolean":
                return DataType.Bool;
            case "object":
                if (value instanceof Array) {
                    return DataType.VarArray;
                }
                else if (value instanceof IResource) {
                    return Codec.isLocalResource(value, connection) ? DataType.Resource : DataType.DistributedResource;
                }
                else if (value instanceof Date) {
                    return DataType.DateTime;
                }
                else if (value instanceof Uint8Array
                    || value instanceof ArrayBuffer) {
                    return DataType.UInt8Array;
                }
                else if (value instanceof Number) {
                    // JS numbers are always 64-bit float
                    return DataType.Float64;
                }
                else if (value instanceof Structure) {
                    return DataType.Structure;
                }
                else {
                    return DataType.Void
                }

                break;

            default:
                return DataType.Void;
        }
    }


            /// <summary>
        /// Parse an array of structures
        /// </summary>
        /// <param name="data">Bytes array</param>
        /// <param name="offset">Zero-indexed offset</param>
        /// <param name="length">Number of bytes to parse</param>
        /// <param name="connection">DistributedConnection is required in case a structure in the array holds items at the other end</param>
        /// <returns>Array of structures</returns>
        static parseStructureArray(data, offset, length, connection)
        {
            var reply = new AsyncBag();
            if (length == 0)
            {
                reply.seal();
                return reply;
            }

            var end = offset + length;

            var result = data[offset++];

            var previous = null;
            //var previousKeys = [];
            //var previousTypes = [];

            var metadata = {keys: null, types: null};
             

            if (result == StructureComparisonResult.Null)
                previous = new AsyncReply(null);
            else if (result == StructureComparisonResult.Structure)
            {
                var cs = data.getUint32(offset);
                offset += 4;          
                previous = this.parseStructure(data, offset, cs, connection, metadata);
                offset += cs;
            }
 
            reply.add(previous);


            while (offset < end)
            {
                result = data[offset++];

                if (result == StructureComparisonResult.Null)
                    previous = new AsyncReply(null);
                else if (result == StructureComparisonResult.Structure)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata);
                    offset += cs;
                }
                else if (result == StructureComparisonResult.StructureSameKeys)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys);
                    offset += cs;
                }
                else if (result == StructureComparisonResult.StructureSameTypes)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys, metadata.types);
                    offset += cs;
                }

                reply.add(previous);
            }

            reply.seal();
            return reply;
        }


}  
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

const UNIX_EPOCH = 621355968000000000;
const TWO_PWR_32 = (1 << 16) * (1 << 16);

class DC extends Uint8Array// extends DataView // Data Converter
{
    constructor(bufferOrSize) {
        super(bufferOrSize);

        //if (bufferOrSize instanceof ArrayBuffer) {
          //  this.buffer = bufferOrSize;
        //}
        //else
        //{
          //  this.buffer = new Uint8Array(bufferOrSize);
        //}

        this.dv = new DataView(this.buffer);
    }


    static boolToBytes(value)
    {
        var rt = new DC(1);
        rt.setBoolean(0, value);
        return rt;
    }

    static int8ToBytes(value)
    {
        var rt = new DC(1);
        rt.setInt8(0, value);
        return rt;
    }

    static hexToBytes(value)
    {
        // convert hex to Uint8Array
        var rt = new DC(value.length/2);
        for(var i = 0; i < ar.length; i++)
            rt[i] = parseInt(value.substr(i*2, 2), 16);
        return rt;
    }

    static uint8ToBytes(value)
    {
        var rt = new DC(1);
        rt.setUint8(0, value);
        return rt;
    }

    static charToBytes(value)
    {
        var rt = new DC(2);
        rt.setChar(0, value);
        return rt;
    }

    static int16ToBytes(value)
    {
        var rt = new DC(2);
        rt.setInt16(0, value);
        return rt;
    }

    static uint16ToBytes(value)
    {
        var rt = new DC(2);
        rt.setUint16(0, value);
        return rt;
    }

    static int32ToBytes(value)
    {
        var rt = new DC(4);
        rt.setInt32(0, value);
        return rt;
    }

    static uint32ToBytes(value)
    {
        var rt = new DC(4);
        rt.setUint32(0, value);
        return rt;
    }

    static float32ToBytes(value)
    {
        var rt = new DC(4);
        rt.setFloat32(0, value);
        return rt;
    }

    static int64ToBytes(value)
    {
        var rt = new DC(8);
        rt.setInt64(0, value);
        return rt;
    }

    static uint64ToBytes(value)
    {
        var rt = new DC(8);
        rt.setUint64(0, value);
        return rt;
    }

    static float64ToBytes(value)
    {
        var rt = new DC(8);
        rt.setFloat64(0, value);
        return rt;
    }

    static dateTimeToBytes(value)
    {
        var rt = new DC(8);
        rt.setDateTime(0, value);
        return rt;
    }

    static stringToBytes(value)
    {
        var utf8 = unescape(encodeURIComponent(value));
        var rt = [];

        for (var i = 0; i < utf8.length; i++)
            rt.push(utf8.charCodeAt(i));

        return new DC(rt);
    }

    static stringArrayToBytes(values)
    {
        var list = new BinaryList();
        for(var i = 0; i < values.length; i++)
        {
            var s = DC.stringToBytes(values[i]);
            list.addUint32(s.length).addUint8Array(s);
        }

        return list.toArray();
    }

    append(src, offset, length)
    {
        if (!(src instanceof DC))
            src = new DC(src);

        var appendix = src.clip(offset, length);
        var rt = new DC(this.length + appendix.length);
        rt.set(this, 0);
        rt.set(appendix, this.length);
        return rt;
    }

    static combine(a, aOffset, aLength, b, bOffset, bLength)
    {
        if (!(a instanceof DC))
            a = new DC(a);
        if (!(b instanceof DC))
            b = new DC(b);

        a = a.clip(aOffset, aLength);
        b = b.clip(bOffset, bLength);

        var rt = new DC(a.length  + b.length);
        rt.set(a, 0);
        rt.set(b, a.length);
        return rt;
    }

    clip(offset, length)
    {
        return this.slice(offset, offset+length);
    }

    getInt8(offset)
    {
        return this.dv.getUint8(offset);
    }

    getUint8(offset)
    {
        return this[offset];// this.dv.getUint8(offset);
    }

    getInt16(offset)
    {
        return this.dv.getInt16(offset);
    }

    getUint16(offset)
    {
        return this.dv.getUint16(offset);
    }

    getInt32(offset)
    {
        return this.dv.getInt32(offset);
    }

    getUint32(offset)
    {
        return this.dv.getUint32(offset);
    }

    getFloat32(offset)
    {
        return this.dv.getFloat32(offset);
    }

    getFloat64(offset)
    {
        return this.dv.getFloat64(offset);
    }

    setInt8(offset, value)
    {
        return this.dv.setInt8(offset, value);
    }

    setUint8(offset, value)
    {
        return this.dv.setUint8(offset, value);
    }

    setInt16(offset, value)
    {
        return this.dv.setInt16(offset, value);
    }

    setUint16(offset, value)
    {
        return this.dv.setUint16(offset, value);
    }

    setInt32(offset, value)
    {
        return this.dv.setInt32(offset, value);
    }

    setUint32(offset, value)
    {
        return this.dv.setUint32(offset, value);
    }

    setFloat32(offset, value)
    {
        return this.dv.setFloat32(offset, value);
    }

    setFloat64(offset, value)
    {
        return this.dv.setFloat64(offset, value);
    }

    getInt8Array(offset, length)
    {
        return new Int8Array(this.buffer, offset, length);
    }

    getUint8Array(offset, length)
    {
        return new Uint8Array(this.buffer, offset, length);
    }

    getInt16Array(offset, length)
    {
        return new Int16Array(this.buffer, offset, length);
    }

    getUint16Array(offset, length)
    {
        return new Uint16Array(this.buffer, offset, length);
    }

    getInt32Array(offset, length)
    {
        return new Int32Array(this.buffer, offset, length);
    }

    getUint32Array(offset, length)
    {
        return new Uint32Array(this.buffer, offset, length);
    }

    getFloat32Array(offset, length)
    {
        return new Float32Array(this.buffer, offset, length);
    }

    getFloat64Array(offset, length)
    {
        return new Float64Array(this.buffer, offset, length);
    }

    getInt64Array(offset, length)
    {
        return new Int64Array(this.buffer, offset, length);
    }


    getUint64Array(offset, length)
    {
        return new Uint64Array(this.buffer, offset, length);
    }

    getBoolean(offset)
    {
        return this.getUint8(offset) > 0;
    }

    setBoolean(offset, value)
    {
        this.setUint8(offset, value ? 1: 0);
    }

    getBooleanArray(offset, length)
    {
        var rt = [];
        for(var i = 0; i < length; i++)
            rt.push(this.getBoolean(offset+i));
        return rt;
    }

    getChar(offset)
    {
        return String.fromCharCode(this.getUint16(offset));
    }

    setChar(offset, value)
    {
        this.setUint16(offset, value.charCodeAt(0));
    }

    getCharArray(offset, length)
    {
        var rt = [];
        for(var i = 0; i < length; i+=2)
            rt.push(this.getChar(offset+i));
        return rt;
    }

    getHex(offset, length)
    {
        var rt = "";
        for(var i = offset; i < offset + length; i++) {
            var h = this[i].toString(16);
            rt += h.length == 1 ? "0" + h : h;
        }

        return rt;
    }

    getString(offset, length)
    {
        if (typeof StringView != "undefined")
            return new StringView(this.buffer, "UTF-8", offset, length);
        else
        {
            var bytes = this.getUint8Array(offset, length);
            var encodedString = String.fromCharCode.apply(null, bytes),
                decodedString = decodeURIComponent(escape(encodedString));
            return decodedString;
        }
    }

    getStringArray(offset, length)
    {
        var rt = [];
        var i = 0;

        while (i < length)
        {
            var cl = this.getUint32(offset + i);
            i += 4;
            rt.push(this.getString(offset + i, cl));
            i += cl;
        }

        return rt;
    }

    getInt64(offset)
    {
        var h = this.getInt32(offset);
        var l = this.getInt32(offset + 4);

        return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }

    getUint64(offset)
    {
        var h = this.getUint32(offset);
        var l = this.getUint32(offset + 4);
        return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }

    setInt64(offset, value)
    {
        var l = (value % TWO_PWR_32) | 0;
        var h = (value / TWO_PWR_32) | 0;
        this.setInt32(offset, h);
        this.setInt32(offset + 4, l);
    }

    setUint64(offset, value)
    {
        var l = (value % TWO_PWR_32) | 0;
        var h = (value / TWO_PWR_32) | 0;
        this.setInt32(offset, h);
        this.setInt32(offset + 4, l);
    }

    setDateTime(offset, value)
    {
        // Unix Epoch
        var ticks = 621355968000000000 + (value.getTime() * 10000);
        this.setUint64(offset, ticks);
    }

    getDateTime(offset)
    {
        var ticks = this.getUint64(offset);
        return new Date(Math.round((ticks-UNIX_EPOCH)/10000));
    }

    getDateTimeArray(offset)
    {
        var rt = [];
        for(var i = 0; i < length; i+=8)
            rt.push(this.getDateTime(offset+i));
        return rt;
    }

    getGuid(offset)
    {
        return new Guid(this.clip(offset, 16));

        /*
        var d = this.getUint8Array(offset, 16);
        var rt = "";
        for (var i = 0; i < 16; i++) {
            rt += String.fromCharCode(d[i]);
        }

        return btoa(rt);
        */
    }

    getGuidArray(offset, length)
    {
        var rt = [];
        for(var i = 0; i < length; i+=16)
            rt.push(this.getGuid(offset+i));
        return rt;
    }

    sequenceEqual(ar)
    {
        if (ar.length != this.length)
            return false;
        else
        {
            for(var i = 0; i < this.length; i++)
                if (ar[i] != this[i])
                    return false;
        }

        return true;
    }
}


  
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

const DataType =
{ 
    Void: 0x0,
    //Variant,
    Bool: 1,
    Int8: 2,
    UInt8: 3,
    Char: 4,
    Int16: 5,
    UInt16: 6,
    Int32: 7,
    UInt32: 8,
    Int64: 9,
    UInt64: 10,
    Float32: 11,
    Float64: 12,
    Decimal: 13,
    DateTime: 14,
    Resource: 15,
    DistributedResource: 16,
    ResourceLink: 17,
    String: 18,
    Structure: 19,
    //Stream,
    //Array = 0x80,
    VarArray: 0x80,
    BoolArray: 0x81,
    UInt8Array: 0x82,
    Int8Array: 0x83,
    CharArray: 0x84,
    Int16Array: 0x85,
    UInt16Array: 0x86,
    Int32Array: 0x87,
    UInt32Array: 0x88,
    Int64Array: 0x89,
    UInt64Array: 0x8A,
    Float32Array: 0x8B,
    Float64Array: 0x8C,
    DecimalArray: 0x8D,
    DateTimeArray: 0x8E,
    ResourceArray: 0x8F,
    DistributedResourceArray: 0x90,
    ResourceLinkArray: 0x91,
    StringArray: 0x92,
    StructureArray: 0x93,
    NotModified: 0x7f,
    Unspecified: 0xff,

    isArray: function(type)
    {
        return ((type & 0x80) == 0x80) && (type != DataType.NotModified);
    },

    sizeOf: function(type)
    {
        switch (type)
        {
            case DataType.Void:
            case DataType.NotModified:
                return 0;
            case DataType.Bool:
            case DataType.Int8:
            case DataType.UInt8:
                return 1;
            case DataType.Char:
            case DataType.Int16:
            case DataType.UInt16:
                return 2;
            case DataType.Int32:
            case DataType.UInt32:
            case DataType.Float32:
            case DataType.Resource:
                return 4;
            case DataType.Int64:
            case DataType.UInt64:
            case DataType.Float64:
            case DataType.DateTime:
                return 8;
            case DataType.DistributedResource:
                return 4;

            default:
                return -1;
        }
    }
};
  
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

class DistributedConnection extends IStore {

    send(data) {
        //console.log("Send", data.length);
        this.socket.send(data.buffer);
    }

    sendParams(doneReply) {
        return new SendList(this, doneReply);
    }

    generateNonce(length)
    {
        var rt = new Uint8Array(length);
        for(var i = 0; i < length; i++)
            rt[i] = Math.random() * 255;

        return rt;
    }

    constructor(url, domain, username, password, checkInterval = 30, connectionTimeout = 600, revivingTime = 120) {

        super();

        //Instance.Name = Global.GenerateCode(12);
        
        //this.hostType = AuthenticationType.Client;
        //this.domain = domain;
        //this.localUsername = username;
        
        this._register("ready");
        this._register("error");
        this._register("close");

        this.session = new Session(new Authentication(AuthenticationType.Client), new Authentication(AuthenticationType.Host));

        this.session.localAuthentication.domain = domain;
        this.session.localAuthentication.username = username;

        this.localPassword = DC.stringToBytes(password);

        this.socket = new WebSocket(url, "iip");
        this.socket.binaryType = "arraybuffer";
        this.socket.connection = this;
        this.socket.networkBuffer = new NetworkBuffer();

        this.debug = false;
        this.totalReceived = 0;
        this.totalSent = 0;

        this.checkInterval = checkInterval * 1000; // check every 30 seconds
        this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
        this.revivingTime = revivingTime * 1000; // 2 minutes
        this.lastAction = Date.now();

        this.packet = new IIPPacket();
        this.authPacket = new IIPAuthPacket();

        this.resources = {};
        this.templates = new KeyList();
        this.requests = {};
        this.pathRequests = {};
        this.templateRequests = new KeyList();
        this.resourceRequests = {};
        this.callbackCounter = 0;

        this.queue = new AsyncQueue();

        this.queue.then(function (x) {
            if (x.type == DistributedResourceQueueItemType.Event) {
                x.resource._emitEventByIndex(x.index, x.value);
            }
            else {
                x.resource._updatePropertyByIndex(x.index, x.value);
            }
        });

        this.localNonce = this.generateNonce(32);// new Uint8Array(32);
        //window.crypto.getRandomValues(this.localNonce);

        // declare (Credentials -> No Auth, No Enctypt)
        var un = DC.stringToBytes(username);
        var dmn = DC.stringToBytes(domain);
        var self = this;

        this.socket.onopen = function () {
            var bl = new BinaryList();
            bl.addUint8(0x60).addUint8(dmn.length).addUint8Array(dmn).addUint8Array(self.localNonce).addUint8(un.length).addUint8Array(un);
            self.send(bl.toArray());
        };

        this.socket.onmessage = function (msg) {

            //console.log("Rec", msg.data.byteLength);

            this.networkBuffer.writeAll(msg.data);

            self.lastAction = new Date();

            while (this.networkBuffer.available > 0 && !this.networkBuffer.protected)
                self.receive(this.networkBuffer);


        };

        this.socket.onclose = function(event)
        {
            self.close(event);
        };

        //this.socket.onerror = function(event)
        //{
        //    self.close(event);
        //};
    }


    processPacket(msg, offset, ends, data)
    {

        
        var authPacket = this.authPacket;
        
        if (this.ready) {
            var packet = new IIPPacket();

            var rt = packet.parse(msg, offset, ends);
            if (rt <= 0) {
                data.holdFor(msg, offset, ends - offset, -rt);
                return ends;
            }
            else {
                offset += rt;

                if (packet.command == IIPPacketCommand.Event) {
                    switch (packet.event) {
                        case IIPPacketEvent.ResourceReassigned:
                            this.IIPEventResourceReassigned(packet.resourceId, packet.newResourceId);
                            break;
                        case IIPPacketEvent.ResourceDestroyed:
                            this.IIPEventResourceDestroyed(packet.resourceId);
                            break;
                        case IIPPacketEvent.PropertyUpdated:
                            this.IIPEventPropertyUpdated(packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketEvent.EventOccurred:
                            this.IIPEventEventOccurred(packet.resourceId, packet.methodIndex, packet.content);
                            break;

                        case IIPPacketEvent.ChildAdded:
                            this.IIPEventChildAdded(packet.resourceId, packet.childId);
                            break;
                        case IIPPacketEvent.ChildRemoved:
                            this.IIPEventChildRemoved(packet.resourceId, packet.childId);
                            break;
                        case IIPPacketEvent.Renamed:
                            this.IIPEventRenamed(packet.resourceId, packet.content);
                            break;
                        case IIPPacketEvent.AttributesUpdated:
                            this.IIPEventAttributesUpdated(packet.resourceId, packet.content);
                            break;

                    }
                }
                else if (packet.command == IIPPacketCommand.Request) {
                    switch (packet.action) {

                        // Manage
                        case IIPPacketAction.AttachResource:
                            this.IIPRequestAttachResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ReattachResource:
                            this.IIPRequestReattachResource(packet.callbackId, packet.resourceId, packet.resourceAge);
                            break;
                        case IIPPacketAction.DetachResource:
                            this.IIPRequestDetachResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.CreateResource:
                            this.IIPRequestCreateResource(packet.callbackId, packet.storeId, packet.resourceId, packet.content);
                            break;
                        case IIPPacketAction.DeleteResource:
                            this.IIPRequestDeleteResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.AddChild:
                            this.IIPRequestAddChild(packet.callbackId, packet.resourceId, packet.childId);
                            break;
                        case IIPPacketAction.RemoveChild:
                            this.IIPRequestRemoveChild(packet.callbackId, packet.resourceId, packet.childId);
                            break;
                        case IIPPacketAction.RenameResource:
                            this.IIPRequestRenameResource(packet.callbackId, packet.resourceId, packet.content);
                            break;

                        // Inquire
                        case IIPPacketAction.TemplateFromClassName:
                            this.IIPRequestTemplateFromClassName(packet.callbackId, packet.className);
                            break;
                        case IIPPacketAction.TemplateFromClassId:
                            this.IIPRequestTemplateFromClassId(packet.callbackId, packet.classId);
                            break;
                        case IIPPacketAction.TemplateFromResourceId:
                            this.IIPRequestTemplateFromResourceId(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.QueryLink:
                            this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
                            break;
                        case IIPPacketAction.ResourceChildren:
                            this.IIPRequestResourceChildren(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ResourceParents:
                            this.IIPRequestResourceParents(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ResourceHistory:
                            this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
                            break;

                        // Invoke
                        case IIPPacketAction.InvokeFunctionArrayArguments:
                            this.IIPRequestInvokeFunctionArrayArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketAction.InvokeFunctionNamedArguments:
                            this.IIPRequestInvokeFunctionNamedArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;    
                        case IIPPacketAction.GetProperty:
                            this.IIPRequestGetProperty(packet.callbackId, packet.resourceId, packet.methodIndex);
                            break;
                        case IIPPacketAction.GetPropertyIfModified:
                            this.IIPRequestGetPropertyIfModifiedSince(packet.callbackId, packet.resourceId, packet.methodIndex, packet.resourceAge);
                            break;
                        case IIPPacketAction.SetProperty:
                            this.IIPRequestSetProperty(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketAction.ResourceHistory:
                            this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
                            break;
                        case IIPPacketAction.QueryLink:
                            this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
                            break;

                            // Attribute
                        case IIPPacketAction.GetAllAttributes:
                            this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.UpdateAllAttributes:
                            this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.ClearAllAttributes:
                            this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.GetAttributes:
                            this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;
                        case IIPPacketAction.UpdateAttributes:
                            this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;
                        case IIPPacketAction.ClearAttributes:
                            this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;

                    }
                }
                else if (packet.command == IIPPacketCommand.Reply) {
                    switch (packet.action) {
                        case IIPPacketAction.AttachResource:
                            this.IIPReply(packet.callbackId, packet.classId, packet.resourceAge, packet.resourceLink, packet.content);
                            break;
                        case IIPPacketAction.ReattachResource:
                            this.IIPReply(packet.callbackId, packet.resourceAge, packet.content);
                            break;
                        case IIPPacketAction.DetachResource:
                            this.IIPReply(packet.callbackId);
                            break;
                        case IIPPacketAction.CreateResource:
                            this.IIPReply(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.DeleteResource:
                        case IIPPacketAction.AddChild:
                        case IIPPacketAction.RemoveChild:
                        case IIPPacketAction.RenameResource:
                            this.IIPReply(packet.callbackId);
                            break;
                        case IIPPacketAction.TemplateFromClassName:
                        case IIPPacketAction.TemplateFromClassId:
                        case IIPPacketAction.TemplateFromResourceId:
                            this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                            break;

                        case IIPPacketAction.QueryLink:
                        case IIPPacketAction.ResourceChildren:
                        case IIPPacketAction.ResourceParents:
                        case IIPPacketAction.ResourceHistory:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.InvokeFunctionArrayArguments:
                        case IIPPacketAction.InvokeFunctionNamedArguments:
                            this.IIPReplyInvoke(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.GetProperty:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;
                        case IIPPacketAction.GetPropertyIfModified:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;
                        case IIPPacketAction.SetProperty:
                            this.IIPReply(packet.callbackId);
                            break;

                        // Attribute
                        case IIPPacketAction.GetAllAttributes:
                        case IIPPacketAction.GetAttributes:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.UpdateAllAttributes:
                        case IIPPacketAction.UpdateAttributes:
                        case IIPPacketAction.ClearAllAttributes:
                        case IIPPacketAction.ClearAttributes:
                            this.IIPReply(packet.callbackId);
                            break;

                        }

                }
                else if (packet.command == IIPPacketCommand.Report)
                {
                    switch (packet.report)
                    {
                        case IIPPacketReport.ManagementError:
                            this.IIPReportError(packet.callbackId, ErrorType.Management, packet.errorCode, null);
                            break;
                        case IIPPacketReport.ExecutionError:
                            this.IIPReportError(packet.callbackId, ErrorType.Exception, packet.errorCode, packet.errorMessage);
                            break;
                        case IIPPacketReport.ProgressReport:
                            this.IIPReportProgress(packet.callbackId, ProgressType.Execution, packet.progressValue, packet.progressMax);
                            break;
                        case IIPPacketReport.ChunkStream:
                            this.IIPReportChunk(packet.callbackId, packet.content);

                            break;
                    }
                }

            }
        }

        else {
            var rt = authPacket.parse(msg, offset, ends);


            if (rt <= 0) {
                data.holdAllFor(msg, ends - rt);
                return ends;
            }
            else {
                offset += rt;

                if (this.session.localAuthentication.type == AuthenticationType.Host) {
                    if (authPacket.command == IIPAuthPacketCommand.Declare) {
                        if (authPacket.remoteMethod == IIPAuthPacketMethod.credentials
                            && authPacket.localMethod == IIPAuthPacketMethod.None) {
                            this.session.remoteAuthentication.username = authPacket.remoteUsername;
                            this.remoteNonce = authPacket.remoteNonce;
                            this.domain = authPacket.domain;
                            this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action) {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                            var remoteHash = authPacket.hash;

                            this.server.membership.getPassword(this.session.remoteAuthentication.username, this.domain).then(function (pw) {
                                if (pw != null) {

                                    //var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));
                                    var hash = SHA256.compute(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toDC());
                                    

                                    if (hash.sequenceEqual(remoteHash)) {
                                        // send our hash
                                        //var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
                                        var localHash = SHA256.compute(BL().addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toDC());
                                        this.sendParams().addUint8(0).addUint8Array(localHash).done();

                                        this.readyToEstablish = true;
                                    }
                                    else {
                                        // incorrect password
                                        this.sendParams().addUint8(0xc0).addInt32(1).addUint16(5).addString("Error").done();
                                    }
                                }
                            });
                        }
                        else if (authPacket.action == IIPAuthPacketAction.NewConnection) {
                            if (readyToEstablish) {
                                this.session.id = this.generateNonce(32);// new DC(32);
                                //window.crypto.getRandomValues(this.session.id);

                                this.sendParams().addUint8(0x28).addUint8Array(this.session.id).done();
                                this.ready = true;
                                this._emit("ready", this);
                            }
                        }
                    }
                }
                else if (this.session.localAuthentication.type == AuthenticationType.Client) {
                    if (authPacket.command == IIPAuthPacketCommand.Acknowledge) {
                        this.remoteNonce = authPacket.remoteNonce;

                        // send our hash

                        //var localHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.localPassword)
                        //    .addUint8Array(this.localNonce)
                        //    .addUint8Array(this.remoteNonce).toArray()));

                        var localHash = SHA256.compute(BL().addUint8Array(this.localPassword)
                            .addUint8Array(this.localNonce)
                            .addUint8Array(this.remoteNonce).toDC());

                        this.sendParams().addUint8(0).addUint8Array(localHash).done();
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action) {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                            // check if the server knows my password
                            //var remoteHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.remoteNonce)
                            //    .addUint8Array(this.localNonce)
                            //    .addUint8Array(this.localPassword).toArray()
                            //));

                            var remoteHash = SHA256.compute(BL().addUint8Array(this.remoteNonce)
                                .addUint8Array(this.localNonce)
                                .addUint8Array(this.localPassword).toDC());


                            if (remoteHash.sequenceEqual(authPacket.hash)) {
                                // send establish request
                                this.sendParams().addUint8(0x20).addUint16(0).done();
                            }
                            else {
                                this.sendParams().addUint8(0xc0).addUint32(1).addUint16(5).addString("Error").done();
                            }
                        }
                        else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished) {
                            this.session.id = authPacket.sessionId;
                            this.ready = true;
                            this._emit("ready", this);
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Error)
                    {
                        this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                        this.close();
                    }
                }
            }
        }

        return offset;

        //if (offset < ends)
        //    this.processPacket(msg, offset, ends, data);
    }

    receive(data) {
        var msg = data.read();
        var offset = 0;
        var ends = msg.length;
        var packet = this.packet;

        //console.log("Data");

        while (offset < ends) {
            offset = this.processPacket(msg, offset, ends, data);   
        }

        
    }

    close(event)
    {
        this._emit("close", event);
        
        Warehouse.remove(this);

        if (this.socket.readyState != this.socket.CLOSED)
        {
            this.socket.close();
        }
    }

    trigger(trigger) {
        return true;
    }

    put(resource) {
        this.resources[parseInt(resource.instance.name)] = resource;
        return true;
    }

    remove(resource)
    {
        // nothing to do (IStore interface)
    }

    // Protocol Implementation

    sendRequest2(action, binaryList) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.sendParams().addUint8(0x40 | action).addUint32(this.callbackCounter).addRange(binaryList).done();
        this.requests[this.callbackCounter] = reply;
        return reply;
    }

    sendRequest(action) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.requests[this.callbackCounter] = reply;
        return this.sendParams(reply).addUint8(0x40 | action).addUint32(this.callbackCounter);        
    }

    sendInvokeByArrayArguments(instanceId, index, parameters)
    {
        var reply = new AsyncReply();
        
        var pb = Codec.composeVarArray(parameters, this, true);

        this.callbackCounter++;
        this.sendParams()
                        .addUint8(0x40 | IIPPacketAction.InvokeFunctionArrayArguments)
                        .addUint32(this.callbackCounter)
                        .addUint32(instanceId)
                        .addUint8(index)
                        .addUint8Array(pb)
                        .done();

        this.requests[this.callbackCounter] = reply;

        return reply; 
    }

    sendInvokeByNamedArguments(instanceId, index, parameters)
    {
        var reply = new AsyncReply();
        
        var pb = Codec.composeStructure(parameters, this, true, true, true);

        this.callbackCounter++;
        this.sendParams()
                        .addUint8(0x40 | IIPPacketAction.InvokeFunctionNamedArguments)
                        .addUint32(this.callbackCounter)
                        .addUint32(instanceId)
                        .addUint8(index)
                        .addUint8Array(pb)
                        .done();

        this.requests[this.callbackCounter] = reply;

        return reply; 
    }


    sendError(type, callbackId, errorCode, errorMessage = "")
    {
        var msg = DC.stringToBytes(errorMessage);
        if (type == ErrorType.Management)
            this.sendParams()
                            .addUint8(0xC0 | IIPPacketReport.ManagementError)
                            .addUint32(callbackId)
                            .addUint16(errorCode)
                            .done();
        else if (type == ErrorType.Exception)
            this.sendParams()
                            .addUint8(0xC0 | IIPPacketReport.ExecutionError)
                            .addUint32(callbackId)
                            .addUint16(errorCode)
                            .addUint16(msg.length)
                            .addUint8Array(msg)
                            .done();
    }

    sendProgress(callbackId, value, max)
    {
        this.sendParams()
                        .addUint8(0xC0 | IIPPacketReport.ProgressReport)
                        .addUint32(callbackId)
                        .addInt32(value)
                        .addInt32(max)
                        .done();
    }

    sendChunk(callbackId, chunk)
    {
        var c = Codec.compose(chunk, this, true);
        this.sendParams()
                        .addUint8(0xC0 | IIPPacketReport.ChunkStream)
                        .addUint32(callbackId)
                        .addUint8Array(c)
                        .done();
    }

    IIPReply(callbackId) {

        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.requests[callbackId];

        //console.log("Reply " + callbackId, req);

        delete this.requests[callbackId];
        req.trigger(results);
    }

    IIPReplyInvoke(callbackId, result)
    {
        var req = this.requests[callbackId];
        delete this.requests[callbackId];

        Codec.parse(result, 0, {}, this).then(function(rt)
        {
            req.trigger(rt);
        });
    }

    IIPReportError(callbackId, errorType, errorCode, errorMessage)
    {
        var req = this.requests[callbackId];
        delete this.requests[callbackId];
        req.triggerError(errorType, errorCode, errorMessage);
    }

    IIPReportProgress(callbackId, type, value, max)
    {
        var req = this.requests[callbackId];
        req.triggerProgress(type, value, max);
    }

    IIPReportChunk(callbackId, data)
    {
        if (this.requests[callbackId])
        {
            var req = this.requests[callbackId];
            Codec.parse(data, 0, {}, this).then(function(x)
            {
                req.triggerChunk(x);
            });
        }
    }

    IIPEventResourceReassigned(resourceId, newResourceId) {

    }

    IIPEventResourceDestroyed(resourceId) {
        if (this.resources[resourceId]) {
            var r = this.resources[resourceId];
            delete this.resources[resourceId];
            r.destroy();
        }
    }

    IIPEventPropertyUpdated(resourceId, index, content) {

        var self = this;
        
        this.fetch(resourceId).then(function(r){
                // push to the queue to gaurantee serialization
                var item = new AsyncReply();
                self.queue.add(item);
    
                Codec.parse(content, 0, {}, self).then(function (args) {
                    var pt = r.instance.template.getPropertyTemplateByIndex(index);
                    if (pt != null) {
                        item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
                    }
                    else {    // ft found, fi not found, this should never happen
                        self.queue.remove(item);
                    }
                });
        });
    }


    IIPEventEventOccurred(resourceId, index, content) {
        var self = this;

        this.fetch(resourceId).then(function(r){
            // push to the queue to guarantee serialization
            var item = new AsyncReply();
            var r = self.resources[resourceId];

            self.queue.add(item);

            Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
                var et = r.instance.template.getEventTemplateByIndex(index);
                if (et != null) {
                    item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    self.queue.remove(item);
                }
            });
        });
    }

    IIPEventChildAdded(resourceId, childId)
    {
        var self = this;

        this.fetch(resourceId).then(function(parent)
        {
            self.fetch(childId).then(function(child)
            {
                parent.instance.children.add(child);
            });
        });
    }

    IIPEventChildRemoved(resourceId, childId)
    {
        var self = this;

        this.fetch(resourceId).then(function(parent)
        {
            self.fetch(childId).then(function(child)
            {
                parent.instance.children.remove(child);
            });
        });
    }

    IIPEventRenamed(resourceId, name)
    {
        this.fetch(resourceId).then(function(resource)
        {
            resource.instance.attributes.set("name", name.getString(0, name.length));
        });
    }


    IIPEventAttributesUpdated(resourceId, attributes)
    {
        var self = this;

        this.fetch(resourceId).then(function(resource)
        {
            var attrs = attributes.getStringArray(0, attributes.length);

            self.getAttributes(resource, attrs).then(function(s)
            {
                resource.instance.setAttributes(s);
            });
        });
    }

    sendReply(action, callbackId)
    {
        return this.sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }

    sendEvent(evt)
    {
        return this.sendParams().addUint8(evt);
    }

    IIPRequestAttachResource(callback, resourceId) {

        //var sl = this.sendParams();
        var self = this;


        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {

                if (r.instance.applicable(self.session, ActionType.Attach, null) == Ruling.Denied)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AttachDenied);
                    return;
                }

                r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
                r.instance.on("ResourceModified", self.instance_propertyModified, self);
                r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self);
                // reply ok

                var link = DC.stringToBytes(r.instance.link);

                if (r instanceof DistributedResource)
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.composePropertyValueArray(r._serialize(), self, true))
                        .done();
                else
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.composePropertyValueArray(r.instance.serialize(), self, true))
                        .done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);                
            }
        });
    }

    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (res != null) {
                r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
                r.instance.on("ResourceModified", self.instance_propertyModified, self);
                r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self);
                // reply ok
                self.sendReply(IIPPacketAction.ReattachResource, callback)
                        .addUint64(r.instance.age)
                        .addUint8Array(Codec.composePropertyValueArray(r.instance.serialize(), self, true))
                        .done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.off("ResourceEventOccurred", self.instance_eventOccurred);
                r.instance.off("ResourceModified", self.instance_propertyModified);
                r.instance.off("ResourceDestroyed", self.instance_resourceDestroyed);

                // reply ok
                self.sendReply(IIPPacketAction.DetachResource, callback).done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestCreateResource(callback, storeId, parentId, content) {
        var self = this;
        Warehouse.get(storeId).then(function(store)
            {
                if (store == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.StoreNotFound);
                    return;
                }

                if (!(store instanceof IStore))
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceIsNotStore);
                    return;
                }

                // check security
                if (store.instance.applicable(self.session, ActionType.CreateResource, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.CreateDenied);
                    return;
                }

                Warehouse.get(parentId).then(function(parent)
                {

                    // check security

                    if (parent != null)
                        if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed)
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                            return;
                        }

                    var offset = 0;

                    var className = content.getString(offset + 1, content[0]);
                    offset += 1 + content[0];

                    var nameLength = content.getUint16(offset);
                    offset += 2;
                    var name = content.getString(offset, nameLength);

                    var cl = content.getUint32(offset);
                    offset += 4;

                    var type = window[className];

                    if (type == null)
                    {
                        self.sendError(ErrorType.Management, callback, ExceptionCode.ClassNotFound);
                        return;
                    }

                    Codec.parseVarArray(content, offset, cl, self).then(function(parameters)
                    {
                        offset += cl;
                        cl = content.getUint32(offset);
                        Codec.parseStructure(content, offset, cl, self).then(function(attributes)
                        {
                            offset += cl;
                            cl = content.length - offset;

                            Codec.parseStructure(content, offset, cl, self).then(function(values)
                            {


                                var resource = new (Function.prototype.bind.apply(type, values));
                            
                                Warehouse.put(resource, name, store, parent);


                                self.sendReply(IIPPacketAction.CreateResource, callback)
                                            .addUint32(resource.Instance.Id)
                                            .done();
                               
                            });
                        });
                    });
                });
            });
    }

    IIPRequestDeleteResource(callback, resourceId) {
        var self = this;
        Warehouse.get(resourceId).then(function(r)
            {
                if (r == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (r.instance.store.instance.applicable(session, ActionType.Delete, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteDenied);
                    return;
                }

                if (Warehouse.remove(r))
                    self.sendReply(IIPPacketAction.DeleteResource, callback).done();
                else
                    self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteFailed);
            });
    }

    IIPRequestTemplateFromClassName(callback, className) {
        
        var self = this;

        Warehouse.getTemplateByClassName(className).then(function (t) {
            if (t != null)
                self.sendReply(IIPPacketAction.TemplateFromClassName, callback)
                                .addUint32(t.content.length)
                                .addUint8Array(t.content)
                                .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var self = this;
        Warehouse.getTemplateByClassId(classId).then(function (t) {
            if (t != null)
                self.sendReply(IIPPacketAction.TemplateFromClassId, callback)
                            .addUint32(t.content.length)
                            .addUint8Array(t.content)
                            .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null)
                self.sendReply(IIPPacketAction.TemplateFromResourceId, callback)
                            .addUint32(r.instance.template.content.length)
                            .addUint8Array(r.instance.template.content)
                            .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);                
            }
        });
    }

    IIPRequestInvokeFunctionArrayArguments(callback, resourceId, index, content) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invokeByArrayArguments(index, args);
                            if (rt != null) {
                                rt.then(function (res) {
                                    self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                    .addUint8Array(Codec.compose(res, self))
                                                    .done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];

                            if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied)
                            {
                                self.sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                                return;
                            }

                            if (fi instanceof Function) {
                                args.push(self);

                                var rt = fi.apply(r, args);


                                if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                      .addUint8Array(Codec.compose(res, self))
                                                      .done();
                                    });
                                }
                                else {
                                    self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                    .addUint8Array(Codec.compose(rt, self))
                                                    .done();
                                }
                            }
                            else {
                                // ft found, fi not found, this should never happen
                            }
                        }
                    }
                    else {
                        // no function at this index
                    }
                });
            }
            else {
                // no resource with this id
            }
        });
    }

    
    IIPRequestInvokeFunctionNamedArguments(callback, resourceId, index, content) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseStructure(content, 0, content.Length, self).then(function (namedArgs) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invokeByNamedArguments(index, namedArgs);
                            if (rt != null) {
                                rt.then(function (res) {
                                    self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                    .addUint8Array(Codec.compose(res, self))
                                                    .done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];

                            if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied)
                            {
                                self.sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                                return;
                            }

                            if (fi instanceof Function) {

                                var pi = ResourceTemplate.getFunctionParameters(fi);
                                var args = new Array(pi.length);

                                for (var i = 0; i < pi.Length; i++)
                                {
                                    if (namedArgs[pi[i]] !== undefined)
                                        args[i] = namedArgs[pi[i]];
                                }

                                // pass this to the last argument if it is undefined
                                if (args[args.length-1] === undefined)
                                    args[args.length-1] = self;

                                var rt = fi.apply(r, args);


                                if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                      .addUint8Array(Codec.compose(res, self))
                                                      .done();
                                    });
                                }
                                else {
                                    self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                    .addUint8Array(Codec.compose(rt, self))
                                                    .done();
                                }
                            }
                            else {
                                // ft found, fi not found, this should never happen
                            }
                        }
                    }
                    else {
                        // no function at this index
                    }
                });
            }
            else {
                // no resource with this id
            }
        });
    }

    IIPRequestGetProperty(callback, resourceId, index) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r instanceof DistributedResource) {
                        self.sendReply(IIPPacketAction.GetProperty, callback)
                                        .addUint8Array(Codec.compose(r._get(pt.index), self))
                                        .done();
                    }
                    else {
                        var pv = r[pt.name];
                        self.sendReply(IIPPacketAction.GetProperty)
                                    .addUint8Array(Codec.compose(pv, self))
                                    .done();
                    }
                }
                else {
                    // pt not found
                }
            }
            else {
                // resource not found
            }
        });
    }

    IIPRequestGetPropertyIfModifiedSince(callback, resourceId, index, age) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r.instance.getAge(index) > age) {
                        var pv = r[pt.name];
                        self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
                                        .addUint8Array(Codec.compose(pv, self))
                                        .done();
                    }
                    else 
                    {
                        self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
                                        .addUint8(DataType.NotModified)
                                        .done();
                    }
                }
                else {
                    // pt not found
                }
            }
            else {
                // resource not found
            }
        });
    }

    IIPRequestSetProperty(callback, resourceId, index, content) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {


                var pt = r.instance.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    Codec.parse(content, 0, {}, this).then(function (value) {
                        if (r instanceof DistributedResource) {
                            // propagation
                            r._set(index, value).then(function (x) {
                                self.sendReply(IIPPacketAction.SetProperty, callback)
                                                .done();
                            }).error(function(x){
                                self.sendError(x.type, callback, x.code, x.message)
                                    .done();
                            });
                        }
                        else 
                        {
                            if (r.instance.applicable(self.session, ActionType.SetProperty, pt) == Ruling.Denied)
                            {
                                self.sendError(AsyncReply.ErrorType.Exception, callback, ExceptionCode.SetPropertyDenied);
                                return;
                            }
                            
                            try
                            {
                                if (r[pt.name] instanceof DistributedPropertyContext)
                                    value = new DistributedPropertyContext(this, value);

                                r[pt.name] = value;
                                self.sendReply(IIPPacketAction.SetProperty, callback).done();
                            }
                            catch(ex)
                            {
                                self.sendError(AsyncReply.ErrorType.Exception, callback, 0, ex.toString()).done();
                            }
                        }

                    });
                }
                else {
                    // property not found
                    self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
                }
            }
            else {
                // resource not found
                self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
            }
        });
    }

    IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(r)
        {
            if (r != null)
            {
                r.instance.store.getRecord(r, fromDate, toDate).then(function(results)
                {
                    var history = Codec.composeHistory(results, self, true);
                    self.sendReply(IIPPacketAction.ResourceHistory, callback)
                                    .addUint8Array(history)
                                    .done();
                });
            }
        });
    }

    IIPRequestQueryResources(callback, resourceLink)
    {
        var self = this;

        Warehouse.query(resourceLink).then(function(resources)
        {

            var list = resources.filter(function(r){return r.instance.applicable(self.session, ActionType.Attach, null) !=  Ruling.Denied});

            if (list.length == 0)
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
                self.sendReply(IIPPacketAction.QueryLink, callback)
                    .addUint8Array(Codec.composeResourceArray(list, self, true))
                    .done();
        });
    }

    create(store, parent, className, parameters, attributes, values)
    {
        var reply = new AsyncReply();
        var sb = DC.stringToBytes(className);

        var pkt = BL().addUint32(store.instance.id)
                      .addUint32(parent.instance.id)
                      .addUint32(sb.length)
                      .addUint8Array(sb)
                      .addUint8Array(Codec.composeVarArray(parameters, this, true))
                      .addUint8Array(Codec.composeStructure(attributes, this, true, true, true))
                      .addUint8Array(Codec.composeStructure(values, this));

        pkt.addUint32(pkt.length, 8);

        this.sendRequest(IIPPacket.IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function(args)
        {
            var rid = args[0];

            self.fetch(rid).then(function(r)
            {
                reply.trigger(r);
            });

        });

        return reply;
    }

    query(resourceLink)
    {
        var reply = new AsyncReply();
        var self = this;

        var sb = DC.stringToBytes(resourceLink);

        this.sendRequest(IIPPacketAction.QueryLink)
                        .addUint16(sb.length)
                        .addUint8Array(sb)
                        .done()
                        .then(function(args)
        {
            Codec.parseResourceArray(args[0], 0, args[0].length, self).then(function(resources) {
                reply.trigger(resources);
            });
        }).error(function(ex){
            reply.triggerError(ex);
        });

        return reply;
    }

    getTemplate(classId) {
        if (this.templates.contains(classId))
            return new AsyncReply(this.templates.item(classId));
        else if (this.templateRequests.contains(classId))
            return this.templateRequests.item(classId);

        var reply = new AsyncReply();
        this.templateRequests.add(classId.valueOf(), reply);

        var self = this;

        this.sendRequest(IIPPacketAction.TemplateFromClassId)
                        .addUint8Array(classId.value)
                        .done()
                        .then(function (rt) {
                            self.templateRequests.remove(classId);
                            self.templates.add(rt[0].classId.valueOf(), rt[0]);
                            Warehouse.putTemplate(rt[0]);
                            reply.trigger(rt[0]);
                        });

        return reply;
    }

// IStore interface
    get(path) {

        var rt = new AsyncReply();
        
        this.query(path).then(function(ar)
        {
            if (ar != null && ar.length > 0)
                rt.trigger(ar[0]);
            else
                rt.trigger(null);
        }).error(function(ex) {rt.triggerError(ex);});

        return rt;
        
        /*
        if (this.pathRequests[path])
            return this.pathRequests[path];

        var reply = new AsyncReply();
        this.pathRequests[path] = reply;

        var bl = new BinaryList();
        bl.addString(path);
        bl.addUint16(bl.length, 0);

        var link = data.get
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
                        .addUint16(.then(function (rt) {
            delete self.pathRequests[path];

            self.fetch(rt[1]).then(function (r) {
                reply.trigger(r);
            });
        });


        return reply;
        */
    }

    retrieve(iid) {
        for (var r in this.resources)
            if (this.resources[r].instance.id == iid)
                return new AsyncReply(r);
        return new AsyncReply(null);
    }

// Get a resource from the other end
    fetch(id) {
        if (this.resourceRequests[id] && this.resources[id]) {
            // dig for dead locks
            // or not
            return new AsyncReply(this.resources[id]);
            //return this.resourceRequests[id];
        }
        else if (this.resourceRequests[id])
            return this.resourceRequests[id];
        else if (this.resources[id])
            return new AsyncReply(this.resources[id]);

        var reply = new AsyncReply();

        this.resourceRequests[id] = reply;

        var self = this;

        this.sendRequest(IIPPacketAction.AttachResource)
                    .addUint32(id)
                    .done()
                    .then(function (rt) {
                        var dr = new DistributedResource(self, id, rt[1], rt[2]);
                        //var dr = new DistributedResource(self, tmp, id, rt[1], rt[2]);

                            self.getTemplate(rt[0]).then(function (tmp) {

                            // ClassId, ResourceAge, ResourceLink, Content
                            Warehouse.put(dr, id.toString(), self, null, tmp);

                    
                            Codec.parsePropertyValueArray(rt[3], 0, rt[3].length, self).then(function (ar) {
                                dr._attached(ar);
                                delete self.resourceRequests[id];
                                reply.trigger(dr);
                            });
                        });
                    });

        return reply;
    }

    getRecord(resource, fromDate, toDate)
    {
        if (resource instanceof DistributedResource)
        {

            if (resource._p.connection != this)
                return new AsyncReply(null);

            var reply = new AsyncReply();

            var self = this;

            this.sendRequest(IIPPacketAction.ResourceHistory)
                            .addUint32(resource._p.instanceId)
                            .addDateTime(fromDate).addDateTime(toDate)
                            .done()
                            .then(function(rt)
                            {
                                Codec.parseHistory(rt[0], 0, rt[0].length, resource, self).then(function(history)
                                {
                                    reply.trigger(history);
                                });
                            });

            return reply;
        }
        else
            return new AsyncReply(null);
    }

    instance_resourceDestroyed(resource) {
        // compose the packet
        this.sendEvent(IIPPacketEvent.ResourceDestroyed)
                        .addUint32(resource.instance.id)
                        .done();
    }

    instance_propertyModified(resource, name, newValue) {
        var pt = resource.instance.template.getPropertyTemplateByName(name);

        if (pt == null)
            return;

        this.sendEvent(IIPPacketEvent.PropertyUpdated)
                            .addUint32(resource.instance.id)
                            .addUint8(pt.index)
                            .addUint8Array(Codec.compose(newValue, this))
                            .done();
    }

    instance_eventOccurred(resource, issuer, receivers, name, args) {
        var et = resource.instance.template.getEventTemplateByName(name);

        if (et == null)
            return;

        if (receivers != null)
            if (receivers.indexOf(this.session) < 0)
                return;

        if (resource.instance.applicable(this.session, ActionType.ReceiveEvent, et, issuer) == Ruling.Denied)
            return;

        // compose the packet
        this.sendEvent(IIPPacketEvent.EventOccurred)
                        .addUint32(resource.instance.id)
                        .addUint8(et.index)
                        .addUint8Array(Codec.composeVarArray(args, this, true))
                        .done();

    }



    IIPRequestAddChild(callback, parentId, childId)
    {
        var self = this;
        Warehouse.get(parentId).then(function(parent)
        {
            if (parent == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.get(childId).then(function(child)
            {
                if (child == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.AddParent, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.add(child);

                self.sendReply(IIPPacketAction.AddChild, callback)
                                .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRemoveChild(callback, parentId, childId)
    {
        var self = this;

        Warehouse.get(parentId).then(function(parent)
        {
            if (parent == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.get(childId).then(function(child)
            {
                if (child == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.RemoveChild, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.RemoveParent, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.remove(child);

                self.sendReply(IIPPacketAction.RemoveChild, callback)
                                .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRenameResource(callback, resourceId, name)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (resource.instance.applicable(self.session, ActionType.Rename, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.RenameDenied);
                return;
            }

            resource.instance.name = name.getString(0, name.length);
            self.sendReply(IIPPacketAction.RenameResource, callback)
                            .done();
        });
     }

    IIPRequestResourceChildren(callback, resourceId)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceChildren, callback)
                        .addUint8Array(Codec.composeResourceArray(resource.instance.children.toArray(), this, true))
                        .done();
            
        });
    }

    IIPRequestResourceParents(callback, resourceId)
    {
        var self = this;

        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceParents, callback)
                            .addUint8Array(Codec.composeResourceArray(resource.instance.parents.toArray(), this, true))
                            .done();
        });
    }

    IIPRequestClearAttributes(callback, resourceId, attributes, all = false)
    {
        Warehouse.get(resourceId).then(function(r)
        {
            if (r == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            var attrs = [];

            if (!all)
                attrs = attributes.getStringArray(0, attributes.length);

            if (r.instance.removeAttributes(attrs))
                self.sendReply(all ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes, callback)
                              .done();
            else
                self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);

        });
    }

    IIPRequestUpdateAttributes(callback, resourceId, attributes, clearAttributes = false)
    {
        var self = this;

        Warehouse.get(resourceId).then(function(r)
        {
            if (r == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            Codec.parseStructure(attributes, 0, attributes.Length, this).then(function(attrs) {
                if (r.instance.setAttributes(attrs, clearAttributes))
                    self.sendReply(clearAttributes ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes,
                              callback)
                              .done();
                else
                    self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);
            });
           
        });

    }


    
    getChildren(resource)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceChildren)
                        .addUint32(resource._p.instanceId)
                        .done()
                        .then(function(d)
        {
            
            Codec.parseResourceArray(d, 0, d.length, self).then(function(resources)
            {
                rt.trigger(resources);
            }).error(function(ex) { rt.triggerError(ex); });
        });

        return rt;
    }

    getParents(resource)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceParents)
                        .addUint32(resource._p.instanceId)
                        .done()
                        .then(function(d)
        {
            Codec.parseResourceArray(d, 0, d.length, this).then(function(resources)
            {
                rt.trigger(resources);
            }).error(function(ex) { rt.triggerError(ex);});
        });

        return rt;
    }

    removeAttributes(resource, attributes = null)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();

        if (attributes == null)
            this.sendRequest(IIPPacketAction.ClearAllAttributes)
                            .addUint32(resource._p.instanceId)
                            .done()
                            .then(function(ar)
            {
                rt.trigger(true);
            }).error(function(ex) { rt.triggerError(ex); });
        else
        {
            var attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.ClearAttributes)
                            .addUint32(resource.instance.id)
                            .addUint32(attrs.length)
                            .addUint8Array(attrs)
                            .done()
                            .then(function(ar)
            {
                rt.trigger(true);
            }).error(function(ex) { rt.triggerChunk(ex); });
        }

        return rt;
    }

    setAttributes(resource, attributes, clearAttributes = false)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        
        this.sendRequest(clearAttributes ? IIPPacketAction.UpdateAllAttributes : IIPPacketAction.UpdateAttributes)
                        .addUint32(resource._p.instanceId)
                        .addUint8Array(Codec.composeStructure(attributes, this, true, true, true))
                        .done()
                        .then(function(ar)
                                {
                                    rt.trigger(true);
                                }).error(function(ex) {rt.triggerError(ex);});
    
        return rt;
    }

    getAttributes(resource, attributes = null)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        if (attributes == null)
        {
            this.sendRequest(IIPPacketAction.GetAllAttributes)
                            .addUint32(resource._p.instanceId)
                            .done()
                            .then(function(ar)
                            {
                                Codec.parseStructure(ar[0], 0, ar[0].length, this).then(function(st)
                                {
                                    for (var a in st)
                                       resource.instance.attributes.set(a, st[a]);
                                    rt.trigger(st);
                                }).error(function(ex) { rt.triggerError(ex); });
                            });
        }
        else
        {
            var attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.GetAttributes)
                            .addUint32(resource._p.instanceId)
                            .addUint32(attrs.length)
                            .addUint8Array(attrs)
                            .done()
                            .then(function(ar)
            {
                Codec.parseStructure(ar[0], 0, ar[0].length, self).then(function(st)
                {
                    for (var a in st)
                        resource.instance.attributes.set(a, st[a]);
                    rt.trigger(st);
                }).error(function(ex) { rt.triggerError(ex); });
            });
        }

        return rt;
    }

}
  
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

class DistributedResource extends IResource
{
    destroy()
    {
        this.destroyed = true;
        this._emit("destroy", this);
    }

    constructor(connection, instanceId, age, link)
    {
        super();

        this._p = {
            isAttached: false,
            connection: connection,
            instanceId: instanceId,
            age: age,
            link: link,
            properties: []
        };
    }

    _serialize()
    {
        var props = [];

        for (var i = 0; i < this._p.properties.length; i++)
            props.push(new PropertyValue(this._p.properties[i], 
                                         this.instance.getAge(i), 
                                         this.instance.getModificationDate(i)));
        
        return props;
    }

    _attached(properties)
    {

        if (this._isAttached)
            return false;
        else
        { 
            for(var i = 0; i  < properties.length; i++)
            {
                this.instance.setAge(i, properties[i].age);
                this.instance.setModificationDate(i, properties[i].date);
                this._p.properties.push(properties[i].value);
            }


            this._p.isAttached = true;

            var self = this;

            var makeFunc = function(index)
            {
              return function () {

                  if (   arguments.length = 1 
                      && arguments[0] instanceof Object 
                      && arguments[0].constructor.name == "Object")
                  {
                      var namedArgs = new Structure(arguments[0]);
                      return self._invokeByNamedArguments(index, namedArgs);
                  }
                  else
                  {
                      return self._invokeByArrayArguments(index, arguments);
                  }
              };
            };

            var makeGetter = function(index)
            {
                return function () {
                    return self._get(index);
                };
            };

            var makeSetter = function(index)
            {
                return function (value) {
                    self._set(index, value);
                };
            };

            for(var i = 0; i < this.instance.template.functions.length; i++)
            {
                var ft = this.instance.template.functions[i];
                this[ft.name] = makeFunc(ft.index);
            }

            for(var i = 0; i < this.instance.template.properties.length; i++)
            {
                var pt = this.instance.template.properties[i];

                Object.defineProperty(this, pt.name, {
                    get: makeGetter(pt.index),
                    set: makeSetter(pt.index),
                    enumerable: true,
                    configurable: true
                });

            }
        }
        return true;
    }

    _emitEventByIndex(index, args)
    {
        var et = this.instance.template.getEventTemplateByIndex(index);
        this._emitArgs(et.name, args);
        this.instance._emitResourceEvent(null, null, et.name, args);
    }

    _invokeByArrayArguments(index, args) {
        if (this.destroyed)
            throw new Exception("Trying to access destroyed object");

        if (index >= this.instance.template.functions.length)
            throw new Exception("Function index is incorrect");

        return this._p.connection.sendInvokeByArrayArguments(this._p.instanceId, index, args);
    }

    _invokeByNamedArguments(index, namedArgs) {
        if (this.destroyed)
            throw new Exception("Trying to access destroyed object");

        if (index >= this.instance.template.functions.length)
            throw new Exception("Function index is incorrect");

        return this._p.connection.sendInvokeByNamedArguments(this._p.instanceId, index, namedArgs);
    }

    _get(index)
    {
        if (index >= this._p.properties.length)
            return null;
        return this._p.properties[index];
    }


    _updatePropertyByIndex(index, value)
    {
        var pt = this.instance.template.getPropertyTemplateByIndex(index);
        this._p.properties[index] = value;
        this.instance.emitModification(pt, value);
    }

    _set(index, value)
    {
        if (index >= this._p.properties.length)
            return null;

        var reply = new AsyncReply();

        var parameters = Codec.compose(value, this._p.connection);
        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.SetProperty)
            .addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters)
            .done()
            .then(function(res)
        {
            // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
            self._p.properties[index] = value;
            reply.trigger(null);
        });

        return reply;
    }
}  
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

const DistributedResourceQueueItemType =
    {
        Propery: 0,
        Event: 1
    };

class DistributedResourceQueueItem {
    constructor(resource, type, value, index) {
        this.resource = resource;
        this.index = index;
        this.type = type;
        this.value = value;
    }
}

  
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
 * Created by Ahmed Zamil on 24/08/2017.
 */

"use strict";  

class EventTemplate extends MemberTemplate
{

    constructor()
    {
        super();
        this.type = MemberType.Event;
    }

    compose()
    {
        var rt = new BinaryList();

        var name = super.compose();
        if (this.expansion != null) {
            var exp = DC.stringToBytes(this.expansion);
            return rt.addUint8(0x50).addUint32(exp.length).addUint8Array(exp).addUint8(name.length).addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(0x40).addUint32(name.length).addUint8Array(name).toArray();
    }

}
  
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
 * Created by Ahmed Zamil on 27/08/2017.
 */

"use strict";  

class FunctionTemplate extends MemberTemplate {
    compose() {
        var name = super.compose();
        var rt = new BinaryList();

        if (this.expansion != null) {
            var exp = DC.stringToBytes(this.expansion);

            return rt.addUint8(0x10 | (this.isVoid ? 0x8 : 0x0))
                .addUint32(exp.length).addUint8Array(exp)
                .addUint8(name.length).addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(this.isVoid ? 0x8 : 0x0).addUint8(name.length).addUint8Array(name).toArray();
    }


    constructor() {
        super();
        this.type = MemberType.Function;
    }
}
  
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
 * Created by Ahmed Zamil on 02/09/2017.
 */

"use strict";  

class Guid
{
    constructor(dc)
    {
        this.value = dc;
    }

    valueOf()
    {
        return this.value.getHex(0, 16);
    }
}  
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

const IIPAuthPacketCommand =
{
    Action: 0,
    Declare: 1,
    Acknowledge: 2,
    Error: 3
};

const IIPAuthPacketAction =
{
    // Authenticate
    AuthenticateHash: 0,
    NewConnection: 0x20,
    ResumeConnection: 0x21,
    ConnectionEstablished: 0x28
};


const IIPAuthPacketMethod =
{
    None: 0,
    Certificate: 1,
    Credentials: 2,
    Token: 3
};

class IIPAuthPacket
{
    constructor()
    {
        this.command = 0;
        this.action = 0;
        this.errorCode = 0;
        this.errorMessage = "";
        this.localMethod = 0;
        this.sourceInfo = "";
        this.hash = "";
        this.sessionId = "";
        this.remoteMethod = 0;
        this.domain = "";
        this.CertificateId = 0;
        this.localUsername = "";
        this.remoteUsername = "";
        this.localPassword = "";
        this.remotePassword = "";
        this.localToken = [];
        this.reemoteToken = [];
        this.asymetricEncryptionKey = [];
        this.localNonce = [];
        this.remoteNonce = [];
        this.dataLengthNeeded = 0;
    }

    notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.dataLengthNeeded = needed - (ends - offset);
            return true;
        }
        else
            return false;
    }

    parse(data, offset, ends)
    {
        var oOffset = offset;

        if (this.notEnough(offset, ends, 1))
            return -this.dataLengthNeeded;

        this.command = data.getUint8(offset) >> 6;

        if (this.command == IIPAuthPacketCommand.Action)
        {
            this.action = data[offset++] & 0x3f;

            if (this.action == IIPAuthPacketAction.AuthenticateHash)
            {
                if (this.notEnough(offset, ends, 32))
                    return -this.dataLengthNeeded;

                this.hash = data.getUint8Array(offset, 32);

                offset += 32;
            }
            else if (this.action == IIPAuthPacketAction.NewConnection)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var length = data.getUint16(offset);

                offset += 2;

                if (this.notEnough(offset, ends, length))
                    return -this.dataLengthNeeded;

                this.sourceInfo = data.clip(offset, length);

                offset += 32;
            }
            else if (this.action == IIPAuthPacketAction.ResumeConnection
                || this.action == IIPAuthPacketAction.ConnectionEstablished)
            {
                if (this.notEnough(offset, ends, 32))
                    return -this.dataLengthNeeded;

                this.sessionId = data.clip(offset, 32);

                offset += 32;
            }
        }
        else if (this.command == IIPAuthPacketCommand.Declare)
        {
            this.remoteMethod = ((data.getUint8(offset) >> 4) & 0x3);
            this.localMethod = ((data.getUint8(offset) >> 2) & 0x3);

            var encrypt = ((data.getUint8(offset++) & 0x2) == 0x2);


            if (this.notEnough(offset, ends, 1))
                return -this.dataLengthNeeded;

            var domainLength = data.getUint8(offset++);
            if (this.notEnough(offset, ends, domainLength))
                return -this.dataLengthNeeded;

            this.domain = data.getString(offset, domainLength);

            offset += domainLength;


            if (this.remoteMethod == IIPAuthPacketMethod.Credentials)
            {
                if (this.localMethod == IIPAuthPacketMethod.None)
                {
                    if (this.notEnough(offset, ends, 33))
                        return -this.dataLengthNeeded;

                    this.remoteNonce = data.clip(offset, 32);

                    offset += 32;

                    var length = data.getUint8(offset++);

                    if (this.notEnough(offset, ends, length))
                        return -this.dataLengthNeeded;

                    this.remoteUsername = data.getString(offset, length);


                    offset += length;
                }
            }

            if (encrypt)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var keyLength = data.getUint16(offset);

                offset += 2;

                if (this.notEnough(offset, ends, keyLength))
                    return -this.dataLengthNeeded;

                this.asymetricEncryptionKey = data.clip(offset, keyLength);

                offset += keyLength;
            }
        }
        else if (this.command == IIPAuthPacketCommand.Acknowledge)
        {
            this.remoteMethod  = (data.getUint8(offset) >> 4) & 0x3;
            this.localMethod = (data.getUint8(offset) >> 2) & 0x3;
            var encrypt = ((data.getUint8(offset++) & 0x2) == 0x2);

            if (this.notEnough(offset, ends, 1))
                return -this.dataLengthNeeded;


            if (this.remoteMethod == IIPAuthPacketMethod.Credentials)
            {
                if (this.localMethod == IIPAuthPacketMethod.None)
                {
                    if (this.notEnough(offset, ends, 32))
                        return -this.dataLengthNeeded;

                    this.remoteNonce = data.clip(offset, 32);

                    offset += 32;

                }
            }

            if (encrypt)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var keyLength = data.getUint16(offset);

                offset += 2;

                if (this.notEnough(offset, ends, keyLength))
                    return -this.dataLengthNeeded;

                this.asymetricEncryptionKey = data.clip(offset, keyLength);

                offset += keyLength;
            }
        }
        else if (this.command == IIPAuthPacketCommand.Error)
        {
            if (this.notEnough(offset, ends, 5))
                return -this.dataLengthNeeded;

            offset++;
            this.errorCode = data.getUint8(offset++);


            var cl = data.getUint16(offset);
            offset += 2;

            if (this.notEnough(offset, ends, cl))
                return -this.dataLengthNeeded;

            this.errorMessage = data.getString(offset, cl);
            offset += cl;

        }


        return offset - oOffset;

    }
}
  
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

const IIPPacketCommand =
{
    Event: 0,
    Request: 1,
    Reply: 2,
    Report: 3
};

const IIPPacketReport = 
{
    ManagementError: 0,
    ExecutionError: 1,
    ProgressReport: 0x8,
    ChunkStream: 0x9
};

const IIPPacketEvent =
{
    // Event Manage
    ResourceReassigned : 0,
    ResourceDestroyed: 1,
    ChildAdded: 2,
    ChildRemoved: 3,
    Renamed: 4,

    // Event Invoke
    PropertyUpdated : 0x10,
    EventOccurred: 0x11,

    // Attribute
    AttributesUpdated: 0x18
                
};

const IIPPacketAction =
{
    // Request Manage
    AttachResource: 0,
    ReattachResource: 1,
    DetachResource: 2,
    CreateResource: 3,
    DeleteResource: 4,
    AddChild: 5,
    RemoveChild: 6,
    RenameResource: 7,

    // Request Inquire
    TemplateFromClassName: 8,
    TemplateFromClassId: 9,
    TemplateFromResourceId: 10,
    QueryLink: 11,
    ResourceHistory: 12,
    ResourceChildren: 13,
    ResourceParents: 14,

    // Request Invoke
    InvokeFunctionArrayArguments: 16,
    GetProperty: 17,
    GetPropertyIfModified: 18,
    SetProperty: 19,
    InvokeFunctionNamedArguments: 20,

    // Request Attribute
    GetAllAttributes: 24,
    UpdateAllAttributes: 25,
    ClearAllAttributes: 26,
    GetAttributes: 27,
    UpdateAttributes: 28,
    ClearAttributes: 29
};


class IIPPacket
{
    constructor()
    {
        this.command = 0;
        this.action = 0;
        this.event = 0;
        this.resourceId = 0;
        this.newResourceId = 0;
        this.resourceAge = 0;
        this.content = [];
        this.errorCode = 0;
        this.errorMessage = "";
        this.className = "";
        this.resourceLink = "";
        this.classId = "";
        this.methodIndex = "";
        this.methodName = "";
        this.callbackId = 0;
        this.dataLengthNeeded = 0;
        this.originalOffset = 0;
    }

    notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.dataLengthNeeded = needed - (ends - this.originalOffset);
            return true;
        }
        else
            return false;
    }

    parse(data, offset, ends)
    {
        this.originalOffset = offset;

        if (this.notEnough(offset, ends, 1))
            return -this.dataLengthNeeded;

        this.command =  (data.getUint8(offset) >> 6);

        if (this.command == IIPPacketCommand.Event)
        {
            this.event =  (data.getUint8(offset++) & 0x3f);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.resourceId = data.getUint32(offset);
            offset += 4;
        }
        else if (this.command == IIPPacketCommand.Report)
        {
            this.report = (data.getUint8(offset++) & 0x3f);
            
            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);
            offset += 4;
        }
        else
        {
            this.action = (data.getUint8(offset++) & 0x3f);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);
            offset += 4;
        }

        if (this.command == IIPPacketCommand.Event)
        {
            if (this.event == IIPPacketEvent.ResourceReassigned)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.newResourceId = data.getUint32( offset);
                offset += 4;

            }
            else if (this.event == IIPPacketEvent.ResourceDestroyed)
            {
                // nothing to parse
            }
            else if (this.event == IIPPacketEvent.ChildAdded
                || this.event == IIPPacketEvent.ChildRemoved)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.childId = data.getUint32(offset);
                offset += 4;
            }
            else if(this.event == IIPPacketEvent.Renamed)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);

                offset += cl;
            }
            else if (this.event == IIPPacketEvent.PropertyUpdated)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.methodIndex = data[offset++];

                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
            else if (this.event == IIPPacketEvent.EventOccurred)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            // Attribute
            else if (this.event == IIPPacketEvent.AttributesUpdated)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);

                offset += cl;
            }
        }
        else if (this.command == IIPPacketCommand.Request)
        {
            if (this.action == IIPPacketAction.AttachResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ReattachResource)
            {
                if (this.notEnough(offset, ends, 12))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint64(offset);
                offset += 8;
            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.CreateResource)
            {
                if (this.notEnough(offset, ends, 12))
                    return -dataLengthNeeded;

                this.storeId = data.getUint32(offset);
                offset += 4;
                this.resourceId = data.getUint32(offset);
                offset += 4;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -dataLengthNeeded;

                this.content = data.clip(offset, cl);
            }
            else if (this.action == IIPPacketAction.DeleteResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.AddChild
                    || this.action == IIPPacketAction.RemoveChild)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.childId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.RenameResource)
            {
                if (this.notEnough(offset, ends, 6))
                    return -this.dataLengthNeeded;
                
                this.resourceId = data.getUint32(offset);
                offset += 4;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.TemplateFromClassName)
            {
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var cl = data.getUint8(offset++);

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.className = data.getString(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.TemplateFromClassId)
            {
                if (this.notEnough(offset, ends, 16))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;
            }
            else if (this.action == IIPPacketAction.TemplateFromResourceId)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.QueryLink)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceLink = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.ResourceChildren
                    || this.action == IIPPacketAction.ResourceParents)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ResourceHistory)
            {
                if (this.notEnough(offset, ends, 20))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4; 

                this.fromDate = data.getDateTime(offset);
                offset += 8;

                this.toDate = data.getDateTime(offset);
                offset += 8;

            }
            else if (  this.action == IIPPacket.InvokeFunctionArrayArguments 
                    || this.action == IIPPacketAction.InvokeFunctionNamedArguments)
            {
                if (this.notEnough(offset, ends, 9))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.GetProperty)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

            }
            else if (this.action == IIPPacketAction.GetPropertyIfModified)
            {
                if (this.notEnough(offset, ends, 9))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data[offset++];

                this.resourceAge = data.getUint64(offset);
                offset += 8;

            }
            else if (this.action == IIPPacketAction.SetProperty)
            {
                if (this.notEnough(offset, ends, 6))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data[offset++];


                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset-5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                      return -this.dataLengthNeeded;

                    this.content = data.clip(offset-1, size + 1);
                    offset += size;
                }
            }

            // Attribute
            else if (this.action == IIPPacketAction.UpdateAllAttributes
                || this.action == IIPPacketAction.GetAttributes
                || this.action == IIPPacketAction.UpdateAttributes
                || this.action == IIPPacketAction.ClearAttributes)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }

        }
        else if (this.command == IIPPacketCommand.Reply)
        {
            if (this.action == IIPPacketAction.AttachResource
                || this.action == IIPPacketAction.ReattachResource)
            {
                if (this.notEnough(offset, ends, 26))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;

                this.resourceAge = data.getUint64(offset);
                offset += 8;

                var cl = data.getUint16(offset);
                offset+=2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceLink = data.getString(offset, cl);
                offset += cl;

                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.CreateResource)
            {
                if (this.notEnough(offset, ends, 20))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.TemplateFromClassName
                || this.action == IIPPacketAction.TemplateFromClassId
                || this.action == IIPPacketAction.TemplateFromResourceId
                || this.action == IIPPacketAction.QueryLink
                || this.action == IIPPacketAction.ResourceChildren
                || this.action == IIPPacketAction.ResourceParents
                || this.action == IIPPacketAction.ResourceHistory
                // Attribute
                || this.action == IIPPacketAction.GetAllAttributes
                || this.action == IIPPacketAction.GetAttributes)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.InvokeFunctionArrayArguments
                || this.action == IIPPacketAction.InvokeFunctionNamedArguments
                || this.action == IIPPacketAction.GetProperty
                || this.action == IIPPacketAction.GetPropertyIfModified)
            {
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                         return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
            else if (this.action == IIPPacketAction.SetProperty)
            {
                // nothing to do
            }
        }
        else if (this.command == IIPPacketCommand.Report)
        {
            if (this.report == IIPPacketReport.ManagementError)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.errorCode = data.getUint16(offset);
                offset += 2;
            }
            else if (this.report == IIPPacketReport.ExecutionError)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.errorCode = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.errorMessage = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.report == IIPPacketReport.ProgressReport)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.progressValue = data.getInt32(offset);
                offset += 4;
                this.progressMax = data.getInt32(offset);
                offset += 4;
            }
            else if (this.report == IIPPacketReport.ChunkStream)
            {
                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                         return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
        }

        return offset - this.originalOffset;
    }
}  
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
 * Created by Ahmed Zamil on 29/08/2017.
 */

"use strict";  

class Instance extends IEventHandler
{

    getAge(index)
    {
        if (index < this.ages.length)
            return this.ages[index];
        else
            return 0;
    }

    setAge(index, value)
    {
        if (index < this.ages.length)
        {
            this.ages[index] = value;
            if (value > this.instanceAge)
                this.instanceAge = value;
        }
    }
 
    getModificationDate(index)
    {
        if (index < this.modificationDates.length)
            return this.modificationDates[index];
        else
            return new Date(0);
    }

    setModificationDate(index, value)
    {
        if (index < this.modificationDates.length)
        {
            this.modificationDates[index] = value;

            if (value > this.instanceModificationDate)
                this.instanceModificationDate = value;
        }
    }

    loadProperty(name, age, modificationDate, value)
    {
        var pt = this.template.getPropertyTemplateByName(name);

        if (pt == null)
            return false;

        this.resource[name] = value;

        this.setAge(pt.index, age);
        this.setModificationDate(pt.index, modificationDate);

        return true;
    }

    deserialize(properties)
    {

        for (var i = 0; i < properties.length; i++)
        {
            var pt = this.template.GetPropertyTemplateByIndex(i);
            if (pt != null)
            {
                var pv = properties[i];
                this.loadProperty(pt.name, pv.age, pv.date, pv.value);
            }
        }

        return true;
    }

    serialize()
    {
        var props = [];

        for (var i = 0; i < this.template.properties.length; i++)
            props.push(new PropertyValue(this.resource[this.template.properties[i].name], 
                                         this.ages[this.template.properties[i].index], 
                                         this.modificationDates[this.template.properties[i].index]));
        
        return props;
    }

    isStorable()
    {
        return resource instanceof Storable;
    }

    emitModification(pt, value)
    {
        this.instanceAge++;

        var now = new Date();

        this.ages[pt.index] = this.instanceAge;
        this.modificationDates[pt.index] = now;
        
        if (pt.recordable)
            this.store.record(this.resource, pt.name, value, this.ages[pt.index], now);

        super._emit("ResourceModified", this.resource, pt.name, value);  
        this.resource._emit("modified", pt.name, value);
    }

    modified(propertyName = null)
    {
        if (propertyName == null)
            propertyName = modified.caller.name;

        var val = {};
        if (this.getPropertyValue(propertyName, val))
        {
            var pt = this.template.getPropertyTemplateByName(propertyName);            
            this.emitModification(pt, val.value)
        }
    }

    _emitResourceEvent(issuer, receivers, name, args)
    {
        super._emit("ResourceEventOccurred", this.resource, issuer, receivers, name, args);
    }

    getPropertyValue(name, resultObject)
    {
        for (var i = 0; i < this.template.properties.length; i++)
            if (this.template.properties[i].name == name)
            {
                resultObject.value = this.resource[name];
                return true;
            }

        return false;
    }



    constructor(id, name, resource, store, customTemplate = null, age = 0)
    {
        super();

        this.store = store;
        this.resource = resource;
        this.id = id;
        this.name = name;

        this.instanceAge = age;
        this.instanceModificationDate = new Date(0);

        this.children = new AutoList();
        this.parents = new AutoList();
        this.managers = new AutoList();

        this.attributes = new KeyList();

        var self = this;

        this.children.on("add", function(value){
            value.instance.parents.add(self.resource);
        });

        this.children.on("remove", function(value){
            value.instance.parents.remove(self.resource);
        });


        this.resource.on("Destroy", function(sender){
            self._emit("ResourceDestroyed", sender);
        });

        if (customTemplate != null)
            this.template = customTemplate;
        else
            this.template = Warehouse.getTemplateByType(this.resource.constructor);

        // set ages
        this.ages = [];
        this.modificationDates = [];

        for(var i = 0; i < this.template.properties.length; i++)
        {
            this.ages.push(0);
            this.modificationDates.push(new Date(0));
        }

        // connect events
        for (var i = 0; i < this.template.events.length; i++)
           this.resource.on(this.template.events[i].name, this._makeHandler(this.template.events[i].name));
        
    }

    _makeHandler(name)
    {
        var self = this;
        return function(args)
        {
            if (args instanceof CustomResourceEvent)
                self._emitResourceEvent(args.issuer, args.receivers, name, args.params);
            else
                self._emitResourceEvent(null, null, name, args);
        };
    }


    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Ruling.</returns>
    applicable(session, action, member, inquirer)
    {
        for (var i = 0; i < this.managers.length; i++)
        {
            var r = this.managers.item(i).applicable(this.resource, session, action, member, inquirer);
            if (r != Ruling.DontCare)
                return r;
        }
        
        return Ruling.DontCare;
    }


    
    removeAttributes(attributes = null)
    {
        if (attributes == null)
            this.attributes.clear();
        else
        {
            for(var i = 0; i < attributes.length; i++)
                this.attributes.remove(attributes[i]);
        }

        return true;
    }

    getAttributes(attributes = null)
    {
        var st = new Structure();

        if (attributes == null)
        {
            attributes = this.attributes.keys.slice(0);
            attributes.push("managers");
        }

        for(var i = 0; i < attributes.length; i++)
        {
            var attr = attributes[i];

            if (attr == "name")
                st["name"] = this.name;

            else if (attr == "managers")
            {
                var mngrs = new StructureArray();

                for(var j = 0; j < this.managers.length; j++)
                {
                    var manager = this.managers.item(j);
                    var sm = new Structure();
                    sm["type"] = manager.constructor.name;
                    sm["settings"] = manager.settings;
                    
                    mngrs.push(sm);
                }

                st["managers"] = mngrs;

            }
            else
                st[attr] = this.attributes.item(attr);
        }

        return st;
    }


    setAttributes(attributes, clearAttributes = false)
    {        

    if (clearAttributes)
        this.attributes.clear();


        for (var attr in attributes)
            if (attr == "name")
                this.name = attributes[attr];
            else if (attr == "managers")
            {
                this.managers.clear();

                var mngrs = attributes[attr];

                for (var i = 0; i < mngrs.length; i++)
                {
                    var mngr = mngrs[i];
                    
                    var type = window[mngr];
                    
                        var settings = mngr["settings"];

                        var manager = new (Function.prototype.bind.apply(type));

                        if (manager instanceof IPermissionsManager)
                        {
                            manager.initialize(settings, this.resource);
                            this.managers.add(manager);
                        }
                        else
                            return false;
                }
            }
            else
            {
                this.attributes.set(attr, attributes[attr]);
            }
            

        return true;
    }
}  
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
 * Created by Ahmed Zamil on 26/08/2017.
 */

"use strict";  

class NotModified
{

}  
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
 * Created by Ahmed Zamil on 27/08/2017.
 */

"use strict";  

const PropertyPermission = {
    Read: 1,
    Write: 2,
    ReadWrite: 3
};

class PropertyTemplate extends MemberTemplate
{

    constructor()
    {
        super();
        this.type = MemberType.Property;
    }

    compose()
    {
        var name = super.compose();
        var rt = new BinaryList();
        var pv = (this.permission >> 1) | (this.recordable ? 1 : 0);

        if (this.writeExpansion != null && this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            var wexp = DC.stringToBytes(this.writeExpansion);
            return rt.addUint8(0x38 | pv)
                .addUint32(wexp.length)
                .addUint8Array(wexp)
                .addUint32(rexp.length)
                .addUint8Array(rexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else if (this.writeExpansion != null)
        {
            var wexp = DC.stringToBytes(this.writeExpansion);
            return rt.addUint8(0x30 | pv)
                .addUint32(wexp.length)
                .addUint8Array(wexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else if (this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            return rt.addUint8(0x28 | pv)
                .addUint32(rexp.length)
                .addUint8Array(rexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(0x20 | pv)
                .addUint32(name.length)
                .addUint8Array(name).toArray();
    }
}
  
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

class ResourceTemplate {

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

    constructor(type) {


        this.properties = [];
        this.events = [];
        this.functions = [];
        this.members = [];

        if (type === undefined)
            return;

        var template = type.getTemplate();

        // set guid
        this.className = template.namespace + "." + type.prototype.constructor.name;

        this.classId = SHA256.compute(DC.stringToBytes(this.className)).getGuid(0);

        //byte currentIndex = 0;

        for (var i = 0; i < template.properties.length; i++) {
            var pt = new PropertyTemplate();
            pt.name = template.properties[i].name;
            pt.index = i;
            pt.readExpansion = template.properties[i].read;
            pt.writeExpansion = template.properties[i].write;
            pt.recordable = template.properties[i].recordable;
            this.properties.push(pt);
        }

        for (var i = 0; i < template.events.length; i++) {
            var et = new EventTemplate();
            et.name = template.events[i].name;
            et.index = i;
            et.expansion = template.events[i].expansion;
            this.events.push(et);
        }

        for (var i = 0; i < template.functions.length; i++) {
            var ft = new FunctionTemplate();
            ft.name = template.functions[i].name;
            ft.index = i;
            ft.isVoid = template.functions[i].void;
            ft.expansion = template.functions[i].expansion;
            this.functions.push(ft);
        }


        // append signals
        for (var i = 0; i < this.events.length; i++)
            this.members.push(this.events[i]);
        // append slots
        for (var i = 0; i < this.functions.length; i++)
            this.members.push(this.functions[i]);
        // append properties
        for (var i = 0; i < this.properties.length; i++)
            this.members.push(this.properties[i]);

        // bake it binarily
        var b = new BinaryList();
        var cls = DC.stringToBytes(this.className);
        b.addUint8Array(this.classId.value)
            .addUint8(cls.length).addUint8Array(cls).addUint32(template.version).addUint16(this.members.length);

        for (var i = 0; i < this.functions.length; i++)
            b.addUint8Array(this.functions[i].compose());

        for (var i = 0; i < this.properties.length; i++)
            b.addUint8Array(this.properties[i].compose());

        for (var i = 0; i < this.events.length; i++)
            b.addUint8Array(this.events[i].compose());

        this.content = b.toArray();
    }

    static getFunctionParameters(func)
    {
        var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    static parse(data, offset = 0, contentLength = -1) {

        if (contentLength == -1)
            contentLength = data.length;

        var ends = offset + contentLength;

        var oOffset = offset;

        // start parsing...

        var od = new ResourceTemplate();
        od.content = data.clip(offset, contentLength);

        od.classId = data.getGuid(offset);
        offset += 16;
        od.className = data.getString(offset + 1, data.getUint8(offset));
        offset += data.getUint8(offset) + 1;

        od.version = data.getInt32(offset);
        offset += 4;

        var methodsCount = data.getUint16(offset);
        offset += 2;

        var functionIndex = 0;
        var propertyIndex = 0;
        var eventIndex = 0;

        for (var i = 0; i < methodsCount; i++) {
            var type = data.getUint8(offset) >> 5;

            if (type == 0) // function
            {
                var ft = new FunctionTemplate();
                ft.index = functionIndex++;
                var expansion = ((data.getUint8(offset) & 0x10) == 0x10);
                ft.isVoid = ((data.getUint8(offset++) & 0x08) == 0x08);
                ft.name = data.getString(offset + 1, data.getUint8(offset));// Encoding.ASCII.getString(data, (int)offset + 1, data.getUint8(offset));
                offset += data.getUint8(offset) + 1;

                if (expansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    ft.expansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.functions.push(ft);
            }
            else if (type == 1)    // property
            {

                var pt = new PropertyTemplate();
                pt.index = propertyIndex++;
                var readExpansion = ((data.getUint8(offset) & 0x8) == 0x8);
                var writeExpansion = ((data.getUint8(offset) & 0x10) == 0x10);
                pt.recordable = ((data.getUint8(offset) & 1) == 1);
                pt.permission = ((data.getUint8(offset++) >> 1) & 0x3);
                pt.name = data.getString(offset + 1, data.getUint8(offset));// Encoding.ASCII.getString(data, (int)offset + 1, data.getUint8(offset));
                offset += data.getUint8(offset) + 1;

                if (readExpansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    pt.readExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                if (writeExpansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    pt.writeExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.properties.push(pt);
            }
            else if (type == 2) // Event
            {
                var et = new EventTemplate();
                et.index = eventIndex++;
                var expansion = ((data.getUint8(offset++) & 0x10) == 0x10);

                et.name = data.getString(offset + 1, data.getUint8(offset));// Encoding.ASCII.getString(data, (int)offset + 1, (int)data.getUint8(offset));
                offset += data.getUint8(offset) + 1;

                if (expansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    et.expansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.events.push(et);

            }
        }

        // append signals
        for (var i = 0; i < od.events.length; i++)
            od.members.push(od.events[i]);
        // append slots
        for (var i = 0; i < od.functions.length; i++)
            od.members.push(od.functions[i]);
        // append properties
        for (var i = 0; i < od.properties.length; i++)
            od.members.push(od.properties[i]);


        return od;
    }
}  
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
 * Created by Ahmed Zamil on 02/09/2017.
 */

"use strict";  

class SendList extends BinaryList
{
    constructor(connection, doneReply)
    {
        super();
        this.connection = connection;
        this.reply = doneReply;
    }

    done()
    {
        this.connection.send(this.toArray());
        return this.reply;
    }
}  
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
  
exports.printMsg = function() {
  console.log("Esiur 1.1");
}

module.exports = { Warehouse, DistributedConnection};


var WebSocket = require('ws')
 
