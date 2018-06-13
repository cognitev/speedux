'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Extracts parameters of a function as an array.
 * @param   {Function}  func  Reference to the function.
 * @return  {Array}           An array of argument names the function expects to receive.
 */
var getArgNames = exports.getArgNames = function getArgNames(func) {
  // convert the function to a string and remove spaces
  var str = func.toString().replace(/\s+/g, '');

  // `params` is a comma-separated string representing the
  // parameters that the function expects
  var params = '';

  // check if the input is a normal function
  if (str.startsWith('function')) {
    var i = str.indexOf('(');
    var p = 0; // number of open parentheses

    for (; i < str.length; i += 1) {
      if (str[i] === '(') p += 1;
      if (str[i] === ')') p -= 1;
      if (p === 0) {
        params = str.slice(str.indexOf('('), i + 1);
        break;
      }
    }
  } else
    // not a normal function, check if it is an arrow function
    if (str[0] === '(') {
      var _i = 0;
      var _p = 0; // number of open parentheses

      for (; _i < str.length; _i += 1) {
        if (str[_i] === '(') _p += 1;
        if (str[_i] === ')') _p -= 1;
        if (str[_i] === '=' && str[_i + 1] === '>' && _p === 0) {
          params = str.slice(0, _i);
          break;
        }
      }
    } else {
      var _ref = str.match(/(.*?)(?==>)/) || [];

      var _ref2 = _slicedToArray(_ref, 1);

      params = _ref2[0];
    }

  // clear destructuring and parentheses
  params = params && params.replace(/[{}()\s]/g, '');

  // convert to an array of un-clean parameters
  params = params && params.split(',') || [];

  // clean and return the parameters
  // (.*?): -> handle renaming
  // =.*$   -> handle default values
  return params.map(function (param) {
    return param.replace(/(.*?):/, '').replace(/=.*$/, '');
  });
};

/**
 * Returns type of a given object.
 * @param   {Any}     obj   Object to inspect for type.
 * @return  {String}        Type of the given object.
 */
var getObjectType = exports.getObjectType = function getObjectType(obj) {
  var typeString = Object.prototype.toString.call(obj);
  return typeString.toLowerCase().replace(/\[object\s|\]/g, '');
};

/**
 * Uses a string path to search for a direct property in an object and return its value or
 * replace it if a new value is provided.
 * @param {Object}  obj           Object to search.
 * @param {String}  prop          String that represents the property name.
 * @param {Any}     value         New value to replace the property with. Omit this
 *                                parameter if you just want to read the property.
 * @return {Object}               Value of the property or a copy of the same object updated
 *                                with the provided value.
 */
var findDirectPropInObject = exports.findDirectPropInObject = function findDirectPropInObject(obj, prop) {
  var copyByRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var type = getObjectType(obj);
  var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
  var value = arguments.length <= 3 ? undefined : arguments[3];

  // cannot work with types other than arrays and objects
  if (type !== 'array' && type !== 'object') {
    return obj;
  }

  // start with a reference to the given object
  var result = obj;

  // de-reference, if that is required
  if (!copyByRef) {
    if (type === 'array') {
      result = [].concat(_toConsumableArray(obj));
    }

    if (type === 'object') {
      result = _extends({}, obj);
    }
  }

  // handle an empty prop name
  if (prop === '') {
    if (shouldReplace) {
      // trying to write to an empty path on an object or an array would
      // result in the same given object or array
      return result;
    }

    // trying to read an empty path results in 'undefined' value
    return undefined;
  }

  // handle a wildcard
  if (prop === '*') {
    if (shouldReplace) {
      if (type === 'array') {
        if (value === undefined) {
          while (result.length) {
            findDirectPropInObject(result, 0, true, value);
          }
        } else {
          var _result = result,
              length = _result.length;

          // traverse the array end-to-start to make sure splicing
          // items does not affect the current index

          result.forEach(function (item, index) {
            var itemIndex = length - 1 - index;
            var itemValue = value;

            if (getObjectType(value) === 'function') {
              itemValue = value(result[itemIndex]);
            }

            if (itemValue === undefined) {
              findDirectPropInObject(result, itemIndex, true, undefined);
            } else {
              var newResult = findDirectPropInObject(result, itemIndex, copyByRef, itemValue);
              result[itemIndex] = newResult[itemIndex];
            }
          });
        }
      } else if (type === 'object') {
        Object.keys(result).forEach(function (key) {
          return findDirectPropInObject(result, key, true, value);
        });
      }

      return result;
    }

    // reading a wildcard on an array would return the values
    // of the given array
    if (type === 'array') {
      return result;
    } else
      // reading a wildcard on an object would return the values
      // of the given object
      if (type === 'object') {
        return Object.values(result);
      }
  }

  // handle other values
  if (shouldReplace) {
    var replaceWith = value;

    if (getObjectType(replaceWith) === 'function') {
      replaceWith = replaceWith(result[prop]);
    }

    // update the value then return the resulting object
    if (replaceWith === undefined && type === 'array') {
      result.splice(prop, 1);
    } else if (replaceWith === undefined && type === 'object') {
      delete result[prop];
    } else {
      result[prop] = replaceWith;
    }

    return result;
  }

  // return the value of the prop
  return result[prop];
};

/**
 * Uses a string path to search for a property in an object and return its value or
 * replace it if a new value is provided.
 * @param {Object}  obj           Object to search.
 * @param {String}  pathStr       String that represents the property path.
 *                                For example: data.entries[0][3].title
 * @param {Any}     value         New value to replace the property with. Omit this
 *                                parameter if you just want to read the property.
 * @return {Object}               Value of the property or a copy of the same object updated
 *                                with the provided value.
 */
var findPropInObject = exports.findPropInObject = function findPropInObject(obj, pathStr) {
  var copyByRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var type = getObjectType(obj);
  var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
  var value = arguments.length <= 3 ? undefined : arguments[3];

  // clean and convert the path string into an array
  var path = pathStr.toString().replace(/^\[|\]$/g, ''); // remove starting and ending brackets
  path = path.replace(/\[|\]/g, '.'); // convert all brackets to dots
  path = path.replace(/\.{2,}/g, '.'); // remove dot duplications
  path = path.split('.'); // break the string at the dots

  if (path.length === 1) {
    if (shouldReplace) {
      return findDirectPropInObject(obj, path[0], copyByRef, value);
    }

    return findDirectPropInObject(obj, path[0], copyByRef);
  }

  // start with a reference to the given object
  var result = obj;

  // de-reference, if that is required
  if (!copyByRef) {
    if (type === 'array') {
      result = [].concat(_toConsumableArray(obj));
    }

    if (type === 'object') {
      result = _extends({}, obj);
    }
  }

  var prop = path[0];
  var remainingPath = path.slice(1).join('.');

  if (shouldReplace) {
    // if the current path component is a wildcard, each item would have
    // to be mapped with value returned from the remaining path
    if (prop === '*') {
      if (type === 'array') {
        result.forEach(function (item, index) {
          result[index] = findPropInObject(item, remainingPath, copyByRef, value);
        });
      }

      if (type === 'object') {
        Object.keys(result).forEach(function (key) {
          result[key] = findPropInObject(result[key], remainingPath, copyByRef, value);
        });
      }

      return result;
    }

    if (typeof result[prop] === 'undefined') {
      result[prop] = {};
    }

    result[prop] = findPropInObject(result[prop], remainingPath, copyByRef, value);

    return result;
  }

  // if the current path component is a wildcard, each item would have
  // to be mapped with value returned from the remaining path
  if (prop === '*') {
    if (type === 'array') {
      return result.map(function (item) {
        return findPropInObject(item, remainingPath, copyByRef);
      });
    }

    if (type === 'object') {
      return Object.values(result).map(function (item) {
        return findPropInObject(item, remainingPath, copyByRef);
      });
    }
  }

  // the `|| {}` part handles undefined values, it will return `undefined` instead
  // of throwing an error
  return findPropInObject(result[prop] || {}, remainingPath, copyByRef);
};

/**
 * Converts any string to camel-case format.
 * @param {String}  str String to convert.
 * @return {String}     The formatted string.
 */
var toCamelCase = exports.toCamelCase = function toCamelCase(str) {
  // remove spaces, dashes and underscores from the begining of the string
  // /^[A-Z]+$/ -> lowercases the string if it's all uppercase
  var cleanString = str.replace(/[^\w\s_-]/g, '').replace(/^[A-Z]+$/, function (w) {
    return w.toLowerCase();
  });

  // if it's in snakecase, convert it to camelcase
  if (/(.*?)[\s_-]/.test(cleanString)) {
    var parts = cleanString.replace(/[\s_-]|[a-z](?=[A-Z])/g, function (w) {
      return (/[\s_-]/.test(w) ? ':' : w + ':'
      );
    }).split(':');
    var transformedParts = parts.map(function (w, i) {
      return i === 0 ? w.toLowerCase() : '' + w[0].toUpperCase() + w.slice(1).toLowerCase();
    });
    return transformedParts.join('');
  } else
    // if it's already in camelcase, return it
    if (/([a-z][A-Z])+/.test(cleanString)) {
      return cleanString;
    }

  return cleanString;
};

/**
 * Converts any string to snake-case format.
 * @param {String}  str String to convert.
 * @return {String}     The formatted string.
 */
var toSnakeCase = exports.toSnakeCase = function toSnakeCase(str) {
  var camelCase = toCamelCase(str);
  return camelCase.replace(/[a-z](?=[A-Z])/g, function (w) {
    return w[0] + '_';
  }).toLowerCase();
};

/**
 * Deep-copies an object or an array.
 * @param {Object | Array} obj Object or Array to copy.
 */
var deepCopy = exports.deepCopy = function deepCopy(obj) {
  var type = getObjectType(obj);

  if (type === 'object' || type === 'array') {
    var newObj = type === 'array' ? [] : {};

    Object.keys(obj).forEach(function (key) {
      if (['object', 'array'].includes(getObjectType(obj[key]))) {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }

  return obj;
};

/**
 * Generates a component name based on the display name of the component or the function
 * name if it's a functional component.
 * @param   {Object}  component Target component.
 * @return  {String}            Component name as a string or null.
 */
var getComponentName = exports.getComponentName = function getComponentName(component) {
  var displayName = component.displayName && '' + component.displayName[0].toLowerCase() + component.displayName.slice(1);
  var functionName = component.name && '' + component.name[0].toLowerCase() + component.name.slice(1);
  return displayName || functionName || null;
};