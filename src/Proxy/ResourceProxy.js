import Warehouse from "../Resource/Warehouse.js";

export default class ResourceProxy
{
    static cache = {};

    static getProxy(type)
    {
        var template = Warehouse.getTemplateByType(type);
        var className = type.prototype.constructor.name;

        if (ResourceProxy.cache[className])
            return ResourceProxy.cache[className];

        var code = `return (class E_${className} extends b { constructor() {super();} `;

        // generate class
        for(var i = 0; i < template.properties.length; i++)
        {
            let pt = template.properties[i];
            let desc = Object.getOwnPropertyDescriptor(type.prototype, pt.name);
            if (desc)
            {
                code += `\r\n  set ${pt.name}(v) { \r\n if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); \r\n super.${pt.name} = v; } \r\n get ${pt.name}() { \r\n return super.${pt.name};}`;
            }
            else
            {
                code += `\r\n  set ${pt.name}(v) { \r\n if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); \r\n this._${pt.name} = v; } \r\n get ${pt.name}() { \r\n return this._${pt.name};}`;
            }
        }

        var func = new Function("b",  code + "})");

        var proxyType = func.call(type /* this */, type);

        ResourceProxy.cache[className] = proxyType;

        return proxyType;

    }
}