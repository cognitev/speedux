'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMiddleware = exports.addReducer = exports.store = exports.Provider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Dependency imports.
                                                                                                                                                                                                                                                                   */


/**
 * Local imports.
 */


var _reactRedux = require('react-redux');

Object.defineProperty(exports, 'Provider', {
  enumerable: true,
  get: function get() {
    return _reactRedux.Provider;
  }
});
exports.connect = connect;
exports.createModule = createModule;

require('babel-polyfill');

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _store = require('./store');

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A valid StoreManager must be used with the Connector before calling Connector.connect()
 * with any component
 */
_connector2.default.use(_store.StoreManager);

/**
 * Export a store instance
 */
var store = exports.store = _store.StoreManager.getInstance();

/**
 * Export addReducer and useMiddleware from the store manager
 * addReducer(key, reducerFunction)     Allows using middlewares with the store
 * useMiddleware(middlewareFunction)    Adds a reducer function to be used by the root reducer
 */
var addReducer = _store.StoreManager.addReducer,
    useMiddleware = _store.StoreManager.useMiddleware;

/**
 * Connects a component to the Redux store and injects its state and actions via the props.
 * If the module name is not provided, the name of the component or function will be used instead.
 * If the initial state is not provided, an empty object will be assumed to be the initial state.
 * @param {Class|Function}    component     The component to be connected.
 * @param {Object}            config        An object that represents the module configuration.
 */

exports.addReducer = addReducer;
exports.useMiddleware = useMiddleware;
function connect(component) {
  var module = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (helpers.getObjectType(module) !== 'object') {
    throw new Error('Module must be an object');
  }

  if (!module.name) {
    module.setName(helpers.getComponentName(component));
  }

  return _connector2.default.connect(component, module);
}

var moduleNames = [];

/**
 * Export a createModule function that creates a module object internally. The exported module
 * will contain the initial state, action creators object, sagas object and the reducer function.
 *
 * @param {Object}    config          An object that represents the module configuration.
 * @return  {Object}                  The module object.
 */
function createModule(name) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!name) {
    throw new Error('Module name cannot be empty');
  }

  if (moduleNames.includes(name)) {
    throw new Error('Name \'' + name + '\' is already used by another module');
  } else {
    moduleNames.push(name);
  }

  if (helpers.getObjectType(config) !== 'object') {
    throw new Error('Module configuration must be an object');
  }

  return new _module2.default(_extends({
    name: name
  }, config));
}

exports.default = connect;