class Num extends Number {
    
    toString() { return super.toString()}

    static #cache = new WeakMap();

    constructor(value)  {
        super(value);
    }

}

export class Int128 extends Num { 

    static #cache = new Map();

    constructor(value) {

        if (Int128.#cache.has(value))
        {
            let v = Int128.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Int128.#cache.set(value, new WeakRef (this));

    }
}


export class Int64 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (Int64.#cache.has(value))
        {
            let v = Int64.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Int64.#cache.set(value, new WeakRef (this));

    }
}

export class Int32 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (Int32.#cache.has(value))
        {
            let v = Int32.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Int32.#cache.set(value, new WeakRef (this));

    }
}

export class Int16 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (Int16.#cache.has(value))
        {
            let v = Int16.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Int16.#cache.set(value, new WeakRef (this));

    }
}
export class Int8 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (Int8.#cache.has(value))
        {
            let v = Int8.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Int8.#cache.set(value, new WeakRef (this));

    }

}

export class UInt128 extends Num {
    static #cache = new Map();

    constructor(value) {

        if (UInt128.#cache.has(value))
        {
            let v = UInt128.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        UInt128.#cache.set(value, new WeakRef (this));

    }
}
export class UInt64 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (UInt64.#cache.has(value))
        {
            let v = UInt64.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        UInt64.#cache.set(value, new WeakRef (this));

    }

}
export class UInt32 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (UInt32.#cache.has(value))
        {
            let v = UInt32.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        UInt32.#cache.set(value, new WeakRef (this));

    }

}
export class UInt16 extends Num { 
    static #cache = new Map();

    constructor(value) {

        if (UInt16.#cache.has(value))
        {
            let v = UInt16.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        UInt16.#cache.set(value, new WeakRef (this));

    }

}

export class UInt8 extends Num { 

    static #cache = new Map();

    constructor(value) {

        if (UInt8.#cache.has(value))
        {
            let v = UInt8.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        UInt8.#cache.set(value, new WeakRef (this));

    }
}

export class Float32 extends Num{
    static #cache = new Map();

    constructor(value) {

        if (Float32.#cache.has(value))
        {
            let v = Float32.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Float32.#cache.set(value, new WeakRef (this));

    }
}
export class Float64 extends Num{
    static #cache = new Map();

    constructor(value) {

        if (Float64.#cache.has(value))
        {
            let v = Float64.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Float64.#cache.set(value, new WeakRef (this));

    }

}

export class Float128 extends Num{
    static #cache = new Map();

    constructor(value) {

        if (Float128.#cache.has(value))
        {
            let v = Float128.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Float128.#cache.set(value, new WeakRef (this));

    }

}

export class Char16 extends String {
    static #cache = new Map();

    constructor(value) {

        if (Char16.#cache.has(value))
        {
            let v = Char16.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Char16.#cache.set(value, new WeakRef (this));

    }
}
export class Char8 extends String {
    static #cache = new Map();

    constructor(value) {

        if (Char8.#cache.has(value))
        {
            let v = Char8.#cache.get(value).deref();
            if (v != null)
                return v;
        }

        super(value);

        Char8.#cache.set(value, new WeakRef (this));

    }
}