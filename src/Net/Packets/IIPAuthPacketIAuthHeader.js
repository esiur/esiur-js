
import { UInt8 } from "../../Data/ExtendedTypes.js";

// IIPAuthPacketIAuthHeader
export default
{
    Reference: new UInt8(0),
    Destination: new UInt8(1),
    Clue: new UInt8(2),
    RequiredFormat: new UInt8(3),
    ContentFormat: new UInt8(4),
    Content: new UInt8(5),
    Trials: new UInt8(6),
    Issue: new UInt8(7),
    Expire: new UInt8(8)
}