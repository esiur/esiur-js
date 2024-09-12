
export default class DistributedResourceAttachRequestInfo
{
    reply;
    requestSequence;

    constructor(reply, requestSequence){
        this.reply = reply;
        this.requestSequence = requestSequence;
    }
}