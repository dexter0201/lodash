define(['./_getTag', './isArguments', './isArray', './isArrayLike', './isBuffer', './isFunction', './isObjectLike', './_isPrototype', './isString', './_nativeKeys'], function(getTag, isArguments, isArray, isArrayLike, isBuffer, isFunction, isObjectLike, isPrototype, isString, nativeKeys) {

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
  var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (isArrayLike(value) &&
        (isArray(value) || isString(value) || isFunction(value.splice) ||
          isArguments(value) || isBuffer(value))) {
      return !value.length;
    }
    if (isObjectLike(value)) {
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
    }
    var isProto = isPrototype(value);
    for (var key in value) {
      if (hasOwnProperty.call(value, key) &&
          !(isProto && key == 'constructor')) {
        return false;
      }
    }
    return !(nonEnumShadows && nativeKeys(value).length);
  }

  return isEmpty;
});