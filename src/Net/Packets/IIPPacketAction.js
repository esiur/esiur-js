export default  // const IIPPacketAction =
{
    // Request Manage
    AttachResource: 0,
    ReattachResource: 1,
    DetachResource: 2,
    CreateResource: 3,
    DeleteResource: 4,
    AddChild: 5,
    RemoveChild: 6,
    RenameResource: 7,

    // Request Inquire
    TemplateFromClassName: 8,
    TemplateFromClassId: 9,
    TemplateFromResourceId: 10,
    QueryLink: 11,
    ResourceHistory: 12,
    ResourceChildren: 13,
    ResourceParents: 14,
    LinkTemplates: 15,

    // Request Invoke
    InvokeFunctionArrayArguments: 16,
    InvokeFunctionNamedArguments: 17,
    Listen: 18,
    Unlisten: 19,
    SetProperty: 20,

    // Request Attribute
    GetAllAttributes: 24,
    UpdateAllAttributes: 25,
    ClearAllAttributes: 26,
    GetAttributes: 27,
    UpdateAttributes: 28,
    ClearAttributes: 29
};
