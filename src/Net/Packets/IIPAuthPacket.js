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
* LIABILITY, WHETHER IN ANthis.action OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";  


import AuthenticationMethod from "../../Security/Authority/AuthenticationMethod.js";
import IIPAuthPacketCommand from "./IIPAuthPacketCommand.js";
import IIPAuthPacketAction from "./IIPAuthPacketAction.js";
import IIPAuthPacketEvent from "./IIPAuthPacketEvent.js";
import TransmissionType from '../../Data/TransmissionType.js';

export default class IIPAuthPacket
{
    command = 0;
    initialization = 0;
    acknowledgement = 0;
    action = 0;
    event = 0;
  
    localMethod = AuthenticationMethod.None;
    remoteMethod = AuthenticationMethod.None;
  
    errorCode = 0;
    message = "";
  
    publicKeyAlgorithm = 0;
    hashAlgorithm = 0;
  
    certificate = null;
    challenge = null;
    asymetricEncryptionKey = null;
    sessionId = null;
    accountId = null;
  
    dataType = null;
  
    reference = 0;
  
    #dataLengthNeeded = 0;

    #notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.#dataLengthNeeded = needed - (ends - offset);
            return true;
        }
        else
            return false;
    }

    parse(data, offset, ends)
    {
        var oOffset = offset;

        if (this.#notEnough(offset, ends, 1))
            return -this.#dataLengthNeeded;

        this.command = data.getUint8(offset) >> 6;

        if (this.command == IIPAuthPacketCommand.Initialize) {

            this.localMethod = ((data[offset] >> 4) & 0x3);
            this.remoteMethod = ((data[offset] >> 2) & 0x3);
      
            this.initialization = (data[offset++] & 0xFC); // remove last two reserved LSBs
      
            if (this.#notEnough(offset, ends, 1)) 
                return -this.#dataLengthNeeded;
      
            let parsed = TransmissionType.parse(data, offset, ends);
      
            if (parsed.type == null) 
                return -parsed.size;
      
            this.dataType = parsed.type;
            offset += parsed.size;
      
          } else if (this.command == IIPAuthPacketCommand.Acknowledge) {
      
            this.localMethod = ((data[offset] >> 4) & 0x3);
            this.remoteMethod = ((data[offset] >> 2) & 0x3);
      
            this.acknowledgement = (data[offset++] & 0xFC); // remove last two reserved LSBs
      
            if (this.#notEnough(offset, ends, 1)) 
                return -this.#dataLengthNeeded;
      
            let parsed = TransmissionType.parse(data, offset, ends);
      
            if (parsed.type == null) 
                return -parsed.size;
      
            this.dataType = parsed.type;
            offset += parsed.size;
      
          } else if (this.command == IIPAuthPacketCommand.Action) {
      
            this.action = (data[offset++]);

            if (this.action == IIPAuthPacketAction.AuthenticateHash ||
               this.action == IIPAuthPacketAction.AuthenticatePublicHash ||
               this.action == IIPAuthPacketAction.AuthenticatePrivateHash ||
               this.action == IIPAuthPacketAction.AuthenticatePublicPrivateHash) {
      
              if (this.#notEnough(offset, ends, 3)) 
                  return -this.#dataLengthNeeded;
      
              this.hashAlgorithm = data[offset++];
      
              let hashLength = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, hashLength)) 
                  return -this.#dataLengthNeeded;
      
              this.challenge = data.clip(offset, hashLength);
              offset += hashLength;
      
            } else if (this.action == IIPAuthPacketAction.AuthenticatePrivateHashCert ||
               this.action == IIPAuthPacketAction.AuthenticatePublicPrivateHashCert) {
      
              if (this.#notEnough(offset, ends, 3)) 
                  return -this.#dataLengthNeeded;
      
              this.hashAlgorithm = data[offset++];
      
              let hashLength = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, hashLength)) 
                  return -this.#dataLengthNeeded;
      
              this.challenge = data.clip(offset, hashLength);
              offset += hashLength;
      
              if (this.#notEnough(offset, ends, 2)) 
                  return -this.#dataLengthNeeded;
      
              let certLength = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, certLength)) 
                  return -this.#dataLengthNeeded;
      
              this.certificate = data.clip(offset, certLength);
      
              offset += certLength;
      
            } else if (this.action == IIPAuthPacketAction.IAuthPlain) {
              
              if (this.#notEnough(offset, ends, 5)) 
                  return -this.#dataLengthNeeded;
      
              this.reference = data.getUint32(offset);
              offset += 4;
      
              var parsed = TransmissionType.parse(data, offset, ends);
      
              if (parsed.type == null) 
                  return -parsed.size;
      
              this.dataType = parsed.type;
              offset += parsed.size;
      
            } else if (this.action == IIPAuthPacketAction.IAuthHashed) {
      
              if (this.#notEnough(offset, ends, 7)) 
                  return -this.#dataLengthNeeded;
      
              this.reference = data.getUint32(offset);
              offset += 4;
      
              this.hashAlgorithm = data[offset++];
      
              let cl = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, cl)) 
                  return -this.#dataLengthNeeded;
      
              this.challenge = data.clip(offset, cl);
      
              offset += cl;
      
            } else if (this.action == IIPAuthPacketAction.IAuthEncrypted) {
      
              if (this.#notEnough(offset, ends, 7)) 
                  return -this.#dataLengthNeeded;
      
              this.reference = data.getUint32(offset);
              offset += 4;
      
              this.publicKeyAlgorithm = data[offset++];
      
              let cl = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, cl)) 
                  return -this.#dataLengthNeeded;
      
              this.challenge = data.clip(offset, cl);
      
              offset += cl;
      
            } else if (this.action == IIPAuthPacketAction.EstablishNewSession) {
              // Nothing here
            } else if (this.action == IIPAuthPacketAction.EstablishResumeSession) {
      
                if (this.#notEnough(offset, ends, 1)) 
                    return -this.#dataLengthNeeded;
        
                let sessionLength = data[offset++];
        
                if (this.#notEnough(offset, ends, sessionLength)) 
                    return -this.#dataLengthNeeded;
        
                this.sessionId = data.clip(offset, sessionLength);
        
                offset += sessionLength;
  
            } else if (this.action == IIPAuthPacketAction.EncryptKeyExchange) {
      
              if (this.#notEnough(offset, ends, 2)) 
                  return -this.#dataLengthNeeded;
      
              let keyLength = data.getUint16(offset);
      
              offset += 2;
      
              if (this.#notEnough(offset, ends, keyLength)) 
                  return -this.#dataLengthNeeded;
      
              this.asymetricEncryptionKey = data.clip(offset, keyLength);
      
              offset += keyLength;
      
            } else if (this.action == IIPAuthPacketAction.RegisterEndToEndKey ||
               this.action == IIPAuthPacketAction.RegisterHomomorphic) {
      
              if (this.#notEnough(offset, ends, 3)) 
                  return -this.#dataLengthNeeded;
      
              this.publicKeyAlgorithm = data[offset++];
      
              let keyLength = data.getUint16(offset);
      
              offset += 2;
      
              if (this.#notEnough(offset, ends, keyLength)) 
                  return -this.#dataLengthNeeded;
      
              this.asymetricEncryptionKey = data.clip(offset, keyLength);
      
              offset += keyLength;
      
            }
          } else if (this.command == IIPAuthPacketCommand.Event) {
      
            this.event = data[offset++];
      
            if (this.event == IIPAuthPacketEvent.ErrorTerminate ||
                this.event == IIPAuthPacketEvent.ErrorMustEncrypt ||
                this.event == IIPAuthPacketEvent.ErrorRetry) {
      
              if (this.#notEnough(offset, ends, 3)) 
                  return -this.#dataLengthNeeded;
      
              this.errorCode = data[offset++];
              let msgLength = data.getUint16(offset);
              offset += 2;
      
              if (this.#notEnough(offset, ends, msgLength)) 
                  return -this.#dataLengthNeeded;
      
              this.message = data.getString(offset, msgLength);
      
              offset += msgLength;
      
            } else if (this.event == IIPAuthPacketEvent.IndicationEstablished) {
      
              if (this.#notEnough(offset, ends, 2)) 
                  return -this.#dataLengthNeeded;
      
              let sessionLength = data[offset++];
      
              if (this.#notEnough(offset, ends, sessionLength)) 
                  return -this.#dataLengthNeeded;
      
              this.sessionId = data.clip(offset, sessionLength);
      
              offset += sessionLength;

              if (this.#notEnough(offset, ends, 1)) 
                return -this.#dataLengthNeeded;

              let accountLength = data[offset++];

              if (this.#notEnough(offset, ends, accountLength)) 
                return -this.#dataLengthNeeded;

              this.accountId = data.clip(offset, accountLength);
      
              offset += accountLength;

      
            } else if (this.event == IIPAuthPacketEvent.IAuthPlain ||
                this.event == IIPAuthPacketEvent.IAuthHashed ||
                this.event == IIPAuthPacketEvent.IAuthEncrypted) {
      
              if (this.#notEnough(offset, ends, 1)) 
                  return -this.#dataLengthNeeded;
      
              let parsed = TransmissionType.parse(data, offset, ends);
      
              if (parsed.type == null) 
                  return -parsed.size;
      
              this.dataType = parsed.type;
              offset += parsed.size;
            }
          }
      

        return offset - oOffset;

    }
}
