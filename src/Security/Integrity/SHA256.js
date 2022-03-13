
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

import { DC, BL, Endian } from '../../Data/DC.js';

export default class SHA256
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

        var data = BL().addUint8Array(msg).addUint8Array(paddingBytes).addUint64(L, Endian.Big).toDC();

        
        
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
            for(let i = 0; i < 16; i++)
                w[i] = data.getUint32(chunk + (i * 4), Endian.Big);

            //for(var i = 16; i < 64; i++)
              //  w[i] = 0;

            // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
            //    for i from 16 to 63
            //        s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
            //        s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
            //        w[i] := w[i-16] + s0 + w[i-7] + s1
            
            for (let i = 16; i < 64; i++)
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
            for (let i = 0; i < 64; i++)
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

        var results = BL();
        for(let i = 0; i < 8; i++)
            results.addUint32(hash[i], Endian.Big);
        

        return results.toDC();
     }
}