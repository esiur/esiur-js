// IIPAuthPacketAction

export default 
{
    AuthenticateHash: 0x80,
    AuthenticatePublicHash: 0x81,
    AuthenticatePrivateHash: 0x82,
    AuthenticatePublicPrivateHash: 0x83,

    AuthenticatePrivateHashCert: 0x88,
    AuthenticatePublicPrivateHashCert: 0x89,

    IAuthPlain: 0x90,
    IAuthHashed: 0x91,
    IAuthEncrypted: 0x92,


    EstablishNewSession: 0x98,
    EstablishResumeSession: 0x99,

    EncryptKeyExchange: 0xA0,

    RegisterEndToEndKey: 0xA8,
    RegisterHomomorphic: 0xA9,
};