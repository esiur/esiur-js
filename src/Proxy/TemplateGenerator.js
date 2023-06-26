
import { RepresentationTypeIdentifier } from '../Data/RepresentationType.js';
import TemplateType from '../Resource/Template/TemplateType.js';
import Warehouse from '../Resource/Warehouse.js';

export default class TemplateGenerator {
  
  static toLiteral(input) {
    if (input == null) return "null";

    let literal = "";

    literal += "\"";

    input.split('').forEach((c) => {
      switch (c) {
        case '"':
          literal += "\\\"";
          break;
        case '\\':
          literal += "\\\\";
          break;
        case '\0':
          literal += "\\0";
          break;
        case '\b':
          literal += "\\b";
          break;
        case '\f':
          literal += "\\f";
          break;
        case '\n':
          literal += "\\n";
          break;
        case '\r':
          literal += "\\r";
          break;
        case '\t':
          literal += "\\t";
          break;
        case '\v':
          literal += "\\v";
          break;
        default:
          literal += c;
          break;
      }
    });

    literal += "\"";
    return literal;
  }

  static generateRecord(template, templates) {
    let className = template.className.split('.').slice(-1)[0];
    let rt = "";

    let parentName;
    let dependencies = [];

    if (template.parentId != null) {
      let parentClassName = templates
          .find((x) =>
              (x.classId.valueOf() == template.parentId.valueOf()) &&
              (x.type == TemplateType.Record))
          .className;
      parentName = this._translateClassName(parentClassName);
      dependencies.push(parentClassName);
      rt += `export default class ${className} extends ${parentName} {\r\n`;
    } else {
      rt += `export default class ${className} extends Esiur.Data.IRecord { \r\n`;
    }

    template.properties.forEach((p) => {
      if (p.inherited) return;
      let ptTypeName = this.getDecoratedTypeName(template, p.valueType, templates);
      rt += `\t${ptTypeName} ${p.name};\r\n\r\n`;
    });

    rt += "\r\n";

    // add template
    var descProps = template.properties 
        .map((p) => {
      var ptTypeName = this.getTypeName(template, p.valueType, templates, dependencies);
      return `\t\t\tnew Esiur.Resource.Template.Prop('${p.name}', ${ptTypeName}, ${this.toLiteral(p.readAnnotation)}, ${this.toLiteral(p.writeAnnotation)})`;
    });


    let cls = template.className.split('.');
    let namespace = cls.slice(0, cls.length - 1).join('.');

    rt += `\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('${namespace}', [\r\n${descProps.join(',\r\n')}], \r\n\t\t\t${parentName}, ${template.version}, ${this.toLiteral(template.annotation)}, Esiur.Data.Guid.parse('${template.classId.toString()}'), '${className}');\r\n\t}`;

    rt += "\r\n}";


    rt = this._getDependenciesImports(dependencies) + rt;
    return rt;
  }

  static _translateClassName(className) {
    var cls = className.split('.');
    return cls.join('_');
  }

  static getDecoratedTypeName(forTemplate, representationType, templates){
    return `/* ${this.getTypeName(forTemplate, representationType, templates)} */`;
  }

  static getTypeName(forTemplate, representationType, templates, dependencies) {
    let name;

    if (representationType.identifier == RepresentationTypeIdentifier.TypedResource) {
      if (representationType.guid.valueOf() == forTemplate.classId.valueOf())
        name = forTemplate.className.split('.').slice(-1)[0];
      else {
            let className = templates
            .find((x) =>
                x.classId.valueOf() == representationType.guid.valueOf() &&
                (x.type == TemplateType.Resource))
            .className;
            if (!dependencies?.includes(className)) dependencies?.push(className);
            name = this._translateClassName(className);
        }
    } else if (representationType.identifier == RepresentationTypeIdentifier.TypedRecord) {
      if (representationType.guid.valueOf() == forTemplate.classId.valueOf())
        name = forTemplate.className.split('.').slice(-1)[0];
      else {
          let className = templates
            .find((x) =>
                x.classId.valueOf() == representationType.guid.valueOf() &&
                x.type == TemplateType.Record)
            .className;
            if (!dependencies?.includes(className)) dependencies?.push(className);
            name = this._translateClassName(className);
        }
    } else if (representationType.identifier == RepresentationTypeIdentifier.Enum) {
     if (representationType.guid.valueOf() == forTemplate.classId.valueOf())
      name = forTemplate.className.split('.').slice(-1)[0];
    else {
        let className = templates
          .find((x) =>
              x.classId.valueOf() == representationType.guid.valueOf() &&
              x.type == TemplateType.Enum)
          .className;
          if (!dependencies?.includes(className)) dependencies?.push(className);
          name = this._translateClassName(className);
      }
     } else if (representationType.identifier == RepresentationTypeIdentifier.TypedList)
      name = "Esiur.Data.TypedList.of(" + this.getTypeName(forTemplate, representationType.subTypes[0], templates, dependencies) + ")";
    else if (representationType.identifier ==
        RepresentationTypeIdentifier.TypedMap)
      name = "Esiur.Data.TypedMap.of(" +
          this.getTypeName(forTemplate, representationType.subTypes[0], templates, dependencies) +
          "," +
          this.getTypeName(forTemplate, representationType.subTypes[1], templates, dependencies) +
          ")";
    else if (representationType.identifier ==
            RepresentationTypeIdentifier.Tuple2 ||
        representationType.identifier == RepresentationTypeIdentifier.Tuple3 ||
        representationType.identifier == RepresentationTypeIdentifier.Tuple4 ||
        representationType.identifier == RepresentationTypeIdentifier.Tuple5 ||
        representationType.identifier == RepresentationTypeIdentifier.Tuple6 ||
        representationType.identifier == RepresentationTypeIdentifier.Tuple7)
      name = "Esiur.Data.Tuple.of(" + representationType.subTypes.map( x => this.getTypeName(forTemplate, x, templates, dependencies)).join(',') + ")";
    else {
      switch (representationType.identifier) {
        case RepresentationTypeIdentifier.Dynamic:
          name = "Object";
          break;
        case RepresentationTypeIdentifier.Bool:
          name = "Boolean";
          break;
        case RepresentationTypeIdentifier.Char:
          name = "String";
          break;
        case RepresentationTypeIdentifier.DateTime:
          name = "Date";
          break;
        case RepresentationTypeIdentifier.Decimal:
          name = "Esiur.Data.Float128";
          break;
        case RepresentationTypeIdentifier.Float32:
          name = "Esiur.Data.Float32";
          break;
        case RepresentationTypeIdentifier.Float64:
          name = "Esiur.Data.Float64";
          break;
        case RepresentationTypeIdentifier.Int16:
          name = "Esiur.Data.Int16";
          break;
        case RepresentationTypeIdentifier.Int32:
          name = "Esiur.Data.Int32";
          break;
        case RepresentationTypeIdentifier.Int64:
          name = "Esiur.Data.Int64";
          break;
        case RepresentationTypeIdentifier.Int8:
          name = "Esiur.Data.Int8";
          break;
        case RepresentationTypeIdentifier.String:
          name = "String";
          break;
        case RepresentationTypeIdentifier.Map:
          name = "Map";
          break;
        case RepresentationTypeIdentifier.UInt16:
          name = "Esiur.Data.UInt16";
          break;
        case RepresentationTypeIdentifier.UInt32:
          name = "Esiur.Data.UInt32";
          break;
        case RepresentationTypeIdentifier.UInt64:
          name = "Esiur.Data.UInt64";
          break;
        case RepresentationTypeIdentifier.UInt8:
          name = "Esiur.Data.UInt8";
          break;
        case RepresentationTypeIdentifier.List:
          name = "Esiur.Data.List";
          break;
        case RepresentationTypeIdentifier.Resource:
          name = "Esiur.Resource.IResource";
          break;
        case RepresentationTypeIdentifier.Record:
          name = "Esiur.Data.IRecord";
          break;
        default:
          name = "Object";
      }
    }

    return (representationType.nullable) ? `Esiur.Data.Nullable.of(${name})` : name;
  }

  static isNullOrEmpty(v) {
    return v == null || v == "";
  }

  static async getTemplate(url, dir, username,  password, asyncSetters = true, globalName = null)  {


      const fs = await import("fs");
       // var fs = require('fs');

        const _urlRegex = /^(?:([^\s|:]*):\/\/([^/]*)\/?(.*))/;
      //                  /^(?:([^\s|:]*):\/\/([^/]*)\/?)/;

        if (!_urlRegex.test(url)) 
         throw Error(`Invalid IIP URL '${url}'`);

      let path = url.split(_urlRegex);

      let con = await Warehouse.get(path[1] + "://" + path[2], username != null
              ? {"username": username, "password": password ?? ""}
              : null);

      if (con == null) 
        throw Error("Can't connect to server");

      if (dir == null || dir == "") 
        dir = path[2].replaceAll(":", "_");

      let templates = await con.getLinkTemplates(path[3]);

      // no longer needed
      Warehouse.remove(con);

      let dstDir = `${dir}`;


      if (!fs.existsSync(dstDir)){
        fs.mkdirSync(dstDir, { recursive: true });
      }

      var makeImports = (skipTemplate) => {
        let imports = "";
        // make import names
        templates.forEach((tmp) => {
          if (tmp != skipTemplate) {
            let cls = tmp.className.split('.');
            imports += `import ${cls.join('_')} from './${tmp.className}.g.js';\r\n`;
          }
        });

        imports += "\r\n\r\n";
        return imports;
      };

      
      // make sources
      templates.forEach(async (tmp) => {
        console.log(`Generating '${tmp.className}'.`);
        let filePath = `${dstDir}/${tmp.className}.g.js`;

        var source = "";
        if (tmp.type == TemplateType.Resource) {
          source = this.generateClass(tmp, templates, asyncSetters);
        } else if (tmp.type == TemplateType.Record) {
          source = this.generateRecord(tmp, templates);
        } else if (tmp.type == TemplateType.Enum) {
          source =  this.generateEnum(tmp, templates);
        }

        fs.writeFileSync(filePath, source);

        
      });

      // make module
      let modulePath = `${dstDir}/init.g.js`;
      let module = makeImports() + `\r\nlet module = {}; \r\n`;
      
      templates.forEach((tmp) => {
          let typeName = tmp.className.split('.').join('_');
          module += `Esiur.define(module, ${typeName}, '${tmp.className}');\r\n`;
          module += `new Esiur.Resource.Template.TypeTemplate(${typeName}, true);\r\n`
      });

      module += "\r\nexport default module;\r\n";

      if (globalName != null) {
        module += `\r\nif (typeof window !== 'undefined') window["${globalName}"] = module;\r\n`;
        module += `\r\nelse if (typeof global !== 'undefined') global["${globalName}"] = module;\r\n`;
      }

      fs.writeFileSync(modulePath, module);

      return dstDir;
 
  }


  static generateEnum(template, templates) {
    let className = template.className.split('.').slice(-1)[0];
    let rt = "";
    let dependencies = [];

    rt += `export default class ${className} extends Esiur.Data.IEnum {\r\n`;

    let options = [];
    template.constants.forEach((c) => {
      rt += `\tstatic ${c.name} = new ${className}(${c.index}, ${c.value}, '${c.name}');\r\n`;
      options.push(`this.${c.name}`);
    });

    rt += `\r\n\tstatic options = [${options.join(', ')}];\r\n`;

    // add template
    var descConsts = template.constants.map((p) => {
      var ctTypeName = this.getTypeName(template, p.valueType, templates, dependencies);
      return `\t\t\tnew Esiur.Resource.Template.Const('${p.name}', ${ctTypeName}, ${p.value}, ${this.toLiteral(p.annotation)})`;
    });


    let cls = template.className.split('.');
    let namespace = cls.slice(0, cls.length - 1).join('.');

    rt += `\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('${namespace}', [\r\n${descConsts.join(',\r\n')}], \r\n\t\t\tnull, ${template.version}, ${this.toLiteral(template.annotation)}, Esiur.Data.Guid.parse('${template.classId.toString()}'), '${className}');\r\n\t}`;

    rt += "\r\n}";


    rt = this._getDependenciesImports(dependencies) + rt;
    return rt;
  }

  static _getDependenciesImports(dependencies){
    let rt = "";
    dependencies.forEach(className => {
      rt += `import ${className.split('.').join('_')} from './${className}.g.js';\r\n`;
    });
    return rt + "\r\n";
  }

  static generateClass(template, templates, asyncSetters = true) {
    let className = template.className.split('.').slice(-1)[0];

    let parentName = null;

    let rt = "";
    let dependencies = [];

    if (template.parentId != null) {
      let parentClassName = templates
          .find((x) =>
              (x.classId.valueOf() == template.parentId.valueOf()) &&
              (x.type == TemplateType.Resource))
          .className;
      parentName = this._translateClassName(parentClassName);
      dependencies.push(parentClassName);
      rt += `export default class ${className} extends ${parentName} {\r\n`;
    } else {
      rt += `export default class ${className} extends Esiur.Net.IIP.DistributedResource {\r\n`;
    }

    // rt += `constructor() {`;

    // template.events.filter((e) => !e.inherited).forEach((e) => {
    //   rt += `on('${e.name}', (x) => _${e.name}Controller.add(x));`;
    // });

    // rt += "}\r\n";

    template.constants.forEach((c) => {
      let ctTypeName = this.getTypeName(template, c.valueType, templates, dependencies);
      rt += `\tstatic ${c.name} = new ${ctTypeName}(${c.value});\r\n`;
    });

    template.functions.filter((f) => !f.inherited).forEach((f) => {
      let rtTypeName = this.getDecoratedTypeName(template, f.returnType, templates);
      let positionalArgs = f.args.filter((x) => !x.optional);
      let optionalArgs = f.args.filter((x) => x.optional);

      if (f.isStatic) {
        //rt += `static AsyncReply<${rtTypeName}> ${f.name}(DistributedConnection connection`;
        rt += `\t${rtTypeName} \r\n\tstatic ${f.name}(connection`;

        if (positionalArgs.length > 0)
          rt += `, ${positionalArgs.map((a) => this.getDecoratedTypeName(template, a.type, templates) + " " + a.name).join(',')}`;

        if (optionalArgs.length > 0) {
          rt += `, [${optionalArgs.map((a) => this.getDecoratedTypeName(template, a.type.toNullable(), templates) + " " + a.name).join(',')}]`;
        }
      } else {
        //rt += `AsyncReply<${rtTypeName}> ${f.name}(`;
        rt += `\t${rtTypeName} \r\n\t${f.name}(`;

        if (positionalArgs.length > 0)
          rt += `${positionalArgs.map((a) => this.getDecoratedTypeName(template, a.type, templates) + " " + a.name).join(',')}`;

        if (optionalArgs.length > 0) {
          if (positionalArgs.length > 0) rt += ",";
          //rt += `[${optionalArgs.map((a) => this.getTypeName(template, a.type.toNullable(), templates) + " " + a.name).join(',')}]`;
          rt += `${optionalArgs.map((a) => this.getDecoratedTypeName(template, a.type.toNullable(), templates) + " " + a.name + " = null").join(',')}`;
        }
      }

      rt += ") {\r\n";
//                var argsMap = new (TypedMap.of(UInt8, Object));

      rt += "\t\tvar args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))();\r\n";
      rt += `${positionalArgs.map((e) => `\t\targs.set(new Esiur.Data.UInt8(${e.index.toString()}), ${e.name});`).join('\r\n')}\r\n`;

      optionalArgs.forEach((a) => {
        rt += `\t\tif (${a.name} != null) args.set(new Esiur.Data.UInt8(${a.index}), ${a.name});\r\n`;
      });

      //rt += `var rt = new AsyncReply<${rtTypeName}>();\r\n`;
      rt += `\t\tvar rt = new Esiur.Core.AsyncReply();\r\n`;
      if (f.isStatic) {
        rt += `\t\tconnection.staticCall(Esiur.Data.Guid.parse('${template.classId.toString()}'), ${f.index}, args)\r\n`;
      } else {
        rt += `\t\tthis._invoke(${f.index}, args)\r\n`;
      }
      rt += `\t\t\t.then((x) => rt.trigger(x))\r\n`;
      rt += `\t\t\t.error((x) => rt.triggerError(x))\r\n`;
      rt += `\t\t\t.chunk((x) => rt.triggerChunk(x));\r\n`;
      rt += `\t\treturn rt; \r\n\t}\r\n`;
    });

    template.properties.filter((p) => !p.inherited).forEach((p) => {
      let ptTypeName = this.getDecoratedTypeName(template, p.valueType, templates);
      rt += `\t${ptTypeName} get ${p.name}() { return this._get(${p.index}); }\r\n`;

      if (asyncSetters)
        rt += `\tset ${p.name}(${ptTypeName} value) { this._set(${p.index}, value); }\r\n`;
      else
        rt += `\tset ${p.name}(${ptTypeName} value) { this._setSync(${p.index}, value); }\r\n`;
    });

    // template.events.filter((e) => !e.inherited).forEach((e) => {
    //   var etTypeName = this.getTypeName(template, e.argumentType, templates);

    //   rt += `final _${e.name}Controller = StreamController<$etTypeName>();\r\n`;
    //   rt += `Stream<${etTypeName}> get ${e.name} { \r\n`;
    //   rt += `return _${e.name}Controller.stream;\r\n`;
    //   rt += "}";
    // });

    // add template
    var descProps = template.properties //.where((p) => !p.inherited)
        .map((p) => {
      var ptTypeName = this.getTypeName(template, p.valueType, templates, dependencies);
      return `\t\t\tnew Esiur.Resource.Template.Prop('${p.name}', ${ptTypeName}, ${this.toLiteral(p.readAnnotation)}, ${this.toLiteral(p.writeAnnotation)})`;
    });

    var descFuncs = template.functions
        .map((f) => {
      var ftTypeName = this.getTypeName(template, f.returnType, templates, dependencies);

      var args = f.args.map((a) => {
        var atTypeName = this.getTypeName(template, a.type, templates, dependencies);
        return `new Esiur.Resource.Template.Arg('${a.name}', ${atTypeName}, ${a.optional})`;
      }).join(', ');

      return `\t\t\tnew Esiur.Resource.Template.Func('${f.name}', ${ftTypeName}, [${args}], ${this.toLiteral(f.annotation)})`;
    });

    var descEvents = template.events
        //.where((e) => !e.inherited) @REVIEW
        .map((e) => {
      var etTypeName = this.getTypeName(template, e.argumentType, templates, dependencies);
      return `\t\t\tnew Esiur.Resource.Template.Evt('${e.name}', ${etTypeName}, ${e.listenable}, ${this.toLiteral(e.annotation)})`;
    });


    var descConsts = template.constants.map((p) => {
      var ctTypeName = this.getTypeName(template, p.valueType, templates, dependencies);
      return `\t\t\tnew Esiur.Resource.Template.Const('${p.name}', ${ctTypeName}, ${p.value}, ${this.toLiteral(p.annotation)})`;
    });

    

    let cls = template.className.split('.');
    let namespace = cls.slice(0, cls.length - 1).join('.');

    rt += `\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('${namespace}', [\r\n${[...descProps, ...descFuncs, ...descEvents, ...descConsts].join(',\r\n')}], \r\n\t\t\t${parentName}, ${template.version}, ${this.toLiteral(template.annotation)}, Esiur.Data.Guid.parse('${template.classId.toString()}'), '${className}');\r\n\t}`;

    rt += "\r\n}\r\n";
    
    rt = this._getDependenciesImports(dependencies) + rt;
    return rt;
  }
}
