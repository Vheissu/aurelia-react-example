/* */ 
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library'),
      global = require('./_global'),
      $ = require('./_'),
      fails = require('./_fails'),
      $export = require('./_export'),
      $typed = require('./_typed'),
      $buffer = require('./_typed-buffer'),
      ctx = require('./_ctx'),
      anInstance = require('./_an-instance'),
      propertyDesc = require('./_property-desc'),
      hide = require('./_hide'),
      redefineAll = require('./_redefine-all'),
      isInteger = require('./_is-integer'),
      toInteger = require('./_to-integer'),
      toLength = require('./_to-length'),
      toIndex = require('./_to-index'),
      toPrimitive = require('./_to-primitive'),
      has = require('./_has'),
      same = require('./_same-value'),
      isObject = require('./_is-object'),
      toObject = require('./_to-object'),
      isArrayIter = require('./_is-array-iter'),
      isIterable = require('./core.is-iterable'),
      getIterFn = require('./core.get-iterator-method'),
      uid = require('./_uid'),
      wks = require('./_wks'),
      createArrayMethod = require('./_array-methods'),
      createArrayIncludes = require('./_array-includes'),
      speciesConstructor = require('./_species-constructor'),
      ArrayIterators = require('./es6.array.iterator'),
      Iterators = require('./_iterators'),
      $iterDetect = require('./_iter-detect'),
      setSpecies = require('./_set-species'),
      arrayFill = require('./_array-fill'),
      arrayCopyWithin = require('./_array-copy-within'),
      RangeError = global.RangeError,
      TypeError = global.TypeError,
      Uint8Array = global.Uint8Array,
      BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
      PROTOTYPE = 'prototype',
      ArrayProto = Array[PROTOTYPE],
      $ArrayBuffer = $buffer.ArrayBuffer,
      $DataView = $buffer.DataView,
      getProto = $.getProto,
      getNames = $.getNames,
      setDesc = $.setDesc,
      getDesc = $.getDesc,
      arrayForEach = createArrayMethod(0),
      arrayFilter = createArrayMethod(2),
      arraySome = createArrayMethod(3),
      arrayEvery = createArrayMethod(4),
      arrayFind = createArrayMethod(5),
      arrayFindIndex = createArrayMethod(6),
      arrayIncludes = createArrayIncludes(true),
      arrayIndexOf = createArrayIncludes(false),
      arrayValues = ArrayIterators.values,
      arrayKeys = ArrayIterators.keys,
      arrayEntries = ArrayIterators.entries,
      arrayLastIndexOf = ArrayProto.lastIndexOf,
      arrayReduce = ArrayProto.reduce,
      arrayReduceRight = ArrayProto.reduceRight,
      arrayJoin = ArrayProto.join,
      arraySort = ArrayProto.sort,
      arraySlice = ArrayProto.slice,
      arrayToString = ArrayProto.toString,
      arrayToLocaleString = ArrayProto.toLocaleString,
      ITERATOR = wks('iterator'),
      TAG = wks('toStringTag'),
      TYPED_CONSTRUCTOR = uid('typed_constructor'),
      DEF_CONSTRUCTOR = uid('def_constructor'),
      ALL_CONSTRUCTORS = $typed.CONSTR,
      TYPED_ARRAY = $typed.TYPED,
      VIEW = $typed.VIEW,
      WRONG_LENGTH = 'Wrong length!';
  var $map = createArrayMethod(1, function(O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });
  var LITTLE_ENDIAN = fails(function() {
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });
  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function() {
    new Uint8Array(1).set({});
  });
  var strictToLength = function(it, SAME) {
    if (it === undefined)
      throw TypeError(WRONG_LENGTH);
    var number = +it,
        length = toLength(it);
    if (SAME && !same(number, length))
      throw RangeError(WRONG_LENGTH);
    return length;
  };
  var toOffset = function(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES)
      throw RangeError('Wrong offset!');
    return offset;
  };
  var validate = function(it) {
    if (isObject(it) && TYPED_ARRAY in it)
      return it;
    throw TypeError(it + ' is not a typed array!');
  };
  var allocate = function(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }
    return new C(length);
  };
  var speciesFromList = function(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };
  var fromList = function(C, list) {
    var index = 0,
        length = list.length,
        result = allocate(C, length);
    while (length > index)
      result[index] = list[index++];
    return result;
  };
  var addGetter = function(it, key, internal) {
    setDesc(it, key, {get: function() {
        return this._d[internal];
      }});
  };
  var $from = function from(source) {
    var O = toObject(source),
        aLen = arguments.length,
        mapfn = aLen > 1 ? arguments[1] : undefined,
        mapping = mapfn !== undefined,
        iterFn = getIterFn(O),
        i,
        length,
        values,
        result,
        step,
        iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }
      O = values;
    }
    if (mapping && aLen > 2)
      mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };
  var $of = function of() {
    var index = 0,
        length = arguments.length,
        result = allocate(this, length);
    while (length > index)
      result[index] = arguments[index++];
    return result;
  };
  var TO_LOCALE_BUG = !!Uint8Array && fails(function() {
    arrayToLocaleString.call(new Uint8Array(1));
  });
  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };
  var proto = {
    copyWithin: function copyWithin(target, start) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value) {
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement) {
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn) {
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn) {
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this,
          length = validate(that).length,
          middle = Math.floor(length / 2),
          index = 0,
          value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }
      return that;
    },
    slice: function slice(start, end) {
      return speciesFromList(this, arraySlice.call(validate(this), start, end));
    },
    some: function some(callbackfn) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this),
          length = O.length,
          $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
    }
  };
  var $set = function set(arrayLike) {
    validate(this);
    var offset = toOffset(arguments[1], 1),
        length = this.length,
        src = toObject(arrayLike),
        len = toLength(src.length),
        index = 0;
    if (len + offset > length)
      throw RangeError(WRONG_LENGTH);
    while (index < len)
      this[offset + index] = src[index++];
  };
  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };
  var isTAIndex = function(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && typeof key != 'symbol' && key in target && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : getDesc(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    } else
      return setDesc(target, key, desc);
  };
  if (!ALL_CONSTRUCTORS) {
    $.getDesc = $getDesc;
    $.setDesc = $setDesc;
  }
  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });
  if (fails(function() {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }
  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    set: $set,
    constructor: function() {},
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  setDesc($TypedArrayPrototype$, TAG, {get: function() {
      return this[TYPED_ARRAY];
    }});
  module.exports = function(KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
        ISNT_UINT8 = NAME != 'Uint8Array',
        GETTER = 'get' + KEY,
        SETTER = 'set' + KEY,
        TypedArray = global[NAME],
        Base = TypedArray || {},
        TAC = TypedArray && getProto(TypedArray),
        FORCED = !TypedArray || !$typed.ABV,
        O = {},
        TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value) {
      var data = that._d;
      if (CLAMPED)
        value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index) {
      setDesc(that, index, {
        get: function() {
          return getter(this, index);
        },
        set: function(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function(that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0,
            offset = 0,
            buffer,
            byteLength,
            length;
        if (!isObject(data)) {
          length = strictToLength(data, true);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES)
              throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0)
              throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len)
              throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length)
          addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = $.create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!$iterDetect(function(iter) {
      new TypedArray(null);
      new TypedArray(iter);
    }, true)) {
      TypedArray = wrapper(function(that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        if (!isObject(data))
          return new Base(strictToLength(data, ISNT_UINT8));
        if (data instanceof $ArrayBuffer)
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        if (TYPED_ARRAY in data)
          return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? getNames(Base).concat(getNames(TAC)) : getNames(Base), function(key) {
        if (!(key in TypedArray))
          hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY)
        TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR],
        CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
        $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      setDesc(TypedArrayPrototype, TAG, {get: function() {
          return NAME;
        }});
    }
    O[NAME] = TypedArray;
    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });
    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype))
      hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
    $export($export.P, NAME, proto);
    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
    $export($export.P + $export.F * (fails(function() {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function() {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});
    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME)
      hide(TypedArrayPrototype, ITERATOR, $iterator);
    setSpecies(NAME);
  };
} else
  module.exports = function() {};
