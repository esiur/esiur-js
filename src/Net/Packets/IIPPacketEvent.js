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

export default IIPPacketEvent;