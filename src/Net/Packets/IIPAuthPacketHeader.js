import { UInt8 } from "../../Data/ExtendedTypes.js";

// IIPAuthPacketHeader
export default {
    Version: new UInt8(0),
    Domain: new UInt8(1),
    SupportedAuthentications: new UInt8(2),
    SupportedHashAlgorithms: new UInt8(3),
    SupportedCiphers: new UInt8(4),
    SupportedCompression: new UInt8(5),
    SupportedPersonalAuth: new UInt8(6),
    Nonce: new UInt8(7),
    Username: new UInt8(8),
    TokenIndex: new UInt8(9),
    CertificateId: new UInt8(10),
    CachedCertificates: new UInt8(11),
    CipherType: new UInt8(12),
    CipherKey: new UInt8(13),
    SoftwareIdentity: new UInt8(14),
    Referrer: new UInt8(15),
    Time: new UInt8(16),
    Certificate: new UInt8(17),
    IPv4: new UInt8(18)
}