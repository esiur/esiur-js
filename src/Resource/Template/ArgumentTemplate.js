import DC from "../../Data/DataConverter.js";
import BinaryList from "../../Data/BinaryList.js";
import TemplateDataType from "./TemplateDataType.js";

export default class ArgumentTemplate
{
    static parse(data, offset)
    {
        var cs = data[offset++];
        var name = data.getString(offset, cs);
        offset += cs;
        var {size, value} = TemplateDataType.parse(data, offset);

        return {size: cs + 1 + size, value: new ArgumentTemplate(name, value)};
    }

    constructor(name, type){
        this.name = name;
        this.type = type;
    }

    compose()
    {
        var name = DC.stringToBytes(this.name);

        return new BinaryList()
                .addUint8(name.length)
                .addUint8Array(name)
                .addUint8Array(this.type.compose())
                .toArray();
    }
}
