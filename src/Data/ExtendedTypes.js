class Num extends Number {
    
    toString() { return super.toString()}

    constructor(value)  {
        super(value);
    }
}

export class Int128 extends Num {}
export class Int64 extends Num { }
export class Int32 extends Num { }
export class Int16 extends Num { }
export class Int8 extends Num { }

export class UInt128 extends Num {}
export class UInt64 extends Num { }
export class UInt32 extends Num { }
export class UInt16 extends Num { }
export class UInt8 extends Num { }
  
export class Float32 extends Num{}
export class Float64 extends Num{}

export class Float128 extends Num{}

export class Char16 extends String {}
export class Char8 extends String {}