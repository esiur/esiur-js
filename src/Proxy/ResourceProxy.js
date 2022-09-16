import Warehouse from "../Resource/Warehouse.js";

export default class ResourceProxy {
    static cache = {};

    static getBase(type) {
        if (type.baseType != null)
            return type.baseType;
        
        return type;
    }

    static getProxy(type) {

        if (type.baseType != null)
            return type;

        let template = Warehouse.getTemplateByType(type);
        let className = template.className;
 

        if (ResourceProxy.cache[className])
            return ResourceProxy.cache[className];
            
        //let classUrl = "esiur://" + className.replace('.', '/');

        // var code = `return ( class E_${className.replace('.', '/')} extends b { constructor() {super();} `;

        // // generate class
        // for (var i = 0; i < template.properties.length; i++) {
        //     let pt = template.properties[i];
        //     let desc = Object.getOwnPropertyDescriptor(type.prototype, pt.name);
        //     if (desc) {
        //         code += `\r\n\tset ${pt.name}(v) {\r\n\t\tsuper.${pt.name} = v; \r\n\t\t if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); } \r\n\tget ${pt.name}() { \r\n\t\treturn super.${pt.name};}`;
        //     }
        //     else {
        //         code += `\r\n\tset ${pt.name}(v) {\r\n\t\tsuper._${pt.name} = v; \r\n\t\t if (this.instance) this.instance.emitModification(this.instance.template.properties[${i}], v); } \r\n\tget ${pt.name}() { \r\n\t\treturn this._${pt.name};}`;
        //     }
        // }

        // var func = new Function("b", `//# sourceURL=${classUrl} \r\n ${code}});`);
        // let proxyType = func.call(type /* this */, type);


        const makeClass = (name) => ({[name] : class extends type {}})[name];

        let proxyType = makeClass(className.replace('.', '_'));

        for (let i = 0; i < template.properties.length; i++) {
            let pt = template.properties[i];
            let desc = Object.getOwnPropertyDescriptor(type.prototype, pt.name);
            if (desc) {
                Object.defineProperty(proxyType.prototype, pt.name, {
                    get() {
                        // call parent getter
                        return desc.get?.apply(this);
                    },
                    set(value) {
                        // call parent setter
                        desc.set?.call(this, value);
                        this.instance?.emitModification(pt, value);
                    }
                });
            }
            else {
                Object.defineProperty(proxyType.prototype, pt.name, {
                    get() {
                        // get the backing field
                        return this["_" + pt.name];
                    },
                    set(value) {
                        // set the backing field
                        this["_" + pt.name] = value;
                        this.instance?.emitModification(pt, value);
                    }
                });
            }
        }

        ResourceProxy.cache[className] = proxyType;

        Object.defineProperty(proxyType, "baseType", {value: type});
        //Object.defineProperty(proxyType, "name", {value: className.replace('.', '_')});

        return proxyType;

    }
}