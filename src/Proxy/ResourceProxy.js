import Warehouse from "../Resource/Warehouse.js";

export default class ResourceProxy {
    static cache = {};

    static getProxy(type) {
        let template = Warehouse.getTemplateByType(type);
        let className = type.prototype.constructor.name;
        let classUrl = "esiur://" + template.className.replace('.', '/');

        if (template.namespace != null) {
            className = template.namespace + "_" + className;
        }

        if (ResourceProxy.cache[className])
            return ResourceProxy.cache[className];

        var code = `return ( class E_${className} extends b { constructor() {super();} `;

        // generate class
        for (var i = 0; i < template.properties.length; i++) {
            let pt = template.properties[i];
            let desc = Object.getOwnPropertyDescriptor(type.prototype, pt.name);
            if (desc) {
                code += `\r\n  set ${pt.name}(v) { \r\n super.${pt.name} = v; \r\n if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); } \r\n get ${pt.name}() { \r\n return super.${pt.name};}`;
            }
            else {
                code += `\r\n  set ${pt.name}(v) { \r\n super._${pt.name} = v; \r\n if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); } \r\n get ${pt.name}() { \r\n return this._${pt.name};}`;
            }
        }

        debugger;

        var func = new Function("b", `//# sourceURL=${classUrl} \r\n ${code}});`);

        var proxyType = func.call(type /* this */, type);

        ResourceProxy.cache[className] = proxyType;

        return proxyType;

    }
}