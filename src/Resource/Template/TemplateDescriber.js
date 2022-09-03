import Void from "../../Data/Void.js";

export class TemplateDescriber {
    properties;
    events;
    functions;
    constants;
  
    namespace;
    version;
    parent;
    annotation;
  
    classId;
    className;

    constructor(namespace, members, parent, version = 0, annotation = null, classId = null, className = null){

        if (namespace == null)
          throw new Error("Namespace name can't be null.");

        if (members == null)
          throw new Error("Members name can't be null.");

        this.namespace = namespace;
        this.parent = parent; 
        this.properties = members.filter(x=>x instanceof Prop);;
        this.functions  = members.filter(x=>x instanceof Func);
        this.events = members.filter(x=>x instanceof Evt);;
        this.constants = members.filter(x=>x instanceof Const);;
        this.version = version;
        this.annotation = annotation;
        this.classId = classId;
        this.className = className;
    }
  }
  
  export class Prop {
    name;
    type;

    readAnnotation;
    writeAnnotation;
    recordable;

    constructor(name, type = Object, readAnnotation = null, writeAnnotation = null, recordable = false)
    {
        if (name == null)
          throw new Error("Property name can't be null.");
        this.name = name;
        this.type = type ?? Object;
        this.readAnnotation = readAnnotation;
        this.writeAnnotation = writeAnnotation;
        this.recordable = recordable;
    }
  }
  
  export class Evt {
    name;
    listenable;
    type;
    annotation;

    constructor(name, type = Object, listenable = false, annotation = null)
    {
        if (name == null)
          throw new Error("Event name can't be null.");
        this.name = name;
        this.type = type ?? Object;
        this.listenable = listenable;
        this.annotation = annotation;
    }
  }
  
  export class Const {
    name;
    type;
    annotation;
    value;
  
    constructor(name, type = String, value, annotation)
    {
        if (name == null)
          throw new Error("Constant name can't be null.");

        this.name = name;
        this.type = type ?? String;
        this.value = value ?? "";
        this.annotation = annotation;
    }
  }
  
  export class Func {
    name;
    returnType;
    args;

    annotation;
    isStatic;

    constructor(name, returnType = Void, args = [], annotation = null, isStatic = false)
    {
        if (name == null)
          throw new Error("Function name can't be null.");

        this.name = name;
        this.returnType = returnType ?? Void;
        this.args = args ?? [];
        this.annotation = annotation;
        this.isStatic = isStatic;
    }
  }
  
  export class Arg {
    name;
    type;
    optional;

    constructor(name, type = Object, optional = false)
    {
        if (name == null)
          throw new Error("Argument name can't be null.");

        this.name = name;
        this.type = type ?? Object;
        this.optional = optional;
    }
  }
  