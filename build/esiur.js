(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],3:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],4:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],5:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
module.exports = _classApplyDescriptorGet, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
module.exports = _classApplyDescriptorSet, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],9:[function(require,module,exports){
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
module.exports = _classExtractFieldDescriptor, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],10:[function(require,module,exports){
var classApplyDescriptorGet = require("./classApplyDescriptorGet.js");
var classExtractFieldDescriptor = require("./classExtractFieldDescriptor.js");
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}
module.exports = _classPrivateFieldGet, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./classApplyDescriptorGet.js":6,"./classExtractFieldDescriptor.js":9}],11:[function(require,module,exports){
var classApplyDescriptorSet = require("./classApplyDescriptorSet.js");
var classExtractFieldDescriptor = require("./classExtractFieldDescriptor.js");
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
module.exports = _classPrivateFieldSet, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./classApplyDescriptorSet.js":7,"./classExtractFieldDescriptor.js":9}],12:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf.js");
var isNativeReflectConstruct = require("./isNativeReflectConstruct.js");
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./isNativeReflectConstruct.js":20,"./setPrototypeOf.js":27}],13:[function(require,module,exports){
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":32}],14:[function(require,module,exports){
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":32}],15:[function(require,module,exports){
var superPropBase = require("./superPropBase.js");
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./superPropBase.js":29}],16:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],17:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf.js");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./setPrototypeOf.js":27}],18:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],19:[function(require,module,exports){
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],20:[function(require,module,exports){
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],21:[function(require,module,exports){
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],22:[function(require,module,exports){
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],23:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],24:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],25:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var assertThisInitialized = require("./assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./assertThisInitialized.js":4,"./typeof.js":33}],26:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":33}],27:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],28:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");
var iterableToArrayLimit = require("./iterableToArrayLimit.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableRest = require("./nonIterableRest.js");
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithHoles.js":2,"./iterableToArrayLimit.js":22,"./nonIterableRest.js":23,"./unsupportedIterableToArray.js":34}],29:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf.js");
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./getPrototypeOf.js":16}],30:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles.js");
var iterableToArray = require("./iterableToArray.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableSpread = require("./nonIterableSpread.js");
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":3,"./iterableToArray.js":21,"./nonIterableSpread.js":24,"./unsupportedIterableToArray.js":34}],31:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":33}],32:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPrimitive.js":31,"./typeof.js":33}],33:[function(require,module,exports){
function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],34:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],35:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf.js");
var setPrototypeOf = require("./setPrototypeOf.js");
var isNativeFunction = require("./isNativeFunction.js");
var construct = require("./construct.js");
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./construct.js":12,"./getPrototypeOf.js":16,"./isNativeFunction.js":19,"./setPrototypeOf.js":27}],36:[function(require,module,exports){
// TODO(Babel 8): Remove this file.

var runtime = require("../helpers/regeneratorRuntime")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{"../helpers/regeneratorRuntime":26}],37:[function(require,module,exports){

},{}],38:[function(require,module,exports){
'use strict';

module.exports = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};

},{}],39:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _AsyncReply2 = _interopRequireDefault(require("./AsyncReply.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AsyncBag = exports["default"] = /*#__PURE__*/function (_AsyncReply) {
  (0, _inherits2["default"])(AsyncBag, _AsyncReply);
  function AsyncBag() {
    var _this;
    (0, _classCallCheck2["default"])(this, AsyncBag);
    _this = _callSuper(this, AsyncBag);
    _this.replies = [];
    _this.results = [];
    _this.count = 0;
    _this.sealedBag = false;
    return _this;
  }
  (0, _createClass2["default"])(AsyncBag, [{
    key: "seal",
    value: function seal() {
      this.sealedBag = true;
      if (this.results.length == 0) this.trigger([]);
      var self = this;
      var singleTaskCompleted = function singleTaskCompleted(taskIndex) {
        return function (results, reply) {
          self.results[taskIndex] = results;
          self.count++;
          if (self.count == self.results.length) self.trigger(self.results);
        };
      };
      for (var i = 0; i < this.results.length; i++) this.replies[i].then(singleTaskCompleted(i));

      /*
          this.replies[i].then(function(r, reply){
              self.results[self.replies.indexOf(reply)] = r;
              self.count++;
              if (self.count == self.results.length)
                  self.trigger(self.results);
          });
      */
    }
  }, {
    key: "add",
    value: function add(reply) {
      if (!this.sealedBag) {
        this.replies.push(reply);
        this.results.push(null);
      }
    }
  }]);
  return AsyncBag;
}(_AsyncReply2["default"]);

},{"./AsyncReply.js":42,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],40:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * Created by Ahmed Zamil on 18/11/2017.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _ExceptionCode = _interopRequireDefault(require("./ExceptionCode.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AsyncException = exports["default"] = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(AsyncException, _Error);
  function AsyncException(type, code, message) {
    var _this;
    (0, _classCallCheck2["default"])(this, AsyncException);
    _this = _callSuper(this, AsyncException);
    if (type instanceof AsyncException) {
      _this.raise(type.type, type.code, type.message);
    } else if (type instanceof Error) {
      _this.raise(1, 0, type.message);
    } else if (type != undefined) {
      _this.raise(type, code, message);
    } else {
      _this.raised = false;
    }
    return _this;
  }
  (0, _createClass2["default"])(AsyncException, [{
    key: "raise",
    value: function raise(type, code, message) {
      this.type = type;
      this.code = code;
      if (type == 0 && message == null) {
        for (var i in _ExceptionCode["default"]) if (_ExceptionCode["default"][i] == code) {
          this.message = i;
          break;
        }
      } else this.message = message;
      this.raised = true;
    }
  }, {
    key: "toString",
    value: function toString() {
      return (this.type == 0 ? "Management" : "Exception") + " (" + this.code + ") : " + this.message;
    }
  }]);
  return AsyncException;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

},{"./ExceptionCode.js":44,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],41:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _AsyncReply2 = _interopRequireDefault(require("./AsyncReply.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AsyncQueue = exports["default"] = /*#__PURE__*/function (_AsyncReply) {
  (0, _inherits2["default"])(AsyncQueue, _AsyncReply);
  function AsyncQueue() {
    var _this;
    (0, _classCallCheck2["default"])(this, AsyncQueue);
    _this = _callSuper(this, AsyncQueue);
    _this.list = [];
    var self = (0, _assertThisInitialized2["default"])(_this);
    _this.processQueue = function () {
      for (var i = 0; i < self.list.length; i++) if (self.list[i].ready) {
        self.trigger(self.list[i].result);
        self.ready = false;
        //self.list.splice(i, 1);
        self.list.shift();
        i--;
      } else if (self.list[i].failed) {
        self.ready = false;
        self.list.shift();
        i--;
        console.log("AsyncQueue (Reply Failed)");
      } else break;
      self.ready = self.list.length == 0;
    };
    return _this;
  }
  (0, _createClass2["default"])(AsyncQueue, [{
    key: "add",
    value: function add(reply) {
      this.list.push(reply);
      this.ready = false;
      reply.then(this.processQueue).error(this.processQueue);
    }
  }, {
    key: "remove",
    value: function remove(reply) {
      this.list.splice(this.list.indexOf(reply), 1);
      this.processQueue();
    }
  }]);
  return AsyncQueue;
}(_AsyncReply2["default"]);

},{"./AsyncReply.js":42,"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],42:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _AsyncException = _interopRequireDefault(require("./AsyncException.js"));
var _ExceptionCode = _interopRequireDefault(require("./ExceptionCode.js"));
var _ErrorType = _interopRequireDefault(require("./ErrorType.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AsyncReply = exports["default"] = /*#__PURE__*/function (_Promise) {
  (0, _inherits2["default"])(AsyncReply, _Promise);
  function AsyncReply(result) {
    var _this;
    (0, _classCallCheck2["default"])(this, AsyncReply);
    if (result instanceof Function) {
      _this = _callSuper(this, AsyncReply, [result]);
      _this.awaiter = result;
    } else _this = _callSuper(this, AsyncReply, [function () {}]);
    _this.callbacks = [];
    _this.errorCallbacks = [];
    _this.progressCallbacks = [];
    _this.chunkCallbacks = [];
    _this.exception = new _AsyncException["default"](); // null;

    //var self = this;

    if (result !== undefined && !(result instanceof Function)) {
      _this.result = result;
      _this.ready = true;
    } else {
      _this.ready = false;
      _this.result = null;
    }
    return (0, _possibleConstructorReturn2["default"])(_this);
  }
  (0, _createClass2["default"])(AsyncReply, [{
    key: "then",
    value: function then(callback, onError) {
      if (callback != undefined) {
        this.callbacks.push(callback);
        if (this.ready) callback(this.result, this);
      }
      if (onError != undefined) {
        this.error(onError);
      }
      return this;
    }

    // Alias for then()
  }, {
    key: "done",
    value: function done(callback) {
      this.then(callback);
    }
  }, {
    key: "error",
    value: function error(callback) {
      this.errorCallbacks.push(callback);
      if (this.exception.raised) {
        callback(this.exception);
      }
      return this;
    }
  }, {
    key: "progress",
    value: function progress(callback) {
      this.progressCallbacks.push(callback);
      return this;
    }
  }, {
    key: "chunk",
    value: function chunk(callback) {
      this.chunkCallbacks.push(callback);
      return this;
    }

    // Alias for chunk()
  }, {
    key: "next",
    value: function next(callback) {
      this.chunk(callback);
    }
  }, {
    key: "timeout",
    value: function timeout(milliseconds, onTimeout) {
      var self = this;
      setTimeout(function () {
        if (!self.ready && self.exception == null) {
          self.triggerError(_ErrorType["default"].Management, _ExceptionCode["default"].Timeout, "Execution timeout expired.");
          if (onTimeout instanceof Function) onTimeout();
        }
      }, milliseconds);
    }
  }, {
    key: "trigger",
    value: function trigger(result) {
      if (this.ready) return this;
      if (this.exception.raised) return this;
      this.result = result;
      this.ready = true;
      for (var i = 0; i < this.callbacks.length; i++) this.callbacks[i](result, this);
      return this;
    }
  }, {
    key: "triggerError",
    value: function triggerError(type, code, message) {
      if (this.ready) return this;
      if (type instanceof _AsyncException["default"]) this.exception.raise(type.type, type.code, type.message);else this.exception.raise(type, code, message);
      if (this.errorCallbacks.length == 0) throw this.exception;else for (var i = 0; i < this.errorCallbacks.length; i++) this.errorCallbacks[i](this.exception, this);
      return this;
    }
  }, {
    key: "triggerProgress",
    value: function triggerProgress(type, value, max) {
      for (var i = 0; i < this.progressCallbacks.length; i++) this.progressCallbacks[i](type, value, max, this);
      return this;
    }
  }, {
    key: "triggerChunk",
    value: function triggerChunk(value) {
      for (var i = 0; i < this.chunkCallbacks.length; i++) this.chunkCallbacks[i](value, this);
      return this;
    }
  }]);
  return AsyncReply;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Promise));

},{"./AsyncException.js":40,"./ErrorType.js":43,"./ExceptionCode.js":44,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Management: 0,
  Exception: 1
};

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] =
//const ExceptionCode = 
{
  RuntimeException: 0,
  HostNotReachable: 1,
  AccessDenied: 2,
  UserOrTokenNotFound: 3,
  ChallengeFailed: 4,
  ResourceNotFound: 5,
  AttachDenied: 6,
  InvalidMethod: 7,
  InvokeDenied: 8,
  CreateDenied: 9,
  AddParentDenied: 10,
  AddChildDenied: 11,
  ViewAttributeDenied: 12,
  UpdateAttributeDenied: 13,
  StoreNotFound: 14,
  ParentNotFound: 15,
  ChildNotFound: 16,
  ResourceIsNotStore: 17,
  DeleteDenied: 18,
  DeleteFailed: 19,
  UpdateAttributeFailed: 20,
  GetAttributesFailed: 21,
  ClearAttributesFailed: 22,
  TemplateNotFound: 23,
  RenameDenied: 24,
  ClassNotFound: 25,
  MethodNotFound: 26,
  PropertyNotFound: 27,
  SetPropertyDenied: 28,
  ReadOnlyProperty: 29,
  GeneralFailure: 30,
  AddToStoreFailed: 31,
  NotAttached: 32,
  AlreadyListened: 33,
  AlreadyUnlistened: 34,
  NotListenable: 35,
  ParseError: 36,
  Timeout: 37,
  NotSupported: 38,
  NotImplemented: 39
};

},{}],45:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 31/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IEventHandler2 = _interopRequireDefault(require("./IEventHandler.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var IDestructible = exports["default"] = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(IDestructible, _IEventHandler);
  function IDestructible() {
    (0, _classCallCheck2["default"])(this, IDestructible);
    return _callSuper(this, IDestructible);
  }
  (0, _createClass2["default"])(IDestructible, [{
    key: "destroy",
    value: function destroy() {
      this._emit("destroy", this);
    }
  }]);
  return IDestructible;
}(_IEventHandler2["default"]);

},{"./IEventHandler.js":46,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],46:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 30/08/2017.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var IEventHandler = exports["default"] = /*#__PURE__*/function () {
  function IEventHandler() {
    (0, _classCallCheck2["default"])(this, IEventHandler);
    this._events = {};
  }
  (0, _createClass2["default"])(IEventHandler, [{
    key: "_register",
    value: function _register(event) {
      this._events[event] = [];
    }
  }, {
    key: "_emit",
    value: function _emit(event) {
      event = event.toLowerCase();
      var args = Array.prototype.slice.call(arguments, 1);
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      return false;
    }
  }, {
    key: "_emitArgs",
    value: function _emitArgs(event, args) {
      event = event.toLowerCase();
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      return this;
    }
  }, {
    key: "on",
    value: function on(event, fn, issuer) {
      if (!(fn instanceof Function)) return this;
      event = event.toLowerCase();
      // add
      if (!this._events[event]) this._events[event] = [];
      this._events[event].push({
        f: fn,
        i: issuer == null ? this : issuer
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, fn) {
      event = event.toLowerCase();
      if (this._events[event]) {
        if (fn) {
          for (var i = 0; i < this._events[event].length; i++) if (this._events[event][i].f == fn) this._events[event].splice(i--, 1);

          //var index = this._events[event].indexOf(fn);
          //if (index > -1)
          //this._events[event].splice(index, 1);
        } else {
          this._events[event] = [];
        }
      }
    }
  }]);
  return IEventHandler;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Execution: 0,
  Network: 1
};

},{}],48:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 05/09/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));
var _IDestructible = _interopRequireDefault(require("../Core/IDestructible.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _item_destroyed = /*#__PURE__*/new WeakMap();
var AutoList = exports["default"] = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(AutoList, _IEventHandler);
  function AutoList() {
    var _this;
    (0, _classCallCheck2["default"])(this, AutoList);
    _this = _callSuper(this, AutoList);
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _item_destroyed, {
      writable: true,
      value: function value(sender) {
        this.remove(sender);
      }
    });
    _this.list = [];
    return _this;
  }
  (0, _createClass2["default"])(AutoList, [{
    key: "length",
    get: function get() {
      return this.list.length;
    }
  }, {
    key: "add",
    value: function add(value) {
      if (value instanceof _IDestructible["default"]) value.on("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed), this);
      this.list.push(value);
      this._emit("add", value);
    }
  }, {
    key: "set",
    value: function set(index, value) {
      if (index >= this.list.length || index < 0) return;
      if (value instanceof _IDestructible["default"]) value.on("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed), this);
      if (this.list[index] instanceof _IDestructible["default"]) this.list[index].off("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed));
      this.list[index] = value;
    }
  }, {
    key: "at",
    value: function at(index) {
      return this.list[index];
    }
  }, {
    key: "item",
    value: function item(index) {
      return this.list[index];
    }
  }, {
    key: "first",
    value: function first(selector) {
      var _iterator = _createForOfIteratorHelper(this.list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          if (selector(el)) return el;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "remove",
    value: function remove(value) {
      this.removeAt(this.list.indexOf(value));
    }
  }, {
    key: "contains",
    value: function contains(value) {
      return this.list.indexOf(value) > -1;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.list.slice(0);
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      if (index >= this.list.length || index < 0) return;
      var item = this.list[index];
      if (item instanceof _IDestructible["default"]) item.off("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed));
      this.list.splice(index, 1);
      this._emit("remove", item);
    }
  }]);
  return AutoList;
}(_IEventHandler2["default"]);

},{"../Core/IDestructible.js":45,"../Core/IEventHandler.js":46,"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/classPrivateFieldGet":10,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],49:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 05/09/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));
var _IDestructible = _interopRequireDefault(require("../Core/IDestructible.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _item_destroyed = /*#__PURE__*/new WeakMap();
var AutoMap = exports["default"] = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(AutoMap, _IEventHandler);
  function AutoMap() {
    var _this;
    (0, _classCallCheck2["default"])(this, AutoMap);
    _this = _callSuper(this, AutoMap);
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _item_destroyed, {
      writable: true,
      value: function value(sender) {
        this.remove(sender);
      }
    });
    _this.dic = {};
    return _this;
  }
  (0, _createClass2["default"])(AutoMap, [{
    key: "add",
    value: function add(key, value) {
      if (value instanceof _IDestructible["default"]) value.on("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed));
      this.dic[key] = value;
      this._emit("add", key, value);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.dic[key] !== undefined) this.remove(key);
      this.add(key, value);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (this.dic[key] !== undefined) {
        if (this.dic[key] instanceof _IDestructible["default"]) this.dic[key].off("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed));
        delete this.dic[key];
      }
    }
  }]);
  return AutoMap;
}(_IEventHandler2["default"]);

},{"../Core/IDestructible.js":45,"../Core/IEventHandler.js":46,"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/classPrivateFieldGet":10,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],50:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = _interopRequireDefault(require("./DC.js"));
var BinaryList = exports["default"] = /*#__PURE__*/function () {
  function BinaryList() {
    (0, _classCallCheck2["default"])(this, BinaryList);
    this.list = [];
    //this.data = [];
  }
  (0, _createClass2["default"])(BinaryList, [{
    key: "addDateTime",
    value: function addDateTime(value, endian) {
      this.addDC(_DC["default"].dateTimeToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertDateTime",
    value: function insertDateTime(position, value, endian) {
      this.insertDC(position, _DC["default"].dateTimeToBytes(value, endian));
      return this;
    }
  }, {
    key: "addDateTimeArray",
    value: function addDateTimeArray(value, endian) {
      this.addDC(_DC["default"].dateTimeArrayToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertDateTimeArray",
    value: function insertDateTimeArray(position, value, endian) {
      this.insertDC(position, _DC["default"].dateTimeArrayToBytes(value, endian));
      return this;
    }
  }, {
    key: "addUUID",
    value: function addUUID(value) {
      this.addDC(_DC["default"].uuidToBytes(value));
      return this;
    }
  }, {
    key: "insertUUID",
    value: function insertUUID(position, value) {
      this.insertDC(position, _DC["default"].uuidToBytes(value));
      return this;
    }
  }, {
    key: "addUint8Array",
    value: function addUint8Array(value) {
      this.addDC(value);
      return this;
    }
  }, {
    key: "addDC",
    value: function addDC(value) {
      // this is bad, will cause Maximum stack execution exception for large arrays
      // this.list.push(...value); 
      // Fixed
      this.list = this.list.concat(Array.from(value));
      return this;
    }
  }, {
    key: "insertDC",
    value: function insertDC(position, value) {
      this.list = this.list.slice(0, position).concat(value).concat(this.list.slice(position));
    }
  }, {
    key: "insertUint8Array",
    value: function insertUint8Array(position, value) {
      this.insertDC(position, value);
      return this;
    }
  }, {
    key: "addString",
    value: function addString(value) {
      this.addDC(_DC["default"].stringToBytes(value));
      return this;
    }
  }, {
    key: "insertString",
    value: function insertString(position, value) {
      this.insertDC(position, _DC["default"].stringToBytes(value));
      return this;
    }
  }, {
    key: "insertUint8",
    value: function insertUint8(position, value) {
      this.list.splice(position, 0, value);
      return this;
    }
  }, {
    key: "addUint8",
    value: function addUint8(value) {
      this.list.push(value);
      return this;
    }
  }, {
    key: "addInt8",
    value: function addInt8(value) {
      this.list.push(value);
      return this;
    }
  }, {
    key: "insertInt8",
    value: function insertInt8(position, value) {
      this.list.splice(position, 0, value);
      return this;
    }
  }, {
    key: "addChar",
    value: function addChar(value) {
      this.addDC(_DC["default"].charToBytes(value));
      return this;
    }
  }, {
    key: "insertChar",
    value: function insertChar(position, value) {
      this.insertDC(position, _DC["default"].charToBytes(value));
      return this;
    }
  }, {
    key: "addBoolean",
    value: function addBoolean(value) {
      this.addDC(_DC["default"].boolToBytes(value));
      return this;
    }
  }, {
    key: "insertBoolean",
    value: function insertBoolean(position, value) {
      this.insertDC(position, _DC["default"].boolToBytes(value));
      return this;
    }
  }, {
    key: "addUint16",
    value: function addUint16(value, endian) {
      this.addDC(_DC["default"].uint16ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertUint16",
    value: function insertUint16(position, value, endian) {
      this.insertDC(position, _DC["default"].uint16ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addInt16",
    value: function addInt16(value, endian) {
      this.addDC(_DC["default"].int16ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertInt16",
    value: function insertInt16(position, value, endian) {
      this.insertDC(position, _DC["default"].int16ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addUint32",
    value: function addUint32(value, endian) {
      this.addDC(_DC["default"].uint32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertUint32",
    value: function insertUint32(position, value, endian) {
      this.insertDC(position, _DC["default"].uint32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addInt32",
    value: function addInt32(value, endian) {
      this.addDC(_DC["default"].int32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertInt32",
    value: function insertInt32(position, value, endian) {
      this.insertDC(position, _DC["default"].int32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addUint64",
    value: function addUint64(value, endian) {
      this.addDC(_DC["default"].uint64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertUint64",
    value: function insertUint64(position, value, endian) {
      this.insertDC(position, _DC["default"].uint64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addInt64",
    value: function addInt64(value, endian) {
      this.addDC(_DC["default"].int64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertInt64",
    value: function insertInt64(position, value, endian) {
      this.insertDC(position, _DC["default"].int64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addFloat32",
    value: function addFloat32(value, endian) {
      this.addDC(_DC["default"].float32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertFloat32",
    value: function insertFloat32(position, value, endian) {
      this.insertDC(position, _DC["default"].float32ToBytes(value, endian));
      return this;
    }
  }, {
    key: "addFloat64",
    value: function addFloat64(value, endian) {
      this.addDC(_DC["default"].float64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "insertFloat64",
    value: function insertFloat64(position, value, endian) {
      this.insertDC(position, _DC["default"].float64ToBytes(value, endian));
      return this;
    }
  }, {
    key: "length",
    get: function get() {
      return this.list.length;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return new Uint8Array(this.list);
    }
  }, {
    key: "toDC",
    value: function toDC() {
      return new _DC["default"](this.list);
    }
  }]);
  return BinaryList;
}();

},{"./DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],51:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CodecParseResults = exports.CodecComposeResults = void 0;
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
var _PropertyValue = _interopRequireDefault(require("./PropertyValue.js"));
var _DC = require("./DC.js");
var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));
var _DistributedPropertyContext = _interopRequireDefault(require("../Net/IIP/DistributedPropertyContext.js"));
var _DistributedResource = _interopRequireDefault(require("../Net/IIP/DistributedResource.js"));
var _IResource = _interopRequireDefault(require("../Resource/IResource.js"));
var _IRecord = _interopRequireDefault(require("./IRecord.js"));
var _Record = _interopRequireDefault(require("./Record.js"));
var _ResourceArrayType = _interopRequireDefault(require("./ResourceArrayType.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
var _TemplateType = _interopRequireDefault(require("../Resource/Template/TemplateType.js"));
var _NotModified = _interopRequireDefault(require("./NotModified.js"));
var _KeyList = _interopRequireDefault(require("./KeyList.js"));
var _DataSerializer = _interopRequireDefault(require("./DataSerializer.js"));
var _DataDeserializer = _interopRequireDefault(require("./DataDeserializer.js"));
var _TypedList = _interopRequireDefault(require("./TypedList.js"));
var _TypedMap = _interopRequireDefault(require("./TypedMap.js"));
var _IEnum = _interopRequireDefault(require("./IEnum.js"));
var _TransmissionType = require("./TransmissionType.js");
var _ExtendedTypes = require("./ExtendedTypes.js");
var _PropertyValueArray = _interopRequireDefault(require("./PropertyValueArray.js"));
var _RecordArray = _interopRequireDefault(require("./RecordArray.js"));
var _ResourceArray = _interopRequireDefault(require("./ResourceArray.js"));
var _Tuple = _interopRequireDefault(require("./Tuple.js"));
var _defineProperty2;
var CodecComposeResults = exports.CodecComposeResults = /*#__PURE__*/(0, _createClass2["default"])(
//final int transmissionTypeIdentifier;
//final DC data;
function CodecComposeResults(transmissionTypeIdentifier, data) {
  (0, _classCallCheck2["default"])(this, CodecComposeResults);
  this.transmissionTypeIdentifier = transmissionTypeIdentifier;
  this.data = data;
});
var CodecParseResults = exports.CodecParseResults = /*#__PURE__*/(0, _createClass2["default"])(
//final AsyncReply reply;
//final int size;

function CodecParseResults(size, reply) {
  (0, _classCallCheck2["default"])(this, CodecParseResults);
  this.size = size;
  this.reply = reply;
});
var Codec = exports["default"] = /*#__PURE__*/function () {
  function Codec() {
    (0, _classCallCheck2["default"])(this, Codec);
  }
  (0, _createClass2["default"])(Codec, null, [{
    key: "parse",
    value:
    /// <summary>
    /// Parse a value
    /// </summary>
    /// <param name="data">Bytes array</param>
    /// <param name="offset">Zero-indexed offset.</param>
    /// <param name="size">Output the number of bytes parsed</param>
    /// <param name="connection">DistributedConnection is required in case a structure in the array holds items at the other end.</param>
    /// <param name="dataType">DataType, in case the data is not prepended with DataType</param>
    /// <returns>Value</returns>
    function parse(data, offset, connection, requestSequence) {
      var dataType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var len = 0;
      if (dataType == null) {
        var _dataType$offset, _dataType;
        var parsedDataTyped = _TransmissionType.TransmissionType.parse(data, offset, data.length);
        len = parsedDataTyped.size;
        dataType = parsedDataTyped.type;
        offset = (_dataType$offset = (_dataType = dataType) === null || _dataType === void 0 ? void 0 : _dataType.offset) !== null && _dataType$offset !== void 0 ? _dataType$offset : 0;
      } else len = dataType.contentLength;
      if (dataType != null) {
        if (dataType.classType == _TransmissionType.TransmissionTypeClass.Fixed) {
          return new CodecParseResults(len, Codec.fixedParsers[dataType.exponent][dataType.index](data, dataType.offset, dataType.contentLength, connection, requestSequence));
        } else if (dataType.classType == _TransmissionType.TransmissionTypeClass.Dynamic) {
          return new CodecParseResults(len, Codec.dynamicParsers[dataType.index](data, dataType.offset, dataType.contentLength, connection, requestSequence));
        } else
          //if (tt.Class == TransmissionTypeClass.Typed)
          {
            return new CodecParseResults(len, Codec.typedParsers[dataType.index](data, dataType.offset, dataType.contentLength, connection, requestSequence));
          }
      }
      throw Error("Can't parse transmission type.");
    }
  }, {
    key: "mapFromObject",
    value: function mapFromObject(map) {
      var rt = new Map();
      for (var i in map) rt.set(i, map[i]);
    }
  }, {
    key: "getListType",
    value: function getListType(list) {
      if (list instanceof _TypedList["default"]) return _TypedList["default"].getType(list);else return Object;
    }
  }, {
    key: "getMapTypes",
    value: function getMapTypes(map) {
      if (map instanceof _TypedMap["default"]) return _TypedMap["default"].getTypes(map);else return [Object, Object];
    }

    /// <summary>
    /// Compose a variable
    /// </summary>
    /// <param name="value">Value to compose.</param>
    /// <param name="connection">DistributedConnection is required to check locality.</param>
    /// <param name="prependType">If True, prepend the DataType at the beginning of the output.</param>
    /// <returns>Array of bytes in the network byte order.</returns>
  }, {
    key: "compose",
    value: function compose(valueOrSource, connection) {
      if (valueOrSource == null) return _TransmissionType.TransmissionType.compose(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC.DC(0));
      var type = valueOrSource.constructor;

      // if (type.)
      // {

      //     var genericType = type.GetGenericTypeDefinition();
      //     if (genericType == typeof(DistributedPropertyContext<>))
      //     {
      //         valueOrSource = ((IDistributedPropertyContext)valueOrSource).GetValue(connection);
      //     }
      //     else if (genericType == typeof(Func<>))
      //     {
      //         var args = genericType.GetGenericArguments();
      //         if (args.Length == 2 && args[0] == typeof(DistributedConnection))
      //         {
      //             //Func<DistributedConnection, DistributedConnection> a;
      //             //a.Invoke()
      //         }
      //     }
      // }

      // if (valueOrSource is IUserType)
      //     valueOrSource = (valueOrSource as IUserType).Get();

      //if (valueOrSource is Func<DistributedConnection, object>)
      //    valueOrSource = (valueOrSource as Func<DistributedConnection, object>)(connection);

      // if (valueOrSource == null)
      //     return TransmissionType.Compose(TransmissionTypeIdentifier.Null, null);

      // type = valueOrSource.GetType();

      if (this.composers[type] != undefined) {
        var results = this.composers[type](valueOrSource, connection);
        return _TransmissionType.TransmissionType.compose(results.identifier, results.data);
      } else {
        if (valueOrSource instanceof _TypedList["default"]) {
          var genericType = this.getListType(valueOrSource);
          var _results = _DataSerializer["default"].typedListComposer(valueOrSource, genericType, connection);
          return _TransmissionType.TransmissionType.compose(_results.identifier, _results.data);
        } else if (valueOrSource instanceof _TypedMap["default"]) {
          var genericTypes = _TypedMap["default"].getTypes(valueOrSource);
          var _results2 = _DataSerializer["default"].typedMapComposer(valueOrSource, genericTypes[0], genericTypes[1], connection);
          return _TransmissionType.TransmissionType.compose(_results2.identifier, _results2.data);
        } else if (valueOrSource instanceof _IResource["default"]) {
          var _results3 = _DataSerializer["default"].resourceComposer(valueOrSource, connection);
          return _TransmissionType.TransmissionType.compose(_results3.identifier, _results3.data);
        } else if (valueOrSource instanceof _IRecord["default"]) {
          var _results4 = _DataSerializer["default"].recordComposer(valueOrSource, connection);
          return _TransmissionType.TransmissionType.compose(_results4.identifier, _results4.data);
        } else if (valueOrSource instanceof _IEnum["default"]) {
          var _results5 = _DataSerializer["default"].enumComposer(valueOrSource, connection);
          return _TransmissionType.TransmissionType.compose(_results5.identifier, _results5.data);
        } else if (valueOrSource instanceof _Tuple["default"]) {
          var _results6 = _DataSerializer["default"].tupleComposer(valueOrSource, connection);
          return _TransmissionType.TransmissionType.compose(_results6.identifier, _results6.data);
        }
      }
      return _TransmissionType.TransmissionType.compose(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC.DC(0));
    }

    /// <summary>
    /// Check if a resource is local to a given connection.
    /// </summary>
    /// <param name="resource">Resource to check.</param>
    /// <param name="connection">DistributedConnection to check if the resource is local to it.</param>
    /// <returns>True, if the resource owner is the given connection, otherwise False.</returns>
  }, {
    key: "isLocalResource",
    value: function isLocalResource(resource, connection) {
      if (connection == null) return false;
      if (resource instanceof _DistributedResource["default"]) {
        if (resource._p.connection == connection) return true;
      }
      return false;
    }
  }]);
  return Codec;
}();
//AsyncReply Parser(byte[] data, uint offset, uint length, DistributedConnection connection);
(0, _defineProperty3["default"])(Codec, "fixedParsers", [[_DataDeserializer["default"].nullParser, _DataDeserializer["default"].booleanFalseParser, _DataDeserializer["default"].booleanTrueParser, _DataDeserializer["default"].notModifiedParser], [_DataDeserializer["default"].byteParser, _DataDeserializer["default"].sByteParser, _DataDeserializer["default"].char8Parser], [_DataDeserializer["default"].int16Parser, _DataDeserializer["default"].uInt16Parser, _DataDeserializer["default"].char16Parser], [_DataDeserializer["default"].int32Parser, _DataDeserializer["default"].uInt32Parser, _DataDeserializer["default"].float32Parser, _DataDeserializer["default"].resourceParser, _DataDeserializer["default"].localResourceParser], [_DataDeserializer["default"].int64Parser, _DataDeserializer["default"].uInt64Parser, _DataDeserializer["default"].float64Parser, _DataDeserializer["default"].dateTimeParser], [_DataDeserializer["default"].int128Parser,
// int 128
_DataDeserializer["default"].uInt128Parser,
// uint 128
_DataDeserializer["default"].float128Parser]]);
(0, _defineProperty3["default"])(Codec, "dynamicParsers", [_DataDeserializer["default"].rawDataParser, _DataDeserializer["default"].stringParser, _DataDeserializer["default"].listParser, _DataDeserializer["default"].resourceListParser, _DataDeserializer["default"].recordListParser]);
(0, _defineProperty3["default"])(Codec, "typedParsers", [_DataDeserializer["default"].recordParser, _DataDeserializer["default"].typedListParser, _DataDeserializer["default"].typedMapParser, _DataDeserializer["default"].tupleParser, _DataDeserializer["default"].enumParser, _DataDeserializer["default"].constantParser]);
(0, _defineProperty3["default"])(Codec, "composers", (_defineProperty2 = {}, (0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])(_defineProperty2, Boolean, _DataSerializer["default"].boolComposer), _NotModified["default"], _DataSerializer["default"].notModifiedComposer), _ExtendedTypes.Char8, _DataSerializer["default"].char8Composer), _ExtendedTypes.Char16, _DataSerializer["default"].char16Composer), _ExtendedTypes.Int64, _DataSerializer["default"].int64Composer), _ExtendedTypes.UInt64, _DataSerializer["default"].uInt64Composer), _ExtendedTypes.Int32, _DataSerializer["default"].int32Composer), _ExtendedTypes.UInt32, _DataSerializer["default"].uInt32Composer), _ExtendedTypes.Int16, _DataSerializer["default"].int16Composer), _ExtendedTypes.UInt16, _DataSerializer["default"].uInt16Composer), (0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])(_defineProperty2, _ExtendedTypes.Int8, _DataSerializer["default"].int8Composer), _ExtendedTypes.UInt8, _DataSerializer["default"].uInt8Composer), _ExtendedTypes.Float32, _DataSerializer["default"].float32Composer), _ExtendedTypes.Float64, _DataSerializer["default"].float64Composer), _ExtendedTypes.Float128, _DataSerializer["default"].float128Composer), Number, _DataSerializer["default"].numberComposer), Date, _DataSerializer["default"].dateTimeComposer), _DC.DC, _DataSerializer["default"].rawDataComposer), Uint8Array, _DataSerializer["default"].rawDataComposer), String, _DataSerializer["default"].stringComposer), (0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])(_defineProperty2, Array, _DataSerializer["default"].listComposer), _ResourceArray["default"], _DataSerializer["default"].resourceListComposer), _RecordArray["default"], _DataSerializer["default"].recordListComposer), Map, _DataSerializer["default"].mapComposer), _PropertyValueArray["default"], _DataSerializer["default"].propertyValueArrayComposer)));

},{"../Core/AsyncBag.js":39,"../Core/AsyncReply.js":42,"../Net/IIP/DistributedPropertyContext.js":78,"../Net/IIP/DistributedResource.js":79,"../Resource/IResource.js":115,"../Resource/Template/TemplateType.js":127,"../Resource/Warehouse.js":129,"./BinaryList.js":50,"./DC.js":52,"./DataDeserializer.js":53,"./DataSerializer.js":54,"./ExtendedTypes.js":55,"./IEnum.js":56,"./IRecord.js":57,"./KeyList.js":58,"./NotModified.js":59,"./PropertyValue.js":62,"./PropertyValueArray.js":63,"./Record.js":64,"./RecordArray.js":65,"./ResourceArray.js":67,"./ResourceArrayType.js":68,"./TransmissionType.js":69,"./Tuple.js":70,"./TypedList.js":71,"./TypedMap.js":72,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],52:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BL = BL;
exports["default"] = exports.UNIX_EPOCH = exports.TWO_PWR_32 = exports.Endian = exports.DC = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));
var _UUID = _interopRequireDefault(require("./UUID.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UNIX_EPOCH = exports.UNIX_EPOCH = 621355968000000000;
var TWO_PWR_32 = exports.TWO_PWR_32 = (1 << 16) * (1 << 16);
var Endian = exports.Endian = {
  Big: 0,
  Little: 1
};
var DC = exports.DC = exports["default"] = /*#__PURE__*/function (_Uint8Array) {
  (0, _inherits2["default"])(DC, _Uint8Array);
  function DC(bufferOrSize) {
    var _this;
    (0, _classCallCheck2["default"])(this, DC);
    _this = _callSuper(this, DC, [bufferOrSize]);

    //if (bufferOrSize instanceof ArrayBuffer) {
    //  this.buffer = bufferOrSize;
    //}
    //else
    //{
    //  this.buffer = new Uint8Array(bufferOrSize);
    //}

    _this.dv = new DataView(_this.buffer);
    return _this;
  }
  (0, _createClass2["default"])(DC, [{
    key: "append",
    value: function append(src, offset, length) {
      if (!(src instanceof DC)) src = new DC(src);
      var appendix = src.clip(offset, length);
      var rt = new DC(this.length + appendix.length);
      rt.set(this, 0);
      rt.set(appendix, this.length);
      return rt;
    }
  }, {
    key: "clip",
    value: function clip(offset, length) {
      return this.slice(offset, offset + length);
    }
  }, {
    key: "getInt8",
    value: function getInt8(offset) {
      return this.dv.getUint8(offset);
    }
  }, {
    key: "getUint8",
    value: function getUint8(offset) {
      return this[offset]; // this.dv.getUint8(offset);
    }
  }, {
    key: "getInt16",
    value: function getInt16(offset, endian) {
      return this.dv.getInt16(offset, endian != Endian.Big);
    }
  }, {
    key: "getUint16",
    value: function getUint16(offset, endian) {
      return this.dv.getUint16(offset, endian != Endian.Big);
    }
  }, {
    key: "getInt32",
    value: function getInt32(offset, endian) {
      return this.dv.getInt32(offset, endian != Endian.Big);
    }
  }, {
    key: "getUint32",
    value: function getUint32(offset, endian) {
      return this.dv.getUint32(offset, endian != Endian.Big);
    }
  }, {
    key: "getFloat32",
    value: function getFloat32(offset, endian) {
      return this.dv.getFloat32(offset, endian != Endian.Big);
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(offset, endian) {
      return this.dv.getFloat64(offset, endian != Endian.Big);
    }
  }, {
    key: "setInt8",
    value: function setInt8(offset, value) {
      return this.dv.setInt8(offset, value);
    }
  }, {
    key: "setUint8",
    value: function setUint8(offset, value) {
      return this.dv.setUint8(offset, value);
    }
  }, {
    key: "setInt16",
    value: function setInt16(offset, value, endian) {
      return this.dv.setInt16(offset, value, endian != Endian.Big);
    }
  }, {
    key: "setUint16",
    value: function setUint16(offset, value, endian) {
      return this.dv.setUint16(offset, value, endian != Endian.Big);
    }
  }, {
    key: "setInt32",
    value: function setInt32(offset, value, endian) {
      return this.dv.setInt32(offset, value, endian != Endian.Big);
    }
  }, {
    key: "setUint32",
    value: function setUint32(offset, value, endian) {
      return this.dv.setUint32(offset, value, endian != Endian.Big);
    }
  }, {
    key: "setFloat32",
    value: function setFloat32(offset, value, endian) {
      return this.dv.setFloat32(offset, value, endian != Endian.Big);
    }
  }, {
    key: "setFloat64",
    value: function setFloat64(offset, value, endian) {
      return this.dv.setFloat64(offset, value, endian != Endian.Big);
    }
  }, {
    key: "getInt8Array",
    value: function getInt8Array(offset, length) {
      return new Int8Array(this.buffer, offset, length);
    }
  }, {
    key: "getUint8Array",
    value: function getUint8Array(offset, length) {
      return new Uint8Array(this.buffer, offset, length);
    }
  }, {
    key: "copy",
    value: function copy(offset, length, elementSize, func, dstType, endian) {
      var rt = new dstType(length / elementSize);
      var d = 0,
        end = offset + length;
      for (var i = offset; i < end; i += elementSize) rt[d++] = func.call(this, i, endian);
      return rt;
    }
  }, {
    key: "paste",
    value: function paste(offset, length, elementSize, func) {
      var rt = new dstType(length / elementSize);
      var d = 0,
        end = offset + length;
      for (var i = offset; i < end; i += elementSize) rt[d++] = func.call(this, i);
      return rt;
    }
  }, {
    key: "getInt16Array",
    value: function getInt16Array(offset, length, endian) {
      return this.copy(offset, length, 2, this.getInt16, Int16Array, endian);
      //return new Int16Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getUint16Array",
    value: function getUint16Array(offset, length, endian) {
      return this.copy(offset, length, 2, this.getUint16, Uint16Array, endian);
    }
  }, {
    key: "getInt32Array",
    value: function getInt32Array(offset, length, endian) {
      return this.copy(offset, length, 4, this.getInt32, Int32Array, endian);
    }
  }, {
    key: "getUint32Array",
    value: function getUint32Array(offset, length, endian) {
      return this.copy(offset, length, 4, this.getUint32, Uint32Array, endian);
    }
  }, {
    key: "getFloat32Array",
    value: function getFloat32Array(offset, length, endian) {
      return this.copy(offset, length, 4, this.getFloat32, Float32Array, endian);
    }
  }, {
    key: "getFloat64Array",
    value: function getFloat64Array(offset, length, endian) {
      return this.copy(offset, length, 8, this.getFloat64, Float64Array, endian);
    }
  }, {
    key: "getInt64Array",
    value: function getInt64Array(offset, length, endian) {
      return this.copy(offset, length, 8, this.getInt64, Float64Array, endian);
    }
  }, {
    key: "getUint64Array",
    value: function getUint64Array(offset, length, endian) {
      return this.copy(offset, length, 8, this.getUint64, Float64Array, endian);
    }
  }, {
    key: "getBoolean",
    value: function getBoolean(offset) {
      return this.getUint8(offset) > 0;
    }
  }, {
    key: "setBoolean",
    value: function setBoolean(offset, value) {
      this.setUint8(offset, value ? 1 : 0);
    }
  }, {
    key: "getBooleanArray",
    value: function getBooleanArray(offset, length) {
      var rt = [];
      for (var i = 0; i < length; i++) rt.push(this.getBoolean(offset + i));
      return rt;
    }
  }, {
    key: "getChar",
    value: function getChar(offset, endian) {
      return String.fromCharCode(this.getUint16(offset, endian));
    }
  }, {
    key: "setChar",
    value: function setChar(offset, value, endian) {
      this.setUint16(offset, value.charCodeAt(0), endian);
    }
  }, {
    key: "getCharArray",
    value: function getCharArray(offset, length, endian) {
      var rt = [];
      for (var i = 0; i < length; i += 2) rt.push(this.getChar(offset + i, endian));
      return rt;
    }
  }, {
    key: "toHex",
    value: function toHex(offset, length) {
      var rt = "";
      if (length == null) length = this.byteLength;
      if (offset == null) offset = 0;
      for (var i = offset; i < offset + length; i++) {
        var h = this[i].toString(16);
        rt += h.length == 1 ? "0" + h : h;
      }
      return rt;
    }
  }, {
    key: "getString",
    value: function getString(offset, length) {
      if (typeof StringView != "undefined") return new StringView(this.buffer, "UTF-8", offset, length);else {
        var bytes = this.getUint8Array(offset, length);
        var encodedString = String.fromCharCode.apply(null, bytes),
          decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    }
  }, {
    key: "getStringArray",
    value: function getStringArray(offset, length, endian) {
      var rt = [];
      var i = 0;
      while (i < length) {
        var cl = this.getUint32(offset + i, endian);
        i += 4;
        rt.push(this.getString(offset + i, cl));
        i += cl;
      }
      return rt;
    }

    // @TODO: Test numbers with bit 7 of h = 1 
  }, {
    key: "getInt64",
    value: function getInt64(offset, endian) {
      if (endian == Endian.Big) {
        var bi = BigInt(0);
        bi |= BigInt(this[offset++]) << 56n;
        bi |= BigInt(this[offset++]) << 48n;
        bi |= BigInt(this[offset++]) << 40n;
        bi |= BigInt(this[offset++]) << 32n;
        bi |= BigInt(this[offset++]) << 24n;
        bi |= BigInt(this[offset++]) << 16n;
        bi |= BigInt(this[offset++]) << 8n;
        bi |= BigInt(this[offset++]);
        return parseInt(bi);
      } else {
        var _bi = BigInt(0);
        _bi |= BigInt(this[offset++]);
        _bi |= BigInt(this[offset++]) << 8n;
        _bi |= BigInt(this[offset++]) << 16n;
        _bi |= BigInt(this[offset++]) << 24n;
        _bi |= BigInt(this[offset++]) << 32n;
        _bi |= BigInt(this[offset++]) << 40n;
        _bi |= BigInt(this[offset++]) << 48n;
        _bi |= BigInt(this[offset++]) << 56n;
        return parseInt(_bi);
      }

      // var h = this.getInt32(offset);
      // var l = this.getInt32(offset + 4);

      // return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }
  }, {
    key: "getUint64",
    value: function getUint64(offset, endian) {
      if (endian == Endian.Big) {
        var bi = BigInt(0);
        bi |= BigInt(this[offset++]) << 56n;
        bi |= BigInt(this[offset++]) << 48n;
        bi |= BigInt(this[offset++]) << 40n;
        bi |= BigInt(this[offset++]) << 32n;
        bi |= BigInt(this[offset++]) << 24n;
        bi |= BigInt(this[offset++]) << 16n;
        bi |= BigInt(this[offset++]) << 8n;
        bi |= BigInt(this[offset++]);
        return parseInt(bi);
      } else {
        var _bi2 = BigInt(0);
        _bi2 |= BigInt(this[offset++]);
        _bi2 |= BigInt(this[offset++]) << 8n;
        _bi2 |= BigInt(this[offset++]) << 16n;
        _bi2 |= BigInt(this[offset++]) << 24n;
        _bi2 |= BigInt(this[offset++]) << 32n;
        _bi2 |= BigInt(this[offset++]) << 40n;
        _bi2 |= BigInt(this[offset++]) << 48n;
        _bi2 |= BigInt(this[offset++]) << 56n;
        return parseInt(_bi2);
      }

      //var h = this.getUint32(offset);
      //var l = this.getUint32(offset + 4);
      //return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }
  }, {
    key: "setInt64",
    value: function setInt64(offset, value, endian) {
      var bi = BigInt(value);
      var _byte = BigInt(0xFF);
      if (endian == Endian.Big) {
        this[offset++] = parseInt(bi >> 56n & _byte);
        this[offset++] = parseInt(bi >> 48n & _byte);
        this[offset++] = parseInt(bi >> 40n & _byte);
        this[offset++] = parseInt(bi >> 32n & _byte);
        this[offset++] = parseInt(bi >> 24n & _byte);
        this[offset++] = parseInt(bi >> 16n & _byte);
        this[offset++] = parseInt(bi >> 8n & _byte);
        this[offset++] = parseInt(bi & _byte);
      } else {
        this[offset++] = parseInt(bi & _byte);
        this[offset++] = parseInt(bi >> 8n & _byte);
        this[offset++] = parseInt(bi >> 16n & _byte);
        this[offset++] = parseInt(bi >> 24n & _byte);
        this[offset++] = parseInt(bi >> 32n & _byte);
        this[offset++] = parseInt(bi >> 40n & _byte);
        this[offset++] = parseInt(bi >> 48n & _byte);
        this[offset++] = parseInt(bi >> 56n & _byte);
      }

      //var l = (value % TWO_PWR_32) | 0;
      //var h = (value / TWO_PWR_32) | 0;
      //this.setInt32(offset, h);
      //this.setInt32(offset + 4, l);
    }
  }, {
    key: "setUint64",
    value: function setUint64(offset, value, endian) {
      var bi = BigInt(value);
      var _byte2 = BigInt(0xFF);
      if (endian == Endian.Big) {
        this[offset++] = parseInt(bi >> 56n & _byte2);
        this[offset++] = parseInt(bi >> 48n & _byte2);
        this[offset++] = parseInt(bi >> 40n & _byte2);
        this[offset++] = parseInt(bi >> 32n & _byte2);
        this[offset++] = parseInt(bi >> 24n & _byte2);
        this[offset++] = parseInt(bi >> 16n & _byte2);
        this[offset++] = parseInt(bi >> 8n & _byte2);
        this[offset++] = parseInt(bi & _byte2);
      } else {
        this[offset++] = parseInt(bi & _byte2);
        this[offset++] = parseInt(bi >> 8n & _byte2);
        this[offset++] = parseInt(bi >> 16n & _byte2);
        this[offset++] = parseInt(bi >> 24n & _byte2);
        this[offset++] = parseInt(bi >> 32n & _byte2);
        this[offset++] = parseInt(bi >> 40n & _byte2);
        this[offset++] = parseInt(bi >> 48n & _byte2);
        this[offset++] = parseInt(bi >> 56n & _byte2);
      }

      // var l = (value % TWO_PWR_32) | 0;
      // var h = (value / TWO_PWR_32) | 0;
      // this.setInt32(offset, h);
      // this.setInt32(offset + 4, l);
    }
  }, {
    key: "setDateTime",
    value: function setDateTime(offset, value, endian) {
      if (!isNaN(value)) {
        // Unix Epoch
        var ticks = 621355968000000000 + value.getTime() * 10000;
        this.setUint64(offset, ticks, endian);
      } else {
        this.setUint64(offset, 0, endian);
      }
    }
  }, {
    key: "getDateTime",
    value: function getDateTime(offset, endian) {
      var ticks = this.getUint64(offset, endian);
      return new Date(Math.round((ticks - UNIX_EPOCH) / 10000));
    }
  }, {
    key: "getDateTimeArray",
    value: function getDateTimeArray(offset, endian) {
      var rt = [];
      for (var i = 0; i < length; i += 8) rt.push(this.getDateTime(offset + i, endian));
      return rt;
    }
  }, {
    key: "getUUID",
    value: function getUUID(offset) {
      return new _UUID["default"](this.clip(offset, 16));

      /*
      var d = this.getUint8Array(offset, 16);
      var rt = "";
      for (var i = 0; i < 16; i++) {
          rt += String.fromCharCode(d[i]);
      }
        return btoa(rt);
      */
    }
  }, {
    key: "getUUIDArray",
    value: function getUUIDArray(offset, length) {
      var rt = [];
      for (var i = 0; i < length; i += 16) rt.push(this.getUUID(offset + i));
      return rt;
    }
  }, {
    key: "sequenceEqual",
    value: function sequenceEqual(ar) {
      if (ar.length != this.length) return false;else {
        for (var i = 0; i < this.length; i++) if (ar[i] != this[i]) return false;
      }
      return true;
    }
  }], [{
    key: "uuidToBytes",
    value: function uuidToBytes(value) {
      return value.value;
    }
  }, {
    key: "boolToBytes",
    value: function boolToBytes(value) {
      var rt = new DC(1);
      rt.setBoolean(0, value);
      return rt;
    }
  }, {
    key: "int8ToBytes",
    value: function int8ToBytes(value) {
      var rt = new DC(1);
      rt.setInt8(0, value);
      return rt;
    }
  }, {
    key: "fromList",
    value: function fromList(list) {
      return new DC(list);
    }
  }, {
    key: "fromHex",
    value: function fromHex(value) {
      // convert hex to Uint8Array
      var rt = new DC(value.length / 2);
      for (var i = 0; i < rt.length; i++) rt[i] = parseInt(value.substr(i * 2, 2), 16);
      return rt;
    }
  }, {
    key: "uint8ToBytes",
    value: function uint8ToBytes(value) {
      var rt = new DC(1);
      rt.setUint8(0, value);
      return rt;
    }
  }, {
    key: "charToBytes",
    value: function charToBytes(value, endian) {
      var rt = new DC(2);
      rt.setChar(0, value, endian);
      return rt;
    }
  }, {
    key: "int16ToBytes",
    value: function int16ToBytes(value, endian) {
      var rt = new DC(2);
      rt.setInt16(0, value, endian);
      return rt;
    }
  }, {
    key: "uint16ToBytes",
    value: function uint16ToBytes(value, endian) {
      var rt = new DC(2);
      rt.setUint16(0, value, endian);
      return rt;
    }
  }, {
    key: "int32ToBytes",
    value: function int32ToBytes(value, endian) {
      var rt = new DC(4);
      rt.setInt32(0, value, endian);
      return rt;
    }
  }, {
    key: "uint32ToBytes",
    value: function uint32ToBytes(value, endian) {
      var rt = new DC(4);
      rt.setUint32(0, value, endian);
      return rt;
    }
  }, {
    key: "float32ToBytes",
    value: function float32ToBytes(value, endian) {
      var rt = new DC(4);
      rt.setFloat32(0, value, endian);
      return rt;
    }
  }, {
    key: "int64ToBytes",
    value: function int64ToBytes(value, endian) {
      var rt = new DC(8);
      rt.setInt64(0, value, endian);
      return rt;
    }
  }, {
    key: "uint64ToBytes",
    value: function uint64ToBytes(value, endian) {
      var rt = new DC(8);
      rt.setUint64(0, value, endian);
      return rt;
    }
  }, {
    key: "float64ToBytes",
    value: function float64ToBytes(value, endian) {
      var rt = new DC(8);
      rt.setFloat64(0, value, endian);
      return rt;
    }
  }, {
    key: "dateTimeToBytes",
    value: function dateTimeToBytes(value, endian) {
      var rt = new DC(8);
      rt.setDateTime(0, value, endian);
      return rt;
    }
  }, {
    key: "stringToBytes",
    value: function stringToBytes(value) {
      var utf8 = unescape(encodeURIComponent(value));
      var rt = [];
      for (var i = 0; i < utf8.length; i++) rt.push(utf8.charCodeAt(i));
      return new DC(rt);
    }
  }, {
    key: "stringArrayToBytes",
    value: function stringArrayToBytes(values) {
      var list = new _BinaryList["default"]();
      for (var i = 0; i < values.length; i++) {
        var s = DC.stringToBytes(values[i]);
        list.addUint32(s.length).addUint8Array(s);
      }
      return list.toArray();
    }
  }, {
    key: "uint16ArrayToBytes",
    value: function uint16ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 2);
      for (var i = 0; i < values.length; i++) rt.setUint16(i * 2, values[i], endian);
      return rt;
    }
  }, {
    key: "int16ArrayToBytes",
    value: function int16ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 2);
      for (var i = 0; i < values.length; i++) rt.setInt16(i * 2, values[i], endian);
      return rt;
    }
  }, {
    key: "uint32ArrayToBytes",
    value: function uint32ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 4);
      for (var i = 0; i < values.length; i++) rt.setUint32(i * 4, values[i], endian);
      return rt;
    }
  }, {
    key: "int32ArrayToBytes",
    value: function int32ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 4);
      for (var i = 0; i < values.length; i++) rt.setInt32(i * 4, values[i], endian);
      return rt;
    }
  }, {
    key: "int64ArrayToBytes",
    value: function int64ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 8);
      for (var i = 0; i < values.length; i++) rt.setInt64(i * 8, values[i], endian);
      return rt;
    }
  }, {
    key: "uint64ArrayToBytes",
    value: function uint64ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 8);
      for (var i = 0; i < values.length; i++) rt.setUint64(i * 8, values[i], endian);
      return rt;
    }
  }, {
    key: "float32ArrayToBytes",
    value: function float32ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 4);
      for (var i = 0; i < values.length; i++) rt.setFloat32(i * 4, values[i], endian);
      return rt;
    }
  }, {
    key: "float64ArrayToBytes",
    value: function float64ArrayToBytes(values, endian) {
      var rt = new DC(values.length * 8);
      for (var i = 0; i < values.length; i++) rt.setFloat64(i * 8, values[i], endian);
      return rt;
    }
  }, {
    key: "combine",
    value: function combine(a, aOffset, aLength, b, bOffset, bLength) {
      if (!(a instanceof DC)) a = new DC(a);
      if (!(b instanceof DC)) b = new DC(b);
      a = a.clip(aOffset, aLength);
      b = b.clip(bOffset, bLength);
      var rt = new DC(a.length + b.length);
      rt.set(a, 0);
      rt.set(b, a.length);
      return rt;
    }
  }]);
  return DC;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Uint8Array));
function BL() {
  return new _BinaryList["default"]();
}
;

},{"./BinaryList.js":50,"./UUID.js":73,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],53:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PropertyValueParserResults = void 0;
var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _IEnum = _interopRequireDefault(require("./IEnum.js"));
var _Tuple = _interopRequireDefault(require("./Tuple.js"));
var _TemplateType = _interopRequireDefault(require("../Resource/Template/TemplateType.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
var _DC = _interopRequireDefault(require("./DC.js"));
var _DistributedConnection = _interopRequireDefault(require("../Net/IIP/DistributedConnection.js"));
var _NotModified = _interopRequireDefault(require("./NotModified.js"));
var _RepresentationType = _interopRequireDefault(require("./RepresentationType.js"));
var _Codec = _interopRequireDefault(require("./Codec.js"));
var _TypedMap = _interopRequireDefault(require("./TypedMap.js"));
var _PropertyValueArray = _interopRequireDefault(require("./PropertyValueArray.js"));
var _PropertyValue = _interopRequireDefault(require("./PropertyValue.js"));
var _Record = _interopRequireDefault(require("./Record.js"));
var _AsyncException = _interopRequireDefault(require("../Core/AsyncException.js"));
var _ExceptionCode = _interopRequireDefault(require("../Core/ExceptionCode.js"));
var _ErrorType = _interopRequireDefault(require("../Core/ErrorType.js"));
var _ExtendedTypes = require("./ExtendedTypes.js");
var PropertyValueParserResults = exports.PropertyValueParserResults = /*#__PURE__*/(0, _createClass2["default"])(
//final int size;
///final AsyncReply<PropertyValue> reply;

function PropertyValueParserResults(size, reply) {
  (0, _classCallCheck2["default"])(this, PropertyValueParserResults);
  this.size = size;
  this.reply = reply;
});
var DataDeserializer = exports["default"] = /*#__PURE__*/function () {
  function DataDeserializer() {
    (0, _classCallCheck2["default"])(this, DataDeserializer);
  }
  (0, _createClass2["default"])(DataDeserializer, null, [{
    key: "nullParser",
    value: function nullParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](null);
    }
  }, {
    key: "booleanTrueParser",
    value: function booleanTrueParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "booleanFalseParser",
    value: function booleanFalseParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](false);
    }
  }, {
    key: "notModifiedParser",
    value: function notModifiedParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"]((0, _NotModified["default"])());
    }
  }, {
    key: "byteParser",
    value: function byteParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.UInt8(data[offset]));
    }
  }, {
    key: "sByteParser",
    value: function sByteParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.Int8(data[offset] > 127 ? data[offset] - 256 : data[offset]));
    }
  }, {
    key: "char16Parser",
    value: function char16Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.getChar(offset));
    }
  }, {
    key: "char8Parser",
    value: function char8Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](String.fromCharCode(data[offset]));
    }
  }, {
    key: "int16Parser",
    value: function int16Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.Int16(data.getInt16(offset)));
    }
  }, {
    key: "uInt16Parser",
    value: function uInt16Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.UInt16(data.getUint16(offset)));
    }
  }, {
    key: "int32Parser",
    value: function int32Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.Int32(data.getInt32(offset)));
    }
  }, {
    key: "uInt32Parser",
    value: function uInt32Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.UInt32(data.getUint32(offset)));
    }
  }, {
    key: "float32Parser",
    value: function float32Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.Float32(data.getFloat32(offset)));
    }
  }, {
    key: "float64Parser",
    value: function float64Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.getFloat64(offset));
    }
  }, {
    key: "float128Parser",
    value: function float128Parser(data, offset, length, connection, requestSequence) {
      // @TODO
      return new _AsyncReply["default"](data.getFloat64(offset));
    }
  }, {
    key: "int128Parser",
    value: function int128Parser(data, offset, length, connection, requestSequence) {
      // @TODO
      return new _AsyncReply["default"](data.getInt64(offset));
    }
  }, {
    key: "uInt128Parser",
    value: function uInt128Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.getUint64(offset));
    }
  }, {
    key: "int64Parser",
    value: function int64Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.Int64(data.getInt64(offset)));
    }
  }, {
    key: "uInt64Parser",
    value: function uInt64Parser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](new _ExtendedTypes.UInt64(data.getUint64(offset)));
    }
  }, {
    key: "dateTimeParser",
    value: function dateTimeParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.getDateTime(offset));
    }
  }, {
    key: "resourceParser",
    value: function resourceParser(data, offset, length, connection, requestSequence) {
      if (connection != null) {
        var id = data.getUint32(offset, requestSequence);
        return connection.fetch(id, requestSequence);
      }
      throw Error("Can't parse resource with no connection");
    }
  }, {
    key: "localResourceParser",
    value: function localResourceParser(data, offset, length, connection, requestSequence) {
      var id = data.getUint32(offset);
      return _Warehouse["default"].getById(id);
    }
  }, {
    key: "rawDataParser",
    value: function rawDataParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.clip(offset, length));
    }
  }, {
    key: "stringParser",
    value: function stringParser(data, offset, length, connection, requestSequence) {
      return new _AsyncReply["default"](data.getString(offset, length));
    }
  }, {
    key: "recordParser",
    value: function recordParser(data, offset, length, connection, requestSequence) {
      var reply = new _AsyncReply["default"]();
      var classId = data.getUUID(offset);
      offset += 16;
      length -= 16;
      var template = _Warehouse["default"].getTemplateByClassId(classId, _TemplateType["default"].Record);
      var initRecord = function initRecord(template) {
        DataDeserializer.listParser(data, offset, length, connection, requestSequence).then(function (ar) {
          var record;
          if (template == null) {
            reply.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].TemplateNotFound, "Template not found for record."));
            return;
          }
          if (template.definedType != null) {
            record = new template.definedType();
          } else if (template != null) {
            record = new _Record["default"]();
          }
          for (var i = 0; i < template.properties.length; i++) record[template.properties[i].name] = ar[i];
          reply.trigger(record);
        }).error(function (x) {
          reply.triggerError(x);
        });
      };
      if (template != null) {
        initRecord(template);
      } else if (connection != null) {
        connection.getTemplate(classId).then(function (tmp) {
          initRecord(tmp);
        }).error(function (x) {
          return reply.triggerError(x);
        });
      } else {
        initRecord(null);
      }
      return reply;
    }
  }, {
    key: "constantParser",
    value: function constantParser(data, offset, length, connection, requestSequence) {
      throw Error("NotImplementedException");
    }
  }, {
    key: "enumParser",
    value: function enumParser(data, offset, length, connection, requestSequence) {
      var classId = data.getUUID(offset);
      offset += 16;
      var index = data[offset++];
      var template = _Warehouse["default"].getTemplateByClassId(classId, _TemplateType["default"].Enum);
      if (template != null) {
        if (template.definedType != null) {
          var enumVal = new template.definedType();
          enumVal.index = index;
          enumVal.name = template.constants[index].name;
          enumVal.value = template.constants[index].value;
          return new _AsyncReply["default"](enumVal);
        } else {
          return new _AsyncReply["default"](new _IEnum["default"](index, template.constants[index].value, template.constants[index].name, template));
        }
      } else {
        var reply = new _AsyncReply["default"]();
        if (connection == null) throw Error("Can't parse enum with no connection");
        connection.getTemplate(classId).then(function (tmp) {
          if (tmp != null) {
            if (tmp.definedType != null) {
              var enumVal = new tmp.definedType();
              enumVal.index = index;
              enumVal.name = tmp.constants[index].name;
              enumVal.value = tmp.constants[index].value;
              reply.trigger(enumVal);
            } else {
              reply.trigger(new _IEnum["default"](index, tmp.constants[index].value, tmp.constants[index].name, tmp));
            }
          } else reply.triggerError(new Error("Template not found for enum"));
        }).error(function (x) {
          return reply.triggerError(x);
        });
        return reply;
      }
    }
  }, {
    key: "recordListParser",
    value: function recordListParser(data, offset, length, connection, requestSequence) {
      var rt = new _AsyncBag["default"]();
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        rt.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      rt.seal();
      return rt;
    }
  }, {
    key: "resourceListParser",
    value: function resourceListParser(data, offset, length, connection, requestSequence) {
      var rt = new _AsyncBag["default"]();
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        rt.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      rt.seal();
      return rt;
    }
  }, {
    key: "listParser",
    value: function listParser(data, offset, length, connection, requestSequence) {
      var rt = new _AsyncBag["default"]();
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        rt.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      rt.seal();
      return rt;
    }
  }, {
    key: "typedMapParser",
    value: function typedMapParser(data, offset, length, connection, requestSequence) {
      var _keyRep$type$getRunti, _valueRep$type$getRun;
      // get key type
      var keyRep = _RepresentationType["default"].parse(data, offset);
      offset += keyRep.size;
      length -= keyRep.size;
      var valueRep = _RepresentationType["default"].parse(data, offset);
      offset += valueRep.size;
      length -= valueRep.size;
      var map = new (_TypedMap["default"].of((_keyRep$type$getRunti = keyRep.type.getRuntimeType()) !== null && _keyRep$type$getRunti !== void 0 ? _keyRep$type$getRunti : Object, (_valueRep$type$getRun = valueRep.type.getRuntimeType()) !== null && _valueRep$type$getRun !== void 0 ? _valueRep$type$getRun : Object))();
      var rt = new _AsyncReply["default"]();
      var results = new _AsyncBag["default"]();
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        results.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      results.seal();
      results.then(function (ar) {
        for (var i = 0; i < ar.length; i += 2) map.set(ar[i], ar[i + 1]);
        rt.trigger(map);
      });
      return rt;
    }
  }, {
    key: "tupleParser",
    value: function tupleParser(data, offset, length, connection, requestSequence) {
      var results = new _AsyncBag["default"]();
      var rt = new _AsyncReply["default"]();
      var tupleSize = data[offset++];
      length--;
      var types = [];
      for (var i = 0; i < tupleSize; i++) {
        var _rep$type$getRuntimeT;
        var rep = _RepresentationType["default"].parse(data, offset, requestSequence);
        if (rep.type != null) types.push((_rep$type$getRuntimeT = rep.type.getRuntimeType()) !== null && _rep$type$getRuntimeT !== void 0 ? _rep$type$getRuntimeT : Object);
        offset += rep.size;
        length -= rep.size;
      }
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        results.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      results.seal();
      results.then(function (ar) {
        rt.trigger((0, _construct2["default"])(_Tuple["default"].of.apply(_Tuple["default"], types), (0, _toConsumableArray2["default"])(ar)));
      });
      return rt;
    }
  }, {
    key: "typedListParser",
    value: function typedListParser(data, offset, length, connection, requestSequence) {
      var rt = new _AsyncBag["default"]();

      // get the type
      var rep = _RepresentationType["default"].parse(data, offset);
      offset += rep.size;
      length -= rep.size;
      var runtimeType = rep.type.getRuntimeType();
      rt.arrayType = runtimeType;
      while (length > 0) {
        var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
        rt.add(parsed.reply);
        if (parsed.size > 0) {
          offset += parsed.size;
          length -= parsed.size;
        } else throw new Error("Error while parsing structured data");
      }
      rt.seal();
      return rt;
    }
  }, {
    key: "PropertyValueArrayParser",
    value: function PropertyValueArrayParser(data, offset, length, connection, requestSequence)
    //, bool ageIncluded = true)
    {
      var rt = new _AsyncBag["default"]();
      DataDeserializer.listParser(data, offset, length, connection, requestSequence).then(function (x) {
        var pvs = new _PropertyValueArray["default"]();
        for (var i = 0; i < x.length; i += 3) pvs.push(new _PropertyValue["default"](x[2], x[0], x[1]));
        rt.trigger(pvs);
      });
      return rt;
    }
  }, {
    key: "propertyValueParser",
    value: function propertyValueParser(data, offset, connection, requestSequence)
    //, bool ageIncluded = true)
    {
      var reply = new _AsyncReply["default"]();
      var age = data.getUint64(offset);
      offset += 8;
      var date = data.getDateTime(offset);
      offset += 8;
      var parsed = _Codec["default"].parse(data, offset, connection, requestSequence);
      parsed.reply.then(function (value) {
        reply.trigger(new _PropertyValue["default"](value, age, date));
      });
      return new PropertyValueParserResults(16 + parsed.size, reply);
    }
  }, {
    key: "historyParser",
    value: function historyParser(data, offset, length, resource, connection, requestSequence) {
      throw new Error("Not implemented");
      // @TODO
      // var list = new KeyList<PropertyTemplate, List<PropertyValue>>();

      // var reply = new AsyncReply<KeyList<PropertyTemplate, List<PropertyValue[]>>>();

      // var bagOfBags = new AsyncBag<PropertyValue[]>();

      // var ends = offset + length;
      // while (offset < ends)
      // {
      //     var index = data[offset++];
      //     var pt = resource.Instance.Template.GetPropertyTemplateByIndex(index);
      //     list.Add(pt, null);
      //     var cs = data.GetUInt32(offset);
      //     offset += 4;

      //     var (len, pv) = PropertyValueParser(data, offset, connection);

      //     bagOfBags.Add(pv);// ParsePropertyValueArray(data, offset, cs, connection));
      //     offset += len;
      // }

      // bagOfBags.Seal();

      // bagOfBags.Then(x =>
      // {
      //     for (var i = 0; i < list.Count; i++)
      //         list[list.Keys.ElementAt(i)] = x[i];

      //     reply.Trigger(list);
      // });

      // return reply;
    }
  }]);
  return DataDeserializer;
}();

},{"../Core/AsyncBag.js":39,"../Core/AsyncException.js":40,"../Core/AsyncReply.js":42,"../Core/ErrorType.js":43,"../Core/ExceptionCode.js":44,"../Net/IIP/DistributedConnection.js":77,"../Resource/Template/TemplateType.js":127,"../Resource/Warehouse.js":129,"./Codec.js":51,"./DC.js":52,"./ExtendedTypes.js":55,"./IEnum.js":56,"./NotModified.js":59,"./PropertyValue.js":62,"./PropertyValueArray.js":63,"./Record.js":64,"./RepresentationType.js":66,"./Tuple.js":70,"./TypedMap.js":72,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/construct":12,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/toConsumableArray":30}],54:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DataSerializerComposeResults = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));
var _Codec = _interopRequireDefault(require("./Codec.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
var _TransmissionType = require("./TransmissionType.js");
var _DC = _interopRequireWildcard(require("./DC.js"));
var _RepresentationType = _interopRequireDefault(require("./RepresentationType.js"));
var _Tuple = _interopRequireDefault(require("./Tuple.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } //import IRecord from './IRecord.js';
//import DistributedResource from '../Net/IIP/DistributedResource.js';
//import IResource from '../Resource/IResource.js';
//import PropertyTemplate from '../Resource/Template/PropertyTemplate.js';
//import PropertyValue from './PropertyValue.js';
//import DistributedConnection from '../Net/IIP/DistributedConnection.js';
var DataSerializerComposeResults = exports.DataSerializerComposeResults = /*#__PURE__*/(0, _createClass2["default"])(
//  int identifier;
//DC data;

function DataSerializerComposeResults(identifier, data) {
  (0, _classCallCheck2["default"])(this, DataSerializerComposeResults);
  this.identifier = identifier;
  this.data = data;
});
var DataSerializer = exports["default"] = /*#__PURE__*/function () {
  function DataSerializer() {
    (0, _classCallCheck2["default"])(this, DataSerializer);
  }
  (0, _createClass2["default"])(DataSerializer, null, [{
    key: "historyComposer",
    value:
    //public delegate byte[] Serializer(object value);

    function historyComposer(history, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      throw new Error("Not implemented");
    }
  }, {
    key: "int32Composer",
    value: function int32Composer(value, connection) {
      var rt = new _DC["default"](4);
      rt.setInt32(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Int32, rt);
    }
  }, {
    key: "uInt32Composer",
    value: function uInt32Composer(value, connection) {
      var rt = new _DC["default"](4);
      rt.setUint32(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.UInt32, rt);
    }
  }, {
    key: "int16Composer",
    value: function int16Composer(value, connection) {
      var rt = new _DC["default"](2);
      rt.setInt16(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Int16, rt);
    }
  }, {
    key: "uInt16Composer",
    value: function uInt16Composer(value, connection) {
      var rt = new _DC["default"](2);
      rt.setUint16(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.UInt16, rt);
    }
  }, {
    key: "float32Composer",
    value: function float32Composer(value, connection) {
      var rt = new _DC["default"](4);
      rt.setFloat32(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Float32, rt);
    }
  }, {
    key: "float64Composer",
    value: function float64Composer(value, connection) {
      var rt = new _DC["default"](8);
      rt.setFloat64(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Float64, rt);
    }
  }, {
    key: "int64Composer",
    value: function int64Composer(value, connection) {
      var rt = new _DC["default"](8);
      rt.setInt64(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Int64, rt);
    }
  }, {
    key: "numberComposer",
    value: function numberComposer(value, connection) {
      var rt = new _DC["default"](8);
      if (Number.isInteger(value)) {
        rt.setInt64(0, value);
        return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Int64, rt);
      } else {
        rt.setFloat64(0, value);
        return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Float64, rt);
      }
    }
  }, {
    key: "uInt64Composer",
    value: function uInt64Composer(value, connection) {
      var rt = new _DC["default"](8);
      rt.setUint64(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.UInt64, rt);
    }
  }, {
    key: "dateTimeComposer",
    value: function dateTimeComposer(value, connection) {
      var rt = new _DC["default"](8);
      rt.setDateTime(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.DateTime, rt);
    }
  }, {
    key: "float128Composer",
    value: function float128Composer(value, connection) {
      //@TODO: implement decimal
      var rt = new _DC["default"](16);
      rt.setFloat64(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Float64, rt);
    }
  }, {
    key: "stringComposer",
    value: function stringComposer(value, connection) {
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.String, _DC["default"].stringToBytes(value));
    }
  }, {
    key: "enumComposer",
    value: function enumComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var template = _Warehouse["default"].getTemplateByType(value.constructor);
      if (template == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var cts = template.constants.filter(function (x) {
        return x.value == value.value;
      });
      if (cts.length == 0) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var rt = new _BinaryList["default"]();
      rt.addUUID(template.classId);
      rt.addUint8(cts[0].index);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Enum, rt.toDC());
    }
  }, {
    key: "uInt8Composer",
    value: function uInt8Composer(value, connection) {
      var rt = new _DC["default"](1);
      rt[0] = value;
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.UInt8, rt);
    }
  }, {
    key: "int8Composer",
    value: function int8Composer(value, connection) {
      var rt = new _DC["default"](1);
      rt[0] = value;
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Int8, rt);
    }
  }, {
    key: "char8Composer",
    value: function char8Composer(value, connection) {
      var rt = new _DC["default"](1);
      rt[0] = value;
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Char8, rt);
    }
  }, {
    key: "char16Composer",
    value: function char16Composer(value, connection) {
      var rt = new _DC["default"](2);
      rt.setUint16(0, value);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Char16, rt);
    }
  }, {
    key: "boolComposer",
    value: function boolComposer(value, connection) {
      return new DataSerializerComposeResults(value ? _TransmissionType.TransmissionTypeIdentifier.True : _TransmissionType.TransmissionTypeIdentifier.False, new _DC["default"](0));
    }
  }, {
    key: "notModifiedComposer",
    value: function notModifiedComposer(value, connection) {
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.NotModified, new _DC["default"](0));
    }
  }, {
    key: "rawDataComposer",
    value: function rawDataComposer(value, connection) {
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.RawData, value);
    }
  }, {
    key: "listComposer",
    value: function listComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));else return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.List, DataSerializer.arrayComposer(value, connection));

      //var rt = new List<byte>();
      //var list = (IEnumerable)value;// ((List<object>)value);

      //foreach (var o in list)
      //    rt.AddRange(Codec.Compose(o, connection));

      //return (TransmissionTypeIdentifier.List, rt.ToArray());
    }
  }, {
    key: "typedListComposer",
    value: function typedListComposer(value, type, connection) {
      var _RepresentationType$f;
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var composed = DataSerializer.arrayComposer(value, connection);
      var header = ((_RepresentationType$f = _RepresentationType["default"].fromType(type)) !== null && _RepresentationType$f !== void 0 ? _RepresentationType$f : _RepresentationType["default"].Dynamic).compose();
      var rt = new _BinaryList["default"]().addDC(header).addDC(composed);
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.TypedList, rt.toDC());
    }
  }, {
    key: "propertyValueArrayComposer",
    value: function propertyValueArrayComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var rt = (0, _DC.BL)();
      for (var i = 0; i < value.length; i++) {
        rt.addDC(_Codec["default"].compose(value[i].age, connection));
        rt.addDC(_Codec["default"].compose(value[i].date, connection));
        rt.addDC(_Codec["default"].compose(value[i].value, connection));
      }
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.List, rt.toDC());
    }
  }, {
    key: "typedMapComposer",
    value: function typedMapComposer(value, keyType, valueType, connection) {
      var _RepresentationType$f2, _RepresentationType$f3;
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var kt = ((_RepresentationType$f2 = _RepresentationType["default"].fromType(keyType)) !== null && _RepresentationType$f2 !== void 0 ? _RepresentationType$f2 : _RepresentationType["default"].Dynamic).compose();
      var vt = ((_RepresentationType$f3 = _RepresentationType["default"].fromType(valueType)) !== null && _RepresentationType$f3 !== void 0 ? _RepresentationType$f3 : _RepresentationType["default"].Dynamic).compose();
      var rt = new _BinaryList["default"]();
      rt.addDC(kt);
      rt.addDC(vt);

      //@TODO
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
            k = _step$value[0],
            v = _step$value[1];
          rt.addDC(_Codec["default"].compose(k, connection));
          rt.addDC(_Codec["default"].compose(v, connection));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.TypedMap, rt.toDC());
    }
  }, {
    key: "arrayComposer",
    value: function arrayComposer(value, connection) {
      var rt = new _BinaryList["default"]();
      var _iterator2 = _createForOfIteratorHelper(value),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var i = _step2.value;
          rt.addDC(_Codec["default"].compose(i, connection));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return rt.toDC();
    }
  }, {
    key: "resourceListComposer",
    value: function resourceListComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.ResourceList, DataSerializer.arrayComposer(value, connection));
    }
  }, {
    key: "recordListComposer",
    value: function recordListComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.RecordList, DataSerializer.arrayComposer(value, connection));
    }
  }, {
    key: "resourceComposer",
    value: function resourceComposer(value, connection) {
      var resource = value;
      var rt = new _DC["default"](4);
      if (_Codec["default"].isLocalResource(resource, connection)) {
        var _resource$_p$instance;
        rt.setUint32(0, (_resource$_p$instance = resource._p.instanceId) !== null && _resource$_p$instance !== void 0 ? _resource$_p$instance : 0);
        return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.ResourceLocal, rt);
      } else {
        var _resource$instance$id, _resource$instance;
        // @TODO: connection.cache.Add(value as IResource, DateTime.UtcNow);
        rt.setUint32(0, (_resource$instance$id = (_resource$instance = resource.instance) === null || _resource$instance === void 0 ? void 0 : _resource$instance.id) !== null && _resource$instance$id !== void 0 ? _resource$instance$id : 0);
        return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Resource, rt);
      }
    }
  }, {
    key: "mapComposer",
    value: function mapComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var rt = (0, _BinaryList["default"])();
      for (var el in value) {
        rt.addDC(_Codec["default"].compose(el.key, connection));
        rt.addDC(_Codec["default"].compose(el.value, connection));
      }
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Map, rt.toDC());
    }
  }, {
    key: "recordComposer",
    value: function recordComposer(value, connection) {
      var rt = new _BinaryList["default"]();
      var template = _Warehouse["default"].getTemplateByType(value.constructor);
      if (template == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      rt.addDC(_DC["default"].uuidToBytes(template.classId));
      var _iterator3 = _createForOfIteratorHelper(template.properties),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pt = _step3.value;
          var propValue = value[pt.name];
          rt.addDC(_Codec["default"].compose(propValue, connection));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Record, rt.toDC());
    }

    // TODO:
    // static DataSerializerComposeResults historyComposer(KeyList<PropertyTemplate, PropertyValue[]> history,
    //                                     DistributedConnection connection, bool prependLength = false)
    // {
    //     //@TODO:Test
    //     var rt = new BinaryList();

    //     for (var i = 0; i < history.Count; i++)
    //         rt.AddUInt8(history.Keys.ElementAt(i).Index)
    //           .AddUInt8Array(Codec.Compose(history.Values.ElementAt(i), connection));

    //     if (prependLength)
    //         rt.InsertInt32(0, rt.Length);

    //     return rt.ToArray();
    // }
  }, {
    key: "tupleComposer",
    value: function tupleComposer(value, connection) {
      if (value == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));
      var rt = (0, _DC.BL)();
      var fields = _Tuple["default"].getTypes(value);
      var types = fields.map(function (x) {
        return _RepresentationType["default"].fromType(x).compose();
      });
      rt.Add(value.length);
      var _iterator4 = _createForOfIteratorHelper(types),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var t = _step4.value;
          rt.addUint8Array(t);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var composed = DataSerializer.arrayComposer(value, connection);
      if (composed == null) return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Null, new _DC["default"](0));else {
        rt.addUint8Array(composed);
        return new DataSerializerComposeResults(_TransmissionType.TransmissionTypeIdentifier.Tuple, rt.toArray());
      }
    }
  }]);
  return DataSerializer;
}();

},{"../Resource/Warehouse.js":129,"./BinaryList.js":50,"./Codec.js":51,"./DC.js":52,"./RepresentationType.js":66,"./TransmissionType.js":69,"./Tuple.js":70,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/slicedToArray":28,"@babel/runtime/helpers/typeof":33}],55:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UInt8 = exports.UInt64 = exports.UInt32 = exports.UInt16 = exports.UInt128 = exports.Int8 = exports.Int64 = exports.Int32 = exports.Int16 = exports.Int128 = exports.Float64 = exports.Float32 = exports.Float128 = exports.Char8 = exports.Char16 = void 0;
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Num = /*#__PURE__*/function (_Number) {
  (0, _inherits2["default"])(Num, _Number);
  function Num(value) {
    (0, _classCallCheck2["default"])(this, Num);
    return _callSuper(this, Num, [value]);
  }
  (0, _createClass2["default"])(Num, [{
    key: "toString",
    value: function toString() {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(Num.prototype), "toString", this).call(this);
    }
  }]);
  return Num;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Number));
var _cache = {
  writable: true,
  value: new WeakMap()
};
var Int128 = exports.Int128 = /*#__PURE__*/function (_Num2) {
  (0, _inherits2["default"])(Int128, _Num2);
  function Int128(value) {
    var _this;
    (0, _classCallCheck2["default"])(this, Int128);
    if (_classStaticPrivateFieldSpecGet(Int128, Int128, _cache2).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Int128, Int128, _cache2).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this, v);
    }
    _this = _callSuper(this, Int128, [value]);
    _classStaticPrivateFieldSpecGet(Int128, Int128, _cache2).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this)));
    return _this;
  }
  return (0, _createClass2["default"])(Int128);
}(Num);
var _cache2 = {
  writable: true,
  value: new Map()
};
var Int64 = exports.Int64 = /*#__PURE__*/function (_Num3) {
  (0, _inherits2["default"])(Int64, _Num3);
  function Int64(value) {
    var _this2;
    (0, _classCallCheck2["default"])(this, Int64);
    if (_classStaticPrivateFieldSpecGet(Int64, Int64, _cache3).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Int64, Int64, _cache3).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this2, v);
    }
    _this2 = _callSuper(this, Int64, [value]);
    _classStaticPrivateFieldSpecGet(Int64, Int64, _cache3).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this2)));
    return _this2;
  }
  return (0, _createClass2["default"])(Int64);
}(Num);
var _cache3 = {
  writable: true,
  value: new Map()
};
var Int32 = exports.Int32 = /*#__PURE__*/function (_Num4) {
  (0, _inherits2["default"])(Int32, _Num4);
  function Int32(value) {
    var _this3;
    (0, _classCallCheck2["default"])(this, Int32);
    if (_classStaticPrivateFieldSpecGet(Int32, Int32, _cache4).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Int32, Int32, _cache4).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this3, v);
    }
    _this3 = _callSuper(this, Int32, [value]);
    _classStaticPrivateFieldSpecGet(Int32, Int32, _cache4).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this3)));
    return _this3;
  }
  return (0, _createClass2["default"])(Int32);
}(Num);
var _cache4 = {
  writable: true,
  value: new Map()
};
var Int16 = exports.Int16 = /*#__PURE__*/function (_Num5) {
  (0, _inherits2["default"])(Int16, _Num5);
  function Int16(value) {
    var _this4;
    (0, _classCallCheck2["default"])(this, Int16);
    if (_classStaticPrivateFieldSpecGet(Int16, Int16, _cache5).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Int16, Int16, _cache5).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this4, v);
    }
    _this4 = _callSuper(this, Int16, [value]);
    _classStaticPrivateFieldSpecGet(Int16, Int16, _cache5).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this4)));
    return _this4;
  }
  return (0, _createClass2["default"])(Int16);
}(Num);
var _cache5 = {
  writable: true,
  value: new Map()
};
var Int8 = exports.Int8 = /*#__PURE__*/function (_Num6) {
  (0, _inherits2["default"])(Int8, _Num6);
  function Int8(value) {
    var _this5;
    (0, _classCallCheck2["default"])(this, Int8);
    if (_classStaticPrivateFieldSpecGet(Int8, Int8, _cache6).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Int8, Int8, _cache6).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this5, v);
    }
    _this5 = _callSuper(this, Int8, [value]);
    _classStaticPrivateFieldSpecGet(Int8, Int8, _cache6).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this5)));
    return _this5;
  }
  return (0, _createClass2["default"])(Int8);
}(Num);
var _cache6 = {
  writable: true,
  value: new Map()
};
var UInt128 = exports.UInt128 = /*#__PURE__*/function (_Num7) {
  (0, _inherits2["default"])(UInt128, _Num7);
  function UInt128(value) {
    var _this6;
    (0, _classCallCheck2["default"])(this, UInt128);
    if (_classStaticPrivateFieldSpecGet(UInt128, UInt128, _cache7).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(UInt128, UInt128, _cache7).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this6, v);
    }
    _this6 = _callSuper(this, UInt128, [value]);
    _classStaticPrivateFieldSpecGet(UInt128, UInt128, _cache7).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this6)));
    return _this6;
  }
  return (0, _createClass2["default"])(UInt128);
}(Num);
var _cache7 = {
  writable: true,
  value: new Map()
};
var UInt64 = exports.UInt64 = /*#__PURE__*/function (_Num8) {
  (0, _inherits2["default"])(UInt64, _Num8);
  function UInt64(value) {
    var _this7;
    (0, _classCallCheck2["default"])(this, UInt64);
    if (_classStaticPrivateFieldSpecGet(UInt64, UInt64, _cache8).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(UInt64, UInt64, _cache8).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this7, v);
    }
    _this7 = _callSuper(this, UInt64, [value]);
    _classStaticPrivateFieldSpecGet(UInt64, UInt64, _cache8).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this7)));
    return _this7;
  }
  return (0, _createClass2["default"])(UInt64);
}(Num);
var _cache8 = {
  writable: true,
  value: new Map()
};
var UInt32 = exports.UInt32 = /*#__PURE__*/function (_Num9) {
  (0, _inherits2["default"])(UInt32, _Num9);
  function UInt32(value) {
    var _this8;
    (0, _classCallCheck2["default"])(this, UInt32);
    if (_classStaticPrivateFieldSpecGet(UInt32, UInt32, _cache9).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(UInt32, UInt32, _cache9).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this8, v);
    }
    _this8 = _callSuper(this, UInt32, [value]);
    _classStaticPrivateFieldSpecGet(UInt32, UInt32, _cache9).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this8)));
    return _this8;
  }
  return (0, _createClass2["default"])(UInt32);
}(Num);
var _cache9 = {
  writable: true,
  value: new Map()
};
var UInt16 = exports.UInt16 = /*#__PURE__*/function (_Num10) {
  (0, _inherits2["default"])(UInt16, _Num10);
  function UInt16(value) {
    var _this9;
    (0, _classCallCheck2["default"])(this, UInt16);
    if (_classStaticPrivateFieldSpecGet(UInt16, UInt16, _cache10).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(UInt16, UInt16, _cache10).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this9, v);
    }
    _this9 = _callSuper(this, UInt16, [value]);
    _classStaticPrivateFieldSpecGet(UInt16, UInt16, _cache10).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this9)));
    return _this9;
  }
  return (0, _createClass2["default"])(UInt16);
}(Num);
var _cache10 = {
  writable: true,
  value: new Map()
};
var UInt8 = exports.UInt8 = /*#__PURE__*/function (_Num11) {
  (0, _inherits2["default"])(UInt8, _Num11);
  function UInt8(value) {
    var _this10;
    (0, _classCallCheck2["default"])(this, UInt8);
    if (_classStaticPrivateFieldSpecGet(UInt8, UInt8, _cache11).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(UInt8, UInt8, _cache11).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this10, v);
    }
    _this10 = _callSuper(this, UInt8, [value]);
    _classStaticPrivateFieldSpecGet(UInt8, UInt8, _cache11).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this10)));
    return _this10;
  }
  return (0, _createClass2["default"])(UInt8);
}(Num);
var _cache11 = {
  writable: true,
  value: new Map()
};
var Float32 = exports.Float32 = /*#__PURE__*/function (_Num12) {
  (0, _inherits2["default"])(Float32, _Num12);
  function Float32(value) {
    var _this11;
    (0, _classCallCheck2["default"])(this, Float32);
    if (_classStaticPrivateFieldSpecGet(Float32, Float32, _cache12).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Float32, Float32, _cache12).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this11, v);
    }
    _this11 = _callSuper(this, Float32, [value]);
    _classStaticPrivateFieldSpecGet(Float32, Float32, _cache12).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this11)));
    return _this11;
  }
  return (0, _createClass2["default"])(Float32);
}(Num);
var _cache12 = {
  writable: true,
  value: new Map()
};
var Float64 = exports.Float64 = /*#__PURE__*/function (_Num13) {
  (0, _inherits2["default"])(Float64, _Num13);
  function Float64(value) {
    var _this12;
    (0, _classCallCheck2["default"])(this, Float64);
    if (_classStaticPrivateFieldSpecGet(Float64, Float64, _cache13).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Float64, Float64, _cache13).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this12, v);
    }
    _this12 = _callSuper(this, Float64, [value]);
    _classStaticPrivateFieldSpecGet(Float64, Float64, _cache13).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this12)));
    return _this12;
  }
  return (0, _createClass2["default"])(Float64);
}(Num);
var _cache13 = {
  writable: true,
  value: new Map()
};
var Float128 = exports.Float128 = /*#__PURE__*/function (_Num14) {
  (0, _inherits2["default"])(Float128, _Num14);
  function Float128(value) {
    var _this13;
    (0, _classCallCheck2["default"])(this, Float128);
    if (_classStaticPrivateFieldSpecGet(Float128, Float128, _cache14).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Float128, Float128, _cache14).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this13, v);
    }
    _this13 = _callSuper(this, Float128, [value]);
    _classStaticPrivateFieldSpecGet(Float128, Float128, _cache14).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this13)));
    return _this13;
  }
  return (0, _createClass2["default"])(Float128);
}(Num);
var _cache14 = {
  writable: true,
  value: new Map()
};
var Char16 = exports.Char16 = /*#__PURE__*/function (_String) {
  (0, _inherits2["default"])(Char16, _String);
  function Char16(value) {
    var _this14;
    (0, _classCallCheck2["default"])(this, Char16);
    if (_classStaticPrivateFieldSpecGet(Char16, Char16, _cache15).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Char16, Char16, _cache15).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this14, v);
    }
    _this14 = _callSuper(this, Char16, [value]);
    _classStaticPrivateFieldSpecGet(Char16, Char16, _cache15).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this14)));
    return _this14;
  }
  return (0, _createClass2["default"])(Char16);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(String));
var _cache15 = {
  writable: true,
  value: new Map()
};
var Char8 = exports.Char8 = /*#__PURE__*/function (_String2) {
  (0, _inherits2["default"])(Char8, _String2);
  function Char8(value) {
    var _this15;
    (0, _classCallCheck2["default"])(this, Char8);
    if (_classStaticPrivateFieldSpecGet(Char8, Char8, _cache16).has(value)) {
      var v = _classStaticPrivateFieldSpecGet(Char8, Char8, _cache16).get(value).deref();
      if (v != null) return (0, _possibleConstructorReturn2["default"])(_this15, v);
    }
    _this15 = _callSuper(this, Char8, [value]);
    _classStaticPrivateFieldSpecGet(Char8, Char8, _cache16).set(value, new WeakRef((0, _assertThisInitialized2["default"])(_this15)));
    return _this15;
  }
  return (0, _createClass2["default"])(Char8);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(String));
var _cache16 = {
  writable: true,
  value: new Map()
};

},{"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],56:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
//import TemplateDescriber from '../Resource/Template/TemplateDescriber.js';
var IEnum = exports["default"] = /*#__PURE__*/function () {
  function IEnum(index, value, name, template) {
    (0, _classCallCheck2["default"])(this, IEnum);
    this.index = index;
    this.value = value;
    this.name = name;
    this.template = template;
  }

  // get template () {
  //     //return new TemplateDescriber("IEnum");
  // }
  (0, _createClass2["default"])(IEnum, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, "<").concat(this.value, ">");
    }
  }]);
  return IEnum;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],57:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var IRecord = exports["default"] = /*#__PURE__*/function () {
  function IRecord() {
    (0, _classCallCheck2["default"])(this, IRecord);
  }
  (0, _createClass2["default"])(IRecord, [{
    key: "toString",
    value: function toString() {
      //return serialize().toString();
    }
  }]);
  return IRecord;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],58:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 06/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _IDestructible = _interopRequireDefault(require("../Core/IDestructible.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _item_destroyed = /*#__PURE__*/new WeakMap();
var KeyList = exports["default"] = /*#__PURE__*/function () {
  function KeyList() {
    (0, _classCallCheck2["default"])(this, KeyList);
    _classPrivateFieldInitSpec(this, _item_destroyed, {
      writable: true,
      value: function value(sender) {
        for (var i = 0; i < this.values.length; i++) if (sender == this.values[i]) {
          this.removeAt(i);
          break;
        }
      }
    });
    this.keys = [];
    this.values = [];
  }
  (0, _createClass2["default"])(KeyList, [{
    key: "toObject",
    value: function toObject() {
      var rt = {};
      for (var i = 0; i < this.keys.length; i++) rt[this.keys[i]] = this.values[i];
      return rt;
    }
  }, {
    key: "at",
    value: function at(index) {
      return this.values[index];
    }
  }, {
    key: "item",
    value: function item(key) {
      for (var i = 0; i < this.keys.length; i++) if (this.keys[i] == key) return this.values[i];
    }
  }, {
    key: "get",
    value: function get(key) {
      if (key.valueOf != null) key = key.valueOf();
      for (var i = 0; i < this.keys.length; i++) if (this.keys[i].valueOf != null) if (this.keys[i].valueOf() == key) return this.values[i];
    }
  }, {
    key: "add",
    value: function add(key, value) {
      this.remove(key);
      if (value instanceof _IDestructible["default"]) value.on("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed), this);
      this.keys.push(key);
      this.values.push(value);
    }
  }, {
    key: "contains",
    value: function contains(key) {
      for (var i = 0; i < this.keys.length; i++) if (this.keys[i] == key) return true;
      return false;
    }
  }, {
    key: "containsKey",
    value: function containsKey(key) {
      return this.contains(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.remove(key);
      this.add(key, value);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      for (var i = 0; i < this.keys.length; i++) if (key == this.keys[i]) {
        this.removeAt(i);
        break;
      }
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      if (this.values[index] instanceof _IDestructible["default"]) this.values[index].off("destroy", (0, _classPrivateFieldGet2["default"])(this, _item_destroyed));
      this.keys.splice(index, 1);
      this.values.splice(index, 1);
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this.length > 0) this.removeAt(0);
    }
  }, {
    key: "first",
    value: function first(selector) {
      var _iterator = _createForOfIteratorHelper(this.values),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;
          if (selector(v)) return v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "filter",
    value: function filter(selector) {
      if (selector instanceof Function) {
        return this.values.filter(selector);
      } else {
        var match = function match(small, big) {
          if (small == big) {
            return true;
          } else if ((0, _typeof2["default"])(small) == "object" && (0, _typeof2["default"])(big) == "object" && small != null && big != null) {
            if (small.constructor.name == "Object") {
              for (var i in small) if (!match(small[i], big[i])) return false;
              return true;
            } else {
              return false;
            }
          } else return false;
        };
        return this.values.filter(function (x) {
          return match(selector, x);
        });
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this.keys.length;
    }
  }]);
  return KeyList;
}();

},{"../Core/IDestructible.js":45,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/classPrivateFieldGet":10,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/typeof":33}],59:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 26/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var NotModified = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function NotModified() {
  (0, _classCallCheck2["default"])(this, NotModified);
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],60:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Nullable = exports["default"] = /*#__PURE__*/function () {
  function Nullable() {
    (0, _classCallCheck2["default"])(this, Nullable);
  }
  (0, _createClass2["default"])(Nullable, null, [{
    key: "getType",
    value: function getType(nullableType) {
      return nullableType.constructor.underlyingType;
    }
  }, {
    key: "of",
    value: function of(type) {
      if (type.isNullable) return type;
      if (Nullable.cache[type] != null) return Nullable.cache[type];
      var c = /*#__PURE__*/function (_type) {
        (0, _inherits2["default"])(c, _type);
        function c() {
          (0, _classCallCheck2["default"])(this, c);
          return _callSuper(this, c, arguments);
        }
        return (0, _createClass2["default"])(c);
      }(type);
      Object.defineProperty(c, "isNullable", {
        value: true
      });
      Object.defineProperty(c, "underlyingType", {
        value: type
      });
      Nullable.cache[type] = c;
      return c;
    }
  }]);
  return Nullable;
}();
(0, _defineProperty2["default"])(Nullable, "cache", {});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],61:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var ParseResult = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function ParseResult(size, value) {
  (0, _classCallCheck2["default"])(this, ParseResult);
  this.size = size;
  this.value = value;
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],62:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 06/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var PropertyValue = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function PropertyValue(value, age, date) {
  (0, _classCallCheck2["default"])(this, PropertyValue);
  this.value = value;
  this.age = age;
  this.date = date;
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],63:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PropertyValueArray = exports["default"] = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(PropertyValueArray, _Array);
  function PropertyValueArray() {
    (0, _classCallCheck2["default"])(this, PropertyValueArray);
    return _callSuper(this, PropertyValueArray, arguments);
  }
  return (0, _createClass2["default"])(PropertyValueArray);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],64:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IRecord2 = _interopRequireDefault(require("./IRecord.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*
* Copyright (c) 2017-2021 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/ /**
 * Created by Ahmed Zamil on 06/13/2021.
 */
var Record = exports["default"] = /*#__PURE__*/function (_IRecord) {
  (0, _inherits2["default"])(Record, _IRecord);
  function Record() {
    (0, _classCallCheck2["default"])(this, Record);
    return _callSuper(this, Record, arguments);
  }
  return (0, _createClass2["default"])(Record);
}(_IRecord2["default"]);

},{"./IRecord.js":57,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],65:[function(require,module,exports){
/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 26/08/2017. 
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _IRecord = _interopRequireDefault(require("./IRecord.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var RecordArray = exports["default"] = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(RecordArray, _Array);
  function RecordArray() {
    (0, _classCallCheck2["default"])(this, RecordArray);
    return _callSuper(this, RecordArray, arguments);
  }
  (0, _createClass2["default"])(RecordArray, [{
    key: "push",
    value: function push(value) {
      if (value instanceof _IRecord["default"]) (0, _get2["default"])((0, _getPrototypeOf2["default"])(RecordArray.prototype), "push", this).call(this, value);else return;
    }
  }]);
  return RecordArray;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));

},{"./IRecord.js":57,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],66:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RepresentationTypeParseResults = exports.RepresentationTypeIdentifier = exports.RepresentationType = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _TemplateType = _interopRequireDefault(require("../Resource/Template/TemplateType.js"));
var _IRecord = _interopRequireDefault(require("./IRecord.js"));
var _IResource = _interopRequireDefault(require("../Resource/IResource.js"));
var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));
var _DC = _interopRequireDefault(require("./DC.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
var _ExtendedTypes = require("./ExtendedTypes.js");
var _Nullable = _interopRequireDefault(require("./Nullable.js"));
var _IEnum = _interopRequireDefault(require("./IEnum.js"));
var _TypedList = _interopRequireDefault(require("./TypedList.js"));
var _TypedMap = _interopRequireDefault(require("./TypedMap.js"));
var _RecordArray = _interopRequireDefault(require("./RecordArray.js"));
var _ResourceArray = _interopRequireDefault(require("./ResourceArray.js"));
var _Tuple = _interopRequireDefault(require("./Tuple.js"));
var _Void = _interopRequireDefault(require("./Void.js"));
var RepresentationTypeIdentifier = exports.RepresentationTypeIdentifier = {
  Void: 0x0,
  Dynamic: 0x1,
  Bool: 0x2,
  UInt8: 0x3,
  Int8: 0x4,
  Char: 0x5,
  UInt16: 0x6,
  Int16: 0x7,
  UInt32: 0x8,
  Int32: 0x9,
  Float32: 0xA,
  UInt64: 0xB,
  Int64: 0xC,
  Float64: 0xD,
  DateTime: 0xE,
  UInt128: 0xF,
  Int128: 0x10,
  Decimal: 0x11,
  String: 0x12,
  RawData: 0x13,
  Resource: 0x14,
  Record: 0x15,
  List: 0x16,
  Map: 0x17,
  Enum: 0x44,
  TypedResource: 0x45,
  // Followed by UUID
  TypedRecord: 0x46,
  // Followed by UUID
  TypedList: 0x48,
  // Followed by element type
  Tuple2: 0x50,
  // Followed by element type
  TypedMap: 0x51,
  // Followed by key type and value type
  Tuple3: 0x58,
  Tuple4: 0x60,
  Tuple5: 0x68,
  Tuple6: 0x70,
  Tuple7: 0x78
};
var IdentifierToTypeMap = {};
IdentifierToTypeMap[RepresentationTypeIdentifier.Void] = _Void["default"];
IdentifierToTypeMap[RepresentationTypeIdentifier.Dynamic] = Object;
IdentifierToTypeMap[RepresentationTypeIdentifier.Bool] = Boolean;
IdentifierToTypeMap[RepresentationTypeIdentifier.Char] = _ExtendedTypes.Char8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Char16] = _ExtendedTypes.Char16;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt8] = _ExtendedTypes.UInt8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int8] = _ExtendedTypes.Int8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int16] = _ExtendedTypes.Int16;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt16] = _ExtendedTypes.UInt16;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int32] = _ExtendedTypes.Int32;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt32] = _ExtendedTypes.UInt32;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int64] = _ExtendedTypes.Int64;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt64] = _ExtendedTypes.UInt64;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int128] = _ExtendedTypes.Int128;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt128] = _ExtendedTypes.UInt128;
IdentifierToTypeMap[RepresentationTypeIdentifier.Float32] = _ExtendedTypes.Float32;
IdentifierToTypeMap[RepresentationTypeIdentifier.Float64] = _ExtendedTypes.Float64;
IdentifierToTypeMap[RepresentationTypeIdentifier.Decimal] = _ExtendedTypes.Float128;
IdentifierToTypeMap[RepresentationTypeIdentifier.String] = String;
IdentifierToTypeMap[RepresentationTypeIdentifier.DateTime] = Date;
IdentifierToTypeMap[RepresentationTypeIdentifier.Resource] = _IResource["default"];
IdentifierToTypeMap[RepresentationTypeIdentifier.Record] = _IRecord["default"];
IdentifierToTypeMap[RepresentationTypeIdentifier.List] = Array;
IdentifierToTypeMap[RepresentationTypeIdentifier.Map] = Map;
IdentifierToTypeMap[RepresentationTypeIdentifier.ResourceArray] = _ResourceArray["default"];
IdentifierToTypeMap[RepresentationTypeIdentifier.RecordArray] = _RecordArray["default"];
IdentifierToTypeMap[RepresentationTypeIdentifier.RawData] = Uint8Array;
var TypeToIdentifierMap = {};
TypeToIdentifierMap[_Void["default"]] = RepresentationTypeIdentifier.Void;
TypeToIdentifierMap[Object] = RepresentationTypeIdentifier.Dynamic;
TypeToIdentifierMap[Boolean] = RepresentationTypeIdentifier.Bool;
TypeToIdentifierMap[_ExtendedTypes.Char8] = RepresentationTypeIdentifier.Char;
TypeToIdentifierMap[_ExtendedTypes.Char16] = RepresentationTypeIdentifier.Char16;
TypeToIdentifierMap[_ExtendedTypes.UInt8] = RepresentationTypeIdentifier.UInt8;
TypeToIdentifierMap[_ExtendedTypes.Int8] = RepresentationTypeIdentifier.Int8;
TypeToIdentifierMap[_ExtendedTypes.Int16] = RepresentationTypeIdentifier.Int16;
TypeToIdentifierMap[_ExtendedTypes.UInt16] = RepresentationTypeIdentifier.UInt16;
TypeToIdentifierMap[_ExtendedTypes.Int32] = RepresentationTypeIdentifier.Int32;
TypeToIdentifierMap[_ExtendedTypes.UInt32] = RepresentationTypeIdentifier.UInt32;
TypeToIdentifierMap[_ExtendedTypes.Int64] = RepresentationTypeIdentifier.Int64;
TypeToIdentifierMap[_ExtendedTypes.UInt64] = RepresentationTypeIdentifier.UInt64;
TypeToIdentifierMap[_ExtendedTypes.Int128] = RepresentationTypeIdentifier.Int128;
TypeToIdentifierMap[_ExtendedTypes.UInt128] = RepresentationTypeIdentifier.UInt128;
TypeToIdentifierMap[_ExtendedTypes.Float32] = RepresentationTypeIdentifier.Float32;
TypeToIdentifierMap[_ExtendedTypes.Float64] = RepresentationTypeIdentifier.Float64;
TypeToIdentifierMap[_ExtendedTypes.Float128] = RepresentationTypeIdentifier.Decimal;
TypeToIdentifierMap[String] = RepresentationTypeIdentifier.String;
TypeToIdentifierMap[Date] = RepresentationTypeIdentifier.DateTime;
TypeToIdentifierMap[_IResource["default"]] = RepresentationTypeIdentifier.Resource;
TypeToIdentifierMap[_IRecord["default"]] = RepresentationTypeIdentifier.Record;
TypeToIdentifierMap[Array] = RepresentationTypeIdentifier.List;
TypeToIdentifierMap[Map] = RepresentationTypeIdentifier.Map;
TypeToIdentifierMap[_RecordArray["default"]] = RepresentationTypeIdentifier.RecordArray;
TypeToIdentifierMap[_ResourceArray["default"]] = RepresentationTypeIdentifier.ResourceArray;
TypeToIdentifierMap[Uint8Array] = RepresentationTypeIdentifier.RawData;
var TupleIdentifierByLength = {
  2: RepresentationTypeIdentifier.Tuple2,
  3: RepresentationTypeIdentifier.Tuple3,
  4: RepresentationTypeIdentifier.Tuple4,
  5: RepresentationTypeIdentifier.Tuple5,
  6: RepresentationTypeIdentifier.Tuple6,
  7: RepresentationTypeIdentifier.Tuple7
};
var RepresentationTypeParseResults = exports.RepresentationTypeParseResults = /*#__PURE__*/(0, _createClass2["default"])(
//RepresentationType type;
//int size;
function RepresentationTypeParseResults(size, type) {
  (0, _classCallCheck2["default"])(this, RepresentationTypeParseResults);
  this.size = size;
  this.type = type;
});
var RepresentationType = exports.RepresentationType = exports["default"] = /*#__PURE__*/function () {
  function RepresentationType(identifier, nullable, uuid, subTypes) {
    (0, _classCallCheck2["default"])(this, RepresentationType);
    this.identifier = identifier;
    this.nullable = nullable;
    this.uuid = uuid;
    this.subTypes = subTypes;
  }
  (0, _createClass2["default"])(RepresentationType, [{
    key: "getRuntimeType",
    value: function getRuntimeType() {
      var runtimeType = null;
      if (IdentifierToTypeMap[this.identifier] != undefined) runtimeType = IdentifierToTypeMap[this.identifier];
      if (this.identifier == RepresentationTypeIdentifier.TypedResource) {
        var _Warehouse$getTemplat;
        runtimeType = (_Warehouse$getTemplat = _Warehouse["default"].getTemplateByClassId(this.uuid, _TemplateType["default"].Resource)) === null || _Warehouse$getTemplat === void 0 ? void 0 : _Warehouse$getTemplat.definedType;
      } else if (this.identifier == RepresentationTypeIdentifier.TypedRecord) {
        var _Warehouse$getTemplat2;
        runtimeType = (_Warehouse$getTemplat2 = _Warehouse["default"].getTemplateByClassId(this.uuid, _TemplateType["default"].Record)) === null || _Warehouse$getTemplat2 === void 0 ? void 0 : _Warehouse$getTemplat2.definedType;
      } else if (this.identifier == RepresentationTypeIdentifier.Enum) {
        var _Warehouse$getTemplat3;
        runtimeType = (_Warehouse$getTemplat3 = _Warehouse["default"].getTemplateByClassId(this.uuid, _TemplateType["default"].Enum)) === null || _Warehouse$getTemplat3 === void 0 ? void 0 : _Warehouse$getTemplat3.definedType;
      } else if (this.identifier == RepresentationTypeIdentifier.TypedList) {
        var elementType = this.subTypes[0].getRuntimeType();
        runtimeType = _TypedList["default"].of(elementType);
      } else if (this.identifier == RepresentationTypeIdentifier.TypedMap) {
        var keyType = this.subTypes[0].getRuntimeType();
        var valueType = this.subTypes[1].getRuntimeType();
        runtimeType = _TypedMap["default"].of(keyType, valueType);
      } else if (this.identifier == RepresentationTypeIdentifier.Tuple2 || this.identifier == RepresentationTypeIdentifier.Tuple3 || this.identifier == RepresentationTypeIdentifier.Tuple4 || this.identifier == RepresentationTypeIdentifier.Tuple5 || this.identifier == RepresentationTypeIdentifier.Tuple6 || this.identifier == RepresentationTypeIdentifier.Tuple7) {
        var subs = this.subTypes.map(function (x) {
          return x.getRuntimeType();
        });
        runtimeType = _Tuple["default"].of.apply(_Tuple["default"], (0, _toConsumableArray2["default"])(subs));
      }
      if (this.nullable) return _Nullable["default"].of(runtimeType);else return runtimeType;
    }
  }, {
    key: "toNullable",
    value: function toNullable() {
      return new RepresentationType(this.identifier, true, this.uuid, this.subTypes);
    }
  }, {
    key: "compose",
    value: function compose() {
      var rt = new _BinaryList["default"]();
      if (this.nullable) rt.addUint8(0x80 | this.identifier);else rt.addUint8(this.identifier);
      if (this.uuid != null) rt.addDC(_DC["default"].uuidToBytes(this.uuid));
      if (this.subTypes != null) for (var i = 0; i < this.subTypes.length; i++) rt.addDC(this.subTypes[i].compose());
      return rt.toDC();
    }

    //public override string ToString() => Identifier.ToString() + (Nullable ? "?" : "")
    //      + TypeTemplate != null ? "<" + TypeTemplate.ClassName + ">" : "";
  }], [{
    key: "Void",
    get: function get() {
      return new RepresentationType(RepresentationTypeIdentifier.Void, true, null, null);
    }
  }, {
    key: "Dynamic",
    get: function get() {
      return new RepresentationType(RepresentationTypeIdentifier.Dynamic, true, null, null);
    }
  }, {
    key: "fromType",
    value: function fromType(type) {
      if (type == null) throw new Error("Type can't be null.");
      var nullable = type.isNullable;
      if (nullable) type = type.underlyingType; // original type

      var identifier = TypeToIdentifierMap[type];
      if (identifier != null) return new RepresentationType(identifier, null);
      if (type.prototype instanceof _IResource["default"]) {
        var template = _Warehouse["default"].getTemplateByType(type);
        return new RepresentationType(RepresentationTypeIdentifier.TypedResource, nullable, template.classId);
      } else if (type.prototype instanceof _IRecord["default"]) {
        var _template = _Warehouse["default"].getTemplateByType(type);
        return new RepresentationType(RepresentationTypeIdentifier.TypedRecord, nullable, _template.classId);
      } else if (type.prototype instanceof _IEnum["default"]) {
        var _template2 = _Warehouse["default"].getTemplateByType(type);
        return new RepresentationType(RepresentationTypeIdentifier.Enum, nullable, _template2.classId);
      } else if (type.prototype instanceof _TypedList["default"]) {
        var elementType = RepresentationType.fromType(type.elementType);
        return new RepresentationType(RepresentationTypeIdentifier.TypedList, null, null, [elementType]);
      } else if (type.prototype instanceof _TypedMap["default"]) {
        var keyType = RepresentationType.fromType(type.keyType);
        var valueType = RepresentationType.fromType(type.valueType);
        return new RepresentationType(RepresentationTypeIdentifier.TypedMap, null, null, [keyType, valueType]);
      } else if (type.prototype instanceof _Tuple["default"]) {
        var subs = type.subTypes.map(function (x) {
          return RepresentationType.fromType(x);
        });
        return new RepresentationType(TupleIdentifierByLength[subs.length], nullable, null, subs);
      }
      return null;
    }
  }, {
    key: "parse",
    value: function parse(data, offset) {
      var oOffset = offset;
      var header = data[offset++];
      var nullable = (header & 0x80) > 0;
      var identifier = header & 0x7F;
      if ((header & 0x40) > 0) {
        var hasUUID = (header & 0x4) > 0;
        var subsCount = header >> 3 & 0x7;
        var uuid = null;
        if (hasUUID) {
          uuid = data.getUUID(offset);
          offset += 16;
        }
        var subs = [];
        for (var i = 0; i < subsCount; i++) {
          var parsed = RepresentationType.parse(data, offset);
          subs.push(parsed.type);
          offset += parsed.size;
        }
        return new RepresentationTypeParseResults(offset - oOffset, new RepresentationType(identifier, nullable, uuid, subs));
      } else {
        return new RepresentationTypeParseResults(1, new RepresentationType(identifier, nullable, null, null));
      }
    }
  }]);
  return RepresentationType;
}();

},{"../Resource/IResource.js":115,"../Resource/Template/TemplateType.js":127,"../Resource/Warehouse.js":129,"./BinaryList.js":50,"./DC.js":52,"./ExtendedTypes.js":55,"./IEnum.js":56,"./IRecord.js":57,"./Nullable.js":60,"./RecordArray.js":65,"./ResourceArray.js":67,"./Tuple.js":70,"./TypedList.js":71,"./TypedMap.js":72,"./Void.js":74,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/toConsumableArray":30}],67:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 26/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _IResource = _interopRequireDefault(require("../Resource/IResource.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ResourceArray = exports["default"] = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(ResourceArray, _Array);
  function ResourceArray() {
    (0, _classCallCheck2["default"])(this, ResourceArray);
    return _callSuper(this, ResourceArray, arguments);
  }
  (0, _createClass2["default"])(ResourceArray, [{
    key: "push",
    value: function push(value) {
      if (value instanceof _IResource["default"]) (0, _get2["default"])((0, _getPrototypeOf2["default"])(ResourceArray.prototype), "push", this).call(this, value);else return;
    }
  }]);
  return ResourceArray;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));

},{"../Resource/IResource.js":115,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Dynamic: 0x0,
  Static: 0x10,
  Wrapper: 0x20
};

},{}],69:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TransmissionTypeParseResults = exports.TransmissionTypeIdentifier = exports.TransmissionTypeClass = exports.TransmissionType = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _DC = _interopRequireDefault(require("./DC.js"));
var TransmissionTypeIdentifier = exports.TransmissionTypeIdentifier = {
  Null: 0x0,
  False: 0x1,
  True: 0x2,
  NotModified: 0x3,
  UInt8: 0x8,
  Int8: 0x9,
  Char8: 0xA,
  Int16: 0x10,
  UInt16: 0x11,
  Char16: 0x12,
  Int32: 0x18,
  UInt32: 0x19,
  Float32: 0x1A,
  Resource: 0x1B,
  ResourceLocal: 0x1C,
  Int64: 0x20,
  UInt64: 0x21,
  Float64: 0x22,
  DateTime: 0x23,
  Int128: 0x28,
  UInt128: 0x29,
  Float128: 0x2A,
  RawData: 0x40,
  String: 0x41,
  List: 0x42,
  ResourceList: 0x43,
  RecordList: 0x44,
  Map: 0x45,
  MapList: 0x46,
  //Tuple = 0x47,

  Record: 0x80,
  TypedList: 0x81,
  TypedMap: 0x82,
  Tuple: 0x83,
  Enum: 0x84,
  Constant: 0x85
};
var TransmissionTypeClass = exports.TransmissionTypeClass = {
  Fixed: 0,
  Dynamic: 1,
  Typed: 2
};
var TransmissionTypeParseResults = exports.TransmissionTypeParseResults = /*#__PURE__*/(0, _createClass2["default"])(function TransmissionTypeParseResults(size, type) {
  (0, _classCallCheck2["default"])(this, TransmissionTypeParseResults);
  this.size = size;
  this.type = type;
});
var TransmissionType = exports.TransmissionType = exports["default"] = /*#__PURE__*/function () {
  function TransmissionType(identifier, classType, index, offset, contentLength) {
    var exponent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    (0, _classCallCheck2["default"])(this, TransmissionType);
    this.identifier = identifier;
    this.classType = classType;
    this.index = index;
    this.offset = offset;
    this.contentLength = contentLength;
    this.exponent = exponent;
  }
  (0, _createClass2["default"])(TransmissionType, null, [{
    key: "Null",
    get:
    //   final int identifier;
    //   final int index;
    //   final int classType;
    //   final int offset;
    //   final int contentLength;
    //   final int exponent;

    function get() {
      return new TransmissionType(TransmissionTypeIdentifier.Null, 0, 0, 0, 0);
    }
  }, {
    key: "compose",
    value: function compose(identifier, data) {
      if (data.length == 0) return _DC["default"].fromList([identifier]);
      var cls = identifier >> 6;
      if (cls == TransmissionTypeClass.Fixed) {
        return _DC["default"].combine([identifier], 0, 1, data, 0, data.length);
      } else {
        var len = data.length;
        if (len == 0) {
          return _DC["default"].fromList([identifier]);
        } else if (len <= 0xFF) {
          var rt = new _DC["default"](2 + len);
          rt[0] = identifier | 0x8;
          rt[1] = len;
          rt.set(data, 2);
          return rt;
        } else if (len <= 0xFFFF) {
          var _rt = new _DC["default"](3 + len);
          _rt[0] = identifier | 0x10;
          _rt[1] = len >> 8 & 0xFF;
          _rt[2] = len & 0xFF;
          _rt.set(data, 3);
          return _rt;
        } else if (len <= 0xFFFFFF) {
          var _rt2 = new _DC["default"](4 + len);
          _rt2[0] = identifier | 0x18;
          _rt2[1] = len >> 16 & 0xFF;
          _rt2[2] = len >> 8 & 0xFF;
          _rt2[3] = len & 0xFF;
          _rt2.set(data, 4);
          return _rt2;
        } else if (len <= 0xFFFFFFFF) {
          var _rt3 = new _DC["default"](5 + len);
          _rt3[0] = identifier | 0x20;
          _rt3[1] = len >> 24 & 0xFF;
          _rt3[2] = len >> 16 & 0xFF;
          _rt3[3] = len >> 8 & 0xFF;
          _rt3[4] = len & 0xFF;
          _rt3.set(data, 5);
          return _rt3;
        } else if (len <= 0xFFFFFFFFFF) {
          var _rt4 = new _DC["default"](6 + len);
          _rt4[0] = identifier | 0x28;
          _rt4[1] = len >> 32 & 0xFF;
          _rt4[2] = len >> 24 & 0xFF;
          _rt4[3] = len >> 16 & 0xFF;
          _rt4[4] = len >> 8 & 0xFF;
          _rt4[5] = len & 0xFF;
          _rt4.set(data, 6);
          return _rt4;
        } else if (len <= 0xFFFFFFFFFFFF) {
          var _rt5 = new _DC["default"](7 + len);
          _rt5[0] = identifier | 0x30;
          _rt5[1] = len >> 40 & 0xFF;
          _rt5[2] = len >> 32 & 0xFF;
          _rt5[3] = len >> 24 & 0xFF;
          _rt5[4] = len >> 16 & 0xFF;
          _rt5[5] = len >> 8 & 0xFF;
          _rt5[6] = len & 0xFF;
          _rt5.set(data, 7);
          return _rt5;
        } else
          //if (len <= 0xFF_FF_FF_FF_FF_FF_FF)
          {
            var _rt6 = new _DC["default"](8 + len);
            _rt6[0] = identifier | 0x38;
            _rt6[1] = len >> 48 & 0xFF;
            _rt6[2] = len >> 40 & 0xFF;
            _rt6[3] = len >> 32 & 0xFF;
            _rt6[4] = len >> 24 & 0xFF;
            _rt6[5] = len >> 16 & 0xFF;
            _rt6[6] = len >> 8 & 0xFF;
            _rt6[7] = len & 0xFF;
            data.set(data, 8);
            return _rt6;
          }
      }
    }
  }, {
    key: "parse",
    value: function parse(data, offset, ends) {
      var h = data[offset++];
      var cls = h >> 6;
      if (cls == TransmissionTypeClass.Fixed) {
        var exp = (h & 0x38) >> 3;
        if (exp == 0) return new TransmissionTypeParseResults(1, new TransmissionType(h, cls, h & 0x7, 0, exp));
        var cl = 1 << exp - 1;
        if (ends - offset < cl) return new TransmissionTypeParseResults(cl - (ends - offset), null);
        return new TransmissionTypeParseResults(1 + cl, new TransmissionType(h, cls, h & 0x7, offset, cl, exp));
      } else {
        var cll = h >> 3 & 0x7;
        if (ends - offset < cll) return new TransmissionTypeParseResults(cll - (ends - offset), null);
        var _cl = 0;
        for (var i = 0; i < cll; i++) _cl = _cl << 8 | data[offset++];
        if (ends - offset < _cl) return new TransmissionTypeParseResults(_cl - (ends - offset), null);
        return new TransmissionTypeParseResults(1 + _cl + cll, new TransmissionType(h & 0xC7, cls, h & 0x7, offset, _cl));
      }
    }
  }]);
  return TransmissionType;
}();

},{"./DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],70:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Tuple = exports["default"] = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(Tuple, _Array);
  function Tuple() {
    (0, _classCallCheck2["default"])(this, Tuple);
    return _callSuper(this, Tuple, arguments);
  }
  (0, _createClass2["default"])(Tuple, null, [{
    key: "getTypes",
    value: function getTypes(tuple) {
      return tuple.constructor.subTypes;
    }
  }, {
    key: "of",
    value: function of() {
      var types = [];
      for (var i = 0; i < arguments.length; i++) {
        types.push(arguments[i]);
      }
      if (Tuple.cache[types] != null) return Tuple.cache[types];
      var c = /*#__PURE__*/function (_Tuple2) {
        (0, _inherits2["default"])(c, _Tuple2);
        function c() {
          (0, _classCallCheck2["default"])(this, c);
          return _callSuper(this, c, arguments);
        }
        return (0, _createClass2["default"])(c);
      }(Tuple);
      Object.defineProperty(c, "name", {
        value: types.map(function (x) {
          return x.name;
        }).join('') + "Tuple"
      });
      Object.defineProperty(c, "subTypes", {
        value: types
      });
      Tuple.cache[types] = c;
      return c;
    }
  }]);
  return Tuple;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));
(0, _defineProperty2["default"])(Tuple, "cache", {});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],71:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _IResource = _interopRequireDefault(require("../Resource/IResource.js"));
var _IRecord = _interopRequireDefault(require("./IRecord.js"));
var _Record = _interopRequireDefault(require("./Record.js"));
var _PropertyValue = _interopRequireDefault(require("./PropertyValue.js"));
var _PropertyValueArray = _interopRequireDefault(require("./PropertyValueArray.js"));
var _RecordArray = _interopRequireDefault(require("./RecordArray.js"));
var _ResourceArray = _interopRequireDefault(require("./ResourceArray.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TypedList = exports["default"] = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(TypedList, _Array);
  function TypedList() {
    (0, _classCallCheck2["default"])(this, TypedList);
    return _callSuper(this, TypedList, arguments);
  }
  (0, _createClass2["default"])(TypedList, null, [{
    key: "getType",
    value: function getType(typedList) {
      return typedList.constructor.elementType;
    }
  }, {
    key: "of",
    value: function of(type) {
      if (TypedList.cache[type] != null) return TypedList.cache[type];
      var c = /*#__PURE__*/function (_TypedList2) {
        (0, _inherits2["default"])(c, _TypedList2);
        function c() {
          (0, _classCallCheck2["default"])(this, c);
          return _callSuper(this, c, arguments);
        }
        return (0, _createClass2["default"])(c);
      }(TypedList);
      Object.defineProperty(c, "name", {
        value: type.name + "List"
      });
      Object.defineProperty(c, "elementType", {
        value: type
      });
      TypedList.cache[type] = c;
      return c;
    }
  }]);
  return TypedList;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));
// constructor(data)
// {
//     if (data != undefined && data instanceof Array)
//         for(var i = 0; i < data.length; i++)
//             this.push(data[i]);
// }
(0, _defineProperty3["default"])(TypedList, "cache", (0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])((0, _defineProperty3["default"])({}, _IResource["default"], _ResourceArray["default"]), _PropertyValue["default"], _PropertyValueArray["default"]), _IRecord["default"], _RecordArray["default"]), _Record["default"], _RecordArray["default"]));

},{"../Resource/IResource.js":115,"./IRecord.js":57,"./PropertyValue.js":62,"./PropertyValueArray.js":63,"./Record.js":64,"./RecordArray.js":65,"./ResourceArray.js":67,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],72:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TypedMap = exports["default"] = /*#__PURE__*/function (_Map) {
  (0, _inherits2["default"])(TypedMap, _Map);
  function TypedMap(data) {
    var _this;
    (0, _classCallCheck2["default"])(this, TypedMap);
    _this = _callSuper(this, TypedMap);
    if (data instanceof Object) for (var i in data) _this.set(i, data[i]);
    return _this;
  }
  (0, _createClass2["default"])(TypedMap, null, [{
    key: "getTypes",
    value: function getTypes(typedMap) {
      var _typedMap$constructor, _typedMap$constructor2;
      return [(_typedMap$constructor = typedMap.constructor.keyType) !== null && _typedMap$constructor !== void 0 ? _typedMap$constructor : Object, (_typedMap$constructor2 = typedMap.constructor.valueType) !== null && _typedMap$constructor2 !== void 0 ? _typedMap$constructor2 : Object];
    }
  }, {
    key: "of",
    value: function of(keyType, valueType) {
      if (TypedMap.cache[[keyType, valueType]] != null) return TypedMap.cache[[keyType, valueType]];

      //if (TypedMap.cache[keyType] != null)
      //    if (TypedMap.cache[keyType][valueType] != null)
      //        return TypedMap.cache[keyType][valueType];

      var c = /*#__PURE__*/function (_TypedMap2) {
        (0, _inherits2["default"])(c, _TypedMap2);
        function c() {
          (0, _classCallCheck2["default"])(this, c);
          return _callSuper(this, c, arguments);
        }
        return (0, _createClass2["default"])(c);
      }(TypedMap);
      Object.defineProperty(c, "name", {
        value: keyType.name + valueType.name + "Map"
      });
      Object.defineProperty(c, "keyType", {
        value: keyType
      });
      Object.defineProperty(c, "valueType", {
        value: valueType
      });

      //if (TypedMap.cache[keyType] == null)
      //    TypedMap.cache[keyType] = {[valueType]: c};
      //else
      //    TypedMap.cache[keyType][valueType] = c;

      TypedMap.cache[[keyType, valueType]] = c;
      return c;
    }
  }]);
  return TypedMap;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Map));
(0, _defineProperty2["default"])(TypedMap, "cache", {});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/wrapNativeSuper":35}],73:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = _interopRequireDefault(require("./DC.js"));
/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * Created by Ahmed Zamil on 02/09/2017.
 */
var UUID = exports["default"] = /*#__PURE__*/function () {
  function UUID(dc) {
    (0, _classCallCheck2["default"])(this, UUID);
    this.value = dc;
  }
  (0, _createClass2["default"])(UUID, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value.toHex(0, 16);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value.toHex();
    }

    // [Symbol.toPrimitive](hint){
    //     console.log(hint);
    // }
  }], [{
    key: "parse",
    value: function parse(data) {
      return new UUID(_DC["default"].fromHex(data, ''));
    }
  }]);
  return UUID;
}();

},{"./DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],74:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var Void = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function Void() {
  (0, _classCallCheck2["default"])(this, Void);
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],75:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var Global = exports["default"] = /*#__PURE__*/function () {
  function Global() {
    (0, _classCallCheck2["default"])(this, Global);
  }
  (0, _createClass2["default"])(Global, null, [{
    key: "generateBytes",
    value: function generateBytes(length) {
      var rt = new Uint8Array(length);
      for (var i = 0; i < length; i++) rt[i] = Math.random() * 255;
      return rt;
    }
  }, {
    key: "generateCode",
    value: function generateCode() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var rt = "";
      for (var i = 0; i < length; i++) rt += chars[Math.round(Math.random() * chars.length)];
      return rt;
    }
  }]);
  return Global;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Closed: 0,
  Connecting: 1,
  Connected: 2
};

},{}],77:[function(require,module,exports){
/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _classPrivateFieldGet25 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _IStore2 = _interopRequireDefault(require("../../Resource/IStore.js"));
var _Session = _interopRequireDefault(require("../../Security/Authority/Session.js"));
var _Authentication = _interopRequireDefault(require("../../Security/Authority/Authentication.js"));
var _AuthenticationType = _interopRequireDefault(require("../../Security/Authority/AuthenticationType.js"));
var _SHA = _interopRequireDefault(require("../../Security/Integrity/SHA256.js"));
var _DC = require("../../Data/DC.js");
var _SendList = _interopRequireDefault(require("../SendList.js"));
var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));
var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));
var _KeyList = _interopRequireDefault(require("../../Data/KeyList.js"));
var _AsyncQueue = _interopRequireDefault(require("../../Core/AsyncQueue.js"));
var _Warehouse = _interopRequireDefault(require("../../Resource/Warehouse.js"));
var _IIPAuthPacket = _interopRequireDefault(require("../Packets/IIPAuthPacket.js"));
var _IIPAuthPacketCommand = _interopRequireDefault(require("../Packets/IIPAuthPacketCommand.js"));
var _IIPAuthPacketHeader = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketHeader.js"));
var _IIPAuthPacketInitialize = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketInitialize.js"));
var _IIPAuthPacketAcknowledge = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketAcknowledge.js"));
var _IIPAuthPacketAction = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketAction.js"));
var _IIPAuthPacketEvent = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketEvent.js"));
var _AuthenticationMethod = _interopRequireDefault(require("../../Security/Authority/AuthenticationMethod.js"));
var _IIPPacket = _interopRequireDefault(require("../Packets/IIPPacket.js"));
var _IIPPacketAction = _interopRequireDefault(require("../Packets/IIPPacketAction.js"));
var _IIPPacketCommand = _interopRequireDefault(require("../Packets/IIPPacketCommand.js"));
var _IIPPacketEvent = _interopRequireDefault(require("../Packets/IIPPacketEvent.js"));
var _IIPPacketReport = _interopRequireDefault(require("../Packets//IIPPacketReport.js"));
var _ErrorType = _interopRequireDefault(require("../../Core/ErrorType.js"));
var _ProgressType = _interopRequireDefault(require("../../Core/ProgressType.js"));
var _ExceptionCode = _interopRequireDefault(require("../../Core/ExceptionCode.js"));
var _DistributedResource = _interopRequireDefault(require("./DistributedResource.js"));
var _TypeTemplate = _interopRequireDefault(require("../../Resource/Template/TypeTemplate.js"));
var _DistributedResourceQueueItem = _interopRequireDefault(require("./DistributedResourceQueueItem.js"));
var _DistributedResourceQueueItemType = _interopRequireDefault(require("./DistributedResourceQueueItemType.js"));
var _DistributedPropertyContext = _interopRequireDefault(require("./DistributedPropertyContext.js"));
var _IResource = require("../../Resource/IResource.js");
var _Ruling = _interopRequireDefault(require("../../Security/Permissions/Ruling.js"));
var _ActionType = _interopRequireDefault(require("../../Security/Permissions/ActionType.js"));
var _AsyncException = _interopRequireDefault(require("../../Core/AsyncException.js"));
var _WSocket = _interopRequireDefault(require("../Sockets/WSocket.js"));
var _ClientAuthentication = _interopRequireDefault(require("../../Security/Authority/ClientAuthentication.js"));
var _HostAuthentication = _interopRequireDefault(require("../../Security/Authority/HostAuthentication.js"));
var _SocketState = _interopRequireDefault(require("../Sockets/SocketState.js"));
var _TemplateType = _interopRequireDefault(require("../../Resource/Template/TemplateType.js"));
var _AsyncBag = _interopRequireDefault(require("../../Core/AsyncBag.js"));
var _TransmissionType = require("../../Data/TransmissionType.js");
var _PropertyValue = _interopRequireDefault(require("../../Data/PropertyValue.js"));
var _PropertyValueArray = _interopRequireDefault(require("../../Data/PropertyValueArray.js"));
var _ExtendedTypes = require("../../Data/ExtendedTypes.js");
var _ConnectionStatus = _interopRequireDefault(require("./ConnectionStatus.js"));
var _TemplateDescriber = require("../../Resource/Template/TemplateDescriber.js");
var _TypedMap = _interopRequireDefault(require("../../Data/TypedMap.js"));
var _Global = _interopRequireDefault(require("../../Misc/Global.js"));
var _IIPAuthPacketHashAlgorithm = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketHashAlgorithm.js"));
var _AuthorizationResultsResponse = _interopRequireDefault(require("../../Security/Membership/AuthorizationResultsResponse.js"));
var _IIPAuthPacketIAuthHeader = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketIAuthHeader.js"));
var _AuthorizationRequest = _interopRequireDefault(require("../../Security/Membership/AuthorizationRequest.js"));
var _DistributedResourceAttachRequestInfo = _interopRequireDefault(require("./DistributedResourceAttachRequestInfo.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _port = /*#__PURE__*/new WeakMap();
var _hostname = /*#__PURE__*/new WeakMap();
var _secure = /*#__PURE__*/new WeakMap();
var _socket = /*#__PURE__*/new WeakMap();
var _lastKeepAliveSent = /*#__PURE__*/new WeakMap();
var _lastKeepAliveReceived = /*#__PURE__*/new WeakMap();
var _status = /*#__PURE__*/new WeakMap();
var _readyToEstablish = /*#__PURE__*/new WeakMap();
var _openReply = /*#__PURE__*/new WeakMap();
var _session = /*#__PURE__*/new WeakMap();
var _packet = /*#__PURE__*/new WeakMap();
var _authPacket = /*#__PURE__*/new WeakMap();
var _neededResources = /*#__PURE__*/new WeakMap();
var _attachedResources = /*#__PURE__*/new WeakMap();
var _suspendedResources = /*#__PURE__*/new WeakMap();
var _invalidCredentials = /*#__PURE__*/new WeakMap();
var _localPasswordOrToken = /*#__PURE__*/new WeakMap();
var _keepAliveTimer = /*#__PURE__*/new WeakMap();
var _loginDate = /*#__PURE__*/new WeakMap();
var _jitter = /*#__PURE__*/new WeakMap();
var _server = /*#__PURE__*/new WeakMap();
var _templates = /*#__PURE__*/new WeakMap();
var _requests = /*#__PURE__*/new WeakMap();
var _templateRequests = /*#__PURE__*/new WeakMap();
var _templateByNameRequests = /*#__PURE__*/new WeakMap();
var _resourceRequests = /*#__PURE__*/new WeakMap();
var _callbackCounter = /*#__PURE__*/new WeakMap();
var _queue = /*#__PURE__*/new WeakMap();
var _subscriptions = /*#__PURE__*/new WeakMap();
var _ready = /*#__PURE__*/new WeakMap();
var _sendParams = /*#__PURE__*/new WeakSet();
var _processPacket = /*#__PURE__*/new WeakSet();
var _processClientAuth = /*#__PURE__*/new WeakSet();
var _processHostAuth = /*#__PURE__*/new WeakSet();
var _processAuthorization = /*#__PURE__*/new WeakSet();
var _dataReceived = /*#__PURE__*/new WeakSet();
var _connectSocket = /*#__PURE__*/new WeakSet();
var _declare = /*#__PURE__*/new WeakSet();
var _unsubscribeAll = /*#__PURE__*/new WeakSet();
var _sendRequest = /*#__PURE__*/new WeakSet();
var _sendError = /*#__PURE__*/new WeakSet();
var _sendProgress = /*#__PURE__*/new WeakSet();
var _sendChunk = /*#__PURE__*/new WeakSet();
var _sendReply = /*#__PURE__*/new WeakSet();
var _sendEvent = /*#__PURE__*/new WeakSet();
var _subscribe = /*#__PURE__*/new WeakSet();
var _unsubscribe = /*#__PURE__*/new WeakSet();
var _invokeFunction = /*#__PURE__*/new WeakSet();
var _instance_resourceDestroyed = /*#__PURE__*/new WeakMap();
var _instance_propertyModified = /*#__PURE__*/new WeakMap();
var _instance_eventOccurred = /*#__PURE__*/new WeakMap();
var _keepAliveTimerElapsed = /*#__PURE__*/new WeakSet();
var DistributedConnection = exports["default"] = /*#__PURE__*/function (_IStore) {
  (0, _inherits2["default"])(DistributedConnection, _IStore);
  function DistributedConnection(server) {
    var _this;
    (0, _classCallCheck2["default"])(this, DistributedConnection);
    _this = _callSuper(this, DistributedConnection);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _keepAliveTimerElapsed);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _invokeFunction);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _unsubscribe);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _subscribe);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendEvent);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendReply);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendChunk);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendProgress);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendError);
    // Protocol Implementation
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendRequest);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _unsubscribeAll);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _declare);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _connectSocket);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _dataReceived);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _processAuthorization);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _processHostAuth);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _processClientAuth);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _processPacket);
    _classPrivateMethodInitSpec((0, _assertThisInitialized2["default"])(_this), _sendParams);
    // fields
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _port, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _hostname, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _secure, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _socket, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _lastKeepAliveSent, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _lastKeepAliveReceived, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _status, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _readyToEstablish, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _openReply, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _session, {
      writable: true,
      value: new _Session["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _packet, {
      writable: true,
      value: new _IIPPacket["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _authPacket, {
      writable: true,
      value: new _IIPAuthPacket["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _neededResources, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _attachedResources, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _suspendedResources, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _invalidCredentials, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _localPasswordOrToken, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _keepAliveTimer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _loginDate, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _jitter, {
      writable: true,
      value: 0
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "keepAliveTime", 10);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "keepAliveInterval", 30);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reconnectInterval", 5);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "autoReconnect", false);
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _server, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _templates, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _requests, {
      writable: true,
      value: new _KeyList["default"]()
    });
    // {};
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _templateRequests, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _templateByNameRequests, {
      writable: true,
      value: new _KeyList["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _resourceRequests, {
      writable: true,
      value: new _KeyList["default"]()
    });
    // {};
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _callbackCounter, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _queue, {
      writable: true,
      value: new _AsyncQueue["default"]()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _subscriptions, {
      writable: true,
      value: new Map()
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _ready, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _instance_resourceDestroyed, {
      writable: true,
      value: function value(resource) {
        _classPrivateMethodGet(this, _unsubscribe, _unsubscribe2).call(this, resource);
        // compose the packet
        _classPrivateMethodGet(this, _sendEvent, _sendEvent2).call(this, _IIPPacketEvent["default"].ResourceDestroyed).addUint32(resource.instance.id).done();
      }
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _instance_propertyModified, {
      writable: true,
      value: function value(info) {
        var _info$resource$instan;
        _classPrivateMethodGet(this, _sendEvent, _sendEvent2).call(this, _IIPPacketEvent["default"].PropertyUpdated).addUint32((_info$resource$instan = info.resource.instance) === null || _info$resource$instan === void 0 ? void 0 : _info$resource$instan.id).addUint8(info.propertyTemplate.index).addUint8Array(_Codec["default"].compose(info.value, this)).done();
      }
    });
    _classPrivateFieldInitSpec((0, _assertThisInitialized2["default"])(_this), _instance_eventOccurred, {
      writable: true,
      value: function value(info) {
        if (info.eventTemplate.listenable) {
          // check the client requested listen
          if (!(0, _classPrivateFieldGet25["default"])(this, _subscriptions).has(resource)) return;
          if (!(0, _classPrivateFieldGet25["default"])(this, _subscriptions).get(resource).includes(et.index)) return;
        }
        if (info.receivers instanceof Function) if (!info.receivers(this.sessions)) return;
        if (info.resource.instance.applicable(this.session, _ActionType["default"].ReceiveEvent, info.eventTemplate, info.issuer) == _Ruling["default"].Denied) return;

        // compose the packet
        _classPrivateMethodGet(this, _sendEvent, _sendEvent2).call(this, _IIPPacketEvent["default"].EventOccurred).addUint32(info.resource.instance.id).addUint8(info.eventTemplate.index).addUint8Array(_Codec["default"].compose(info.value, this)).done();
      }
    });
    (0, _classPrivateFieldGet25["default"])((0, _assertThisInitialized2["default"])(_this), _session).authenticationType = _AuthenticationType["default"].Host;
    (0, _classPrivateFieldGet25["default"])((0, _assertThisInitialized2["default"])(_this), _session).localMethod = _AuthenticationMethod["default"].None;
    (0, _classPrivateFieldGet25["default"])((0, _assertThisInitialized2["default"])(_this), _session).localHeaders.set(_IIPAuthPacketHeader["default"].Nonce, _Global["default"].generateBytes(32));
    (0, _classPrivateFieldSet2["default"])((0, _assertThisInitialized2["default"])(_this), _server, server);
    _this._register("ready");
    _this._register("error");
    _this._register("close");
    _this._register("resumed");
    (0, _classPrivateFieldGet25["default"])((0, _assertThisInitialized2["default"])(_this), _queue).then(function (x) {
      if (x.type == _DistributedResourceQueueItemType["default"].Event) {
        x.resource._emitEventByIndex(x.index, x.value);
      } else {
        x.resource._updatePropertyByIndex(x.index, x.value);
      }
    });

    // set local nonce
    return _this;
  }
  (0, _createClass2["default"])(DistributedConnection, [{
    key: "jitter",
    get: function get() {
      return (0, _classPrivateFieldGet25["default"])(this, _jitter);
    }
  }, {
    key: "session",
    get: function get() {
      return (0, _classPrivateFieldGet25["default"])(this, _session);
    }
  }, {
    key: "status",
    get: function get() {
      return (0, _classPrivateFieldGet25["default"])(this, _status);
    }
  }, {
    key: "_sendAll",
    value: function _sendAll(data) {
      (0, _classPrivateFieldGet25["default"])(this, _socket).sendAll(data.buffer);
    }
  }, {
    key: "close",
    value: function close(event) {
      try {
        (0, _classPrivateFieldGet25["default"])(this, _socket).close();
      } catch (_unused) {}
    }
  }, {
    key: "reconnect",
    value: function () {
      var _reconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var toBeRestored, i, r, _i, _toBeRestored, _r, link, ar, dataType, data, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log("Reconnecting...");
              _context.prev = 1;
              _context.next = 4;
              return this.connect();
            case 4:
              if (_context.sent) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", false);
            case 6:
              _context.prev = 6;
              toBeRestored = [];
              for (i = 0; i < (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).length; i++) {
                r = (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).values[i].deref();
                if (r != null) toBeRestored.push(r);
              }
              _i = 0, _toBeRestored = toBeRestored;
            case 10:
              if (!(_i < _toBeRestored.length)) {
                _context.next = 39;
                break;
              }
              _r = _toBeRestored[_i];
              link = _DC.DC.stringToBytes(_r._p.link);
              console.log("Restoring " + _r._p.link);
              _context.prev = 14;
              _context.next = 17;
              return _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].QueryLink).addUint16(link.length).addUint8Array(link).done();
            case 17:
              ar = _context.sent;
              dataType = ar[0];
              data = ar[1];
              if (!(dataType.identifier == _TransmissionType.TransmissionTypeIdentifier.ResourceList || dataType.identifier == _TransmissionType.TransmissionTypeIdentifier.List)) {
                _context.next = 28;
                break;
              }
              // remove from suspended.
              (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).remove(_r._p.instanceId);

              // parse them as int
              id = data.getUint32(8); // id changed ?
              if (id != _r._p.instanceId) _r._p.instanceId = id;
              (0, _classPrivateFieldGet25["default"])(this, _neededResources).set(id, _r);
              _context.next = 27;
              return this.fetch(id, null);
            case 27:
              console.log("Restored " + id);
            case 28:
              _context.next = 36;
              break;
            case 30:
              _context.prev = 30;
              _context.t0 = _context["catch"](14);
              if (!(_context.t0.code == _ExceptionCode["default"].ResourceNotFound)) {
                _context.next = 35;
                break;
              }
              _context.next = 36;
              break;
            case 35:
              return _context.abrupt("break", 39);
            case 36:
              _i++;
              _context.next = 10;
              break;
            case 39:
              _context.next = 44;
              break;
            case 41:
              _context.prev = 41;
              _context.t1 = _context["catch"](6);
              console.log(_context.t1);
            case 44:
              _context.next = 49;
              break;
            case 46:
              _context.prev = 46;
              _context.t2 = _context["catch"](1);
              return _context.abrupt("return", false);
            case 49:
              this._emit("resumed", this);
              return _context.abrupt("return", true);
            case 51:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 46], [6, 41], [14, 30]]);
      }));
      function reconnect() {
        return _reconnect.apply(this, arguments);
      }
      return reconnect;
    }() // hold() {
    //     this.holdSending = true;
    // }
    // unhold() {
    //     if (this.holdSending) {
    //         this.holdSending = false;
    //         var msg = this.sendBuffer.read();
    //         if (msg == null || msg.length == 0)
    //             return;
    //         this.socket.sendAll(msg);
    //     }
    // }
  }, {
    key: "trigger",
    value: function trigger(_trigger) {
      if (_trigger == _IResource.ResourceTrigger.Open) {
        if (this.server != null) return new _AsyncReply["default"](true);
        var _this$instance$attrib = this.instance.attributes.toObject(),
          _this$instance$attrib2 = _this$instance$attrib.domain,
          domain = _this$instance$attrib2 === void 0 ? null : _this$instance$attrib2,
          _this$instance$attrib3 = _this$instance$attrib.secure,
          secure = _this$instance$attrib3 === void 0 ? false : _this$instance$attrib3,
          _this$instance$attrib4 = _this$instance$attrib.username,
          username = _this$instance$attrib4 === void 0 ? null : _this$instance$attrib4,
          _this$instance$attrib5 = _this$instance$attrib.password,
          password = _this$instance$attrib5 === void 0 ? null : _this$instance$attrib5,
          _this$instance$attrib6 = _this$instance$attrib.checkInterval,
          checkInterval = _this$instance$attrib6 === void 0 ? 30 : _this$instance$attrib6,
          _this$instance$attrib7 = _this$instance$attrib.connectionTimeout,
          connectionTimeout = _this$instance$attrib7 === void 0 ? 600 : _this$instance$attrib7,
          _this$instance$attrib8 = _this$instance$attrib.revivingTime,
          revivingTime = _this$instance$attrib8 === void 0 ? 120 : _this$instance$attrib8,
          _this$instance$attrib9 = _this$instance$attrib.tokenIndex,
          tokenIndex = _this$instance$attrib9 === void 0 ? 0 : _this$instance$attrib9,
          _this$instance$attrib10 = _this$instance$attrib.token,
          token = _this$instance$attrib10 === void 0 ? null : _this$instance$attrib10,
          _this$instance$attrib11 = _this$instance$attrib.debug,
          debug = _this$instance$attrib11 === void 0 ? false : _this$instance$attrib11,
          _this$instance$attrib12 = _this$instance$attrib.autoReconnect,
          autoReconnect = _this$instance$attrib12 === void 0 ? false : _this$instance$attrib12,
          _this$instance$attrib13 = _this$instance$attrib.keepAliveInterval,
          keepAliveInterval = _this$instance$attrib13 === void 0 ? 30 : _this$instance$attrib13,
          _this$instance$attrib14 = _this$instance$attrib.keepAliveTime,
          keepAliveTime = _this$instance$attrib14 === void 0 ? 10 : _this$instance$attrib14,
          _this$instance$attrib15 = _this$instance$attrib.reconnectInterval,
          reconnectInterval = _this$instance$attrib15 === void 0 ? 5 : _this$instance$attrib15,
          _this$instance$attrib16 = _this$instance$attrib.authenticator,
          authenticator = _this$instance$attrib16 === void 0 ? null : _this$instance$attrib16;
        this.authenticator = authenticator;
        this.debug = debug;
        this.checkInterval = checkInterval * 1000; // check every 30 seconds
        this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
        this.revivingTime = revivingTime * 1000; // 2 minutes
        this.autoReconnect = autoReconnect;
        this.reconnectInterval = reconnectInterval;
        this.keepAliveInterval = keepAliveInterval;
        this.keepAliveTime = keepAliveTime;
        var host = this.instance.name.split(':');
        var address = host[0];
        var port = host.length > 1 ? parseInt(host[1]) : 10518;
        if (username != null && password != null) {
          var pw = _DC.DC.stringToBytes(password);
          return this.connect(_AuthenticationMethod["default"].Credentials, null, address, port, username, null, pw, domain, secure);
        } else if (token != null) {
          var tk = token instanceof Uint8Array ? token : _DC.DC.stringToBytes(token);
          return this.connect(_AuthenticationMethod["default"].Token, null, address, port, null, tokenIndex, tk, domain, secure);
        } else {
          return this.connect(_AuthenticationMethod["default"].None, null, address, port, null, 0, null, domain, secure);
        }
      }
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "connect",
    value: function connect() {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _AuthenticationMethod["default"].Certificate;
      var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var hostname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var port = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var username = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var tokenIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var passwordOrToken = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var domain = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var secure = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      if ((0, _classPrivateFieldGet25["default"])(this, _openReply) != null) throw new _AsyncException["default"](_ErrorType["default"].Exception, 0, "Connection in progress");
      (0, _classPrivateFieldSet2["default"])(this, _status, _ConnectionStatus["default"].Connecting);
      (0, _classPrivateFieldSet2["default"])(this, _openReply, new _AsyncReply["default"]());
      if (hostname != null) {
        (0, _classPrivateFieldSet2["default"])(this, _session, new _Session["default"]());
        (0, _classPrivateFieldGet25["default"])(this, _session).authenticationType = _AuthenticationType["default"].Client;
        (0, _classPrivateFieldGet25["default"])(this, _session).localMethod = method;
        (0, _classPrivateFieldGet25["default"])(this, _session).remoteMethod = _AuthenticationMethod["default"].None;
        (0, _classPrivateFieldGet25["default"])(this, _session).localHeaders.set(_IIPAuthPacketHeader["default"].Domain, domain);
        (0, _classPrivateFieldGet25["default"])(this, _session).localHeaders.set(_IIPAuthPacketHeader["default"].Nonce, _Global["default"].generateBytes(32));
        if (method == _AuthenticationMethod["default"].Credentials) {
          (0, _classPrivateFieldGet25["default"])(this, _session).localHeaders.set(_IIPAuthPacketHeader["default"].Username, username);
        } else if (method == _AuthenticationMethod["default"].Token) {
          (0, _classPrivateFieldGet25["default"])(this, _session).localHeaders.set(_IIPAuthPacketHeader["default"].TokenIndex, tokenIndex);
        } else if (method == _AuthenticationMethod["default"].Certificate) {
          throw Exception("Unsupported authentication method.");
        }
        (0, _classPrivateFieldSet2["default"])(this, _localPasswordOrToken, passwordOrToken);
        (0, _classPrivateFieldSet2["default"])(this, _invalidCredentials, false);
      }
      if (this.session == null) throw new _AsyncException["default"](_ErrorType["default"].Exception, 0, "Session not initialized");
      if (socket == null) socket = new _WSocket["default"](); // TCPSocket();

      if (port > 0) (0, _classPrivateFieldSet2["default"])(this, _port, port);
      if (hostname != null) (0, _classPrivateFieldSet2["default"])(this, _hostname, hostname);
      if (secure != null) (0, _classPrivateFieldSet2["default"])(this, _secure, secure);
      _classPrivateMethodGet(this, _connectSocket, _connectSocket2).call(this, socket);
      return (0, _classPrivateFieldGet25["default"])(this, _openReply);
    }
  }, {
    key: "assign",
    value: function assign(socket) {
      (0, _classPrivateFieldSet2["default"])(this, _socket, socket);
      socket.receiver = this;

      // @TODO: add referer
      // this.#session.LocalHeaders[IIPAuthPacketHeader.IPv4] = socket.remoteEndPoint.Address.Address;

      if (socket.state == _SocketState["default"].Established && (0, _classPrivateFieldGet25["default"])(this, _session).authenticationType == _AuthenticationType["default"].Client) {
        _classPrivateMethodGet(this, _declare, _declare2).call(this);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _classPrivateMethodGet(this, _unsubscribeAll, _unsubscribeAll2).call(this);
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(DistributedConnection.prototype), "destroy", this).call(this);
    }
  }, {
    key: "networkClose",
    value: function networkClose(socket) {
      // clean up
      (0, _classPrivateFieldSet2["default"])(this, _ready, false);
      (0, _classPrivateFieldSet2["default"])(this, _status, _ConnectionStatus["default"].Closed);
      (0, _classPrivateFieldSet2["default"])(this, _readyToEstablish, false);
      clearTimeout((0, _classPrivateFieldGet25["default"])(this, _keepAliveTimer));
      try {
        (0, _classPrivateFieldGet25["default"])(this, _requests).values.forEach(function (x) {
          try {
            x.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, 0, "Connection closed"));
          } catch (ex) {}
        });
        (0, _classPrivateFieldGet25["default"])(this, _resourceRequests).values.forEach(function (x) {
          try {
            x.reply.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, 0, "Connection closed"));
          } catch (ex) {}
        });
        (0, _classPrivateFieldGet25["default"])(this, _templateRequests).values.forEach(function (x) {
          try {
            x.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, 0, "Connection closed"));
          } catch (ex) {}
        });
      } catch (ex) {
        // unhandled error
      }
      (0, _classPrivateFieldGet25["default"])(this, _requests).clear();
      (0, _classPrivateFieldGet25["default"])(this, _resourceRequests).clear();
      (0, _classPrivateFieldGet25["default"])(this, _templateRequests).clear();
      var _iterator = _createForOfIteratorHelper((0, _classPrivateFieldGet25["default"])(this, _attachedResources).values),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;
          var r = x.deref();
          if (r != null) {
            r._suspend();
            (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).set(r._p.instanceId, x);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (this.server != null) {
        (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).clear();
        _classPrivateMethodGet(this, _unsubscribeAll, _unsubscribeAll2).call(this);
        _Warehouse["default"].remove(this);
        if (this.ready) this.server.membership.logout(this.session);
      } else if (this.autoReconnect && !(0, _classPrivateFieldGet25["default"])(this, _invalidCredentials)) {
        var _self = this;
        setTimeout(function () {
          return _self.reconnect();
        }, this.reconnectInterval * 1000);
      } else {
        (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).clear();
      }
      (0, _classPrivateFieldGet25["default"])(this, _attachedResources).clear();
      this._emit("close", this);
    }
  }, {
    key: "networkConnect",
    value: function networkConnect(socket) {
      if (this.session.localAuthentication.Type == _AuthenticationType["default"].Client) _classPrivateMethodGet(this, _declare, _declare2).call(this);
      this._emit("connect", this);
    }
  }, {
    key: "networkReceive",
    value: function networkReceive(sender, buffer) {
      try {
        // Unassigned ?
        if ((0, _classPrivateFieldGet25["default"])(this, _socket) == null) return;

        // Closed ?
        if ((0, _classPrivateFieldGet25["default"])(this, _socket).state == _SocketState["default"].Closed) return;

        //this.lastAction = DateTime.Now;

        if (!this.processing) {
          this.processing = true;
          try {
            while (buffer.available > 0 && !buffer["protected"]) {
              //console.log("RX", buffer.length );
              _classPrivateMethodGet(this, _dataReceived, _dataReceived2).call(this, buffer);
            }
          } catch (_unused2) {}
          this.processing = false;
        }
      } catch (ex) {
        console.log(ex);
        //Global.Log("NetworkConnection", LogType.Warning, ex.ToString());
      }
    }
  }, {
    key: "put",
    value: function put(resource) {
      if (_Codec["default"].isLocalResource(resource, this)) (0, _classPrivateFieldGet25["default"])(this, _neededResources).add(resource._p.instanceId, resource);
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "remove",
    value: function remove(resource) {
      // nothing to do (IStore interface)
    }
  }, {
    key: "_sendDetachRequest",
    value: function _sendDetachRequest(instanceId) {
      try {
        var sendDetach = false;
        if ((0, _classPrivateFieldGet25["default"])(this, _attachedResources).containsKey(instanceId)) {
          (0, _classPrivateFieldGet25["default"])(this, _attachedResources).remove(instanceId);
          sendDetach = true;
        }
        if ((0, _classPrivateFieldGet25["default"])(this, _suspendedResources).containsKey(instanceId)) {
          (0, _classPrivateFieldGet25["default"])(this, _suspendedResources).remove(instanceId);
          sendDetach = true;
        }
        if (sendDetach) return _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].DetachResource).addUint32(instanceId).done();
      } catch (ex) {
        return null;
      }
    }
  }, {
    key: "_sendInvoke",
    value: function _sendInvoke(instanceId, index, parameters) {
      var _this$callbackCounter3;
      var reply = new _AsyncReply["default"]();
      var pb = _Codec["default"].compose(parameters, this);
      var callbackId = (0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter3 = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), ++_this$callbackCounter3));
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x40 | _IIPPacketAction["default"].InvokeFunction).addUint32(callbackId).addUint32(instanceId).addUint8(index).addUint8Array(pb).done();
      (0, _classPrivateFieldGet25["default"])(this, _requests).set(callbackId, reply);
      return reply;
    }
  }, {
    key: "_sendSetProperty",
    value: function _sendSetProperty(instanceId, index, value) {
      var cv = _Codec["default"].compose(value, this);
      return _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].SetProperty).addUint32(instanceId).addUint8(index).addUint8Array(cv).done();
    }
  }, {
    key: "IIPReply",
    value: function IIPReply(callbackId) {
      var results = Array.prototype.slice.call(arguments, 1);
      var req = (0, _classPrivateFieldGet25["default"])(this, _requests).item(callbackId);
      (0, _classPrivateFieldGet25["default"])(this, _requests).remove(callbackId);
      req.trigger(results);
    }
  }, {
    key: "IIPReplyInvoke",
    value: function IIPReplyInvoke(callbackId, dataType, data) {
      var req = (0, _classPrivateFieldGet25["default"])(this, _requests).item(callbackId);
      if (req != null) {
        (0, _classPrivateFieldGet25["default"])(this, _requests).remove(callbackId);
        _Codec["default"].parse(data, 0, this, null, dataType).reply.then(function (rt) {
          req.trigger(rt);
        });
      }
    }
  }, {
    key: "IIPReportError",
    value: function IIPReportError(callbackId, errorType, errorCode, errorMessage) {
      var req = (0, _classPrivateFieldGet25["default"])(this, _requests).item(callbackId);
      if (req != null) {
        (0, _classPrivateFieldGet25["default"])(this, _requests).remove(callbackId);
        req.triggerError(errorType, errorCode, errorMessage);
      }
    }
  }, {
    key: "IIPReportProgress",
    value: function IIPReportProgress(callbackId, type, value, max) {
      var req = (0, _classPrivateFieldGet25["default"])(this, _requests).item(callbackId);
      if (req != null) req.triggerProgress(type, value, max);
    }
  }, {
    key: "IIPReportChunk",
    value: function IIPReportChunk(callbackId, dataType, data) {
      var req = (0, _classPrivateFieldGet25["default"])(this, _requests).item(callbackId);
      if (req != null) {
        _Codec["default"].parse(data, 0, this, null, dataType).reply.then(function (x) {
          req.triggerChunk(x);
        });
      }
    }
  }, {
    key: "IIPEventResourceReassigned",
    value: function IIPEventResourceReassigned(resourceId, newResourceId) {}
  }, {
    key: "IIPEventResourceDestroyed",
    value: function IIPEventResourceDestroyed(resourceId) {
      if ((0, _classPrivateFieldGet25["default"])(this, _attachedResources).contains(resourceId)) {
        var r = (0, _classPrivateFieldGet25["default"])(this, _attachedResources).get(resourceId).deref();
        // remove from attached to avoid sending unnecessary deattach request when destroy() is called
        (0, _classPrivateFieldGet25["default"])(this, _attachedResources).remove(resourceId);
        r === null || r === void 0 || r.destroy();
      } else if ((0, _classPrivateFieldGet25["default"])(this, _neededResources).contains(resourceId)) {
        // @TODO: handle this mess
        (0, _classPrivateFieldGet25["default"])(this, _neededResources).remove(resourceId);
      }
    }
  }, {
    key: "IIPEventPropertyUpdated",
    value: function IIPEventPropertyUpdated(resourceId, index, dataType, data) {
      var self = this;
      this.fetch(resourceId, null).then(function (r) {
        var pt = r.instance.template.getPropertyTemplateByIndex(index);
        if (pt == null) return; // ft found, fi not found, this should never happen

        // push to the queue to gaurantee serialization
        var item = new _AsyncReply["default"]();
        (0, _classPrivateFieldGet25["default"])(self, _queue).add(item);
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (args) {
          item.trigger(new _DistributedResourceQueueItem["default"](r, _DistributedResourceQueueItemType["default"].Propery, args, index));
        }).error(function (ex) {
          (0, _classPrivateFieldGet25["default"])(self, _queue).remove(item);
          console.log("Esiur Property Error", ex);
        });
      });
    }
  }, {
    key: "IIPEventEventOccurred",
    value: function IIPEventEventOccurred(resourceId, index, dataType, data) {
      var self = this;
      this.fetch(resourceId, null).then(function (r) {
        var et = r.instance.template.getEventTemplateByIndex(index);
        if (et == null) return; // ft found, fi not found, this should never happen

        // push to the queue to guarantee serialization
        var item = new _AsyncReply["default"]();
        (0, _classPrivateFieldGet25["default"])(self, _queue).add(item);

        // Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (args) {
          item.trigger(new _DistributedResourceQueueItem["default"](r, _DistributedResourceQueueItemType["default"].Event, args, index));
        }).error(function (ex) {
          (0, _classPrivateFieldGet25["default"])(self, _queue).remove(item);
          console.log("Esiur Event Error", ex);
        });
      });
    }
  }, {
    key: "IIPEventChildAdded",
    value: function IIPEventChildAdded(resourceId, childId) {
      var self = this;
      this.fetch(resourceId, null).then(function (parent) {
        self.fetch(childId, null).then(function (child) {
          parent.instance.children.add(child);
        });
      });
    }
  }, {
    key: "IIPEventChildRemoved",
    value: function IIPEventChildRemoved(resourceId, childId) {
      var self = this;
      this.fetch(resourceId, null).then(function (parent) {
        self.fetch(childId, null).then(function (child) {
          parent.instance.children.remove(child);
        });
      });
    }
  }, {
    key: "IIPEventRenamed",
    value: function IIPEventRenamed(resourceId, name) {
      this.fetch(resourceId, null).then(function (resource) {
        resource.instance.attributes.set("name", name);
      });
    }
  }, {
    key: "IIPEventAttributesUpdated",
    value: function IIPEventAttributesUpdated(resourceId, attributes) {
      var self = this;
      this.fetch(resourceId, null).then(function (resource) {
        var attrs = attributes.getStringArray(0, attributes.length);
        self.getAttributes(resource, attrs).then(function (s) {
          resource.instance.setAttributes(s);
        });
      });
    }
  }, {
    key: "_sendListenRequest",
    value: function _sendListenRequest(instanceId, index) {
      var _this$callbackCounter4;
      var reply = new _AsyncReply["default"]();
      var callbackId = (0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter4 = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), ++_this$callbackCounter4));
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x40 | _IIPPacketAction["default"].Listen).addUint32(callbackId).addUint32(instanceId).addUint8(index).done();
      (0, _classPrivateFieldGet25["default"])(this, _requests).set(callbackId, reply);
      return reply;
    }
  }, {
    key: "_sendUnlistenRequest",
    value: function _sendUnlistenRequest(instanceId, index) {
      var _this$callbackCounter5;
      var reply = new _AsyncReply["default"]();
      var callbackId = (0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter5 = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), ++_this$callbackCounter5));
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x40 | _IIPPacketAction["default"].Unlisten).addUint32(callbackId).addUint32(instanceId).addUint8(index).done();
      (0, _classPrivateFieldGet25["default"])(this, _requests).set(callbackId, reply);
      return reply;
    }
  }, {
    key: "IIPRequestAttachResource",
    value: function IIPRequestAttachResource(callback, resourceId) {
      //var sl = this.#sendParams();
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          if (r.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].Attach, null) == _Ruling["default"].Denied) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AttachDenied);
            return;
          }
          _classPrivateMethodGet(self, _unsubscribe, _unsubscribe2).call(self, r);

          // reply ok
          var link = _DC.DC.stringToBytes(r.instance.link);
          if (r instanceof _DistributedResource["default"]) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].AttachResource, callback).addUint8Array(r.instance.template.classId.value).addUint64(r.instance.age).addUint16(link.length).addUint8Array(link).addUint8Array(_Codec["default"].compose(r._serialize(), self)).done();else _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].AttachResource, callback).addUint8Array(r.instance.template.classId.value).addUint64(r.instance.age).addUint16(link.length).addUint8Array(link).addUint8Array(_Codec["default"].compose(r.instance.serialize(), self)).done();
          _classPrivateMethodGet(self, _subscribe, _subscribe2).call(self, r);
        } else {
          // reply failed
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestReattachResource",
    value: function IIPRequestReattachResource(callback, resourceId, resourceAge) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          _classPrivateMethodGet(self, _unsubscribe, _unsubscribe2).call(self, r);
          _classPrivateMethodGet(self, _subscribe, _subscribe2).call(self, r);

          // reply ok
          _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].ReattachResource, callback).addUint64(r.instance.age).addUint8Array(_Codec["default"].compose(r.instance.serialize(), self)).done();
        } else {
          // reply failed
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestDetachResource",
    value: function IIPRequestDetachResource(callback, resourceId) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          _classPrivateMethodGet(self, _unsubscribe, _unsubscribe2).call(self, r);
          // reply ok
          _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].DetachResource, callback).done();
        } else {
          // reply failed
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestCreateResource",
    value: function IIPRequestCreateResource(callback, storeId, parentId, content) {
      var self = this;
      _Warehouse["default"].getById(storeId).then(function (store) {
        if (store == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].StoreNotFound);
          return;
        }
        if (!(store instanceof _IStore2["default"])) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceIsNotStore);
          return;
        }

        // check security
        if (store.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].CreateResource, null) != _Ruling["default"].Allowed) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].CreateDenied);
          return;
        }
        _Warehouse["default"].getById(parentId).then(function (parent) {
          // check security

          if (parent != null) if (parent.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].AddChild, null) != _Ruling["default"].Allowed) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
            return;
          }
          var offset = 0;
          var className = content.getString(offset + 1, content[0]);
          offset += 1 + content[0];
          var nameLength = content.getUint16(offset);
          offset += 2;
          var name = content.getString(offset, nameLength);
          var cl = content.getUint32(offset);
          offset += 4;
          var type = window[className];
          if (type == null) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ClassNotFound);
            return;
          }
          DataDeserializer.listParser(content, offset, cl, self, null).then(function (parameters) {
            offset += cl;
            cl = content.getUint32(offset);
            DataDeserializer.typedMapParser(content, offset, cl, self, null).then(function (attributes) {
              offset += cl;
              cl = content.length - offset;
              DataDeserializer.typedMapParser(content, offset, cl, self, null).then(function (values) {
                var resource = new (Function.prototype.bind.apply(type, values))();
                _Warehouse["default"].put(name, resource, store, parent).then(function (ok) {
                  _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].CreateResource, callback).addUint32(resource.Instance.Id).done();
                }).error(function (ex) {
                  // send some error
                  _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddToStoreFailed);
                });
              });
            });
          });
        });
      });
    }
  }, {
    key: "IIPRequestDeleteResource",
    value: function IIPRequestDeleteResource(callback, resourceId) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        if (r.instance.store.instance.applicable(session, _ActionType["default"].Delete, null) != _Ruling["default"].Allowed) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].DeleteDenied);
          return;
        }
        if (_Warehouse["default"].remove(r)) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].DeleteResource, callback).done();else _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].DeleteFailed);
      });
    }
  }, {
    key: "IIPRequestLinkTemplates",
    value: function IIPRequestLinkTemplates(callback, resourceLink) {
      var _this2 = this,
        _this$server;
      var queryCallback = function queryCallback(r) {
        if (r == null) _classPrivateMethodGet(_this2, _sendError, _sendError2).call(_this2, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);else {
          var list = r.filter(function (x) {
            return x.instance.applicable(_this2.session, _ActionType["default"].ViewTemplate, null) != _Ruling["default"].Denied;
          });
          if (list.length == 0) _classPrivateMethodGet(_this2, _sendError, _sendError2).call(_this2, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);else {
            // get all templates related to this resource

            var msg = (0, _DC.BL)();
            var templates = [];
            for (var i = 0; i < list.length; i++) templates = templates.concat(_TypeTemplate["default"].getDependencies(list[i].instance.template).filter(function (x) {
              return !templates.includes(x);
            }));
            for (var i = 0; i < templates.length; i++) {
              msg.addInt32(templates[i].content.length).addUint8Array(templates[i].content);
            }

            // send
            _classPrivateMethodGet(_this2, _sendReply, _sendReply2).call(_this2, _IIPPacketAction["default"].LinkTemplates, callback).addDC(_TransmissionType.TransmissionType.compose(_TransmissionType.TransmissionTypeIdentifier.RawData, msg)).done();
          }
        }
      };
      if (((_this$server = this.server) === null || _this$server === void 0 ? void 0 : _this$server.entryPoint) != null) this.server.entryPoint.query(resourceLink, this).then(queryCallback);else _Warehouse["default"].query(resourceLink).then(queryCallback);
    }
  }, {
    key: "IIPRequestTemplateFromClassName",
    value: function IIPRequestTemplateFromClassName(callback, className) {
      var self = this;
      var t = _Warehouse["default"].getTemplateByClassName(className);
      if (t != null) {
        _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].TemplateFromClassName, callback).addUint32(t.content.length).addUint8Array(t.content).done();
      } else {
        // reply failed
        _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
      }
    }
  }, {
    key: "IIPRequestTemplateFromClassId",
    value: function IIPRequestTemplateFromClassId(callback, classId) {
      var self = this;
      var t = _Warehouse["default"].getTemplateByClassId(classId);
      if (t != null) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].TemplateFromClassId, callback).addDC(_TransmissionType.TransmissionType.compose(_TransmissionType.TransmissionTypeIdentifier.RawData, t.content)).done();else {
        // reply failed
        _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
      }
    }
  }, {
    key: "IIPRequestTemplateFromResourceId",
    value: function IIPRequestTemplateFromResourceId(callback, resourceId) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].TemplateFromResourceId, callback).addDC(_TransmissionType.TransmissionType.compose(_TransmissionType.TransmissionTypeIdentifier.RawData, r.instance.template.content)).done();else {
          // reply failed
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestProcedureCall",
    value: function IIPRequestProcedureCall(callback, procedureCall, transmissionType, content) {
      var _this3 = this;
      if (this.server == null) {
        _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].GeneralFailure);
        return;
      }
      var call = this.server.calls.get(procedureCall);
      if (call == null) {
        _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
        return;
      }
      var parsed = _Codec["default"].parse(content, 0, this, null, transmissionType);
      parsed.Then(function (results) {
        // un hold the socket to send data immediately
        (0, _classPrivateFieldGet25["default"])(_this3, _socket).unhold();

        // @TODO: Make managers for procedure calls
        //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
        //{
        //    SendError(ErrorType.Management, callback,
        //        (ushort)ExceptionCode.InvokeDenied);
        //    return;
        //}

        _classPrivateMethodGet(_this3, _invokeFunction, _invokeFunction2).call(_this3, call.method, callback, results, _IIPPacketAction["default"].ProcedureCall, call.target);
      }).error(function (x) {
        _classPrivateMethodGet(_this3, _sendError, _sendError2).call(_this3, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ParseError);
      });
    }
  }, {
    key: "IIPRequestStaticCall",
    value: function IIPRequestStaticCall(callback, classId, index, transmissionType, content) {
      var _this4 = this;
      var template = _Warehouse["default"].getTemplateByClassId(classId);
      if (template == null) {
        _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
        return;
      }
      var ft = template.getFunctionTemplateByIndex(index);
      if (ft == null) {
        // no function at this index
        _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
        return;
      }
      var parsed = _Codec["default"].parse(content, 0, this, null, transmissionType);
      parsed.then(function (results) {
        // un hold the socket to send data immediately
        (0, _classPrivateFieldGet25["default"])(_this4, _socket).unhold();
        var fi = ft.methodInfo;
        if (fi == null) {
          // ft found, fi not found, this should never happen
          _classPrivateMethodGet(_this4, _sendError, _sendError2).call(_this4, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
          return;
        }

        // @TODO: Make managers for static calls
        //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
        //{
        //    SendError(ErrorType.Management, callback,
        //        (ushort)ExceptionCode.InvokeDenied);
        //    return;
        //}

        _classPrivateMethodGet(_this4, _invokeFunction, _invokeFunction2).call(_this4, fi, callback, results, _IIPPacketAction["default"].StaticCall, null);
      }).error(function (x) {
        _classPrivateMethodGet(_this4, _sendError, _sendError2).call(_this4, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ParseError);
      });
    }
  }, {
    key: "IIPRequestInvokeFunction",
    value: function IIPRequestInvokeFunction(callback, resourceId, index, dataType, data) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        var ft = r.instance.template.getFunctionTemplateByIndex(index);
        if (ft == null) {
          // no function at this index
          _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
          return;
        }
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (args) {
          if (r instanceof _DistributedResource["default"]) {
            var rt = r._invoke(index, args);
            if (rt != null) {
              rt.then(function (res) {
                _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].InvokeFunction, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
              });
            } else {
              // function not found on a distributed object
              _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
              return;
            }
          } else {
            var fi = r[ft.name];
            if (!(fi instanceof Function)) {
              // ft found, fi not found, this should never happen
              _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
              return;
            }
            if (r.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].Execute, ft) == _Ruling["default"].Denied) {
              _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].InvokeDenied);
              return;
            }
            _classPrivateMethodGet(self, _invokeFunction, _invokeFunction2).call(self, fi, callback, args, _IIPPacketAction["default"].InvokeFunction, r);
          }
        });
      });
    }
  }, {
    key: "IIPRequestListen",
    value:
    // IIPRequestGetProperty(callback, resourceId, index) {

    //     var self = this;

    //     Warehouse.getById(resourceId).then(function (r) {
    //         if (r != null) {
    //             var pt = r.instance.template.getFunctionTemplateByIndex(index);
    //             if (pt != null) {
    //                 if (r instanceof DistributedResource) {
    //                     self.#sendReply(IIPPacketAction.GetProperty, callback)
    //                         .addUint8Array(Codec.compose(r._get(pt.index), self))
    //                         .done();
    //                 }
    //                 else {
    //                     var pv = r[pt.name];
    //                     self.#sendReply(IIPPacketAction.GetProperty)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //             }
    //             else {
    //                 // pt not found
    //             }
    //         }
    //         else {
    //             // resource not found
    //         }
    //     });
    // }

    // IIPRequestGetPropertyIfModifiedSince(callback, resourceId, index, age) {

    //     var self = this;

    //     Warehouse.getById(resourceId).then(function (r) {
    //         if (r != null) {
    //             var pt = r.instance.template.getFunctionTemplateByIndex(index);
    //             if (pt != null) {
    //                 if (r.instance.getAge(index) > age) {
    //                     var pv = r[pt.name];
    //                     self.#sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //                 else {
    //                     self.#sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8(DataType.NotModified)
    //                         .done();
    //                 }
    //             }
    //             else {
    //                 // pt not found
    //             }
    //         }
    //         else {
    //             // resource not found
    //         }
    //     });
    // }

    function IIPRequestListen(callback, resourceId, index) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var et = r.instance.template.getEventTemplateByIndex(index);
          if (et != null) {
            if (r instanceof _DistributedResource["default"]) {
              r.listen(et).then(function (x) {
                _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].Listen, callback).done();
              }).error(function (x) {
                return _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Exception, callback, _ExceptionCode["default"].GeneralFailure);
              });
            } else {
              if (!(0, _classPrivateFieldGet25["default"])(self, _subscriptions).has(r)) {
                _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].NotAttached);
                return;
              }
              if ((0, _classPrivateFieldGet25["default"])(self, _subscriptions).get(r).includes(index)) {
                _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AlreadyListened);
                return;
              }
              (0, _classPrivateFieldGet25["default"])(self, _subscriptions).get(r).push(index);
              _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].Listen, callback).done();
            }
          } else {
            // pt not found
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
          }
        } else {
          // resource not found
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestUnlisten",
    value: function IIPRequestUnlisten(callback, resourceId, index) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var et = r.instance.template.getEventTemplateByIndex(index);
          if (et != null) {
            if (r instanceof _DistributedResource["default"]) {
              r.unlisten(et).then(function (x) {
                _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].Unlisten, callback).done();
              }).error(function (x) {
                return _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Exception, callback, _ExceptionCode["default"].GeneralFailure);
              });
            } else {
              if (!(0, _classPrivateFieldGet25["default"])(self, _subscriptions).has(r)) {
                _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].NotAttached);
                return;
              }
              if (!(0, _classPrivateFieldGet25["default"])(self, _subscriptions).get(r).includes(index)) {
                _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AlreadyUnlistened);
                return;
              }
              var ar = (0, _classPrivateFieldGet25["default"])(self, _subscriptions).get(r);
              var i = ar.indexOf(index);
              ar.splice(i, 1);
              _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].Unlisten, callback).done();
            }
          } else {
            // pt not found
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].MethodNotFound);
          }
        } else {
          // resource not found
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestSetProperty",
    value: function IIPRequestSetProperty(callback, resourceId, index, dataType, data) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var pt = r.instance.template.getPropertyTemplateByIndex(index);
          if (pt != null) {
            _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (value) {
              if (r instanceof _DistributedResource["default"]) {
                // propagation
                r._set(index, value).then(function (x) {
                  _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].SetProperty, callback).done();
                }).error(function (x) {
                  _classPrivateMethodGet(self, _sendError, _sendError2).call(self, x.type, callback, x.code, x.message);
                });
              } else {
                if (r.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].SetProperty, pt) == _Ruling["default"].Denied) {
                  _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _AsyncReply["default"].ErrorType.Exception, callback, _ExceptionCode["default"].SetPropertyDenied);
                  return;
                }
                try {
                  if (r[pt.name] instanceof _DistributedPropertyContext["default"]) value = new _DistributedPropertyContext["default"](this, value);
                  r[pt.name] = value;
                  _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].SetProperty, callback).done();
                } catch (ex) {
                  _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _AsyncReply["default"].ErrorType.Exception, callback, 0, ex.toString());
                }
              }
            });
          } else {
            // property not found
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].PropertyNotFound);
          }
        } else {
          // resource not found
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].PropertyNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestInquireResourceHistory",
    value: function IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          r.instance.store.getRecord(r, fromDate, toDate).then(function (results) {
            var history = _Codec["default"].composeHistory(results, self, true);
            _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].ResourceHistory, callback).addUint8Array(history).done();
          });
        }
      });
    }
  }, {
    key: "IIPRequestQueryResources",
    value: function IIPRequestQueryResources(callback, resourceLink) {
      var _this$server2;
      var self = this;
      var queryCallback = function queryCallback(resources) {
        if (resources == null) _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);else {
          var list = resources.filter(function (r) {
            return r.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].Attach, null) != _Ruling["default"].Denied;
          });
          if (list.length == 0) _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);else _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].QueryLink, callback).addUint8Array(_Codec["default"].compose(list, self)).done();
        }
      };
      if (((_this$server2 = this.server) === null || _this$server2 === void 0 ? void 0 : _this$server2.entryPoint) != null) {
        var _this$server3;
        (_this$server3 = this.server) === null || _this$server3 === void 0 || _this$server3.entryPoint.query(resourceLink, this).then(queryCallback);
      } else {
        _Warehouse["default"].query(resourceLink).then(queryCallback);
      }
    }
  }, {
    key: "create",
    value: function create(store, parent, className, parameters, attributes, values) {
      var reply = new _AsyncReply["default"]();
      var sb = _DC.DC.stringToBytes(className);
      var pkt = (0, _DC.BL)().addUint32(store.instance.id).addUint32(parent.instance.id).addUint32(sb.length).addUint8Array(sb).addUint8Array(_Codec["default"].composeVarArray(parameters, this, true)).addUint8Array(_Codec["default"].composeStructure(attributes, this, true, true, true)).addUint8Array(_Codec["default"].composeStructure(values, this));
      pkt.addUint32(pkt.length, 8);
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].CreateResource).addUint8Array(pkt.ToArray()).done().then(function (args) {
        var rid = args[0];
        self.fetch(rid, null).then(function (r) {
          reply.trigger(r);
        });
      });
      return reply;
    }
  }, {
    key: "query",
    value: function query(resourceLink) {
      var reply = new _AsyncReply["default"]();
      var self = this;
      var sb = _DC.DC.stringToBytes(resourceLink);
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].QueryLink).addUint16(sb.length).addUint8Array(sb).done().then(function (ar) {
        var dataType = ar[0];
        var data = ar[1];
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (resources) {
          reply.trigger(resources);
        }).error(function (ex) {
          return reply.triggerError(ex);
        });
      }).error(function (ex) {
        reply.triggerError(ex);
      });
      return reply;
    }
  }, {
    key: "getTemplateByClassName",
    value: function getTemplateByClassName(className) {
      var templates = (0, _classPrivateFieldGet25["default"])(this, _templates).filter({
        className: className
      });
      if (templates.length > 0) return new _AsyncReply["default"](templates[0]);else if ((0, _classPrivateFieldGet25["default"])(this, _templateByNameRequests).contains(className)) return (0, _classPrivateFieldGet25["default"])(this, _templateByNameRequests).item(className);
      var reply = new _AsyncReply["default"]();
      (0, _classPrivateFieldGet25["default"])(this, _templateByNameRequests).add(className, reply);
      var self = this;
      var classNameBytes = _DC.DC.stringToBytes(className);
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].TemplateFromClassName).addUint8(classNameBytes.length).addUint8Array(classNameBytes).done().then(function (rt) {
        (0, _classPrivateFieldGet25["default"])(self, _templateByNameRequests).remove(className);
        (0, _classPrivateFieldGet25["default"])(self, _templates).add(rt[0].classId.valueOf(), rt[0]);
        _Warehouse["default"].putTemplate(rt[0]);
        reply.trigger(rt[0]);
      });
      return reply;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(classId) {
      if ((0, _classPrivateFieldGet25["default"])(this, _templates).contains(classId)) return new _AsyncReply["default"]((0, _classPrivateFieldGet25["default"])(this, _templates).item(classId));else if ((0, _classPrivateFieldGet25["default"])(this, _templateRequests).contains(classId)) return (0, _classPrivateFieldGet25["default"])(this, _templateRequests).item(classId);
      var reply = new _AsyncReply["default"]();
      (0, _classPrivateFieldGet25["default"])(this, _templateRequests).add(classId.valueOf(), reply);
      var self = this;
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].TemplateFromClassId).addUint8Array(classId.value).done().then(function (rt) {
        (0, _classPrivateFieldGet25["default"])(self, _templateRequests).remove(classId);
        (0, _classPrivateFieldGet25["default"])(self, _templates).add(rt[0].classId.valueOf(), rt[0]);
        _Warehouse["default"].putTemplate(rt[0]);
        reply.trigger(rt[0]);
      });
      return reply;
    }

    // IStore interface
  }, {
    key: "get",
    value: function get(path) {
      var rt = new _AsyncReply["default"]();
      this.query(path).then(function (ar) {
        if (ar != null && ar.length > 0) rt.trigger(ar[0]);else rt.trigger(null);
      }).error(function (ex) {
        rt.triggerError(ex);
      });
      return rt;

      /*
      if (this.pathRequests[path])
          return this.pathRequests[path];
        var reply = new AsyncReply();
      this.pathRequests[path] = reply;
        var bl = new BinaryList();
      bl.addString(path);
      bl.addUint16(bl.length, 0);
        var link = data.get
      var self = this;
        this.#sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
                      .addUint16(.then(function (rt) {
          delete self.pathRequests[path];
            self.fetch(rt[1]).then(function (r) {
              reply.trigger(r);
          });
      });
          return reply;
      */
    }

    // retrieve(iid) {

    //     let r = this.resources.item(iid);

    //     return new AsyncReply(r);

    //     //for (var r in this.resources)
    //     //    if (this.resources[r].instance.id == iid)
    //     //        return new AsyncReply(r);
    //     //return new AsyncReply(null);
    // }
  }, {
    key: "getLinkTemplates",
    value: function getLinkTemplates(link) {
      var reply = new _AsyncReply["default"]();
      var l = _DC.DC.stringToBytes(link);
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].LinkTemplates).addUint16(l.length).addUint8Array(l).done().then(function (rt) {
        var templates = [];
        // parse templates

        var tt = rt[0];
        var data = rt[1];

        //var offset = 0;
        for (var offset = tt.offset; offset < tt.contentLength;) {
          var cs = data.getUint32(offset);
          offset += 4;
          templates.push(_TypeTemplate["default"].parse(data, offset, cs));
          offset += cs;
        }
        reply.trigger(templates);
      }).error(function (ex) {
        reply.triggerError(ex);
      });
      return reply;
    }

    // Get a resource from the other end
  }, {
    key: "fetch",
    value: function fetch(id, requestSequence) {
      var _classPrivateFieldGet2;
      var resource = (_classPrivateFieldGet2 = (0, _classPrivateFieldGet25["default"])(this, _attachedResources).item(id)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.deref();
      if (resource != null) return new _AsyncReply["default"](resource);
      resource = (0, _classPrivateFieldGet25["default"])(this, _neededResources).item(id);
      var requestInfo = (0, _classPrivateFieldGet25["default"])(this, _resourceRequests).item(id);
      if (requestInfo != null) {
        var _requestSequence$incl;
        if (resource != null && ((_requestSequence$incl = requestSequence === null || requestSequence === void 0 ? void 0 : requestSequence.includes(id)) !== null && _requestSequence$incl !== void 0 ? _requestSequence$incl : false)) {
          return new _AsyncReply["default"](resource);
        } else if (resource != null && requestInfo.requestSequence.includes(id)) {
          console.log("Avoid deadlock...", id, requestSequence, requestInfo.requestSequence);
          return new _AsyncReply["default"](resource);
        } else {
          return requestInfo.reply;
        }
      } else if (resource != null && !resource._p.suspended) {
        // @REVIEW: this should never happen
        console.log("DCON: Resource not moved to attached.", resource);
        return new _AsyncReply["default"](resource);
      }
      var reply = new _AsyncReply["default"]();
      var newSequence = requestSequence != null ? [].concat((0, _toConsumableArray2["default"])(requestSequence), [id]) : [id];
      (0, _classPrivateFieldGet25["default"])(this, _resourceRequests).set(id, new _DistributedResourceAttachRequestInfo["default"](reply, newSequence));
      var self = this;
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].AttachResource).addUint32(id).done().then(function (rt) {
        if (rt == null) {
          reply.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].ResourceNotFound, "Null response"));
          return;
        }
        var dr;
        var classId = rt[0];
        var template = null;
        if (resource == null) {
          var _template, _template2;
          template = _Warehouse["default"].getTemplateByClassId(classId, _TemplateType["default"].Resource);
          if (((_template = template) === null || _template === void 0 ? void 0 : _template.definedType) != null && (_template2 = template) !== null && _template2 !== void 0 && _template2.isWrapper) dr = new template.definedType(self, id, rt[1], rt[2]);else dr = new _DistributedResource["default"](self, id, rt[1], rt[2]);
        } else {
          dr = resource;
          template = resource.instance.template;
        }

        //let dr = resource || new DistributedResource(self, id, rt[1], rt[2]);

        var transmissionType = rt[3];
        var content = rt[4];
        var initResource = function initResource(ok) {
          _Codec["default"].parse(content, 0, self, newSequence, transmissionType).reply.then(function (ar) {
            var pvs = new _PropertyValueArray["default"]();
            for (var i = 0; i < ar.length; i += 3) pvs.push(new _PropertyValue["default"](ar[i + 2], ar[i], ar[i + 1]));
            dr._attach(pvs);
            (0, _classPrivateFieldGet25["default"])(self, _resourceRequests).remove(id);
            // move from needed to attached
            (0, _classPrivateFieldGet25["default"])(self, _neededResources).remove(id);
            (0, _classPrivateFieldGet25["default"])(self, _attachedResources).set(id, new WeakRef(dr));
            reply.trigger(dr);
          }).error(function (ex) {
            return reply.triggerError(ex);
          });
        };
        if (template == null) {
          self.getTemplate(rt[0]).then(function (tmp) {
            // ClassId, ResourceAge, ResourceLink, Content
            if (resource == null) {
              _Warehouse["default"].put(id.toString(), dr, self, null, tmp).then(function (ok) {
                initResource(ok);
              }).error(function (ex) {
                reply.triggerError(ex);
              });
            } else {
              initResource(ok);
            }
          }).error(function (ex) {
            reply.triggerError(ex);
          });
        } else {
          if (resource == null) {
            _Warehouse["default"].put(id.toString(), dr, self, null, template).then(initResource).error(function (ex) {
              return reply.triggerError(ex);
            });
          } else {
            initResource(resource);
          }
        }
      }).error(function (ex) {
        reply.triggerError(ex);
      });
      return reply;
    }
  }, {
    key: "getRecord",
    value: function getRecord(resource, fromDate, toDate) {
      if (resource instanceof _DistributedResource["default"]) {
        if (resource._p.connection != this) return new _AsyncReply["default"](null);
        var reply = new _AsyncReply["default"]();
        var self = this;
        _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].ResourceHistory).addUint32(resource._p.instanceId).addDateTime(fromDate).addDateTime(toDate).done().then(function (rt) {
          _Codec["default"].historyParser(rt[0], 0, rt[0].length, resource, self, null).then(function (history) {
            reply.trigger(history);
          });
        });
        return reply;
      } else return new _AsyncReply["default"](null);
    }
  }, {
    key: "IIPRequestAddChild",
    value: function IIPRequestAddChild(callback, parentId, childId) {
      var self = this;
      _Warehouse["default"].getById(parentId).then(function (parent) {
        if (parent == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        _Warehouse["default"].getById(childId).then(function (child) {
          if (child == null) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
            return;
          }
          if (parent.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].AddChild, null) != _Ruling["default"].Allowed) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
            return;
          }
          if (child.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].AddParent, null) != _Ruling["default"].Allowed) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddParentDenied);
            return;
          }
          parent.instance.children.add(child);
          _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].AddChild, callback).done();
          //child.Instance.Parents
        });
      });
    }
  }, {
    key: "IIPRequestRemoveChild",
    value: function IIPRequestRemoveChild(callback, parentId, childId) {
      var self = this;
      _Warehouse["default"].getById(parentId).then(function (parent) {
        if (parent == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        _Warehouse["default"].getById(childId).then(function (child) {
          if (child == null) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
            return;
          }
          if (parent.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].RemoveChild, null) != _Ruling["default"].Allowed) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
            return;
          }
          if (child.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].RemoveParent, null) != _Ruling["default"].Allowed) {
            _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].AddParentDenied);
            return;
          }
          parent.instance.children.remove(child);
          _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].RemoveChild, callback).done();
          //child.Instance.Parents
        });
      });
    }
  }, {
    key: "IIPRequestRenameResource",
    value: function IIPRequestRenameResource(callback, resourceId, name) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        if (resource.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].Rename, null) != _Ruling["default"].Allowed) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].RenameDenied);
          return;
        }
        resource.instance.name = name;
        _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].RenameResource, callback).done();
      });
    }
  }, {
    key: "IIPRequestResourceChildren",
    value: function IIPRequestResourceChildren(callback, resourceId) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].ResourceChildren, callback).addUint8Array(_Codec["default"].compose(resource.instance.children.toArray(), self)).done();
      });
    }
  }, {
    key: "IIPRequestResourceParents",
    value: function IIPRequestResourceParents(callback, resourceId) {
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, _IIPPacketAction["default"].ResourceParents, callback).addUint8Array(_Codec["default"].compose(resource.instance.parents.toArray(), self)).done();
      });
    }
  }, {
    key: "IIPRequestClearAttributes",
    value: function IIPRequestClearAttributes(callback, resourceId, attributes) {
      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        if (r.instance.store.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].UpdateAttributes, null) != _Ruling["default"].Allowed) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeDenied);
          return;
        }
        var attrs = [];
        if (!all) attrs = attributes.getStringArray(0, attributes.length);
        if (r.instance.removeAttributes(attrs)) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, all ? _IIPPacketAction["default"].ClearAllAttributes : _IIPPacketAction["default"].ClearAttributes, callback).done();else _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].UpdateAttributeFailed);
      });
    }
  }, {
    key: "IIPRequestUpdateAttributes",
    value: function IIPRequestUpdateAttributes(callback, resourceId, attributes) {
      var clearAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var self = this;
      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }
        if (r.instance.store.instance.applicable((0, _classPrivateFieldGet25["default"])(self, _session), _ActionType["default"].UpdateAttributes, null) != _Ruling["default"].Allowed) {
          _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeDenied);
          return;
        }
        DataDeserializer.typedListParser(attributes, 0, attributes.length, this, null).then(function (attrs) {
          if (r.instance.setAttributes(attrs, clearAttributes)) _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, clearAttributes ? _IIPPacketAction["default"].ClearAllAttributes : _IIPPacketAction["default"].ClearAttributes, callback).done();else _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeFailed);
        });
      });
    }
  }, {
    key: "getChildren",
    value: function getChildren(resource) {
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      var self = this;
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].ResourceChildren).addUint32(resource._p.instanceId).done().then(function (ar) {
        var dataType = ar[0];
        var data = ar[1];
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (resources) {
          rt.trigger(resources);
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
      });
      return rt;
    }
  }, {
    key: "getParents",
    value: function getParents(resource) {
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      var self = this;
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].ResourceParents).addUint32(resource._p.instanceId).done().then(function (ar) {
        var dataType = ar[0];
        var data = ar[1];
        _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (resources) {
          rt.trigger(resources);
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
      });
      return rt;
    }
  }, {
    key: "removeAttributes",
    value: function removeAttributes(resource) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      if (attributes == null) _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].ClearAllAttributes).addUint32(resource._p.instanceId).done().then(function (ar) {
        rt.trigger(true);
      }).error(function (ex) {
        rt.triggerError(ex);
      });else {
        var attrs = _DC.DC.stringArrayToBytes(attributes);
        _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].ClearAttributes).addUint32(resource.instance.id).addUint32(attrs.length).addUint8Array(attrs).done().then(function (ar) {
          rt.trigger(true);
        }).error(function (ex) {
          rt.triggerError(ex);
        });
      }
      return rt;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(resource, attributes) {
      var clearAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, clearAttributes ? _IIPPacketAction["default"].UpdateAllAttributes : _IIPPacketAction["default"].UpdateAttributes).addUint32(resource._p.instanceId).addUint8Array(_Codec["default"].compose(attributes, this)).done().then(function () {
        rt.trigger(true);
      }).error(function (ex) {
        rt.triggerError(ex);
      });
      return rt;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes(resource) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      var self = this;
      if (attributes == null) {
        _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].GetAllAttributes).addUint32(resource._p.instanceId).done().then(function (ar) {
          var dataType = ar[0];
          var data = ar[1];
          _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (st) {
            var _resource$instance;
            (_resource$instance = resource.instance) === null || _resource$instance === void 0 || _resource$instance.setAttributes(st);
            rt.trigger(st);
          }).error(function (ex) {
            return rt.triggerError(ex);
          });
        }).error(function (ex) {
          rt.triggerError(ex);
        });
      } else {
        var attrs = _DC.DC.stringArrayToBytes(attributes);
        _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].GetAttributes).addUint32(resource._p.instanceId).addUint32(attrs.length).addUint8Array(attrs).done().then(function (ar) {
          var dataType = ar[0];
          var data = ar[1];
          _Codec["default"].parse(data, 0, self, null, dataType).reply.then(function (st) {
            var _resource$instance2;
            (_resource$instance2 = resource.instance) === null || _resource$instance2 === void 0 || _resource$instance2.setAttributes(st);
            rt.trigger(st);
          }).error(function (ex) {
            return rt.triggerError(ex);
          });
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
        ;
      }
      return rt;
    }
  }, {
    key: "staticCall",
    value: function staticCall(classId, index, parameters) {
      var _this$callbackCounter6, _this$callbackCounter7;
      var pb = _Codec["default"].compose(parameters, this);
      var reply = new _AsyncReply["default"]();
      var c = ((0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter6 = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), _this$callbackCounter7 = _this$callbackCounter6++, _this$callbackCounter6)), _this$callbackCounter7);
      (0, _classPrivateFieldGet25["default"])(this, _requests).add(c, reply);
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x40 | _IIPPacketAction["default"].StaticCall).addUint32(c).addUUID(classId).addUint8(index).addUint8Array(pb).done();
      return reply;
    }
  }, {
    key: "call",
    value: function call(procedureCall) {
      var args = Map.from(_ExtendedTypes.UInt8, Object);
      for (var i = 0; i < arguments.Length - 2; i++) args.add(i, arguments[i + 1]);
      return this.callArgs(procedureCall, args);
    }
  }, {
    key: "callArgs",
    value: function callArgs(procedureCall, parameters) {
      var _this$callbackCounter8, _this$callbackCounter9;
      var pb = _Codec["default"].Compose(parameters, this);
      var reply = new _AsyncReply["default"]();
      var c = ((0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter8 = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), _this$callbackCounter9 = _this$callbackCounter8++, _this$callbackCounter8)), _this$callbackCounter9);
      (0, _classPrivateFieldGet25["default"])(this, _requests).add(c, reply);
      var callName = _DC.DC.stringToBytes(procedureCall);
      sendParams().addUint8(0x40 | _IIPPacketAction["default"].ProcedureCall).addUint32(c).addUint16(callName.length).addUint8Array(callName).addUint8Array(pb).done();
      return reply;
    }
  }, {
    key: "IIPRequestKeepAlive",
    value: function IIPRequestKeepAlive(callbackId, peerTime, interval) {
      var jitter = 0;
      var now = new Date();
      if ((0, _classPrivateFieldGet25["default"])(this, _lastKeepAliveReceived) != null) {
        var diff = now - (0, _classPrivateFieldGet25["default"])(this, _lastKeepAliveReceived);
        //Console.WriteLine("Diff " + diff + " " + interval);

        jitter = Math.abs(diff - interval);
      }
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x80 | _IIPPacketAction["default"].KeepAlive).addUint32(callbackId).addDateTime(now).addUint32(jitter).done();
      (0, _classPrivateFieldSet2["default"])(this, _lastKeepAliveReceived, now);
    }
  }], [{
    key: "template",
    get: function get() {
      return new _TemplateDescriber.TemplateDescriber("Esiur", [new _TemplateDescriber.Prop("status", _ExtendedTypes.UInt8)]);
    }
  }]);
  return DistributedConnection;
}(_IStore2["default"]);
function _sendParams2(doneReply) {
  return new _SendList["default"](this, doneReply);
}
function _processPacket2(msg, offset, ends, data) {
  if ((0, _classPrivateFieldGet25["default"])(this, _ready)) {
    var packet = (0, _classPrivateFieldGet25["default"])(this, _packet);
    var rt = packet.parse(msg, offset, ends);

    //console.log("Inc " , rt, offset, ends);

    if (rt <= 0) {
      data.holdFor(msg, offset, ends - offset, -rt);
      return ends;
    } else {
      offset += rt;
      try {
        if (packet.command == _IIPPacketCommand["default"].Event) {
          switch (packet.event) {
            case _IIPPacketEvent["default"].ResourceReassigned:
              this.IIPEventResourceReassigned(packet.resourceId, packet.newResourceId);
              break;
            case _IIPPacketEvent["default"].ResourceDestroyed:
              this.IIPEventResourceDestroyed(packet.resourceId);
              break;
            case _IIPPacketEvent["default"].PropertyUpdated:
              this.IIPEventPropertyUpdated(packet.resourceId, packet.methodIndex, packet.dataType, msg);
              break;
            case _IIPPacketEvent["default"].EventOccurred:
              this.IIPEventEventOccurred(packet.resourceId, packet.methodIndex, packet.dataType, msg);
              break;
            case _IIPPacketEvent["default"].ChildAdded:
              this.IIPEventChildAdded(packet.resourceId, packet.childId);
              break;
            case _IIPPacketEvent["default"].ChildRemoved:
              this.IIPEventChildRemoved(packet.resourceId, packet.childId);
              break;
            case _IIPPacketEvent["default"].Renamed:
              this.IIPEventRenamed(packet.resourceId, packet.resourceName);
              break;
            case _IIPPacketEvent["default"].AttributesUpdated:
              //@TODO: fix this
              //this.IIPEventAttributesUpdated(packet.resourceId, packet.content);
              break;
          }
        } else if (packet.command == _IIPPacketCommand["default"].Request) {
          switch (packet.action) {
            // Manage
            case _IIPPacketAction["default"].AttachResource:
              this.IIPRequestAttachResource(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].ReattachResource:
              this.IIPRequestReattachResource(packet.callbackId, packet.resourceId, packet.resourceAge);
              break;
            case _IIPPacketAction["default"].DetachResource:
              this.IIPRequestDetachResource(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].CreateResource:
              // @TODO: implement this
              // this.IIPRequestCreateResource(packet.callbackId, packet.storeId, packet.resourceId, packet.content);
              break;
            case _IIPPacketAction["default"].DeleteResource:
              this.IIPRequestDeleteResource(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].AddChild:
              this.IIPRequestAddChild(packet.callbackId, packet.resourceId, packet.childId);
              break;
            case _IIPPacketAction["default"].RemoveChild:
              this.IIPRequestRemoveChild(packet.callbackId, packet.resourceId, packet.childId);
              break;
            case _IIPPacketAction["default"].RenameResource:
              this.IIPRequestRenameResource(packet.callbackId, packet.resourceId, packet.resourceName);
              break;

            // Inquire
            case _IIPPacketAction["default"].TemplateFromClassName:
              this.IIPRequestTemplateFromClassName(packet.callbackId, packet.className);
              break;
            case _IIPPacketAction["default"].TemplateFromClassId:
              this.IIPRequestTemplateFromClassId(packet.callbackId, packet.classId);
              break;
            case _IIPPacketAction["default"].TemplateFromResourceId:
              this.IIPRequestTemplateFromResourceId(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].QueryLink:
              this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
              break;
            case _IIPPacketAction["default"].ResourceChildren:
              this.IIPRequestResourceChildren(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].ResourceParents:
              this.IIPRequestResourceParents(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].ResourceHistory:
              this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
              break;
            case _IIPPacketAction["default"].LinkTemplates:
              this.IIPRequestLinkTemplates(packet.callbackId, packet.resourceLink);
              break;

            // Invoke
            case _IIPPacketAction["default"].InvokeFunction:
              this.IIPRequestInvokeFunction(packet.callbackId, packet.resourceId, packet.methodIndex, packet.dataType, msg);
              break;

            // case IIPPacketAction.GetProperty:
            //     this.IIPRequestGetProperty(packet.callbackId, packet.resourceId, packet.methodIndex);
            //     break;
            // case IIPPacketAction.GetPropertyIfModified:
            //     this.IIPRequestGetPropertyIfModifiedSince(packet.callbackId, packet.resourceId, packet.methodIndex, packet.resourceAge);
            //     break;

            case _IIPPacketAction["default"].Listen:
              this.IIPRequestListen(packet.callbackId, packet.resourceId, packet.methodIndex);
              break;
            case _IIPPacketAction["default"].Unlisten:
              this.IIPRequestUnlisten(packet.callbackId, packet.resourceId, packet.methodIndex);
              break;
            case _IIPPacketAction["default"].SetProperty:
              this.IIPRequestSetProperty(packet.callbackId, packet.resourceId, packet.methodIndex, packet.dataType, msg);
              break;

            // Attribute @TODO: implement these
            case _IIPPacketAction["default"].GetAllAttributes:
              // this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, true);
              break;
            case _IIPPacketAction["default"].UpdateAllAttributes:
              // this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, true);
              break;
            case _IIPPacketAction["default"].ClearAllAttributes:
              // this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, true);
              break;
            case _IIPPacketAction["default"].GetAttributes:
              // this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, false);
              break;
            case _IIPPacketAction["default"].UpdateAttributes:
              // this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, false);
              break;
            case _IIPPacketAction["default"].ClearAttributes:
              // this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, false);
              break;
            case _IIPPacketAction["default"].KeepAlive:
              this.IIPRequestKeepAlive(packet.callbackId, packet.currentTime, packet.interval);
              break;
            case _IIPPacketAction["default"].ProcedureCall:
              this.IIPRequestProcedureCall(packet.callbackId, packet.procedure, packet.dataType, msg);
              break;
            case _IIPPacketAction["default"].StaticCall:
              this.IIPRequestStaticCall(packet.callbackId, packet.classId, packet.methodIndex, packet.dataType, msg);
              break;
          }
        } else if (packet.command == _IIPPacketCommand["default"].Reply) {
          switch (packet.action) {
            case _IIPPacketAction["default"].AttachResource:
              this.IIPReply(packet.callbackId, packet.classId, packet.resourceAge, packet.resourceLink, packet.dataType, msg);
              break;
            case _IIPPacketAction["default"].ReattachResource:
              this.IIPReply(packet.callbackId, packet.resourceAge, packet.dataType, msg);
              break;
            case _IIPPacketAction["default"].DetachResource:
              this.IIPReply(packet.callbackId);
              break;
            case _IIPPacketAction["default"].CreateResource:
              this.IIPReply(packet.callbackId, packet.resourceId);
              break;
            case _IIPPacketAction["default"].DeleteResource:
            case _IIPPacketAction["default"].AddChild:
            case _IIPPacketAction["default"].RemoveChild:
            case _IIPPacketAction["default"].RenameResource:
              this.IIPReply(packet.callbackId);
              break;
            case _IIPPacketAction["default"].TemplateFromClassName:
            case _IIPPacketAction["default"].TemplateFromClassId:
            case _IIPPacketAction["default"].TemplateFromResourceId:
              if (packet.dataType != null) {
                var _packet$dataType$offs, _packet$dataType, _packet$dataType$cont, _packet$dataType2;
                var content = msg.clip((_packet$dataType$offs = (_packet$dataType = packet.dataType) === null || _packet$dataType === void 0 ? void 0 : _packet$dataType.offset) !== null && _packet$dataType$offs !== void 0 ? _packet$dataType$offs : 0, (_packet$dataType$cont = (_packet$dataType2 = packet.dataType) === null || _packet$dataType2 === void 0 ? void 0 : _packet$dataType2.contentLength) !== null && _packet$dataType$cont !== void 0 ? _packet$dataType$cont : 0);
                this.IIPReply(packet.callbackId, _TypeTemplate["default"].parse(content));
              } else {
                iipReportError(packet.callbackId, _ErrorType["default"].Management, _ExceptionCode["default"].TemplateNotFound.index, "Template not found");
              }
              break;
            case _IIPPacketAction["default"].QueryLink:
            case _IIPPacketAction["default"].ResourceChildren:
            case _IIPPacketAction["default"].ResourceParents:
            case _IIPPacketAction["default"].ResourceHistory:
            case _IIPPacketAction["default"].LinkTemplates:
              this.IIPReply(packet.callbackId, packet.dataType, msg);
              break;
            case _IIPPacketAction["default"].InvokeFunction:
            case _IIPPacketAction["default"].StaticCall:
            case _IIPPacketAction["default"].ProcedureCall:
              this.IIPReplyInvoke(packet.callbackId, packet.dataType, msg);
              break;

            // case IIPPacketAction.GetProperty:
            //     this.IIPReply(packet.callbackId, packet.content);
            //     break;
            // case IIPPacketAction.GetPropertyIfModified:
            //     this.IIPReply(packet.callbackId, packet.content);
            //     break;

            case _IIPPacketAction["default"].Listen:
            case _IIPPacketAction["default"].Unlisten:
            case _IIPPacketAction["default"].SetProperty:
              this.IIPReply(packet.callbackId);
              break;

            // Attribute
            case _IIPPacketAction["default"].GetAllAttributes:
            case _IIPPacketAction["default"].GetAttributes:
              this.IIPReply(packet.callbackId, packet.dataType, msg);
              break;
            case _IIPPacketAction["default"].UpdateAllAttributes:
            case _IIPPacketAction["default"].UpdateAttributes:
            case _IIPPacketAction["default"].ClearAllAttributes:
            case _IIPPacketAction["default"].ClearAttributes:
              this.IIPReply(packet.callbackId);
              break;
            case _IIPPacketAction["default"].KeepAlive:
              this.IIPReply(packet.callbackId, packet.currentTime, packet.jitter);
              break;
          }
        } else if (packet.command == _IIPPacketCommand["default"].Report) {
          switch (packet.report) {
            case _IIPPacketReport["default"].ManagementError:
              this.IIPReportError(packet.callbackId, _ErrorType["default"].Management, packet.errorCode, null);
              break;
            case _IIPPacketReport["default"].ExecutionError:
              this.IIPReportError(packet.callbackId, _ErrorType["default"].Exception, packet.errorCode, packet.errorMessage);
              break;
            case _IIPPacketReport["default"].ProgressReport:
              this.IIPReportProgress(packet.callbackId, _ProgressType["default"].Execution, packet.progressValue, packet.progressMax);
              break;
            case _IIPPacketReport["default"].ChunkStream:
              this.IIPReportChunk(packet.callbackId, packet.dataType, msg);
              break;
          }
        }
      } catch (ex) {
        console.log("Esiur Error ", ex);
      }
    }
  } else {
    var authPacket = (0, _classPrivateFieldGet25["default"])(this, _authPacket);
    var _rt = authPacket.parse(msg, offset, ends);
    if (_rt <= 0) {
      data.holdAllFor(msg, ends - _rt);
      return ends;
    } else {
      offset += _rt;
      if ((0, _classPrivateFieldGet25["default"])(this, _session).authenticationType == _AuthenticationType["default"].Host) {
        _classPrivateMethodGet(this, _processHostAuth, _processHostAuth2).call(this, msg);
      } else if ((0, _classPrivateFieldGet25["default"])(this, _session).authenticationType == _AuthenticationType["default"].Client) {
        _classPrivateMethodGet(this, _processClientAuth, _processClientAuth2).call(this, msg);
      }
    }
  }
  return offset;
}
function _processClientAuth2(data) {
  var _this5 = this;
  var authPacket = (0, _classPrivateFieldGet25["default"])(this, _authPacket);
  var session = (0, _classPrivateFieldGet25["default"])(this, _session);
  if (authPacket.command == _IIPAuthPacketCommand["default"].Acknowledge) {
    // if there is a mismatch in authentication
    if (session.localMethod != authPacket.remoteMethod || session.remoteMethod != authPacket.localMethod) {
      var _classPrivateFieldGet3;
      (_classPrivateFieldGet3 = (0, _classPrivateFieldGet25["default"])(this, _openReply)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.triggerError(new Exception("Peer refused authentication method."));
      (0, _classPrivateFieldSet2["default"])(this, _openReply, null);
    }

    // Parse remote headers

    var dataType = authPacket.dataType;
    var pr = _Codec["default"].parse(data, dataType.offset, this, null, dataType);
    var rt = pr.reply.result;
    session.remoteHeaders = rt;
    if (session.localMethod == _AuthenticationMethod["default"].None) {
      // send establish
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketAction["default"].EstablishNewSession).done();
    } else if (session.localMethod == _AuthenticationMethod["default"].Credentials || session.localMethod == _AuthenticationMethod["default"].Token) {
      var remoteNonce = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Nonce);
      var localNonce = session.localHeaders.get(_IIPAuthPacketHeader["default"].Nonce);

      // send our hash
      // local nonce + password or token + remote nonce
      var challenge = _SHA["default"].compute((0, _DC.BL)().addDC(localNonce).addDC((0, _classPrivateFieldGet25["default"])(this, _localPasswordOrToken)).addDC(remoteNonce).toDC());
      _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketAction["default"].AuthenticateHash).addUint8(_IIPAuthPacketHashAlgorithm["default"].SHA256).addUint16(challenge.length).addDC(challenge).done();
    }
  } else if (authPacket.command == _IIPAuthPacketCommand["default"].Action) {
    if (authPacket.action == _IIPAuthPacketAction["default"].AuthenticateHash) {
      var remoteNonce = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Nonce);
      var localNonce = session.localHeaders.get(_IIPAuthPacketHeader["default"].Nonce);

      // check if the server knows my password

      var challenge = _SHA["default"].compute((0, _DC.BL)().addDC(remoteNonce).addDC((0, _classPrivateFieldGet25["default"])(this, _localPasswordOrToken)).addDC(localNonce).toDC());
      if (challenge.sequenceEqual(authPacket.challenge)) {
        // send establish request
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketAction["default"].EstablishNewSession).done();
      } else {
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].ChallengeFailed.index).addUint16(16).addString("Challenge Failed").done();
      }
    }
  } else if (authPacket.command == _IIPAuthPacketCommand["default"].Event) {
    if (authPacket.event == _IIPAuthPacketEvent["default"].ErrorTerminate || authPacket.event == _IIPAuthPacketEvent["default"].ErrorMustEncrypt || authPacket.event == _IIPAuthPacketEvent["default"].ErrorRetry) {
      var _classPrivateFieldGet4;
      (0, _classPrivateFieldSet2["default"])(this, _invalidCredentials, true);
      (_classPrivateFieldGet4 = (0, _classPrivateFieldGet25["default"])(this, _openReply)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.triggerError(new _AsyncException["default"](_ErrorType["default"].Management, authPacket.errorCode, authPacket.message));
      (0, _classPrivateFieldSet2["default"])(this, _openReply, null);
      var ex = new _AsyncException["default"](_ErrorType["default"].Management, authPacket.errorCode, authPacket.message);
      this._emit("error", this, ex);
      this.close();
    } else if (authPacket.event == _IIPAuthPacketEvent["default"].IndicationEstablished) {
      session.id = authPacket.sessionId;
      session.authorizedAccount = authPacket.accountId.getString(0, authPacket.accountId.length);
      (0, _classPrivateFieldSet2["default"])(this, _ready, true);
      (0, _classPrivateFieldSet2["default"])(this, _status, _ConnectionStatus["default"].Connected);

      // put it in the warehouse

      if (this.instance == null) {
        _Warehouse["default"].put(session.authorizedAccount.replaceAll("/", "_"), this, null, (0, _classPrivateFieldGet25["default"])(this, _server)).then(function (x) {
          var _classPrivateFieldGet5;
          (_classPrivateFieldGet5 = (0, _classPrivateFieldGet25["default"])(_this5, _openReply)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.trigger(true);
          _this5._emit("ready", _this5);
          (0, _classPrivateFieldSet2["default"])(_this5, _openReply, null);
        }).error(function (x) {
          var _classPrivateFieldGet6;
          (_classPrivateFieldGet6 = (0, _classPrivateFieldGet25["default"])(_this5, _openReply)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.triggerError(x);
          (0, _classPrivateFieldSet2["default"])(_this5, _openReply, null);
        });
      } else {
        var _classPrivateFieldGet7;
        (_classPrivateFieldGet7 = (0, _classPrivateFieldGet25["default"])(this, _openReply)) === null || _classPrivateFieldGet7 === void 0 || _classPrivateFieldGet7.trigger(true);
        (0, _classPrivateFieldSet2["default"])(this, _openReply, null);
        this._emit("ready", this);
      }

      // start perodic keep alive timer
      (0, _classPrivateFieldSet2["default"])(this, _keepAliveTimer, setInterval(_classPrivateMethodGet(this, _keepAliveTimerElapsed, _keepAliveTimerElapsed2).bind(this), this.keepAliveInterval * 1000));
    } else if (authPacket.event == _IIPAuthPacketEvent["default"].IAuthPlain) {
      var _dataType = authPacket.dataType;
      var _pr = _Codec["default"].parse(data, _dataType.offset, this, null, _dataType);
      var headers = _pr.reply.result;
      var iAuthRequest = new _AuthorizationRequest["default"](headers);
      if (authenticator == null) {
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].NotSupported.index).addUint16(13).addString("Not supported").done();
      } else {
        this.authenticator(iAuthRequest).then(function (response) {
          _classPrivateMethodGet(_this5, _sendParams, _sendParams2).call(_this5).addUint8(_IIPAuthPacketAction["default"].IAuthPlain).addUint32(headers.get(_IIPAuthPacketIAuthHeader["default"].Reference)).addDC(_Codec["default"].compose(response, _this5)).done();
        }).timeout(iAuthRequest.timeout * 1000, function () {
          _classPrivateMethodGet(_this5, _sendParams, _sendParams2).call(_this5).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].Timeout.index).addUint16(7).addString("Timeout").done();
        });
      }
    } else if (authPacket.event == _IIPAuthPacketEvent["default"].IAuthHashed) {
      var _dataType2 = authPacket.dataType;
      var parsed = _Codec["default"].parse(data, _dataType2.offset, this, null, _dataType2);
      var _headers = parsed.reply.result;
      var _iAuthRequest = new _AuthorizationRequest["default"](_headers);
      if (this.authenticator == null) {
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].NotSupported.index).addUint16(13).addString("Not supported").done();
      } else {
        this.authenticator(_iAuthRequest).then(function (response) {
          var hash = _SHA["default"].compute((0, _DC.BL)().addDC(session.localHeaders.get(_IIPAuthPacketHeader["default"].Nonce)).addDC(_Codec["default"].compose(response, _this5)).addDC(session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Nonce)).toDC());
          _classPrivateMethodGet(_this5, _sendParams, _sendParams2).call(_this5).addUint8(_IIPAuthPacketAction["default"].IAuthHashed).addUint32(_headers.get(_IIPAuthPacketIAuthHeader["default"].Reference)).addUint8(_IIPAuthPacketHashAlgorithm["default"].SHA256).addUint16(hash.length).addDC(hash).done();
        }).timeout(_iAuthRequest.timeout * 1000, function () {
          _classPrivateMethodGet(_this5, _sendParams, _sendParams2).call(_this5).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].Timeout.index).addUint16(7).addString("Timeout").done();
        });
      }
    } else if (authPacket.event == _IIPAuthPacketEvent["default"].IAuthEncrypted) {
      throw new Exception("IAuthEncrypted not implemented.");
    }
  }
}
function _processHostAuth2(data) {
  var _this6 = this;
  var authPacket = (0, _classPrivateFieldGet25["default"])(this, _authPacket);
  var session = (0, _classPrivateFieldGet25["default"])(this, _session);
  if (authPacket.command == _IIPAuthPacketCommand["default"].Initialize) {
    // Parse headers

    var dataType = authPacket.dataType;
    var parsed = _Codec["default"].parse(data, dataType.offset, this, null, dataType);
    var rt = parsed.reply.result;
    session.remoteHeaders = rt;
    session.remoteMethod = authPacket.localMethod;
    if (authPacket.initialization == _IIPAuthPacketInitialize["default"].CredentialsNoAuth) {
      try {
        var _classPrivateFieldGet8;
        var username = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Username);
        var domain = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Domain);
        if (((_classPrivateFieldGet8 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.membership) == null) {
          var errMsg = _DC.DC.stringToBytes("Membership not set.");
          _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(errMsg.length).addDC(errMsg).done();
        } else {
          (0, _classPrivateFieldGet25["default"])(this, _server).membership.userExists(username, domain).then(function (x) {
            if (x != null) {
              session.authorizedAccount = x;
              var localHeaders = session.localHeaders;
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketAcknowledge["default"].NoAuthCredentials).addDC(_Codec["default"].compose(localHeaders, _this6)).done();
            } else {
              // Send user not found error
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].UserOrTokenNotFound.index).addUint16(14).addString("User not found").done();
            }
          });
        }
      } catch (ex) {
        // Send the server side error
        var _errMsg = _DC.DC.stringToBytes(ex.toString());
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(_errMsg.length).addDC(_errMsg).done();
      }
    } else if (authPacket.initialization == _IIPAuthPacketInitialize["default"].TokenNoAuth) {
      try {
        var _classPrivateFieldGet9;
        if (((_classPrivateFieldGet9 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.membership) == null) {
          _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].UserOrTokenNotFound.index).addUint16(15).addString("Token not found").done();
        }
        // Check if user and token exists
        else {
          var _classPrivateFieldGet10;
          var tokenIndex = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].TokenIndex);
          var _domain = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Domain);
          (_classPrivateFieldGet10 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet10 === void 0 || (_classPrivateFieldGet10 = _classPrivateFieldGet10.membership) === null || _classPrivateFieldGet10 === void 0 || _classPrivateFieldGet10.tokenExists(tokenIndex, _domain).then(function (x) {
            if (x != null) {
              session.authorizedAccount = x;
              var localHeaders = session.localHeaders;
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketAcknowledge["default"].NoAuthToken).addDC(_Codec["default"].compose(localHeaders, _this6)).done();
            } else {
              // Send token not found error.
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].UserOrTokenNotFound.index).addUint16(15).addString("Token not found").done();
            }
          });
        }
      } catch (ex) {
        // Sender server side error.

        var _errMsg2 = _DC.DC.stringToBytes(ex.toString());
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(_errMsg2.length).addDC(_errMsg2).done();
      }
    } else if (authPacket.initialization == _IIPAuthPacketInitialize["default"].NoAuthNoAuth) {
      try {
        var _classPrivateFieldGet11, _classPrivateFieldGet12;
        // Check if guests are allowed
        if ((_classPrivateFieldGet11 = (_classPrivateFieldGet12 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet12 === void 0 || (_classPrivateFieldGet12 = _classPrivateFieldGet12.membership) === null || _classPrivateFieldGet12 === void 0 ? void 0 : _classPrivateFieldGet12.guestsAllowed) !== null && _classPrivateFieldGet11 !== void 0 ? _classPrivateFieldGet11 : true) {
          var localHeaders = session.localHeaders;
          session.authorizedAccount = "g-" + _Global["default"].generateCode();
          (0, _classPrivateFieldSet2["default"])(this, _readyToEstablish, true);
          _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketAcknowledge["default"].NoAuthNoAuth).addDC(_Codec["default"].compose(localHeaders, this)).done();
        } else {
          // Send access denied error because the server does not allow guests.
          _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].AccessDenied.index).addUint16(18).addString("Guests not allowed").done();
        }
      } catch (ex) {
        // Send the server side error.
        var _errMsg3 = _DC.DC.stringToBytes(ex.toString());
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(_errMsg3.length).addDC(_errMsg3).done();
      }
    }
  } else if (authPacket.command == _IIPAuthPacketCommand["default"].Action) {
    if (authPacket.action == _IIPAuthPacketAction["default"].AuthenticateHash) {
      var remoteHash = authPacket.challenge;
      var reply;
      try {
        if (session.remoteMethod == _AuthenticationMethod["default"].Credentials) {
          reply = (0, _classPrivateFieldGet25["default"])(this, _server).membership.getPassword(session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Username), session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Domain));
        } else if (session.remoteMethod == _AuthenticationMethod["default"].Token) {
          reply = (0, _classPrivateFieldGet25["default"])(this, _server).membership.getToken(session.remoteHeaders.get(_IIPAuthPacketHeader["default"].TokenIndex), session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Domain));
        } else {
          // Error
          throw Exception("Unsupported authentication method");
        }
        reply.then(function (pw) {
          if (pw != null) {
            var localNonce = session.localHeaders.get(_IIPAuthPacketHeader["default"].Nonce);
            var remoteNonce = session.remoteHeaders.get(_IIPAuthPacketHeader["default"].Nonce);
            var hash = _SHA["default"].compute((0, _DC.BL)().addDC(remoteNonce).addDC(pw).addDC(localNonce).toDC());
            if (hash.sequenceEqual(remoteHash)) {
              // send our hash
              var localHash = _SHA["default"].compute((0, _DC.BL)().addDC(localNonce).addDC(pw).addDC(remoteNonce).toDC());
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketAction["default"].AuthenticateHash).addUint8(_IIPAuthPacketHashAlgorithm["default"].SHA256).addUint16(localHash.length).addDC(localHash).done();
              (0, _classPrivateFieldSet2["default"])(_this6, _readyToEstablish, true);
            } else {
              _classPrivateMethodGet(_this6, _sendParams, _sendParams2).call(_this6).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].AccessDenied.index).addUint16(13).addString("Access Denied").done();
            }
          }
        });
      } catch (ex) {
        var errMsg = _DC.DC.stringToBytes(ex.toString());
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(errMsg.length).addDC(errMsg).done();
      }
    } else if (authPacket.action == _IIPAuthPacketAction["default"].IAuthPlain) {
      var _classPrivateFieldGet13;
      var reference = authPacket.reference;
      var dataType = authPacket.dataType;
      var parsed = _Codec["default"].parse(data, dataType.offset, this, null, dataType);
      var value = parsed.reply.result;
      (_classPrivateFieldGet13 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet13 === void 0 || (_classPrivateFieldGet13 = _classPrivateFieldGet13.membership) === null || _classPrivateFieldGet13 === void 0 || _classPrivateFieldGet13.authorizePlain(session, reference, value).then(function (x) {
        return _classPrivateMethodGet(_this6, _processAuthorization, _processAuthorization2).call(_this6, x);
      });
    } else if (authPacket.action == _IIPAuthPacketAction["default"].IAuthHashed) {
      var _classPrivateFieldGet14;
      var _reference = authPacket.reference;
      var _value = authPacket.challenge;
      var algorithm = authPacket.hashAlgorithm;
      var _self2 = this;
      (_classPrivateFieldGet14 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet14 === void 0 || (_classPrivateFieldGet14 = _classPrivateFieldGet14.membership) === null || _classPrivateFieldGet14 === void 0 || _classPrivateFieldGet14.authorizeHashed(session, _reference, algorithm, _value).then(function (x) {
        return _classPrivateMethodGet(_self2, _processAuthorization, _processAuthorization2).call(_self2, x);
      });
    } else if (authPacket.action == _IIPAuthPacketAction["default"].IAuthEncrypted) {
      var _classPrivateFieldGet15;
      var _reference2 = authPacket.reference;
      var _value2 = authPacket.challenge;
      var _algorithm = authPacket.publicKeyAlgorithm;
      var _self3 = this;
      (_classPrivateFieldGet15 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet15 === void 0 || (_classPrivateFieldGet15 = _classPrivateFieldGet15.membership) === null || _classPrivateFieldGet15 === void 0 || _classPrivateFieldGet15.authorizeEncrypted(session, _reference2, _algorithm, _value2).then(function (x) {
        return _classPrivateMethodGet(_self3, _processAuthorization, _processAuthorization2).call(_self3, x);
      });
    } else if (authPacket.action == _IIPAuthPacketAction["default"].EstablishNewSession) {
      if ((0, _classPrivateFieldGet25["default"])(this, _readyToEstablish)) {
        var _classPrivateFieldGet16;
        if (((_classPrivateFieldGet16 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet16 === void 0 ? void 0 : _classPrivateFieldGet16.membership) == null) {
          _classPrivateMethodGet(this, _processAuthorization, _processAuthorization2).call(this, null);
        } else {
          var _classPrivateFieldGet17;
          var _self4 = this;
          (_classPrivateFieldGet17 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet17 === void 0 || (_classPrivateFieldGet17 = _classPrivateFieldGet17.membership) === null || _classPrivateFieldGet17 === void 0 || _classPrivateFieldGet17.authorize(session).then(function (x) {
            _classPrivateMethodGet(_self4, _processAuthorization, _processAuthorization2).call(_self4, x);
          });
        }
      } else {
        _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(9).addString("Not ready").done();
      }
    }
  }
}
function _processAuthorization2(results) {
  var _this7 = this;
  if (results == null || results.response == _AuthorizationResultsResponse["default"].Success) {
    (0, _classPrivateFieldGet25["default"])(this, _session).id = _Global["default"].generateCode(32);
    var accountId = _DC.DC.stringToBytes((0, _classPrivateFieldGet25["default"])(this, _session).authorizedAccount);
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].IndicationEstablished).addUint8((0, _classPrivateFieldGet25["default"])(this, _session).id.length).addUint8Array((0, _classPrivateFieldGet25["default"])(this, _session).id).addUint8(accountId.length).addUint8Array(accountId).done();
    if (this.instance == null) {
      _Warehouse["default"].put((0, _classPrivateFieldGet25["default"])(this, _session).authorizedAccount.replaceAll("/", "_"), this, null, (0, _classPrivateFieldGet25["default"])(this, _server)).then(function (x) {
        var _classPrivateFieldGet18, _classPrivateFieldGet19;
        (0, _classPrivateFieldSet2["default"])(_this7, _ready, true);
        (0, _classPrivateFieldSet2["default"])(_this7, _status, _ConnectionStatus["default"].Connected);
        (_classPrivateFieldGet18 = (0, _classPrivateFieldGet25["default"])(_this7, _openReply)) === null || _classPrivateFieldGet18 === void 0 || _classPrivateFieldGet18.trigger(true);
        (0, _classPrivateFieldSet2["default"])(_this7, _openReply, null);
        _this7._emit("ready", _this7);
        (_classPrivateFieldGet19 = (0, _classPrivateFieldGet25["default"])(_this7, _server)) === null || _classPrivateFieldGet19 === void 0 || (_classPrivateFieldGet19 = _classPrivateFieldGet19.membership) === null || _classPrivateFieldGet19 === void 0 || _classPrivateFieldGet19.login((0, _classPrivateFieldGet25["default"])(_this7, _session));
        (0, _classPrivateFieldSet2["default"])(_this7, _loginDate, new Date());
      }).error(function (x) {
        var _classPrivateFieldGet20;
        (_classPrivateFieldGet20 = (0, _classPrivateFieldGet25["default"])(_this7, _openReply)) === null || _classPrivateFieldGet20 === void 0 || _classPrivateFieldGet20.triggerError(x);
        (0, _classPrivateFieldSet2["default"])(_this7, _openReply, null);
      });
    } else {
      var _classPrivateFieldGet21, _classPrivateFieldGet22;
      (0, _classPrivateFieldSet2["default"])(this, _ready, true);
      (0, _classPrivateFieldSet2["default"])(this, _status, _ConnectionStatus["default"].Connected);
      (_classPrivateFieldGet21 = (0, _classPrivateFieldGet25["default"])(this, _openReply)) === null || _classPrivateFieldGet21 === void 0 || _classPrivateFieldGet21.trigger(true);
      (0, _classPrivateFieldSet2["default"])(this, _openReply, null);
      this._emit("ready", this);
      (_classPrivateFieldGet22 = (0, _classPrivateFieldGet25["default"])(this, _server)) === null || _classPrivateFieldGet22 === void 0 || (_classPrivateFieldGet22 = _classPrivateFieldGet22.membership) === null || _classPrivateFieldGet22 === void 0 || _classPrivateFieldGet22.login(session);
    }
  } else if (results.response == _AuthorizationResultsResponse["default"].Failed) {
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].ChallengeFailed.index).addUint16(21).addString("Authentication failed").done();
  } else if (results.response == _AuthorizationResultsResponse["default"].Expired) {
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].Timeout.index).addUint16(22).addString("Authentication expired").done();
  } else if (results.response == _AuthorizationResultsResponse["default"].ServiceUnavailable) {
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].ErrorTerminate).addUint8(_ExceptionCode["default"].GeneralFailure.index).addUint16(19).addString("Service unavailable").done();
  } else if (results.response == _AuthorizationResultsResponse["default"].IAuthPlain) {
    var args = new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))();
    args.set(_IIPAuthPacketIAuthHeader["default"].Reference, results.reference);
    args.set(_IIPAuthPacketIAuthHeader["default"].Destination, results.destination);
    args.set(_IIPAuthPacketIAuthHeader["default"].Expire, results.expire);
    args.set(_IIPAuthPacketIAuthHeader["default"].Clue, results.clue);
    args.set(_IIPAuthPacketIAuthHeader["default"].RequiredFormat, results.requiredFormat);
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].IAuthPlain).addDC(_Codec["default"].compose(args, this)).done();
  } else if (results.response == _AuthorizationResultsResponse["default"].IAuthHashed) {
    var args = new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))();
    args.set(_IIPAuthPacketIAuthHeader["default"].Reference, results.reference);
    args.set(_IIPAuthPacketIAuthHeader["default"].Destination, results.destination);
    args.set(_IIPAuthPacketIAuthHeader["default"].Expire, results.expire);
    args.set(_IIPAuthPacketIAuthHeader["default"].Clue, results.clue);
    args.set(_IIPAuthPacketIAuthHeader["default"].RequiredFormat, results.requiredFormat);
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].IAuthHashed).addDC(_Codec["default"].compose(args, this)).done();
  } else if (results.response == _AuthorizationResultsResponse["default"].IAuthEncrypted) {
    var args = new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))();
    args.set(_IIPAuthPacketIAuthHeader["default"].Reference, results.reference);
    args.set(_IIPAuthPacketIAuthHeader["default"].Destination, results.destination);
    args.set(_IIPAuthPacketIAuthHeader["default"].Expire, results.expire);
    args.set(_IIPAuthPacketIAuthHeader["default"].Clue, results.clue);
    args.set(_IIPAuthPacketIAuthHeader["default"].RequiredFormat, results.requiredFormat);
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketEvent["default"].IAuthEncrypted).addDC(_Codec["default"].compose(args, this)).done();
  }
}
function _dataReceived2(data) {
  var _classPrivateFieldGet23;
  var msg = data.read();
  var offset = 0;
  var ends = msg.length;
  (0, _classPrivateFieldGet25["default"])(this, _socket).hold();
  try {
    while (offset < ends) {
      offset = _classPrivateMethodGet(this, _processPacket, _processPacket2).call(this, msg, offset, ends, data);
    }
  } catch (ex) {
    console.log(ex);
  }
  (_classPrivateFieldGet23 = (0, _classPrivateFieldGet25["default"])(this, _socket)) === null || _classPrivateFieldGet23 === void 0 || _classPrivateFieldGet23.unhold();
}
function _connectSocket2(socket) {
  var self = this;
  socket.connect((0, _classPrivateFieldGet25["default"])(this, _hostname), (0, _classPrivateFieldGet25["default"])(this, _port), (0, _classPrivateFieldGet25["default"])(this, _secure)).then(function (x) {
    self.assign(socket);
  }).error(function (x) {
    if (self.autoReconnect) {
      console.log("Reconnecting socket...");
      setTimeout(function () {
        _classPrivateMethodGet(self, _connectSocket, _connectSocket2).call(self, socket);
      }, self.reconnectInterval * 1000);
    } else {
      var _classPrivateFieldGet24;
      (_classPrivateFieldGet24 = (0, _classPrivateFieldGet25["default"])(self, _openReply)) === null || _classPrivateFieldGet24 === void 0 || _classPrivateFieldGet24.triggerError(x);
      (0, _classPrivateFieldSet2["default"])(self, _openReply, null);
    }
  });
}
function _declare2() {
  if ((0, _classPrivateFieldGet25["default"])(this, _session).localMethod == _AuthenticationMethod["default"].Credentials && (0, _classPrivateFieldGet25["default"])(this, _session).remoteMethod == _AuthenticationMethod["default"].None) {
    // change to Map<byte, object> for compatibility
    var headers = _Codec["default"].compose((0, _classPrivateFieldGet25["default"])(this, _session).localHeaders, this);

    // declare (Credentials -> No Auth, No Enctypt)
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketInitialize["default"].CredentialsNoAuth).addDC(headers).done();
  } else if ((0, _classPrivateFieldGet25["default"])(this, _session).localMethod == _AuthenticationMethod["default"].Token && (0, _classPrivateFieldGet25["default"])(this, _session).remoteMethod == _AuthenticationMethod["default"].None) {
    // change to Map<byte, object> for compatibility
    var _headers2 = _Codec["default"].compose((0, _classPrivateFieldGet25["default"])(this, _session).localHeaders, this);
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketInitialize["default"].TokenNoAuth).addDC(_headers2).done();
  } else if ((0, _classPrivateFieldGet25["default"])(this, _session).localMethod == _AuthenticationMethod["default"].None && (0, _classPrivateFieldGet25["default"])(this, _session).remoteMethod == _AuthenticationMethod["default"].None) {
    // change to Map<byte, object> for compatibility
    var _headers3 = _Codec["default"].compose((0, _classPrivateFieldGet25["default"])(this, _session).localHeaders, this);

    // @REVIEW: MITM Attack can still occure
    _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(_IIPAuthPacketInitialize["default"].NoAuthNoAuth).addDC(_headers3).done();
  } else {
    throw new Exception("Authentication method is not implemented.");
  }
}
function _unsubscribeAll2() {
  var _iterator2 = _createForOfIteratorHelper((0, _classPrivateFieldGet25["default"])(this, _subscriptions).keys()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _resource = _step2.value;
      _resource.instance.off("EventOccurred", (0, _classPrivateFieldGet25["default"])(this, _instance_eventOccurred), this);
      _resource.instance.off("PropertyModified", (0, _classPrivateFieldGet25["default"])(this, _instance_propertyModified), this);
      _resource.instance.off("ResourceDestroyed", (0, _classPrivateFieldGet25["default"])(this, _instance_resourceDestroyed), this);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  (0, _classPrivateFieldGet25["default"])(this, _subscriptions).clear();
}
function _sendRequest2(action) {
  var _this$callbackCounter, _this$callbackCounter2;
  var reply = new _AsyncReply["default"]();
  (0, _classPrivateFieldSet2["default"])(this, _callbackCounter, (_this$callbackCounter = (0, _classPrivateFieldGet25["default"])(this, _callbackCounter), _this$callbackCounter2 = _this$callbackCounter++, _this$callbackCounter)), _this$callbackCounter2;
  (0, _classPrivateFieldGet25["default"])(this, _requests).set((0, _classPrivateFieldGet25["default"])(this, _callbackCounter), reply);
  return _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this, reply).addUint8(0x40 | action).addUint32((0, _classPrivateFieldGet25["default"])(this, _callbackCounter));
}
function _sendError2(type, callbackId, errorCode) {
  var errorMessage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var msg = _DC.DC.stringToBytes(errorMessage);
  if (type == _ErrorType["default"].Management) _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0xC0 | _IIPPacketReport["default"].ManagementError).addUint32(callbackId).addUint16(errorCode).done();else if (type == _ErrorType["default"].Exception) _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0xC0 | _IIPPacketReport["default"].ExecutionError).addUint32(callbackId).addUint16(errorCode).addUint16(msg.length).addUint8Array(msg).done();
}
function _sendProgress2(callbackId, value, max) {
  _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0xC0 | _IIPPacketReport["default"].ProgressReport).addUint32(callbackId).addInt32(value).addInt32(max).done();
}
function _sendChunk2(callbackId, chunk) {
  var c = _Codec["default"].compose(chunk, this);
  _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0xC0 | _IIPPacketReport["default"].ChunkStream).addUint32(callbackId).addUint8Array(c).done();
}
function _sendReply2(action, callbackId) {
  return _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(0x80 | action).addUint32(callbackId);
}
function _sendEvent2(evt) {
  return _classPrivateMethodGet(this, _sendParams, _sendParams2).call(this).addUint8(evt);
}
function _subscribe2(resource) {
  resource.instance.on("EventOccurred", (0, _classPrivateFieldGet25["default"])(this, _instance_eventOccurred), this);
  resource.instance.on("PropertyModified", (0, _classPrivateFieldGet25["default"])(this, _instance_propertyModified), this);
  resource.instance.on("ResourceDestroyed", (0, _classPrivateFieldGet25["default"])(this, _instance_resourceDestroyed), this);
  (0, _classPrivateFieldGet25["default"])(this, _subscriptions).set(resource, []);
}
function _unsubscribe2(resource) {
  resource.instance.off("EventOccurred", (0, _classPrivateFieldGet25["default"])(this, _instance_eventOccurred), this);
  resource.instance.off("PropertyModified", (0, _classPrivateFieldGet25["default"])(this, _instance_propertyModified), this);
  resource.instance.off("ResourceDestroyed", (0, _classPrivateFieldGet25["default"])(this, _instance_resourceDestroyed), this);
  (0, _classPrivateFieldGet25["default"])(this, _subscriptions)["delete"](resource);
}
function _invokeFunction2(fi, callback, parameters, actionType) {
  var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var self = this;
  var indexedArgs = [];
  var _iterator3 = _createForOfIteratorHelper(parameters.entries()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
        k = _step3$value[0],
        _v = _step3$value[1];
      indexedArgs[k] = _v;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  indexedArgs.push(self);
  var rt;
  try {
    rt = fi.apply(target, indexedArgs);
  } catch (ex) {
    _classPrivateMethodGet(this, _sendError, _sendError2).call(this, _ErrorType["default"].Exception, callback, 0, ex.toString());
    return;
  }

  // Is iterator ?
  if (rt != null && rt[Symbol.iterator] instanceof Function) {
    var _iterator4 = _createForOfIteratorHelper(rt),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var v = _step4.value;
        _classPrivateMethodGet(this, _sendChunk, _sendChunk2).call(this, callback, v);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    _classPrivateMethodGet(this, _sendReply, _sendReply2).call(this, actionType, callback).addUint8(DataType.Void).done();
  } else if (rt instanceof _AsyncReply["default"]) {
    rt.then(function (res) {
      _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, actionType, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
    }).error(function (ex) {
      _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Exception, callback, ex.code, ex.message);
    }).progress(function (pt, pv, pm) {
      _classPrivateMethodGet(self, _sendProgress, _sendProgress2).call(self, callback, pv, pm);
    }).chunk(function (v) {
      _classPrivateMethodGet(self, _sendChunk, _sendChunk2).call(self, callback, v);
    });
  } else if (rt instanceof Promise) {
    rt.then(function (res) {
      _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, actionType, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
    })["catch"](function (ex) {
      _classPrivateMethodGet(self, _sendError, _sendError2).call(self, _ErrorType["default"].Exception, callback, 0, ex.toString());
    });
  } else {
    _classPrivateMethodGet(self, _sendReply, _sendReply2).call(self, actionType, callback).addUint8Array(_Codec["default"].compose(rt, self)).done();
  }
}
function _keepAliveTimerElapsed2() {
  // @TODO: port this
  // if (!this.isConnected)
  //     return;

  var self = this;
  var now = new Date();
  var interval = (0, _classPrivateFieldGet25["default"])(this, _lastKeepAliveSent) == null ? 0 : now - (0, _classPrivateFieldGet25["default"])(this, _lastKeepAliveSent);
  (0, _classPrivateFieldSet2["default"])(this, _lastKeepAliveSent, now);
  _classPrivateMethodGet(this, _sendRequest, _sendRequest2).call(this, _IIPPacketAction["default"].KeepAlive).addDateTime(now).addUint32(interval).done().then(function (x) {
    (0, _classPrivateFieldSet2["default"])(self, _jitter, x[1]);
    (0, _classPrivateFieldSet2["default"])(self, _keepAliveTimer, setTimeout(function () {
      return _classPrivateMethodGet(self, _keepAliveTimerElapsed, _keepAliveTimerElapsed2).call(self);
    }, self.keepAliveInterval * 1000));
    //console.log("Keep Alive Received " + self.jitter);

    // run GC
    var toBeRemoved = [];
    for (var i = 0; i < (0, _classPrivateFieldGet25["default"])(self, _attachedResources).length; i++) {
      var r = (0, _classPrivateFieldGet25["default"])(self, _attachedResources).values[i].deref();
      if (r == null) {
        var id = (0, _classPrivateFieldGet25["default"])(self, _attachedResources).keys[i];
        // send detach
        self._sendDetachRequest(id);
        toBeRemoved.push(id);
      }
    }
    if (toBeRemoved.length > 0) console.log("GC: " + toBeRemoved.length);
    for (var _i2 = 0, _toBeRemoved = toBeRemoved; _i2 < _toBeRemoved.length; _i2++) {
      var _id = _toBeRemoved[_i2];
      (0, _classPrivateFieldGet25["default"])(self, _attachedResources).remove(_id);
    }
  }).error(function (ex) {
    console.log(ex);
    self.close();
  }).timeout(self.keepAliveTime * 1000);

  //console.log("Keep alive sent ");
}

},{"../../Core/AsyncBag.js":39,"../../Core/AsyncException.js":40,"../../Core/AsyncQueue.js":41,"../../Core/AsyncReply.js":42,"../../Core/ErrorType.js":43,"../../Core/ExceptionCode.js":44,"../../Core/ProgressType.js":47,"../../Data/Codec.js":51,"../../Data/DC.js":52,"../../Data/ExtendedTypes.js":55,"../../Data/KeyList.js":58,"../../Data/PropertyValue.js":62,"../../Data/PropertyValueArray.js":63,"../../Data/TransmissionType.js":69,"../../Data/TypedMap.js":72,"../../Misc/Global.js":75,"../../Net/Packets/IIPAuthPacketAcknowledge.js":91,"../../Net/Packets/IIPAuthPacketAction.js":92,"../../Net/Packets/IIPAuthPacketEvent.js":94,"../../Net/Packets/IIPAuthPacketHashAlgorithm.js":95,"../../Net/Packets/IIPAuthPacketHeader.js":96,"../../Net/Packets/IIPAuthPacketIAuthHeader.js":99,"../../Net/Packets/IIPAuthPacketInitialize.js":100,"../../Resource/IResource.js":115,"../../Resource/IStore.js":116,"../../Resource/Template/TemplateDescriber.js":126,"../../Resource/Template/TemplateType.js":127,"../../Resource/Template/TypeTemplate.js":128,"../../Resource/Warehouse.js":129,"../../Security/Authority/Authentication.js":130,"../../Security/Authority/AuthenticationMethod.js":131,"../../Security/Authority/AuthenticationType.js":132,"../../Security/Authority/ClientAuthentication.js":133,"../../Security/Authority/HostAuthentication.js":134,"../../Security/Authority/Session.js":135,"../../Security/Integrity/SHA256.js":136,"../../Security/Membership/AuthorizationRequest.js":137,"../../Security/Membership/AuthorizationResultsResponse.js":139,"../../Security/Permissions/ActionType.js":141,"../../Security/Permissions/Ruling.js":143,"../Packets//IIPPacketReport.js":106,"../Packets/IIPAuthPacket.js":90,"../Packets/IIPAuthPacketCommand.js":93,"../Packets/IIPPacket.js":102,"../Packets/IIPPacketAction.js":103,"../Packets/IIPPacketCommand.js":104,"../Packets/IIPPacketEvent.js":105,"../SendList.js":107,"../Sockets/SocketState.js":109,"../Sockets/WSocket.js":110,"./ConnectionStatus.js":76,"./DistributedPropertyContext.js":78,"./DistributedResource.js":79,"./DistributedResourceAttachRequestInfo.js":80,"./DistributedResourceQueueItem.js":81,"./DistributedResourceQueueItemType.js":82,"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/classPrivateFieldGet":10,"@babel/runtime/helpers/classPrivateFieldSet":11,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/slicedToArray":28,"@babel/runtime/helpers/toConsumableArray":30,"@babel/runtime/regenerator":36}],78:[function(require,module,exports){
/*
* Copyright (c) 2017-2018 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 27/10/2018.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var DistributedPropertyContext = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function DistributedPropertyContext(p1, p2) {
  (0, _classCallCheck2["default"])(this, DistributedPropertyContext);
  if (arguments.length == 1) {
    this.method = p1;
  } else if (arguments.length == 2) {
    this.connection = p1;
    this.value = p2;
  }
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],79:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IResource2 = _interopRequireDefault(require("../../Resource/IResource.js"));
var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));
var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));
var _IIPPacketAction = _interopRequireDefault(require("../Packets//IIPPacketAction.js"));
var _EventTemplate = _interopRequireDefault(require("../../Resource/Template/EventTemplate.js"));
var _AsyncException = _interopRequireDefault(require("../../Core/AsyncException.js"));
var _ExceptionCode = _interopRequireDefault(require("../../Core//ExceptionCode.js"));
var _ErrorType = _interopRequireDefault(require("../../Core/ErrorType.js"));
var _ExtendedTypes = require("../../Data/ExtendedTypes.js");
var _TypedMap = _interopRequireDefault(require("../../Data/TypedMap.js"));
var _PropertyValueArray = _interopRequireDefault(require("../../Data/PropertyValueArray.js"));
var _PropertyValue = _interopRequireDefault(require("../../Data/PropertyValue.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DistributedResource = exports["default"] = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(DistributedResource, _IResource);
  function DistributedResource(connection, instanceId, age, link) {
    var _this;
    (0, _classCallCheck2["default"])(this, DistributedResource);
    _this = _callSuper(this, DistributedResource);
    _this._p = {
      destroyed: false,
      suspended: false,
      attached: false,
      connection: connection,
      instanceId: instanceId,
      age: age,
      link: link,
      properties: []
    };
    return _this;
  }
  (0, _createClass2["default"])(DistributedResource, [{
    key: "destroy",
    value: function destroy() {
      this._p.destroyed = true;
      this._p.attached = false;
      this._p.connection._sendDetachRequest(this._p.instanceId);
      this._emit("destroy", this);
    }
  }, {
    key: "destroyed",
    get: function get() {
      return this._p.destroyed;
    }
  }, {
    key: "_suspend",
    value: function _suspend() {
      this._p.suspended = true;
      this._p.attached = false;
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "_serialize",
    value: function _serialize() {
      var props = new _PropertyValueArray["default"]();
      for (var i = 0; i < this._p.properties.length; i++) props.push(new _PropertyValue["default"](this._p.properties[i], this.instance.getAge(i), this.instance.getModificationDate(i)));
      return props;
    }
  }, {
    key: "_attach",
    value: function _attach(properties) {
      if (this._p.attached) {
        console.log("Already attached.");
        return false;
      } else {
        this._p.attached = true;
        this._p.suspended = false;
        this._p.properties = [];
        for (var i = 0; i < properties.length; i++) {
          this.instance.setAge(i, properties[i].age);
          this.instance.setModificationDate(i, properties[i].date);
          this._p.properties.push(properties[i].value);
        }
        var self = this;
        var makeFunc = function makeFunc(ft) {
          var func = function func() {
            if (self._p.destroyed) throw new Error("Trying to access a destroyed object.");
            if (self._p.suspended) throw new Error("Trying to access a suspended object.");
            var argsMap = new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))();
            if (arguments.length == 1 && arguments[0] instanceof Object && arguments[0].constructor.name == "Object") {
              var argsObj = arguments[0];
              // named args
              for (var _i = 0; _i < ft.args.length; _i++) {
                var arg = ft.args[_i];
                if (argsObj[arg.name] != undefined) {
                  argsMap.set(new _ExtendedTypes.UInt8(arg.index), argsObj[arg.name]);
                }
              }
              return self._invoke(ft.index, argsMap);
            } else {
              for (var _i2 = 0; _i2 < arguments.length && _i2 < ft.args.length; _i2++) argsMap.set(new _ExtendedTypes.UInt8(_i2), arguments[_i2]);
              return self._invoke(ft.index, argsMap);
            }
          };

          // get annotation
          func.help = self.instance.template.functions[ft.index].annotation;
          return func;
        };
        var makeGetter = function makeGetter(index) {
          return function () {
            return self._get(index);
          };
        };
        var makeSetter = function makeSetter(index) {
          return /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(value) {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return self._set(index, value);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }();
        };
        for (var _i3 = 0; _i3 < this.instance.template.functions.length; _i3++) {
          var ft = this.instance.template.functions[_i3];
          this[ft.name] = makeFunc(ft);
        }
        for (var _i4 = 0; _i4 < this.instance.template.properties.length; _i4++) {
          var pt = this.instance.template.properties[_i4];
          Object.defineProperty(this, pt.name, {
            get: makeGetter(pt.index),
            set: makeSetter(pt.index),
            enumerable: true,
            configurable: true
          });
        }
      }
      return true;
    }
  }, {
    key: "listen",
    value: function listen(event) {
      var et = event instanceof _EventTemplate["default"] ? event : this.instance.template.getEventTemplateByName(event);
      if (et == null) return new _AsyncReply["default"]().triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].MethodNotFound, ""));
      if (!et.listenable) return new _AsyncReply["default"]().triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].NotListenable, ""));
      return this._p.connection._sendListenRequest(this._p.instanceId, et.index);
    }
  }, {
    key: "unlisten",
    value: function unlisten(event) {
      var et = event instanceof _EventTemplate["default"] ? event : this.instance.template.getEventTemplateByName(event);
      if (et == null) return new _AsyncReply["default"]().triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].MethodNotFound, ""));
      if (!et.listenable) return new _AsyncReply["default"]().triggerError(new _AsyncException["default"](_ErrorType["default"].Management, _ExceptionCode["default"].NotListenable, ""));
      return this._p.connection._sendUnlistenRequest(this._p.instanceId, et.index);
    }
  }, {
    key: "_emitEventByIndex",
    value: function _emitEventByIndex(index, args) {
      var et = this.instance.template.getEventTemplateByIndex(index);
      //@TODO if  array _emitArgs
      //this._emitArgs(et.name, [args]);
      this._emit(et.name, args);
      this.instance._emitResourceEvent(null, null, et, args);
    }
  }, {
    key: "_invoke",
    value: function _invoke(index, args) {
      if (this._p.destroyed) throw new Error("Trying to access a destroyed object.");
      if (this._p.suspended) throw new Error("Trying to access a suspended object.");
      if (index >= this.instance.template.functions.length) throw new Error("Function index is incorrect.");
      var ft = this.instance.template.getFunctionTemplateByIndex(index);
      if (ft == null) throw new Exception("Function template not found.");
      if (ft.isStatic) return this._p.connection.staticCall(this.instance.template.classId, index, args);else return this._p.connection._sendInvoke(this._p.instanceId, index, args);
    }
  }, {
    key: "_get",
    value: function _get(index) {
      if (index >= this._p.properties.length) return null;
      return this._p.properties[index];
    }
  }, {
    key: "_updatePropertyByIndex",
    value: function _updatePropertyByIndex(index, value) {
      var pt = this.instance.template.getPropertyTemplateByIndex(index);
      this._p.properties[index] = value;
      this.instance.emitModification(pt, value);

      // this to invoke other property setters
      this._p.neglect = true;
      this[pt.name] = null;
      this._p.neglect = false;
    }
  }, {
    key: "_set",
    value: function _set(index, value) {
      if (this._p.destroyed) throw new Error("Trying to access a destroyed object.");
      if (this._p.suspended) throw new Error("Trying to access a suspended object.");
      if (!this._p.attached) throw new Error("Resource not attached.");
      if (this._p.neglect) return;
      if (index >= this._p.properties.length) return null;

      // Awaiting null is not a problem in JS
      if (this._p.properties[index] == value) return null;
      var reply = new _AsyncReply["default"]();
      var self = this;
      this._p.connection._sendSetProperty(self._p.instanceId, index, value).then(function (res) {
        // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
        //self._p.properties[index] = value;
        reply.trigger(null);
      });
      return reply;
    }
  }]);
  return DistributedResource;
}(_IResource2["default"]);

},{"../../Core//ExceptionCode.js":44,"../../Core/AsyncException.js":40,"../../Core/AsyncReply.js":42,"../../Core/ErrorType.js":43,"../../Data/Codec.js":51,"../../Data/ExtendedTypes.js":55,"../../Data/PropertyValue.js":62,"../../Data/PropertyValueArray.js":63,"../../Data/TypedMap.js":72,"../../Resource/IResource.js":115,"../../Resource/Template/EventTemplate.js":121,"../Packets//IIPPacketAction.js":103,"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/regenerator":36}],80:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var DistributedResourceAttachRequestInfo = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function DistributedResourceAttachRequestInfo(reply, requestSequence) {
  (0, _classCallCheck2["default"])(this, DistributedResourceAttachRequestInfo);
  (0, _defineProperty2["default"])(this, "reply", void 0);
  (0, _defineProperty2["default"])(this, "requestSequence", void 0);
  this.reply = reply;
  this.requestSequence = requestSequence;
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],81:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var DistributedResourceQueueItem = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function DistributedResourceQueueItem(resource, type, value, index) {
  (0, _classCallCheck2["default"])(this, DistributedResourceQueueItem);
  this.resource = resource;
  this.index = index;
  this.type = type;
  this.value = value;
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Propery: 0,
  Event: 1
};

},{}],83:[function(require,module,exports){
/*
* Copyright (c) 2017-2021 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 03/05/2021.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IResource2 = _interopRequireDefault(require("../../Resource/IResource.js"));
var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));
var _DistributedConnection = _interopRequireDefault(require("./DistributedConnection.js"));
var _KeyList = _interopRequireDefault(require("../../Data/KeyList.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DistributedServer = exports["default"] = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(DistributedServer, _IResource);
  function DistributedServer() {
    var _this;
    (0, _classCallCheck2["default"])(this, DistributedServer);
    _this = _callSuper(this, DistributedServer);
    _this.connections = [];
    _this.calls = new _KeyList["default"]();
    return _this;
  }

  //@TODO: con.off("close", ...)
  (0, _createClass2["default"])(DistributedServer, [{
    key: "destroy",
    value: function destroy() {
      this.connections = [];
      this.destroyed = true;
      this._emit("destroy", this);
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "membership",
    get: function get() {
      return this.instance.attributes.get("membership");
    }
  }, {
    key: "entryPoint",
    get: function get() {
      return this.instance.attributes.get("entryPoint");
    }
  }, {
    key: "add",
    value: function add() {
      var self = this;
      var con = new _DistributedConnection["default"](this);
      con.on("close", function () {
        return self.remove(con);
      });
      this.connections.push(con);
      return con;
    }
  }, {
    key: "remove",
    value: function remove(connection) {
      var i = this.connections.indexOf(connection);
      if (i > -1) this.connections.splice(i, 1);
    }
  }, {
    key: "mapCall",
    value: function mapCall(call, handler) {
      this.calls.add(call, handler);
    }
  }]);
  return DistributedServer;
}(_IResource2["default"]);

},{"../../Core/AsyncReply.js":42,"../../Data/KeyList.js":58,"../../Resource/IResource.js":115,"./DistributedConnection.js":77,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],84:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IResource2 = _interopRequireDefault(require("../../Resource/IResource.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var EntryPoint = exports["default"] = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(EntryPoint, _IResource);
  function EntryPoint() {
    (0, _classCallCheck2["default"])(this, EntryPoint);
    return _callSuper(this, EntryPoint, arguments);
  }
  (0, _createClass2["default"])(EntryPoint, [{
    key: "query",
    value: function query(path, sender) {}
  }, {
    key: "create",
    value: function create() {}
  }]);
  return EntryPoint;
}(_IResource2["default"]);

},{"../../Resource/IResource.js":115,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],85:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IDestructible2 = _interopRequireDefault(require("../Core/IDestructible.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var INetworkReceiver = exports["default"] = /*#__PURE__*/function (_IDestructible) {
  (0, _inherits2["default"])(INetworkReceiver, _IDestructible);
  function INetworkReceiver() {
    (0, _classCallCheck2["default"])(this, INetworkReceiver);
    return _callSuper(this, INetworkReceiver, arguments);
  }
  (0, _createClass2["default"])(INetworkReceiver, [{
    key: "networkClose",
    value: function networkClose(sender) {}
  }, {
    key: "networkReceive",
    value: function networkReceive(sender, buffer) {}
  }, {
    key: "networkConnect",
    value: function networkConnect(sender) {}
  }]);
  return INetworkReceiver;
}(_IDestructible2["default"]);

},{"../Core/IDestructible.js":45,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],86:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = _interopRequireDefault(require("../Data/DC.js"));
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * Created by Ahmed Zamil on 01/09/2017.
 */
var NetworkBuffer = exports["default"] = /*#__PURE__*/function () {
  function NetworkBuffer() {
    (0, _classCallCheck2["default"])(this, NetworkBuffer);
    this.neededDataLength = 0;
    this.data = new _DC["default"](0);
  }
  (0, _createClass2["default"])(NetworkBuffer, [{
    key: "protected",
    get: function get() {
      return this.neededDataLength > this.data.length;
    }
  }, {
    key: "available",
    get: function get() {
      return this.data.length;
    }
  }, {
    key: "holdAllForNextWrite",
    value: function holdAllForNextWrite(src) {
      this.holdFor(src, src.length + 1);
    }
  }, {
    key: "holdForNextWrite",
    value: function holdForNextWrite(src, offset, size) {
      this.holdFor(src, offset, size, size + 1);
    }
  }, {
    key: "holdFor",
    value: function holdFor(src, offset, size, needed) {
      if (size >= needed) throw new Error("Size >= Needed !");
      this.data = _DC["default"].combine(src, offset, size, this.data, 0, this.data.length);
      this.neededDataLength = needed;
    }
  }, {
    key: "holdAllFor",
    value: function holdAllFor(src, needed) {
      this.holdFor(src, 0, src.length, needed);
    }
  }, {
    key: "protect",
    value: function protect(data, offset, needed) {
      var dataLength = data.length - offset;

      // protection
      if (dataLength < needed) {
        this.holdFor(data, offset, dataLength, needed);
        return true;
      } else return false;
    }
  }, {
    key: "writeAll",
    value: function writeAll(src) {
      this.write(src, 0, src.length ? src.length : src.byteLength);
    }
  }, {
    key: "write",
    value: function write(src, offset, length) {
      this.data = this.data.append(src, offset, length);
    }
  }, {
    key: "canRead",
    get: function get() {
      if (this.data.length == 0) return false;else if (this.data.length < this.neededDataLength) return false;
      return true;
    }
  }, {
    key: "read",
    value: function read() {
      if (this.data.length == 0) return null;
      var rt = null;
      if (this.neededDataLength == 0) {
        rt = this.data;
        this.data = new _DC["default"](0);
      } else {
        if (this.data.length >= this.neededDataLength) {
          rt = this.data;
          this.data = new _DC["default"](0);
          this.neededDataLength = 0;
          return rt;
        } else {
          return null;
        }
      }
      return rt;
    }
  }]);
  return NetworkBuffer;
}();

},{"../Data/DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],87:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _INetworkReceiver2 = _interopRequireDefault(require("./INetworkReceiver.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var NetowrkConnection = exports["default"] = /*#__PURE__*/function (_INetworkReceiver) {
  (0, _inherits2["default"])(NetowrkConnection, _INetworkReceiver);
  function NetowrkConnection() {
    (0, _classCallCheck2["default"])(this, NetowrkConnection);
    return _callSuper(this, NetowrkConnection, arguments);
  }
  return (0, _createClass2["default"])(NetowrkConnection);
}(_INetworkReceiver2["default"]);

},{"./INetworkReceiver.js":85,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],88:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var NetworkServer = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function NetworkServer() {
  (0, _classCallCheck2["default"])(this, NetworkServer);
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],89:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var NetworkSession = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function NetworkSession() {
  (0, _classCallCheck2["default"])(this, NetworkSession);
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],90:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN ANthis.action OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _AuthenticationMethod = _interopRequireDefault(require("../../Security/Authority/AuthenticationMethod.js"));
var _IIPAuthPacketCommand = _interopRequireDefault(require("./IIPAuthPacketCommand.js"));
var _IIPAuthPacketAction = _interopRequireDefault(require("./IIPAuthPacketAction.js"));
var _IIPAuthPacketEvent = _interopRequireDefault(require("./IIPAuthPacketEvent.js"));
var _TransmissionType = _interopRequireDefault(require("../../Data/TransmissionType.js"));
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _dataLengthNeeded = /*#__PURE__*/new WeakMap();
var _notEnough = /*#__PURE__*/new WeakSet();
var IIPAuthPacket = exports["default"] = /*#__PURE__*/function () {
  function IIPAuthPacket() {
    (0, _classCallCheck2["default"])(this, IIPAuthPacket);
    _classPrivateMethodInitSpec(this, _notEnough);
    (0, _defineProperty2["default"])(this, "command", 0);
    (0, _defineProperty2["default"])(this, "initialization", 0);
    (0, _defineProperty2["default"])(this, "acknowledgement", 0);
    (0, _defineProperty2["default"])(this, "action", 0);
    (0, _defineProperty2["default"])(this, "event", 0);
    (0, _defineProperty2["default"])(this, "localMethod", _AuthenticationMethod["default"].None);
    (0, _defineProperty2["default"])(this, "remoteMethod", _AuthenticationMethod["default"].None);
    (0, _defineProperty2["default"])(this, "errorCode", 0);
    (0, _defineProperty2["default"])(this, "message", "");
    (0, _defineProperty2["default"])(this, "publicKeyAlgorithm", 0);
    (0, _defineProperty2["default"])(this, "hashAlgorithm", 0);
    (0, _defineProperty2["default"])(this, "certificate", null);
    (0, _defineProperty2["default"])(this, "challenge", null);
    (0, _defineProperty2["default"])(this, "asymetricEncryptionKey", null);
    (0, _defineProperty2["default"])(this, "sessionId", null);
    (0, _defineProperty2["default"])(this, "accountId", null);
    (0, _defineProperty2["default"])(this, "dataType", null);
    (0, _defineProperty2["default"])(this, "reference", 0);
    _classPrivateFieldInitSpec(this, _dataLengthNeeded, {
      writable: true,
      value: 0
    });
  }
  (0, _createClass2["default"])(IIPAuthPacket, [{
    key: "parse",
    value: function parse(data, offset, ends) {
      var oOffset = offset;
      if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
      this.command = data.getUint8(offset) >> 6;
      if (this.command == _IIPAuthPacketCommand["default"].Initialize) {
        this.localMethod = data[offset] >> 4 & 0x3;
        this.remoteMethod = data[offset] >> 2 & 0x3;
        this.initialization = data[offset++] & 0xFC; // remove last two reserved LSBs

        if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
        var _parsed = _TransmissionType["default"].parse(data, offset, ends);
        if (_parsed.type == null) return -_parsed.size;
        this.dataType = _parsed.type;
        offset += _parsed.size;
      } else if (this.command == _IIPAuthPacketCommand["default"].Acknowledge) {
        this.localMethod = data[offset] >> 4 & 0x3;
        this.remoteMethod = data[offset] >> 2 & 0x3;
        this.acknowledgement = data[offset++] & 0xFC; // remove last two reserved LSBs

        if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
        var _parsed2 = _TransmissionType["default"].parse(data, offset, ends);
        if (_parsed2.type == null) return -_parsed2.size;
        this.dataType = _parsed2.type;
        offset += _parsed2.size;
      } else if (this.command == _IIPAuthPacketCommand["default"].Action) {
        this.action = data[offset++];
        if (this.action == _IIPAuthPacketAction["default"].AuthenticateHash || this.action == _IIPAuthPacketAction["default"].AuthenticatePublicHash || this.action == _IIPAuthPacketAction["default"].AuthenticatePrivateHash || this.action == _IIPAuthPacketAction["default"].AuthenticatePublicPrivateHash) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 3)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.hashAlgorithm = data[offset++];
          var hashLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, hashLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.challenge = data.clip(offset, hashLength);
          offset += hashLength;
        } else if (this.action == _IIPAuthPacketAction["default"].AuthenticatePrivateHashCert || this.action == _IIPAuthPacketAction["default"].AuthenticatePublicPrivateHashCert) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 3)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.hashAlgorithm = data[offset++];
          var _hashLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, _hashLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.challenge = data.clip(offset, _hashLength);
          offset += _hashLength;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 2)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var certLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, certLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.certificate = data.clip(offset, certLength);
          offset += certLength;
        } else if (this.action == _IIPAuthPacketAction["default"].IAuthPlain) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 5)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.reference = data.getUint32(offset);
          offset += 4;
          var parsed = _TransmissionType["default"].parse(data, offset, ends);
          if (parsed.type == null) return -parsed.size;
          this.dataType = parsed.type;
          offset += parsed.size;
        } else if (this.action == _IIPAuthPacketAction["default"].IAuthHashed) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 7)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.reference = data.getUint32(offset);
          offset += 4;
          this.hashAlgorithm = data[offset++];
          var cl = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, cl)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.challenge = data.clip(offset, cl);
          offset += cl;
        } else if (this.action == _IIPAuthPacketAction["default"].IAuthEncrypted) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 7)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.reference = data.getUint32(offset);
          offset += 4;
          this.publicKeyAlgorithm = data[offset++];
          var _cl = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, _cl)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.challenge = data.clip(offset, _cl);
          offset += _cl;
        } else if (this.action == _IIPAuthPacketAction["default"].EstablishNewSession) {
          // Nothing here
        } else if (this.action == _IIPAuthPacketAction["default"].EstablishResumeSession) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var sessionLength = data[offset++];
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, sessionLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.sessionId = data.clip(offset, sessionLength);
          offset += sessionLength;
        } else if (this.action == _IIPAuthPacketAction["default"].EncryptKeyExchange) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 2)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var keyLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, keyLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.asymetricEncryptionKey = data.clip(offset, keyLength);
          offset += keyLength;
        } else if (this.action == _IIPAuthPacketAction["default"].RegisterEndToEndKey || this.action == _IIPAuthPacketAction["default"].RegisterHomomorphic) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 3)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.publicKeyAlgorithm = data[offset++];
          var _keyLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, _keyLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.asymetricEncryptionKey = data.clip(offset, _keyLength);
          offset += _keyLength;
        }
      } else if (this.command == _IIPAuthPacketCommand["default"].Event) {
        this.event = data[offset++];
        if (this.event == _IIPAuthPacketEvent["default"].ErrorTerminate || this.event == _IIPAuthPacketEvent["default"].ErrorMustEncrypt || this.event == _IIPAuthPacketEvent["default"].ErrorRetry) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 3)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.errorCode = data[offset++];
          var msgLength = data.getUint16(offset);
          offset += 2;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, msgLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.message = data.getString(offset, msgLength);
          offset += msgLength;
        } else if (this.event == _IIPAuthPacketEvent["default"].IndicationEstablished) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 2)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var _sessionLength = data[offset++];
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, _sessionLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.sessionId = data.clip(offset, _sessionLength);
          offset += _sessionLength;
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var accountLength = data[offset++];
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, accountLength)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          this.accountId = data.clip(offset, accountLength);
          offset += accountLength;
        } else if (this.event == _IIPAuthPacketEvent["default"].IAuthPlain || this.event == _IIPAuthPacketEvent["default"].IAuthHashed || this.event == _IIPAuthPacketEvent["default"].IAuthEncrypted) {
          if (_classPrivateMethodGet(this, _notEnough, _notEnough2).call(this, offset, ends, 1)) return -(0, _classPrivateFieldGet2["default"])(this, _dataLengthNeeded);
          var _parsed3 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed3.type == null) return -_parsed3.size;
          this.dataType = _parsed3.type;
          offset += _parsed3.size;
        }
      }
      return offset - oOffset;
    }
  }]);
  return IIPAuthPacket;
}();
function _notEnough2(offset, ends, needed) {
  if (offset + needed > ends) {
    (0, _classPrivateFieldSet2["default"])(this, _dataLengthNeeded, needed - (ends - offset));
    return true;
  } else return false;
}

},{"../../Data/TransmissionType.js":69,"../../Security/Authority/AuthenticationMethod.js":131,"./IIPAuthPacketAction.js":92,"./IIPAuthPacketCommand.js":93,"./IIPAuthPacketEvent.js":94,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/classPrivateFieldGet":10,"@babel/runtime/helpers/classPrivateFieldSet":11,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketAcknowledge
var _default = exports["default"] = {
  NoAuthNoAuth: 0x40,
  // 0b01000000,
  NoAuthCredentials: 0x44,
  // 0b01000100,
  NoAuthToken: 0x48,
  //0b01001000,
  NoAuthCertificate: 0x4c,
  //0b01001100,
  CredentialsNoAuth: 0x50,
  //0b01010000,
  CredentialsCredentials: 0x54,
  //0b01010100,
  CredentialsToken: 0x58,
  //0b01011000,
  CredentialsCertificate: 0x5c,
  //0b01011100,
  TokenNoAuth: 0x60,
  //0b01100000,
  TokenCredentials: 0x64,
  //0b01100100,
  TokenToken: 0x68,
  //0b01101000,
  TokenCertificate: 0x6c,
  //0b01101100,
  CertificateNoAuth: 0x70,
  //0b01110000,
  CertificateCredentials: 0x74,
  //0b01110100,
  CertificateToken: 0x78,
  //0b01111000,
  CertificateCertificate: 0x7c // 0b01111100,
};

},{}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketAction
var _default = exports["default"] = {
  AuthenticateHash: 0x80,
  AuthenticatePublicHash: 0x81,
  AuthenticatePrivateHash: 0x82,
  AuthenticatePublicPrivateHash: 0x83,
  AuthenticatePrivateHashCert: 0x88,
  AuthenticatePublicPrivateHashCert: 0x89,
  IAuthPlain: 0x90,
  IAuthHashed: 0x91,
  IAuthEncrypted: 0x92,
  EstablishNewSession: 0x98,
  EstablishResumeSession: 0x99,
  EncryptKeyExchange: 0xA0,
  RegisterEndToEndKey: 0xA8,
  RegisterHomomorphic: 0xA9
};

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketCommand
var _default = exports["default"] = {
  Initialize: 0,
  Acknowledge: 1,
  Action: 2,
  Event: 3
};

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketEvent
var _default = exports["default"] = {
  ErrorTerminate: 0xC0,
  ErrorMustEncrypt: 0xC1,
  ErrorRetry: 0xC2,
  IndicationEstablished: 0xC8,
  IAuthPlain: 0xD0,
  IAuthHashed: 0xD1,
  IAuthEncrypted: 0xD2
};

},{}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthHashAlgorithm
var _default = exports["default"] = {
  SHA256: 0,
  SHA3: 1
};

},{}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ExtendedTypes = require("../../Data/ExtendedTypes.js");
// IIPAuthPacketHeader
var _default = exports["default"] = {
  Version: new _ExtendedTypes.UInt8(0),
  Domain: new _ExtendedTypes.UInt8(1),
  SupportedAuthentications: new _ExtendedTypes.UInt8(2),
  SupportedHashAlgorithms: new _ExtendedTypes.UInt8(3),
  SupportedCiphers: new _ExtendedTypes.UInt8(4),
  SupportedCompression: new _ExtendedTypes.UInt8(5),
  SupportedPersonalAuth: new _ExtendedTypes.UInt8(6),
  Nonce: new _ExtendedTypes.UInt8(7),
  Username: new _ExtendedTypes.UInt8(8),
  TokenIndex: new _ExtendedTypes.UInt8(9),
  CertificateId: new _ExtendedTypes.UInt8(10),
  CachedCertificates: new _ExtendedTypes.UInt8(11),
  CipherType: new _ExtendedTypes.UInt8(12),
  CipherKey: new _ExtendedTypes.UInt8(13),
  SoftwareIdentity: new _ExtendedTypes.UInt8(14),
  Referrer: new _ExtendedTypes.UInt8(15),
  Time: new _ExtendedTypes.UInt8(16),
  Certificate: new _ExtendedTypes.UInt8(17),
  IPv4: new _ExtendedTypes.UInt8(18)
};

},{"../../Data/ExtendedTypes.js":55}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketIAuthDestination
var _default = exports["default"] = {
  Self: 0,
  Device: 1,
  // logged in device
  Email: 2,
  SMS: 3,
  App: 4,
  // Authenticator app
  ThirdParty: 5 // usualy a second person
};

},{}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketIAuthFormat
var _default = exports["default"] = {
  None: 0,
  Number: 1,
  Text: 2,
  LowercaseText: 3,
  Choice: 4,
  Photo: 5,
  Signature: 6,
  Fingerprint: 7
};

},{}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ExtendedTypes = require("../../Data/ExtendedTypes.js");
// IIPAuthPacketIAuthHeader
var _default = exports["default"] = {
  Reference: new _ExtendedTypes.UInt8(0),
  Destination: new _ExtendedTypes.UInt8(1),
  Clue: new _ExtendedTypes.UInt8(2),
  RequiredFormat: new _ExtendedTypes.UInt8(3),
  ContentFormat: new _ExtendedTypes.UInt8(4),
  Content: new _ExtendedTypes.UInt8(5),
  Trials: new _ExtendedTypes.UInt8(6),
  Issue: new _ExtendedTypes.UInt8(7),
  Expire: new _ExtendedTypes.UInt8(8)
};

},{"../../Data/ExtendedTypes.js":55}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketInitialize
var _default = exports["default"] = {
  NoAuthNoAuth: 0x0,
  //0b00000000,
  NoAuthCredentials: 0x4,
  //0b00000100,
  NoAuthToken: 0x8,
  //0b00001000,
  NoAuthCertificate: 0xC,
  //0b00001100,
  CredentialsNoAuth: 0x10,
  //0b00010000,
  CredentialsCredentials: 0x14,
  //0b00010100,
  CredentialsToken: 0x18,
  //0b00011000,
  CredentialsCertificate: 0x1c,
  //0b00011100,
  TokenNoAuth: 0x20,
  //0b00100000,
  TokenCredentials: 0x24,
  //0b00100100,
  TokenToken: 0x28,
  //0b00101000,
  TokenCertificate: 0x2c,
  //0b00101100,
  CertificateNoAuth: 0x30,
  //0b00110000,
  CertificateCredentials: 0x34,
  // 0b00110100,
  CertificateToken: 0x38,
  //0b00111000,
  CertificateCertificate: 0x3c //0b00111100,
};

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// IIPAuthPacketPublicKeyAlgorithm
var _default = exports["default"] = {
  RSA: 0,
  CKKS: 1
};

},{}],102:[function(require,module,exports){
/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _IIPPacketAction = _interopRequireDefault(require("./IIPPacketAction.js"));
var _IIPPacketCommand = _interopRequireDefault(require("./IIPPacketCommand.js"));
var _IIPPacketEvent = _interopRequireDefault(require("./IIPPacketEvent.js"));
var _IIPPacketReport = _interopRequireDefault(require("./IIPPacketReport.js"));
var _TransmissionType = _interopRequireDefault(require("../../Data/TransmissionType.js"));
var _ExceptionCode = _interopRequireDefault(require("../../Core/ExceptionCode.js"));
var IIPPacket = exports["default"] = /*#__PURE__*/function () {
  function IIPPacket() {
    (0, _classCallCheck2["default"])(this, IIPPacket);
    this.command = 0;
    this.action = 0;
    this.event = 0;
    this.resourceId = 0;
    this.newResourceId = 0;
    this.resourceAge = 0;
    //this.content = [];
    this.errorCode = 0;
    this.errorMessage = "";
    this.className = "";
    this.resourceLink = "";
    this.classId = "";
    this.methodIndex = "";
    this.methodName = "";
    this.callbackId = 0;
    this.dataLengthNeeded = 0;
    this.originalOffset = 0;
    this.resourceName = "";
    this.dataType = null;
    this.jitter = 0;
    this.interval = 0;
    this.procedure = "";
    this.currentTime = null;
  }
  (0, _createClass2["default"])(IIPPacket, [{
    key: "notEnough",
    value: function notEnough(offset, ends, needed) {
      if (offset + needed > ends) {
        this.dataLengthNeeded = needed - (ends - offset);
        return true;
      } else return false;
    }
  }, {
    key: "parse",
    value: function parse(data, offset, ends) {
      this.originalOffset = offset;
      if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
      this.command = data.getUint8(offset) >> 6;
      if (this.command == _IIPPacketCommand["default"].Event) {
        this.event = data.getUint8(offset++) & 0x3f;
        if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
        this.resourceId = data.getUint32(offset);
        offset += 4;
      } else if (this.command == _IIPPacketCommand["default"].Report) {
        this.report = data.getUint8(offset++) & 0x3f;
        if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
        this.callbackId = data.getUint32(offset);
        offset += 4;
      } else {
        this.action = data.getUint8(offset++) & 0x3f;
        if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
        this.callbackId = data.getUint32(offset);
        offset += 4;
      }
      if (this.command == _IIPPacketCommand["default"].Event) {
        if (this.event == _IIPPacketEvent["default"].ResourceReassigned) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.newResourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.event == _IIPPacketEvent["default"].ResourceDestroyed) {
          // nothing to parse
        } else if (this.event == _IIPPacketEvent["default"].ChildAdded || this.event == _IIPPacketEvent["default"].ChildRemoved) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.childId = data.getUint32(offset);
          offset += 4;
        } else if (this.event == _IIPPacketEvent["default"].Renamed) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.resourceName = data.getString(offset, cl);
          offset += cl;
        } else if (this.event == _IIPPacketEvent["default"].PropertyUpdated || this.event == _IIPPacketEvent["default"].EventOccurred) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          this.methodIndex = data[offset++];
          var parsed = _TransmissionType["default"].parse(data, offset, ends);
          if (parsed.type == null) return -parsed.size;
          this.dataType = parsed.type;
          offset += parsed.size;
        }
        // Attribute
        else if (this.event == _IIPPacketEvent["default"].AttributesUpdated) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          var _cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, _cl)) return -this.dataLengthNeeded;

          //@TODO: fix this
          //this.content = data.clip(offset, cl);

          offset += _cl;
        } else {
          throw new Error("Unknown event packet.");
        }
      } else if (this.command == _IIPPacketCommand["default"].Request) {
        if (this.action == _IIPPacketAction["default"].AttachResource) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].ReattachResource) {
          if (this.notEnough(offset, ends, 12)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.resourceAge = data.getUint64(offset);
          offset += 8;
        } else if (this.action == _IIPPacketAction["default"].DetachResource) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].CreateResource) {
          if (this.notEnough(offset, ends, 12)) return -this.dataLengthNeeded;
          this.storeId = data.getUint32(offset);
          offset += 4;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          var _cl2 = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, _cl2)) return -this.dataLengthNeeded;

          //@TODO: fix this
          //this.content = data.clip(offset, cl);
        } else if (this.action == _IIPPacketAction["default"].DeleteResource) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].AddChild || this.action == _IIPPacketAction["default"].RemoveChild) {
          if (this.notEnough(offset, ends, 8)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.childId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].RenameResource) {
          if (this.notEnough(offset, ends, 6)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          var _cl3 = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, _cl3)) return -this.dataLengthNeeded;
          this.resourceName = data.getString(offset, _cl3);
          offset += _cl3;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassName) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var _cl4 = data.getUint8(offset++);
          if (this.notEnough(offset, ends, _cl4)) return -this.dataLengthNeeded;
          this.className = data.getString(offset, _cl4);
          offset += _cl4;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassId) {
          if (this.notEnough(offset, ends, 16)) return -this.dataLengthNeeded;
          this.classId = data.getUUID(offset);
          offset += 16;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromResourceId) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].QueryLink || this.action == _IIPPacketAction["default"].LinkTemplates) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var _cl5 = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, _cl5)) return -this.dataLengthNeeded;
          this.resourceLink = data.getString(offset, _cl5);
          offset += _cl5;
        } else if (this.action == _IIPPacketAction["default"].ResourceChildren || this.action == _IIPPacketAction["default"].ResourceParents) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].ResourceHistory) {
          if (this.notEnough(offset, ends, 20)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.fromDate = data.getDateTime(offset);
          offset += 8;
          this.toDate = data.getDateTime(offset);
          offset += 8;
        } else if (this.action == _IIPPacketAction["default"].InvokeFunction) {
          if (this.notEnough(offset, ends, 9)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data.getUint8(offset++);
          var _parsed = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed.type == null) return -_parsed.size;
          this.dataType = _parsed.type;
          offset += _parsed.size;
        } else if (this.action == _IIPPacketAction["default"].Listen || this.action == _IIPPacketAction["default"].Unlisten)
          //this.action == IIPPacketAction.GetProperty)
          {
            if (this.notEnough(offset, ends, 5)) return -this.dataLengthNeeded;
            this.resourceId = data.getUint32(offset);
            offset += 4;
            this.methodIndex = data.getUint8(offset++);
          }
          // else if (this.action == IIPPacketAction.GetPropertyIfModified)
          // {
          //     if (this.notEnough(offset, ends, 9))
          //         return -this.dataLengthNeeded;

          //     this.resourceId = data.getUint32(offset);
          //     offset += 4;

          //     this.methodIndex = data[offset++];

          //     this.resourceAge = data.getUint64(offset);
          //     offset += 8;

          // }
        else if (this.action == _IIPPacketAction["default"].SetProperty) {
          if (this.notEnough(offset, ends, 6)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data[offset++];
          var _parsed2 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed2.type == null) return -_parsed2.size;
          this.dataType = _parsed2.type;
          offset += _parsed2.size;
        }

        // Attribute
        else if (this.action == _IIPPacketAction["default"].UpdateAllAttributes || this.action == _IIPPacketAction["default"].GetAttributes || this.action == _IIPPacketAction["default"].UpdateAttributes || this.action == _IIPPacketAction["default"].ClearAttributes) {
          if (this.notEnough(offset, ends, 8)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          var _cl6 = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, _cl6)) return -this.dataLengthNeeded;

          // @TODO: fix this
          //this.content = data.clip(offset, cl);
          offset += _cl6;
        } else if (this.action == _IIPPacketAction["default"].KeepAlive) {
          if (this.notEnough(offset, ends, 12)) return -this.dataLengthNeeded;
          this.currentTime = data.getDateTime(offset);
          offset += 8;
          this.interval = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].ProcedureCall) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var _cl7 = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, _cl7)) return -this.dataLengthNeeded;
          this.procedure = data.getString(offset, _cl7);
          offset += _cl7;
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var _parsed3 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed3.type == null) return -_parsed3.size;
          offset += _parsed3.size;
        } else if (this.action == _IIPPacketAction["default"].StaticCall) {
          if (this.notEnough(offset, ends, 18)) return -this.dataLengthNeeded;
          this.classId = data.getUUID(offset);
          offset += 16;
          this.methodIndex = data[offset++];
          var _parsed4 = _TransmissionType["default"].Pparse(data, offset, ends);
          if (_parsed4.type == null) return -_parsed4.size;
          offset += _parsed4.size;
        } else {
          throw new Error("Unknown request packet.");
        }
      } else if (this.command == _IIPPacketCommand["default"].Reply) {
        if (this.action == _IIPPacketAction["default"].AttachResource || this.action == _IIPPacketAction["default"].ReattachResource) {
          if (this.notEnough(offset, ends, 26)) return -this.dataLengthNeeded;
          this.classId = data.getUUID(offset);
          offset += 16;
          this.resourceAge = data.getUint64(offset);
          offset += 8;
          var _cl8 = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, _cl8)) return -this.dataLengthNeeded;
          this.resourceLink = data.getString(offset, _cl8);
          offset += _cl8;
          var _parsed5 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed5.type == null) return -_parsed5.size;
          this.dataType = _parsed5.type;
          offset += _parsed5.size;
        } else if (this.action == _IIPPacketAction["default"].DetachResource) {
          // nothing to do
        } else if (this.action == _IIPPacketAction["default"].CreateResource) {
          if (this.notEnough(offset, ends, 20)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].DetachResource) {
          // nothing to do
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassName || this.action == _IIPPacketAction["default"].TemplateFromClassId || this.action == _IIPPacketAction["default"].TemplateFromResourceId || this.action == _IIPPacketAction["default"].QueryLink || this.action == _IIPPacketAction["default"].ResourceChildren || this.action == _IIPPacketAction["default"].ResourceParents || this.action == _IIPPacketAction["default"].ResourceHistory || this.action == _IIPPacketAction["default"].LinkTemplates

        // Attribute
        || this.action == _IIPPacketAction["default"].GetAllAttributes || this.action == _IIPPacketAction["default"].GetAttributes) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var _parsed6 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed6.type == null) return -_parsed6.size;
          this.dataType = _parsed6.type;
          offset += _parsed6.size;
        } else if (this.action == _IIPPacketAction["default"].InvokeFunction || this.action == _IIPPacketAction["default"].ProcedureCall || this.action == _IIPPacketAction["default"].StaticCall) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var _parsed7 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed7.type == null) return -_parsed7.size;
          this.dataType = _parsed7.type;
          offset += _parsed7.size;
        } else if (this.action == _IIPPacketAction["default"].SetProperty || this.action == _IIPPacketAction["default"].Listen || this.action == _IIPPacketAction["default"].Unlisten) {
          // nothing to do
        } else if (this.action == _IIPPacketAction["default"].KeepAlive) {
          if (this.notEnough(offset, ends, 12)) return -this.dataLengthNeeded;
          this.currentTime = data.getDateTime(offset);
          offset += 8;
          this.jitter = data.getUint32(offset);
          offset += 4;
        } else {
          throw new Error("Unknown reply packet.");
        }
      } else if (this.command == _IIPPacketCommand["default"].Report) {
        if (this.report == _IIPPacketReport["default"].ManagementError) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          this.errorCode = data.getUint16(offset);
          offset += 2;
        } else if (this.report == _IIPPacketReport["default"].ExecutionError) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          this.errorCode = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var _cl9 = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, _cl9)) return -this.dataLengthNeeded;
          this.errorMessage = data.getString(offset, _cl9);
          offset += _cl9;
        } else if (this.report == _IIPPacketReport["default"].ProgressReport) {
          if (this.notEnough(offset, ends, 8)) return -this.dataLengthNeeded;
          this.progressValue = data.getInt32(offset);
          offset += 4;
          this.progressMax = data.getInt32(offset);
          offset += 4;
        } else if (this.report == _IIPPacketReport["default"].ChunkStream) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var _parsed8 = _TransmissionType["default"].parse(data, offset, ends);
          if (_parsed8.type == null) return -_parsed8.size;
          this.dataType = _parsed8.type;
          offset += _parsed8.size;
        } else {
          throw new Error("Unknown report packet.");
        }
      }
      return offset - this.originalOffset;
    }
  }]);
  return IIPPacket;
}();

},{"../../Core/ExceptionCode.js":44,"../../Data/TransmissionType.js":69,"./IIPPacketAction.js":103,"./IIPPacketCommand.js":104,"./IIPPacketEvent.js":105,"./IIPPacketReport.js":106,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] =
// const IIPPacketAction =
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
  InvokeFunction: 16,
  Reserved: 17,
  Listen: 18,
  Unlisten: 19,
  SetProperty: 20,
  // Request Attribute
  GetAllAttributes: 24,
  UpdateAllAttributes: 25,
  ClearAllAttributes: 26,
  GetAttributes: 27,
  UpdateAttributes: 28,
  ClearAttributes: 29,
  // Static
  KeepAlive: 0x20,
  ProcedureCall: 0x21,
  StaticCall: 0x22
};

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] =
// IIPPacketCommand =
{
  Event: 0,
  Request: 1,
  Reply: 2,
  Report: 3
};

},{}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var IIPPacketEvent = {
  // Event Manage
  ResourceReassigned: 0,
  ResourceDestroyed: 1,
  ChildAdded: 2,
  ChildRemoved: 3,
  Renamed: 4,
  // Event Invoke
  PropertyUpdated: 0x10,
  EventOccurred: 0x11,
  // Attribute
  AttributesUpdated: 0x18
};
var _default = exports["default"] = IIPPacketEvent;

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var IIPPacketReport = {
  ManagementError: 0,
  ExecutionError: 1,
  ProgressReport: 0x8,
  ChunkStream: 0x9
};
var _default = exports["default"] = IIPPacketReport;

},{}],107:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 02/09/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _BinaryList2 = _interopRequireDefault(require("../Data/BinaryList.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SendList = exports["default"] = /*#__PURE__*/function (_BinaryList) {
  (0, _inherits2["default"])(SendList, _BinaryList);
  function SendList(connection, doneReply) {
    var _this;
    (0, _classCallCheck2["default"])(this, SendList);
    _this = _callSuper(this, SendList);
    _this.connection = connection;
    _this.reply = doneReply;
    return _this;
  }
  (0, _createClass2["default"])(SendList, [{
    key: "done",
    value: function done() {
      this.connection._sendAll(this.toArray());
      return this.reply;
    }
  }]);
  return SendList;
}(_BinaryList2["default"]);

},{"../Data/BinaryList.js":50,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],108:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IDestructible2 = _interopRequireDefault(require("../../Core/IDestructible.js"));
var _SocketState = _interopRequireDefault(require("./SocketState.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ISocket = exports["default"] = /*#__PURE__*/function (_IDestructible) {
  (0, _inherits2["default"])(ISocket, _IDestructible);
  //SocketState State { get; }
  //INetworkReceiver<ISocket> Receiver { get; set; }

  function ISocket() {
    var _this;
    (0, _classCallCheck2["default"])(this, ISocket);
    _this = _callSuper(this, ISocket);
    _this.state = _SocketState["default"].Initial;
    return _this;
  }
  //    get state() {}
  (0, _createClass2["default"])(ISocket, [{
    key: "sendAsync",
    value: function sendAsync(message, offset, length) {}
  }, {
    key: "send",
    value: function send(message, offset, length) {}
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "connect",
    value: function connect(hostname, port) {}
  }, {
    key: "begin",
    value: function begin() {}
  }, {
    key: "beginAsync",
    value: function beginAsync() {}
  }, {
    key: "acceptAsync",
    value: function acceptAsync() {}
  }, {
    key: "accept",
    value: function accept() {}
  }, {
    key: "remoteEndPoint",
    get: function get() {}
  }, {
    key: "localEndPoint",
    get: function get() {}
  }, {
    key: "hold",
    value: function hold() {}
  }, {
    key: "unhold",
    value: function unhold() {}
  }]);
  return ISocket;
}(_IDestructible2["default"]);

},{"../../Core/IDestructible.js":45,"./SocketState.js":109,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Initial: 0,
  Listening: 1,
  Connecting: 2,
  Established: 3,
  Closed: 4
};

},{}],110:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));
var _ErrorType = _interopRequireDefault(require("../../Core/ErrorType.js"));
var _ExceptionCode = _interopRequireDefault(require("../../Core/ExceptionCode.js"));
var _ISocket2 = _interopRequireDefault(require("./ISocket.js"));
var _SocketState = _interopRequireDefault(require("./SocketState.js"));
var _NetworkBuffer = _interopRequireDefault(require("../NetworkBuffer.js"));
var _DC = _interopRequireDefault(require("../../Data/DC.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var WSocket = exports["default"] = /*#__PURE__*/function (_ISocket) {
  (0, _inherits2["default"])(WSocket, _ISocket);
  function WSocket(websocket) {
    var _this;
    (0, _classCallCheck2["default"])(this, WSocket);
    _this = _callSuper(this, WSocket);
    _this.receiveNetworkBuffer = new _NetworkBuffer["default"]();
    _this.sendNetworkBuffer = new _NetworkBuffer["default"]();
    _this.held = false;
    if (websocket != null) {
      websocket.onopen = function () {
        self.state = _SocketState["default"].Established;
      };
      websocket.onerror = function () {
        self.state = _SocketState["default"].Closed;
      };
      _this._assign(websocket);
    }
    return _this;
  }
  (0, _createClass2["default"])(WSocket, [{
    key: "destroy",
    value: function destroy() {
      this.close();
      this.receiveNetworkBuffer = null;
      this.receiver = null;
      this.ws = null;
      this._emit("destroy");
    }
  }, {
    key: "sendAsync",
    value: function sendAsync(message, offset, length) {}
  }, {
    key: "sendAll",
    value: function sendAll(message) {
      // console.log("Out ", message.byteLength);

      if (this.held) this.sendNetworkBuffer.writeAll(message);else {
        try {
          //console.log("TX", new DC(message));
          this.ws.send(message);
        } catch (_unused) {
          this.state = _SocketState["default"].Closed;
        }
      }
    }
  }, {
    key: "send",
    value: function send(message, offset, length) {
      this.sendAll(message.clip(offset, length));
    }
  }, {
    key: "close",
    value: function close() {
      this.ws.close();
    }
  }, {
    key: "connect",
    value: function connect(hostname, port) {
      var _this2 = this;
      var secure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var self = this;
      var rt = new _AsyncReply["default"]();
      this.state = _SocketState["default"].Connecting;
      this.url = "ws".concat(secure ? 's' : '', "://").concat(hostname, ":").concat(port);
      WSocket.getWebScoket().then(function (webSocket) {
        var ws;
        ws = new webSocket(_this2.url, "iip");
        ws.binaryType = "arraybuffer";
        ws.onopen = function () {
          self.state = _SocketState["default"].Established;
          rt.trigger(true);
        };
        ws.onerror = function (ee) {
          self.state = _SocketState["default"].Closed;
          rt.triggerError(_ErrorType["default"].Management, _ExceptionCode["default"].HostNotReachable, ee.message);
        };
        self._assign(ws);
      });
      return rt; // new AsyncReply(true);
    }
  }, {
    key: "_assign",
    value: function _assign(ws) {
      var self = this;
      ws.onclose = function () {
        var _self$receiver;
        self.state = _SocketState["default"].Closed;
        (_self$receiver = self.receiver) === null || _self$receiver === void 0 || _self$receiver.networkClose(self);
      };
      ws.onmessage = function (msg) {
        //console.log("WREC ", msg.data.byteLength);
        self.receiveNetworkBuffer.writeAll(msg.data);
        self.receiver.networkReceive(this, self.receiveNetworkBuffer);
        //self.lastAction = new Date();
      };
      this.ws = ws;
    }
  }, {
    key: "begin",
    value: function begin() {}
  }, {
    key: "beginAsync",
    value: function beginAsync() {}
  }, {
    key: "acceptAsync",
    value: function acceptAsync() {}
  }, {
    key: "accept",
    value: function accept() {}
  }, {
    key: "remoteEndPoint",
    get: function get() {}
  }, {
    key: "localEndPoint",
    get: function get() {}
  }, {
    key: "hold",
    value: function hold() {
      this.held = true;
    }
  }, {
    key: "unhold",
    value: function unhold() {
      this.held = false;
      var message = this.sendNetworkBuffer.read();
      if (message == null) return;
      //            totalSent += message.Length;

      try {
        this.ws.send(message);
        //console.log("TX", message);
      } catch (_unused2) {
        this.state = _SocketState["default"].Closed;
      }
    }
  }], [{
    key: "getWebScoket",
    value: function () {
      var _getWebScoket = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var wsModule;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(WSocket.webSocket == null)) {
                _context.next = 9;
                break;
              }
              if (!(typeof window === 'undefined')) {
                _context.next = 8;
                break;
              }
              _context.next = 4;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('ws'));
              });
            case 4:
              wsModule = _context.sent;
              WSocket.webSocket = wsModule["default"];
              _context.next = 9;
              break;
            case 8:
              WSocket.webSocket = WebSocket;
            case 9:
              return _context.abrupt("return", WSocket.webSocket);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getWebScoket() {
        return _getWebScoket.apply(this, arguments);
      }
      return getWebScoket;
    }()
  }]);
  return WSocket;
}(_ISocket2["default"]);
(0, _defineProperty2["default"])(WSocket, "webSocket", null);

},{"../../Core/AsyncReply.js":42,"../../Core/ErrorType.js":43,"../../Core/ExceptionCode.js":44,"../../Data/DC.js":52,"../NetworkBuffer.js":86,"./ISocket.js":108,"./SocketState.js":109,"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/typeof":33,"@babel/runtime/regenerator":36,"ws":38}],111:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ResourceProxy = exports["default"] = /*#__PURE__*/function () {
  function ResourceProxy() {
    (0, _classCallCheck2["default"])(this, ResourceProxy);
  }
  (0, _createClass2["default"])(ResourceProxy, null, [{
    key: "getBaseType",
    value: function getBaseType(type) {
      if (type == null) throw new Error("Type can't be null.");
      if (type.baseType != null) return type.baseType;
      return type;
    }
  }, {
    key: "getProxy",
    value: function getProxy(type) {
      if (type.baseType != null) return type;
      var template = _Warehouse["default"].getTemplateByType(type);
      var className = template.className;
      if (ResourceProxy.cache[className]) return ResourceProxy.cache[className];

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

      var makeClass = function makeClass(name) {
        return (0, _defineProperty2["default"])({}, name, /*#__PURE__*/function (_type) {
          (0, _inherits2["default"])(_class, _type);
          function _class() {
            (0, _classCallCheck2["default"])(this, _class);
            return _callSuper(this, _class, arguments);
          }
          return (0, _createClass2["default"])(_class);
        }(type))[name];
      };
      var proxyType = makeClass(className.replace('.', '_'));
      var _loop = function _loop() {
        var pt = template.properties[i];
        var desc = Object.getOwnPropertyDescriptor(type.prototype, pt.name);
        if (desc) {
          Object.defineProperty(proxyType.prototype, pt.name, {
            get: function get() {
              var _desc$get;
              // call parent getter
              return (_desc$get = desc.get) === null || _desc$get === void 0 ? void 0 : _desc$get.apply(this);
            },
            set: function set(value) {
              var _desc$set, _this$instance;
              // call parent setter
              (_desc$set = desc.set) === null || _desc$set === void 0 || _desc$set.call(this, value);
              (_this$instance = this.instance) === null || _this$instance === void 0 || _this$instance.emitModification(pt, value);
            }
          });
        } else {
          Object.defineProperty(proxyType.prototype, pt.name, {
            get: function get() {
              // get the backing field
              return this["_" + pt.name];
            },
            set: function set(value) {
              var _this$instance2;
              // set the backing field
              this["_" + pt.name] = value;
              (_this$instance2 = this.instance) === null || _this$instance2 === void 0 || _this$instance2.emitModification(pt, value);
            }
          });
        }
      };
      for (var i = 0; i < template.properties.length; i++) {
        _loop();
      }
      ResourceProxy.cache[className] = proxyType;
      Object.defineProperty(proxyType, "baseType", {
        value: type
      });
      //Object.defineProperty(proxyType, "name", {value: className.replace('.', '_')});

      return proxyType;
    }
  }]);
  return ResourceProxy;
}();
(0, _defineProperty2["default"])(ResourceProxy, "cache", {});

},{"../Resource/Warehouse.js":129,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],112:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _RepresentationType = require("../Data/RepresentationType.js");
var _TemplateType = _interopRequireDefault(require("../Resource/Template/TemplateType.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var TemplateGenerator = exports["default"] = /*#__PURE__*/function () {
  function TemplateGenerator() {
    (0, _classCallCheck2["default"])(this, TemplateGenerator);
  }
  (0, _createClass2["default"])(TemplateGenerator, null, [{
    key: "toLiteral",
    value: function toLiteral(input) {
      if (input == null) return "null";
      var literal = "";
      literal += "\"";
      input.split('').forEach(function (c) {
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
  }, {
    key: "generateRecord",
    value: function generateRecord(template, templates) {
      var _this = this;
      var className = template.className.split('.').slice(-1)[0];
      var rt = "";
      var parentName;
      var dependencies = [];
      if (template.parentId != null) {
        var parentClassName = templates.find(function (x) {
          return x.classId.valueOf() == template.parentId.valueOf() && x.type == _TemplateType["default"].Record;
        }).className;
        parentName = this._translateClassName(parentClassName);
        dependencies.push(parentClassName);
        rt += "export default class ".concat(className, " extends ").concat(parentName, " {\r\n");
      } else {
        rt += "export default class ".concat(className, " extends Esiur.Data.IRecord { \r\n");
      }
      template.properties.forEach(function (p) {
        if (p.inherited) return;
        var ptTypeName = _this.getDecoratedTypeName(template, p.valueType, templates);
        rt += "\t".concat(ptTypeName, " ").concat(p.name, ";\r\n\r\n");
      });
      rt += "\r\n";

      // add template
      var descProps = template.properties.map(function (p) {
        var ptTypeName = _this.getTypeName(template, p.valueType, templates, dependencies);
        return "\t\t\tnew Esiur.Resource.Template.Prop('".concat(p.name, "', ").concat(ptTypeName, ", ").concat(_this.toLiteral(p.readAnnotation), ", ").concat(_this.toLiteral(p.writeAnnotation), ")");
      });
      var cls = template.className.split('.');
      var namespace = cls.slice(0, cls.length - 1).join('.');
      rt += "\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('".concat(namespace, "', [\r\n").concat(descProps.join(',\r\n'), "], \r\n\t\t\t").concat(parentName, ", ").concat(template.version, ", ").concat(this.toLiteral(template.annotation), ", Esiur.Data.UUID.parse('").concat(template.classId.toString(), "'), '").concat(className, "');\r\n\t}");
      rt += "\r\n}";
      rt = this._getDependenciesImports(dependencies) + rt;
      return rt;
    }
  }, {
    key: "_translateClassName",
    value: function _translateClassName(className) {
      var cls = className.split('.');
      return cls.join('_');
    }
  }, {
    key: "getDecoratedTypeName",
    value: function getDecoratedTypeName(forTemplate, representationType, templates) {
      return "/* ".concat(this.getTypeName(forTemplate, representationType, templates), " */");
    }
  }, {
    key: "getTypeName",
    value: function getTypeName(forTemplate, representationType, templates, dependencies) {
      var _this2 = this;
      var name;
      if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.TypedResource) {
        if (representationType.uuid.valueOf() == forTemplate.classId.valueOf()) name = forTemplate.className.split('.').slice(-1)[0];else {
          var className = templates.find(function (x) {
            return x.classId.valueOf() == representationType.uuid.valueOf() && x.type == _TemplateType["default"].Resource;
          }).className;
          if (!(dependencies !== null && dependencies !== void 0 && dependencies.includes(className))) dependencies === null || dependencies === void 0 || dependencies.push(className);
          name = this._translateClassName(className);
        }
      } else if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.TypedRecord) {
        if (representationType.uuid.valueOf() == forTemplate.classId.valueOf()) name = forTemplate.className.split('.').slice(-1)[0];else {
          var _className = templates.find(function (x) {
            return x.classId.valueOf() == representationType.uuid.valueOf() && x.type == _TemplateType["default"].Record;
          }).className;
          if (!(dependencies !== null && dependencies !== void 0 && dependencies.includes(_className))) dependencies === null || dependencies === void 0 || dependencies.push(_className);
          name = this._translateClassName(_className);
        }
      } else if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Enum) {
        if (representationType.uuid.valueOf() == forTemplate.classId.valueOf()) name = forTemplate.className.split('.').slice(-1)[0];else {
          var _className2 = templates.find(function (x) {
            return x.classId.valueOf() == representationType.uuid.valueOf() && x.type == _TemplateType["default"].Enum;
          }).className;
          if (!(dependencies !== null && dependencies !== void 0 && dependencies.includes(_className2))) dependencies === null || dependencies === void 0 || dependencies.push(_className2);
          name = this._translateClassName(_className2);
        }
      } else if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.TypedList) name = "Esiur.Data.TypedList.of(" + this.getTypeName(forTemplate, representationType.subTypes[0], templates, dependencies) + ")";else if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.TypedMap) name = "Esiur.Data.TypedMap.of(" + this.getTypeName(forTemplate, representationType.subTypes[0], templates, dependencies) + "," + this.getTypeName(forTemplate, representationType.subTypes[1], templates, dependencies) + ")";else if (representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple2 || representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple3 || representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple4 || representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple5 || representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple6 || representationType.identifier == _RepresentationType.RepresentationTypeIdentifier.Tuple7) name = "Esiur.Data.Tuple.of(" + representationType.subTypes.map(function (x) {
        return _this2.getTypeName(forTemplate, x, templates, dependencies);
      }).join(',') + ")";else {
        switch (representationType.identifier) {
          case _RepresentationType.RepresentationTypeIdentifier.Dynamic:
            name = "Object";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Bool:
            name = "Boolean";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Char:
            name = "String";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.DateTime:
            name = "Date";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Decimal:
            name = "Esiur.Data.Float128";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Float32:
            name = "Esiur.Data.Float32";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Float64:
            name = "Esiur.Data.Float64";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Int16:
            name = "Esiur.Data.Int16";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Int32:
            name = "Esiur.Data.Int32";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Int64:
            name = "Esiur.Data.Int64";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Int8:
            name = "Esiur.Data.Int8";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.String:
            name = "String";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Map:
            name = "Map";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.UInt16:
            name = "Esiur.Data.UInt16";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.UInt32:
            name = "Esiur.Data.UInt32";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.UInt64:
            name = "Esiur.Data.UInt64";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.UInt8:
            name = "Esiur.Data.UInt8";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.List:
            name = "Esiur.Data.List";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Resource:
            name = "Esiur.Resource.IResource";
            break;
          case _RepresentationType.RepresentationTypeIdentifier.Record:
            name = "Esiur.Data.IRecord";
            break;
          default:
            name = "Object";
        }
      }
      return representationType.nullable ? "Esiur.Data.Nullable.of(".concat(name, ")") : name;
    }
  }, {
    key: "isNullOrEmpty",
    value: function isNullOrEmpty(v) {
      return v == null || v == "";
    }
  }, {
    key: "getTemplate",
    value: function () {
      var _getTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url, dir, username, password) {
        var _this3 = this;
        var asyncSetters,
          globalName,
          fs,
          _urlRegex,
          path,
          con,
          templates,
          dstDir,
          makeImports,
          modulePath,
          module,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              asyncSetters = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : true;
              globalName = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : null;
              _context2.next = 4;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("fs"));
              });
            case 4:
              fs = _context2.sent;
              // var fs = require('fs');
              _urlRegex = /^(?:([^\s|:]*):\/\/([^/]*)\/?(.*))/; //                  /^(?:([^\s|:]*):\/\/([^/]*)\/?)/;
              if (_urlRegex.test(url)) {
                _context2.next = 8;
                break;
              }
              throw Error("Invalid IIP URL '".concat(url, "'"));
            case 8:
              path = url.split(_urlRegex);
              _context2.next = 11;
              return _Warehouse["default"].get(path[1] + "://" + path[2], username != null ? {
                "username": username,
                "password": password !== null && password !== void 0 ? password : ""
              } : null);
            case 11:
              con = _context2.sent;
              if (!(con == null)) {
                _context2.next = 14;
                break;
              }
              throw Error("Can't connect to server");
            case 14:
              if (dir == null || dir == "") dir = path[2].replaceAll(":", "_");
              _context2.next = 17;
              return con.getLinkTemplates(path[3]);
            case 17:
              templates = _context2.sent;
              // no longer needed
              _Warehouse["default"].remove(con);
              dstDir = "".concat(dir);
              if (!fs.existsSync(dstDir)) {
                fs.mkdirSync(dstDir, {
                  recursive: true
                });
              }
              makeImports = function makeImports(skipTemplate) {
                var imports = "";
                // make import names
                templates.forEach(function (tmp) {
                  if (tmp != skipTemplate) {
                    var cls = tmp.className.split('.');
                    imports += "import ".concat(cls.join('_'), " from './").concat(tmp.className, ".g.js';\r\n");
                  }
                });
                imports += "\r\n\r\n";
                return imports;
              }; // make sources
              templates.forEach( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(tmp) {
                  var filePath, source;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        console.log("Generating '".concat(tmp.className, "'."));
                        filePath = "".concat(dstDir, "/").concat(tmp.className, ".g.js");
                        source = "";
                        if (tmp.type == _TemplateType["default"].Resource) {
                          source = _this3.generateClass(tmp, templates, asyncSetters);
                        } else if (tmp.type == _TemplateType["default"].Record) {
                          source = _this3.generateRecord(tmp, templates);
                        } else if (tmp.type == _TemplateType["default"].Enum) {
                          source = _this3.generateEnum(tmp, templates);
                        }
                        fs.writeFileSync(filePath, source);
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());

              // make module
              modulePath = "".concat(dstDir, "/init.g.js");
              module = makeImports() + "\r\nlet module = {}; \r\n";
              templates.forEach(function (tmp) {
                var typeName = tmp.className.split('.').join('_');
                module += "Esiur.define(module, ".concat(typeName, ", '").concat(tmp.className, "');\r\n");
                module += "new Esiur.Resource.Template.TypeTemplate(".concat(typeName, ", true);\r\n");
              });
              module += "\r\nexport default module;\r\n";
              if (globalName != null) {
                module += "\r\nif (typeof window !== 'undefined') window[\"".concat(globalName, "\"] = module;\r\n");
                module += "\r\nelse if (typeof global !== 'undefined') global[\"".concat(globalName, "\"] = module;\r\n");
              }
              fs.writeFileSync(modulePath, module);
              return _context2.abrupt("return", dstDir);
            case 30:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getTemplate(_x, _x2, _x3, _x4) {
        return _getTemplate.apply(this, arguments);
      }
      return getTemplate;
    }()
  }, {
    key: "generateEnum",
    value: function generateEnum(template, templates) {
      var _this4 = this;
      var className = template.className.split('.').slice(-1)[0];
      var rt = "";
      var dependencies = [];
      rt += "export default class ".concat(className, " extends Esiur.Data.IEnum {\r\n");
      var options = [];
      template.constants.forEach(function (c) {
        rt += "\tstatic ".concat(c.name, " = new ").concat(className, "(").concat(c.index, ", ").concat(c.value, ", '").concat(c.name, "');\r\n");
        options.push("this.".concat(c.name));
      });
      rt += "\r\n\tstatic options = [".concat(options.join(', '), "];\r\n");

      // add template
      var descConsts = template.constants.map(function (p) {
        var ctTypeName = _this4.getTypeName(template, p.valueType, templates, dependencies);
        return "\t\t\tnew Esiur.Resource.Template.Const('".concat(p.name, "', ").concat(ctTypeName, ", ").concat(p.value, ", ").concat(_this4.toLiteral(p.annotation), ")");
      });
      var cls = template.className.split('.');
      var namespace = cls.slice(0, cls.length - 1).join('.');
      rt += "\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('".concat(namespace, "', [\r\n").concat(descConsts.join(',\r\n'), "], \r\n\t\t\tnull, ").concat(template.version, ", ").concat(this.toLiteral(template.annotation), ", Esiur.Data.UUID.parse('").concat(template.classId.toString(), "'), '").concat(className, "');\r\n\t}");
      rt += "\r\n}";
      rt = this._getDependenciesImports(dependencies) + rt;
      return rt;
    }
  }, {
    key: "_getDependenciesImports",
    value: function _getDependenciesImports(dependencies) {
      var rt = "";
      dependencies.forEach(function (className) {
        rt += "import ".concat(className.split('.').join('_'), " from './").concat(className, ".g.js';\r\n");
      });
      return rt + "\r\n";
    }
  }, {
    key: "generateClass",
    value: function generateClass(template, templates) {
      var _this5 = this;
      var asyncSetters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var className = template.className.split('.').slice(-1)[0];
      var parentName = null;
      var rt = "";
      var dependencies = [];
      if (template.parentId != null) {
        var parentClassName = templates.find(function (x) {
          return x.classId.valueOf() == template.parentId.valueOf() && x.type == _TemplateType["default"].Resource;
        }).className;
        parentName = this._translateClassName(parentClassName);
        dependencies.push(parentClassName);
        rt += "export default class ".concat(className, " extends ").concat(parentName, " {\r\n");
      } else {
        rt += "export default class ".concat(className, " extends Esiur.Net.IIP.DistributedResource {\r\n");
      }

      // rt += `constructor() {`;

      // template.events.filter((e) => !e.inherited).forEach((e) => {
      //   rt += `on('${e.name}', (x) => _${e.name}Controller.add(x));`;
      // });

      // rt += "}\r\n";

      template.constants.forEach(function (c) {
        var ctTypeName = _this5.getTypeName(template, c.valueType, templates, dependencies);
        rt += "\tstatic ".concat(c.name, " = new ").concat(ctTypeName, "(").concat(c.value, ");\r\n");
      });
      template.functions.filter(function (f) {
        return !f.inherited;
      }).forEach(function (f) {
        var rtTypeName = _this5.getDecoratedTypeName(template, f.returnType, templates);
        var positionalArgs = f.args.filter(function (x) {
          return !x.optional;
        });
        var optionalArgs = f.args.filter(function (x) {
          return x.optional;
        });
        if (f.isStatic) {
          //rt += `static AsyncReply<${rtTypeName}> ${f.name}(DistributedConnection connection`;
          rt += "\t".concat(rtTypeName, " \r\n\tstatic ").concat(f.name, "(connection");
          if (positionalArgs.length > 0) rt += ", ".concat(positionalArgs.map(function (a) {
            return _this5.getDecoratedTypeName(template, a.type, templates) + " " + a.name;
          }).join(','));
          if (optionalArgs.length > 0) {
            rt += ", [".concat(optionalArgs.map(function (a) {
              return _this5.getDecoratedTypeName(template, a.type.toNullable(), templates) + " " + a.name;
            }).join(','), "]");
          }
        } else {
          //rt += `AsyncReply<${rtTypeName}> ${f.name}(`;
          rt += "\t".concat(rtTypeName, " \r\n\t").concat(f.name, "(");
          if (positionalArgs.length > 0) rt += "".concat(positionalArgs.map(function (a) {
            return _this5.getDecoratedTypeName(template, a.type, templates) + " " + a.name;
          }).join(','));
          if (optionalArgs.length > 0) {
            if (positionalArgs.length > 0) rt += ",";
            //rt += `[${optionalArgs.map((a) => this.getTypeName(template, a.type.toNullable(), templates) + " " + a.name).join(',')}]`;
            rt += "".concat(optionalArgs.map(function (a) {
              return _this5.getDecoratedTypeName(template, a.type.toNullable(), templates) + " " + a.name + " = null";
            }).join(','));
          }
        }
        rt += ") {\r\n";
        //                var argsMap = new (TypedMap.of(UInt8, Object));

        rt += "\t\tvar args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))();\r\n";
        rt += "".concat(positionalArgs.map(function (e) {
          return "\t\targs.set(new Esiur.Data.UInt8(".concat(e.index.toString(), "), ").concat(e.name, ");");
        }).join('\r\n'), "\r\n");
        optionalArgs.forEach(function (a) {
          rt += "\t\tif (".concat(a.name, " != null) args.set(new Esiur.Data.UInt8(").concat(a.index, "), ").concat(a.name, ");\r\n");
        });

        //rt += `var rt = new AsyncReply<${rtTypeName}>();\r\n`;
        rt += "\t\tvar rt = new Esiur.Core.AsyncReply();\r\n";
        if (f.isStatic) {
          rt += "\t\tconnection.staticCall(Esiur.Data.UUID.parse('".concat(template.classId.toString(), "'), ").concat(f.index, ", args)\r\n");
        } else {
          rt += "\t\tthis._invoke(".concat(f.index, ", args)\r\n");
        }
        rt += "\t\t\t.then((x) => rt.trigger(x))\r\n";
        rt += "\t\t\t.error((x) => rt.triggerError(x))\r\n";
        rt += "\t\t\t.chunk((x) => rt.triggerChunk(x));\r\n";
        rt += "\t\treturn rt; \r\n\t}\r\n";
      });
      template.properties.filter(function (p) {
        return !p.inherited;
      }).forEach(function (p) {
        var ptTypeName = _this5.getDecoratedTypeName(template, p.valueType, templates);
        rt += "\t".concat(ptTypeName, " get ").concat(p.name, "() { return this._get(").concat(p.index, "); }\r\n");
        if (asyncSetters) rt += "\tset ".concat(p.name, "(").concat(ptTypeName, " value) { this._set(").concat(p.index, ", value); }\r\n");else rt += "\tset ".concat(p.name, "(").concat(ptTypeName, " value) { this._setSync(").concat(p.index, ", value); }\r\n");
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
      .map(function (p) {
        var ptTypeName = _this5.getTypeName(template, p.valueType, templates, dependencies);
        return "\t\t\tnew Esiur.Resource.Template.Prop('".concat(p.name, "', ").concat(ptTypeName, ", ").concat(_this5.toLiteral(p.readAnnotation), ", ").concat(_this5.toLiteral(p.writeAnnotation), ")");
      });
      var descFuncs = template.functions.map(function (f) {
        var ftTypeName = _this5.getTypeName(template, f.returnType, templates, dependencies);
        var args = f.args.map(function (a) {
          var atTypeName = _this5.getTypeName(template, a.type, templates, dependencies);
          return "new Esiur.Resource.Template.Arg('".concat(a.name, "', ").concat(atTypeName, ", ").concat(a.optional, ")");
        }).join(', ');
        return "\t\t\tnew Esiur.Resource.Template.Func('".concat(f.name, "', ").concat(ftTypeName, ", [").concat(args, "], ").concat(_this5.toLiteral(f.annotation), ")");
      });
      var descEvents = template.events
      //.where((e) => !e.inherited) @REVIEW
      .map(function (e) {
        var etTypeName = _this5.getTypeName(template, e.argumentType, templates, dependencies);
        return "\t\t\tnew Esiur.Resource.Template.Evt('".concat(e.name, "', ").concat(etTypeName, ", ").concat(e.listenable, ", ").concat(_this5.toLiteral(e.annotation), ")");
      });
      var descConsts = template.constants.map(function (p) {
        var ctTypeName = _this5.getTypeName(template, p.valueType, templates, dependencies);
        return "\t\t\tnew Esiur.Resource.Template.Const('".concat(p.name, "', ").concat(ctTypeName, ", ").concat(p.value, ", ").concat(_this5.toLiteral(p.annotation), ")");
      });
      var cls = template.className.split('.');
      var namespace = cls.slice(0, cls.length - 1).join('.');
      rt += "\r\n\tstatic get template() {\r\n\t\treturn new Esiur.Resource.Template.TemplateDescriber('".concat(namespace, "', [\r\n").concat([].concat((0, _toConsumableArray2["default"])(descProps), (0, _toConsumableArray2["default"])(descFuncs), (0, _toConsumableArray2["default"])(descEvents), (0, _toConsumableArray2["default"])(descConsts)).join(',\r\n'), "], \r\n\t\t\t").concat(parentName, ", ").concat(template.version, ", ").concat(this.toLiteral(template.annotation), ", Esiur.Data.UUID.parse('").concat(template.classId.toString(), "'), '").concat(className, "');\r\n\t}");
      rt += "\r\n}\r\n";
      rt = this._getDependenciesImports(dependencies) + rt;
      return rt;
    }
  }]);
  return TemplateGenerator;
}();

},{"../Data/RepresentationType.js":66,"../Resource/Template/TemplateType.js":127,"../Resource/Warehouse.js":129,"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/toConsumableArray":30,"@babel/runtime/helpers/typeof":33,"@babel/runtime/regenerator":36,"fs":37}],113:[function(require,module,exports){
/*
* Copyright (c) 2017-2018 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 10/11/2018.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var CustomResourceEvent = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function CustomResourceEvent(issuer, receivers, value) {
  (0, _classCallCheck2["default"])(this, CustomResourceEvent);
  this.issuer = issuer;
  this.receivers = receivers;
  this.value = value;
});

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],114:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _Session = _interopRequireDefault(require("../Security/Authority/Session.js"));
var _IResource = _interopRequireDefault(require("./IResource.js"));
var _EventTemplate = _interopRequireDefault(require("./Template/EventTemplate.js"));
var EventOccurredInfo = exports["default"] = /*#__PURE__*/function () {
  function EventOccurredInfo(resource, eventTemplate, value, issuer, receivers) {
    (0, _classCallCheck2["default"])(this, EventOccurredInfo);
    this.resource = resource;
    this.eventTemplate = eventTemplate;
    this.value = value;
    this.issuer = issuer;
    this.receivers = receivers;
  }
  (0, _createClass2["default"])(EventOccurredInfo, [{
    key: "name",
    get: function get() {
      return this.eventTemplate.name;
    }
  }]);
  return EventOccurredInfo;
}();

},{"../Security/Authority/Session.js":135,"./IResource.js":115,"./Template/EventTemplate.js":121,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],115:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ResourceTrigger = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
var _IDestructible2 = _interopRequireDefault(require("../Core/IDestructible.js"));
var _TemplateDescriber = require("./Template/TemplateDescriber.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ResourceTrigger = exports.ResourceTrigger = {
  Open: 0,
  Initialize: 1,
  Terminate: 2,
  Configure: 3,
  SystemInitialized: 4,
  SystemTerminated: 5,
  SystemReload: 6
};
var IResource = exports["default"] = /*#__PURE__*/function (_IDestructible) {
  (0, _inherits2["default"])(IResource, _IDestructible);
  function IResource() {
    (0, _classCallCheck2["default"])(this, IResource);
    return _callSuper(this, IResource);
  }
  (0, _createClass2["default"])(IResource, [{
    key: "trigger",
    value: function trigger(_trigger) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this$instance$templa, _this$instance;
      return (_this$instance$templa = this === null || this === void 0 || (_this$instance = this.instance) === null || _this$instance === void 0 || (_this$instance = _this$instance.template) === null || _this$instance === void 0 ? void 0 : _this$instance.namespace) !== null && _this$instance$templa !== void 0 ? _this$instance$templa : "IResource";
    }
  }], [{
    key: "template",
    get: function get() {
      return new _TemplateDescriber.TemplateDescriber("Esiur", []);
    }
  }]);
  return IResource;
}(_IDestructible2["default"]);

},{"../Core/AsyncBag.js":39,"../Core/AsyncReply.js":42,"../Core/IDestructible.js":45,"./Template/TemplateDescriber.js":126,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],116:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IResource2 = _interopRequireDefault(require("./IResource.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var IStore = exports["default"] = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(IStore, _IResource);
  function IStore() {
    (0, _classCallCheck2["default"])(this, IStore);
    return _callSuper(this, IStore);
  }
  (0, _createClass2["default"])(IStore, [{
    key: "get",
    value: function get(path) {}
  }, {
    key: "retrieve",
    value: function retrieve(iid) {}
  }, {
    key: "put",
    value: function put(resource) {}
  }, {
    key: "record",
    value: function record(resource, propertyName, value, age, dateTime) {}
  }, {
    key: "modify",
    value: function modify(resource, propertyName, value, age, dateTime) {}
  }, {
    key: "getRecord",
    value: function getRecord(resource, fromDate, toDate) {}
  }, {
    key: "remove",
    value: function remove(resource) {}
  }]);
  return IStore;
}(_IResource2["default"]);

},{"./IResource.js":115,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],117:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 29/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));
var _IPermissionsManager = _interopRequireDefault(require("../Security/Permissions/IPermissionsManager.js"));
var _AutoList = _interopRequireDefault(require("../Data/AutoList.js"));
var _KeyList = _interopRequireDefault(require("../Data/KeyList.js"));
var _PropertyValue = _interopRequireDefault(require("../Data/PropertyValue.js"));
var _CustomResourceEvent = _interopRequireDefault(require("./CustomResourceEvent.js"));
var _Warehouse = _interopRequireDefault(require("./Warehouse.js"));
var _Ruling = _interopRequireDefault(require("../Security/Permissions/Ruling.js"));
var _TypedMap = _interopRequireDefault(require("../Data/TypedMap.js"));
var _TypedList = _interopRequireDefault(require("../Data/TypedList.js"));
var _EventOccurredInfo = _interopRequireDefault(require("./EventOccurredInfo.js"));
var _PropertyModificationInfo = _interopRequireDefault(require("./PropertyModificationInfo.js"));
var _PropertyValueArray = _interopRequireDefault(require("../Data/PropertyValueArray.js"));
var _DistributedResource = _interopRequireDefault(require("../Net/IIP/DistributedResource.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Instance = exports["default"] = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(Instance, _IEventHandler);
  function Instance(id, name, resource, store) {
    var _this;
    var customTemplate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var age = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    (0, _classCallCheck2["default"])(this, Instance);
    _this = _callSuper(this, Instance);
    _this.isDestroyed = false;
    _this.store = store;
    _this.resource = new WeakRef(resource);
    _this.id = id;
    _this.name = name;
    _this.instanceAge = age;
    _this.instanceModificationDate = new Date(0);
    _this.children = new _AutoList["default"]();
    _this.parents = new _AutoList["default"]();
    _this.managers = new _AutoList["default"]();
    _this.attributes = new _KeyList["default"]();
    var self = (0, _assertThisInitialized2["default"])(_this);
    _this.children.on("add", function (value) {
      var r = self.resource.deref();
      if (r != null) value.instance.parents.add(r);
    });
    _this.children.on("remove", function (value) {
      var r = self.resource.deref();
      if (r != null) value.instance.parents.remove(r);
    });
    resource.on("destroy", function (sender) {
      self.isDestroyed = true;
      self._emit("ResourceDestroyed", sender);
    });
    if (customTemplate != null) _this.template = customTemplate;else _this.template = _Warehouse["default"].getTemplateByType(resource.constructor);

    // set ages
    _this.ages = [];
    _this.modificationDates = [];
    for (var i = 0; i < _this.template.properties.length; i++) {
      _this.ages.push(0);
      _this.modificationDates.push(new Date(0));
    }

    // connect events
    if (!(resource instanceof _DistributedResource["default"])) {
      for (var _i = 0; _i < _this.template.events.length; _i++) resource.on(_this.template.events[_i].name, _this._makeHandler(_this.template.events[_i]));
    }
    return _this;
  }
  (0, _createClass2["default"])(Instance, [{
    key: "getAge",
    value: function getAge(index) {
      if (index < this.ages.length) return this.ages[index];else return 0;
    }
  }, {
    key: "setAge",
    value: function setAge(index, value) {
      if (index < this.ages.length) {
        this.ages[index] = value;
        if (value > this.instanceAge) this.instanceAge = value;
      }
    }
  }, {
    key: "getModificationDate",
    value: function getModificationDate(index) {
      if (index < this.modificationDates.length) return this.modificationDates[index];else return new Date(0);
    }
  }, {
    key: "setModificationDate",
    value: function setModificationDate(index, value) {
      if (index < this.modificationDates.length) {
        this.modificationDates[index] = value;
        if (value > this.instanceModificationDate) this.instanceModificationDate = value;
      }
    }
  }, {
    key: "loadProperty",
    value: function loadProperty(name, age, modificationDate, value) {
      var r = self.resource.deref();
      if (r == null) return;
      var pt = this.template.getPropertyTemplateByName(name);
      if (pt == null) return false;
      r[name] = value;
      this.setAge(pt.index, age);
      this.setModificationDate(pt.index, modificationDate);
      return true;
    }
  }, {
    key: "deserialize",
    value: function deserialize(properties) {
      for (var i = 0; i < properties.length; i++) {
        var pt = this.template.GetPropertyTemplateByIndex(i);
        if (pt != null) {
          var pv = properties[i];
          this.loadProperty(pt.name, pv.age, pv.date, pv.value);
        }
      }
      return true;
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var r = this.resource.deref();
      if (r == null) return;
      var props = new _PropertyValueArray["default"]();
      for (var i = 0; i < this.template.properties.length; i++) props.push(new _PropertyValue["default"](r[this.template.properties[i].name], this.ages[this.template.properties[i].index], this.modificationDates[this.template.properties[i].index]));
      return props;
    }
  }, {
    key: "isStorable",
    value: function isStorable() {
      return false;
    }
  }, {
    key: "emitModification",
    value: function emitModification(pt, value) {
      var _this$store, _this$store2;
      var resource = this.resource.deref();
      if (resource == null) return;
      this.instanceAge++;
      var now = new Date();
      this.ages[pt.index] = this.instanceAge;
      this.modificationDates[pt.index] = now;
      if (pt.recordable) (_this$store = this.store) === null || _this$store === void 0 || _this$store.record(resource, pt.name, value, this.ages[pt.index], now);else (_this$store2 = this.store) === null || _this$store2 === void 0 || _this$store2.modify(resource, pt.name, value, this.ages[pt.index], now);
      var pmInfo = new _PropertyModificationInfo["default"](resource, pt, value, this.instanceAge);
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Instance.prototype), "_emit", this).call(this, "PropertyModified", pmInfo);
      resource._emit(":".concat(pt.name), value);
    }
  }, {
    key: "modified",
    value: function (_modified) {
      function modified() {
        return _modified.apply(this, arguments);
      }
      modified.toString = function () {
        return _modified.toString();
      };
      return modified;
    }(function () {
      var propertyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (propertyName == null) propertyName = modified.caller.name;
      var val = {};
      if (this.getPropertyValue(propertyName, val)) {
        var pt = this.template.getPropertyTemplateByName(propertyName);
        this.emitModification(pt, val.value);
      }
    })
  }, {
    key: "_emitResourceEvent",
    value: function _emitResourceEvent(issuer, receivers, eventTemplate, value) {
      var resource = this.resource.deref();
      if (resource == null) return;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Instance.prototype), "_emit", this).call(this, "EventOccurred", new _EventOccurredInfo["default"](resource, eventTemplate, value, issuer, receivers));
    }
  }, {
    key: "getPropertyValue",
    value: function getPropertyValue(name, resultObject) {
      var resource = this.resource.deref();
      if (resource == null) return;
      for (var i = 0; i < this.template.properties.length; i++) if (this.template.properties[i].name == name) {
        resultObject.value = resource[name];
        return true;
      }
      return false;
    }
  }, {
    key: "age",
    get: function get() {
      return this.instanceAge;
    }
  }, {
    key: "_makeHandler",
    value: function _makeHandler(eventTemplate) {
      var self = this;
      return function (argument) {
        if (argument instanceof _CustomResourceEvent["default"]) self._emitResourceEvent(argument.issuer, argument.receivers, eventTemplate, argument.value);else self._emitResourceEvent(null, null, eventTemplate, argument);
      };
    }

    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Ruling.</returns>
  }, {
    key: "applicable",
    value: function applicable(session, action, member, inquirer) {
      var resource = this.resource.deref();
      if (resource == null) return;
      for (var i = 0; i < this.managers.length; i++) {
        var ruling = this.managers.item(i).applicable(resource, session, action, member, inquirer);
        if (ruling != _Ruling["default"].DontCare) return ruling;
      }
      return _Ruling["default"].DontCare;
    }
  }, {
    key: "removeAttributes",
    value: function removeAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (attributes == null) this.attributes.clear();else {
        for (var i = 0; i < attributes.length; i++) this.attributes.remove(attributes[i]);
      }
      return true;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var st = new (_TypedMap["default"].of(String, Object))();
      if (attributes == null) {
        attributes = this.attributes.keys.slice(0);
        attributes.push("managers");
      }
      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        if (attr == "name") st.set("name", this.name);else if (attr == "managers") {
          var mngrs = new (_TypedList["default"].of(_TypedMap["default"].of(String, Object)))();
          for (var j = 0; j < this.managers.length; j++) {
            var manager = this.managers.item(j);
            var sm = new (_TypedMap["default"].of(String, Object))();
            sm.set("type", manager.constructor.name);
            sm.set("settings", manager.settings);
            mngrs.push(sm);
          }
          st.set("managers", mngrs);
        } else st.set(attr, this.attributes.item(attr));
      }
      return st;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var clearAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (clearAttributes) this.attributes.clear();
      for (var attr in attributes) if (attr == "name") this.name = attributes[attr];else if (attr == "managers") {
        this.managers.clear();
        var mngrs = attributes[attr];
        for (var i = 0; i < mngrs.length; i++) {
          var mngr = mngrs[i];
          var type = window[mngr];
          var settings = mngr["settings"];
          var manager = new (Function.prototype.bind.apply(type))();
          if (manager instanceof _IPermissionsManager["default"]) {
            var r = this.resource.deref();
            if (r == null) return;
            manager.initialize(settings, r);
            this.managers.add(manager);
          } else return false;
        }
      } else {
        this.attributes.set(attr, attributes[attr]);
      }
      return true;
    }
  }, {
    key: "link",
    get: function get() {
      var resource = this.resource.deref();
      if (resource == null) return;
      if (resource == this.store) {
        return this.name;
      } else {
        return this.store.link(resource);
      }
    }
  }]);
  return Instance;
}(_IEventHandler2["default"]);

},{"../Core/IEventHandler.js":46,"../Data/AutoList.js":48,"../Data/KeyList.js":58,"../Data/PropertyValue.js":62,"../Data/PropertyValueArray.js":63,"../Data/TypedList.js":71,"../Data/TypedMap.js":72,"../Net/IIP/DistributedResource.js":79,"../Security/Permissions/IPermissionsManager.js":142,"../Security/Permissions/Ruling.js":143,"./CustomResourceEvent.js":113,"./EventOccurredInfo.js":114,"./PropertyModificationInfo.js":118,"./Warehouse.js":129,"@babel/runtime/helpers/assertThisInitialized":4,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],118:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _IResource = _interopRequireDefault(require("./IResource.js"));
var _PropertyTemplate = _interopRequireDefault(require("./Template/PropertyTemplate.js"));
var PropertyModificationInfo = exports["default"] = /*#__PURE__*/function () {
  function PropertyModificationInfo(resource, propertyTemplate, value, age) {
    (0, _classCallCheck2["default"])(this, PropertyModificationInfo);
    this.resource = resource;
    this.propertyTemplate = propertyTemplate;
    this.value = value;
    this.age = age;
  }
  (0, _createClass2["default"])(PropertyModificationInfo, [{
    key: "name",
    get: function get() {
      return this.propertyTemplate.name;
    }
  }]);
  return PropertyModificationInfo;
}();

},{"./IResource.js":115,"./Template/PropertyTemplate.js":125,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],119:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = require("../../Data/DC.js");
var _RepresentationType = _interopRequireDefault(require("../../Data/RepresentationType.js"));
var _ParseResult = _interopRequireDefault(require("../../Data/ParseResult.js"));
var ArgumentTemplate = exports["default"] = /*#__PURE__*/function () {
  function ArgumentTemplate(name, type, optional, index) {
    (0, _classCallCheck2["default"])(this, ArgumentTemplate);
    this.name = name;
    this.type = type;
    this.optional = optional;
    this.index = index;
  }
  (0, _createClass2["default"])(ArgumentTemplate, [{
    key: "compose",
    value: function compose() {
      var name = _DC.DC.stringToBytes(this.name);
      return (0, _DC.BL)().addUint8(this.optional ? 1 : 0).addUint8(name.length).addDC(name).addDC(this.type.compose()).toDC();
    }
  }], [{
    key: "parse",
    value: function parse(data, offset, index) {
      var optional = (data[offset++] & 0x1) == 0x1;
      var cs = data[offset++];
      var name = data.getString(offset, cs);
      offset += cs;
      var tdr = _RepresentationType["default"].parse(data, offset);
      return new _ParseResult["default"](cs + 2 + tdr.size, new ArgumentTemplate(name, tdr.type, optional, index));
    }
  }]);
  return ArgumentTemplate;
}();

},{"../../Data/DC.js":52,"../../Data/ParseResult.js":61,"../../Data/RepresentationType.js":66,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],120:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _DC = require("../../Data/DC.js");
var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));
var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConstantTemplate = exports["default"] = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(ConstantTemplate, _MemberTemplate);
  function ConstantTemplate(template, index, name, inherited, valueType, value, annotation) {
    var _this;
    (0, _classCallCheck2["default"])(this, ConstantTemplate);
    _this = _callSuper(this, ConstantTemplate, [template, index, name, inherited]);
    _this.valueType = valueType;
    _this.value = value;
    _this.annotation = annotation;
    return _this;
  }
  (0, _createClass2["default"])(ConstantTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ConstantTemplate.prototype), "compose", this).call(this);
      var hdr = this.inherited ? 0x80 : 0;
      if (this.annotation != null) {
        var exp = _DC.DC.stringToBytes(this.annotation);
        hdr |= 0x70;
        return (0, _DC.BL)().addUint8(hdr).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).addDC(_Codec["default"].compose(this.value, null)).addInt32(exp.length).addDC(exp).toDC();
      } else {
        hdr |= 0x60;
        return (0, _DC.BL)().addUint8(hdr).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).addDC(_Codec["default"].compose(this.value, null)).toDC();
      }
    }
  }]);
  return ConstantTemplate;
}(_MemberTemplate2["default"]);

},{"../../Data/Codec.js":51,"../../Data/DC.js":52,"./MemberTemplate.js":123,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],121:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 24/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _DC = require("../../Data/DC.js");
var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var EventTemplate = exports["default"] = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(EventTemplate, _MemberTemplate);
  function EventTemplate(template, index, name, inherited, argumentType) {
    var _this;
    var annotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var listenable = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    (0, _classCallCheck2["default"])(this, EventTemplate);
    _this = _callSuper(this, EventTemplate, [template, index, name, inherited]);
    _this.argumentType = argumentType;
    _this.annotation = annotation;
    _this.listenable = listenable;
    return _this;
  }
  (0, _createClass2["default"])(EventTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(EventTemplate.prototype), "compose", this).call(this);
      var hdr = this.inherited ? 0x80 : 0;
      if (this.listenable) hdr |= 0x8;
      if (this.annotation != null) {
        var exp = _DC.DC.stringToBytes(this.annotation);
        hdr |= 0x50;
        return (0, _DC.BL)().addUint8(hdr).addUint8(name.length).addDC(name).addDC(this.argumentType.compose()).addInt32(exp.length).addDC(exp).toDC();
      } else {
        hdr |= 0x40;
        return (0, _DC.BL)().addUint8(hdr).addUint8(name.length).addDC(name).addDC(this.argumentType.compose()).toDC();
      }
    }
  }]);
  return EventTemplate;
}(_MemberTemplate2["default"]);

},{"../../Data/DC.js":52,"./MemberTemplate.js":123,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],122:[function(require,module,exports){
/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 27/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _DC = require("../../Data/DC.js");
var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var FunctionTemplate = exports["default"] = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(FunctionTemplate, _MemberTemplate);
  function FunctionTemplate(template, index, name, inherited, isStatic, args, returnType) {
    var _this;
    var annotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    (0, _classCallCheck2["default"])(this, FunctionTemplate);
    _this = _callSuper(this, FunctionTemplate, [template, index, name, inherited]);
    _this.args = args;
    _this.returnType = returnType;
    _this.annotation = annotation;
    _this.isStatic = isStatic;
    return _this;
  }
  (0, _createClass2["default"])(FunctionTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(FunctionTemplate.prototype), "compose", this).call(this);
      var bl = new _DC.BL().addUint8(name.length).addDC(name).addDC(this.returnType.compose()).addUint8(this.args.length);
      for (var i = 0; i < this.args.length; i++) bl.addDC(this.args[i].compose());
      if (this.annotation != null) {
        var exp = _DC.DC.stringToBytes(this.annotation);
        bl.addInt32(exp.length).addDC(exp);
        bl.insertUint8(0, (this.inherited ? 0x90 : 0x10) | (this.isStatic ? 0x4 : 0));
      } else bl.insertUint8(0, (this.inherited ? 0x80 : 0x0) | (this.isStatic ? 0x4 : 0));
      return bl.toDC();
    }
  }]);
  return FunctionTemplate;
}(_MemberTemplate2["default"]);

},{"../../Data/DC.js":52,"./MemberTemplate.js":123,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],123:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 24/08/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = _interopRequireDefault(require("../../Data/DC.js"));
var MemberTemplate = exports["default"] = /*#__PURE__*/function () {
  function MemberTemplate(template, index, name, inherited) {
    (0, _classCallCheck2["default"])(this, MemberTemplate);
    this.template = template;
    this.index = index;
    this.name = name;
    this.inherited = inherited;
  }
  (0, _createClass2["default"])(MemberTemplate, [{
    key: "fullname",
    get: function get() {
      return this.template.className + "." + this.name;
    }
  }, {
    key: "compose",
    value: function compose() {
      return _DC["default"].stringToBytes(this.name);
    }
  }]);
  return MemberTemplate;
}();

},{"../../Data/DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Function: 0,
  Property: 1,
  Event: 2
};

},{}],125:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _DC = require("../../Data/DC.js");
var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/ /**
 * Created by Ahmed Zamil on 27/08/2017.
 */
var PropertyTemplate = exports["default"] = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(PropertyTemplate, _MemberTemplate);
  function PropertyTemplate(template, index, name, inherited, valueType) {
    var _this;
    var readAnnotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var writeAnnotation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var recordable = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    (0, _classCallCheck2["default"])(this, PropertyTemplate);
    _this = _callSuper(this, PropertyTemplate, [template, index, name, inherited]);
    _this.valueType = valueType;
    _this.readAnnotation = readAnnotation;
    _this.writeAnnotation = writeAnnotation;
    _this.recordable = recordable;
    return _this;
  }
  (0, _createClass2["default"])(PropertyTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(PropertyTemplate.prototype), "compose", this).call(this);
      var pv = this.permission << 1 | (this.recordable ? 1 : 0);
      if (this.inherited) pv |= 0x80;
      if (this.writeAnnotation != null && this.readAnnotation != null) {
        var rexp = _DC.DC.stringToBytes(this.readAnnotation);
        var wexp = _DC.DC.stringToBytes(this.writeAnnotation);
        return (0, _DC.BL)().addUint8(0x38 | pv).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).addInt32(wexp.length).addDC(wexp).addInt32(rexp.length).addDC(rexp).toDC();
      } else if (this.writeAnnotation != null) {
        var _wexp = _DC.DC.stringToBytes(this.writeAnnotation);
        return (0, _DC.BL)().addUint8(0x30 | pv).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).addInt32(_wexp.length).addDC(_wexp).toDC();
      } else if (this.readAnnotation != null) {
        var _rexp = _DC.DC.stringToBytes(this.readAnnotation);
        return (0, _DC.BL)().addUint8(0x28 | pv).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).addInt32(_rexp.length).addDC(_rexp).toDC();
      } else return (0, _DC.BL)().addUint8(0x20 | pv).addUint8(name.length).addDC(name).addDC(this.valueType.compose()).toDC();
    }
  }]);
  return PropertyTemplate;
}(_MemberTemplate2["default"]);

},{"../../Data/DC.js":52,"./MemberTemplate.js":123,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/get":15,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],126:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateDescriber = exports.Prop = exports.Func = exports.Evt = exports.Const = exports.Arg = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Void = _interopRequireDefault(require("../../Data/Void.js"));
var TemplateDescriber = exports.TemplateDescriber = /*#__PURE__*/(0, _createClass2["default"])(function TemplateDescriber(namespace, members, parent) {
  var version = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var annotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var classId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var className = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  (0, _classCallCheck2["default"])(this, TemplateDescriber);
  (0, _defineProperty2["default"])(this, "properties", void 0);
  (0, _defineProperty2["default"])(this, "events", void 0);
  (0, _defineProperty2["default"])(this, "functions", void 0);
  (0, _defineProperty2["default"])(this, "constants", void 0);
  (0, _defineProperty2["default"])(this, "namespace", void 0);
  (0, _defineProperty2["default"])(this, "version", void 0);
  (0, _defineProperty2["default"])(this, "parent", void 0);
  (0, _defineProperty2["default"])(this, "annotation", void 0);
  (0, _defineProperty2["default"])(this, "classId", void 0);
  (0, _defineProperty2["default"])(this, "className", void 0);
  if (namespace == null) throw new Error("Namespace name can't be null.");
  if (members == null) throw new Error("Members name can't be null.");
  this.namespace = namespace;
  this.parent = parent;
  this.properties = members.filter(function (x) {
    return x instanceof Prop;
  });
  ;
  this.functions = members.filter(function (x) {
    return x instanceof Func;
  });
  this.events = members.filter(function (x) {
    return x instanceof Evt;
  });
  ;
  this.constants = members.filter(function (x) {
    return x instanceof Const;
  });
  ;
  this.version = version;
  this.annotation = annotation;
  this.classId = classId;
  this.className = className;
});
var Prop = exports.Prop = /*#__PURE__*/(0, _createClass2["default"])(function Prop(name) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
  var readAnnotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var writeAnnotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var recordable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  (0, _classCallCheck2["default"])(this, Prop);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "type", void 0);
  (0, _defineProperty2["default"])(this, "readAnnotation", void 0);
  (0, _defineProperty2["default"])(this, "writeAnnotation", void 0);
  (0, _defineProperty2["default"])(this, "recordable", void 0);
  if (name == null) throw new Error("Property name can't be null.");
  this.name = name;
  this.type = type !== null && type !== void 0 ? type : Object;
  this.readAnnotation = readAnnotation;
  this.writeAnnotation = writeAnnotation;
  this.recordable = recordable;
});
var Evt = exports.Evt = /*#__PURE__*/(0, _createClass2["default"])(function Evt(name) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
  var listenable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var annotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  (0, _classCallCheck2["default"])(this, Evt);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "listenable", void 0);
  (0, _defineProperty2["default"])(this, "type", void 0);
  (0, _defineProperty2["default"])(this, "annotation", void 0);
  if (name == null) throw new Error("Event name can't be null.");
  this.name = name;
  this.type = type !== null && type !== void 0 ? type : Object;
  this.listenable = listenable;
  this.annotation = annotation;
});
var Const = exports.Const = /*#__PURE__*/(0, _createClass2["default"])(function Const(name) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String;
  var value = arguments.length > 2 ? arguments[2] : undefined;
  var annotation = arguments.length > 3 ? arguments[3] : undefined;
  (0, _classCallCheck2["default"])(this, Const);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "type", void 0);
  (0, _defineProperty2["default"])(this, "annotation", void 0);
  (0, _defineProperty2["default"])(this, "value", void 0);
  if (name == null) throw new Error("Constant name can't be null.");
  this.name = name;
  this.type = type !== null && type !== void 0 ? type : String;
  this.value = value !== null && value !== void 0 ? value : "";
  this.annotation = annotation;
});
var Func = exports.Func = /*#__PURE__*/(0, _createClass2["default"])(function Func(name) {
  var returnType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Void["default"];
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var annotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var isStatic = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  (0, _classCallCheck2["default"])(this, Func);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "returnType", void 0);
  (0, _defineProperty2["default"])(this, "args", void 0);
  (0, _defineProperty2["default"])(this, "annotation", void 0);
  (0, _defineProperty2["default"])(this, "isStatic", void 0);
  if (name == null) throw new Error("Function name can't be null.");
  this.name = name;
  this.returnType = returnType !== null && returnType !== void 0 ? returnType : _Void["default"];
  this.args = args !== null && args !== void 0 ? args : [];
  this.annotation = annotation;
  this.isStatic = isStatic;
});
var Arg = exports.Arg = /*#__PURE__*/(0, _createClass2["default"])(function Arg(name) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
  var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  (0, _classCallCheck2["default"])(this, Arg);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "type", void 0);
  (0, _defineProperty2["default"])(this, "optional", void 0);
  if (name == null) throw new Error("Argument name can't be null.");
  this.name = name;
  this.type = type !== null && type !== void 0 ? type : Object;
  this.optional = optional;
});

},{"../../Data/Void.js":74,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  Resource: 0,
  Record: 1,
  Enum: 2
};

},{}],128:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _FunctionTemplate = _interopRequireDefault(require("./FunctionTemplate.js"));
var _PropertyTemplate = _interopRequireDefault(require("./PropertyTemplate.js"));
var _EventTemplate = _interopRequireDefault(require("./EventTemplate.js"));
var _SHA = _interopRequireDefault(require("../../Security/Integrity/SHA256.js"));
var _DC = require("../../Data/DC.js");
var _ArgumentTemplate = _interopRequireDefault(require("./ArgumentTemplate.js"));
var _IResource = _interopRequireDefault(require("../IResource.js"));
var _IRecord = _interopRequireDefault(require("../../Data/IRecord.js"));
var _TemplateType = _interopRequireDefault(require("./TemplateType.js"));
var _Warehouse = _interopRequireDefault(require("../Warehouse.js"));
var _DistributedConnection = _interopRequireDefault(require("../../Net/IIP/DistributedConnection.js"));
var _ConstantTemplate = _interopRequireDefault(require("./ConstantTemplate.js"));
var _IEnum = _interopRequireDefault(require("../../Data/IEnum.js"));
var _DistributedResource = _interopRequireDefault(require("../../Net/IIP/DistributedResource.js"));
var _RepresentationType = _interopRequireDefault(require("../../Data/RepresentationType.js"));
var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));
var TypeTemplate = exports["default"] = /*#__PURE__*/function () {
  function TypeTemplate(type, addToWarehouse) {
    var _describer$className, _describer$classId;
    (0, _classCallCheck2["default"])(this, TypeTemplate);
    (0, _defineProperty2["default"])(this, "isWrapper", false);
    (0, _defineProperty2["default"])(this, "properties", []);
    (0, _defineProperty2["default"])(this, "events", []);
    (0, _defineProperty2["default"])(this, "functions", []);
    (0, _defineProperty2["default"])(this, "members", []);
    (0, _defineProperty2["default"])(this, "constants", []);
    if (type === undefined) return;
    if (type.prototype instanceof _IRecord["default"]) this.templateType = _TemplateType["default"].Record;else if (type.prototype instanceof _IResource["default"]) this.templateType = _TemplateType["default"].Resource;else if (type.prototype instanceof _IEnum["default"]) this.templateType = _TemplateType["default"].Enum;else throw new Error("Type must implement IResource, IRecord, IEnum or a subtype of DistributedResource.");
    this.isWrapper = type.prototype instanceof _DistributedResource["default"];
    this.definedType = type;
    var describer = type.template;

    // set UUID
    this.className = describer.namespace + "." + ((_describer$className = describer.className) !== null && _describer$className !== void 0 ? _describer$className : type.prototype.constructor.name);
    this.classId = (_describer$classId = describer.classId) !== null && _describer$classId !== void 0 ? _describer$classId : _SHA["default"].compute(_DC.DC.stringToBytes(this.className)).getUUID(0);
    if (addToWarehouse) _Warehouse["default"].putTemplate(this);

    //byte currentIndex = 0;

    if (describer.properties != null) for (var i = 0; i < describer.properties.length; i++) {
      var _RepresentationType$f;
      //[name, type, {read: comment, write: comment, recordable: }]
      var pi = describer.properties[i];
      var pt = new _PropertyTemplate["default"](this, i, pi.name, false, (_RepresentationType$f = _RepresentationType["default"].fromType(pi.type)) !== null && _RepresentationType$f !== void 0 ? _RepresentationType$f : _RepresentationType["default"].Void, pi.readAnnotation, pi.writeAnnotation, pi.recordable);
      pt.propertyInfo = pi;
      this.properties.push(pt);
    }
    if (describer.constants != null) for (var _i = 0; _i < describer.constants.length; _i++) {
      var _RepresentationType$f2;
      var ci = describer.constants[_i];
      var ct = new _ConstantTemplate["default"](this, _i, ci.name, false, (_RepresentationType$f2 = _RepresentationType["default"].fromType(ci.type)) !== null && _RepresentationType$f2 !== void 0 ? _RepresentationType$f2 : _RepresentationType["default"].Void, ci.value, ci.annotation);
      ct.propertyInfo = ci;
      this.constants.push(ct);
    }
    if (this.templateType == _TemplateType["default"].Resource) {
      if (describer.events != null) {
        for (var _i2 = 0; _i2 < describer.events.length; _i2++) {
          var _RepresentationType$f3;
          // [name, type, {listenable: true/false, help: ""}]
          var ei = describer.events[_i2];
          var et = new _EventTemplate["default"](this, _i2, ei.name, false, (_RepresentationType$f3 = _RepresentationType["default"].fromType(ei.type)) !== null && _RepresentationType$f3 !== void 0 ? _RepresentationType$f3 : _RepresentationType["default"].Void, ei.annotation, ei.listenable);
          et.eventInfo = ei;
          this.events.push(et);
        }
      }
      if (describer.functions != null) {
        for (var _i3 = 0; _i3 < describer.functions.length; _i3++) {
          var _RepresentationType$f5;
          var fi = describer.functions[_i3];
          var args = [];
          for (var ai = 0; ai < fi.args.length; ai++) {
            var _RepresentationType$f4;
            args.push(new _ArgumentTemplate["default"](fi.args[ai].name, (_RepresentationType$f4 = _RepresentationType["default"].fromType(fi.args[ai].type)) !== null && _RepresentationType$f4 !== void 0 ? _RepresentationType$f4 : _RepresentationType["default"].Dynamic, fi.args[ai].optional, ai));
          }

          // [name, {param1: type, param2: int}, returnType, "Description"]
          var isStatic = type[fi.name] instanceof Function;
          var ft = new _FunctionTemplate["default"](this, _i3, fi.name, false, isStatic, args, (_RepresentationType$f5 = _RepresentationType["default"].fromType(fi.returnType)) !== null && _RepresentationType$f5 !== void 0 ? _RepresentationType$f5 : _RepresentationType["default"].Void, fi.annotation);
          ft.methodInfo = fi;
          this.functions.push(ft);
        }
      }
    }

    // append signals
    for (var _i4 = 0; _i4 < this.events.length; _i4++) this.members.push(this.events[_i4]);
    // append slots
    for (var _i5 = 0; _i5 < this.functions.length; _i5++) this.members.push(this.functions[_i5]);
    // append properties
    for (var _i6 = 0; _i6 < this.properties.length; _i6++) this.members.push(this.properties[_i6]);
    // append constants
    for (var _i7 = 0; _i7 < this.constants.length; _i7++) this.members.push(this.constants[_i7]);

    // bake it binarily
    var b = (0, _DC.BL)();
    var hasClassAnnotation = describer.annotation != null;
    var cls = _DC.DC.stringToBytes(this.className);
    b.addUint8((hasClassAnnotation ? 0x40 : 0) | this.templateType).addUint8Array(this.classId.value).addUint8(cls.length).addUint8Array(cls);
    if (hasClassAnnotation) {
      var classAnnotationBytes = _DC.DC.stringToBytes(describer.annotation);
      b.addUint16(classAnnotationBytes.length).addUint8Array(classAnnotationBytes);
      this.annotation = describer.annotation;
    }
    b.addUint32(describer.version).addUint16(this.members.length);
    for (var _i8 = 0; _i8 < this.functions.length; _i8++) b.addUint8Array(this.functions[_i8].compose());
    for (var _i9 = 0; _i9 < this.properties.length; _i9++) b.addUint8Array(this.properties[_i9].compose());
    for (var _i10 = 0; _i10 < this.events.length; _i10++) b.addUint8Array(this.events[_i10].compose());
    this.content = b.toArray();
  }
  (0, _createClass2["default"])(TypeTemplate, [{
    key: "getEventTemplateByName",
    value: function getEventTemplateByName(eventName) {
      for (var i = 0; i < this.events.length; i++) if (this.events[i].name == eventName) return this.events[i];
      return null;
    }
  }, {
    key: "getEventTemplateByIndex",
    value: function getEventTemplateByIndex(index) {
      for (var i = 0; i < this.events.length; i++) if (this.events[i].index == index) return this.events[i];
      return null;
    }
  }, {
    key: "getFunctionTemplateByName",
    value: function getFunctionTemplateByName(functionName) {
      for (var i = 0; i < this.functions.length; i++) if (this.functions[i].name == functionName) return this.functions[i];
      return null;
    }
  }, {
    key: "getFunctionTemplateByIndex",
    value: function getFunctionTemplateByIndex(index) {
      for (var i = 0; i < this.functions.length; i++) if (this.functions[i].index == index) return this.functions[i];
      return null;
    }
  }, {
    key: "getPropertyTemplateByName",
    value: function getPropertyTemplateByName(propertyName) {
      for (var i = 0; i < this.properties.length; i++) if (this.properties[i].name == propertyName) return this.properties[i];
      return null;
    }
  }, {
    key: "getPropertyTemplateByIndex",
    value: function getPropertyTemplateByIndex(index) {
      for (var i = 0; i < this.properties.length; i++) if (this.properties[i].index == index) return this.properties[i];
      return null;
    }
  }, {
    key: "getConstantTemplateByName",
    value: function getConstantTemplateByName(constantName) {
      for (var i = 0; i < this.constants.length; i++) if (this.constants[i].name == constantName) return this.constants[i];
      return null;
    }
  }, {
    key: "getConstantTemplateByIndex",
    value: function getConstantTemplateByIndex(index) {
      for (var i = 0; i < this.constants.length; i++) if (this.constants[i].index == index) return this.constants[i];
      return null;
    }

    /*
       template: {
     properties: [
     {name: 'size', read: null, write: null}
     ],
     functions: [
       ],
     events: [
       ]
     }
     */
  }, {
    key: "type",
    get: function get() {
      return this.templateType;
    }
  }], [{
    key: "getTypeUUID",
    value: function getTypeUUID(type) {
      return this.getTypeUUIDByName(type.template.namespace + "." + type.prototype.constructor.name);
    }
  }, {
    key: "getTypeUUIDByName",
    value: function getTypeUUIDByName(typeName) {
      var hash = _SHA["default"].compute(_DC.DC.stringToBytes(typeName));
      hash.setUint8(6, hash.getUint8(6) & 0xF | 0x80);
      hash.setUint8(8, hash.getUint8(8) & 0xF | 0x80);
      return hash.getUUID(0);
    }
  }, {
    key: "getDependencies",
    value: function getDependencies(template) {
      var list = [];
      list.push(template);
      var _getDependenciesFunc = null;
      _getDependenciesFunc = function getDependenciesFunc(tmp, bag) {
        if (template.definedType == null) return;

        // functions
        for (var i = 0; i < tmp.functions.length; i++) {
          var ft = tmp.functions[i];
          var frtt = _Warehouse["default"].getTemplateByType(ft.methodInfo.returnType);
          if (frtt != null) {
            if (!bag.includes(frtt)) {
              list.push(frtt);
              _getDependenciesFunc(frtt, bag);
            }
          }
          var args = ft.methodInfo.args;
          for (var j = 0; j < args.length - 1; j++) {
            var fpt = _Warehouse["default"].getTemplateByType(args[j].type);
            if (fpt != null) {
              if (!bag.includes(fpt)) {
                bag.push(fpt);
                _getDependenciesFunc(fpt, bag);
              }
            }
          }

          // skip DistributedConnection argument
          if (args.length > 0) {
            var last = args[args.length - 1];
            if (last.type == _DistributedConnection["default"]) {
              var _fpt = _Warehouse["default"].getTemplateByType(last.type);
              if (_fpt != null) {
                if (!bag.includes(_fpt)) {
                  bag.push(_fpt);
                  _getDependenciesFunc(_fpt, bag);
                }
              }
            }
          }
        }

        // properties
        for (var _i11 = 0; _i11 < tmp.properties.length; _i11++) {
          var p = tmp.properties[_i11];
          var pt = _Warehouse["default"].getTemplateByType(p.propertyInfo.type);
          if (pt != null) {
            if (!bag.includes(pt)) {
              bag.push(pt);
              _getDependenciesFunc(pt, bag);
            }
          }
        }

        // events
        for (var _i12 = 0; _i12 < tmp.events.length; _i12++) {
          var e = tmp.events[_i12];
          var et = _Warehouse["default"].getTemplateByType(e.eventInfo.type);
          if (et != null) {
            if (!bag.includes(et)) {
              bag.add(et);
              _getDependenciesFunc(et, bag);
            }
          }
        }
      };
      _getDependenciesFunc(template, list);
      return list.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    }
  }, {
    key: "getFunctionParameters",
    value: function getFunctionParameters(func) {
      var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
      //var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
      var ARGUMENT_NAMES = /([^\s,]+)/g;
      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
      if (result === null) result = [];
      return result;
    }
  }, {
    key: "_getParamNames",
    value: function _getParamNames(func) {
      var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
      var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
      if (result === null) result = [];
      return result;
    }
  }, {
    key: "parse",
    value: function parse(data) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var contentLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (contentLength == -1) contentLength = data.length;

      //var ends = offset + contentLength;
      //var oOffset = offset;

      // start parsing...

      var od = new TypeTemplate();
      od.content = data.clip(offset, contentLength);
      var hasParent = (data.getUint8(offset) & 0x80) > 0;
      var hasClassAnnotation = (data.getUint8(offset) & 0x40) > 0;
      od.templateType = data.getUint8(offset++) & 0xF;
      od.classId = data.getUUID(offset);
      offset += 16;
      od.className = data.getString(offset + 1, data.getUint8(offset));
      offset += data.getUint8(offset) + 1;
      if (hasParent) {
        od.parentId = data.getUUID(offset);
        offset += 16;
      }
      if (hasClassAnnotation) {
        var len = data.getUint16(offset);
        offset += 2;
        od.annotation = data.getString(offset, len);
        offset += len;
      }
      od.version = data.getInt32(offset);
      offset += 4;
      var methodsCount = data.getUint16(offset);
      offset += 2;
      var functionIndex = 0;
      var propertyIndex = 0;
      var eventIndex = 0;
      var constantIndex = 0;
      for (var i = 0; i < methodsCount; i++) {
        var inherited = (data.getUint8(offset) & 0x80) > 0;
        var type = data.getUint8(offset) >> 5 & 0x3;
        if (type == 0)
          // function
          {
            var annotation = null;
            var isStatic = (data[offset] & 0x4) == 0x4;
            var hasAnnotation = (data.getUint8(offset++) & 0x10) == 0x10;
            var _len = data.getUint8(offset++);
            var name = data.getString(offset, _len);
            offset += _len;

            // return type
            var _dt = _RepresentationType["default"].parse(data, offset);
            offset += _dt.size;

            //ft.returnType = returnType;

            // arguments count
            var argsCount = data.getUint8(offset++);
            var args = [];
            for (var a = 0; a < argsCount; a++) {
              var _ArgumentTemplate$par = _ArgumentTemplate["default"].parse(data, offset, a),
                argSize = _ArgumentTemplate$par.size,
                argType = _ArgumentTemplate$par.value;
              args.push(argType);
              offset += argSize;
            }
            if (hasAnnotation)
              // annotation ?
              {
                var cs = data.getUint32(offset);
                offset += 4;
                annotation = data.getString(offset, cs);
                offset += cs;
              }
            var ft = new _FunctionTemplate["default"](od, functionIndex++, name, inherited, isStatic, args, _dt.type, annotation);
            od.functions.push(ft);
          } else if (type == 1)
          // property
          {
            var hasReadAnnotation = (data.getUint8(offset) & 0x8) == 0x8;
            var hasWriteAnnotation = (data.getUint8(offset) & 0x10) == 0x10;
            var readAnnotation = void 0,
              writeAnnotation = void 0;
            var recordable = (data.getUint8(offset) & 1) == 1;
            var permission = data.getUint8(offset++) >> 1 & 0x3;
            var _len2 = data.getUint8(offset++);
            var _name = data.getString(offset, _len2);
            offset += _len2;
            var dt = _RepresentationType["default"].parse(data, offset);
            offset += dt.size;
            if (hasReadAnnotation)
              // annotation ?
              {
                var _cs = data.getUint32(offset);
                offset += 4;
                readAnnotation = data.getString(offset, _cs);
                offset += _cs;
              }
            if (hasWriteAnnotation)
              // annotation ?
              {
                var _cs2 = data.getUint32(offset);
                offset += 4;
                writeAnnotation = data.getString(offset, _cs2);
                offset += _cs2;
              }
            var pt = new _PropertyTemplate["default"](od, propertyIndex++, _name, inherited, dt.type, readAnnotation, writeAnnotation, recordable);
            od.properties.push(pt);
          } else if (type == 2)
          // Event
          {
            var _hasAnnotation = (data.getUint8(offset) & 0x10) == 0x10;
            var listenable = (data.getUint8(offset++) & 0x8) == 0x8;
            var _len3 = data.getUint8(offset++);
            var _name2 = data.getString(offset, _len3);
            var _annotation = void 0;
            offset += _len3;
            var _dt2 = _RepresentationType["default"].parse(data, offset);
            offset += _dt2.size;
            if (_hasAnnotation)
              // annotation ?
              {
                var _cs3 = data.getUint32(offset);
                offset += 4;
                _annotation = data.getString(offset, _cs3);
                offset += _cs3;
              }
            var et = new _EventTemplate["default"](od, eventIndex++, _name2, inherited, _dt2.type, _annotation, listenable);
            od.events.push(et);
          } else if (type == 3)
          // constant
          {
            var _annotation2 = null;
            var _hasAnnotation2 = (data[offset++] & 0x10) == 0x10;
            var _name3 = data.getString(offset + 1, data[offset]);
            offset += data[offset] + 1;
            var _dt3 = _RepresentationType["default"].parse(data, offset);
            offset += _dt3.size;
            var parsed = _Codec["default"].parse(data, offset, null, null);
            offset += parsed.size;
            if (_hasAnnotation2)
              // annotation ?
              {
                var _cs4 = data.getUint32(offset);
                offset += 4;
                _annotation2 = data.getString(offset, _cs4);
                offset += _cs4;
              }
            var ct = new _ConstantTemplate["default"](this, constantIndex++, _name3, inherited, _dt3.type, parsed.reply.result, _annotation2);
            od.constants.push(ct);
          }
      }

      // append signals
      for (var _i13 = 0; _i13 < od.events.length; _i13++) od.members.push(od.events[_i13]);
      // append slots
      for (var _i14 = 0; _i14 < od.functions.length; _i14++) od.members.push(od.functions[_i14]);
      // append properties
      for (var _i15 = 0; _i15 < od.properties.length; _i15++) od.members.push(od.properties[_i15]);
      // append constants
      for (var _i16 = 0; _i16 < od.constants.length; _i16++) od.members.push(od.constants[_i16]);
      return od;
    }
  }]);
  return TypeTemplate;
}();

},{"../../Data/Codec.js":51,"../../Data/DC.js":52,"../../Data/IEnum.js":56,"../../Data/IRecord.js":57,"../../Data/RepresentationType.js":66,"../../Net/IIP/DistributedConnection.js":77,"../../Net/IIP/DistributedResource.js":79,"../../Security/Integrity/SHA256.js":136,"../IResource.js":115,"../Warehouse.js":129,"./ArgumentTemplate.js":119,"./ConstantTemplate.js":120,"./EventTemplate.js":121,"./FunctionTemplate.js":122,"./PropertyTemplate.js":125,"./TemplateType.js":127,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],129:[function(require,module,exports){
/*
* Copyright (c) 2017 - 2024 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.WH = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
var _TypeTemplate = _interopRequireDefault(require("../Resource/Template/TypeTemplate.js"));
var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));
var _AutoList = _interopRequireDefault(require("../Data/AutoList.js"));
var _KeyList = _interopRequireDefault(require("../Data/KeyList.js"));
var _DistributedConnection = _interopRequireDefault(require("../Net/IIP/DistributedConnection.js"));
var _MemoryStore = _interopRequireDefault(require("../Stores/MemoryStore.js"));
var _Instance = _interopRequireDefault(require("../Resource/Instance.js"));
var _IStore = _interopRequireDefault(require("./IStore.js"));
var _IResource = _interopRequireWildcard(require("./IResource.js"));
var _IndexedDBStore = _interopRequireDefault(require("../Stores/IndexedDBStore.js"));
var _ResourceProxy = _interopRequireDefault(require("../Proxy/ResourceProxy.js"));
var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));
var _IRecord = _interopRequireDefault(require("../Data/IRecord.js"));
var _TemplateType = _interopRequireDefault(require("./Template/TemplateType.js"));
var _DistributedResource = _interopRequireDefault(require("../Net/IIP/DistributedResource.js"));
var _IEnum = _interopRequireDefault(require("../Data/IEnum.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var WH = exports.WH = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(WH, _IEventHandler);
  function WH() {
    var _this;
    (0, _classCallCheck2["default"])(this, WH);
    _this = _callSuper(this, WH);

    //this.stores =  new AutoList();
    _this.stores = new _KeyList["default"]();
    _this.resources = new _KeyList["default"]();
    _this.resourceCounter = 0;
    _this.templates = new _KeyList["default"]();
    _this.templates.add(_TemplateType["default"].Resource, new _KeyList["default"]());
    _this.templates.add(_TemplateType["default"].Record, new _KeyList["default"]());
    _this.templates.add(_TemplateType["default"].Enum, new _KeyList["default"]());
    _this.protocols = new _KeyList["default"]();
    _this._register("connected");
    _this._register("disconnected");
    _this._urlRegex = /^(?:([^\s|:]*):\/\/([^/]*)\/?)/;
    return _this;
  }
  (0, _createClass2["default"])(WH, [{
    key: "newInstance",
    value: function newInstance(type, properties) {
      var proxyType = _ResourceProxy["default"].getProxy(type);
      var res = new proxyType();
      if (properties != null) Object.assign(res, properties);
      return type;
    }
  }, {
    key: "new",
    value: function _new(type, name) {
      var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var manager = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var attributes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var properties = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var proxyType = _ResourceProxy["default"].getProxy(type);
      var res = new proxyType();
      if (properties != null) Object.assign(res, properties);
      if (properties != null) Object.assign(res, properties);
      if (store != null || parent != null || res instanceof _IStore["default"]) {
        var rt = new _AsyncReply["default"]();
        this.put(name, res, store, parent, null, 0, manager, attributes).then(function () {
          return rt.trigger(res);
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
        return rt;
      } else {
        return new _AsyncReply["default"](res);
      }
    }
  }, {
    key: "getById",
    value: function getById(id) {
      return new _AsyncReply["default"](this.resources.item(id));
    }
  }, {
    key: "get",
    value: function get(path)
    //, parent = null, manager = null)
    {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var rt = new _AsyncReply["default"]();
      // var self = this;

      // Should we create a new store ?
      if (path.match(this._urlRegex)) {
        // with port
        //var url = path.split(/(?:):\/\/([^:\/]*):?(\d*)/);
        // without port
        var url = path.split(this._urlRegex);
        var handler;
        var initResource = function initResource() {
          handler(url[2], attributes).then(function (store) {
            if (url[3].length > 0 && url[3] != "") store.get(url[3]).then(function (r) {
              return rt.trigger(r);
            }).error(function (ex) {
              return rt.triggerError(ex);
            });else rt.trigger(store);
          }).error(function (ex) {
            rt.triggerError(ex);
          });
        };
        if (handler = this.protocols.item(url[1])) {
          if (!this.warehouseIsOpen) {
            this.open().then(function () {
              initResource();
            }).error(function (ex) {
              return rt.triggerError(ex);
            });
          } else initResource();
          return rt;
        }
      }
      this.query(path).then(function (rs) {
        if (rs != null && rs.length > 0) rt.trigger(rs[0]);else rt.trigger(null);
      }).error(function (ex) {
        return rt.triggerError(ex);
      });
      return rt;
    }
  }, {
    key: "remove",
    value: function remove(resource) {
      if (resource.instance == null) return;
      if (this.resources.contains(resource.instance.id)) this.resources.remove(resource.instance.id);else return false;
      if (resource instanceof _IStore["default"]) {
        this.stores.remove(resource);

        // remove all objects associated with the store
        var toBeRemoved = null;
        for (var i = 0; i < this.resources.length; i++) {
          var o = this.resources.at(i);
          if (o.instance.store == resource) {
            if (toBeRemoved == null) toBeRemoved = [];
            toBeRemoved.push(o);
          }
        }
        if (toBeRemoved != null) for (var _i = 0; _i < toBeRemoved.length; _i++) this.remove(toBeRemoved[_i]);
        this._emit("disconnected", resource);
      }
      if (resource.instance.store != null) resource.instance.store.remove(resource);
      resource.destroy();
      resource.instance = null;
      return true;
    }
  }, {
    key: "put",
    value: function () {
      var _put = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, resource, store, parent) {
        var customTemplate,
          age,
          manager,
          attributes,
          path,
          _store,
          instanceName,
          resourceReference,
          list,
          _list,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              customTemplate = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
              age = _args.length > 5 && _args[5] !== undefined ? _args[5] : 0;
              manager = _args.length > 6 && _args[6] !== undefined ? _args[6] : null;
              attributes = _args.length > 7 && _args[7] !== undefined ? _args[7] : null;
              if (!(resource.instance != null)) {
                _context.next = 6;
                break;
              }
              throw new Error("Resource has a store.");
            case 6:
              path = name.replace(/^\\/g, "").split("/");
              if (!(path.length > 1)) {
                _context.next = 16;
                break;
              }
              if (!(parent != null)) {
                _context.next = 10;
                break;
              }
              throw new Error("Parent can't be set when using path in instance name");
            case 10:
              _context.next = 12;
              return Warehouse.get(path.slice(0, path.length - 1).join("/"));
            case 12:
              parent = _context.sent;
              if (!(parent == null)) {
                _context.next = 15;
                break;
              }
              throw new Error("Can't find parent");
            case 15:
              store = (_store = store) !== null && _store !== void 0 ? _store : parent.instance.store;
            case 16:
              instanceName = path[path.length - 1];
              resourceReference = new WekRef(resource);
              if (!(store == null)) {
                _context.next = 28;
                break;
              }
              if (!(parent != null)) {
                _context.next = 23;
                break;
              }
              // assign parent as a store
              if (parent instanceof _IStore["default"]) {
                store = parent;
                list = Warehouse.stores.get(store);
                if (list) list.add(resourceReference);
              } else {
                store = parent.instance.store;
                _list = Warehouse.stores.get(store);
                if (_list) _list.add(resourceReference);
              }
              _context.next = 28;
              break;
            case 23:
              if (!(resource instanceof _IStore["default"])) {
                _context.next = 27;
                break;
              }
              store = resource;
              _context.next = 28;
              break;
            case 27:
              throw new Error("Can't find a store for the resource.");
            case 28:
              resource.instance = new _Instance["default"](Warehouse.resourceCounter++, instanceName, resource, store, customTemplate, age);
              if (attributes != null) resource.instance.setAttributes(attributes);
              if (manager != null) resource.instance.managers.add(manager);
              if (store == parent) parent = null;
              _context.prev = 32;
              if (resource instanceof _IStore["default"]) stores.add(resource, []);
              _context.next = 36;
              return store.put(resource);
            case 36:
              if (_context.sent) {
                _context.next = 38;
                break;
              }
              throw new Error("Store failed to put the resource");
            case 38:
              if (!(parent != null)) {
                _context.next = 43;
                break;
              }
              _context.next = 41;
              return parent.instance.store.addChild(parent, resource);
            case 41:
              _context.next = 43;
              return store.addParent(resource, parent);
            case 43:
              Warehouse.resources.add(resource.instance.Id, resourceReference);
              if (!Warehouse.warehouseIsOpen) {
                _context.next = 50;
                break;
              }
              _context.next = 47;
              return resource.trigger(_IResource.ResourceTrigger.Initialize);
            case 47:
              if (!(resource instanceof _IStore["default"])) {
                _context.next = 50;
                break;
              }
              _context.next = 50;
              return resource.trigger(_IResource.ResourceTrigger.Open);
            case 50:
              if (resource instanceof _IStore["default"]) Warehouse._emit("StoreConnected", resource);
              _context.next = 57;
              break;
            case 53:
              _context.prev = 53;
              _context.t0 = _context["catch"](32);
              Warehouse.remove(resource);
              throw _context.t0;
            case 57:
              return _context.abrupt("return", resource);
            case 58:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[32, 53]]);
      }));
      function put(_x, _x2, _x3, _x4) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "_onParentsRemove",
    value: function _onParentsRemove(value) {
      if (value.instance.children.contains(value)) value.instance.children.remove(value);
    }
  }, {
    key: "_onParentsAdd",
    value: function _onParentsAdd(value) {
      if (!value.instance.children.contains(value)) value.instance.children.add(value);
    }
  }, {
    key: "_onChildrenRemove",
    value: function _onChildrenRemove(value) {
      if (value.instance.parents.contains(value)) value.instance.parents.remove(value);
    }
  }, {
    key: "_onChildrenAdd",
    value: function _onChildrenAdd(value) {
      if (!value.instance.parents.contains(value)) value.instance.parents.add(value);
    }
  }, {
    key: "putTemplate",
    value: function putTemplate(template) {
      if (this.templates.get(template.type).containsKey(template.classId)) throw new Error("Template with same class Id already exists.");
      this.templates.get(template.type).add(template.classId, template);
    }
  }, {
    key: "getTemplateByType",
    value: function getTemplateByType(type) {
      var baseType = _ResourceProxy["default"].getBaseType(type);
      if (baseType == _IResource["default"] || baseType == _IRecord["default"] || baseType == _IEnum["default"]) return null;

      // search our records

      var templateType;
      if (baseType.prototype instanceof _IResource["default"]) templateType = _TemplateType["default"].Resource;else if (baseType.prototype instanceof _IRecord["default"]) templateType = _TemplateType["default"].Record;else if (baseType.prototype instanceof _IEnum["default"]) templateType = _TemplateType["default"].Enum;else return null;
      var template = this.templates.item(templateType).first(function (x) {
        return x.definedType == baseType;
      });
      if (template != null) return template;
      template = new _TypeTemplate["default"](baseType, true);
      _TypeTemplate["default"].getDependencies(template);
      return template;
    }
  }, {
    key: "getTemplateByClassId",
    value: function getTemplateByClassId(classId) {
      var templateType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (templateType == null) {
        // look into resources
        var template = this.templates.get(_TemplateType["default"].Resource).get(classId);
        if (template != null) return template;

        // look into records
        template = this.templates.get(_TemplateType["default"].Record).get(classId);
        if (template != null) return template;

        // look into enums
        template = this.templates.get(_TemplateType["default"].Enum).get(classId);
        return template;
      } else return this.templates.get(templateType).get(classId);
    }
  }, {
    key: "getTemplateByClassName",
    value: function getTemplateByClassName(className) {
      var templateType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (templateType == null) {
        // look into resources
        var template = this.templates.get(_TemplateType["default"].Resource).values.find(function (x) {
          return x.className == className;
        });
        if (template != null) return template;

        // look into records
        template = this.templates.get(_TemplateType["default"].Record).values.find(function (x) {
          return x.className == className;
        });
        if (template != null) return template;

        // look into enums
        template = this.templates.get(_TemplateType["default"].Enum).values.find(function (x) {
          return x.className == className;
        });
        return template;
      } else {
        return this.templates.get(templateType).values.find(function (x) {
          return x.className == className;
        });
      }
    }
  }, {
    key: "_qureyIn",
    value: function _qureyIn(path, index, resources) {
      var rt = [];
      if (index == path.length - 1) {
        if (path[index] == "") for (var i = 0; i < resources.length; i++) rt.push(resources.at(i));else for (var _i2 = 0; _i2 < resources.length; _i2++) if (resources.at(_i2).instance.name == path[index]) rt.push(resources.at(_i2));
      } else for (var _i3 = 0; _i3 < resources.length; _i3++) if (resources.at(_i3).instance.name == path[index]) rt = rt.concat(this._qureyIn(path, index + 1, resources.at(_i3).instance.children));
      return rt;
    }
  }, {
    key: "query",
    value: function () {
      var _query = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(path) {
        var p, resource, _iterator, _step, store, res, i, children;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              p = path.replace(/^\\/g, "").split("/");
              _iterator = _createForOfIteratorHelper(Warehouse.stores.keys);
              _context2.prev = 2;
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context2.next = 35;
                break;
              }
              store = _step.value;
              if (!(p[0] == store.instance.name)) {
                _context2.next = 33;
                break;
              }
              if (!(p.length == 1)) {
                _context2.next = 9;
                break;
              }
              return _context2.abrupt("return", new _AsyncReply["default"]([store]));
            case 9:
              _context2.next = 11;
              return store.get(p.slice(1).join("/"));
            case 11:
              res = _context2.sent;
              if (!(res != null)) {
                _context2.next = 14;
                break;
              }
              return _context2.abrupt("return", new _AsyncReply["default"]([res]));
            case 14:
              resource = store;
              i = 1;
            case 16:
              if (!(i < p.length)) {
                _context2.next = 32;
                break;
              }
              _context2.next = 19;
              return resource.instance.children(p[i]);
            case 19:
              children = _context2.sent;
              if (!(children != null && children.length > 0)) {
                _context2.next = 28;
                break;
              }
              if (!(i == p.length - 1)) {
                _context2.next = 25;
                break;
              }
              return _context2.abrupt("return", new _AsyncReply["default"](children));
            case 25:
              resource = children[0];
            case 26:
              _context2.next = 29;
              break;
            case 28:
              return _context2.abrupt("break", 32);
            case 29:
              i++;
              _context2.next = 16;
              break;
            case 32:
              return _context2.abrupt("return", new _AsyncReply["default"](null));
            case 33:
              _context2.next = 4;
              break;
            case 35:
              _context2.next = 40;
              break;
            case 37:
              _context2.prev = 37;
              _context2.t0 = _context2["catch"](2);
              _iterator.e(_context2.t0);
            case 40:
              _context2.prev = 40;
              _iterator.f();
              return _context2.finish(40);
            case 43:
              return _context2.abrupt("return", new _AsyncReply["default"](null));
            case 44:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 37, 40, 43]]);
      }));
      function query(_x5) {
        return _query.apply(this, arguments);
      }
      return query;
    }()
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;
      if (this.warehouseIsOpen) return new _AsyncReply["default"](false);
      var initBag = new _AsyncBag["default"]();
      var rt = new _AsyncReply["default"]();
      var self = this;
      for (var i = 0; i < this.resources.length; i++) {
        var r = this.resources.at(i);
        initBag.add(r.trigger(_IResource.ResourceTrigger.Initialize));
        //if (!rt)
        //  console.log(`Resource failed at Initialize ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
      }
      initBag.seal();
      initBag.then(function (ar) {
        for (var _i4 = 0; _i4 < ar.length; _i4++) if (!ar[_i4]) console.log("Resource failed at Initialize ".concat(self.resources.at(_i4).instance.name, " [").concat(self.resources.at(_i4).instance.template.className, "]"));
        var sysBag = new _AsyncBag["default"]();
        for (var _i5 = 0; _i5 < _this2.resources.length; _i5++) {
          var r = _this2.resources.at(_i5);
          sysBag.add(r.trigger(_IResource.ResourceTrigger.SystemInitialized));
        }
        sysBag.seal();
        sysBag.then(function (ar2) {
          for (var i = 0; i < ar2.length; i++) if (!ar2[i]) console.log("Resource failed at Initialize ".concat(self.resources.at(i).instance.name, " [").concat(self.resources.at(i).instance.template.className, "]"));
          self.warehouseIsOpen = true;
          rt.trigger(true);
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
      }).error(function (ex) {
        return rt.triggerError(ex);
      });

      // for (var i = 0; i < this.resources.length; i++)
      // {
      //     var r = this.resources.at(i);
      //     var rt = await r.trigger(ResourceTrigger.SystemInitialized);
      //     if (!rt)
      //     console.log(`Resource failed at SystemInitialized ${r.Instance.Name} [${r.Instance.Template.ClassName}]`);
      // }

      return rt;
    }
  }, {
    key: "defineType",
    value: function defineType(type) {
      var template = this.getTemplateByType(type);
      if (template == null) throw new Error("Unsupported type.");
      this.putTemplate(template);
    }
  }]);
  return WH;
}(_IEventHandler2["default"]);
var Warehouse = new WH();
Warehouse.protocols.add("iip", function (name, attributes) {
  return Warehouse["new"](_DistributedConnection["default"], name, null, null, null, attributes);
});
Warehouse.protocols.add("mem", function (name, attributes) {
  return Warehouse["new"](_MemoryStore["default"], name, null, null, null, attributes);
});
Warehouse.protocols.add("db", function (name, attributes) {
  return Warehouse["new"](_IndexedDBStore["default"], name, null, null, null, attributes);
});
var _default = exports["default"] = Warehouse;

},{"../Core/AsyncBag.js":39,"../Core/AsyncReply.js":42,"../Core/IEventHandler.js":46,"../Data/AutoList.js":48,"../Data/IEnum.js":56,"../Data/IRecord.js":57,"../Data/KeyList.js":58,"../Net/IIP/DistributedConnection.js":77,"../Net/IIP/DistributedResource.js":79,"../Proxy/ResourceProxy.js":111,"../Resource/Instance.js":117,"../Resource/Template/TypeTemplate.js":128,"../Stores/IndexedDBStore.js":144,"../Stores/MemoryStore.js":145,"./IResource.js":115,"./IStore.js":116,"./Template/TemplateType.js":127,"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/typeof":33,"@babel/runtime/regenerator":36}],130:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 16/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var Authentication = exports["default"] = /*#__PURE__*/function () {
  function Authentication(type) {
    (0, _classCallCheck2["default"])(this, Authentication);
    this.method = 0;
    this.tokenIndex = 0;
    this.type = type;
    this.state = 0;
    this.domain = null;
    this.username = null;
  }
  (0, _createClass2["default"])(Authentication, [{
    key: "fullName",
    get: function get() {
      return this.domain + "@" + this.username;
    }
  }]);
  return Authentication;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// AuthenticationMethod
var _default = exports["default"] = {
  None: 0,
  Credentials: 1,
  Token: 2,
  Certificate: 3
};

},{}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  //const AuthenticationType = {
  Host: 0,
  CoHost: 1,
  Client: 2,
  Alien: 3
};

},{}],133:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _Authentication2 = _interopRequireDefault(require("./Authentication.js"));
var _AuthenticationType = _interopRequireDefault(require("./AuthenticationType.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ClientAuthentication = exports["default"] = /*#__PURE__*/function (_Authentication) {
  (0, _inherits2["default"])(ClientAuthentication, _Authentication);
  function ClientAuthentication() {
    (0, _classCallCheck2["default"])(this, ClientAuthentication);
    return _callSuper(this, ClientAuthentication, [_AuthenticationType["default"].Client]);
  }
  return (0, _createClass2["default"])(ClientAuthentication);
}(_Authentication2["default"]);

},{"./Authentication.js":130,"./AuthenticationType.js":132,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],134:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _Authentication2 = _interopRequireDefault(require("./Authentication.js"));
var _AuthenticationType = _interopRequireDefault(require("./AuthenticationType.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var HostAuthentication = exports["default"] = /*#__PURE__*/function (_Authentication) {
  (0, _inherits2["default"])(HostAuthentication, _Authentication);
  function HostAuthentication() {
    (0, _classCallCheck2["default"])(this, HostAuthentication);
    return _callSuper(this, HostAuthentication, [_AuthenticationType["default"].Host]);
  }
  return (0, _createClass2["default"])(HostAuthentication);
}(_Authentication2["default"]);

},{"./Authentication.js":130,"./AuthenticationType.js":132,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],135:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 16/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _AuthenticationType = _interopRequireDefault(require("./AuthenticationType.js"));
var _AuthenticationMethod = _interopRequireDefault(require("./AuthenticationMethod.js"));
var _KeyList = _interopRequireDefault(require("../../Data/KeyList.js"));
var _ExtendedTypes = require("../../Data/ExtendedTypes.js");
var _TypedMap = _interopRequireDefault(require("../../Data/TypedMap.js"));
var Session = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function Session() {
  (0, _classCallCheck2["default"])(this, Session);
  (0, _defineProperty2["default"])(this, "id", void 0);
  (0, _defineProperty2["default"])(this, "creation", Date());
  (0, _defineProperty2["default"])(this, "modification", Date());
  (0, _defineProperty2["default"])(this, "variables", new _KeyList["default"]());
  (0, _defineProperty2["default"])(this, "localHeaders", new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))());
  (0, _defineProperty2["default"])(this, "remoteHeaders", new (_TypedMap["default"].of(_ExtendedTypes.UInt8, Object))());
  (0, _defineProperty2["default"])(this, "localMethod", _AuthenticationMethod["default"].None);
  (0, _defineProperty2["default"])(this, "remoteMethod", _AuthenticationMethod["default"].None);
  (0, _defineProperty2["default"])(this, "authenticationType", _AuthenticationType["default"].Host);
  (0, _defineProperty2["default"])(this, "authorizedAccount", void 0);
});

},{"../../Data/ExtendedTypes.js":55,"../../Data/KeyList.js":58,"../../Data/TypedMap.js":72,"./AuthenticationMethod.js":131,"./AuthenticationType.js":132,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],136:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DC = require("../../Data/DC.js");
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/** 
 * Created by Ahmed Zamil on 25/12/2017.
 * Ref: https://en.wikipedia.org/wiki/SHA-2
 */
var SHA256 = exports["default"] = /*#__PURE__*/function () {
  function SHA256() {
    (0, _classCallCheck2["default"])(this, SHA256);
  }
  (0, _createClass2["default"])(SHA256, null, [{
    key: "RROT",
    value: function RROT(n, d) {
      return n >>> d | n << 32 - d;
    }
  }, {
    key: "compute",
    value: function compute(msg) {
      /*
      Note 1: All variables are 32 bit unsigned integers and addition is calculated modulo 2^32
      Note 2: For each round, there is one round constant k[i] and one entry in the message schedule array w[i], 0 ≤ i ≤ 63
      Note 3: The compression function uses 8 working variables, a through h
      Note 4: Big-endian convention is used when expressing the constants in this pseudocode,
          and when parsing message block data from bytes to words, for example,
          the first word of the input message "abc" after padding is 0x61626380
      */

      // Initialize hash values:
      // (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):

      var hash = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);

      // Initialize array of round constants:
      // (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311):
      var k = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);

      // Pre-processing:
      // begin with the original message of length L bits
      var L = msg.length * 8;

      // append a single '1' bit
      // append K '0' bits, where K is the minimum number >= 0 such that L + 1 + K + 64 is a multiple of 512

      var K = 512 - (L + 1 + 64) % 512;
      if (K == 512) K = 0;
      var paddingLength = (K + 1) / 8;
      var paddingBytes = new Uint8Array(paddingLength);
      paddingBytes[0] = 0x80;
      var data = (0, _DC.BL)().addUint8Array(msg).addUint8Array(paddingBytes).addUint64(L, _DC.Endian.Big).toDC();

      // append L as a 64-bit big-endian integer, making the total post-processed length a multiple of 512 bits

      //  Process the message in successive 512-bit chunks:
      // break message into 512-bit chunks
      // for each chunk

      for (var chunk = 0; chunk < data.length; chunk += 64) {
        // create a 64-entry message schedule array w[0..63] of 32-bit words
        // (The initial values in w[0..63] don't matter, so many implementations zero them here)
        // copy chunk into first 16 words w[0..15] of the message schedule array

        var w = new Uint32Array(64);
        for (var i = 0; i < 16; i++) w[i] = data.getUint32(chunk + i * 4, _DC.Endian.Big);

        //for(var i = 16; i < 64; i++)
        //  w[i] = 0;

        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
        //    for i from 16 to 63
        //        s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
        //        s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
        //        w[i] := w[i-16] + s0 + w[i-7] + s1

        for (var _i = 16; _i < 64; _i++) {
          var s0 = SHA256.RROT(w[_i - 15], 7) ^ SHA256.RROT(w[_i - 15], 18) ^ w[_i - 15] >>> 3;
          var s1 = SHA256.RROT(w[_i - 2], 17) ^ SHA256.RROT(w[_i - 2], 19) ^ w[_i - 2] >>> 10;
          w[_i] = w[_i - 16] + s0 + w[_i - 7] + s1;
        }

        // Initialize working variables to current hash value:
        var a = hash[0];
        var b = hash[1];
        var c = hash[2];
        var d = hash[3];
        var e = hash[4];
        var f = hash[5];
        var g = hash[6];
        var h = hash[7];

        // Compression function main loop:
        for (var _i2 = 0; _i2 < 64; _i2++) {
          var S1 = SHA256.RROT(e, 6) ^ SHA256.RROT(e, 11) ^ SHA256.RROT(e, 25);
          var ch = e & f ^ ~e & g;
          var temp1 = h + S1 + ch + k[_i2] + w[_i2];
          var S0 = SHA256.RROT(a, 2) ^ SHA256.RROT(a, 13) ^ SHA256.RROT(a, 22);
          var maj = a & b ^ a & c ^ b & c;
          var temp2 = S0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + temp1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = temp1 + temp2 >>> 0;
        }

        // Add the compressed chunk to the current hash value:

        hash[0] = hash[0] + a >>> 0;
        hash[1] = hash[1] + b >>> 0;
        hash[2] = hash[2] + c >>> 0;
        hash[3] = hash[3] + d >>> 0;
        hash[4] = hash[4] + e >>> 0;
        hash[5] = hash[5] + f >>> 0;
        hash[6] = hash[6] + g >>> 0;
        hash[7] = hash[7] + h >>> 0;
      }

      // Produce the final hash value (big-endian):
      //digest := hash := h0 append h1 append h2 append h3 append h4 append h5 append h6 append h7

      var results = (0, _DC.BL)();
      for (var _i3 = 0; _i3 < 8; _i3++) results.addUint32(hash[_i3], _DC.Endian.Big);
      return results.toDC();
    }
  }]);
  return SHA256;
}();

},{"../../Data/DC.js":52,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],137:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _IIPAuthPacketIAuthHeader = _interopRequireDefault(require("../../Net/Packets/IIPAuthPacketIAuthHeader.js"));
//AuthorizationResults
var AuthorizationRequest = exports["default"] = /*#__PURE__*/function () {
  function AuthorizationRequest(headers) {
    (0, _classCallCheck2["default"])(this, AuthorizationRequest);
    (0, _defineProperty2["default"])(this, "reference", void 0);
    (0, _defineProperty2["default"])(this, "destination", void 0);
    (0, _defineProperty2["default"])(this, "clue", void 0);
    (0, _defineProperty2["default"])(this, "requiredFormat", void 0);
    (0, _defineProperty2["default"])(this, "contentFormat", void 0);
    (0, _defineProperty2["default"])(this, "content", void 0);
    (0, _defineProperty2["default"])(this, "trials", void 0);
    (0, _defineProperty2["default"])(this, "issue", new Date());
    (0, _defineProperty2["default"])(this, "expire", void 0);
    this.reference = headers.get(_IIPAuthPacketIAuthHeader["default"].Reference);
    this.destination = headers.get(_IIPAuthPacketIAuthHeader["default"].Destination);
    this.clue = headers.get(_IIPAuthPacketIAuthHeader["default"].Clue);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].RequiredFormat)) this.requiredFormat = headers.get(_IIPAuthPacketIAuthHeader["default"].RequiredFormat);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].ContentFormat)) this.contentFormat = headers.get(_IIPAuthPacketIAuthHeader["default"].ContentFormat);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].Content)) this.content = headers.get(_IIPAuthPacketIAuthHeader["default"].Content);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].Trials)) this.trials = headers.get(_IIPAuthPacketIAuthHeader["default"].Trials);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].Issue)) this.issue = headers.get(_IIPAuthPacketIAuthHeader["default"].Issue);
    if (headers.has(_IIPAuthPacketIAuthHeader["default"].Expire)) this.expire = headers.get(_IIPAuthPacketIAuthHeader["default"].Expire);
  }
  (0, _createClass2["default"])(AuthorizationRequest, [{
    key: "expired",
    get: function get() {
      return new Date() > this.expire;
    }
  }, {
    key: "timeout",
    get: function get() {
      if (this.expire != null) return (this.expire - new Date()) / 1000;else return 30;
    }
  }]);
  return AuthorizationRequest;
}();

},{"../../Net/Packets/IIPAuthPacketIAuthHeader.js":99,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],138:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _AuthorizationResultsResponse = _interopRequireDefault(require("./AuthorizationResultsResponse.js"));
//AuthorizationResults
var AuthorizationResults = exports["default"] = /*#__PURE__*/function () {
  function AuthorizationResults() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _AuthorizationResultsResponse["default"].Failed;
    (0, _classCallCheck2["default"])(this, AuthorizationResults);
    (0, _defineProperty2["default"])(this, "response", _AuthorizationResultsResponse["default"].Failed);
    (0, _defineProperty2["default"])(this, "reference", void 0);
    (0, _defineProperty2["default"])(this, "destination", void 0);
    (0, _defineProperty2["default"])(this, "clue", void 0);
    (0, _defineProperty2["default"])(this, "requiredFormat", void 0);
    (0, _defineProperty2["default"])(this, "contentFormat", void 0);
    (0, _defineProperty2["default"])(this, "content", void 0);
    (0, _defineProperty2["default"])(this, "trials", void 0);
    (0, _defineProperty2["default"])(this, "issue", new Date());
    (0, _defineProperty2["default"])(this, "expire", void 0);
    this.response = response;
  }
  (0, _createClass2["default"])(AuthorizationResults, [{
    key: "expired",
    get: function get() {
      return new Date() > this.expire;
    }
  }, {
    key: "timeout",
    get: function get() {
      if (this.expire != null) return (this.expire - new Date()) / 1000;else return 30;
    }
  }]);
  return AuthorizationResults;
}();

},{"./AuthorizationResultsResponse.js":139,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/defineProperty":14,"@babel/runtime/helpers/interopRequireDefault":18}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// AuthorizationResultsResponse
var _default = exports["default"] = {
  Success: 0,
  Failed: 1,
  Expired: 2,
  ServiceUnavailable: 3,
  IAuthPlain: 4,
  IAuthHashed: 5,
  IAuthEncrypted: 6
};

},{}],140:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));
var _IResource2 = _interopRequireDefault(require("../../Resource/IResource.js"));
var _AuthorizationResults = _interopRequireDefault(require("../../Security/Membership/AuthorizationResults.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var IMembership = exports["default"] = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(IMembership, _IResource);
  function IMembership() {
    (0, _classCallCheck2["default"])(this, IMembership);
    return _callSuper(this, IMembership, arguments);
  }
  (0, _createClass2["default"])(IMembership, [{
    key: "userExists",
    value: function userExists(username, domain) {
      return new _AsyncReply["default"](false);
    }
  }, {
    key: "tokenExists",
    value: function tokenExists(tokenIndex, domain) {
      return new _AsyncReply["default"](false);
    }
  }, {
    key: "getPassword",
    value: function getPassword(username, domain) {
      return new _AsyncReply["default"](null);
    }
  }, {
    key: "getToken",
    value: function getToken(tokenIndex, domain) {
      return new _AsyncReply["default"](null);
    }
  }, {
    key: "authorize",
    value: function authorize(session) {
      return new _AsyncReply["default"](new _AuthorizationResults["default"]());
    }
  }, {
    key: "authorizePlain",
    value: function authorizePlain(session, reference, value) {
      return new _AsyncReply["default"](new _AuthorizationResults["default"]());
    }
  }, {
    key: "authorizeHashed",
    value: function authorizeHashed(session, reference, algorithm, value) {
      return new _AsyncReply["default"](new _AuthorizationResults["default"]());
    }
  }, {
    key: "authorizeEncrypted",
    value: function authorizeEncrypted(session, reference, algorithm, value) {
      return new _AsyncReply["default"](new _AuthorizationResults["default"]());
    }
  }, {
    key: "login",
    value: function login(session) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "logout",
    value: function logout(session) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "guestsAllowed",
    get: function get() {
      return false;
    }
  }]);
  return IMembership;
}(_IResource2["default"]);

},{"../../Core/AsyncReply.js":42,"../../Resource/IResource.js":115,"../../Security/Membership/AuthorizationResults.js":138,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],141:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 9/2/2017.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] =
// ActionType =
{
  Attach: 0,
  Delete: 1,
  Execute: 2,
  GetProperty: 3,
  SetProperty: 4,
  CreateResource: 5,
  UpdateAttributes: 6,
  InquireAttributes: 7,
  AddParent: 8,
  RemoveParent: 9,
  AddChild: 10,
  RemoveChild: 11,
  Rename: 12,
  ReceiveEvent: 13,
  ViewTemplate: 14
};

},{}],142:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 16/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var IPermissionsManager = exports["default"] = /*#__PURE__*/function () {
  function IPermissionsManager() {
    (0, _classCallCheck2["default"])(this, IPermissionsManager);
  }
  (0, _createClass2["default"])(IPermissionsManager, [{
    key: "applicable",
    value:
    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="resource">IResource.</param>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Allowed or denined.</returns>
    function applicable(resource, session, action, member, inquirer) {}
  }, {
    key: "initialize",
    value: function initialize(settings, resource) {}
  }, {
    key: "settings",
    get: function get() {}
  }]);
  return IPermissionsManager;
}();

},{"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/interopRequireDefault":18}],143:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/** 
 * Created by Ahmed Zamil on 9/2/2020.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] =
//Ruling = 
{
  Denied: 0,
  Allowed: 1,
  DontCare: 2
};

},{}],144:[function(require,module,exports){
/*
* Copyright (c) 2017-2021 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 2/18/2021.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IResource = require("../Resource/IResource.js");
var _IStore2 = _interopRequireDefault(require("../Resource/IStore.js"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
var _Warehouse = _interopRequireDefault(require("../Resource/Warehouse.js"));
var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));
var _ErrorType = _interopRequireDefault(require("../Core/ErrorType.js"));
var _ExceptionCode = _interopRequireDefault(require("../Core/ExceptionCode.js"));
var _RepresentationType = require("../Data/RepresentationType.js");
var _TypedMap = _interopRequireDefault(require("../Data/TypedMap.js"));
var _ResourceProxy = _interopRequireDefault(require("../Proxy/ResourceProxy.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var IndexedDBStore = exports["default"] = /*#__PURE__*/function (_IStore) {
  (0, _inherits2["default"])(IndexedDBStore, _IStore);
  function IndexedDBStore() {
    var _this;
    (0, _classCallCheck2["default"])(this, IndexedDBStore);
    _this = _callSuper(this, IndexedDBStore);
    _this.resources = new Map();
    _this.classes = new Map();
    return _this;
  }
  (0, _createClass2["default"])(IndexedDBStore, [{
    key: "compose",
    value: function compose(value) {
      var type = _RepresentationType.RepresentationType.fromType(value);
      switch (type.identifier) {
        case _RepresentationType.RepresentationTypeIdentifier.Void:
          // nothing to do;
          return null;
        case _RepresentationType.RepresentationTypeIdentifier.String:
          return value;
        case _RepresentationType.RepresentationTypeIdentifier.Resource:
        case _RepresentationType.RepresentationTypeIdentifier.DistributedResource:
          return {
            "type": 0,
            "link": value.instance.link
          };
        case _RepresentationType.RepresentationTypeIdentifier.Map:
          return this.composeMap(value);
        case _RepresentationType.RepresentationTypeIdentifier.List:
          return this.composeList(value);

        //  case RepresentationTypeIdentifier.List:
        //      return this.composeResourceArray(value);

        //case RepresentationTypeIdentifier.Typed:
        //    return this.composeStructureArray(value);

        default:
          return value;
      }
    }
  }, {
    key: "parse",
    value: function parse(value) {
      if (value instanceof Array) {
        var _bag = new _AsyncBag["default"]();
        for (var i = 0; i < value.length; i++) _bag.add(this.parse(value[i]));
        _bag.seal();
        return _bag;
      } else if ((value === null || value === void 0 ? void 0 : value.type) !== undefined) {
        if (value.type == 0) {
          return _Warehouse["default"].get(value.link);
        } // structure
        else if (value.type == 1) {
          var bag = new _AsyncBag["default"]();
          var rt = new _AsyncReply["default"]();
          var s = new (_TypedMap["default"].of(String, Object))();
          for (var _i = 0; _i < value.values.length; _i++) bag.add(this.parse(value.values[_i].value));
          bag.seal();
          bag.then(function (x) {
            for (var _i2 = 0; _i2 < x.length; _i2++) s.set(value.values[_i2].name, x[_i2]);
            rt.trigger(s);
          });
          return rt;
        } else return new _AsyncReply["default"](null);
      } else {
        return new _AsyncReply["default"](value);
      }
    }
  }, {
    key: "addClass",
    value: function addClass(type) {
      var template = type.template;
      var className = template.namespace + "." + type.prototype.constructor.name;
      this.classes.set(className, type);
    }
  }, {
    key: "fetch",
    value: function fetch(id) {
      var self = this;
      if (this.resources.has(id)) return new _AsyncReply["default"](this.resources.get(id));
      var rt = new _AsyncReply["default"]();
      var transaction = this.db.transaction(["resources"]);
      var objectStore = transaction.objectStore("resources");
      var request = objectStore.get(id);
      request.onerror = function (event) {
        rt.triggerError(event);
      };
      request.onsuccess = function (event) {
        var doc = request.result;
        if (doc == null) {
          //rt.triggerError(ErrorType.Management, ExceptionCode.ResourceNotFound);
          rt.trigger(null);
          return;
        }
        if (!self.classes.has(doc.className)) {
          rt.triggerError(_ErrorType["default"].Management, _ExceptionCode["default"].ClassNotFound);
          return;
        }

        //let r = await Warehouse.new(, doc.name, this, null, null, this);
        var type = self.classes.get(doc.className);
        var proxyType = _ResourceProxy["default"].getProxy(type);
        var resource = new proxyType();
        self.resources.set(doc.id, resource);
        resource._id = doc.id;
        _Warehouse["default"].put(doc.name, resource, self, null, null, null, null).then(function (ok) {
          self.parse(doc.attributes).then(function (attributes) {
            resource.instance.setAttributes(attributes);

            // Apply store managers
            for (var i = 0; i < self.instance.managers.length; i++) resource.instance.managers.add(self.instance.managers[i]);

            // Load values

            var bag = new _AsyncBag["default"]();
            for (var _i3 = 0; _i3 < doc.values.length; _i3++) {
              var v = doc.values[_i3];
              bag.add(self.parse(v.value));
              //var x = await this.parse(v.value);
              resource.instance.loadProperty(v.name, v.age, v.modification, x);
            }
            bag.seal();
            bag.then(function (ar) {
              for (var i = 0; i < ar.length; i++) {
                var _v = doc.values[i];
                resource.instance.loadProperty(_v.name, _v.age, _v.modification, ar[i]);
              }
              rt.trigger(resource);
            }).error(function (ex) {
              return rt.triggerError(ex);
            });
          }).error(function (ex) {
            return rt.triggerError(ex);
          });
        }).error(function (ex) {
          return rt.triggerError(ex);
        });
      };
      return rt;
    }
  }, {
    key: "put",
    value: function put(resource) {
      var rt = new _AsyncReply["default"]();
      var transaction = this.db.transaction(["resources"], "readwrite");
      var objectStore = transaction.objectStore("resources");
      var attrs = resource.instance.getAttributes();
      var record = {
        className: resource.instance.template.className,
        name: resource.instance.name,
        attributes: this.composeStructure(attrs)
      };
      if (resource._id != null) record.id = resource._id;

      // copy resource data
      var props = resource.instance.template.properties;
      var snap = {};
      for (var i = 0; i < props.length; i++) {
        var pt = props[i];
        snap[pt.name] = {
          "age": resource.instance.getAge(pt.index),
          "modification": resource.instance.getModificationDate(pt.index),
          "value": this.compose(resource[pt.name])
        };
      }
      record.values = snap;
      var request = objectStore.put(record);
      request.onerror = function (event) {
        rt.trigger(false);
      };
      request.onsuccess = function (event) {
        resource["_id"] = request.result;
        rt.trigger(true);
      };
      return rt;
    }

    //  retrive(id)
    //  {
    //     let rt = new AsyncReply();

    //     var transaction = this.db.transaction(["resources"]);
    //     var objectStore = transaction.objectStore("resources");
    //     var request = objectStore.get(id);

    //     request.onerror = function(event) {
    //         rt.trigger(null);
    //     };

    //     request.onsuccess = function(event) {
    //         rt.trigger(request.result);
    //     };

    //     return rt;
    //  }
  }, {
    key: "get",
    value: function get(path) {
      var p = path.split('/');
      if (p.length == 2) if (p[0] == "id") {
        // load from Id
        return this.fetch(parseInt(p[1]));
      }
      return new _AsyncReply["default"](null);
    }
  }, {
    key: "link",
    value: function link(resource) {
      if (resource.instance.store == this) return this.instance.name + "/" + resource._id;
    }
  }, {
    key: "trigger",
    value: function trigger(_trigger) {
      if (_trigger == _IResource.ResourceTrigger.Initialize) {
        var _this$instance$attrib;
        var dbName = (_this$instance$attrib = this.instance.attributes.item("db")) !== null && _this$instance$attrib !== void 0 ? _this$instance$attrib : "esiur";
        var request = indexedDB.open(dbName, 3);
        var self = this;
        var rt = new _AsyncReply["default"]();
        request.onupgradeneeded = function (event) {
          self._store = request.result.createObjectStore("resources", {
            keyPath: "id",
            autoIncrement: true
          });
          console.log(self._store);
        };
        request.onerror = function (event) {
          console.error("Database error: " + event.target.errorCode);
          rt.trigger(false);
        };
        request.onsuccess = function (event) {
          console.log(event);
          self.db = request.result;
          rt.trigger(true);
        };
        return rt;
      }
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "record",
    value: function record(resource, propertyName, value, age, dateTime) {}
  }, {
    key: "getRecord",
    value: function getRecord(resource, fromDate, toDate) {}
  }, {
    key: "composeMap",
    value: function composeMap(value) {
      var values = {};
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
            k = _step$value[0],
            v = _step$value[1];
          values[[k]] = v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        type: 1,
        values: values
      };
    }
  }, {
    key: "composeList",
    value: function composeList(array) {
      var rt = [];
      for (var i = 0; i < array.length; i++) rt.push(this.compose(array[i]));
      return rt;
    }

    //  composeStructureArray(structures)
    //  {
    //     var rt = [];

    //     if (structures == null || structures.length == 0)
    //          return rt;

    //     for(var i = 0; i < structures.length; i++)
    //         rt.push(this.composeStructure(structures[s]));

    //      return rt;
    //  }

    //  composeResourceArray(array)
    //  {
    //      var rt = [];
    //      for (var i = 0; i < array.length; i++)
    //          rt.push({ "type": 0 , "link": array[i].instance.link });
    //      return rt;
    //  }
  }]);
  return IndexedDBStore;
}(_IStore2["default"]);

},{"../Core/AsyncBag.js":39,"../Core/AsyncReply.js":42,"../Core/ErrorType.js":43,"../Core/ExceptionCode.js":44,"../Data/RepresentationType.js":66,"../Data/TypedMap.js":72,"../Proxy/ResourceProxy.js":111,"../Resource/IResource.js":115,"../Resource/IStore.js":116,"../Resource/Warehouse.js":129,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/slicedToArray":28}],145:[function(require,module,exports){
/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 12/11/2017.
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _IStore2 = _interopRequireDefault(require("../Resource/IStore.js"));
var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var MemoryStore = exports["default"] = /*#__PURE__*/function (_IStore) {
  (0, _inherits2["default"])(MemoryStore, _IStore);
  function MemoryStore() {
    var _this;
    (0, _classCallCheck2["default"])(this, MemoryStore);
    _this = _callSuper(this, MemoryStore);
    _this.resources = new Map();
    return _this;
  }
  (0, _createClass2["default"])(MemoryStore, [{
    key: "put",
    value: function put(resource) {
      this.resources.set(resource.instance.id, resource);
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "retrive",
    value: function retrive(id) {
      if (this.resources[resource.instance.id]) return new _AsyncReply["default"](this.resources[resource.instance.id]);else return new _AsyncReply["default"](null);
    }
  }, {
    key: "get",
    value: function get(path) {
      if (path.startsWith("$")) {
        var id = parseInt(path.substring(1));
        return new _AsyncReply["default"](this.resources.get(id));
      } else {
        var _iterator = _createForOfIteratorHelper(this.resources.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var r = _step.value;
            if (r.instance.name == path) return new _AsyncReply["default"](r);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return new _AsyncReply["default"](null);
    }
  }, {
    key: "link",
    value: function link(resource) {
      if (resource.instance.store == this) return this.instance.name + "/$" + resource.instance.id;
    }
  }, {
    key: "trigger",
    value: function trigger(_trigger) {
      return new _AsyncReply["default"](true);
    }
  }, {
    key: "record",
    value: function record(resource, propertyName, value, age, dateTime) {}
  }, {
    key: "getRecord",
    value: function getRecord(resource, fromDate, toDate) {}
  }]);
  return MemoryStore;
}(_IStore2["default"]);

},{"../Core/AsyncReply.js":42,"../Resource/IStore.js":116,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":13,"@babel/runtime/helpers/getPrototypeOf":16,"@babel/runtime/helpers/inherits":17,"@babel/runtime/helpers/interopRequireDefault":18,"@babel/runtime/helpers/possibleConstructorReturn":25}],146:[function(require,module,exports){
(function (global){(function (){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _TypedMap = _interopRequireDefault(require("./Data/TypedMap.js"));
var _TypedList = _interopRequireDefault(require("./Data/TypedList.js"));
var _DistributedResource = _interopRequireDefault(require("./Net/IIP/DistributedResource.js"));
var _MemoryStore = _interopRequireDefault(require("./Stores/MemoryStore.js"));
var _IndexedDBStore = _interopRequireDefault(require("./Stores/IndexedDBStore.js"));
var _IResource = _interopRequireDefault(require("./Resource/IResource.js"));
var _ResourceProxy = _interopRequireDefault(require("./Proxy/ResourceProxy.js"));
var _TemplateGenerator = _interopRequireDefault(require("./Proxy/TemplateGenerator.js"));
var _DistributedConnection = _interopRequireDefault(require("./Net/IIP/DistributedConnection.js"));
var _IIPAuthPacket = _interopRequireDefault(require("./Net/Packets/IIPAuthPacket.js"));
var _IIPAuthPacketCommand = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketCommand.js"));
var _IIPAuthPacketAction = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketAction.js"));
var _IIPAuthPacketAcknowledge = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketAcknowledge.js"));
var _IIPAuthPacketInitialize = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketInitialize.js"));
var _IIPAuthPacketEvent = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketEvent.js"));
var _IIPAuthPacketHashAlgorithm = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketHashAlgorithm.js"));
var _IIPAuthPacketHeader = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketHeader.js"));
var _IIPAuthPacketIAuthDestination = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketIAuthDestination.js"));
var _IIPAuthPacketIAuthFormat = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketIAuthFormat.js"));
var _IIPAuthPacketIAuthHeader = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketIAuthHeader.js"));
var _IIPAuthPacketPublicKeyAlgorithm = _interopRequireDefault(require("./Net/Packets/IIPAuthPacketPublicKeyAlgorithm.js"));
var _IIPPacket = _interopRequireDefault(require("./Net/Packets/IIPPacket.js"));
var _IIPPacketCommand = _interopRequireDefault(require("./Net/Packets/IIPPacketCommand.js"));
var _IIPPacketAction = _interopRequireDefault(require("./Net/Packets/IIPPacketAction.js"));
var _IIPPacketEvent = _interopRequireDefault(require("./Net/Packets/IIPPacketEvent.js"));
var _IIPPacketReport = _interopRequireDefault(require("./Net/Packets/IIPPacketReport.js"));
var _ISocket = _interopRequireDefault(require("./Net/Sockets/ISocket.js"));
var _SocketState = _interopRequireDefault(require("./Net/Sockets/SocketState.js"));
var _WSocket = _interopRequireDefault(require("./Net/Sockets/WSocket.js"));
var _AsyncReply = _interopRequireDefault(require("./Core/AsyncReply.js"));
var _AsyncException = _interopRequireDefault(require("./Core/AsyncException.js"));
var _AsyncQueue = _interopRequireDefault(require("./Core/AsyncQueue.js"));
var _ErrorType = _interopRequireDefault(require("./Core/ErrorType.js"));
var _ExceptionCode = _interopRequireDefault(require("./Core/ExceptionCode.js"));
var _IDestructible = _interopRequireDefault(require("./Core/IDestructible.js"));
var _IEventHandler = _interopRequireDefault(require("./Core/IEventHandler.js"));
var _ProgressType = _interopRequireDefault(require("./Core/ProgressType.js"));
var _AutoList = _interopRequireDefault(require("./Data/AutoList.js"));
var _AutoMap = _interopRequireDefault(require("./Data/AutoMap.js"));
var _BinaryList = _interopRequireDefault(require("./Data/BinaryList.js"));
var _Codec = _interopRequireDefault(require("./Data/Codec.js"));
var _DC = _interopRequireDefault(require("./Data/DC.js"));
var _UUID = _interopRequireDefault(require("./Data/UUID.js"));
var _IRecord = _interopRequireDefault(require("./Data/IRecord.js"));
var _KeyList = _interopRequireDefault(require("./Data/KeyList.js"));
var _NotModified = _interopRequireDefault(require("./Data/NotModified.js"));
var _PropertyValue = _interopRequireDefault(require("./Data/PropertyValue.js"));
var _Record = _interopRequireDefault(require("./Data/Record.js"));
var _ResourceArrayType = _interopRequireDefault(require("./Data/ResourceArrayType.js"));
var _ResourceArray = _interopRequireDefault(require("./Data/ResourceArray.js"));
var _INetworkReceiver = _interopRequireDefault(require("./Net/INetworkReceiver.js"));
var _NetworkBuffer = _interopRequireDefault(require("./Net/NetworkBuffer.js"));
var _NetworkConnections = _interopRequireDefault(require("./Net/NetworkConnections.js"));
var _NetworkServer = _interopRequireDefault(require("./Net/NetworkServer.js"));
var _NetworkSession = _interopRequireDefault(require("./Net/NetworkSession.js"));
var _SendList = _interopRequireDefault(require("./Net/SendList.js"));
var _DistributedPropertyContext = _interopRequireDefault(require("./Net/IIP/DistributedPropertyContext.js"));
var _DistributedResourceQueueItem = _interopRequireDefault(require("./Net/IIP/DistributedResourceQueueItem.js"));
var _DistributedResourceQueueItemType = _interopRequireDefault(require("./Net/IIP/DistributedResourceQueueItemType.js"));
var _DistributedServer = _interopRequireDefault(require("./Net/IIP/DistributedServer.js"));
var _EntryPoint = _interopRequireDefault(require("./Net/IIP/EntryPoint.js"));
var _CustomResourceEvent = _interopRequireDefault(require("./Resource/CustomResourceEvent.js"));
var _Instance = _interopRequireDefault(require("./Resource/Instance.js"));
var _IStore = _interopRequireDefault(require("./Resource/IStore.js"));
var _Warehouse = _interopRequireDefault(require("./Resource/Warehouse.js"));
var _ArgumentTemplate = _interopRequireDefault(require("./Resource/Template/ArgumentTemplate.js"));
var _EventTemplate = _interopRequireDefault(require("./Resource/Template/EventTemplate.js"));
var _FunctionTemplate = _interopRequireDefault(require("./Resource/Template/FunctionTemplate.js"));
var _MemberTemplate = _interopRequireDefault(require("./Resource/Template/MemberTemplate.js"));
var _MemberType = _interopRequireDefault(require("./Resource/Template/MemberType.js"));
var _PropertyTemplate = _interopRequireDefault(require("./Resource/Template/PropertyTemplate.js"));
var _TemplateType = _interopRequireDefault(require("./Resource/Template/TemplateType.js"));
var _TypeTemplate = _interopRequireDefault(require("./Resource/Template/TypeTemplate.js"));
var _RepresentationType = require("./Data/RepresentationType.js");
var _TransmissionType = require("./Data/TransmissionType.js");
var _Authentication = _interopRequireDefault(require("./Security/Authority/Authentication.js"));
var _AuthenticationMethod = _interopRequireDefault(require("./Security/Authority/AuthenticationMethod.js"));
var _AuthenticationType = _interopRequireDefault(require("./Security/Authority/AuthenticationType.js"));
var _ClientAuthentication = _interopRequireDefault(require("./Security/Authority/ClientAuthentication.js"));
var _HostAuthentication = _interopRequireDefault(require("./Security/Authority/HostAuthentication.js"));
var _Session = _interopRequireDefault(require("./Security/Authority/Session.js"));
var _SHA = _interopRequireDefault(require("./Security/Integrity/SHA256.js"));
var _IMembership = _interopRequireDefault(require("./Security/Membership/IMembership.js"));
var _AuthorizationRequest = _interopRequireDefault(require("./Security/Membership/AuthorizationRequest.js"));
var _AuthorizationResults = _interopRequireDefault(require("./Security/Membership/AuthorizationResults.js"));
var _AuthorizationResultsResponse = _interopRequireDefault(require("./Security/Membership/AuthorizationResultsResponse.js"));
var _ActionType = _interopRequireDefault(require("./Security/Permissions/ActionType.js"));
var _IPermissionsManager = _interopRequireDefault(require("./Security/Permissions/IPermissionsManager.js"));
var _Ruling = _interopRequireDefault(require("./Security/Permissions/Ruling.js"));
var _ExtendedTypes = require("./Data/ExtendedTypes.js");
var _Tuple = _interopRequireDefault(require("./Data/Tuple.js"));
var _Nullable = _interopRequireDefault(require("./Data/Nullable.js"));
var _Void = _interopRequireDefault(require("./Data/Void.js"));
var _IEnum = _interopRequireDefault(require("./Data/IEnum.js"));
var _TemplateDescriber = require("./Resource/Template/TemplateDescriber.js");
var namespace = {
  Core: {
    AsyncReply: _AsyncReply["default"],
    AsyncException: _AsyncException["default"],
    AsyncQueue: _AsyncQueue["default"],
    ErrorType: _ErrorType["default"],
    ExceptionCode: _ExceptionCode["default"],
    IDestructible: _IDestructible["default"],
    IEventHandler: _IEventHandler["default"],
    ProgressType: _ProgressType["default"]
  },
  Data: {
    AutoList: _AutoList["default"],
    AutoMap: _AutoMap["default"],
    BinaryList: _BinaryList["default"],
    Codec: _Codec["default"],
    DC: _DC["default"],
    TypedList: _TypedList["default"],
    TypedMap: _TypedMap["default"],
    UUID: _UUID["default"],
    IRecord: _IRecord["default"],
    KeyList: _KeyList["default"],
    NotModified: _NotModified["default"],
    ResourceArrayType: _ResourceArrayType["default"],
    PropertyValue: _PropertyValue["default"],
    Record: _Record["default"],
    ResourceArray: _ResourceArray["default"],
    RepresentationType: _RepresentationType.RepresentationType,
    RepresentationTypeIdentifier: _RepresentationType.RepresentationTypeIdentifier,
    TransmissionType: _TransmissionType.TransmissionType,
    TransmissionTypeIdentifier: _TransmissionType.TransmissionTypeIdentifier,
    Int8: _ExtendedTypes.Int8,
    UInt8: _ExtendedTypes.UInt8,
    Int16: _ExtendedTypes.Int16,
    UInt16: _ExtendedTypes.UInt16,
    Int32: _ExtendedTypes.Int32,
    UInt32: _ExtendedTypes.UInt32,
    Int64: _ExtendedTypes.Int64,
    UInt64: _ExtendedTypes.UInt64,
    Int128: _ExtendedTypes.Int128,
    UInt128: _ExtendedTypes.UInt128,
    Float32: _ExtendedTypes.Float32,
    Float64: _ExtendedTypes.Float64,
    Float128: _ExtendedTypes.Float128,
    Char16: _ExtendedTypes.Char16,
    Char8: _ExtendedTypes.Char8,
    Tuple: _Tuple["default"],
    Nullable: _Nullable["default"],
    Void: _Void["default"],
    IEnum: _IEnum["default"]
  },
  Net: {
    INetworkReceiver: _INetworkReceiver["default"],
    NetworkBuffer: _NetworkBuffer["default"],
    NetworkConnections: _NetworkConnections["default"],
    NetworkServer: _NetworkServer["default"],
    NetworkSession: _NetworkSession["default"],
    SendList: _SendList["default"],
    IIP: {
      DistributedConnection: _DistributedConnection["default"],
      DistributedPropertyContext: _DistributedPropertyContext["default"],
      DistributedResource: _DistributedResource["default"],
      DistributedResourceQueueItem: _DistributedResourceQueueItem["default"],
      DistributedResourceQueueItemType: _DistributedResourceQueueItemType["default"],
      DistributedServer: _DistributedServer["default"],
      EntryPoint: _EntryPoint["default"]
    },
    Packets: {
      IIPAuthPacket: _IIPAuthPacket["default"],
      IIPAuthPacketCommand: _IIPAuthPacketCommand["default"],
      IIPAuthPacketAction: _IIPAuthPacketAction["default"],
      IIPAuthPacketAcknowledge: _IIPAuthPacketAcknowledge["default"],
      IIPAuthPacketInitialize: _IIPAuthPacketInitialize["default"],
      IIPAuthPacketEvent: _IIPAuthPacketEvent["default"],
      IIPAuthPacketHashAlgorithm: _IIPAuthPacketHashAlgorithm["default"],
      IIPAuthPacketHeader: _IIPAuthPacketHeader["default"],
      IIPAuthPacketIAuthDestination: _IIPAuthPacketIAuthDestination["default"],
      IIPAuthPacketIAuthFormat: _IIPAuthPacketIAuthFormat["default"],
      IIPAuthPacketIAuthHeader: _IIPAuthPacketIAuthHeader["default"],
      IIPAuthPacketPublicKeyAlgorithm: _IIPAuthPacketPublicKeyAlgorithm["default"],
      IIPPacket: _IIPPacket["default"],
      IIPPacketAction: _IIPPacketAction["default"],
      IIPPacketCommand: _IIPPacketCommand["default"],
      IIPPacketEvent: _IIPPacketEvent["default"],
      IIPPacketReport: _IIPPacketReport["default"]
    },
    Sockets: {
      ISocket: _ISocket["default"],
      SocketState: _SocketState["default"],
      WSocket: _WSocket["default"]
    }
  },
  Proxy: {
    ResourceProxy: _ResourceProxy["default"],
    TemplateGenerator: _TemplateGenerator["default"]
  },
  Resource: {
    CustomResourceEvent: _CustomResourceEvent["default"],
    Instance: _Instance["default"],
    IResource: _IResource["default"],
    IStore: _IStore["default"],
    Warehouse: _Warehouse["default"],
    Template: {
      ArgumentTemplate: _ArgumentTemplate["default"],
      EventTemplate: _EventTemplate["default"],
      FunctionTemplate: _FunctionTemplate["default"],
      MemberTemplate: _MemberTemplate["default"],
      MemberType: _MemberType["default"],
      PropertyTemplate: _PropertyTemplate["default"],
      TemplateType: _TemplateType["default"],
      TypeTemplate: _TypeTemplate["default"],
      TemplateDescriber: _TemplateDescriber.TemplateDescriber,
      Prop: _TemplateDescriber.Prop,
      Func: _TemplateDescriber.Func,
      Evt: _TemplateDescriber.Evt,
      Const: _TemplateDescriber.Const,
      Arg: _TemplateDescriber.Arg
    }
  },
  Security: {
    Authority: {
      Authentication: _Authentication["default"],
      AuthenticationMethod: _AuthenticationMethod["default"],
      AuthenticationType: _AuthenticationType["default"],
      ClientAuthentication: _ClientAuthentication["default"],
      HostAuthentication: _HostAuthentication["default"],
      Session: _Session["default"]
    },
    Integrity: {
      SHA256: _SHA["default"]
    },
    Membership: {
      IMembership: _IMembership["default"],
      AuthorizationRequest: _AuthorizationRequest["default"],
      AuthorizationResults: _AuthorizationResults["default"],
      AuthorizationResultsResponse: _AuthorizationResultsResponse["default"]
    },
    Permissions: {
      ActionType: _ActionType["default"],
      IPermissionsManager: _IPermissionsManager["default"],
      Ruling: _Ruling["default"]
    }
  },
  Stores: {
    IndexedDBStore: _IndexedDBStore["default"],
    MemoryStore: _MemoryStore["default"]
  },
  define: function define(target, type, className) {
    var sc = className.split('.');
    for (var i = 0; i < sc.length - 1; i++) {
      if (target[sc[i]] == undefined) target[sc[i]] = {};
      target = target[sc[i]];
    }
    target[sc[sc.length - 1]] = type;
  }
};
if (typeof window !== 'undefined') {
  window.wh = _Warehouse["default"];
  window.TypedMap = _TypedMap["default"];
  window.TypedList = _TypedList["default"];
  window.DistributedResource = _DistributedResource["default"];
  window.MemoryStore = _MemoryStore["default"];
  window.IndexedDBStore = _IndexedDBStore["default"];
  window.IResource = _IResource["default"];
  window.ResourceProxy = _ResourceProxy["default"];
  window.DistributedConnection = _DistributedConnection["default"];
  window.Esiur = namespace;
} else if (typeof global !== 'undefined') {
  global.wh = _Warehouse["default"];
  global.TypedMap = _TypedMap["default"];
  global.TypedList = _TypedList["default"];
  global.DistributedResource = _DistributedResource["default"];
  global.MemoryStore = _MemoryStore["default"];
  global.IndexedDBStore = _IndexedDBStore["default"];
  global.IResource = _IResource["default"];
  global.DistributedConnection = _DistributedConnection["default"];
  global.Esiur = namespace;
}
var _default = exports["default"] = namespace;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Core/AsyncException.js":40,"./Core/AsyncQueue.js":41,"./Core/AsyncReply.js":42,"./Core/ErrorType.js":43,"./Core/ExceptionCode.js":44,"./Core/IDestructible.js":45,"./Core/IEventHandler.js":46,"./Core/ProgressType.js":47,"./Data/AutoList.js":48,"./Data/AutoMap.js":49,"./Data/BinaryList.js":50,"./Data/Codec.js":51,"./Data/DC.js":52,"./Data/ExtendedTypes.js":55,"./Data/IEnum.js":56,"./Data/IRecord.js":57,"./Data/KeyList.js":58,"./Data/NotModified.js":59,"./Data/Nullable.js":60,"./Data/PropertyValue.js":62,"./Data/Record.js":64,"./Data/RepresentationType.js":66,"./Data/ResourceArray.js":67,"./Data/ResourceArrayType.js":68,"./Data/TransmissionType.js":69,"./Data/Tuple.js":70,"./Data/TypedList.js":71,"./Data/TypedMap.js":72,"./Data/UUID.js":73,"./Data/Void.js":74,"./Net/IIP/DistributedConnection.js":77,"./Net/IIP/DistributedPropertyContext.js":78,"./Net/IIP/DistributedResource.js":79,"./Net/IIP/DistributedResourceQueueItem.js":81,"./Net/IIP/DistributedResourceQueueItemType.js":82,"./Net/IIP/DistributedServer.js":83,"./Net/IIP/EntryPoint.js":84,"./Net/INetworkReceiver.js":85,"./Net/NetworkBuffer.js":86,"./Net/NetworkConnections.js":87,"./Net/NetworkServer.js":88,"./Net/NetworkSession.js":89,"./Net/Packets/IIPAuthPacket.js":90,"./Net/Packets/IIPAuthPacketAcknowledge.js":91,"./Net/Packets/IIPAuthPacketAction.js":92,"./Net/Packets/IIPAuthPacketCommand.js":93,"./Net/Packets/IIPAuthPacketEvent.js":94,"./Net/Packets/IIPAuthPacketHashAlgorithm.js":95,"./Net/Packets/IIPAuthPacketHeader.js":96,"./Net/Packets/IIPAuthPacketIAuthDestination.js":97,"./Net/Packets/IIPAuthPacketIAuthFormat.js":98,"./Net/Packets/IIPAuthPacketIAuthHeader.js":99,"./Net/Packets/IIPAuthPacketInitialize.js":100,"./Net/Packets/IIPAuthPacketPublicKeyAlgorithm.js":101,"./Net/Packets/IIPPacket.js":102,"./Net/Packets/IIPPacketAction.js":103,"./Net/Packets/IIPPacketCommand.js":104,"./Net/Packets/IIPPacketEvent.js":105,"./Net/Packets/IIPPacketReport.js":106,"./Net/SendList.js":107,"./Net/Sockets/ISocket.js":108,"./Net/Sockets/SocketState.js":109,"./Net/Sockets/WSocket.js":110,"./Proxy/ResourceProxy.js":111,"./Proxy/TemplateGenerator.js":112,"./Resource/CustomResourceEvent.js":113,"./Resource/IResource.js":115,"./Resource/IStore.js":116,"./Resource/Instance.js":117,"./Resource/Template/ArgumentTemplate.js":119,"./Resource/Template/EventTemplate.js":121,"./Resource/Template/FunctionTemplate.js":122,"./Resource/Template/MemberTemplate.js":123,"./Resource/Template/MemberType.js":124,"./Resource/Template/PropertyTemplate.js":125,"./Resource/Template/TemplateDescriber.js":126,"./Resource/Template/TemplateType.js":127,"./Resource/Template/TypeTemplate.js":128,"./Resource/Warehouse.js":129,"./Security/Authority/Authentication.js":130,"./Security/Authority/AuthenticationMethod.js":131,"./Security/Authority/AuthenticationType.js":132,"./Security/Authority/ClientAuthentication.js":133,"./Security/Authority/HostAuthentication.js":134,"./Security/Authority/Session.js":135,"./Security/Integrity/SHA256.js":136,"./Security/Membership/AuthorizationRequest.js":137,"./Security/Membership/AuthorizationResults.js":138,"./Security/Membership/AuthorizationResultsResponse.js":139,"./Security/Membership/IMembership.js":140,"./Security/Permissions/ActionType.js":141,"./Security/Permissions/IPermissionsManager.js":142,"./Security/Permissions/Ruling.js":143,"./Stores/IndexedDBStore.js":144,"./Stores/MemoryStore.js":145,"@babel/runtime/helpers/interopRequireDefault":18}]},{},[146]);
