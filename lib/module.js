'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dependency imports.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


/**
 * Local imports.
 */


var _effects = require('redux-saga/effects');

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class definition.
 */
var Module = function () {
  function Module() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Module);

    _initialiseProps.call(this);

    this.config(options);
  }

  // a hashmap of all the action types for the module with the name as the key
  // and the prefixed type as the value

  // a hashmap of all the action creator functions for the module with the action
  // name in camelCase as the key and the action creator function as the value

  // a hashmap of sub reducer functions, for each registered action
  // the main reducer function of the module will check this hash table whenever
  // it is called with an action to allow each sub reducer to process the action

  // a hashmap of all the saga generator functions for the module with the action
  // type as the key and the generator function as the value

  // a hashmap of all the assigned saga workers with the action type as the key and
  // the generator function as the value


  /**
   * Configures the module with a configuration object
   */


  /**
   * Returns the module prefix. This is mainly used to prefix action types to allow
   * using the same action name with different modules without conflicting each other.
   */


  /**
   * Sets the module name.
   */


  /**
   * Creates the action creator functions, the sagas, the main reducer function and registers
   * the action type string.
   * @param {String}    name        An uppercase snake_case string that represents the action
   *                                name. For example 'ADD_COUNT' or 'CHANGE_USER_EMAIL'. You can
   *                                use camelCase or include spaces, dashes and underscore as well.
   * @param {Function}  callback    A function that returns an object. The returned object
   *                                represents a state fragment which is used to update the
   *                                state object. For asyncronous actions, use a generator
   *                                function to yield multiple times.
   */


  /**
   * Creates a sub reducer function to handle the provided action type.
   * @param {String}    actionType  Action type to handle.
   * @param {Function}  callback    A function that returns an object. The returned object
   *                                represents a state fragment which is used to update the
   *                                state object. For asyncronous actions, use a generator
   *                                function to yield multiple times.
   */


  /**
   * Create all sub reducers for the module.
   */


  /**
   * The main reducer function for the module.
   */


  /**
   * Creates and returns a sub reducer function for a given action type.
   * @param   {Object}    actionType  Type of the action for which the reducer will be created.
   * @param   {Function}  callback    The callback function assigned to the action by calling
   *                                  `createAction` or `handleAction`.
   * @param   {Array}     argNames    An array of strings that represent the names of arguments
   *                                  the callback function expects.
   * @param   {String}    mode        A string that can be one of two values, 'create' if the
   *                                  callback was assigned using `createAction` or 'handle` if
   *                                  the callback was assigned using `handleAction`.
   * @return  {Function}              A reducer function that can handle the given action type.
   */


  /**
   * Creates and returns a saga generator function for a given action type.
   * @param   {String}              actionType    Type of the action for which the saga will
   *                                              be created.
   * @return  {GeneratorFunction}                 Saga generator function.
   */


  /**
   * Creates and returns a worker saga generator function for a given action type.
   * @param   {String}              actionType    Type of the action for which the saga worker will
   *                                              be created.
   * @return  {GeneratorFunction}                 Worker saga generator function.
   */


  /**
   * Returns the component state object or part of it based on a given query. If the
   * query parameter is a string that uses dot notation, it will return the resolved
   * value of the given key. If the query is an object, it will return an object that
   * has the same structure but contains the resolved values. If the query parameter
   * is not provided, the complete state object will be returned.
   * @param   {String|Object}   query   A query string or a query object that represents
   *                                    part of the state object that needs to be fetched.
   *                                    This parameter is not required.
   * @return  {Object}                  The state object, part of it or a value in the state object.
   */


  /**
   * Executes a given callback function and passes it getState in the context.
   * @param   {Object}    action      The action object that was dispatched and caused the
   *                                  execution of the callback.
   * @param   {Function}  callback    The callback function assigned to the action by calling
   *                                  `createAction` or `handleAction`.
   * @param   {Array}     argNames    An array of strings that represent the names of arguments
   *                                  the callback function expects.
   * @param   {String}    mode        A string that can be one of two values, 'create' if the
   *                                  callback was assigned using `createAction` or 'handle` if
   *                                  the callback was assigned using `handleAction`.
   * @return  {Object}                Either an object which will be used to update the state
   *                                  or a generator object.
   */


  /**
   * Merges two state objects and returns the merged object as a new copy.
   * @param   {Object}  stateA    First state object.
   * @param   {Object}  stateB    Second state object.
   * @return  {Object}            The merged state object.
   */


  /**
   * Checks whether the module owns (has created) the provided action type.
   * @param   {String}    actionType    Action type in question.
   * @return  {Boolean}                 A boolean that represents whether the action type
   *                                    is owned (was created) by the module or not.
   */


  /**
   * Returns the context used for a callback (action or handler)
   * @return  {Object}   An object that is provided as a context to `createAction` and
   *                     `handleAction` callback functions.
   */


  _createClass(Module, null, [{
    key: 'getActionTypeMatchers',


    /**
     * Creates an array of matchers for a given action type.
     * @param   {String} actionType   Action type to build the array of matchers against.
     * @return  {Array}               An array that represents the possible matchers for a
     *                                given action type.
     */
    value: function getActionTypeMatchers(actionType) {
      var regex = /@@(.+?)\/(.+)/;
      var moduleName = '';
      var actionName = actionType;

      if (regex.test(actionType)) {
        var _actionType$match = actionType.match(regex);

        var _actionType$match2 = _slicedToArray(_actionType$match, 3);

        moduleName = _actionType$match2[1];
        actionName = _actionType$match2[2];
      }

      return [actionType, // exact action
      '@@' + moduleName, // any action by the module
      '@@' + moduleName + '/', // any action by the module (alias)
      '@@' + moduleName + '/*', // any action by the module (alias)
      '@@*/' + actionName, // same action dispatched by any module
      '*/' + actionName, // same action dispatched by any module (alias)
      '*'];
    }
  }]);

  return Module;
}();

Module.defaults = {
  // unique identifier key for the module
  name: '',
  // namespace to use when passing state keys as props
  stateKey: 'state',
  // namespace to use when passing action creators as props
  actionsKey: 'actions',
  // hashmap of the module actions (each action is a normal or a generator function)
  actions: {},
  // hashmap of handler functions, use the action type as the key or the function name
  // and a reference to the handler function as the value
  handlers: {},
  // initial state object of the module
  initialState: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.types = {};
  this.actionCreators = {};
  this.reducers = {};
  this.sagas = {};
  this.workerSagas = {};

  this.config = function (options) {
    var config = _extends({}, Module.defaults, _this.currentConfig, options);

    _this.name = config.name;
    _this.stateKey = config.stateKey;
    _this.actionsKey = config.actionsKey;
    _this.initialState = helpers.deepCopy(config.state || config.initialState);
    _this.actions = {};
    _this.handlers = {};
    _this.currentConfig = helpers.deepCopy(config);

    Object.keys(config.actions).forEach(function (action) {
      _this.actions[action] = config.actions[action].bind(_this.getCallbackContext());
    });

    Object.keys(config.handlers).forEach(function (handler) {
      _this.handlers[handler] = config.handlers[handler].bind(_this.getCallbackContext());
    });

    _this.createSubReducers();
  };

  this.getPrefix = function () {
    if (_this.name) {
      return '@@' + _this.name + '/';
    }

    return '';
  };

  this.setName = function (newName) {
    _this.name = newName;
    _this.types = {};
    _this.actionCreators = {};
    _this.reducers = {};
    _this.sagas = {};
    _this.workerSagas = {};

    _this.createSubReducers();
  };

  this.createAction = function (name) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return null;
    };

    var camelCaseName = helpers.toCamelCase(name);
    var actionName = helpers.toSnakeCase(camelCaseName).toUpperCase();
    var actionType = '' + _this.getPrefix() + actionName;
    var argNames = helpers.getArgNames(callback);

    // useful for using the defined action to reference the prefixed action type
    _this.actions[name] = callback.bind(_this.getCallbackContext());
    _this.actions[name].toString = function () {
      return actionType;
    };

    // register type
    _this.types[actionName] = actionType;

    // build the action creator function
    _this.actionCreators[camelCaseName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // build the payload object
      var payload = argNames.reduce(function (prev, next, index) {
        return _extends({}, prev, _defineProperty({}, next, args[index]));
      }, {});

      // then use it to build the action object
      var actionObject = {
        type: actionType,
        payload: payload
      };

      return actionObject;
    };

    // build the reducer function
    _this.reducers[actionType] = _this.createSubReducer(actionType, callback, argNames, 'create');

    // build the saga handler
    _this.sagas[actionType] = _this.createSaga(actionType);
  };

  this.handleAction = function (actionType) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return null;
    };

    var argNames = helpers.getArgNames(callback);

    _this.handlers[actionType] = callback.bind(_this.getCallbackContext());

    // build the reducer function
    _this.reducers[actionType] = _this.createSubReducer(actionType, callback, argNames, 'handle');

    // build the saga handler
    _this.sagas[actionType] = _this.createSaga(actionType);
  };

  this.createSubReducers = function () {
    Object.entries(_this.currentConfig.actions).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          actionName = _ref2[0],
          actionCallback = _ref2[1];

      _this.createAction(actionName, actionCallback);
    });

    Object.entries(_this.currentConfig.handlers).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          actionType = _ref4[0],
          handlerCallback = _ref4[1];

      _this.handleAction(actionType, handlerCallback);
    });
  };

  this.reducer = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: '' };

    // the action type might be in normal form, such as: '@@prefix/ACTION_NAME'
    // or it may contain a sub action type: '@@prefix/ACTION_NAME/SUB_ACTION_NAME'
    var actionType = action.type;
    var mainActionType = (actionType.match(/@@(.*?)\/((.*?)(?=\/)|(.*?)$)/) || [])[0] || actionType;
    var subActionType = actionType.replace(mainActionType, '').slice(1);
    var actionName = _this.ownsAction(mainActionType) ? mainActionType.replace(/^@@(.*?)\//, '') : 'HANDLE_ACTION';

    var newState = state;

    // if the sub action is 'update', just update the state with the payload object
    if (mainActionType === '' + _this.getPrefix() + actionName && subActionType === 'UPDATE') {
      newState = _this.mergeStates(state, action.payload || {});
      _this.$state = newState;
      return newState;
    }

    // if it's a main action, look for a sub reducer that can handle this action
    Module.getActionTypeMatchers(mainActionType).forEach(function (matcher) {
      if (typeof _this.reducers[matcher] !== 'undefined') {
        newState = _this.reducers[matcher](newState, action);
      }
    });

    // if it's an irrelevant action, just return the state
    _this.$state = newState;
    return newState;
  };

  this.createSubReducer = function (actionType, callback, argNames, mode) {
    return function (state, action) {
      var matchers = Module.getActionTypeMatchers(action.type);

      if (matchers.includes(actionType)) {
        var result = _this.executeCallback(action, callback, argNames, mode);
        var resultType = helpers.getObjectType(result);
        var stateFragment = resultType === 'object' ? result : {};

        // the saga handler will be called right after the reducer so instead of the saga
        // handler executing the callback again, pass it the cached result
        _this.$cachedCallbackResult = _this.$cachedCallbackResult || {};
        _this.$cachedCallbackResult[actionType] = result;

        return _this.mergeStates(state, stateFragment);
      }

      return state;
    };
  };

  this.createSaga = function (actionType) {
    return (/*#__PURE__*/regeneratorRuntime.mark(function saga() {
        return regeneratorRuntime.wrap(function saga$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.workerSagas[actionType] = this.createWorkerSaga(actionType);
                _context.next = 3;
                return (0, _effects.takeLatest)(actionType, this.workerSagas[actionType]);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, saga, this);
      }).bind(_this)
    );
  };

  this.createWorkerSaga = function (actionType) {
    return (/*#__PURE__*/regeneratorRuntime.mark(function workerSaga(action) {
        var _this2 = this;

        var result, actionName, data, isDone, breakAfter, _loop;

        return regeneratorRuntime.wrap(function workerSaga$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                result = this.$cachedCallbackResult[actionType];
                actionName = this.ownsAction(action.type) ? action.type.replace(/^@@(.*?)\//, '') : 'HANDLE_ACTION';

                // check if the callback return value is an iterable (usually a generator function)
                // if it is an iterable then consume it

                if (!(result && typeof result[Symbol.iterator] === 'function')) {
                  _context3.next = 21;
                  break;
                }

                _context3.prev = 3;

                // `data` will be assigned to each `next()` call
                data = void 0;
                // `isDone` will be true when `next()` returns done as true

                isDone = false;
                // the while loop will break after a maximum of 50 calls

                breakAfter = 50;
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var next, nextResult;
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          next = result.next(data);
                          nextResult = next.value;


                          isDone = next.done;

                          // if the yielded value is a Promise, resolve it then continue

                          if (!(nextResult instanceof Promise)) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 6;
                          return (0, _effects.call)(function () {
                            return nextResult;
                          });

                        case 6:
                          data = _context2.sent;
                          _context2.next = 12;
                          break;

                        case 9:
                          if (!(helpers.getObjectType(nextResult) === 'object')) {
                            _context2.next = 12;
                            break;
                          }

                          _context2.next = 12;
                          return (0, _effects.put)({
                            type: '' + _this2.getPrefix() + actionName + '/UPDATE',
                            payload: nextResult
                          });

                        case 12:

                          breakAfter -= 1;

                          // safety break

                          if (!(breakAfter === 0)) {
                            _context2.next = 15;
                            break;
                          }

                          throw new Error('An async action handler yielded more than 50 values.');

                        case 15:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop, _this2);
                });

              case 8:
                if (isDone) {
                  _context3.next = 12;
                  break;
                }

                return _context3.delegateYield(_loop(), 't0', 10);

              case 10:
                _context3.next = 8;
                break;

              case 12:
                _context3.next = 14;
                return (0, _effects.put)({
                  type: '' + this.getPrefix() + actionName + '/COMPLETE'
                });

              case 14:
                _context3.next = 21;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t1 = _context3['catch'](3);

                window.console.error(_context3.t1);

                _context3.next = 21;
                return (0, _effects.put)({
                  type: '' + this.getPrefix() + actionName + '/ERROR',
                  message: _context3.t1.message
                });

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, workerSaga, this, [[3, 16]]);
      }).bind(_this)
    );
  };

  this.getState = function (query) {
    var state = _this.$state;

    // handle query strings
    if (helpers.getObjectType(query) === 'string') {
      return helpers.findPropInObject(state, query);
    }

    // handle query objects
    if (helpers.getObjectType(query) === 'object') {
      return Object.keys(query).reduce(function (prev, next) {
        return _extends({}, prev, _defineProperty({}, next, helpers.findPropInObject(state, query[next])));
      }, {});
    }

    return state;
  };

  this.executeCallback = function (action, callback, argNames) {
    var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'create';

    var callbackArgs = mode === 'create' ? argNames.map(function (arg) {
      return action.payload[arg];
    }) : [action];

    return callback.apply(_this.getCallbackContext(), callbackArgs);
  };

  this.mergeStates = function (stateA, stateB) {
    return Object.keys(stateB).reduce(function (prev, next) {
      return helpers.findPropInObject(prev, next, false, stateB[next]);
    }, _extends({}, stateA));
  };

  this.ownsAction = function (actionType) {
    return Object.values(_this.types).includes(actionType);
  };

  this.getCallbackContext = function () {
    return {
      getState: _this.getState,
      get state() {
        return this.getState();
      }
    };
  };
};

exports.default = Module;