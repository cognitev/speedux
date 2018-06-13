'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreManager = exports.devTools = exports.sagaEnhancer = exports.sagaMiddleware = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Dependency imports.
                                                                                                                                                                                                                                                                   */


var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Reference to hold the Redux store instance.
 * @type {Object}
 */
var storeInstance = void 0;

/**
 * Creates the saga middleware function.
 * @type {Function}
 */
var sagaMiddleware = exports.sagaMiddleware = (0, _reduxSaga2.default)();

/**
 * Creates the saga store enhancer.
 * @type {Function}
 */
var sagaEnhancer = exports.sagaEnhancer = (0, _redux.applyMiddleware)(sagaMiddleware);

/**
 * Creates a middleware function that is used to enable Redux devTools.
 * in the browser.
 * @type {Function}
 */
var devTools = exports.devTools = (0, _redux.compose)(window.devToolsExtension ? window.devToolsExtension() : function (foo) {
  return foo;
});

/**
 * This is not the actual store. This is a wrapper object that manages
 * the Redux store instance. Use `StoreManager.getInstance()` to get a reference
 * to the Redux store.
 */
var StoreManager = exports.StoreManager = {
  /**
   * An object that is used as a map to store references to registered
   * reducers. This object is used by `getRootReducer` to create the
   * root reducer for the store.
   * @type {Object}
   */
  reducers: {},

  /**
   * An array of middlewares to use when creating the store.
   * Use `useMiddleware` method to add other middleware functions to this list.
   * @type {Array}
   */
  middleWares: [sagaEnhancer, devTools],

  /**
   * Registers a reducer function.
   * @param  {String}   key       Reducer unique identifier key.
   * @param  {Function} reducer   Reducer function.
   */
  addReducer: function addReducer(name, reducer) {
    StoreManager.reducers[name] = reducer;
    StoreManager.update();
  },


  /**
   * Unregisters a reducer function. If you remove a reducer, you have to explicitly
   * call StoreManager.update() afterwards.
   * @param  {String}   key   Reducer unique identifier key.
   */
  removeReducer: function removeReducer(name) {
    delete StoreManager.reducers[name];
  },


  /**
   * Unregisters all reducer functions. If you remove all reducers, you have to explicitly
   * call StoreManager.update() afterwards.
   */
  removeAllReducers: function removeAllReducers() {
    Object.keys(StoreManager.reducers).forEach(function (name) {
      return StoreManager.removeReducer(name);
    });
  },


  /**
   * Combines all registered reducers and returns a single reducer function.
   * @return {Function} The root reducer function.
   */
  getRootReducer: function getRootReducer() {
    var reducers = _extends({}, StoreManager.reducers);

    if (Object.keys(reducers).length === 0 || process.env.NODE_ENV === 'test') {
      reducers.$_foo = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return state;
      }; // default reducer
    }

    return (0, _redux.combineReducers)(reducers);
  },


  /**
   * Returns an reference to the Redux store instance.
   * @return {Object} Reference to the store instance.
   */
  getInstance: function getInstance() {
    if (!storeInstance) {
      StoreManager.buildInstance();
    }

    return storeInstance;
  },


  /**
   * Creates a new Redux store instance and updates the reference.
   */
  buildInstance: function buildInstance() {
    storeInstance = (0, _redux.createStore)(StoreManager.getRootReducer(), _redux.compose.apply(undefined, _toConsumableArray(StoreManager.middleWares)));
  },


  /**
   * Updates the root reducer of the store. Call this method after adding or
   * removing reducers.
   */
  update: function update() {
    return storeInstance.replaceReducer(StoreManager.getRootReducer());
  },


  /**
   * Allows registering middleware functions such as Router and other middlewares.
   * @param {Function} middleWare Middleware function to use
   */
  useMiddleware: function useMiddleware(middleWare) {
    return StoreManager.middleWares.unshift((0, _redux.applyMiddleware)(middleWare));
  },


  /**
   * Runs a saga generator function.
   * @param {Generator} saga Saga to run.
   */
  runSaga: function runSaga(saga) {
    sagaMiddleware.run(saga);
  }
};

/**
 * Default export.
 */
exports.default = StoreManager.getInstance();