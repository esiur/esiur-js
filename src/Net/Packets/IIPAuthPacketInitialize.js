// IIPAuthPacketInitialize
export default {
    NoAuthNoAuth: 0x0, //0b00000000,
    NoAuthCredentials: 0x4, //0b00000100,
    NoAuthToken: 0x8, //0b00001000,
    NoAuthCertificate: 0xC, //0b00001100,
    CredentialsNoAuth: 0x10, //0b00010000,
    CredentialsCredentials: 0x14, //0b00010100,
    CredentialsToken: 0x18, //0b00011000,
    CredentialsCertificate: 0x1c, //0b00011100,
    TokenNoAuth: 0x20, //0b00100000,
    TokenCredentials: 0x24, //0b00100100,
    TokenToken: 0x28, //0b00101000,
    TokenCertificate: 0x2c, //0b00101100,
    CertificateNoAuth: 0x30, //0b00110000,
    CertificateCredentials: 0x34,// 0b00110100,
    CertificateToken: 0x38, //0b00111000,
    CertificateCertificate: 0x3c, //0b00111100,
}