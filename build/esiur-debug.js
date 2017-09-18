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
                if (this._events[event][i].apply(this, args))
                    return true;

        return false;
    }

    on(event, fn)
    {
        event = event.toLowerCase();
        // add
        if (!this._events[event])
            this._events[event] = [];
        this._events[event].push(fn);
        return this;
    }

    off(event, fn)
    {
        event = event.toLocaleString();
        if (this._events[event])
        {
            if (fn)
            {
                var index = this._events[event].indexOf(fn);
                if (index > -1)
                this._events[event].splice(index, 1);
            }
            else
            {
                this._events[event] = [];
            }
        }
    }
}  
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t,i){i?(p[0]=p[16]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function i(i,r,e){var n="string"!=typeof i;if(n){if(null===i||void 0===i)throw h;i.constructor===s.ArrayBuffer&&(i=new Uint8Array(i))}var o=i.length;if(n){if("number"!=typeof o||!Array.isArray(i)&&(!a||!ArrayBuffer.isView(i)))throw h}else{for(var f,u=[],o=i.length,c=0,y=0;o>y;++y)f=i.charCodeAt(y),128>f?u[c++]=f:2048>f?(u[c++]=192|f>>6,u[c++]=128|63&f):55296>f||f>=57344?(u[c++]=224|f>>12,u[c++]=128|f>>6&63,u[c++]=128|63&f):(f=65536+((1023&f)<<10|1023&i.charCodeAt(++y)),u[c++]=240|f>>18,u[c++]=128|f>>12&63,u[c++]=128|f>>6&63,u[c++]=128|63&f);i=u}i.length>64&&(i=new t(r,!0).update(i).array());for(var p=[],l=[],y=0;64>y;++y){var d=i[y]||0;p[y]=92^d,l[y]=54^d}t.call(this,r,e),this.update(l),this.oKeyPad=p,this.inner=!0,this.sharedMemory=e}var h="input is invalid type",s="object"==typeof window?window:{},r=!s.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;r&&(s=global);var e=!s.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,n="function"==typeof define&&define.amd,a="undefined"!=typeof ArrayBuffer,o="0123456789abcdef".split(""),f=[-2147483648,8388608,32768,128],u=[24,16,8,0],c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],y=["hex","array","digest","arrayBuffer"],p=[];(s.JS_SHA256_NO_NODE_JS||!Array.isArray)&&(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var l=function(i,h){return function(s){return new t(h,!0).update(s)[i]()}},d=function(i){var h=l("hex",i);r&&(h=v(h,i)),h.create=function(){return new t(i)},h.update=function(t){return h.create().update(t)};for(var s=0;s<y.length;++s){var e=y[s];h[e]=l(e,i)}return h},v=function(t,i){var s=require("crypto"),r=require("buffer").Buffer,e=i?"sha224":"sha256",n=function(i){if("string"==typeof i)return s.createHash(e).update(i,"utf8").digest("hex");if(null===i||void 0===i)throw h;return i.constructor===ArrayBuffer&&(i=new Uint8Array(i)),Array.isArray(i)||ArrayBuffer.isView(i)||i.constructor===r?s.createHash(e).update(new r(i)).digest("hex"):t(i)};return n},A=function(t,h){return function(s,r){return new i(s,h,!0).update(r)[t]()}},w=function(t){var h=A("hex",t);h.create=function(h){return new i(h,t)},h.update=function(t,i){return h.create(t).update(i)};for(var s=0;s<y.length;++s){var r=y[s];h[r]=A(r,t)}return h};t.prototype.update=function(t){if(!this.finalized){var i="string"!=typeof t;if(i){if(null===t||void 0===t)throw h;t.constructor===s.ArrayBuffer&&(t=new Uint8Array(t))}var r=t.length;if(!(!i||"number"==typeof r&&(Array.isArray(t)||a&&ArrayBuffer.isView(t))))throw h;for(var e,n,o=0,f=this.blocks;r>o;){if(this.hashed&&(this.hashed=!1,f[0]=this.block,f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0),i)for(n=this.start;r>o&&64>n;++o)f[n>>2]|=t[o]<<u[3&n++];else for(n=this.start;r>o&&64>n;++o)e=t.charCodeAt(o),128>e?f[n>>2]|=e<<u[3&n++]:2048>e?(f[n>>2]|=(192|e>>6)<<u[3&n++],f[n>>2]|=(128|63&e)<<u[3&n++]):55296>e||e>=57344?(f[n>>2]|=(224|e>>12)<<u[3&n++],f[n>>2]|=(128|e>>6&63)<<u[3&n++],f[n>>2]|=(128|63&e)<<u[3&n++]):(e=65536+((1023&e)<<10|1023&t.charCodeAt(++o)),f[n>>2]|=(240|e>>18)<<u[3&n++],f[n>>2]|=(128|e>>12&63)<<u[3&n++],f[n>>2]|=(128|e>>6&63)<<u[3&n++],f[n>>2]|=(128|63&e)<<u[3&n++]);this.lastByteIndex=n,this.bytes+=n-this.start,n>=64?(this.block=f[16],this.start=n-64,this.hash(),this.hashed=!0):this.start=n}return this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>2]|=f[3&i],this.block=t[16],i>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,i,h,s,r,e,n,a,o,f,u,y=this.h0,p=this.h1,l=this.h2,d=this.h3,v=this.h4,A=this.h5,w=this.h6,b=this.h7,g=this.blocks;for(t=16;64>t;++t)r=g[t-15],i=(r>>>7|r<<25)^(r>>>18|r<<14)^r>>>3,r=g[t-2],h=(r>>>17|r<<15)^(r>>>19|r<<13)^r>>>10,g[t]=g[t-16]+i+g[t-7]+h<<0;for(u=p&l,t=0;64>t;t+=4)this.first?(this.is224?(a=300032,r=g[0]-1413257819,b=r-150054599<<0,d=r+24177077<<0):(a=704751109,r=g[0]-210244248,b=r-1521486534<<0,d=r+143694565<<0),this.first=!1):(i=(y>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),h=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7),a=y&p,s=a^y&l^u,n=v&A^~v&w,r=b+h+n+c[t]+g[t],e=i+s,b=d+r<<0,d=r+e<<0),i=(d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10),h=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7),o=d&y,s=o^d&p^a,n=b&v^~b&A,r=w+h+n+c[t+1]+g[t+1],e=i+s,w=l+r<<0,l=r+e<<0,i=(l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),h=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7),f=l&d,s=f^l&y^o,n=w&b^~w&v,r=A+h+n+c[t+2]+g[t+2],e=i+s,A=p+r<<0,p=r+e<<0,i=(p>>>2|p<<30)^(p>>>13|p<<19)^(p>>>22|p<<10),h=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7),u=p&l,s=u^p&d^f,n=A&w^~A&b,r=v+h+n+c[t+3]+g[t+3],e=i+s,v=y+r<<0,y=r+e<<0;this.h0=this.h0+y<<0,this.h1=this.h1+p<<0,this.h2=this.h2+l<<0,this.h3=this.h3+d<<0,this.h4=this.h4+v<<0,this.h5=this.h5+A<<0,this.h6=this.h6+w<<0,this.h7=this.h7+b<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,s=this.h3,r=this.h4,e=this.h5,n=this.h6,a=this.h7,f=o[t>>28&15]+o[t>>24&15]+o[t>>20&15]+o[t>>16&15]+o[t>>12&15]+o[t>>8&15]+o[t>>4&15]+o[15&t]+o[i>>28&15]+o[i>>24&15]+o[i>>20&15]+o[i>>16&15]+o[i>>12&15]+o[i>>8&15]+o[i>>4&15]+o[15&i]+o[h>>28&15]+o[h>>24&15]+o[h>>20&15]+o[h>>16&15]+o[h>>12&15]+o[h>>8&15]+o[h>>4&15]+o[15&h]+o[s>>28&15]+o[s>>24&15]+o[s>>20&15]+o[s>>16&15]+o[s>>12&15]+o[s>>8&15]+o[s>>4&15]+o[15&s]+o[r>>28&15]+o[r>>24&15]+o[r>>20&15]+o[r>>16&15]+o[r>>12&15]+o[r>>8&15]+o[r>>4&15]+o[15&r]+o[e>>28&15]+o[e>>24&15]+o[e>>20&15]+o[e>>16&15]+o[e>>12&15]+o[e>>8&15]+o[e>>4&15]+o[15&e]+o[n>>28&15]+o[n>>24&15]+o[n>>20&15]+o[n>>16&15]+o[n>>12&15]+o[n>>8&15]+o[n>>4&15]+o[15&n];return this.is224||(f+=o[a>>28&15]+o[a>>24&15]+o[a>>20&15]+o[a>>16&15]+o[a>>12&15]+o[a>>8&15]+o[a>>4&15]+o[15&a]),f},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,s=this.h3,r=this.h4,e=this.h5,n=this.h6,a=this.h7,o=[t>>24&255,t>>16&255,t>>8&255,255&t,i>>24&255,i>>16&255,i>>8&255,255&i,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,r>>24&255,r>>16&255,r>>8&255,255&r,e>>24&255,e>>16&255,e>>8&255,255&e,n>>24&255,n>>16&255,n>>8&255,255&n];return this.is224||o.push(a>>24&255,a>>16&255,a>>8&255,255&a),o},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},i.prototype=new t,i.prototype.finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var i=this.array();t.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(i),t.prototype.finalize.call(this)}};var b=d();b.sha256=b,b.sha224=d(!0),b.sha256.hmac=w(),b.sha224.hmac=w(!0),e?module.exports=b:(s.sha256=b.sha256,s.sha224=b.sha224,n&&define(function(){return b}))}();  
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

class AutoList extends IEventHandler
{
    constructor()
    {
        super();
        this.list = [];
    }

    add(value)
    {
        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed);

        this.list.push(value);

        this._emit("add", value);
    }

    set(index, value)
    {
        if (index >= this.list.length || index < 0)
            return;

        if (value instanceof IDestructible)
            value.on("destroy", this._item_destroyed);

        if (this.list[index] instanceof IDestructible)
            this.list[index].off("destroy", this._item_destroyed);

        this.list[index] = value;
    }

    remove(value)
    {
        this.removeAt(this.list.indexOf(value));
    }

    contains(value)
    {
        return this.list.indexOf(value) > -1;
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

var ResourceTrigger =
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

class IStore extends IResource {
    get(path) {

    }

    retrieve(iid) {

    }

    put(resource) {

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

class Structure
{
    getKeys() {
        var rt = [];
        for (var i in this)
            if (!(this[i] instanceof Function))
                rt.push(i);

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
 * Created by Ahmed Zamil on 06/09/2017.
 */

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


var MemberType = {
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
class AsyncReply
{
    then(callback)
    {
        this.callbacks.push(callback);
        if (this.ready)
            callback(this.result, this);
    }

    trigger(result)
    {
        this.result = result;
        this.ready = true;

        for(var i = 0; i < this.callbacks.length; i++)
            this.callbacks[i](result, this);
    }

    constructor(result)
    {
        this.callbacks = [];

        if (result) {
            this.result = result;
            this.ready = true;
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

        for(var i = 0; i < this.results.length; i++)
            this.replies[i].then(function(r, reply){
                self.results[self.replies.indexOf(reply)] = r;
                self.count++;
                if (self.count == self.results.length)
                    self.trigger(self.results);
            });
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

var BL = function(){
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

var ResourceComparisonResult =
    {
        Null: 0,
        Distributed: 1,
        DistributedSameClass: 2,
        Local: 3,
        Same: 4
    };

var StructureComparisonResult =
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


    static parseStructure(data, offset, contentLength, connection, keylist = null, typelist = null, keys = null, types = null) {
        var reply = new AsyncReply();
        var bag = new AsyncBag();


        if (keylist == null)
            keylist = [];
        if (typelist == null)
            typelist = [];

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
                contentLength -= rt.size + 1;
                offset += rt.size + 1;
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
                rt.addUint32(value.instance.id);
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
                rt.addUint8(key.length).addString(key).addUint8Array(DC.compose(value[i], connection));
            }
        }
        else {
            for (var i = 0; i < keys.length; i++)
                rt.addUint8Array(DC.compose(value[keys[i]], connection, includeTypes));
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
        if (resource.connection == connection)
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

        if (next == previous)
            return ResourceComparisonResult.Same;

        if (Codec.isLocalResource(next, connection))
            return ResourceComparisonResult.Local;

        if (previous == null)
            return ResourceComparisonResult.Distributed;

        if (previous.instance.template.classId.valueOf() == next.instance.template.classId.valueOf())
            return ResourceComparisonResult.DistributedSameClass;

        return ResourceComparisonResult.Distributed;
    }

 static composeResourceArray(resources, connection, prependLength = false) {
     if (resources == null || resources.length == 0 || !(resources instanceof ResourceArray))
         return new DC(0);

     var rt = new BinaryList();
     var comparsion = Codec.compareResource(null, resources[0], connection);

     rt.addUint8(comparsion);

     if (comparsion == ResourceComparisonResult.Local)
         rt.addUint32(resources[0].id);
     else if (comparsion == ResourceComparisonResult.Distributed) {
         rt.addUint8Array(resources[0].instance.template.classId.value);
         rt.addUint32(resources[0].instance.id);
     }

     for (var i = 1; i < resources.length; i++) {
         comparsion = Codec.compareResource(resources[i - 1], resources[i], connection);
         rt.addUint8(comparsion);
         if (comparsion == ResourceComparisonResult.Local)
             rt.addUint32(resources[0].id);
         else if (comparsion == ResourceComparisonResult.Distributed) {
             rt.addUint8Array(resources[0].instance.template.classId.value);
             rt.addUint32(resources[0].instance.id);
         }
         else if (comparsion == ResourceComparisonResult.DistributedSameClass) {
             rt.addUint32(resources[0].instance.id);
         }
     }

     if (prependLength)
         rt.addUint32(0, rt.length);

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

var UNIX_EPOCH = 621355968000000000;
var TWO_PWR_32 = (1 << 16) * (1 << 16);

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
        return new Date(Math.round((ticks-DCStatic.UNIX_EPOCH)/10000));
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
        return new Guid(this.getUint8Array(offset, 16));

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
DataType = {
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

var AuthenticationType =
{
    Host: 0,
    CoHost: 1,
    Client: 2,
    Alien: 3
};

class DistributedConnection extends IStore {

    send(data) {
        this.socket.send(data.buffer);
    }

    sendParams() {
        return new SendList(this);
    }

    constructor(url, domain, username, password, checkInterval = 30, connectionTimeout = 600, revivingTime = 120) {

        super();

        //Instance.Name = Global.GenerateCode(12);
        this.hostType = AuthenticationType.Client;
        this.domain = domain;
        this.localUsername = username;
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
        this.templates = {};
        this.requests = {};
        this.pathRequests = {};
        this.templateRequests = {};
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

        this.localNonce = new Uint8Array(32);
        window.crypto.getRandomValues(this.localNonce);

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

            //console.log(msg);

            this.networkBuffer.writeAll(msg.data);

            self.lastAction = new Date();

            while (this.networkBuffer.available > 0 && !this.networkBuffer.protected)
                self.receive(this.networkBuffer);


        };
    }


    receive(data) {
        var msg = data.read();
        var offset = 0;
        var ends = msg.length;
        var packet = this.packet;
        var authPacket = this.authPacket;

        //console.log("Data");

        while (offset < ends) {

            if (this.ready) {
                var rt = packet.parse(msg, offset, ends);
                if (rt <= 0) {
                    data.holdFor(msg, offset, ends - offset, -rt);
                    return;
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
                            case IIPPacketEvent.EventOccured:
                                this.IIPEventEventOccured(packet.resourceId, packet.methodIndex, packet.content);
                                break;
                        }
                    }
                    else if (packet.command == IIPPacketCommand.Request) {
                        switch (packet.action) {
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
                                this.IIPRequestCreateResource(packet.callbackId, packet.className);
                                break;
                            case IIPPacketAction.DeleteResource:
                                this.IIPRequestDeleteResource(packet.callbackId, packet.resourceId);
                                break;
                            case IIPPacketAction.TemplateFromClassName:
                                this.IIPRequestTemplateFromClassName(packet.callbackId, packet.className);
                                break;
                            case IIPPacketAction.TemplateFromClassId:
                                this.IIPRequestTemplateFromClassId(packet.callbackId, packet.classId);
                                break;
                            case IIPPacketAction.TemplateFromResourceLink:
                                this.IIPRequestTemplateFromResourceLink(packet.callbackId, packet.resourceLink);
                                break;
                            case IIPPacketAction.TemplateFromResourceId:
                                this.IIPRequestTemplateFromResourceId(packet.callbackId, packet.resourceId);
                                break;
                            case IIPPacketAction.ResourceIdFromResourceLink:
                                this.IIPRequestResourceIdFromResourceLink(packet.callbackId, packet.resourceLink);
                                break;
                            case IIPPacketAction.InvokeFunction:
                                this.IIPRequestInvokeFunction(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
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
                                this.IIPReply(packet.callbackId, packet.classId, packet.resourceId);
                                break;
                            case IIPPacketAction.DeleteResource:
                                this.IIPReply(packet.callbackId);
                                break;
                            case IIPPacketAction.TemplateFromClassName:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromClassId:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromResourceLink:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromResourceId:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.ResourceIdFromResourceLink:
                                this.IIPReply(packet.callbackId, packet.classId, packet.resourceId, packet.resourceAge);
                                break;
                            case IIPPacketAction.InvokeFunction:
                                this.IIPReply(packet.callbackId, packet.content);
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
                        }

                    }

                }
            }

            else {
                var rt = authPacket.parse(msg, offset, ends);


                if (rt <= 0) {
                    data.holdAllFor(msg, ends - rt);
                    return;
                }
                else {
                    offset += rt;

                    if (this.hostType == AuthenticationType.Host) {
                        if (authPacket.command == IIPAuthPacketCommand.Declare) {
                            if (authPacket.remoteMethod == IIPAuthPacketMethod.credentials
                                && authPacket.localMethod == IIPAuthPacketMethod.None) {
                                this.remoteUsername = authPacket.remoteUsername;
                                this.remoteNonce = authPacket.remoteNonce;
                                this.domain = authPacket.domain;
                                this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
                            }
                        }
                        else if (authPacket.command == IIPAuthPacketCommand.Action) {
                            if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                                var remoteHash = authPacket.hash;

                                this.server.membership.getPassword(this.remoteUsername, this.domain).then(function (pw) {
                                    if (pw != null) {

                                        var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));


                                        if (hash.sequenceEqual(remoteHash)) {
                                            // send our hash
                                            var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
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
                                    this.sessionId = new DC(32);
                                    window.crypto.getRandomValues(this.sessionId);

                                    this.sendParams().addUint8(0x28).addUint8Array(this.sessionId).done();
                                    this.ready = true;
                                    this._emit("ready", this);
                                }
                            }
                        }
                    }
                    else if (this.hostType == AuthenticationType.Client) {
                        if (authPacket.command == IIPAuthPacketCommand.Acknowledge) {
                            this.remoteNonce = authPacket.remoteNonce;

                            // send our hash

                            var localHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.localPassword)
                                .addUint8Array(this.localNonce)
                                .addUint8Array(this.remoteNonce).toArray()));
                            this.sendParams().addUint8(0).addUint8Array(localHash).done();
                        }
                        else if (authPacket.command == IIPAuthPacketCommand.Action) {
                            if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                                // check if the server knows my password
                                var remoteHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.remoteNonce)
                                    .addUint8Array(this.localNonce)
                                    .addUint8Array(this.localPassword).toArray()
                                ));

                                if (remoteHash.sequenceEqual(authPacket.hash)) {
                                    // send establish request
                                    this.sendParams().addUint8(0x20).addUint16(0).done();
                                }
                                else {
                                    this.sendParams().addUint8(0xc0).addUint32(1).addUint16(5).addString("Error").done();
                                }
                            }
                            else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished) {
                                this.sessionId = authPacket.sessionId;
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
        }

    }

    close()
    {
        this.socket.close();
    }

    trigger(trigger) {
        return true;
    }

    put(resource) {
        this.resources[parseInt(resource.instance.name)] = resource;
        return true;
    }


    // Protocol Implementation

    sendRequest(action, binaryList) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.sendParams().addUint8(0x40 | action).addUint32(this.callbackCounter).addRange(binaryList).done();
        this.requests[this.callbackCounter] = reply;
        return reply;
    }

    IIPReply(callbackId) {
        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.requests[callbackId];
        delete this.requests[callbackId];
        req.trigger(results);
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
        if (this.resources[resourceId]) {
            // push to the queue to gaurantee serialization
            var reply = new AsyncReply();
            this.queue.add(reply);

            var r = this.resources[resourceId];
            Codec.parse(content, 0, this).then(function (args) {
                var pt = r._p.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    reply.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    this.queue.remove(reply);
                }
            });
        }
    }


    IIPEventEventOccured(resourceId, index, content) {
        if (this.resources[resourceId]) {
            // push to the queue to guarantee serialization
            var reply = new AsyncReply();
            var r = this.resources[resourceId];

            this.queue.add(reply);

            Codec.parseVarArray(content, 0, content.length, this).then(function (args) {
                var et = r._p.template.getEventTemplateByIndex(index);
                if (et != null) {
                    reply.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    this.queue.remove(reply);
                }
            });
        }
    }

    IIPRequestAttachResource(callback, resourceId) {

        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.on("ResourceEventOccured", this.instance_eventOccured);
                r.instance.on("ResourceModified", this.instance_propertyModified);
                r.instance.on("ResourceDestroyed", this.instance_resourceDestroyed);
                // reply ok

                var link = DC.stringToBytes(r.instance.link);

                sl.addUint8(0x80)
                    .addUint32(callback)
                    .addUint8Array(r.instance.template.classId.value)
                    .addUint32(r.instance.age)
                    .addUint16(link.length)
                    .addUint8Array(link)
                    .addUint8Array(Codec.composeVarArray(r.instance.serialize(), this, true))
                    .done();
            }
            else {
                // reply failed
                //SendParams(0x80, r.Instance.Id, r.Instance.Age, r.Instance.Serialize(false, this));
            }
        });
    }

    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (res != null) {
                r.instance.on("ResourceEventOccured", this.instance_eventOccured);
                r.instance.on("ResourceModified", this.instance_propertyModified);
                r.instance.on("ResourceDestroyed", this.instance_resourceDestroyed);
                // reply ok
                sl.addUint8(0x81)
                    .addUint32(callback)
                    .addUint32(r.instance.age)
                    .addUint8Array(Codec.composeVarArray(r.instance.serialize(), this, true))
                    .done();
            }
            else {
                // reply failed
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.off("ResourceEventOccured", this.instance_eventOccured);
                r.instance.off("ResourceModified", this.instance_propertyModified);
                r.instance.off("ResourceDestroyed", this.instance_resourceDestroyed);

                // reply ok
                sl.addUint8(0x82).addUint32(callback).done();
            }
            else {
                // reply failed
            }
        });
    }

    IIPRequestCreateResource(callback, className) {
        // not implemented
    }

    IIPRequestDeleteResource(callback, resourceId) {
        // not implemented
    }

    IIPRequestTemplateFromClassName(callback, className) {
        var sl = this.sendParams();

        Warehouse.getTemplateByClassName(className).then(function (t) {
            if (t != null)
                sl.addUint8(0x88).addUint32(callback).addUint8Array(t.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var sl = this.sendParams();

        Warehouse.getTemplateByClassId(classId).then(function (t) {
            if (t != null)
                sl.addUint8(0x89)
                    .addUint32(callback)
                    .addUint32(t.content.length)
                    .addUint8Array(t.content)
                    .done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromResourceLink(callback, resourceLink) {
        var sl = this.sendParams();

        Warehouse.getTemplate(resourceLink).then(function (t) {
            if (t != null)
                sl.addUint8(0x8a).addUint32(callback).addUint8Array(t.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null)
                sl.addUint8(0x8b).addUint32(callback).addUint8Array(r.instance.template.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestResourceIdFromResourceLink(callback, resourceLink) {

        var sl = this.sendParams();

        Warehouse.get(resourceLink).then(function (r) {
            if (r != null)
                sl.addUint8(0x8c)
                    .addUint32(callback)
                    .addUint8Array(r.instance.template.classId.value)
                    .addUint32(r.instance.id)
                    .addUint32(r.instance.age).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestInvokeFunction(callback, resourceId, index, content) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseVarArray(content, 0, content.length, sl.connection).then(function (args) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invoke(index, args);
                            if (rt != null) {
                                rt.then(function (res) {
                                    sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(res, sl.connection)).done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];
                            if (fi instanceof Function) {
                                args.push(sl.connection);

                                var rt = fi.apply(r, args);


                                if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(res, sl.connection)).done();
                                    });
                                }
                                else {
                                    sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(rt, sl.connection)).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r instanceof DistributedResource) {
                        sl.addUint8(0x91).addUint32(callback).addUint8Array(Codec.compose(r._get(pt.index), sl.connection)).done();
                    }
                    else {
                        var pv = r[pt.name];
                        sl.addUint8(0x91).addUint32(callback).addUint8Array(Codec.compose(pv, sl.connection)).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r.instance.getAge(index) > age) {
                        var pv = r[pt.name];
                        sl.addUint8(0x92).addUint32(callback).addUint8Array(Codec.compose(pv, sl.connection)).done();
                    }
                    else {
                        sl.addUint8(0x92).addUint32(callback).addUint8(DataType.NotModified).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {


                var pt = r.instance.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    Codec.parse(content, 0, this).then(function (value) {
                        if (r instanceof DistributedResource) {
                            // propagation
                            r._set(index, value).then(function (x) {
                                sl.addUint8(0x93).addUint32(callback).done();
                            });
                        }
                        else {
                            r[pt.name] = value;
                            sl.addUint8(0x93).addUint32(callback).done();
                        }

                    });
                }
                else {
                    // property not found
                }
            }
            else {
                // resource not found
            }
        });
    }


    getTemplate(classId) {
        if (this.templates[classId])
            return new AsyncReply(this.templates[classId]);
        else if (this.templateRequests[classId])
            return this.templateRequests[classId];

        var reply = new AsyncReply();
        this.templateRequests[classId] = reply;

        var self = this;

        this.sendRequest(IIPPacketAction.TemplateFromClassId, BL().addUint8Array(classId.value)).then(function (rt) {
            delete self.templateRequests[classId];
            self.templates[rt[0].classId] = rt[0];
            reply.trigger(rt[0]);
        });

        return reply;
    }

// IStore interface
    get(path) {
        if (this.pathRequests[path])
            return this.pathRequests[path];

        var reply = new AsyncReply();
        this.pathRequests[path] = reply;

        var bl = new BinaryList();
        bl.addString(path);
        bl.addUint16(bl.length, 0);

        var self = this;

        this.sendRequest(IIPPacketAction.ResourceIdFromResourceLink, bl).then(function (rt) {
            delete self.pathRequests[path];

            self.fetch(rt[1]).then(function (r) {
                reply.trigger(r);
            });
        });


        return reply;
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
            return this.resourceRequests[id];
        }
        else if (this.resourceRequests[id])
            return this.resourceRequests[id];
        else if (this.resources[id])
            return new AsyncReply(this.resources[id]);

        var reply = new AsyncReply();

        var self = this;

        this.sendRequest(IIPPacketAction.AttachResource, BL().addUint32(id)).then(function (rt) {
                self.getTemplate(rt[0]).then(function (tmp) {

                var dr = new DistributedResource(self, tmp, id, rt[1], rt[2]);
                Warehouse.put(dr, id.toString(), self);

                Codec.parseVarArray(rt[3], 0, rt[3].length, self).then(function (ar) {
                    dr._attached(ar);
                    delete self.resourceRequests[id];
                    reply.trigger(dr);
                });
            });
        });

        return reply;
    }

    instance_resourceDestroyed(resource) {
        // compose the packet
        this.sendParams().addUint8(0x1).addUint32(resource.instance.id).done();
    }

    instance_propertyModified(resource, name, newValue, oldValue) {
        var pt = resource.instance.template.getPropertyTemplateByName(name);

        if (pt == null)
            return;

        // compose the packet
        if (newValue instanceof Function)
            sendParams().addUint8(0x10)
                .addUint32(resource.instance.id)
                .addUint8(pt.index)
                .addUint8Array(Codec.compose(newValue(this), this))
                .done();
        else
            sendParams().addUint8(0x10)
                .addUint32(resource.instance.id)
                .addUint8(pt.index)
                .addUint8Array(Codec.compose(newValue, this))
                .done();
    }

    instance_eventOccured(resource, name, receivers, args) {
        var et = resource.instance.template.getEventTemplateByName(name);

        if (et == null)
            return;

        if (receivers != null)
            if (receivers.indexOf(this.remoteUsername) < 0)
                return;

        var clientArgs = [];//new object[args.Length];
        for (var i = 0; i < args.Length; i++)
            if (args[i] instanceof Function)
                clientArgs[i] = args[i](this);
            else
                clientArgs[i] = args[i];


        // compose the packet
        sendParams().addUint8(0x11)
            .addUint32(resource.instance.id)
            .addUint8(et.index)
            .addUint8Array(Codec.composeVarArray(args, this, true))
            .done();

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


class DistributedResource extends IResource
{
    destroy()
    {
        this.destroyed = true;
        this._emit("destroy");
    }



    constructor(connection, template, instanceId, age)
    {
        super();

        this._p = {
            isAttached: false,
            connection: connection,
            instanceId: instanceId,
            age: age,
            template: template
        };
    }

    _attached(properties)
    {

        if (this._isAttached)
            return false;
        else
        {
            this._p.properties = properties;
            this._p.ages = new Uint32Array(properties.length);
            //this.events = [];//new [this.template.events.length];
            this._p.isAttached = true;

            var self = this;

            var makeFunc = function(index)
            {
              return function () {
                  return self._invoke(index, arguments);
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

            for(var i = 0; i < this._p.template.functions.length; i++)
            {
                var ft = this._p.template.functions[i];
                this[ft.name] = makeFunc(ft.index);
            }

            for(var i = 0; i < this._p.template.properties.length; i++)
            {
                var pt = this._p.template.properties[i];

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
        var et = this._p.template.getEventTemplateByIndex(index);
        this._emit(et.name, args);
        this.instance.emitResourceEvent(et.name, null, args);
    }

    _invoke(index, args) {
        if (this.destroyed)
            throw new Exception("Trying to access destroyed object");

        if (index >= this._p.template.functions.length)
            throw new Exception("Function index is incorrect");

        var reply = new AsyncReply();

        var parameters = Codec.composeVarArray(args, this._p.connection, true);

        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.InvokeFunction,
                BL().addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters))
            .then(function (res) {
                Codec.parse(res[0], 0, self._p.connection).then(function (rt) {
                reply.trigger(rt);
            });
        });


        return reply;

    }


    _get(index)
    {
        if (index >= this._p.properties.length)
            return null;
        return this._p.properties[index];
    }



    _updatePropertyByIndex(index, value)
    {
        var pt = this._p.template.getPropertyTemplateByIndex(index);
        this._p.properties[index] = value;
        this.instance.modified(pt.name, value);
    }

    _set(index, value)
    {
        if (index >= this._p.properties.length)
            return null;

        var reply = new AsyncReply();

        var parameters = Codec.compose(value, this._p.connection);
        var self = this;

        this._p.connection.sendRequest(IIPPacketAction.SetProperty,
            BL().addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters))
            .then(function(res)
        {
            // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
            //Update(index, value);
            reply.trigger(null);
        // nothing to do here
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
var DistributedResourceQueueItemType =
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

class FunctionTemplate extends MemberTemplate {
    compose() {
        var name = super.compose();
        var rt = new BinaryList();

        if (this.expansion != null) {
            var exp = DC.stringToBytes(this.expansion);

            return rt.addUint8(0x10 | (IsVoid ? 0x8 : 0x0))
                .addUint32(exp.length).addUint8Array(exp)
                .addUint8(name.length).addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(IsVoid ? 0x8 : 0x0).addUint8(name.length).addUint8Array(name).toArray();
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
var IIPAuthPacketCommand =
{
    Action: 0,
    Declare: 1,
    Acknowledge: 2,
    Error: 3
};

var IIPAuthPacketAction =
{
    // Authenticate
    AuthenticateHash: 0,
    NewConnection: 0x20,
    ResumeConnection: 0x21,
    ConnectionEstablished: 0x28
};


var IIPAuthPacketMethod =
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


var IIPPacketCommand =
{
    Event: 0,
    Request: 1,
    Reply: 2,
    Error: 3
};

var IIPPacketEvent =
{
    // Event Manage
    ResourceReassigned : 0,
    ResourceDestroyed: 1,

    // Event Invoke
    PropertyUpdated : 0x10,
    EventOccured: 0x11
};

var IIPPacketAction =
{
    // Request Manage
    AttachResource: 0,
    ReattachResource: 1,
    DetachResource: 2,
    CreateResource: 3,
    DeleteResource: 4,

    // Request Inquire
    TemplateFromClassName: 0x8,
    TemplateFromClassId: 0x9,
    TemplateFromResourceLink: 0xA,
    TemplateFromResourceId: 0xB,
    ResourceIdFromResourceLink: 0xC,

    // Request Invoke
    InvokeFunction: 0x10,
    GetProperty: 0x11,
    GetPropertyIfModified: 0x12,
    SetProperty: 0x13
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

        this.command =  (data.getUint8(offset) >> 6);

        if (this.command == IIPPacketCommand.Event)
        {
            this.event =  (data.getUint8(offset++) & 0x3f);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.resourceId = data.getUint32(offset);
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
            else if (this.event == IIPPacketEvent.EventOccured)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

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
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint32(offset);
                offset += 4;
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
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var cl = data.getUint8(offset++);

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.className = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.DeleteResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

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
            else if (this.action == IIPPacketAction.TemplateFromResourceLink)
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
            else if (this.action == IIPPacketAction.TemplateFromResourceId)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ResourceIdFromResourceLink)
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
            else if (this.action == IIPPacketAction.InvokeFunction)
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

                this.resourceAge = data.getUint32(offset);
                offset += 4;

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

                this.resourceAge = data.getUint32(offset);
                offset += 4;

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

                this.classId = data.GetGuid(offset);
                offset += 16;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.TemplateFromClassName
                || this.action == IIPPacketAction.TemplateFromClassId
                || this.action == IIPPacketAction.TemplateFromResourceLink
                || this.action == IIPPacketAction.TemplateFromResourceId)
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
            else if (this.action == IIPPacketAction.ResourceIdFromResourceLink)
            {
                if (this.notEnough(offset, ends, 24))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.InvokeFunction
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
        else if (this.command == IIPPacketCommand.Error)
        {
            // Error
            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);

            if (this.notEnough(offset, ends, 1))
                return -this.dataLengthNeeded;

            this.errorCode = data.getUint8(offset++);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            var cl = data.getUint32(offset);
            offset += 4;

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
 * Created by Ahmed Zamil on 29/08/2017.
 */
class Instance extends IEventHandler
{

    getAge(index)
    {
        if (index < this.ages.Count)
            return this.ages[index];
        else
            return 0;
    }


    deserialize(properties)
    {
        for(var i = 0; i < this.template.properties.length; i++)
            this.resource[this.template.properties[i].name] = properties[i];
        return true;
    }

    serialize()
    {
        var props = [];

        for (var i = 0; i < this.template.properties.length; i++)
            props.push(this.resource[this.template.properties[i].name]);

        return props;
    }

    isStorable()
    {
        return resource instanceof Storable;
    }


    modified(propertyName = null, newValue = null, oldValue = null)
    {
        if (propertyName == null)
            propertyName = modified.caller.name;

        if (newValue == null)
        {
            var val = {};
            if (this.getPropertyValue(propertyName, val))
              super._emit("ResourceModified", this.resource, propertyName, val.value, oldValue);
        }
        else
            super._emit("ResourceModified", this.resource, propertyName, newValue, oldValue);
    }

    emitResourceEvent(name, receivers, args)
    {
        super._emit("ResourceEventOccured", this.resource, name, receivers, args);
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



    constructor(id, name, resource, store)
    {
        super();

        this.store = store;
        this.resource = resource;
        this.id = id;
        this.name = name;

        this.children = new AutoList();
        this.parents = new AutoList();

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

        this.template = Warehouse.getTemplateByType(this.resource.constructor);

        // set ages
        this.ages = new Uint32Array(this.template.properties.length);


        // connect events
        var makeHandler = function(name, receivers, args)
        {
            return new function(receivers, args)
            {
                self.emitResourceEvent(name, receivers, args);
            };
        };

        for (var i = 0; i < this.template.events.length; i++)
           this.resource.on(this.template.events[i].name, makeHandler(this.template.events[i].name));

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
 * Created by Ahmed Zamil on 26/08/2017.
 */

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

var PropertyPermission = {
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

        if (this.writeExpansion != null && this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            var wexp = DC.stringToBytes(this.writeExpansion);
            return rt.addUint8(0x38 | this.permission)
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
            return rt.addUint8(0x30 | this.permission)
                .addUint32(wexp.length)
                .addUint8Array(wexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else if (this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            return rt.addUint8(0x28 | this.permission)
                .addUint32(rexp.length)
                .addUint8Array(rexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(0x20 | this.permission)
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

class ResourceTemplate {

    getMemberTemplate(member) {
        if (member instanceof MethodInfo)
            return this.getFunctionTemplate(member.name);
        else if (member instanceof EventInfo)
            return this.getEventTemplate(member.name);
        else if (member instanceof PropertyInfo)
            return this.getPropertyTemplate(member.name);
        else
            return null;
    }

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

        this.classId = (new DC(sha256.arrayBuffer(this.className))).getGuid(0);

        //byte currentIndex = 0;

        for (var i = 0; i < template.properties.length; i++) {
            var pt = new PropertyTemplate();
            pt.name = template.properties[i].name;
            pt.index = i;
            pt.readExpansion = template.properties[i].read;
            pt.writeExpansion = template.properties[i].write;
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

class SendList extends BinaryList
{
    constructor(connection)
    {
        super();
        this.connection = connection;
    }

    done()
    {
        this.connection.send(this.toArray());
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
var Warehouse = {

    stores: [],
    resources: {},
    resourceCounter: 0,
    templates: {},

    new(type, name, store = null, parent = null)
    {
        var res = type();
        Warehouse.put(res, name, store, parent);
        return res;
    },

get: function(id)
    {
        if (Warehouse.resources[id])
            return new AsyncReply(Warehouse.resources[id]);
        else
            return null;
    },

    put: function(resource, name, store, parent){
        resource.instance = new Instance(Warehouse.resourceCounter++, name, resource, store);
        //resource.instance.children.on("add", Warehouse._onChildrenAdd).on("remove", Warehouse._onChildrenRemove);
        //resource.instance.parents.on("add", Warehouse._onParentsAdd).on("remove", Warehouse._onParentsRemove);

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
            Warehouse.stores.push(resource);
        else
            store.put(resource);

        Warehouse.resources[resource.instance.id] = resource;
    },

    _onParentsRemove: function(value)
    {
        if (value.instance.children.contains(value))
            value.instance.children.remove(value);
    },

    _onParentsAdd: function(value)
    {
        if (!value.instance.children.contains(value))
            value.instance.children.add(value);
    },

    _onChildrenRemove: function(value)
    {
        if (value.instance.parents.contains(value))
            value.instance.parents.remove(value);
    },

    _onChildrenAdd: function(value)
    {
        if (!value.instance.parents.contains(value))
            value.instance.parents.add(value);
    },

    putTemplate: function(template)
    {
        if (Warehouse.templates[template.classId])
            Warehouse.templates[template.classId] = template;
    },

    getTemplateByType: function(type)
    {
        // loaded ?
        for (var t in Warehouse.templates)
            if (Warehouse.templates[t].className == typeof(type))
                return t;

        var template = new ResourceTemplate(type);
        Warehouse.templates[template.classId] = template;

        return template;
    },

    getTemplateByClassId: function(classId)
    {
        if (Warehouse.templates[classId])
            return new AsyncReply(Warehouse.templates[classId]);
         return null;
    },

    getTemplateByClassName: function(className)
    {
        for(var t in Warehouse.templates)
        if (Warehouse.templates[t].className == className)
            return new AsyncReply(t);

        return null;
    }
};  
