(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],2:[function(require,module,exports){
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

module.exports = _asyncToGenerator;
},{}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],4:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
},{"./setPrototypeOf":12}],5:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],6:[function(require,module,exports){
var superPropBase = require("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"./superPropBase":13}],7:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],8:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":12}],9:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],10:[function(require,module,exports){
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;
},{}],11:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":14,"./assertThisInitialized":1}],12:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],13:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":7}],14:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],15:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

var setPrototypeOf = require("./setPrototypeOf");

var isNativeFunction = require("./isNativeFunction");

var construct = require("./construct");

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
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
},{"./construct":4,"./getPrototypeOf":7,"./isNativeFunction":10,"./setPrototypeOf":12}],16:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],17:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":16}],18:[function(require,module,exports){
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

var AsyncBag = /*#__PURE__*/function (_AsyncReply) {
  (0, _inherits2["default"])(AsyncBag, _AsyncReply);

  function AsyncBag() {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncBag);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncBag).call(this));
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

      for (var i = 0; i < this.results.length; i++) {
        this.replies[i].then(singleTaskCompleted(i));
      }
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

exports["default"] = AsyncBag;

},{"./AsyncReply.js":21,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],19:[function(require,module,exports){
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

var AsyncException = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(AsyncException, _Error);

  function AsyncException() {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncException);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncException).call(this));
    _this.raised = false;
    return _this;
  }

  (0, _createClass2["default"])(AsyncException, [{
    key: "raise",
    value: function raise(type, code, message) {
      this.type = type;
      this.code = code;

      if (type == 0) {
        for (var i in _ExceptionCode["default"]) {
          if (_ExceptionCode["default"][i] == code) {
            this.message = i;
            break;
          }
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

exports["default"] = AsyncException;

},{"./ExceptionCode.js":23,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/wrapNativeSuper":15}],20:[function(require,module,exports){
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

var AsyncQueue = /*#__PURE__*/function (_AsyncReply) {
  (0, _inherits2["default"])(AsyncQueue, _AsyncReply);

  function AsyncQueue() {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncQueue);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncQueue).call(this));
    _this.list = [];
    var self = (0, _assertThisInitialized2["default"])(_this);

    _this.processQueue = function () {
      for (var i = 0; i < self.list.length; i++) {
        if (self.list[i].ready) {
          self.trigger(self.list[i].result);
          self.ready = false; //self.list.splice(i, 1);

          self.list.shift();
          i--;
        } else if (self.list[i].failed) {
          self.ready = false;
          self.list.shift();
          i--;
          console.log("AsyncQueue (Reply Failed)");
        } else break;
      }

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
      console.log("REMOVE QUEUE");
      this.list.splice(this.list.indexOf(reply), 1);
      this.processQueue();
    }
  }]);
  return AsyncQueue;
}(_AsyncReply2["default"]);

exports["default"] = AsyncQueue;

},{"./AsyncReply.js":21,"@babel/runtime/helpers/assertThisInitialized":1,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],21:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _AsyncException = _interopRequireDefault(require("./AsyncException.js"));

var AsyncReply = /*#__PURE__*/function (_Promise) {
  (0, _inherits2["default"])(AsyncReply, _Promise);
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
    } // Alias for then()

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
    } // Alias for chunk()

  }, {
    key: "next",
    value: function next(callback) {
      this.chunk(callback);
    }
  }, {
    key: "trigger",
    value: function trigger(result) {
      if (this.ready) return;
      this.result = result;
      this.ready = true;

      for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](result, this);
      }
    }
  }, {
    key: "triggerError",
    value: function triggerError(type, code, message) {
      if (this.ready) return;
      if (type instanceof _AsyncException["default"]) this.exception.raise(type.type, type.code, type.message);else this.exception.raise(type, code, message);
      if (this.errorCallbacks.length == 0) throw this.exception;else for (var i = 0; i < this.errorCallbacks.length; i++) {
        this.errorCallbacks[i](this.exception, this);
      }
    }
  }, {
    key: "triggerProgress",
    value: function triggerProgress(type, value, max) {
      for (var i = 0; i < this.progressCallbacks.length; i++) {
        this.progressCallbacks[i](type, value, max, this);
      }
    }
  }, {
    key: "triggerChunk",
    value: function triggerChunk(value) {
      for (var i = 0; i < this.chunkCallbacks.length; i++) {
        this.chunkCallbacks[i](value, this);
      }
    }
  }]);

  function AsyncReply(result) {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncReply);

    if (result instanceof Function) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncReply).call(this, result));
      _this.awaiter = result;
    } else _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AsyncReply).call(this, function () {}));

    _this.callbacks = [];
    _this.errorCallbacks = [];
    _this.progressCallbacks = [];
    _this.chunkCallbacks = [];
    _this.exception = new _AsyncException["default"](); // null;

    var self = (0, _assertThisInitialized2["default"])(_this);

    if (result !== undefined && !(result instanceof Function)) {
      _this.result = result;
      _this.ready = true;
    } else {
      _this.ready = false;
      _this.result = null;
    }

    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  return AsyncReply;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Promise));

exports["default"] = AsyncReply;

},{"./AsyncException.js":19,"@babel/runtime/helpers/assertThisInitialized":1,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/wrapNativeSuper":15}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Management: 0,
  Exception: 1
};
exports["default"] = _default;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = //const ExceptionCode = 
{
  HostNotReachable: 0,
  AccessDenied: 1,
  UserNotFound: 2,
  ChallengeFailed: 3,
  ResourceNotFound: 4,
  AttachDenied: 5,
  InvalidMethod: 6,
  InvokeDenied: 7,
  CreateDenied: 8,
  AddParentDenied: 9,
  AddChildDenied: 10,
  ViewAttributeDenied: 11,
  UpdateAttributeDenied: 12,
  StoreNotFound: 13,
  ParentNotFound: 14,
  ChildNotFound: 15,
  ResourceIsNotStore: 16,
  DeleteDenied: 17,
  DeleteFailed: 18,
  UpdateAttributeFailed: 19,
  GetAttributesFailed: 20,
  ClearAttributesFailed: 21,
  TemplateNotFound: 22,
  RenameDenied: 23,
  ClassNotFound: 24,
  MethodNotFound: 25,
  PropertyNotFound: 26,
  SetPropertyDenied: 27,
  ReadOnlyProperty: 28
};
exports["default"] = _default;

},{}],24:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IEventHandler2 = _interopRequireDefault(require("./IEventHandler.js"));

var IDestructible = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(IDestructible, _IEventHandler);
  (0, _createClass2["default"])(IDestructible, [{
    key: "destroy",
    value: function destroy() {
      this._emit("destroy", this);
    }
  }]);

  function IDestructible() {
    (0, _classCallCheck2["default"])(this, IDestructible);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IDestructible).call(this));
  }

  return IDestructible;
}(_IEventHandler2["default"]);

exports["default"] = IDestructible;

},{"./IEventHandler.js":25,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],25:[function(require,module,exports){
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

var IEventHandler = /*#__PURE__*/function () {
  (0, _createClass2["default"])(IEventHandler, [{
    key: "_register",
    value: function _register(event) {
      this._events[event] = [];
    }
  }]);

  function IEventHandler() {
    (0, _classCallCheck2["default"])(this, IEventHandler);
    this._events = {};
  }

  (0, _createClass2["default"])(IEventHandler, [{
    key: "_emit",
    value: function _emit(event) {
      event = event.toLowerCase();
      var args = Array.prototype.slice.call(arguments, 1);
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) {
        if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      }
      return false;
    }
  }, {
    key: "_emitArgs",
    value: function _emitArgs(event, args) {
      event = event.toLowerCase();
      if (this._events[event]) for (var i = 0; i < this._events[event].length; i++) {
        if (this._events[event][i].f.apply(this._events[event][i].i, args)) return true;
      }
      return this;
    }
  }, {
    key: "on",
    value: function on(event, fn, issuer) {
      if (!(fn instanceof Function)) return this;
      event = event.toLowerCase(); // add

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
      event = event.toLocaleString();

      if (this._events[event]) {
        if (fn) {
          for (var i = 0; i < this._events[event].length; i++) {
            if (this._events[event][i].f == fn) this._events[event].splice(i--, 1);
          } //var index = this._events[event].indexOf(fn);
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

exports["default"] = IEventHandler;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Execution: 0,
  Network: 1
};
exports["default"] = _default;

},{}],27:[function(require,module,exports){
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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));

var _IDestructible = _interopRequireDefault(require("../Core/IDestructible.js"));

var AutoList = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(AutoList, _IEventHandler);

  function AutoList() {
    var _this;

    (0, _classCallCheck2["default"])(this, AutoList);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AutoList).call(this));
    _this.list = [];
    return _this;
  }

  (0, _createClass2["default"])(AutoList, [{
    key: "add",
    value: function add(value) {
      if (value instanceof _IDestructible["default"]) value.on("destroy", this._item_destroyed, this);
      this.list.push(value);

      this._emit("add", value);
    }
  }, {
    key: "set",
    value: function set(index, value) {
      if (index >= this.list.length || index < 0) return;
      if (value instanceof _IDestructible["default"]) value.on("destroy", this._item_destroyed, this);
      if (this.list[index] instanceof _IDestructible["default"]) this.list[index].off("destroy", this._item_destroyed);
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
      if (item instanceof _IDestructible["default"]) item.off("destroy", this._item_destroyed);
      this.list.splice(index, 1);

      this._emit("remove", item);
    }
  }, {
    key: "_item_destroyed",
    value: function _item_destroyed(sender) {
      this.remove(sender);
    }
  }, {
    key: "length",
    get: function get() {
      return this.list.length;
    }
  }]);
  return AutoList;
}(_IEventHandler2["default"]);

exports["default"] = AutoList;

},{"../Core/IDestructible.js":24,"../Core/IEventHandler.js":25,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],28:[function(require,module,exports){
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

var _DataType = _interopRequireDefault(require("./DataType.js"));

var _DataConverter = _interopRequireDefault(require("./DataConverter.js"));

var BinaryList = /*#__PURE__*/function () {
  function BinaryList() {
    (0, _classCallCheck2["default"])(this, BinaryList);
    this.list = [];
  }

  (0, _createClass2["default"])(BinaryList, [{
    key: "addRange",
    value: function addRange(bl) {
      for (var i = 0; i < bl.list.length; i++) {
        this.list.push(bl.list[i]);
      }

      return this;
    }
  }, {
    key: "add",
    value: function add(typedValue, position) {
      if (position !== undefined) this.list.splice(position, 0, typedValue);else this.list.push(typedValue);
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var ars = []; // calculate length

      for (var i = 0; i < this.list.length; i++) {
        switch (this.list[i].type) {
          case _DataType["default"].Bool:
            ars.push(_DataConverter["default"].boolToBytes(this.list[i].value));
            break;

          case _DataType["default"].UInt8:
            ars.push(_DataConverter["default"].uint8ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Int8:
            ars.push(_DataConverter["default"].int8ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Char:
            ars.push(_DataConverter["default"].charToBytes(this.list[i].value));
            break;

          case _DataType["default"].UInt16:
            ars.push(_DataConverter["default"].uint16ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Int16:
            ars.push(_DataConverter["default"].int16ToBytes(this.list[i].value));
            break;

          case _DataType["default"].UInt32:
            ars.push(_DataConverter["default"].uint32ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Int32:
            ars.push(_DataConverter["default"].int32ToBytes(this.list[i].value));
            break;

          case _DataType["default"].UInt64:
            ars.push(_DataConverter["default"].uint64ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Int64:
            ars.push(_DataConverter["default"].int64ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Float32:
            ars.push(_DataConverter["default"].float32ToBytes(this.list[i].value));
            break;

          case _DataType["default"].Float64:
            ars.push(_DataConverter["default"].float64ToBytes(this.list[i].value));
            break;

          case _DataType["default"].String:
            ars.push(_DataConverter["default"].stringToBytes(this.list[i].value));
            break;

          case _DataType["default"].DateTime:
            ars.push(_DataConverter["default"].dateTimeToBytes(this.list[i].value));
            break;

          case _DataType["default"].UInt8Array:
            ars.push(this.list[i].value);
          //case DataType.Resource:
          //    ars.push(DC.uint32ToBytes(this.list[i].value.instance.id));
          //    break;
          //case DataType.DistributedResource:
          //    ars.push(DC.int8ToBytes(this.list[i].value));
          //    break;
        }
      }

      var length = 0;
      ars.forEach(function (a) {
        length += a.length;
      });
      var rt = new Uint8Array(length);
      var offset = 0;

      for (var i = 0; i < ars.length; i++) {
        rt.set(ars[i], offset);
        offset += ars[i].length;
      }

      return rt;
    }
  }, {
    key: "toDC",
    value: function toDC() {
      return new _DataConverter["default"](this.toArray());
    }
  }, {
    key: "addDateTime",
    value: function addDateTime(value, position) {
      return this.add({
        type: _DataType["default"].DateTime,
        value: value
      }, position);
    }
  }, {
    key: "addUint8Array",
    value: function addUint8Array(value, position) {
      return this.add({
        type: _DataType["default"].UInt8Array,
        value: value
      }, position);
    }
  }, {
    key: "addHex",
    value: function addHex(value, position) {
      return this.addUint8Array(_DataConverter["default"].hexToBytes(value), position);
    }
  }, {
    key: "addString",
    value: function addString(value, position) {
      return this.add({
        type: _DataType["default"].String,
        value: value
      }, position);
    }
  }, {
    key: "addUint8",
    value: function addUint8(value, position) {
      return this.add({
        type: _DataType["default"].UInt8,
        value: value
      }, position);
    }
  }, {
    key: "addInt8",
    value: function addInt8(value, position) {
      return this.add({
        type: _DataType["default"].Int8,
        value: value
      }, position);
    }
  }, {
    key: "addChar",
    value: function addChar(value, position) {
      return this.add({
        type: _DataType["default"].Char,
        value: value
      }, position);
    }
  }, {
    key: "addUint16",
    value: function addUint16(value, position) {
      return this.add({
        type: _DataType["default"].UInt16,
        value: value
      }, position);
    }
  }, {
    key: "addInt16",
    value: function addInt16(value, position) {
      return this.add({
        type: _DataType["default"].Int16,
        value: value
      }, position);
    }
  }, {
    key: "addUint32",
    value: function addUint32(value, position) {
      return this.add({
        type: _DataType["default"].UInt32,
        value: value
      }, position);
    }
  }, {
    key: "addInt32",
    value: function addInt32(value, position) {
      return this.add({
        type: _DataType["default"].Int32,
        value: value
      }, position);
    }
  }, {
    key: "addUint64",
    value: function addUint64(value, position) {
      return this.add({
        type: _DataType["default"].UInt64,
        value: value
      }, position);
    }
  }, {
    key: "addInt64",
    value: function addInt64(value, position) {
      return this.add({
        type: _DataType["default"].Int64,
        value: value
      }, position);
    }
  }, {
    key: "addFloat32",
    value: function addFloat32(value, position) {
      return this.add({
        type: _DataType["default"].Float32,
        value: value
      }, position);
    }
  }, {
    key: "addFloat64",
    value: function addFloat64(value, position) {
      return this.add({
        type: _DataType["default"].Float64,
        value: value
      }, position);
    }
  }, {
    key: "length",
    get: function get() {
      return this.toArray().length;
    }
  }]);
  return BinaryList;
}();

exports["default"] = BinaryList;

},{"./DataConverter.js":30,"./DataType.js":31,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],29:[function(require,module,exports){
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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DataType = _interopRequireDefault(require("./DataType.js"));

var _ResourceComparisionResult = _interopRequireDefault(require("./ResourceComparisionResult.js"));

var _StructureComparisonResult = _interopRequireDefault(require("./StructureComparisonResult.js"));

var _AsyncBag = _interopRequireDefault(require("../Core/AsyncBag.js"));

var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));

var _Structure = _interopRequireDefault(require("./Structure.js"));

var _PropertyValue = _interopRequireDefault(require("./PropertyValue.js"));

var _DataConverter = require("./DataConverter.js");

var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));

var _DistributedPropertyContext = _interopRequireDefault(require("../Net/IIP/DistributedPropertyContext.js"));

var _DistributedResource = _interopRequireDefault(require("../Net/IIP/DistributedResource.js"));

var _IResource = _interopRequireDefault(require("../Resource/IResource.js"));

var Codec = /*#__PURE__*/function () {
  function Codec() {
    (0, _classCallCheck2["default"])(this, Codec);
  }

  (0, _createClass2["default"])(Codec, null, [{
    key: "parse",
    value: function parse(data, offset, sizeObject, connection) {
      var dataType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _DataType["default"].Unspecified;
      var size;
      var reply = new _AsyncReply["default"]();
      var isArray;
      var t;

      if (dataType == _DataType["default"].Unspecified) {
        size = 1;
        dataType = data[offset++];
      } else size = 0;

      t = dataType & 0x7F;
      isArray = (dataType & 0x80) == 0x80;

      var payloadSize = _DataType["default"].sizeOf(dataType);

      var contentLength = 0; // check if we have the enough data

      if (payloadSize == -1) {
        contentLength = data.getUint32(offset);
        offset += 4;
        size += 4 + contentLength;
      } else size += payloadSize;

      sizeObject.size = size;

      if (isArray) {
        switch (t) {
          // VarArray ?
          case _DataType["default"].Void:
            return Codec.parseVarArray(data, offset, contentLength, connection);

          case _DataType["default"].Bool:
            return new _AsyncReply["default"](data.getBooleanArray(offset, contentLength));

          case _DataType["default"].UInt8:
            return new _AsyncReply["default"](data.getUint8Array(offset, contentLength));

          case _DataType["default"].Int8:
            return new _AsyncReply["default"](data.getInt8Array(offset, contentLength));

          case _DataType["default"].Char:
            return new _AsyncReply["default"](data.getCharArray(offset, contentLength));

          case _DataType["default"].Int16:
            return new _AsyncReply["default"](data.getInt16Array(offset, contentLength));

          case _DataType["default"].UInt16:
            return new _AsyncReply["default"](data.getUint16Array(offset, contentLength));

          case _DataType["default"].Int32:
            return new _AsyncReply["default"](data.getInt32Array(offset, contentLength));

          case _DataType["default"].UInt32:
            return new _AsyncReply["default"](data.getUint32Array(offset, contentLength));

          case _DataType["default"].Int64:
            return new _AsyncReply["default"](data.getInt64Array(offset, contentLength));

          case _DataType["default"].UInt64:
            return new _AsyncReply["default"](data.getUint64Array(offset, contentLength));

          case _DataType["default"].Float32:
            return new _AsyncReply["default"](data.getFloat32Array(offset, contentLength));

          case _DataType["default"].Float64:
            return new _AsyncReply["default"](data.getFloat64Array(offset, contentLength));

          case _DataType["default"].String:
            return new _AsyncReply["default"](data.getStringArray(offset, contentLength));

          case _DataType["default"].Resource:
          case _DataType["default"].DistributedResource:
            return Codec.parseResourceArray(data, offset, contentLength, connection);

          case _DataType["default"].DateTime:
            return new _AsyncReply["default"](data.getDateTimeArray(offset, contentLength));

          case _DataType["default"].Structure:
            return Codec.parseStructureArray(data, offset, contentLength, connection);
        }
      } else {
        switch (t) {
          case _DataType["default"].NotModified:
            return new _AsyncReply["default"](new NotModified());

          case _DataType["default"].Void:
            return new _AsyncReply["default"](null);

          case _DataType["default"].Bool:
            return new _AsyncReply["default"](data.getBoolean(offset));

          case _DataType["default"].UInt8:
            return new _AsyncReply["default"](data[offset]);

          case _DataType["default"].Int8:
            return new _AsyncReply["default"](data.getInt8(offset));

          case _DataType["default"].Char:
            return new _AsyncReply["default"](data.getChar(offset));

          case _DataType["default"].Int16:
            return new _AsyncReply["default"](data.getInt16(offset));

          case _DataType["default"].UInt16:
            return new _AsyncReply["default"](data.getUint16(offset));

          case _DataType["default"].Int32:
            return new _AsyncReply["default"](data.getInt32(offset));

          case _DataType["default"].UInt32:
            return new _AsyncReply["default"](data.getUint32(offset));

          case _DataType["default"].Int64:
            return new _AsyncReply["default"](data.getInt64(offset));

          case _DataType["default"].UInt64:
            return new _AsyncReply["default"](data.getUint64(offset));

          case _DataType["default"].Float32:
            return new _AsyncReply["default"](data.getFloat32(offset));

          case _DataType["default"].Float64:
            return new _AsyncReply["default"](data.getFloat64(offset));

          case _DataType["default"].String:
            return new _AsyncReply["default"](data.getString(offset, contentLength));

          case _DataType["default"].Resource:
            return Codec.parseResource(data, offset);

          case _DataType["default"].DistributedResource:
            return Codec.parseDistributedResource(data, offset, connection);

          case _DataType["default"].DateTime:
            return new _AsyncReply["default"](data.getDateTime(offset));

          case _DataType["default"].Structure:
            return Codec.parseStructure(data, offset, contentLength, connection);
        }
      }

      return null;
    }
  }, {
    key: "parseResource",
    value: function parseResource(data, offset) {
      return Warehouse.getById(data.getUint32(offset));
    }
  }, {
    key: "parseDistributedResource",
    value: function parseDistributedResource(data, offset, connection) {
      //var g = data.getGuid(offset);
      //offset += 16;
      // find the object
      var iid = data.getUint32(offset);
      return connection.fetch(iid); // Warehouse.getById(iid);
    } /// <summary>
    /// Parse an array of bytes into array of resources
    /// </summary>
    /// <param name="data">Array of bytes.</param>
    /// <param name="length">Number of bytes to parse.</param>
    /// <param name="offset">Zero-indexed offset.</param>
    /// <param name="connection">DistributedConnection is required to fetch resources.</param>
    /// <returns>Array of resources.</returns>

  }, {
    key: "parseResourceArray",
    value: function parseResourceArray(data, offset, length, connection) {
      var reply = new _AsyncBag["default"]();

      if (length == 0) {
        reply.seal();
        return reply;
      }

      var end = offset + length; // 

      var result = data[offset++];
      var previous = null;
      if (result == _ResourceComparisionResult["default"].Null) previous = new _AsyncReply["default"](null);else if (result == _ResourceComparisionResult["default"].Local) {
        previous = Warehouse.getById(data.getUint32(offset));
        offset += 4;
      } else if (result == _ResourceComparisionResult["default"].Distributed) {
        previous = connection.fetch(data.getUint32(offset));
        offset += 4;
      }
      reply.add(previous);

      while (offset < end) {
        result = data[offset++];
        var current = null;

        if (result == _ResourceComparisionResult["default"].Null) {
          current = new _AsyncReply["default"](null);
        } else if (result == _ResourceComparisionResult["default"].Same) {
          current = previous;
        } else if (result == _ResourceComparisionResult["default"].Local) {
          current = Warehouse.getById(data.getUint32(offset));
          offset += 4;
        } else if (result == _ResourceComparisionResult["default"].Distributed) {
          current = connection.fetch(data.getUint32(offset));
          offset += 4;
        }

        reply.add(current);
        previous = current;
      }

      reply.seal();
      return reply;
    } /// <summary>
    /// Compose an array of property values.
    /// </summary>
    /// <param name="array">PropertyValue array.</param>
    /// <param name="connection">DistributedConnection is required to check locality.</param>
    /// <param name="prependLength">If True, prepend the length as UInt32 at the beginning of the output.</param>
    /// <returns>Array of bytes in the network byte order.</returns>

  }, {
    key: "composePropertyValueArray",
    value: function composePropertyValueArray(array, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rt = (0, _DataConverter.BL)();

      for (var i = 0; i < array.length; i++) {
        rt.addUint8Array(Codec.composePropertyValue(array[i], connection));
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    } /// <summary>
    /// Compose a property value.
    /// </summary>
    /// <param name="propertyValue">Property value</param>
    /// <param name="connection">DistributedConnection is required to check locality.</param>
    /// <returns>Array of bytes in the network byte order.</returns>

  }, {
    key: "composePropertyValue",
    value: function composePropertyValue(propertyValue, connection) {
      // age, date, value
      return (0, _DataConverter.BL)().addUint64(propertyValue.age).addDateTime(propertyValue.date).addUint8Array(Codec.compose(propertyValue.value, connection)).toArray();
    } /// <summary>
    /// Parse property value.
    /// </summary>
    /// <param name="data">Array of bytes.</param>
    /// <param name="offset">Zero-indexed offset.</param>
    /// <param name="connection">DistributedConnection is required to fetch resources.</param>
    /// <param name="cs">Output content size.</param>
    /// <returns>PropertyValue.</returns>

  }, {
    key: "parsePropertyValue",
    value: function parsePropertyValue(data, offset, sizeObject, connection) {
      var reply = new _AsyncReply["default"]();
      var age = data.getUint64(offset);
      offset += 8;
      var date = data.getDateTime(offset);
      offset += 8;
      var cs = {};
      Codec.parse(data, offset, cs, connection).then(function (value) {
        reply.trigger(new _PropertyValue["default"](value, age, date));
      });
      sizeObject.size = 16 + cs.size;
      return reply;
    } /// <summary>
    /// Parse resource history
    /// </summary>
    /// <param name="data">Array of bytes.</param>
    /// <param name="offset">Zero-indexed offset.</param>
    /// <param name="length">Number of bytes to parse.</param>
    /// <param name="resource">Resource</param>
    /// <param name="fromAge">Starting age.</param>
    /// <param name="toAge">Ending age.</param>
    /// <param name="connection">DistributedConnection is required to fetch resources.</param>
    /// <returns></returns>

  }, {
    key: "parseHistory",
    value: function parseHistory(data, offset, length, resource, connection) {
      var list = new KeyList();
      var reply = new _AsyncReply["default"]();
      var bagOfBags = new _AsyncBag["default"]();
      var ends = offset + length;

      while (offset < ends) {
        var index = data[offset++];
        var pt = resource.instance.template.getPropertyTemplateByIndex(index);
        list.add(pt, null);
        var cs = data.getUint32(offset);
        offset += 4;
        bagOfBags.add(Codec.parsePropertyValueArray(data, offset, cs, connection));
        offset += cs;
      }

      bagOfBags.seal();
      bagOfBags.then(function (x) {
        for (var i = 0; i < list.length; i++) {
          list.values[i] = x[i];
        }

        reply.trigger(list);
      });
      return reply;
    } /// <summary>
    /// Compose resource history
    /// </summary>
    /// <param name="history">History</param>
    /// <param name="connection">DistributedConnection is required to fetch resources.</param>
    /// <returns></returns>

  }, {
    key: "composeHistory",
    value: function composeHistory(history, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rt = new _BinaryList["default"]();

      for (var i = 0; i < history.length; i++) {
        rt.addUint8(history.keys[i].index).addUint8Array(Codec.composePropertyValueArray(history.values[i], connection, true));
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    } /// <summary>
    /// Parse an array of ProperyValue.
    /// </summary>
    /// <param name="data">Array of bytes.</param>
    /// <param name="offset">Zero-indexed offset.</param>
    /// <param name="length">Number of bytes to parse.</param>
    /// <param name="connection">DistributedConnection is required to fetch resources.</param>
    /// <returns></returns>

  }, {
    key: "parsePropertyValueArray",
    value: function parsePropertyValueArray(data, offset, length, connection) {
      var rt = new _AsyncBag["default"]();

      while (length > 0) {
        var cs = {};
        rt.add(Codec.parsePropertyValue(data, offset, cs, connection));

        if (cs.size > 0) {
          offset += cs.size;
          length -= cs.size;
        } else throw new Error("Error while parsing ValueInfo structured data");
      }

      rt.seal();
      return rt;
    }
  }, {
    key: "parseStructure",
    value: function parseStructure(data, offset, contentLength, connection) {
      var metadata = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var keys = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var types = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var reply = new _AsyncReply["default"]();
      var bag = new _AsyncBag["default"]();
      var keylist = [];
      var typelist = [];

      if (keys == null) {
        while (contentLength > 0) {
          var len = data[offset++];
          keylist.push(data.getString(offset, len));
          offset += len;
          typelist.push(data[offset]);
          var rt = {};
          bag.add(Codec.parse(data, offset, rt, connection));
          contentLength -= rt.size + len + 1;
          offset += rt.size;
        }
      } else if (types == null) {
        for (var i = 0; i < keys.length; i++) {
          keylist.push(keys[i]);
        }

        while (contentLength > 0) {
          typelist.push(data[offset]);
          var rt = {};
          bag.add(Codec.parse(data, offset, rt, connection));
          contentLength -= rt.size;
          offset += rt.size;
        }
      } else {
        for (var i = 0; i < keys.length; i++) {
          keylist.push(keys[i]);
          typelist.push(types[i]);
        }

        var i = 0;

        while (contentLength > 0) {
          var rt = {};
          bag.add(Codec.parse(data, offset, rt, connection, types[i]));
          contentLength -= rt.size;
          offset += rt.size;
          i++;
        }
      }

      bag.seal();
      bag.then(function (res) {
        // compose the list
        var s = new _Structure["default"]();

        for (var i = 0; i < keylist.length; i++) {
          s[keylist[i]] = res[i];
        }

        reply.trigger(s);
      });

      if (metadata != null) {
        metadata.keys = keylist;
        metadata.types = typelist;
      }

      return reply;
    }
  }, {
    key: "parseVarArray",
    value: function parseVarArray(data, offset, contentLength, connection) {
      var rt = new _AsyncBag["default"]();

      while (contentLength > 0) {
        var cs = {};
        rt.add(Codec.parse(data, offset, cs, connection));

        if (cs.size > 0) {
          offset += cs.size;
          contentLength -= cs.size;
        } else throw new Error("Error while parsing structured data");
      }

      rt.seal();
      return rt;
    }
  }, {
    key: "compose",
    value: function compose(value, connection) {
      var prependType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (value instanceof Function) value = value(connection);else if (value instanceof _DistributedPropertyContext["default"]) value = value.method(this);
      var type = Codec.getDataType(value, connection);
      var rt = new _BinaryList["default"]();

      switch (type) {
        case _DataType["default"].Void:
          // nothing to do;
          break;

        case _DataType["default"].String:
          var st = _DataConverter.DC.stringToBytes(value);

          rt.addUint32(st.length).addUint8Array(st);
          break;

        case _DataType["default"].Resource:
          rt.addUint32(value._p.instanceId);
          break;

        case _DataType["default"].DistributedResource:
          //                rt.addUint8Array(DC.stringToBytes(value.instance.template.classId)).addUint32(value.instance.id);
          rt.addUint32(value.instance.id);
          break;

        case _DataType["default"].Structure:
          rt.addUint8Array(Codec.composeStructure(value, connection, true, true, true));
          break;

        case _DataType["default"].VarArray:
          rt.addUint8Array(Codec.composeVarArray(value, connection, true));
          break;

        case _DataType["default"].ResourceArray:
          rt.addUint8Array(Codec.composeResourceArray(value, connection, true));
          break;

        case _DataType["default"].StructureArray:
          rt.addUint8Array(Codec.composeStructureArray(value, connection, true));
          break;

        default:
          rt.add({
            type: type,
            value: value
          });
          if (_DataType["default"].isArray(type)) rt.addUint32(rt.length, 0);
          break;
      }

      if (prependType) rt.addUint8(type, 0);
      return rt.toArray();
    }
  }, {
    key: "composeVarArray",
    value: function composeVarArray(array, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rt = new _BinaryList["default"]();

      for (var i = 0; i < array.length; i++) {
        rt.addUint8Array(Codec.compose(array[i], connection));
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    }
  }, {
    key: "composeStructure",
    value: function composeStructure(value, connection) {
      var includeKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var includeTypes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var prependLength = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var rt = new _BinaryList["default"]();
      var keys = value.getKeys();

      if (includeKeys) {
        for (var i = 0; i < keys.length; i++) {
          var key = _DataConverter.DC.stringToBytes(keys[i]);

          rt.addUint8(key.length).addUint8Array(key).addUint8Array(Codec.compose(value[keys[i]], connection));
        }
      } else {
        for (var i = 0; i < keys.length; i++) {
          rt.addUint8Array(Codec.compose(value[keys[i]], connection, includeTypes));
        }
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    }
  }, {
    key: "composeStructureArray",
    value: function composeStructureArray(structures, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (structures == null || structures.length == 0 || !(structures instanceof StructureArray)) return new _DataConverter.DC(0);
      var rt = new _BinaryList["default"]();
      var comparision = _StructureComparisonResult["default"].Structure;
      rt.addUint8(comparision);
      rt.addUint8Array(Codec.composeStructure(structures[0], connection));

      for (var i = 1; i < structures.length; i++) {
        comparision = Codec.compareStructure(structures[i - 1], structures[i], connection);
        rt.addUint8(comparision);
        if (comparision == _StructureComparisonResult["default"].Structure) rt.addUint8Array(Codec.composeStructure(structures[i], connection));else if (comparision == _StructureComparisonResult["default"].StructureSameKeys) rt.addUint8Array(Codec.composeStructure(structures[i], connection, false));else if (comparision == _StructureComparisonResult["default"].StructureSameTypes) rt.addUint8Array(Codec.composeStructure(structures[i], connection, false, false));
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    }
  }, {
    key: "compareStructure",
    value: function compareStructure(previous, next, connection) {
      if (next == null) return _StructureComparisonResult["default"].Null;
      if (previous == null) return _StructureComparisonResult["default"].Structure;
      if (next == previous) return _StructureComparisonResult["default"].Same;
      if (previous.length != next.length) return _StructureComparisonResult["default"].Structure;
      var previousKeys = previous.getKeys();
      var nextKeys = next.getKeys();

      for (var i = 0; i < previousKeys.length; i++) {
        if (previousKeys[i] != nextKeys[i]) return _StructureComparisonResult["default"].Structure;
      }

      var previousTypes = Codec.getStructureDateTypes(previous, connection);
      var nextTypes = Codec.getStructureDateTypes(next, connection);

      for (var i = 0; i < previousTypes.length; i++) {
        if (previousTypes[i] != nextTypes[i]) return _StructureComparisonResult["default"].StructureSameKeys;
      }

      return _StructureComparisonResult["default"].StructureSameTypes;
    }
  }, {
    key: "getStructureDateTypes",
    value: function getStructureDateTypes(structure, connection) {
      var keys = structure.getKeys();
      var types = [];

      for (var i = 0; i < keys.length; i++) {
        types.push(Codec.getDataType(structure[keys[i]], connection));
      }

      return types;
    }
  }, {
    key: "isLocalResource",
    value: function isLocalResource(resource, connection) {
      if (resource instanceof _DistributedResource["default"]) if (resource._p.connection == connection) return true;
      return false;
    }
  }, {
    key: "composeResource",
    value: function composeResource(resource, connection) {
      if (Codec.isLocalResource(resource, connection)) return (0, _DataConverter.BL)().addUint32(resource.id);else {
        return (0, _DataConverter.BL)().addUint8Array(resource.instance.template.classId.value).addUint32(resource.instance.id);
      }
    }
  }, {
    key: "compareResource",
    value: function compareResource(previous, next, connection) {
      if (next == null) return _ResourceComparisionResult["default"].Null;else if (next == previous) return _ResourceComparisionResult["default"].Same;else if (Codec.isLocalResource(next, connection)) return _ResourceComparisionResult["default"].Local;else return _ResourceComparisionResult["default"].Distributed;
    }
  }, {
    key: "composeResourceArray",
    value: function composeResourceArray(resources, connection) {
      var prependLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (resources == null || resources.length == 0) // || !(resources instanceof ResourceArray))
        return prependLength ? new _DataConverter.DC(4) : new _DataConverter.DC(0);
      var rt = new _BinaryList["default"]();
      var comparsion = Codec.compareResource(null, resources[0], connection);
      rt.addUint8(comparsion);
      if (comparsion == _ResourceComparisionResult["default"].Local) rt.addUint32(resources[0]._p.instanceId);else if (comparsion == _ResourceComparisionResult["default"].Distributed) rt.addUint32(resources[0].instance.id);

      for (var i = 1; i < resources.length; i++) {
        comparsion = Codec.compareResource(resources[i - 1], resources[i], connection);
        rt.addUint8(comparsion);
        if (comparsion == _ResourceComparisionResult["default"].Local) rt.addUint32(resources[i]._p.instanceId);else if (comparsion == _ResourceComparisionResult["default"].Distributed) rt.addUint32(resources[i].instance.id);
      }

      if (prependLength) rt.addUint32(rt.length, 0);
      return rt.toArray();
    }
  }, {
    key: "getDataType",
    value: function getDataType(value, connection) {
      switch ((0, _typeof2["default"])(value)) {
        case "number":
          // float or ?
          if (Math.floor(value) == value) {
            if (value > 0) {
              // larger than byte ?
              if (value > 0xFF) {
                // larger than short ?
                if (value > 0xFFFF) {
                  // larger than int ?
                  if (value > 0xFFFFFFFF) {
                    return _DataType["default"].UInt64;
                  } else {
                    return _DataType["default"].UInt32;
                  }
                } else {
                  return _DataType["default"].UInt16;
                }
              } else {
                return _DataType["default"].UInt8;
              }
            } else {
              if (value < -128) {
                if (value < -32768) {
                  if (value < -2147483648) {
                    return _DataType["default"].Int64;
                  } else {
                    return _DataType["default"].Int32;
                  }
                } else {
                  return _DataType["default"].Int16;
                }
              } else {
                return _DataType["default"].Int8;
              }
            }
          } else {
            // float or double
            return _DataType["default"].Float64;
          }

          break;

        case "string":
          return _DataType["default"].String;

        case "boolean":
          return _DataType["default"].Bool;

        case "object":
          if (value instanceof Array) {
            return _DataType["default"].VarArray;
          } else if (value instanceof _IResource["default"]) {
            return Codec.isLocalResource(value, connection) ? _DataType["default"].Resource : _DataType["default"].DistributedResource;
          } else if (value instanceof Date) {
            return _DataType["default"].DateTime;
          } else if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
            return _DataType["default"].UInt8Array;
          } else if (value instanceof Number) {
            // JS numbers are always 64-bit float
            return _DataType["default"].Float64;
          } else if (value instanceof _Structure["default"]) {
            return _DataType["default"].Structure;
          } else {
            return _DataType["default"].Void;
          }

          break;

        default:
          return _DataType["default"].Void;
      }
    } /// <summary>
    /// Parse an array of structures
    /// </summary>
    /// <param name="data">Bytes array</param>
    /// <param name="offset">Zero-indexed offset</param>
    /// <param name="length">Number of bytes to parse</param>
    /// <param name="connection">DistributedConnection is required in case a structure in the array holds items at the other end</param>
    /// <returns>Array of structures</returns>

  }, {
    key: "parseStructureArray",
    value: function parseStructureArray(data, offset, length, connection) {
      var reply = new _AsyncBag["default"]();

      if (length == 0) {
        reply.seal();
        return reply;
      }

      var end = offset + length;
      var result = data[offset++];
      var previous = null; //var previousKeys = [];
      //var previousTypes = [];

      var metadata = {
        keys: null,
        types: null
      };
      if (result == _StructureComparisonResult["default"].Null) previous = new _AsyncReply["default"](null);else if (result == _StructureComparisonResult["default"].Structure) {
        var cs = data.getUint32(offset);
        offset += 4;
        previous = this.parseStructure(data, offset, cs, connection, metadata);
        offset += cs;
      }
      reply.add(previous);

      while (offset < end) {
        result = data[offset++];
        if (result == _StructureComparisonResult["default"].Null) previous = new _AsyncReply["default"](null);else if (result == _StructureComparisonResult["default"].Structure) {
          var cs = data.getUint32(offset);
          offset += 4;
          previous = this.parseStructure(data, offset, cs, connection, metadata);
          offset += cs;
        } else if (result == _StructureComparisonResult["default"].StructureSameKeys) {
          var cs = data.getUint32(offset);
          offset += 4;
          previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys);
          offset += cs;
        } else if (result == _StructureComparisonResult["default"].StructureSameTypes) {
          var cs = data.getUint32(offset);
          offset += 4;
          previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys, metadata.types);
          offset += cs;
        }
        reply.add(previous);
      }

      reply.seal();
      return reply;
    }
  }]);
  return Codec;
}();

exports["default"] = Codec;

},{"../Core/AsyncBag.js":18,"../Core/AsyncReply.js":21,"../Net/IIP/DistributedPropertyContext.js":40,"../Net/IIP/DistributedResource.js":41,"../Resource/IResource.js":56,"./BinaryList.js":28,"./DataConverter.js":30,"./DataType.js":31,"./PropertyValue.js":34,"./ResourceComparisionResult.js":35,"./Structure.js":36,"./StructureComparisonResult.js":38,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/typeof":14}],30:[function(require,module,exports){
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
exports.DC = exports["default"] = exports.TWO_PWR_32 = exports.UNIX_EPOCH = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _BinaryList = _interopRequireDefault(require("./BinaryList.js"));

var _Guid = _interopRequireDefault(require("./Guid.js"));

var UNIX_EPOCH = 621355968000000000;
exports.UNIX_EPOCH = UNIX_EPOCH;
var TWO_PWR_32 = (1 << 16) * (1 << 16);
exports.TWO_PWR_32 = TWO_PWR_32;

var DC = /*#__PURE__*/function (_Uint8Array) {
  (0, _inherits2["default"])(DC, _Uint8Array);

  function DC(bufferOrSize) {
    var _this;

    (0, _classCallCheck2["default"])(this, DC);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DC).call(this, bufferOrSize)); //if (bufferOrSize instanceof ArrayBuffer) {
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
    value: function getInt16(offset) {
      return this.dv.getInt16(offset);
    }
  }, {
    key: "getUint16",
    value: function getUint16(offset) {
      return this.dv.getUint16(offset);
    }
  }, {
    key: "getInt32",
    value: function getInt32(offset) {
      return this.dv.getInt32(offset);
    }
  }, {
    key: "getUint32",
    value: function getUint32(offset) {
      return this.dv.getUint32(offset);
    }
  }, {
    key: "getFloat32",
    value: function getFloat32(offset) {
      return this.dv.getFloat32(offset);
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(offset) {
      return this.dv.getFloat64(offset);
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
    value: function setInt16(offset, value) {
      return this.dv.setInt16(offset, value);
    }
  }, {
    key: "setUint16",
    value: function setUint16(offset, value) {
      return this.dv.setUint16(offset, value);
    }
  }, {
    key: "setInt32",
    value: function setInt32(offset, value) {
      return this.dv.setInt32(offset, value);
    }
  }, {
    key: "setUint32",
    value: function setUint32(offset, value) {
      return this.dv.setUint32(offset, value);
    }
  }, {
    key: "setFloat32",
    value: function setFloat32(offset, value) {
      return this.dv.setFloat32(offset, value);
    }
  }, {
    key: "setFloat64",
    value: function setFloat64(offset, value) {
      return this.dv.setFloat64(offset, value);
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
    value: function copy(offset, length, elementSize, func, dstType) {
      var rt = new dstType(length / elementSize);
      var d = 0,
          end = offset + length;

      for (var i = offset; i < end; i += elementSize) {
        rt[d++] = func.call(this, i);
      }

      return rt;
    }
  }, {
    key: "getInt16Array",
    value: function getInt16Array(offset, length) {
      return this.copy(offset, length, 2, this.getInt16, Int16Array); //return new Int16Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getUint16Array",
    value: function getUint16Array(offset, length) {
      return this.copy(offset, length, 2, this.getUint16, Uint16Array); //return new Uint16Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getInt32Array",
    value: function getInt32Array(offset, length) {
      return this.copy(offset, length, 4, this.getInt32, Int32Array); //return new Int32Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getUint32Array",
    value: function getUint32Array(offset, length) {
      return this.copy(offset, length, 4, this.getUint32, Uint32Array); //return new Uint32Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getFloat32Array",
    value: function getFloat32Array(offset, length) {
      return this.copy(offset, length, 4, this.getFloat32, Float32Array); //return new Float32Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getFloat64Array",
    value: function getFloat64Array(offset, length) {
      return this.copy(offset, length, 8, this.getFloat64, Float64Array); //        return new Float64Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getInt64Array",
    value: function getInt64Array(offset, length) {
      return this.copy(offset, length, 8, this.getInt64, BigInt64Array); //return new Int64Array(this.clip(offset, length).buffer);
    }
  }, {
    key: "getUint64Array",
    value: function getUint64Array(offset, length) {
      return this.copy(offset, length, 8, this.getUint64, BigUint64Array); //return new Uint64Array(this.clip(offset, length).buffer);
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

      for (var i = 0; i < length; i++) {
        rt.push(this.getBoolean(offset + i));
      }

      return rt;
    }
  }, {
    key: "getChar",
    value: function getChar(offset) {
      return String.fromCharCode(this.getUint16(offset));
    }
  }, {
    key: "setChar",
    value: function setChar(offset, value) {
      this.setUint16(offset, value.charCodeAt(0));
    }
  }, {
    key: "getCharArray",
    value: function getCharArray(offset, length) {
      var rt = [];

      for (var i = 0; i < length; i += 2) {
        rt.push(this.getChar(offset + i));
      }

      return rt;
    }
  }, {
    key: "getHex",
    value: function getHex(offset, length) {
      var rt = "";

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
    value: function getStringArray(offset, length) {
      var rt = [];
      var i = 0;

      while (i < length) {
        var cl = this.getUint32(offset + i);
        i += 4;
        rt.push(this.getString(offset + i, cl));
        i += cl;
      }

      return rt;
    }
  }, {
    key: "getInt64",
    value: function getInt64(offset) {
      var h = this.getInt32(offset);
      var l = this.getInt32(offset + 4);
      return h * TWO_PWR_32 + (l >= 0 ? l : TWO_PWR_32 + l);
    }
  }, {
    key: "getUint64",
    value: function getUint64(offset) {
      var h = this.getUint32(offset);
      var l = this.getUint32(offset + 4);
      return h * TWO_PWR_32 + (l >= 0 ? l : TWO_PWR_32 + l);
    }
  }, {
    key: "setInt64",
    value: function setInt64(offset, value) {
      var l = value % TWO_PWR_32 | 0;
      var h = value / TWO_PWR_32 | 0;
      this.setInt32(offset, h);
      this.setInt32(offset + 4, l);
    }
  }, {
    key: "setUint64",
    value: function setUint64(offset, value) {
      var l = value % TWO_PWR_32 | 0;
      var h = value / TWO_PWR_32 | 0;
      this.setInt32(offset, h);
      this.setInt32(offset + 4, l);
    }
  }, {
    key: "setDateTime",
    value: function setDateTime(offset, value) {
      // Unix Epoch
      var ticks = 621355968000000000 + value.getTime() * 10000;
      this.setUint64(offset, ticks);
    }
  }, {
    key: "getDateTime",
    value: function getDateTime(offset) {
      var ticks = this.getUint64(offset);
      return new Date(Math.round((ticks - UNIX_EPOCH) / 10000));
    }
  }, {
    key: "getDateTimeArray",
    value: function getDateTimeArray(offset) {
      var rt = [];

      for (var i = 0; i < length; i += 8) {
        rt.push(this.getDateTime(offset + i));
      }

      return rt;
    }
  }, {
    key: "getGuid",
    value: function getGuid(offset) {
      return new _Guid["default"](this.clip(offset, 16));
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
    key: "getGuidArray",
    value: function getGuidArray(offset, length) {
      var rt = [];

      for (var i = 0; i < length; i += 16) {
        rt.push(this.getGuid(offset + i));
      }

      return rt;
    }
  }, {
    key: "sequenceEqual",
    value: function sequenceEqual(ar) {
      if (ar.length != this.length) return false;else {
        for (var i = 0; i < this.length; i++) {
          if (ar[i] != this[i]) return false;
        }
      }
      return true;
    }
  }], [{
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
    key: "hexToBytes",
    value: function hexToBytes(value) {
      // convert hex to Uint8Array
      var rt = new DC(value.length / 2);

      for (var i = 0; i < ar.length; i++) {
        rt[i] = parseInt(value.substr(i * 2, 2), 16);
      }

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
    value: function charToBytes(value) {
      var rt = new DC(2);
      rt.setChar(0, value);
      return rt;
    }
  }, {
    key: "int16ToBytes",
    value: function int16ToBytes(value) {
      var rt = new DC(2);
      rt.setInt16(0, value);
      return rt;
    }
  }, {
    key: "uint16ToBytes",
    value: function uint16ToBytes(value) {
      var rt = new DC(2);
      rt.setUint16(0, value);
      return rt;
    }
  }, {
    key: "int32ToBytes",
    value: function int32ToBytes(value) {
      var rt = new DC(4);
      rt.setInt32(0, value);
      return rt;
    }
  }, {
    key: "uint32ToBytes",
    value: function uint32ToBytes(value) {
      var rt = new DC(4);
      rt.setUint32(0, value);
      return rt;
    }
  }, {
    key: "float32ToBytes",
    value: function float32ToBytes(value) {
      var rt = new DC(4);
      rt.setFloat32(0, value);
      return rt;
    }
  }, {
    key: "int64ToBytes",
    value: function int64ToBytes(value) {
      var rt = new DC(8);
      rt.setInt64(0, value);
      return rt;
    }
  }, {
    key: "uint64ToBytes",
    value: function uint64ToBytes(value) {
      var rt = new DC(8);
      rt.setUint64(0, value);
      return rt;
    }
  }, {
    key: "float64ToBytes",
    value: function float64ToBytes(value) {
      var rt = new DC(8);
      rt.setFloat64(0, value);
      return rt;
    }
  }, {
    key: "dateTimeToBytes",
    value: function dateTimeToBytes(value) {
      var rt = new DC(8);
      rt.setDateTime(0, value);
      return rt;
    }
  }, {
    key: "stringToBytes",
    value: function stringToBytes(value) {
      var utf8 = unescape(encodeURIComponent(value));
      var rt = [];

      for (var i = 0; i < utf8.length; i++) {
        rt.push(utf8.charCodeAt(i));
      }

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

exports.DC = exports["default"] = DC;

function BL() {
  return new _BinaryList["default"]();
}

;

},{"./BinaryList.js":28,"./Guid.js":32,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/wrapNativeSuper":15}],31:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Void: 0x0,
  //Variant,
  Bool: 1,
  Int8: 2,
  UInt8: 3,
  Char: 4,
  Int16: 5,
  UInt16: 6,
  Int32: 7,
  UInt32: 8,
  Int64: 9,
  UInt64: 10,
  Float32: 11,
  Float64: 12,
  Decimal: 13,
  DateTime: 14,
  Resource: 15,
  DistributedResource: 16,
  ResourceLink: 17,
  String: 18,
  Structure: 19,
  //Stream,
  //Array = 0x80,
  VarArray: 0x80,
  BoolArray: 0x81,
  Int8Array: 0x82,
  UInt8Array: 0x83,
  CharArray: 0x84,
  Int16Array: 0x85,
  UInt16Array: 0x86,
  Int32Array: 0x87,
  UInt32Array: 0x88,
  Int64Array: 0x89,
  UInt64Array: 0x8A,
  Float32Array: 0x8B,
  Float64Array: 0x8C,
  DecimalArray: 0x8D,
  DateTimeArray: 0x8E,
  ResourceArray: 0x8F,
  DistributedResourceArray: 0x90,
  ResourceLinkArray: 0x91,
  StringArray: 0x92,
  StructureArray: 0x93,
  NotModified: 0x7f,
  Unspecified: 0xff,
  isArray: function isArray(type) {
    return (type & 0x80) == 0x80 && type != this.NotModified;
  },
  sizeOf: function sizeOf(type) {
    switch (type) {
      case this.Void:
      case this.NotModified:
        return 0;

      case this.Bool:
      case this.Int8:
      case this.UInt8:
        return 1;

      case this.Char:
      case this.Int16:
      case this.UInt16:
        return 2;

      case this.Int32:
      case this.UInt32:
      case this.Float32:
      case this.Resource:
        return 4;

      case this.Int64:
      case this.UInt64:
      case this.Float64:
      case this.DateTime:
        return 8;

      case this.DistributedResource:
        return 4;

      default:
        return -1;
    }
  }
};
exports["default"] = _default;

},{}],32:[function(require,module,exports){
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

var Guid = /*#__PURE__*/function () {
  function Guid(dc) {
    (0, _classCallCheck2["default"])(this, Guid);
    this.value = dc;
  }

  (0, _createClass2["default"])(Guid, [{
    key: "valueOf",
    value: function valueOf() {
      return this.value.getHex(0, 16);
    }
  }]);
  return Guid;
}();

exports["default"] = Guid;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],33:[function(require,module,exports){
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _IDestructible = _interopRequireDefault(require("../Core/IDestructible.js"));

var KeyList = /*#__PURE__*/function () {
  function KeyList() {
    (0, _classCallCheck2["default"])(this, KeyList);
    this.keys = [];
    this.values = [];
  }

  (0, _createClass2["default"])(KeyList, [{
    key: "toObject",
    value: function toObject() {
      var rt = {};

      for (var i = 0; i < this.keys.length; i++) {
        rt[this.keys[i]] = this.values[i];
      }

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
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] == key) return this.values[i];
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] == key) return this.values[i];
      }
    }
  }, {
    key: "_item_destroyed",
    value: function _item_destroyed(sender) {
      for (var i = 0; i < this.values.length; i++) {
        if (sender == this.values[i]) {
          this.removeAt(i);
          break;
        }
      }
    }
  }, {
    key: "add",
    value: function add(key, value) {
      this.remove(key);
      if (value instanceof _IDestructible["default"]) value.on("destroy", this._item_destroyed, this);
      this.keys.push(key);
      this.values.push(value);
    }
  }, {
    key: "contains",
    value: function contains(key) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] == key) return true;
      }

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
      for (var i = 0; i < this.keys.length; i++) {
        if (key == this.keys[i]) {
          this.removeAt(i);
          break;
        }
      }
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      if (this.values[index] instanceof _IDestructible["default"]) this.values[index].off("destroy", this._item_destroyed);
      this.keys.splice(index, 1);
      this.values.splice(index, 1);
    }
  }, {
    key: "length",
    get: function get() {
      return this.keys.length;
    }
  }]);
  return KeyList;
}();

exports["default"] = KeyList;

},{"../Core/IDestructible.js":24,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],34:[function(require,module,exports){
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var PropertyValue = function PropertyValue(value, age, date) {
  (0, _classCallCheck2["default"])(this, PropertyValue);
  this.value = value;
  this.age = age;
  this.date = date;
};

exports["default"] = PropertyValue;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/interopRequireDefault":9}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = // const ResourceComparisonResult =
{
  Null: 0,
  Distributed: 1,
  Local: 2,
  Same: 3
};
exports["default"] = _default;

},{}],36:[function(require,module,exports){
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

var Structure = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Structure, [{
    key: "getKeys",
    value: function getKeys() {
      var rt = [];

      for (var i in this) {
        if (!(this[i] instanceof Function)) rt.push(i);
      }

      return rt;
    }
  }]);

  function Structure(data) {
    (0, _classCallCheck2["default"])(this, Structure);
    if (data instanceof Object) for (var i in data) {
      this[i] = data[i];
    }
  }

  return Structure;
}();

exports["default"] = Structure;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],37:[function(require,module,exports){
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
 * Created by Ahmed Zamil on 06/09/2017.
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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var StructureArray = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(StructureArray, _Array);

  function StructureArray() {
    (0, _classCallCheck2["default"])(this, StructureArray);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(StructureArray).apply(this, arguments));
  }

  (0, _createClass2["default"])(StructureArray, [{
    key: "push",
    value: function push(value) {
      if (value instanceof Structure) (0, _get2["default"])((0, _getPrototypeOf2["default"])(StructureArray.prototype), "push", this).call(this, value);else return;
    }
  }]);
  return StructureArray;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));

exports["default"] = StructureArray;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":6,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/wrapNativeSuper":15}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = //const StructureComparisonResult =
{
  Null: 0,
  Structure: 1,
  StructureSameKeys: 2,
  StructureSameTypes: 3,
  Same: 4
};
exports["default"] = _default;

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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IStore2 = _interopRequireDefault(require("../../Resource/IStore.js"));

var _Session = _interopRequireDefault(require("../../Security/Authority/Session.js"));

var _Authentication = _interopRequireDefault(require("../../Security/Authority/Authentication.js"));

var _AuthenticationType = _interopRequireDefault(require("../../Security/Authority/AuthenticationType.js"));

var _SHA = _interopRequireDefault(require("../../Security/Integrity/SHA256.js"));

var _DataConverter = require("../../Data/DataConverter.js");

var _SendList = _interopRequireDefault(require("../SendList.js"));

var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));

var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));

var _NetworkBuffer = _interopRequireDefault(require("../Sockets/NetworkBuffer.js"));

var _KeyList = _interopRequireDefault(require("../../Data/KeyList.js"));

var _AsyncQueue = _interopRequireDefault(require("../../Core/AsyncQueue.js"));

var _Warehouse = _interopRequireDefault(require("../../Resource/Warehouse.js"));

var _IIPAuthPacket = _interopRequireDefault(require("../Packets/IIPAuthPacket.js"));

var _IIPPacket = _interopRequireDefault(require("../Packets/IIPPacket.js"));

var _IIPAuthPacketAction = _interopRequireDefault(require("../Packets/IIPAuthPacketAction.js"));

var _IIPAuthPacketCommand = _interopRequireDefault(require("../Packets/IIPAuthPacketCommand.js"));

var _IIPAuthPacketMethod = _interopRequireDefault(require("../Packets/IIPAuthPacketMethod.js"));

var _IIPPacketAction = _interopRequireDefault(require("../Packets/IIPPacketAction.js"));

var _IIPPacketCommand = _interopRequireDefault(require("../Packets/IIPPacketCommand.js"));

var _IIPPacketEvent = _interopRequireDefault(require("../Packets/IIPPacketEvent.js"));

var _IIPPacketReport = _interopRequireDefault(require("../Packets//IIPPacketReport.js"));

var _ErrorType = _interopRequireDefault(require("../../Core/ErrorType.js"));

var _ProgressType = _interopRequireDefault(require("../../Core/ProgressType.js"));

var _ExceptionCode = _interopRequireDefault(require("../../Core/ExceptionCode.js"));

var _DistributedResource = _interopRequireDefault(require("./DistributedResource.js"));

var _ResourceTemplate = _interopRequireDefault(require("../../Resource/Template/ResourceTemplate.js"));

var _DistributedResourceQueueItem = _interopRequireDefault(require("./DistributedResourceQueueItem.js"));

var _DistributedResourceQueueItemType = _interopRequireDefault(require("./DistributedResourceQueueItemType.js"));

var _DistributedPropertyContext = _interopRequireDefault(require("./DistributedPropertyContext.js"));

var _IResource = require("../../Resource/IResource.js");

var _Ruling = _interopRequireDefault(require("../../Security/Permissions/Ruling.js"));

var _ActionType = _interopRequireDefault(require("../../Security/Permissions/ActionType.js"));

var DistributedConnection = /*#__PURE__*/function (_IStore) {
  (0, _inherits2["default"])(DistributedConnection, _IStore);
  (0, _createClass2["default"])(DistributedConnection, [{
    key: "send",
    value: function send(data) {
      if (this.holdSending) {
        //console.log("hold ", data.length);
        this.sendBuffer.writeAll(data);
      } else //console.log("Send", data.length);
        this.socket.send(data.buffer);
    }
  }, {
    key: "sendParams",
    value: function sendParams(doneReply) {
      return new _SendList["default"](this, doneReply);
    }
  }, {
    key: "generateNonce",
    value: function generateNonce(length) {
      var rt = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        rt[i] = Math.random() * 255;
      }

      return rt;
    }
  }]);

  function DistributedConnection() {
    var _this;

    (0, _classCallCheck2["default"])(this, DistributedConnection);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DistributedConnection).call(this)); //Instance.Name = Global.GenerateCode(12);
    //this.hostType = AuthenticationType.Client;
    //this.domain = domain;
    //this.localUsername = username;
    //this._register("ready");
    //this._register("error");

    _this._register("close");

    _this.session = new _Session["default"](new _Authentication["default"](_AuthenticationType["default"].Client), new _Authentication["default"](_AuthenticationType["default"].Host));
    _this.packet = new _IIPPacket["default"]();
    _this.authPacket = new _IIPAuthPacket["default"]();
    _this.resources = {};
    _this.templates = new _KeyList["default"]();
    _this.requests = new _KeyList["default"](); // {};
    //this.pathRequests = new KeyList();// {};

    _this.templateRequests = new _KeyList["default"]();
    _this.resourceRequests = new _KeyList["default"](); // {};

    _this.callbackCounter = 0;
    _this.queue = new _AsyncQueue["default"]();

    _this.queue.then(function (x) {
      if (x.type == _DistributedResourceQueueItemType["default"].Event) {
        x.resource._emitEventByIndex(x.index, x.value);
      } else {
        x.resource._updatePropertyByIndex(x.index, x.value);
      }
    });

    _this.localNonce = _this.generateNonce(32); // new Uint8Array(32);
    //window.crypto.getRandomValues(this.localNonce);
    // declare (Credentials -> No Auth, No Enctypt)
    //this.socket.onerror = function(event)
    //{
    //    self.close(event);
    //};

    return _this;
  }

  (0, _createClass2["default"])(DistributedConnection, [{
    key: "processPacket",
    value: function processPacket(msg, offset, ends, data) {
      var authPacket = this.authPacket;

      if (this.ready) {
        var packet = new _IIPPacket["default"]();
        var rt = packet.parse(msg, offset, ends);

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
                  this.IIPEventPropertyUpdated(packet.resourceId, packet.methodIndex, packet.content);
                  break;

                case _IIPPacketEvent["default"].EventOccurred:
                  this.IIPEventEventOccurred(packet.resourceId, packet.methodIndex, packet.content);
                  break;

                case _IIPPacketEvent["default"].ChildAdded:
                  this.IIPEventChildAdded(packet.resourceId, packet.childId);
                  break;

                case _IIPPacketEvent["default"].ChildRemoved:
                  this.IIPEventChildRemoved(packet.resourceId, packet.childId);
                  break;

                case _IIPPacketEvent["default"].Renamed:
                  this.IIPEventRenamed(packet.resourceId, packet.content);
                  break;

                case _IIPPacketEvent["default"].AttributesUpdated:
                  this.IIPEventAttributesUpdated(packet.resourceId, packet.content);
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
                  this.IIPRequestCreateResource(packet.callbackId, packet.storeId, packet.resourceId, packet.content);
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
                  this.IIPRequestRenameResource(packet.callbackId, packet.resourceId, packet.content);
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
                // Invoke

                case _IIPPacketAction["default"].InvokeFunctionArrayArguments:
                  this.IIPRequestInvokeFunctionArrayArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                  break;

                case _IIPPacketAction["default"].InvokeFunctionNamedArguments:
                  this.IIPRequestInvokeFunctionNamedArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                  break;

                case _IIPPacketAction["default"].GetProperty:
                  this.IIPRequestGetProperty(packet.callbackId, packet.resourceId, packet.methodIndex);
                  break;

                case _IIPPacketAction["default"].GetPropertyIfModified:
                  this.IIPRequestGetPropertyIfModifiedSince(packet.callbackId, packet.resourceId, packet.methodIndex, packet.resourceAge);
                  break;

                case _IIPPacketAction["default"].SetProperty:
                  this.IIPRequestSetProperty(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                  break;

                case _IIPPacketAction["default"].ResourceHistory:
                  this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
                  break;

                case _IIPPacketAction["default"].QueryLink:
                  this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
                  break;
                // Attribute

                case _IIPPacketAction["default"].GetAllAttributes:
                  this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                  break;

                case _IIPPacketAction["default"].UpdateAllAttributes:
                  this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                  break;

                case _IIPPacketAction["default"].ClearAllAttributes:
                  this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                  break;

                case _IIPPacketAction["default"].GetAttributes:
                  this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                  break;

                case _IIPPacketAction["default"].UpdateAttributes:
                  this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                  break;

                case _IIPPacketAction["default"].ClearAttributes:
                  this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                  break;
              }
            } else if (packet.command == _IIPPacketCommand["default"].Reply) {
              switch (packet.action) {
                case _IIPPacketAction["default"].AttachResource:
                  this.IIPReply(packet.callbackId, packet.classId, packet.resourceAge, packet.resourceLink, packet.content);
                  break;

                case _IIPPacketAction["default"].ReattachResource:
                  this.IIPReply(packet.callbackId, packet.resourceAge, packet.content);
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
                  this.IIPReply(packet.callbackId, _ResourceTemplate["default"].parse(packet.content));
                  break;

                case _IIPPacketAction["default"].QueryLink:
                case _IIPPacketAction["default"].ResourceChildren:
                case _IIPPacketAction["default"].ResourceParents:
                case _IIPPacketAction["default"].ResourceHistory:
                  this.IIPReply(packet.callbackId, packet.content);
                  break;

                case _IIPPacketAction["default"].InvokeFunctionArrayArguments:
                case _IIPPacketAction["default"].InvokeFunctionNamedArguments:
                  this.IIPReplyInvoke(packet.callbackId, packet.content);
                  break;

                case _IIPPacketAction["default"].GetProperty:
                  this.IIPReply(packet.callbackId, packet.content);
                  break;

                case _IIPPacketAction["default"].GetPropertyIfModified:
                  this.IIPReply(packet.callbackId, packet.content);
                  break;

                case _IIPPacketAction["default"].SetProperty:
                  this.IIPReply(packet.callbackId);
                  break;
                // Attribute

                case _IIPPacketAction["default"].GetAllAttributes:
                case _IIPPacketAction["default"].GetAttributes:
                  this.IIPReply(packet.callbackId, packet.content);
                  break;

                case _IIPPacketAction["default"].UpdateAllAttributes:
                case _IIPPacketAction["default"].UpdateAttributes:
                case _IIPPacketAction["default"].ClearAllAttributes:
                case _IIPPacketAction["default"].ClearAttributes:
                  this.IIPReply(packet.callbackId);
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
                  this.IIPReportChunk(packet.callbackId, packet.content);
                  break;
              }
            }
          } catch (ex) {
            console.log("Esyur Error ", ex);
          }
        }
      } else {
        var rt = authPacket.parse(msg, offset, ends);

        if (rt <= 0) {
          data.holdAllFor(msg, ends - rt);
          return ends;
        } else {
          offset += rt;

          if (this.session.localAuthentication.type == _AuthenticationType["default"].Host) {
            if (authPacket.command == _IIPAuthPacketCommand["default"].Declare) {
              if (authPacket.remoteMethod == _IIPAuthPacketMethod["default"].credentials && authPacket.localMethod == _IIPAuthPacketMethod["default"].None) {
                this.session.remoteAuthentication.username = authPacket.remoteUsername;
                this.remoteNonce = authPacket.remoteNonce;
                this.domain = authPacket.domain;
                this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
              }
            } else if (authPacket.command == _IIPAuthPacketCommand["default"].Action) {
              if (authPacket.action == _IIPAuthPacketAction["default"].AuthenticateHash) {
                var remoteHash = authPacket.hash;
                this.server.membership.getPassword(this.session.remoteAuthentication.username, this.domain).then(function (pw) {
                  if (pw != null) {
                    //var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));
                    var hash = _SHA["default"].compute((0, _DataConverter.BL)().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toDC());

                    if (hash.sequenceEqual(remoteHash)) {
                      // send our hash
                      //var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
                      var localHash = _SHA["default"].compute((0, _DataConverter.BL)().addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toDC());

                      this.sendParams().addUint8(0).addUint8Array(localHash).done();
                      this.readyToEstablish = true;
                    } else {
                      // incorrect password
                      this.sendParams().addUint8(0xc0).addInt32(_ExceptionCode["default"].AccessDenied).addUint16(13).addString("Access Denied").done();
                    }
                  }
                });
              } else if (authPacket.action == _IIPAuthPacketAction["default"].NewConnection) {
                if (readyToEstablish) {
                  this.session.id = this.generateNonce(32); // new DC(32);
                  //window.crypto.getRandomValues(this.session.id);

                  this.sendParams().addUint8(0x28).addUint8Array(this.session.id).done();
                  this.ready = true;
                  this.openReply.trigger(this);
                  this.openReply = null; //this._emit("ready", this);
                }
              }
            }
          } else if (this.session.localAuthentication.type == _AuthenticationType["default"].Client) {
            if (authPacket.command == _IIPAuthPacketCommand["default"].Acknowledge) {
              this.remoteNonce = authPacket.remoteNonce; // send our hash
              //var localHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.localPassword)
              //    .addUint8Array(this.localNonce)
              //    .addUint8Array(this.remoteNonce).toArray()));

              var localHash = _SHA["default"].compute((0, _DataConverter.BL)().addUint8Array(this.localPassword).addUint8Array(this.localNonce).addUint8Array(this.remoteNonce).toDC());

              this.sendParams().addUint8(0).addUint8Array(localHash).done();
            } else if (authPacket.command == _IIPAuthPacketCommand["default"].Action) {
              if (authPacket.action == _IIPAuthPacketAction["default"].AuthenticateHash) {
                // check if the server knows my password
                //var remoteHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.remoteNonce)
                //    .addUint8Array(this.localNonce)
                //    .addUint8Array(this.localPassword).toArray()
                //));
                var remoteHash = _SHA["default"].compute((0, _DataConverter.BL)().addUint8Array(this.remoteNonce).addUint8Array(this.localNonce).addUint8Array(this.localPassword).toDC());

                if (remoteHash.sequenceEqual(authPacket.hash)) {
                  // send establish request
                  this.sendParams().addUint8(0x20).addUint16(0).done();
                } else {
                  this.sendParams().addUint8(0xc0).addUint32(_ExceptionCode["default"].ChallengeFailed).addUint16(16).addString("Challenge Failed").done();
                }
              } else if (authPacket.action == _IIPAuthPacketAction["default"].ConnectionEstablished) {
                this.session.id = authPacket.sessionId;
                this.ready = true;
                this.openReply.trigger(this);
                this.openReply = null; //this._emit("ready", this);
              }
            } else if (authPacket.command == _IIPAuthPacketCommand["default"].Error) {
              this.openReply.triggerError(1, authPacket.errorCode, authPacket.errorMessage);
              this.openReply = null; //this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);

              this.close();
            }
          }
        }
      }

      return offset; //if (offset < ends)
      //    this.processPacket(msg, offset, ends, data);
    }
  }, {
    key: "receive",
    value: function receive(data) {
      var msg = data.read();
      var offset = 0;
      var ends = msg.length;
      var packet = this.packet; //console.log("Data");

      while (offset < ends) {
        offset = this.processPacket(msg, offset, ends, data);
      }
    }
  }, {
    key: "close",
    value: function close(event) {
      this.ready = false;
      this.readyToEstablish = false;
      this.requests.values.forEach(function (x) {
        return x.triggerError(AsyncException(_ErrorType["default"].Management, 0, "Connection closed"));
      });
      this.resourceRequests.values.forEach(function (x) {
        return x.triggerError(new AsyncException(_ErrorType["default"].Management, 0, "Connection closed"));
      });
      this.templateRequests.values.forEach(function (x) {
        return x.triggerError(new AsyncException(_ErrorType["default"].Management, 0, "Connection closed"));
      });
      this.resources.values.forEach(function (x) {
        return x.suspend();
      });
      this.requests.clear();
      this.resourceRequests.clear();
      this.templateRequests.clear(); //        Warehouse.remove(this);

      if (this.socket.readyState != this.socket.CLOSED) {
        this.socket.close();
      }

      this._emit("close", event);
    }
  }, {
    key: "reconnect",
    value: function () {
      var _reconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var bag, i, index;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.connect();

              case 3:
                if (!_context.sent) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 4;
                bag = new AsyncBag();

                for (i = 0; i < this.resources.keys.length; i++) {
                  index = this.resources.keys[i];
                  bag.add(this.fetch(index));
                }

                bag.seal();
                _context.next = 10;
                return bag;

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t1 = _context["catch"](0);
                return _context.abrupt("return", false);

              case 20:
                return _context.abrupt("return", true);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17], [4, 12]]);
      }));

      function reconnect() {
        return _reconnect.apply(this, arguments);
      }

      return reconnect;
    }()
  }, {
    key: "hold",
    value: function hold() {
      this.holdSending = true;
    }
  }, {
    key: "unhold",
    value: function unhold() {
      if (this.holdSending) {
        this.holdSending = false;
        var msg = this.sendBuffer.read();
        if (msg == null || msg.length == 0) return;
        this.socket.send(msg);
      }
    }
  }, {
    key: "trigger",
    value: function trigger(_trigger) {
      if (_trigger == _IResource.ResourceTrigger.Open) {
        var _this$instance$attrib = this.instance.attributes.toObject(),
            _this$instance$attrib2 = _this$instance$attrib.domain,
            domain = _this$instance$attrib2 === void 0 ? null : _this$instance$attrib2,
            _this$instance$attrib3 = _this$instance$attrib.secure,
            secure = _this$instance$attrib3 === void 0 ? false : _this$instance$attrib3,
            _this$instance$attrib4 = _this$instance$attrib.username,
            username = _this$instance$attrib4 === void 0 ? "guest" : _this$instance$attrib4,
            _this$instance$attrib5 = _this$instance$attrib.password,
            password = _this$instance$attrib5 === void 0 ? "" : _this$instance$attrib5,
            _this$instance$attrib6 = _this$instance$attrib.checkInterval,
            checkInterval = _this$instance$attrib6 === void 0 ? 30 : _this$instance$attrib6,
            _this$instance$attrib7 = _this$instance$attrib.connectionTimeout,
            connectionTimeout = _this$instance$attrib7 === void 0 ? 600 : _this$instance$attrib7,
            _this$instance$attrib8 = _this$instance$attrib.revivingTime,
            revivingTime = _this$instance$attrib8 === void 0 ? 120 : _this$instance$attrib8,
            _this$instance$attrib9 = _this$instance$attrib.debug,
            debug = _this$instance$attrib9 === void 0 ? false : _this$instance$attrib9;

        this.debug = debug;
        this.checkInterval = checkInterval * 1000; // check every 30 seconds

        this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)

        this.revivingTime = revivingTime * 1000; // 2 minutes

        var pw = _DataConverter.DC.stringToBytes(password);

        var host = this.instance.name.split(':');
        var address = host[0];
        var port = parseInt(host[1]);
        return this.connect(secure, address, port, username, pw, domain);
      }

      return new _AsyncReply["default"](true);
    }
  }, {
    key: "connect",
    value: function connect(secure, hostname, port, username, password, domain) {
      this.openReply = new _AsyncReply["default"]();

      if (secure !== undefined) {
        this.session.localAuthentication.domain = domain;
        this.session.localAuthentication.username = username;
        this.localPassword = password; //this.url = `ws${secure ? 's' : ''}://${this.instance.name}`;

        this.url = "ws".concat(secure ? 's' : '', "://").concat(hostname, ":").concat(port);
      } //this.debug = debug;


      this.totalReceived = 0;
      this.totalSent = 0;
      this.lastAction = Date.now();
      this.socket = new WebSocket(this.url, "iip");
      this.socket.binaryType = "arraybuffer";
      this.socket.connection = this;
      this.socket.networkBuffer = new _NetworkBuffer["default"]();
      this.sendBuffer = new _NetworkBuffer["default"]();

      var un = _DataConverter.DC.stringToBytes(this.session.localAuthentication.username);

      var dmn = _DataConverter.DC.stringToBytes(this.session.localAuthentication.domain);

      var self = this;

      this.socket.onopen = function () {
        var bl = (0, _DataConverter.BL)();
        bl.addUint8(0x60).addUint8(dmn.length).addUint8Array(dmn).addUint8Array(self.localNonce).addUint8(un.length).addUint8Array(un);
        self.send(bl.toArray());
      };

      this.socket.onmessage = function (msg) {
        //console.log("Rec", msg.data.byteLength);
        this.networkBuffer.writeAll(msg.data);
        self.lastAction = new Date();
        self.hold();

        while (this.networkBuffer.available > 0 && !this.networkBuffer["protected"]) {
          // try
          // {
          self.receive(this.networkBuffer); // }
          // catch(e) 
          //{
          //  console.log(e);
          //}
        }

        self.unhold();
      };

      this.socket.onclose = function (event) {
        if (this.connection.openReply) {
          this.connection.openReply.triggerError(0, 0, "Host not reachable");
          this.connection.openReply = null;
        }

        self.close(event);
      };

      return this.openReply;
    }
  }, {
    key: "reconnect",
    value: function reconnect() {}
  }, {
    key: "put",
    value: function put(resource) {
      this.resources[parseInt(resource.instance.name)] = resource;
      return true;
    }
  }, {
    key: "remove",
    value: function remove(resource) {} // nothing to do (IStore interface)
    // Protocol Implementation

  }, {
    key: "sendRequest",
    value: function sendRequest(action) {
      var reply = new _AsyncReply["default"]();
      this.callbackCounter++;
      this.requests.set(this.callbackCounter, reply);
      return this.sendParams(reply).addUint8(0x40 | action).addUint32(this.callbackCounter);
    }
  }, {
    key: "sendDetachRequest",
    value: function sendDetachRequest(instanceId) {
      try {
        return this.sendRequest(_IIPPacketAction["default"].DetachResource).addUint32(instanceId).done();
      } catch (ex) {
        return null;
      }
    }
  }, {
    key: "sendInvokeByArrayArguments",
    value: function sendInvokeByArrayArguments(instanceId, index, parameters) {
      var reply = new _AsyncReply["default"]();

      var pb = _Codec["default"].composeVarArray(parameters, this, true);

      this.callbackCounter++;
      this.sendParams().addUint8(0x40 | _IIPPacketAction["default"].InvokeFunctionArrayArguments).addUint32(this.callbackCounter).addUint32(instanceId).addUint8(index).addUint8Array(pb).done();
      this.requests.set(this.callbackCounter, reply);
      return reply;
    }
  }, {
    key: "sendInvokeByNamedArguments",
    value: function sendInvokeByNamedArguments(instanceId, index, parameters) {
      var reply = new _AsyncReply["default"]();

      var pb = _Codec["default"].composeStructure(parameters, this, true, true, true);

      this.callbackCounter++;
      this.sendParams().addUint8(0x40 | _IIPPacketAction["default"].InvokeFunctionNamedArguments).addUint32(this.callbackCounter).addUint32(instanceId).addUint8(index).addUint8Array(pb).done();
      this.requests.set(this.callbackCounter, reply);
      return reply;
    }
  }, {
    key: "sendError",
    value: function sendError(type, callbackId, errorCode) {
      var errorMessage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

      var msg = _DataConverter.DC.stringToBytes(errorMessage);

      if (type == _ErrorType["default"].Management) this.sendParams().addUint8(0xC0 | _IIPPacketReport["default"].ManagementError).addUint32(callbackId).addUint16(errorCode).done();else if (type == _ErrorType["default"].Exception) this.sendParams().addUint8(0xC0 | _IIPPacketReport["default"].ExecutionError).addUint32(callbackId).addUint16(errorCode).addUint16(msg.length).addUint8Array(msg).done();
    }
  }, {
    key: "sendProgress",
    value: function sendProgress(callbackId, value, max) {
      this.sendParams().addUint8(0xC0 | _IIPPacketReport["default"].ProgressReport).addUint32(callbackId).addInt32(value).addInt32(max).done();
    }
  }, {
    key: "sendChunk",
    value: function sendChunk(callbackId, chunk) {
      var c = _Codec["default"].compose(chunk, this, true);

      this.sendParams().addUint8(0xC0 | _IIPPacketReport["default"].ChunkStream).addUint32(callbackId).addUint8Array(c).done();
    }
  }, {
    key: "IIPReply",
    value: function IIPReply(callbackId) {
      var results = Array.prototype.slice.call(arguments, 1);
      var req = this.requests.item(callbackId);
      this.requests.remove(callbackId);
      req.trigger(results);
    }
  }, {
    key: "IIPReplyInvoke",
    value: function IIPReplyInvoke(callbackId, result) {
      var req = this.requests.item(callbackId);

      if (req != null) {
        this.requests.remove(callbackId);

        _Codec["default"].parse(result, 0, {}, this).then(function (rt) {
          req.trigger(rt);
        });
      }
    }
  }, {
    key: "IIPReportError",
    value: function IIPReportError(callbackId, errorType, errorCode, errorMessage) {
      var req = this.requests.item(callbackId);

      if (request != null) {
        this.requests.remove(callbackId);
        req.triggerError(errorType, errorCode, errorMessage);
      }
    }
  }, {
    key: "IIPReportProgress",
    value: function IIPReportProgress(callbackId, type, value, max) {
      var req = this.requests.item(callbackId);
      req === null || req === void 0 ? void 0 : req.triggerProgress(type, value, max);
    }
  }, {
    key: "IIPReportChunk",
    value: function IIPReportChunk(callbackId, data) {
      var req = this.requests.item(callbackId);

      if (req != null) {
        _Codec["default"].parse(data, 0, {}, this).then(function (x) {
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
      if (this.resources[resourceId]) {
        var r = this.resources[resourceId];
        delete this.resources[resourceId];
        r.destroy();
      }
    }
  }, {
    key: "IIPEventPropertyUpdated",
    value: function IIPEventPropertyUpdated(resourceId, index, content) {
      var self = this;
      this.fetch(resourceId).then(function (r) {
        var pt = r.instance.template.getPropertyTemplateByIndex(index);
        if (pt == null) return; // ft found, fi not found, this should never happen
        // push to the queue to gaurantee serialization

        var item = new _AsyncReply["default"]();
        self.queue.add(item);

        _Codec["default"].parse(content, 0, {}, self).then(function (args) {
          item.trigger(new _DistributedResourceQueueItem["default"](r, _DistributedResourceQueueItemType["default"].Propery, args, index));
        }).error(function (ex) {
          self.queue.remove(item);
          console.log("Esyur Property Error", ex);
        });
      });
    }
  }, {
    key: "IIPEventEventOccurred",
    value: function IIPEventEventOccurred(resourceId, index, content) {
      var self = this;
      this.fetch(resourceId).then(function (r) {
        var et = r.instance.template.getEventTemplateByIndex(index);
        if (et == null) return; // ft found, fi not found, this should never happen
        // push to the queue to guarantee serialization

        var item = new _AsyncReply["default"]();
        self.queue.add(item);

        _Codec["default"].parseVarArray(content, 0, content.length, self).then(function (args) {
          item.trigger(new _DistributedResourceQueueItem["default"](r, _DistributedResourceQueueItemType["default"].Event, args, index));
        }).error(function (ex) {
          self.queue.remove(item);
          console.log("Esyur Event Error", ex);
        });
      });
    }
  }, {
    key: "IIPEventChildAdded",
    value: function IIPEventChildAdded(resourceId, childId) {
      var self = this;
      this.fetch(resourceId).then(function (parent) {
        self.fetch(childId).then(function (child) {
          parent.instance.children.add(child);
        });
      });
    }
  }, {
    key: "IIPEventChildRemoved",
    value: function IIPEventChildRemoved(resourceId, childId) {
      var self = this;
      this.fetch(resourceId).then(function (parent) {
        self.fetch(childId).then(function (child) {
          parent.instance.children.remove(child);
        });
      });
    }
  }, {
    key: "IIPEventRenamed",
    value: function IIPEventRenamed(resourceId, name) {
      this.fetch(resourceId).then(function (resource) {
        resource.instance.attributes.set("name", name.getString(0, name.length));
      });
    }
  }, {
    key: "IIPEventAttributesUpdated",
    value: function IIPEventAttributesUpdated(resourceId, attributes) {
      var self = this;
      this.fetch(resourceId).then(function (resource) {
        var attrs = attributes.getStringArray(0, attributes.length);
        self.getAttributes(resource, attrs).then(function (s) {
          resource.instance.setAttributes(s);
        });
      });
    }
  }, {
    key: "sendReply",
    value: function sendReply(action, callbackId) {
      return this.sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(evt) {
      return this.sendParams().addUint8(evt);
    }
  }, {
    key: "IIPRequestAttachResource",
    value: function IIPRequestAttachResource(callback, resourceId) {
      //var sl = this.sendParams();
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          if (r.instance.applicable(self.session, _ActionType["default"].Attach, null) == _Ruling["default"].Denied) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AttachDenied);
            return;
          } // reply ok


          var link = _DataConverter.DC.stringToBytes(r.instance.link);

          if (r instanceof _DistributedResource["default"]) self.sendReply(_IIPPacketAction["default"].AttachResource, callback).addUint8Array(r.instance.template.classId.value).addUint64(r.instance.age).addUint16(link.length).addUint8Array(link).addUint8Array(_Codec["default"].composePropertyValueArray(r._serialize(), self, true)).done();else self.sendReply(_IIPPacketAction["default"].AttachResource, callback).addUint8Array(r.instance.template.classId.value).addUint64(r.instance.age).addUint16(link.length).addUint8Array(link).addUint8Array(_Codec["default"].composePropertyValueArray(r.instance.serialize(), self, true)).done();
          r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
          r.instance.on("ResourceModified", self.instance_propertyModified, self);
          r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self);
        } else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestReattachResource",
    value: function IIPRequestReattachResource(callback, resourceId, resourceAge) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (res != null) {
          r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
          r.instance.on("ResourceModified", self.instance_propertyModified, self);
          r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self); // reply ok

          self.sendReply(_IIPPacketAction["default"].ReattachResource, callback).addUint64(r.instance.age).addUint8Array(_Codec["default"].composePropertyValueArray(r.instance.serialize(), self, true)).done();
        } else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestDetachResource",
    value: function IIPRequestDetachResource(callback, resourceId) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          r.instance.off("ResourceEventOccurred", self.instance_eventOccurred);
          r.instance.off("ResourceModified", self.instance_propertyModified);
          r.instance.off("ResourceDestroyed", self.instance_resourceDestroyed); // reply ok

          self.sendReply(_IIPPacketAction["default"].DetachResource, callback).done();
        } else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestCreateResource",
    value: function IIPRequestCreateResource(callback, storeId, parentId, content) {
      var self = this;

      _Warehouse["default"].getById(storeId).then(function (store) {
        if (store == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].StoreNotFound);
          return;
        }

        if (!(store instanceof _IStore2["default"])) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceIsNotStore);
          return;
        } // check security


        if (store.instance.applicable(self.session, _ActionType["default"].CreateResource, null) != _Ruling["default"].Allowed) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].CreateDenied);
          return;
        }

        _Warehouse["default"].getById(parentId).then(function (parent) {
          // check security
          if (parent != null) if (parent.instance.applicable(self.session, _ActionType["default"].AddChild, null) != _Ruling["default"].Allowed) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
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
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ClassNotFound);
            return;
          }

          _Codec["default"].parseVarArray(content, offset, cl, self).then(function (parameters) {
            offset += cl;
            cl = content.getUint32(offset);

            _Codec["default"].parseStructure(content, offset, cl, self).then(function (attributes) {
              offset += cl;
              cl = content.length - offset;

              _Codec["default"].parseStructure(content, offset, cl, self).then(function (values) {
                var resource = new (Function.prototype.bind.apply(type, values))();

                _Warehouse["default"].put(resource, name, store, parent);

                self.sendReply(_IIPPacketAction["default"].CreateResource, callback).addUint32(resource.Instance.Id).done();
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
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        if (r.instance.store.instance.applicable(session, _ActionType["default"].Delete, null) != _Ruling["default"].Allowed) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].DeleteDenied);
          return;
        }

        if (_Warehouse["default"].remove(r)) self.sendReply(_IIPPacketAction["default"].DeleteResource, callback).done();else self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].DeleteFailed);
      });
    }
  }, {
    key: "IIPRequestTemplateFromClassName",
    value: function IIPRequestTemplateFromClassName(callback, className) {
      var self = this;

      _Warehouse["default"].getTemplateByClassName(className).then(function (t) {
        if (t != null) self.sendReply(_IIPPacketAction["default"].TemplateFromClassName, callback).addUint32(t.content.length).addUint8Array(t.content).done();else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestTemplateFromClassId",
    value: function IIPRequestTemplateFromClassId(callback, classId) {
      var self = this;

      _Warehouse["default"].getTemplateByClassId(classId).then(function (t) {
        if (t != null) self.sendReply(_IIPPacketAction["default"].TemplateFromClassId, callback).addUint32(t.content.length).addUint8Array(t.content).done();else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestTemplateFromResourceId",
    value: function IIPRequestTemplateFromResourceId(callback, resourceId) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) self.sendReply(_IIPPacketAction["default"].TemplateFromResourceId, callback).addUint32(r.instance.template.content.length).addUint8Array(r.instance.template.content).done();else {
          // reply failed
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].TemplateNotFound);
        }
      });
    }
  }, {
    key: "IIPRequestInvokeFunctionArrayArguments",
    value: function IIPRequestInvokeFunctionArrayArguments(callback, resourceId, index, content) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          _Codec["default"].parseVarArray(content, 0, content.length, self).then(function (args) {
            var ft = r.instance.template.getFunctionTemplateByIndex(index);

            if (ft != null) {
              if (r instanceof _DistributedResource["default"]) {
                var rt = r._invokeByArrayArguments(index, args);

                if (rt != null) {
                  rt.then(function (res) {
                    self.sendReply(_IIPPacketAction["default"].InvokeFunctionArrayArguments, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
                  });
                } else {// function not found on a distributed object
                }
              } else {
                var fi = r[ft.name];

                if (r.instance.applicable(self.session, _ActionType["default"].Execute, ft) == _Ruling["default"].Denied) {
                  self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].InvokeDenied);
                  return;
                }

                if (fi instanceof Function) {
                  var itt = /*#__PURE__*/_regenerator["default"].mark(function itt() {
                    return _regenerator["default"].wrap(function itt$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, itt);
                  });

                  args.push(self);
                  var rt = fi.apply(r, args);
                  ; // Is iterator ?

                  if (rt[Symbol.iterator] instanceof Function) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = rt[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;
                        self.sendChunk(callback, v);
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                          _iterator["return"]();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }

                    self.sendReply(_IIPPacket["default"].IIPPacketAction.InvokeFunctionArrayArguments, callback).addUint8(DataType.Void).done();
                  } else if (rt instanceof _AsyncReply["default"]) {
                    rt.then(function (res) {
                      self.sendReply(_IIPPacketAction["default"].InvokeFunctionArrayArguments, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
                    });
                  } else {
                    self.sendReply(_IIPPacketAction["default"].InvokeFunctionArrayArguments, callback).addUint8Array(_Codec["default"].compose(rt, self)).done();
                  }
                } else {// ft found, fi not found, this should never happen
                }
              }
            } else {// no function at this index
              }
          });
        } else {// no resource with this id
        }
      });
    }
  }, {
    key: "IIPRequestInvokeFunctionNamedArguments",
    value: function IIPRequestInvokeFunctionNamedArguments(callback, resourceId, index, content) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          _Codec["default"].parseStructure(content, 0, content.length, self).then(function (namedArgs) {
            var ft = r.instance.template.getFunctionTemplateByIndex(index);

            if (ft != null) {
              if (r instanceof _DistributedResource["default"]) {
                var rt = r._invokeByNamedArguments(index, namedArgs);

                if (rt != null) {
                  rt.then(function (res) {
                    self.sendReply(_IIPPacketAction["default"].InvokeFunctionNamedArguments, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
                  });
                } else {// function not found on a distributed object
                }
              } else {
                var fi = r[ft.name];

                if (r.instance.applicable(self.session, _ActionType["default"].Execute, ft) == _Ruling["default"].Denied) {
                  self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].InvokeDenied);
                  return;
                }

                if (fi instanceof Function) {
                  var pi = _ResourceTemplate["default"].getFunctionParameters(fi);

                  var args = new Array(pi.length);

                  for (var i = 0; i < pi.length; i++) {
                    if (namedArgs[pi[i]] !== undefined) args[i] = namedArgs[pi[i]];
                  } // pass this to the last argument if it is undefined


                  if (args[args.length - 1] === undefined) args[args.length - 1] = self;
                  var rt = fi.apply(r, args); // Is iterator ?

                  if (rt[Symbol.iterator] instanceof Function) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = rt[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var v = _step2.value;
                        self.sendChunk(callback, v);
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                          _iterator2["return"]();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }

                    self.sendReply(_IIPPacket["default"].IIPPacketAction.InvokeFunctionNamedArguments, callback).addUint8(DataType.Void).done();
                  } else if (rt instanceof _AsyncReply["default"]) {
                    rt.then(function (res) {
                      self.sendReply(_IIPPacketAction["default"].InvokeFunctionNamedArguments, callback).addUint8Array(_Codec["default"].compose(res, self)).done();
                    });
                  } else {
                    self.sendReply(_IIPPacketAction["default"].InvokeFunctionNamedArguments, callback).addUint8Array(_Codec["default"].compose(rt, self)).done();
                  }
                } else {// ft found, fi not found, this should never happen
                }
              }
            } else {// no function at this index
              }
          });
        } else {// no resource with this id
        }
      });
    }
  }, {
    key: "IIPRequestGetProperty",
    value: function IIPRequestGetProperty(callback, resourceId, index) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var pt = r.instance.template.getFunctionTemplateByIndex(index);

          if (pt != null) {
            if (r instanceof _DistributedResource["default"]) {
              self.sendReply(_IIPPacketAction["default"].GetProperty, callback).addUint8Array(_Codec["default"].compose(r._get(pt.index), self)).done();
            } else {
              var pv = r[pt.name];
              self.sendReply(_IIPPacketAction["default"].GetProperty).addUint8Array(_Codec["default"].compose(pv, self)).done();
            }
          } else {// pt not found
          }
        } else {// resource not found
          }
      });
    }
  }, {
    key: "IIPRequestGetPropertyIfModifiedSince",
    value: function IIPRequestGetPropertyIfModifiedSince(callback, resourceId, index, age) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var pt = r.instance.template.getFunctionTemplateByIndex(index);

          if (pt != null) {
            if (r.instance.getAge(index) > age) {
              var pv = r[pt.name];
              self.sendReply(_IIPPacketAction["default"].GetPropertyIfModified, callback).addUint8Array(_Codec["default"].compose(pv, self)).done();
            } else {
              self.sendReply(_IIPPacketAction["default"].GetPropertyIfModified, callback).addUint8(DataType.NotModified).done();
            }
          } else {// pt not found
          }
        } else {// resource not found
          }
      });
    }
  }, {
    key: "IIPRequestSetProperty",
    value: function IIPRequestSetProperty(callback, resourceId, index, content) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r != null) {
          var pt = r.instance.template.getPropertyTemplateByIndex(index);

          if (pt != null) {
            _Codec["default"].parse(content, 0, {}, this).then(function (value) {
              if (r instanceof _DistributedResource["default"]) {
                // propagation
                r._set(index, value).then(function (x) {
                  self.sendReply(_IIPPacketAction["default"].SetProperty, callback).done();
                }).error(function (x) {
                  self.sendError(x.type, callback, x.code, x.message).done();
                });
              } else {
                if (r.instance.applicable(self.session, _ActionType["default"].SetProperty, pt) == _Ruling["default"].Denied) {
                  self.sendError(_AsyncReply["default"].ErrorType.Exception, callback, _ExceptionCode["default"].SetPropertyDenied);
                  return;
                }

                try {
                  if (r[pt.name] instanceof _DistributedPropertyContext["default"]) value = new _DistributedPropertyContext["default"](this, value);
                  r[pt.name] = value;
                  self.sendReply(_IIPPacketAction["default"].SetProperty, callback).done();
                } catch (ex) {
                  self.sendError(_AsyncReply["default"].ErrorType.Exception, callback, 0, ex.toString()).done();
                }
              }
            });
          } else {
            // property not found
            self.sendError(_AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].PropertyNotFound).done();
          }
        } else {
          // resource not found
          self.sendError(_AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].PropertyNotFound).done();
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

            self.sendReply(_IIPPacketAction["default"].ResourceHistory, callback).addUint8Array(history).done();
          });
        }
      });
    }
  }, {
    key: "IIPRequestQueryResources",
    value: function IIPRequestQueryResources(callback, resourceLink) {
      var self = this;

      _Warehouse["default"].query(resourceLink).then(function (resources) {
        var list = resources.filter(function (r) {
          return r.instance.applicable(self.session, _ActionType["default"].Attach, null) != _Ruling["default"].Denied;
        });
        if (list.length == 0) self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);else self.sendReply(_IIPPacketAction["default"].QueryLink, callback).addUint8Array(_Codec["default"].composeResourceArray(list, self, true)).done();
      });
    }
  }, {
    key: "create",
    value: function create(store, parent, className, parameters, attributes, values) {
      var reply = new _AsyncReply["default"]();

      var sb = _DataConverter.DC.stringToBytes(className);

      var pkt = (0, _DataConverter.BL)().addUint32(store.instance.id).addUint32(parent.instance.id).addUint32(sb.length).addUint8Array(sb).addUint8Array(_Codec["default"].composeVarArray(parameters, this, true)).addUint8Array(_Codec["default"].composeStructure(attributes, this, true, true, true)).addUint8Array(_Codec["default"].composeStructure(values, this));
      pkt.addUint32(pkt.length, 8);
      this.sendRequest(_IIPPacket["default"].IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function (args) {
        var rid = args[0];
        self.fetch(rid).then(function (r) {
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

      var sb = _DataConverter.DC.stringToBytes(resourceLink);

      this.sendRequest(_IIPPacketAction["default"].QueryLink).addUint16(sb.length).addUint8Array(sb).done().then(function (args) {
        _Codec["default"].parseResourceArray(args[0], 0, args[0].length, self).then(function (resources) {
          reply.trigger(resources);
        });
      }).error(function (ex) {
        reply.triggerError(ex);
      });
      return reply;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(classId) {
      if (this.templates.contains(classId)) return new _AsyncReply["default"](this.templates.item(classId));else if (this.templateRequests.contains(classId)) return this.templateRequests.item(classId);
      var reply = new _AsyncReply["default"]();
      this.templateRequests.add(classId.valueOf(), reply);
      var self = this;
      this.sendRequest(_IIPPacketAction["default"].TemplateFromClassId).addUint8Array(classId.value).done().then(function (rt) {
        self.templateRequests.remove(classId);
        self.templates.add(rt[0].classId.valueOf(), rt[0]);

        _Warehouse["default"].putTemplate(rt[0]);

        reply.trigger(rt[0]);
      });
      return reply;
    } // IStore interface

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
        this.sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
                      .addUint16(.then(function (rt) {
          delete self.pathRequests[path];
            self.fetch(rt[1]).then(function (r) {
              reply.trigger(r);
          });
      });
          return reply;
      */
    }
  }, {
    key: "retrieve",
    value: function retrieve(iid) {
      for (var r in this.resources) {
        if (this.resources[r].instance.id == iid) return new _AsyncReply["default"](r);
      }

      return new _AsyncReply["default"](null);
    } // Get a resource from the other end

  }, {
    key: "fetch",
    value: function fetch(id) {
      var resource = this.resources.item(id);
      var request = htis.resourceRequests.item(id);

      if (request != null) {
        if (resource != null) // dig for dead locks            // or not
          return new _AsyncReply["default"](resource);else return request;
      } else if (resource != null && !resource._p.suspended) {
        return new _AsyncReply["default"](resource);
      }

      var reply = new _AsyncReply["default"]();
      this.resourceRequests.set(id, reply);
      var self = this;
      this.sendRequest(_IIPPacketAction["default"].AttachResource).addUint32(id).done().then(function (rt) {
        var dr = resource !== null && resource !== void 0 ? resource : new _DistributedResource["default"](self, id, rt[1], rt[2]);
        self.getTemplate(rt[0]).then(function (tmp) {
          // ClassId, ResourceAge, ResourceLink, Content
          if (resource == null) _Warehouse["default"].put(dr, id.toString(), self, null, tmp);

          _Codec["default"].parsePropertyValueArray(rt[3], 0, rt[3].length, self).then(function (ar) {
            dr._attach(ar);

            self.resourceRequests.remove(id);
            reply.trigger(dr);
          });
        });
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
        this.sendRequest(_IIPPacketAction["default"].ResourceHistory).addUint32(resource._p.instanceId).addDateTime(fromDate).addDateTime(toDate).done().then(function (rt) {
          _Codec["default"].parseHistory(rt[0], 0, rt[0].length, resource, self).then(function (history) {
            reply.trigger(history);
          });
        });
        return reply;
      } else return new _AsyncReply["default"](null);
    }
  }, {
    key: "instance_resourceDestroyed",
    value: function instance_resourceDestroyed(resource) {
      // compose the packet
      this.sendEvent(_IIPPacketEvent["default"].ResourceDestroyed).addUint32(resource.instance.id).done();
    }
  }, {
    key: "instance_propertyModified",
    value: function instance_propertyModified(resource, name, newValue) {
      var pt = resource.instance.template.getPropertyTemplateByName(name);
      if (pt == null) return;
      this.sendEvent(_IIPPacketEvent["default"].PropertyUpdated).addUint32(resource.instance.id).addUint8(pt.index).addUint8Array(_Codec["default"].compose(newValue, this)).done();
    }
  }, {
    key: "instance_eventOccurred",
    value: function instance_eventOccurred(resource, issuer, receivers, name, args) {
      var et = resource.instance.template.getEventTemplateByName(name);
      if (et == null) return;
      if (receivers != null) if (receivers.indexOf(this.session) < 0) return;
      if (resource.instance.applicable(this.session, _ActionType["default"].ReceiveEvent, et, issuer) == _Ruling["default"].Denied) return; // compose the packet

      this.sendEvent(_IIPPacketEvent["default"].EventOccurred).addUint32(resource.instance.id).addUint8(et.index).addUint8Array(_Codec["default"].composeVarArray(args, this, true)).done();
    }
  }, {
    key: "IIPRequestAddChild",
    value: function IIPRequestAddChild(callback, parentId, childId) {
      var self = this;

      _Warehouse["default"].getById(parentId).then(function (parent) {
        if (parent == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        _Warehouse["default"].getById(childId).then(function (child) {
          if (child == null) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
            return;
          }

          if (parent.instance.applicable(self.session, _ActionType["default"].AddChild, null) != _Ruling["default"].Allowed) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
            return;
          }

          if (child.instance.applicable(self.session, _ActionType["default"].AddParent, null) != _Ruling["default"].Allowed) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AddParentDenied);
            return;
          }

          parent.instance.children.add(child);
          self.sendReply(_IIPPacketAction["default"].AddChild, callback).done(); //child.Instance.Parents
        });
      });
    }
  }, {
    key: "IIPRequestRemoveChild",
    value: function IIPRequestRemoveChild(callback, parentId, childId) {
      var self = this;

      _Warehouse["default"].getById(parentId).then(function (parent) {
        if (parent == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        _Warehouse["default"].getById(childId).then(function (child) {
          if (child == null) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
            return;
          }

          if (parent.instance.applicable(self.session, _ActionType["default"].RemoveChild, null) != _Ruling["default"].Allowed) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AddChildDenied);
            return;
          }

          if (child.instance.applicable(self.session, _ActionType["default"].RemoveParent, null) != _Ruling["default"].Allowed) {
            self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].AddParentDenied);
            return;
          }

          parent.instance.children.remove(child);
          self.sendReply(_IIPPacketAction["default"].RemoveChild, callback).done(); //child.Instance.Parents
        });
      });
    }
  }, {
    key: "IIPRequestRenameResource",
    value: function IIPRequestRenameResource(callback, resourceId, name) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        if (resource.instance.applicable(self.session, _ActionType["default"].Rename, null) != _Ruling["default"].Allowed) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].RenameDenied);
          return;
        }

        resource.instance.name = name.getString(0, name.length);
        self.sendReply(_IIPPacketAction["default"].RenameResource, callback).done();
      });
    }
  }, {
    key: "IIPRequestResourceChildren",
    value: function IIPRequestResourceChildren(callback, resourceId) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        self.sendReply(_IIPPacketAction["default"].ResourceChildren, callback).addUint8Array(_Codec["default"].composeResourceArray(resource.instance.children.toArray(), this, true)).done();
      });
    }
  }, {
    key: "IIPRequestResourceParents",
    value: function IIPRequestResourceParents(callback, resourceId) {
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (resource) {
        if (resource == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        self.sendReply(_IIPPacketAction["default"].ResourceParents, callback).addUint8Array(_Codec["default"].composeResourceArray(resource.instance.parents.toArray(), this, true)).done();
      });
    }
  }, {
    key: "IIPRequestClearAttributes",
    value: function IIPRequestClearAttributes(callback, resourceId, attributes) {
      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        if (r.instance.store.instance.applicable(self.session, _ActionType["default"].UpdateAttributes, null) != _Ruling["default"].Allowed) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeDenied);
          return;
        }

        var attrs = [];
        if (!all) attrs = attributes.getStringArray(0, attributes.length);
        if (r.instance.removeAttributes(attrs)) self.sendReply(all ? _IIPPacketAction["default"].ClearAllAttributes : _IIPPacketAction["default"].ClearAttributes, callback).done();else self.sendError(_AsyncReply["default"].ErrorType.Management, callback, _ExceptionCode["default"].UpdateAttributeFailed);
      });
    }
  }, {
    key: "IIPRequestUpdateAttributes",
    value: function IIPRequestUpdateAttributes(callback, resourceId, attributes) {
      var clearAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var self = this;

      _Warehouse["default"].getById(resourceId).then(function (r) {
        if (r == null) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].ResourceNotFound);
          return;
        }

        if (r.instance.store.instance.applicable(self.session, _ActionType["default"].UpdateAttributes, null) != _Ruling["default"].Allowed) {
          self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeDenied);
          return;
        }

        _Codec["default"].parseStructure(attributes, 0, attributes.length, this).then(function (attrs) {
          if (r.instance.setAttributes(attrs, clearAttributes)) self.sendReply(clearAttributes ? _IIPPacketAction["default"].ClearAllAttributes : _IIPPacketAction["default"].ClearAttributes, callback).done();else self.sendError(_ErrorType["default"].Management, callback, _ExceptionCode["default"].UpdateAttributeFailed);
        });
      });
    }
  }, {
    key: "getChildren",
    value: function getChildren(resource) {
      if (resource._p.connection != this) return new _AsyncReply["default"](null);
      var rt = new _AsyncReply["default"]();
      var self = this;
      this.sendRequest(_IIPPacketAction["default"].ResourceChildren).addUint32(resource._p.instanceId).done().then(function (d) {
        _Codec["default"].parseResourceArray(d, 0, d.length, self).then(function (resources) {
          rt.trigger(resources);
        }).error(function (ex) {
          rt.triggerError(ex);
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
      this.sendRequest(_IIPPacketAction["default"].ResourceParents).addUint32(resource._p.instanceId).done().then(function (d) {
        _Codec["default"].parseResourceArray(d, 0, d.length, this).then(function (resources) {
          rt.trigger(resources);
        }).error(function (ex) {
          rt.triggerError(ex);
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
      if (attributes == null) this.sendRequest(_IIPPacketAction["default"].ClearAllAttributes).addUint32(resource._p.instanceId).done().then(function (ar) {
        rt.trigger(true);
      }).error(function (ex) {
        rt.triggerError(ex);
      });else {
        var attrs = _DataConverter.DC.stringArrayToBytes(attributes);

        this.sendRequest(_IIPPacketAction["default"].ClearAttributes).addUint32(resource.instance.id).addUint32(attrs.length).addUint8Array(attrs).done().then(function (ar) {
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
      this.sendRequest(clearAttributes ? _IIPPacketAction["default"].UpdateAllAttributes : _IIPPacketAction["default"].UpdateAttributes).addUint32(resource._p.instanceId).addUint8Array(_Codec["default"].composeStructure(attributes, this, true, true, true)).done().then(function (ar) {
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
        this.sendRequest(_IIPPacketAction["default"].GetAllAttributes).addUint32(resource._p.instanceId).done().then(function (ar) {
          _Codec["default"].parseStructure(ar[0], 0, ar[0].length, this).then(function (st) {
            for (var a in st) {
              resource.instance.attributes.set(a, st[a]);
            }

            rt.trigger(st);
          }).error(function (ex) {
            rt.triggerError(ex);
          });
        });
      } else {
        var attrs = _DataConverter.DC.stringArrayToBytes(attributes);

        this.sendRequest(_IIPPacketAction["default"].GetAttributes).addUint32(resource._p.instanceId).addUint32(attrs.length).addUint8Array(attrs).done().then(function (ar) {
          _Codec["default"].parseStructure(ar[0], 0, ar[0].length, self).then(function (st) {
            for (var a in st) {
              resource.instance.attributes.set(a, st[a]);
            }

            rt.trigger(st);
          }).error(function (ex) {
            rt.triggerError(ex);
          });
        });
      }

      return rt;
    }
  }]);
  return DistributedConnection;
}(_IStore2["default"]);

exports["default"] = DistributedConnection;

},{"../../Core/AsyncQueue.js":20,"../../Core/AsyncReply.js":21,"../../Core/ErrorType.js":22,"../../Core/ExceptionCode.js":23,"../../Core/ProgressType.js":26,"../../Data/Codec.js":29,"../../Data/DataConverter.js":30,"../../Data/KeyList.js":33,"../../Resource/IResource.js":56,"../../Resource/IStore.js":57,"../../Resource/Template/ResourceTemplate.js":64,"../../Resource/Warehouse.js":65,"../../Security/Authority/Authentication.js":66,"../../Security/Authority/AuthenticationType.js":67,"../../Security/Authority/Session.js":68,"../../Security/Integrity/SHA256.js":69,"../../Security/Permissions/ActionType.js":70,"../../Security/Permissions/Ruling.js":72,"../Packets//IIPPacketReport.js":52,"../Packets/IIPAuthPacket.js":44,"../Packets/IIPAuthPacketAction.js":45,"../Packets/IIPAuthPacketCommand.js":46,"../Packets/IIPAuthPacketMethod.js":47,"../Packets/IIPPacket.js":48,"../Packets/IIPPacketAction.js":49,"../Packets/IIPPacketCommand.js":50,"../Packets/IIPPacketEvent.js":51,"../SendList.js":53,"../Sockets/NetworkBuffer.js":54,"./DistributedPropertyContext.js":40,"./DistributedResource.js":41,"./DistributedResourceQueueItem.js":42,"./DistributedResourceQueueItemType.js":43,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/regenerator":17}],40:[function(require,module,exports){
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var DistributedPropertyContext = function DistributedPropertyContext(p1, p2) {
  (0, _classCallCheck2["default"])(this, DistributedPropertyContext);

  if (arguments.length == 1) {
    this.method = p1;
  } else if (arguments.length == 2) {
    this.connection = p1;
    this.value = p2;
  }
};

exports["default"] = DistributedPropertyContext;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/interopRequireDefault":9}],41:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IResource2 = _interopRequireDefault(require("../../Resource/IResource.js"));

var _AsyncReply = _interopRequireDefault(require("../../Core/AsyncReply.js"));

var _Codec = _interopRequireDefault(require("../../Data/Codec.js"));

var _Structure = _interopRequireDefault(require("../../Data/Structure.js"));

var _IIPPacketAction = _interopRequireDefault(require("../Packets//IIPPacketAction.js"));

var DistributedResource = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(DistributedResource, _IResource);
  (0, _createClass2["default"])(DistributedResource, [{
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this._p.attached = false;

      this._p.connection.sendDetachRequest(this._p.instanceId);

      this._emit("destroy", this);
    }
  }, {
    key: "_suspend",
    value: function _suspend() {
      this._p.suspended = true;
      this._p.attached = false;
    }
  }]);

  function DistributedResource(connection, instanceId, age, link) {
    var _this;

    (0, _classCallCheck2["default"])(this, DistributedResource);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DistributedResource).call(this));
    _this._p = {
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
    key: "_serialize",
    value: function _serialize() {
      var props = [];

      for (var i = 0; i < this._p.properties.length; i++) {
        props.push(new PropertyValue(this._p.properties[i], this.instance.getAge(i), this.instance.getModificationDate(i)));
      }

      return props;
    }
  }, {
    key: "_attach",
    value: function _attach(properties) {
      if (this._p.attached) return false;else {
        this._p.suspended = false;

        for (var i = 0; i < properties.length; i++) {
          this.instance.setAge(i, properties[i].age);
          this.instance.setModificationDate(i, properties[i].date);

          this._p.properties.push(properties[i].value);
        }

        this._p.attached = true;
        var self = this;

        var makeFunc = function makeFunc(index) {
          var func = function func() {
            if (arguments.length == 1 && arguments[0] instanceof Object && arguments[0].constructor.name == "Object") {
              var namedArgs = new _Structure["default"](arguments[0]);
              return self._invokeByNamedArguments(index, namedArgs);
            } else {
              return self._invokeByArrayArguments(index, arguments);
            }
          }; // get expansion


          func.help = self.instance.template.functions[index].expansion;
          return func;
        };

        var makeGetter = function makeGetter(index) {
          return function () {
            return self._get(index);
          };
        };

        var makeSetter = function makeSetter(index) {
          return function (value) {
            self._set(index, value);
          };
        };

        for (var i = 0; i < this.instance.template.functions.length; i++) {
          var ft = this.instance.template.functions[i];
          this[ft.name] = makeFunc(ft.index);
        }

        for (var i = 0; i < this.instance.template.properties.length; i++) {
          var pt = this.instance.template.properties[i];
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
    key: "_emitEventByIndex",
    value: function _emitEventByIndex(index, args) {
      var et = this.instance.template.getEventTemplateByIndex(index);

      this._emitArgs(et.name, args);

      this.instance._emitResourceEvent(null, null, et.name, args);
    }
  }, {
    key: "_invokeByArrayArguments",
    value: function _invokeByArrayArguments(index, args) {
      if (this.destroyed) throw new Error("Trying to access destroyed object");
      if (this._p.suspended) throw new Error("Trying to access suspended object");
      if (index >= this.instance.template.functions.length) throw new Error("Function index is incorrect");
      return this._p.connection.sendInvokeByArrayArguments(this._p.instanceId, index, args);
    }
  }, {
    key: "_invokeByNamedArguments",
    value: function _invokeByNamedArguments(index, namedArgs) {
      if (this.destroyed) throw new Error("Trying to access destroyed object");
      if (this._p.suspended) throw new Error("Trying to access suspended object");
      if (index >= this.instance.template.functions.length) throw new Error("Function index is incorrect");
      return this._p.connection.sendInvokeByNamedArguments(this._p.instanceId, index, namedArgs);
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
      this.instance.emitModification(pt, value); // this to invoke other property setters

      this._p.neglect = true;
      this[pt.name] = null;
      this._p.neglect = false;
    }
  }, {
    key: "_set",
    value: function _set(index, value) {
      if (this._p.neglect) return;
      if (index >= this._p.properties.length) return null;
      var reply = new _AsyncReply["default"]();

      var parameters = _Codec["default"].compose(value, this._p.connection);

      var self = this;

      this._p.connection.sendRequest(_IIPPacketAction["default"].SetProperty).addUint32(self._p.instanceId).addUint8(index).addUint8Array(parameters).done().then(function (res) {
        // not really needed, server will always send property modified, this only happens if the programmer forgot to emit in property setter
        self._p.properties[index] = value;
        reply.trigger(null);
      });

      return reply;
    }
  }]);
  return DistributedResource;
}(_IResource2["default"]);

exports["default"] = DistributedResource;

},{"../../Core/AsyncReply.js":21,"../../Data/Codec.js":29,"../../Data/Structure.js":36,"../../Resource/IResource.js":56,"../Packets//IIPPacketAction.js":49,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],42:[function(require,module,exports){
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

var DistributedResourceQueueItem = function DistributedResourceQueueItem(resource, type, value, index) {
  (0, _classCallCheck2["default"])(this, DistributedResourceQueueItem);
  this.resource = resource;
  this.index = index;
  this.type = type;
  this.value = value;
};

exports["default"] = DistributedResourceQueueItem;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/interopRequireDefault":9}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Propery: 0,
  Event: 1
};
exports["default"] = _default;

},{}],44:[function(require,module,exports){
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

var _IIPAuthPacketCommand = _interopRequireDefault(require("./IIPAuthPacketCommand.js"));

var _IIPAuthPacketAction = _interopRequireDefault(require("./IIPAuthPacketAction.js"));

var _IIPAuthPacketMethod = _interopRequireDefault(require("./IIPAuthPacketMethod.js"));

var IIPAuthPacket = /*#__PURE__*/function () {
  function IIPAuthPacket() {
    (0, _classCallCheck2["default"])(this, IIPAuthPacket);
    this.command = 0;
    this.action = 0;
    this.errorCode = 0;
    this.errorMessage = "";
    this.localMethod = 0;
    this.sourceInfo = "";
    this.hash = "";
    this.sessionId = "";
    this.remoteMethod = 0;
    this.domain = "";
    this.CertificateId = 0;
    this.localUsername = "";
    this.remoteUsername = "";
    this.localPassword = "";
    this.remotePassword = "";
    this.localToken = [];
    this.reemoteToken = [];
    this.asymetricEncryptionKey = [];
    this.localNonce = [];
    this.remoteNonce = [];
    this.dataLengthNeeded = 0;
  }

  (0, _createClass2["default"])(IIPAuthPacket, [{
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
      var oOffset = offset;
      if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
      this.command = data.getUint8(offset) >> 6;

      if (this.command == _IIPAuthPacketCommand["default"].Action) {
        this.action = data[offset++] & 0x3f;

        if (this.action == _IIPAuthPacketAction["default"].AuthenticateHash) {
          if (this.notEnough(offset, ends, 32)) return -this.dataLengthNeeded;
          this.hash = data.getUint8Array(offset, 32);
          offset += 32;
        } else if (this.action == _IIPAuthPacketAction["default"].NewConnection) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var length = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, length)) return -this.dataLengthNeeded;
          this.sourceInfo = data.clip(offset, length);
          offset += 32;
        } else if (this.action == _IIPAuthPacketAction["default"].ResumeConnection || this.action == _IIPAuthPacketAction["default"].ConnectionEstablished) {
          if (this.notEnough(offset, ends, 32)) return -this.dataLengthNeeded;
          this.sessionId = data.clip(offset, 32);
          offset += 32;
        }
      } else if (this.command == _IIPAuthPacketCommand["default"].Declare) {
        this.remoteMethod = data.getUint8(offset) >> 4 & 0x3;
        this.localMethod = data.getUint8(offset) >> 2 & 0x3;
        var encrypt = (data.getUint8(offset++) & 0x2) == 0x2;
        if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
        var domainLength = data.getUint8(offset++);
        if (this.notEnough(offset, ends, domainLength)) return -this.dataLengthNeeded;
        this.domain = data.getString(offset, domainLength);
        offset += domainLength;

        if (this.remoteMethod == _IIPAuthPacketMethod["default"].Credentials) {
          if (this.localMethod == _IIPAuthPacketMethod["default"].None) {
            if (this.notEnough(offset, ends, 33)) return -this.dataLengthNeeded;
            this.remoteNonce = data.clip(offset, 32);
            offset += 32;
            var length = data.getUint8(offset++);
            if (this.notEnough(offset, ends, length)) return -this.dataLengthNeeded;
            this.remoteUsername = data.getString(offset, length);
            offset += length;
          }
        }

        if (encrypt) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var keyLength = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, keyLength)) return -this.dataLengthNeeded;
          this.asymetricEncryptionKey = data.clip(offset, keyLength);
          offset += keyLength;
        }
      } else if (this.command == _IIPAuthPacketCommand["default"].Acknowledge) {
        this.remoteMethod = data.getUint8(offset) >> 4 & 0x3;
        this.localMethod = data.getUint8(offset) >> 2 & 0x3;
        var encrypt = (data.getUint8(offset++) & 0x2) == 0x2;
        if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;

        if (this.remoteMethod == _IIPAuthPacketMethod["default"].Credentials) {
          if (this.localMethod == _IIPAuthPacketMethod["default"].None) {
            if (this.notEnough(offset, ends, 32)) return -this.dataLengthNeeded;
            this.remoteNonce = data.clip(offset, 32);
            offset += 32;
          }
        }

        if (encrypt) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var keyLength = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, keyLength)) return -this.dataLengthNeeded;
          this.asymetricEncryptionKey = data.clip(offset, keyLength);
          offset += keyLength;
        }
      } else if (this.command == _IIPAuthPacketCommand["default"].Error) {
        if (this.notEnough(offset, ends, 5)) return -this.dataLengthNeeded;
        offset++;
        this.errorCode = data.getUint8(offset++);
        var cl = data.getUint16(offset);
        offset += 2;
        if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
        this.errorMessage = data.getString(offset, cl);
        offset += cl;
      }

      return offset - oOffset;
    }
  }]);
  return IIPAuthPacket;
}();

exports["default"] = IIPAuthPacket;

},{"./IIPAuthPacketAction.js":45,"./IIPAuthPacketCommand.js":46,"./IIPAuthPacketMethod.js":47,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = // const IIPAuthPacketAction =
{
  // Authenticate
  AuthenticateHash: 0,
  NewConnection: 0x20,
  ResumeConnection: 0x21,
  ConnectionEstablished: 0x28
};
exports["default"] = _default;

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = //const IIPAuthPacketCommand =
{
  Action: 0,
  Declare: 1,
  Acknowledge: 2,
  Error: 3
};
exports["default"] = _default;

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = //const IIPAuthPacketMethod =
{
  None: 0,
  Certificate: 1,
  Credentials: 2,
  Token: 3
};
exports["default"] = _default;

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

var _DataType = _interopRequireDefault(require("../../Data/DataType.js"));

var IIPPacket = /*#__PURE__*/function () {
  function IIPPacket() {
    (0, _classCallCheck2["default"])(this, IIPPacket);
    this.command = 0;
    this.action = 0;
    this.event = 0;
    this.resourceId = 0;
    this.newResourceId = 0;
    this.resourceAge = 0;
    this.content = [];
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
  }

  (0, _createClass2["default"])(IIPPacket, [{
    key: "notEnough",
    value: function notEnough(offset, ends, needed) {
      if (offset + needed > ends) {
        this.dataLengthNeeded = needed - (ends - offset); //            this.dataLengthNeeded = needed - (ends - this.originalOffset);

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
        } else if (this.event == _IIPPacketEvent["default"].ResourceDestroyed) {// nothing to parse
        } else if (this.event == _IIPPacketEvent["default"].ChildAdded || this.event == _IIPPacketEvent["default"].ChildRemoved) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.childId = data.getUint32(offset);
          offset += 4;
        } else if (this.event == _IIPPacketEvent["default"].Renamed) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } else if (this.event == _IIPPacketEvent["default"].PropertyUpdated) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          this.methodIndex = data[offset++];
          var dt = data.getUint8(offset++);

          var size = _DataType["default"].sizeOf(dt);

          if (size < 0) {
            if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 5, cl + 5);
            offset += cl;
          } else {
            if (this.notEnough(offset, ends, size)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 1, size + 1);
            offset += size;
          }
        } else if (this.event == _IIPPacketEvent["default"].EventOccurred) {
          if (this.notEnough(offset, ends, 5)) return -this.dataLengthNeeded;
          this.methodIndex = data.getUint8(offset++);
          var cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } // Attribute
        else if (this.event == _IIPPacketEvent["default"].AttributesUpdated) {
            if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset, cl);
            offset += cl;
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
          if (this.notEnough(offset, ends, 12)) return -dataLengthNeeded;
          this.storeId = data.getUint32(offset);
          offset += 4;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          var cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, cl)) return -dataLengthNeeded;
          this.content = data.clip(offset, cl);
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
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassName) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var cl = data.getUint8(offset++);
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.className = data.getString(offset, cl);
          offset += cl;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassId) {
          if (this.notEnough(offset, ends, 16)) return -this.dataLengthNeeded;
          this.classId = data.getGuid(offset);
          offset += 16;
        } else if (this.action == _IIPPacketAction["default"].TemplateFromResourceId) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].QueryLink) {
          if (this.notEnough(offset, ends, 2)) return -this.dataLengthNeeded;
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.resourceLink = data.getString(offset, cl);
          offset += cl;
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
        } else if (this.action == IIPPacket.InvokeFunctionArrayArguments || this.action == _IIPPacketAction["default"].InvokeFunctionNamedArguments) {
          if (this.notEnough(offset, ends, 9)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data.getUint8(offset++);
          var cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } else if (this.action == _IIPPacketAction["default"].GetProperty) {
          if (this.notEnough(offset, ends, 5)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data.getUint8(offset++);
        } else if (this.action == _IIPPacketAction["default"].GetPropertyIfModified) {
          if (this.notEnough(offset, ends, 9)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data[offset++];
          this.resourceAge = data.getUint64(offset);
          offset += 8;
        } else if (this.action == _IIPPacketAction["default"].SetProperty) {
          if (this.notEnough(offset, ends, 6)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
          this.methodIndex = data[offset++];
          var dt = data.getUint8(offset++);

          var size = _DataType["default"].sizeOf(dt);

          if (size < 0) {
            if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 5, cl + 5);
            offset += cl;
          } else {
            if (this.notEnough(offset, ends, size)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 1, size + 1);
            offset += size;
          }
        } // Attribute
        else if (this.action == _IIPPacketAction["default"].UpdateAllAttributes || this.action == _IIPPacketAction["default"].GetAttributes || this.action == _IIPPacketAction["default"].UpdateAttributes || this.action == _IIPPacketAction["default"].ClearAttributes) {
            if (this.notEnough(offset, ends, 8)) return -this.dataLengthNeeded;
            this.resourceId = data.getUint32(offset);
            offset += 4;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset, cl);
            offset += cl;
          }
      } else if (this.command == _IIPPacketCommand["default"].Reply) {
        if (this.action == _IIPPacketAction["default"].AttachResource || this.action == _IIPPacketAction["default"].ReattachResource) {
          if (this.notEnough(offset, ends, 26)) return -this.dataLengthNeeded;
          this.classId = data.getGuid(offset);
          offset += 16;
          this.resourceAge = data.getUint64(offset);
          offset += 8;
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.resourceLink = data.getString(offset, cl);
          offset += cl;
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } else if (this.action == _IIPPacketAction["default"].DetachResource) {// nothing to do
        } else if (this.action == _IIPPacketAction["default"].CreateResource) {
          if (this.notEnough(offset, ends, 20)) return -this.dataLengthNeeded;
          this.resourceId = data.getUint32(offset);
          offset += 4;
        } else if (this.action == _IIPPacketAction["default"].DetachResource) {// nothing to do
        } else if (this.action == _IIPPacketAction["default"].TemplateFromClassName || this.action == _IIPPacketAction["default"].TemplateFromClassId || this.action == _IIPPacketAction["default"].TemplateFromResourceId || this.action == _IIPPacketAction["default"].QueryLink || this.action == _IIPPacketAction["default"].ResourceChildren || this.action == _IIPPacketAction["default"].ResourceParents || this.action == _IIPPacketAction["default"].ResourceHistory // Attribute
        || this.action == _IIPPacketAction["default"].GetAllAttributes || this.action == _IIPPacketAction["default"].GetAttributes) {
          if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
          var cl = data.getUint32(offset);
          offset += 4;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.content = data.clip(offset, cl);
          offset += cl;
        } else if (this.action == _IIPPacketAction["default"].InvokeFunctionArrayArguments || this.action == _IIPPacketAction["default"].InvokeFunctionNamedArguments || this.action == _IIPPacketAction["default"].GetProperty || this.action == _IIPPacketAction["default"].GetPropertyIfModified) {
          if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;
          var dt = data.getUint8(offset++);

          var size = _DataType["default"].sizeOf(dt);

          if (size < 0) {
            if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 5, cl + 5);
            offset += cl;
          } else {
            if (this.notEnough(offset, ends, size)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 1, size + 1);
            offset += size;
          }
        } else if (this.action == _IIPPacketAction["default"].SetProperty) {// nothing to do
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
          var cl = data.getUint16(offset);
          offset += 2;
          if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
          this.errorMessage = data.getString(offset, cl);
          offset += cl;
        } else if (this.report == _IIPPacketReport["default"].ProgressReport) {
          if (this.notEnough(offset, ends, 8)) return -this.dataLengthNeeded;
          this.progressValue = data.getInt32(offset);
          offset += 4;
          this.progressMax = data.getInt32(offset);
          offset += 4;
        } else if (this.report == _IIPPacketReport["default"].ChunkStream) {
          var dt = data.getUint8(offset++);

          var size = _DataType["default"].sizeOf(dt);

          if (size < 0) {
            if (this.notEnough(offset, ends, 4)) return -this.dataLengthNeeded;
            var cl = data.getUint32(offset);
            offset += 4;
            if (this.notEnough(offset, ends, cl)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 5, cl + 5);
            offset += cl;
          } else {
            if (this.notEnough(offset, ends, size)) return -this.dataLengthNeeded;
            this.content = data.clip(offset - 1, size + 1);
            offset += size;
          }
        }
      }

      return offset - this.originalOffset;
    }
  }]);
  return IIPPacket;
}();

exports["default"] = IIPPacket;

},{"../../Data/DataType.js":31,"./IIPPacketAction.js":49,"./IIPPacketCommand.js":50,"./IIPPacketEvent.js":51,"./IIPPacketReport.js":52,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = // const IIPPacketAction =
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
  // Request Invoke
  InvokeFunctionArrayArguments: 16,
  GetProperty: 17,
  GetPropertyIfModified: 18,
  SetProperty: 19,
  InvokeFunctionNamedArguments: 20,
  // Request Attribute
  GetAllAttributes: 24,
  UpdateAllAttributes: 25,
  ClearAllAttributes: 26,
  GetAttributes: 27,
  UpdateAttributes: 28,
  ClearAttributes: 29
};
exports["default"] = _default;

},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = // IIPPacketCommand =
{
  Event: 0,
  Request: 1,
  Reply: 2,
  Report: 3
};
exports["default"] = _default;

},{}],51:[function(require,module,exports){
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
var _default = IIPPacketEvent;
exports["default"] = _default;

},{}],52:[function(require,module,exports){
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
var _default = IIPPacketReport;
exports["default"] = _default;

},{}],53:[function(require,module,exports){
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

var SendList = /*#__PURE__*/function (_BinaryList) {
  (0, _inherits2["default"])(SendList, _BinaryList);

  function SendList(connection, doneReply) {
    var _this;

    (0, _classCallCheck2["default"])(this, SendList);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SendList).call(this));
    _this.connection = connection;
    _this.reply = doneReply;
    return _this;
  }

  (0, _createClass2["default"])(SendList, [{
    key: "done",
    value: function done() {
      this.connection.send(this.toArray());
      return this.reply;
    }
  }]);
  return SendList;
}(_BinaryList2["default"]);

exports["default"] = SendList;

},{"../Data/BinaryList.js":28,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],54:[function(require,module,exports){
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DataConverter = _interopRequireDefault(require("../../Data/DataConverter.js"));

var NetworkBuffer = /*#__PURE__*/function () {
  function NetworkBuffer() {
    (0, _classCallCheck2["default"])(this, NetworkBuffer);
    this.neededDataLength = 0;
    this.data = new _DataConverter["default"](0);
  }

  (0, _createClass2["default"])(NetworkBuffer, [{
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
      this.data = _DataConverter["default"].combine(src, offset, size, this.data, 0, this.data.length);
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
      var dataLength = data.length - offset; // protection

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
    key: "read",
    value: function read() {
      if (this.data.length == 0) return null;
      var rt = null;

      if (this.neededDataLength == 0) {
        rt = this.data;
        this.data = new _DataConverter["default"](0);
      } else {
        if (this.data.length >= this.neededDataLength) {
          rt = this.data;
          this.data = new _DataConverter["default"](0);
          this.neededDataLength = 0;
          return rt;
        } else {
          return null;
        }
      }

      return rt;
    }
  }, {
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
    key: "canRead",
    get: function get() {
      if (this.data.length == 0) return false;else if (this.data.length < this.neededDataLength) return false;
      return true;
    }
  }]);
  return NetworkBuffer;
}();

exports["default"] = NetworkBuffer;

},{"../../Data/DataConverter.js":30,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],55:[function(require,module,exports){
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var CustomResourceEvent = function CustomResourceEvent(issuer, receivers, params) {
  (0, _classCallCheck2["default"])(this, CustomResourceEvent);
  this.issuer = issuer;
  this.receivers = receivers;
  this.params = params;
};

exports["default"] = CustomResourceEvent;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/interopRequireDefault":9}],56:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IDestructible2 = _interopRequireDefault(require("../Core/IDestructible.js"));

var ResourceTrigger = {
  Open: 0,
  Initialize: 1,
  Terminate: 2,
  Configure: 3,
  SystemInitialized: 4,
  SystemTerminated: 5,
  SystemReload: 6
};
exports.ResourceTrigger = ResourceTrigger;

var IResource = /*#__PURE__*/function (_IDestructible) {
  (0, _inherits2["default"])(IResource, _IDestructible);
  (0, _createClass2["default"])(IResource, [{
    key: "trigger",
    value: function trigger(_trigger) {}
  }]);

  function IResource() {
    (0, _classCallCheck2["default"])(this, IResource);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IResource).call(this));
  }

  (0, _createClass2["default"])(IResource, null, [{
    key: "getTemplate",
    value: function getTemplate() {
      return {
        namespace: "Esyur",
        properties: [],
        functions: [],
        events: []
      };
    }
  }]);
  return IResource;
}(_IDestructible2["default"]);

exports["default"] = IResource;

},{"../Core/IDestructible.js":24,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],57:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _IResource2 = _interopRequireDefault(require("./IResource.js"));

var IStore = /*#__PURE__*/function (_IResource) {
  (0, _inherits2["default"])(IStore, _IResource);
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
    key: "getRecord",
    value: function getRecord(resource, fromDate, toDate) {}
  }, {
    key: "remove",
    value: function remove(resource) {}
  }]);

  function IStore() {
    (0, _classCallCheck2["default"])(this, IStore);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IStore).call(this));
  }

  return IStore;
}(_IResource2["default"]);

exports["default"] = IStore;

},{"./IResource.js":56,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],58:[function(require,module,exports){
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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));

var _IPermissionsManager = _interopRequireDefault(require("../Security/Permissions/IPermissionsManager.js"));

var _StructureArray = _interopRequireDefault(require("../Data/StructureArray.js"));

var _AutoList = _interopRequireDefault(require("../Data/AutoList.js"));

var _KeyList = _interopRequireDefault(require("../Data/KeyList.js"));

var _Structure = _interopRequireDefault(require("../Data/Structure.js"));

var _PropertyValue = _interopRequireDefault(require("../Data/PropertyValue.js"));

var _CustomResourceEvent = _interopRequireDefault(require("./CustomResourceEvent.js"));

var _Warehouse = _interopRequireDefault(require("./Warehouse.js"));

var Instance = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(Instance, _IEventHandler);
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
      var pt = this.template.getPropertyTemplateByName(name);
      if (pt == null) return false;
      this.resource[name] = value;
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
      var props = [];

      for (var i = 0; i < this.template.properties.length; i++) {
        props.push(new _PropertyValue["default"](this.resource[this.template.properties[i].name], this.ages[this.template.properties[i].index], this.modificationDates[this.template.properties[i].index]));
      }

      return props;
    }
  }, {
    key: "isStorable",
    value: function isStorable() {
      return resource instanceof Storable;
    }
  }, {
    key: "emitModification",
    value: function emitModification(pt, value) {
      this.instanceAge++;
      var now = new Date();
      this.ages[pt.index] = this.instanceAge;
      this.modificationDates[pt.index] = now;
      if (pt.recordable) this.store.record(this.resource, pt.name, value, this.ages[pt.index], now);
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Instance.prototype), "_emit", this).call(this, "ResourceModified", this.resource, pt.name, value); //this.resource._emit("modified", pt.name, value);

      this.resource._emit(":" + pt.name, value);
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
    value: function _emitResourceEvent(issuer, receivers, name, args) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Instance.prototype), "_emit", this).call(this, "ResourceEventOccurred", this.resource, issuer, receivers, name, args);
    }
  }, {
    key: "getPropertyValue",
    value: function getPropertyValue(name, resultObject) {
      for (var i = 0; i < this.template.properties.length; i++) {
        if (this.template.properties[i].name == name) {
          resultObject.value = this.resource[name];
          return true;
        }
      }

      return false;
    }
  }]);

  function Instance(id, name, resource, store) {
    var _this;

    var customTemplate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var age = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    (0, _classCallCheck2["default"])(this, Instance);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Instance).call(this));
    _this.store = store;
    _this.resource = resource;
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
      value.instance.parents.add(self.resource);
    });

    _this.children.on("remove", function (value) {
      value.instance.parents.remove(self.resource);
    });

    _this.resource.on("Destroy", function (sender) {
      self._emit("ResourceDestroyed", sender);
    });

    if (customTemplate != null) _this.template = customTemplate;else _this.template = _Warehouse["default"].getTemplateByType(_this.resource.constructor); // set ages

    _this.ages = [];
    _this.modificationDates = [];

    for (var i = 0; i < _this.template.properties.length; i++) {
      _this.ages.push(0);

      _this.modificationDates.push(new Date(0));
    } // connect events


    for (var i = 0; i < _this.template.events.length; i++) {
      _this.resource.on(_this.template.events[i].name, _this._makeHandler(_this.template.events[i].name));
    }

    return _this;
  }

  (0, _createClass2["default"])(Instance, [{
    key: "_makeHandler",
    value: function _makeHandler(name) {
      var self = this;
      return function (args) {
        if (args instanceof _CustomResourceEvent["default"]) self._emitResourceEvent(args.issuer, args.receivers, name, args.params);else self._emitResourceEvent(null, null, name, args);
      };
    } /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Ruling.</returns>

  }, {
    key: "applicable",
    value: function applicable(session, action, member, inquirer) {
      for (var i = 0; i < this.managers.length; i++) {
        var r = this.managers.item(i).applicable(this.resource, session, action, member, inquirer);
        if (r != Ruling.DontCare) return r;
      }

      return Ruling.DontCare;
    }
  }, {
    key: "removeAttributes",
    value: function removeAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (attributes == null) this.attributes.clear();else {
        for (var i = 0; i < attributes.length; i++) {
          this.attributes.remove(attributes[i]);
        }
      }
      return true;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var st = new _Structure["default"]();

      if (attributes == null) {
        attributes = this.attributes.keys.slice(0);
        attributes.push("managers");
      }

      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        if (attr == "name") st["name"] = this.name;else if (attr == "managers") {
          var mngrs = new _StructureArray["default"]();

          for (var j = 0; j < this.managers.length; j++) {
            var manager = this.managers.item(j);
            var sm = new _Structure["default"]();
            sm["type"] = manager.constructor.name;
            sm["settings"] = manager.settings;
            mngrs.push(sm);
          }

          st["managers"] = mngrs;
        } else st[attr] = this.attributes.item(attr);
      }

      return st;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var clearAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (clearAttributes) this.attributes.clear();

      for (var attr in attributes) {
        if (attr == "name") this.name = attributes[attr];else if (attr == "managers") {
          this.managers.clear();
          var mngrs = attributes[attr];

          for (var i = 0; i < mngrs.length; i++) {
            var mngr = mngrs[i];
            var type = window[mngr];
            var settings = mngr["settings"];
            var manager = new (Function.prototype.bind.apply(type))();

            if (manager instanceof _IPermissionsManager["default"]) {
              manager.initialize(settings, this.resource);
              this.managers.add(manager);
            } else return false;
          }
        } else {
          this.attributes.set(attr, attributes[attr]);
        }
      }

      return true;
    }
  }]);
  return Instance;
}(_IEventHandler2["default"]);

exports["default"] = Instance;

},{"../Core/IEventHandler.js":25,"../Data/AutoList.js":27,"../Data/KeyList.js":33,"../Data/PropertyValue.js":34,"../Data/Structure.js":36,"../Data/StructureArray.js":37,"../Security/Permissions/IPermissionsManager.js":71,"./CustomResourceEvent.js":55,"./Warehouse.js":65,"@babel/runtime/helpers/assertThisInitialized":1,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":6,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],59:[function(require,module,exports){
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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _DataConverter = require("../../Data/DataConverter.js");

var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));

var _MemberType = _interopRequireDefault(require("./MemberType.js"));

var EventTemplate = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(EventTemplate, _MemberTemplate);

  function EventTemplate() {
    var _this;

    (0, _classCallCheck2["default"])(this, EventTemplate);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(EventTemplate).call(this));
    _this.type = _MemberType["default"].Event;
    return _this;
  }

  (0, _createClass2["default"])(EventTemplate, [{
    key: "compose",
    value: function compose() {
      var rt = (0, _DataConverter.BL)();
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(EventTemplate.prototype), "compose", this).call(this);

      if (this.expansion != null) {
        var exp = _DataConverter.DC.stringToBytes(this.expansion);

        return rt.addUint8(0x50).addUint8(name.length).addUint8Array(name).addUint32(exp.length).addUint8Array(exp).toArray();
      } else return rt.addUint8(0x40).addUint32(name.length).addUint8Array(name).toArray();
    }
  }]);
  return EventTemplate;
}(_MemberTemplate2["default"]);

exports["default"] = EventTemplate;

},{"../../Data/DataConverter.js":30,"./MemberTemplate.js":61,"./MemberType.js":62,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":6,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],60:[function(require,module,exports){
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
 * Created by Ahmed Zamil on 27/08/2017.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _DataConverter = require("../../Data/DataConverter.js");

var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));

var _MemberType = _interopRequireDefault(require("./MemberType.js"));

var FunctionTemplate = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(FunctionTemplate, _MemberTemplate);
  (0, _createClass2["default"])(FunctionTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(FunctionTemplate.prototype), "compose", this).call(this);
      var rt = (0, _DataConverter.BL)();

      if (this.expansion != null) {
        var exp = _DataConverter.DC.stringToBytes(this.expansion);

        return rt.addUint8(0x10 | (this.isVoid ? 0x8 : 0x0)).addUint8(name.length).addUint8Array(name).addUint32(exp.length).addUint8Array(exp).toArray();
      } else return rt.addUint8(this.isVoid ? 0x8 : 0x0).addUint8(name.length).addUint8Array(name).toArray();
    }
  }]);

  function FunctionTemplate() {
    var _this;

    (0, _classCallCheck2["default"])(this, FunctionTemplate);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FunctionTemplate).call(this));
    _this.type = _MemberType["default"].Function;
    return _this;
  }

  return FunctionTemplate;
}(_MemberTemplate2["default"]);

exports["default"] = FunctionTemplate;

},{"../../Data/DataConverter.js":30,"./MemberTemplate.js":61,"./MemberType.js":62,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":6,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],61:[function(require,module,exports){
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

var _DataConverter = _interopRequireDefault(require("../../Data/DataConverter.js"));

var MemberTemplate = /*#__PURE__*/function () {
  function MemberTemplate() {
    (0, _classCallCheck2["default"])(this, MemberTemplate);
  }

  (0, _createClass2["default"])(MemberTemplate, [{
    key: "compose",
    value: function compose() {
      return _DataConverter["default"].stringToBytes(this.name);
    }
  }]);
  return MemberTemplate;
}();

exports["default"] = MemberTemplate;

},{"../../Data/DataConverter.js":30,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Function: 0,
  Property: 1,
  Event: 2
};
exports["default"] = _default;

},{}],63:[function(require,module,exports){
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
 * Created by Ahmed Zamil on 27/08/2017.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PropertyPermission = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _DataConverter = require("../../Data/DataConverter.js");

var _MemberTemplate2 = _interopRequireDefault(require("./MemberTemplate.js"));

var _MemberType = _interopRequireDefault(require("./MemberType.js"));

var PropertyPermission = {
  Read: 1,
  Write: 2,
  ReadWrite: 3
};
exports.PropertyPermission = PropertyPermission;

var PropertyTemplate = /*#__PURE__*/function (_MemberTemplate) {
  (0, _inherits2["default"])(PropertyTemplate, _MemberTemplate);

  function PropertyTemplate() {
    var _this;

    (0, _classCallCheck2["default"])(this, PropertyTemplate);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PropertyTemplate).call(this));
    _this.type = _MemberType["default"].Property;
    return _this;
  }

  (0, _createClass2["default"])(PropertyTemplate, [{
    key: "compose",
    value: function compose() {
      var name = (0, _get2["default"])((0, _getPrototypeOf2["default"])(PropertyTemplate.prototype), "compose", this).call(this);
      var rt = (0, _DataConverter.BL)();
      var pv = this.permission >> 1 | (this.recordable ? 1 : 0);

      if (this.writeExpansion != null && this.readExpansion != null) {
        var rexp = _DataConverter.DC.stringToBytes(this.readExpansion);

        var wexp = _DataConverter.DC.stringToBytes(this.writeExpansion);

        return rt.addUint8(0x38 | pv).addUint8(name.length).addUint8Array(name).addUint32(wexp.length).addUint8Array(wexp).addUint32(rexp.length).addUint8Array(rexp).toArray();
      } else if (this.writeExpansion != null) {
        var wexp = _DataConverter.DC.stringToBytes(this.writeExpansion);

        return rt.addUint8(0x30 | pv).addUint8(name.length).addUint8Array(name).addUint32(wexp.length).addUint8Array(wexp).toArray();
      } else if (this.readExpansion != null) {
        var rexp = _DataConverter.DC.stringToBytes(this.readExpansion);

        return rt.addUint8(0x28 | pv).addUint8(name.length).addUint8Array(name).addUint32(rexp.length).addUint8Array(rexp).toArray();
      } else return rt.addUint8(0x20 | pv).addUint32(name.length).addUint8Array(name).toArray();
    }
  }]);
  return PropertyTemplate;
}(_MemberTemplate2["default"]);

exports["default"] = PropertyTemplate;

},{"../../Data/DataConverter.js":30,"./MemberTemplate.js":61,"./MemberType.js":62,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":6,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],64:[function(require,module,exports){
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

var _FunctionTemplate = _interopRequireDefault(require("./FunctionTemplate.js"));

var _PropertyTemplate = _interopRequireDefault(require("./PropertyTemplate.js"));

var _EventTemplate = _interopRequireDefault(require("./EventTemplate.js"));

var _SHA = _interopRequireDefault(require("../../Security/Integrity/SHA256.js"));

var _DataConverter = require("../../Data/DataConverter.js");

var ResourceTemplate = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ResourceTemplate, [{
    key: "getEventTemplateByName",
    value: function getEventTemplateByName(eventName) {
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].name == eventName) return this.events[i];
      }

      return null;
    }
  }, {
    key: "getEventTemplateByIndex",
    value: function getEventTemplateByIndex(index) {
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].index == index) return this.events[i];
      }

      return null;
    }
  }, {
    key: "getFunctionTemplateByName",
    value: function getFunctionTemplateByName(functionName) {
      for (var i = 0; i < this.functions.length; i++) {
        if (this.functions[i].name == functionName) return this.functions[i];
      }

      return null;
    }
  }, {
    key: "getFunctionTemplateByIndex",
    value: function getFunctionTemplateByIndex(index) {
      for (var i = 0; i < this.functions.length; i++) {
        if (this.functions[i].index == index) return this.functions[i];
      }

      return null;
    }
  }, {
    key: "getPropertyTemplateByName",
    value: function getPropertyTemplateByName(propertyName) {
      for (var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].name == propertyName) return this.properties[i];
      }

      return null;
    }
  }, {
    key: "getPropertyTemplateByIndex",
    value: function getPropertyTemplateByIndex(index) {
      for (var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].index == index) return this.properties[i];
      }

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

  }]);

  function ResourceTemplate(type) {
    (0, _classCallCheck2["default"])(this, ResourceTemplate);
    this.properties = [];
    this.events = [];
    this.functions = [];
    this.members = [];
    if (type === undefined) return;
    var template = type.getTemplate(); // set guid

    this.className = template.namespace + "." + type.prototype.constructor.name;
    this.classId = _SHA["default"].compute(_DataConverter.DC.stringToBytes(this.className)).getGuid(0); //byte currentIndex = 0;

    for (var i = 0; i < template.properties.length; i++) {
      var pt = new _PropertyTemplate["default"]();
      pt.name = template.properties[i].name;
      pt.index = i;
      pt.readExpansion = template.properties[i].read;
      pt.writeExpansion = template.properties[i].write;
      pt.recordable = template.properties[i].recordable;
      this.properties.push(pt);
    }

    for (var i = 0; i < template.events.length; i++) {
      var et = new _EventTemplate["default"]();
      et.name = template.events[i].name;
      et.index = i;
      et.expansion = template.events[i].expansion;
      this.events.push(et);
    }

    for (var i = 0; i < template.functions.length; i++) {
      var ft = new _FunctionTemplate["default"]();
      ft.name = template.functions[i].name;
      ft.index = i;
      ft.isVoid = template.functions[i]["void"];
      ft.expansion = template.functions[i].expansion;
      this.functions.push(ft);
    } // append signals


    for (var i = 0; i < this.events.length; i++) {
      this.members.push(this.events[i]);
    } // append slots


    for (var i = 0; i < this.functions.length; i++) {
      this.members.push(this.functions[i]);
    } // append properties


    for (var i = 0; i < this.properties.length; i++) {
      this.members.push(this.properties[i]);
    } // bake it binarily


    var b = (0, _DataConverter.BL)();

    var cls = _DataConverter.DC.stringToBytes(this.className);

    b.addUint8Array(this.classId.value).addUint8(cls.length).addUint8Array(cls).addUint32(template.version).addUint16(this.members.length);

    for (var i = 0; i < this.functions.length; i++) {
      b.addUint8Array(this.functions[i].compose());
    }

    for (var i = 0; i < this.properties.length; i++) {
      b.addUint8Array(this.properties[i].compose());
    }

    for (var i = 0; i < this.events.length; i++) {
      b.addUint8Array(this.events[i].compose());
    }

    this.content = b.toArray();
  }

  (0, _createClass2["default"])(ResourceTemplate, null, [{
    key: "getFunctionParameters",
    value: function getFunctionParameters(func) {
      var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
      var ARGUMENT_NAMES = /([^\s,]+)/g;
      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
      if (result === null) result = [];
      return result;
    }
  }, {
    key: "parse",
    value: function parse(data) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var contentLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      if (contentLength == -1) contentLength = data.length;
      var ends = offset + contentLength;
      var oOffset = offset; // start parsing...

      var od = new ResourceTemplate();
      od.content = data.clip(offset, contentLength);
      od.classId = data.getGuid(offset);
      offset += 16;
      od.className = data.getString(offset + 1, data.getUint8(offset));
      offset += data.getUint8(offset) + 1;
      od.version = data.getInt32(offset);
      offset += 4;
      var methodsCount = data.getUint16(offset);
      offset += 2;
      var functionIndex = 0;
      var propertyIndex = 0;
      var eventIndex = 0;

      for (var i = 0; i < methodsCount; i++) {
        var type = data.getUint8(offset) >> 5;

        if (type == 0) // function
          {
            var ft = new _FunctionTemplate["default"]();
            ft.index = functionIndex++;
            var expansion = (data.getUint8(offset) & 0x10) == 0x10;
            ft.isVoid = (data.getUint8(offset++) & 0x08) == 0x08;
            var len = data.getUint8(offset++);
            ft.name = data.getString(offset, len);
            offset += len;

            if (expansion) // expansion ?
              {
                var cs = data.getUint32(offset);
                offset += 4;
                ft.expansion = data.getString(offset, cs);
                offset += cs;
              }

            od.functions.push(ft);
          } else if (type == 1) // property
          {
            var pt = new _PropertyTemplate["default"]();
            pt.index = propertyIndex++;
            var readExpansion = (data.getUint8(offset) & 0x8) == 0x8;
            var writeExpansion = (data.getUint8(offset) & 0x10) == 0x10;
            pt.recordable = (data.getUint8(offset) & 1) == 1;
            pt.permission = data.getUint8(offset++) >> 1 & 0x3;
            var len = data.getUint8(offset++);
            pt.name = data.getString(offset, len);
            offset += len;

            if (readExpansion) // expansion ?
              {
                var cs = data.getUint32(offset);
                offset += 4;
                pt.readExpansion = data.getString(offset, cs);
                offset += cs;
              }

            if (writeExpansion) // expansion ?
              {
                var cs = data.getUint32(offset);
                offset += 4;
                pt.writeExpansion = data.getString(offset, cs);
                offset += cs;
              }

            od.properties.push(pt);
          } else if (type == 2) // Event
          {
            var et = new _EventTemplate["default"]();
            et.index = eventIndex++;
            var expansion = (data.getUint8(offset++) & 0x10) == 0x10;
            var len = data.getUint8(offset++);
            et.name = data.getString(offset, len);
            offset += len;

            if (expansion) // expansion ?
              {
                var cs = data.getUint32(offset);
                offset += 4;
                et.expansion = data.getString(offset, cs);
                offset += cs;
              }

            od.events.push(et);
          }
      } // append signals


      for (var i = 0; i < od.events.length; i++) {
        od.members.push(od.events[i]);
      } // append slots


      for (var i = 0; i < od.functions.length; i++) {
        od.members.push(od.functions[i]);
      } // append properties


      for (var i = 0; i < od.properties.length; i++) {
        od.members.push(od.properties[i]);
      }

      return od;
    }
  }]);
  return ResourceTemplate;
}();

exports["default"] = ResourceTemplate;

},{"../../Data/DataConverter.js":30,"../../Security/Integrity/SHA256.js":69,"./EventTemplate.js":59,"./FunctionTemplate.js":60,"./PropertyTemplate.js":63,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],65:[function(require,module,exports){
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
exports["default"] = exports.WH = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _AsyncReply = _interopRequireDefault(require("../Core/AsyncReply.js"));

var _ResourceTemplate = _interopRequireDefault(require("../Resource/Template/ResourceTemplate.js"));

var _IEventHandler2 = _interopRequireDefault(require("../Core/IEventHandler.js"));

var _AutoList = _interopRequireDefault(require("../Data/AutoList.js"));

var _KeyList = _interopRequireDefault(require("../Data/KeyList.js"));

var _DistributedConnection = _interopRequireDefault(require("../Net/IIP/DistributedConnection.js"));

var _MemoryStore = _interopRequireDefault(require("../Stores/MemoryStore.js"));

var _Instance = _interopRequireDefault(require("../Resource/Instance.js"));

var _IStore = _interopRequireDefault(require("./IStore.js"));

var _IResource = require("./IResource.js");

var WH = /*#__PURE__*/function (_IEventHandler) {
  (0, _inherits2["default"])(WH, _IEventHandler);

  function WH() {
    var _this;

    (0, _classCallCheck2["default"])(this, WH);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WH).call(this));
    _this.stores = new _AutoList["default"]();
    _this.resources = new _KeyList["default"]();
    _this.resourceCounter = 0;
    _this.templates = new _KeyList["default"]();
    _this.protocols = new _KeyList["default"]();

    _this._register("connected");

    _this._register("disconnected"); ///this._urlRegex = /^(?:([\S]*):\/\/([^\/]*)\/?)/;


    _this._urlRegex = /^(?:([^\s|:]*):\/\/([^\/]*)\/?)/;
    return _this;
  }

  (0, _createClass2["default"])(WH, [{
    key: "new",
    value: function _new(type, name) {
      var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var manager = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var attributes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var res = new type();
      this.put(res, name, store, parent, null, 0, manager, attributes);
      return res;
    }
  }, {
    key: "getById",
    value: function getById(id) {
      return new _AsyncReply["default"](this.resources.item(id));
    }
  }, {
    key: "get",
    value: function get(path) {
      var _this2 = this;

      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var manager = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var rt = new _AsyncReply["default"]();
      var self = this; // Should we create a new store ?

      if (path.match(this._urlRegex)) //if (path.includes("://"))
        {
          // with port
          //var url = path.split(/(?:):\/\/([^:\/]*):?(\d*)/);
          // without port
          var url = path.split(this._urlRegex); //var url = path.split("://", 2);
          //var hostname = url[1];// url[1].split("/", 2)[0];
          //var pathname = url[2];// url[1].split("/").splice(1).join("/");

          var handler;

          if (handler = this.protocols.item(url[1])) {
            var store = handler();
            this.put(store, url[2], null, parent, null, 0, manager, attributes);
            store.trigger(_IResource.ResourceTrigger.Open).then(function (x) {
              _this2.warehouseIsOpen = true;
              if (url[3].length > 0 && url[3] != "") store.get(url[3]).then(function (r) {
                rt.trigger(r);
              }).error(function (e) {
                return rt.triggerError(e);
              });else rt.trigger(store);
            }).error(function (e) {
              rt.triggerError(e);
              self.remove(store);
            });
            return rt;
          }
        }

      this.query(path).then(function (rs) {
        if (rs != null && rs.length > 0) rt.trigger(rs[0]);else rt.trigger(null);
      });
      return rt;
      /*
      var p = id.split('/');
      var res = null;
        for(var s = 0; s < this.stores.length; s++)
      {
          var d = this.stores.at(s);
          if (p[0] == d.instance.name)
          {
              var i = 1;
              res = d;
              while(p.length > i)
              {
                  var si = i;
                    for (var r = 0; r < res.instance.children.length; r++)
                      if (res.instance.children.item(r).instance.name == p[i])
                      {
                          i++;
                          res = res.instance.children.item(r);
                          break;
                      }
                    if (si == i)
                      // not found, ask the store
                      return d.get(id.substring(p[0].length + 1));
              }
                return new AsyncReply(res);
          }
      }
        // Should we create a new store ?
      if (id.includes("://"))
      {
          var url = id.split("://", 2);
          var hostname = url[1].split("/", 2)[0];
          var pathname = url[1].split("/").splice(1).join("/");
          var handler;
            var rt = new AsyncReply();
          var self = this;
            if (handler = this.protocols.item(url[0]))
          {
              var store = handler();
              this.put(store, url[0] + "://" + hostname, null, parent, null, 0, manager, attributes);
              store.trigger(ResourceTrigger.Open).then(x=>{
                  if (pathname.length > 0 && pathname != "")
                      store.get(pathname).then(r=>{
                          rt.trigger(r);
                      }).error(e => rt.triggerError(e));
                  else
                      rt.trigger(store);
                      
              }).error(e => {
                  rt.triggerError(e); 
                  self.remove(store);
              });
          }
            return rt;
      }
        return new AsyncReply(null);
      */
    }
  }, {
    key: "remove",
    value: function remove(resource) {
      if (this.resources.contains(resource.instance.id)) this.resources.remove(resource.instance.id);else return false;

      if (resource instanceof _IStore["default"]) {
        this.stores.remove(resource); // remove all objects associated with the store

        var toBeRemoved = null;

        for (var i = 0; i < this.resources.length; i++) {
          var o = this.resources.at(i);

          if (o.instance.store == resource) {
            if (toBeRemoved == null) toBeRemoved = [];
            toBeRemoved.push(o);
          }
        }

        if (toBeRemoved != null) for (var i = 0; i < toBeRemoved.length; i++) {
          this.remove(toBeRemoved[i]);
        }

        this._emit("disconnected", resource);
      }

      if (resource.instance.store != null) resource.instance.store.remove(resource);
      resource.destroy();
      return true;
    }
  }, {
    key: "put",
    value: function put(resource, name, store, parent) {
      var customTemplate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var age = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var manager = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var attributes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      resource.instance = new _Instance["default"](this.resourceCounter++, name, resource, store, customTemplate, age); //resource.instance.children.on("add", Warehouse._onChildrenAdd).on("remove", Warehouse._onChildrenRemove);
      //resource.instance.parents.on("add", Warehouse._onParentsAdd).on("remove", Warehouse._onParentsRemove);

      if (attributes != null) resource.instance.setAttributes(attributes);
      if (manager != null) resource.instance.managers.add(manager);

      if (parent) {
        parent.instance.children.add(resource);
      } else {
        if (!(resource instanceof _IStore["default"])) store.instance.children.add(resource);
      }

      if (resource instanceof _IStore["default"]) {
        this.stores.add(resource);

        this._emit("connected", resource);
      } else store.put(resource);

      this.resources.add(resource.instance.id, resource);
    }
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
      this.templates.add(template.classId.valueOf(), template);
    }
  }, {
    key: "getTemplateByType",
    value: function getTemplateByType(type) {
      // loaded ?
      for (var i = 0; i < this.templates.length; i++) {
        if (this.templates.at(i).className == (0, _typeof2["default"])(type)) return this.templates.at(i);
      }

      var template = new _ResourceTemplate["default"](type);
      this.templates.add(template.classId.valueOf(), template);
      return template;
    }
  }, {
    key: "getTemplateByClassId",
    value: function getTemplateByClassId(classId) {
      var template = this.templates.item(classId);
      return new _AsyncReply["default"](template);
    }
  }, {
    key: "getTemplateByClassName",
    value: function getTemplateByClassName(className) {
      for (var i = 0; i < this.templates.length; i++) {
        if (this.templates.at(i).className == className) return new _AsyncReply["default"](this.templates.at(i));
      }

      return new _AsyncReply["default"](null);
    }
  }, {
    key: "_qureyIn",
    value: function _qureyIn(path, index, resources) {
      var rt = [];

      if (index == path.length - 1) {
        if (path[index] == "") for (var i = 0; i < resources.length; i++) {
          rt.push(resources.at(i));
        } else for (var i = 0; i < resources.length; i++) {
          if (resources.at(i).instance.name == path[index]) rt.push(resources.at(i));
        }
      } else for (var i = 0; i < resources.length; i++) {
        if (resources.at(i).instance.name == path[index]) rt = rt.concat(this._qureyIn(path, index + 1, resources.at(i).instance.children));
      }

      return rt;
    }
  }, {
    key: "query",
    value: function () {
      var _query = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
        var rt, p, resource, i, store, res, children;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //var p = path.split('/');
                //return new AsyncReply(this._qureyIn(p, 0, this.stores));
                rt = new _AsyncReply["default"]();
                p = path.trim().split('/');
                i = 0;

              case 3:
                if (!(i < this.stores.length)) {
                  _context.next = 35;
                  break;
                }

                store = this.stores.at(i);

                if (!(p[0] == store.instance.name)) {
                  _context.next = 32;
                  break;
                }

                if (!(p.length == 1)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", [store]);

              case 8:
                _context.next = 10;
                return store.get(p.splice(1).join("/"));

              case 10:
                res = _context.sent;

                if (!(res != null)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", [res]);

              case 13:
                resource = store;
                i = 1;

              case 15:
                if (!(i < p.length)) {
                  _context.next = 31;
                  break;
                }

                _context.next = 18;
                return resource.instance.children.list.filter(function (x) {
                  return x.instance.name == p[i];
                });

              case 18:
                children = _context.sent;

                if (!(children.length > 0)) {
                  _context.next = 27;
                  break;
                }

                if (!(i == p.length - 1)) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return", children);

              case 24:
                resource = children[0];

              case 25:
                _context.next = 28;
                break;

              case 27:
                return _context.abrupt("break", 31);

              case 28:
                i++;
                _context.next = 15;
                break;

              case 31:
                return _context.abrupt("return", null);

              case 32:
                i++;
                _context.next = 3;
                break;

              case 35:
                return _context.abrupt("return", null);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x) {
        return _query.apply(this, arguments);
      }

      return query;
    }()
  }]);
  return WH;
}(_IEventHandler2["default"]);

exports.WH = WH;
var Warehouse = new WH();
Warehouse.protocols.add("iip", function () {
  return new _DistributedConnection["default"]();
});
Warehouse.protocols.add("mem", function () {
  return new _MemoryStore["default"]();
});
var _default = Warehouse;
exports["default"] = _default;

},{"../Core/AsyncReply.js":21,"../Core/IEventHandler.js":25,"../Data/AutoList.js":27,"../Data/KeyList.js":33,"../Net/IIP/DistributedConnection.js":39,"../Resource/Instance.js":58,"../Resource/Template/ResourceTemplate.js":64,"../Stores/MemoryStore.js":73,"./IResource.js":56,"./IStore.js":57,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/typeof":14,"@babel/runtime/regenerator":17}],66:[function(require,module,exports){
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

var Authentication = /*#__PURE__*/function () {
  function Authentication(type) {
    (0, _classCallCheck2["default"])(this, Authentication);
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

exports["default"] = Authentication;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  //const AuthenticationType = {
  Host: 0,
  CoHost: 1,
  Client: 2,
  Alien: 3
};
exports["default"] = _default;

},{}],68:[function(require,module,exports){
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

var Session = function Session(localAuthentication, remoteAuthentication) {
  (0, _classCallCheck2["default"])(this, Session);
  this.localAuthentication = localAuthentication;
  this.remoteAuthentication = remoteAuthentication;
  this.id = null;
  this.creation = null;
  this.modification = null;
};

exports["default"] = Session;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/interopRequireDefault":9}],69:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DataConverter = require("../../Data/DataConverter.js");

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
var SHA256 = /*#__PURE__*/function () {
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
      var hash = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]); // Initialize array of round constants:
      // (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311):

      var k = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]); // Pre-processing:
      // begin with the original message of length L bits

      var L = msg.length * 8; // append a single '1' bit
      // append K '0' bits, where K is the minimum number >= 0 such that L + 1 + K + 64 is a multiple of 512

      var K = 512 - (L + 1 + 64) % 512;
      if (K == 512) K = 0;
      var paddingLength = (K + 1) / 8;
      var paddingBytes = new Uint8Array(paddingLength);
      paddingBytes[0] = 0x80;
      var data = new _DataConverter.DC((0, _DataConverter.BL)().addUint8Array(msg).addUint8Array(paddingBytes).addUint64(L).toArray()); // append L as a 64-bit big-endian integer, making the total post-processed length a multiple of 512 bits
      //  Process the message in successive 512-bit chunks:
      // break message into 512-bit chunks
      // for each chunk

      for (var chunk = 0; chunk < data.length; chunk += 64) {
        // create a 64-entry message schedule array w[0..63] of 32-bit words
        // (The initial values in w[0..63] don't matter, so many implementations zero them here)
        // copy chunk into first 16 words w[0..15] of the message schedule array
        var w = new Uint32Array(64);

        for (var i = 0; i < 16; i++) {
          w[i] = data.getInt32(chunk + i * 4);
        } //for(var i = 16; i < 64; i++)
        //  w[i] = 0;
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:
        //    for i from 16 to 63
        //        s0 := (w[i-15] rightrotate 7) xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift 3)
        //        s1 := (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
        //        w[i] := w[i-16] + s0 + w[i-7] + s1


        for (var i = 16; i < 64; i++) {
          var s0 = SHA256.RROT(w[i - 15], 7) ^ SHA256.RROT(w[i - 15], 18) ^ w[i - 15] >>> 3;
          var s1 = SHA256.RROT(w[i - 2], 17) ^ SHA256.RROT(w[i - 2], 19) ^ w[i - 2] >>> 10;
          w[i] = w[i - 16] + s0 + w[i - 7] + s1;
        } // Initialize working variables to current hash value:


        var a = hash[0];
        var b = hash[1];
        var c = hash[2];
        var d = hash[3];
        var e = hash[4];
        var f = hash[5];
        var g = hash[6];
        var h = hash[7]; // Compression function main loop:

        for (var i = 0; i < 64; i++) {
          var S1 = SHA256.RROT(e, 6) ^ SHA256.RROT(e, 11) ^ SHA256.RROT(e, 25);
          var ch = e & f ^ ~e & g;
          var temp1 = h + S1 + ch + k[i] + w[i];
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
        } // Add the compressed chunk to the current hash value:


        hash[0] = hash[0] + a >>> 0;
        hash[1] = hash[1] + b >>> 0;
        hash[2] = hash[2] + c >>> 0;
        hash[3] = hash[3] + d >>> 0;
        hash[4] = hash[4] + e >>> 0;
        hash[5] = hash[5] + f >>> 0;
        hash[6] = hash[6] + g >>> 0;
        hash[7] = hash[7] + h >>> 0;
      } // Produce the final hash value (big-endian):
      //digest := hash := h0 append h1 append h2 append h3 append h4 append h5 append h6 append h7


      var results = (0, _DataConverter.BL)();

      for (var i = 0; i < 8; i++) {
        results.addUint32(hash[i]);
      }

      return results.toDC();
    }
  }]);
  return SHA256;
}();

exports["default"] = SHA256;

},{"../../Data/DataConverter.js":30,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],70:[function(require,module,exports){
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
var _default = // ActionType =
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
  ReceiveEvent: 13
};
exports["default"] = _default;

},{}],71:[function(require,module,exports){
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

var IPermissionsManager = /*#__PURE__*/function () {
  function IPermissionsManager() {
    (0, _classCallCheck2["default"])(this, IPermissionsManager);
  }

  (0, _createClass2["default"])(IPermissionsManager, [{
    key: "applicable",
    /// <summary>
    /// Check for permission.
    /// </summary>
    /// <param name="resource">IResource.</param>
    /// <param name="session">Caller sessions.</param>
    /// <param name="action">Action type</param>
    /// <param name="member">Function or property to check for permission.</param>
    /// <returns>Allowed or denined.</returns>
    value: function applicable(resource, session, action, member, inquirer) {}
  }, {
    key: "initialize",
    value: function initialize(settings, resource) {}
  }, {
    key: "settings",
    get: function get() {}
  }]);
  return IPermissionsManager;
}();

exports["default"] = IPermissionsManager;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":9}],72:[function(require,module,exports){
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
var _default = //Ruling = 
{
  Denied: 0,
  Allowed: 1,
  DontCare: 2
};
exports["default"] = _default;

},{}],73:[function(require,module,exports){
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

var MemoryStore = /*#__PURE__*/function (_IStore) {
  (0, _inherits2["default"])(MemoryStore, _IStore);

  function MemoryStore() {
    var _this;

    (0, _classCallCheck2["default"])(this, MemoryStore);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MemoryStore).call(this));
    _this.resources = [];
    return _this;
  }

  (0, _createClass2["default"])(MemoryStore, [{
    key: "put",
    value: function put(resource) {
      this.resources[resource.instance.id] = resource;
    }
  }, {
    key: "retrive",
    value: function retrive(id) {
      if (this.resources[resource.instance.id]) return new AsyncReply(this.resources[resource.instance.id]);else return new AsyncReply(null);
    }
  }, {
    key: "get",
    value: function get(resource) {
      return new AsyncReply(null);
    }
  }, {
    key: "link",
    value: function link(resource) {
      if (resource.instance.store == this) return this.instance.name + "/" + resource.instance.id;
    }
  }, {
    key: "trigger",
    value: function trigger(_trigger) {
      return new AsyncReply(true);
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

exports["default"] = MemoryStore;

},{"../Resource/IStore.js":57,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":7,"@babel/runtime/helpers/inherits":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/possibleConstructorReturn":11}],74:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Warehouse = _interopRequireDefault(require("./Resource/Warehouse.js"));

var _Structure = _interopRequireDefault(require("./Data/Structure.js"));

var _DistributedResource = _interopRequireDefault(require("./Net/IIP/DistributedResource.js"));

var _MemoryStore = _interopRequireDefault(require("./Stores/MemoryStore.js"));

var _IResource = _interopRequireDefault(require("./Resource/IResource.js"));

if (window) {
  window.wh = _Warehouse["default"];
  window.Structure = _Structure["default"];
  window.DistributedResource = _DistributedResource["default"];
  window.MemoryStore = _MemoryStore["default"];
  window.IResource = _IResource["default"];
} else if (global) {
  global.wh = _Warehouse["default"];
  global.Structure = _Structure["default"];
  global.DistributedResource = _DistributedResource["default"];
  global.MemoryStore = _MemoryStore["default"];
  global.IResource = _IResource["default"];
}

var _default = _Warehouse["default"];
exports["default"] = _default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Data/Structure.js":36,"./Net/IIP/DistributedResource.js":41,"./Resource/IResource.js":56,"./Resource/Warehouse.js":65,"./Stores/MemoryStore.js":73,"@babel/runtime/helpers/interopRequireDefault":9}]},{},[74]);
