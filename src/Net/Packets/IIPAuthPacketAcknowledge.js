// IIPAuthPacketAcknowledge

export default {
    NoAuthNoAuth: 0x40, // 0b01000000,
    NoAuthCredentials: 0x44, // 0b01000100,
    NoAuthToken: 0x48, //0b01001000,
    NoAuthCertificate: 0x4c, //0b01001100,
    CredentialsNoAuth: 0x50, //0b01010000,
    CredentialsCredentials: 0x54, //0b01010100,
    CredentialsToken: 0x58, //0b01011000,
    CredentialsCertificate: 0x5c, //0b01011100,
    TokenNoAuth: 0x60, //0b01100000,
    TokenCredentials: 0x64, //0b01100100,
    TokenToken: 0x68, //0b01101000,
    TokenCertificate: 0x6c, //0b01101100,
    CertificateNoAuth: 0x70, //0b01110000,
    CertificateCredentials: 0x74, //0b01110100,
    CertificateToken: 0x78, //0b01111000,
    CertificateCertificate: 0x7c, // 0b01111100,
}