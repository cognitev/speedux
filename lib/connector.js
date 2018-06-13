'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Dependency imports.
                                                                                                                                                                                                                                                                               */


/**
 * Local imports.
 */


var _react = require('react');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _helpers = require('./helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is a wrapper object that allows connecting components to a Redux store.
 * First, set a reference to a StorManage object using `Connector.use()` then
 * use `Connector.connect()`.
 */
var Connector = {
  /**
   * Holds a refernece to a StoreManager object. Set this with `Connector.use()` method.
   */
  storeManager: null,

  /**
   * Allows setting a reference to a StoreManager object.
   * @param {Object}  storeManager Reference to a StoreManager object.
   */
  use: function use(storeManager) {
    Connector.storeManager = storeManager;
  },

  /**
   * Connects a component to the Redux store and injects its state and actions via the props.
   * It takes two arguments, the component to be connected and a configuration object then
   * returns the connected component.
   * @param   {Class}   component Reference to the class of the component to be connected
   *                              to the store.
   * @param   {Object}  config    Configuration object that contains the following keys:
   *                                - reducer         Reference to the component reducer function.
   *                                - actions         Reference to the actions object. This is a
   *                                                  hash table of action creator functions.
   *                                - sagas           Reference to the sagas object. This is a
   *                                                  hash table of generator functions, each
   *                                                  represents a saga.
   *                                - name            Key to be used to extract the state object.
   *                                - stateKey        Namespace that will be used to pass component
   *                                                  state via props.
   *                                - actionsKey      Namespace that will be used to pass component
   *                                                  actions via props.
   * @return  {Object}            The connected component.
   */
  connect: function connect(component) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // the passed component must be a valid React component class or a function
    if (typeof component !== 'function' && Object.getPrototypeOf(component) !== _react.Component) {
      throw new Error('Expected the first parameter to be a pure function or a valid React component class.');
    }

    // the passed configuration must be an object
    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      throw new Error('Expected the second parameter to be a valid object.');
    }

    // Connector.use() must be called with a valid StoreManager before calling connect()
    if (Connector.storeManager === null) {
      throw new Error('Expected a valid StoreManager to be used before calling `connect`.');
    }

    // if no reducer is provided, use a simple reducer that returns the state as it is.
    var reducer = config.reducer || function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return state;
    };

    // default value for the actions object is an empty object (no actions).
    var actions = config.actionCreators || {};

    // default value for the sagas object is an empty object (no sagas).
    var sagas = config.sagas || {};

    // get the component name
    var componentName = (0, _helpers.getComponentName)(component);

    // default value for the stateKey is the component display name or function name
    // (component is stateless)
    var stateKey = config.stateKey === 'auto' ? componentName : config.stateKey;

    // default value for the actionsKey is the same as stateKey
    var actionsKey = config.actionsKey === 'auto' ? componentName : config.actionsKey;

    // default value for the name is the same as stateKey
    var name = config.name === '' ? componentName : config.name;

    // register reducer
    if (reducer && name) {
      Connector.storeManager.addReducer(name, reducer);
    }

    // maps component state to component props
    var mapStateToProps = stateKey ? function (state) {
      return _defineProperty({}, stateKey, state[name]);
    } : null;

    // maps component actions to dispatchProps
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return (0, _redux.bindActionCreators)(actions, dispatch);
    };

    // combines component props, mapped props from state and mapped props from dispatchProps
    var combineProps = function combineProps(stateProps, dispatchProps, ownProps) {
      var newProps = _extends({}, ownProps, stateProps);

      if (actionsKey) {
        if (actionsKey === stateKey) {
          newProps.actions = _defineProperty({}, actionsKey, _extends({}, dispatchProps));
        } else {
          newProps[actionsKey] = _extends({}, dispatchProps);
        }
      }

      return newProps;
    };

    // get the connected component
    var connectedComponent = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, combineProps)(component);

    // run each saga
    Object.keys(sagas).forEach(function (key) {
      Connector.storeManager.runSaga(sagas[key]);
    });

    return connectedComponent;
  }
};

exports.default = Connector;