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
