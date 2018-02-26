/**
 * Dependency imports.
 */
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';

const Connector = {
  storeManager: null,

  use: (storeManager) => {
    Connector.storeManager = storeManager;
  },

  connect: (component, config = {}) => {
    if (typeof component !== 'function' && Object.getPrototypeOf(component) !== Component) {
      throw new Error('Expected the first parameter to be a pure function or a valid React component class.');
    }

    if (typeof config !== 'object') {
      throw new Error('Expected the second parameter to be a valid object.');
    }

    if (Connector.storeManager === null) {
      throw new Error('Expected a valid StoreManager to be used before calling `connect`.');
    }

    // if no reducer is provided, use a simple reducer that returns the state as it is.
    const reducer = config.reducer || ((state = {}) => state);

    // default value for the actions object is an empty object (no actions).
    const actions = config.actions || {};

    // default value for the stateKey is the component display name or function name
    // (component is stateless)
    const stateKey = (
      config.stateKey ||
      (component.displayName && `${component.displayName.charAt(0).toLowerCase()}${component.displayName.slice(1)}`) ||
      (component.name && `${component.name.charAt(0).toLowerCase()}${component.name.slice(1)}`) ||
      null
    );

    // default value for the actionsKey is stateKey (more convenient).
    const actionsKey = config.actionsKey || stateKey;

    // register reducer
    if (reducer && stateKey !== null) {
      Connector.storeManager.addReducer(stateKey, reducer);
    }

    // maps component state to component props
    const mapStateToProps = (stateKey === null ? null : state => ({
      [stateKey]: state[stateKey],
    }));

    // maps component actions to dispatchProps
    const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

    // combines component props, mapped props from state and mapped props from dispatchProps
    const combineProps = (stateProps, dispatchProps, ownProps) => {
      let actionProps = { ...dispatchProps };

      if (actionsKey !== null) {
        actionProps = {
          ...ownProps.actions,
          [actionsKey]: dispatchProps,
        };
      }

      return {
        ...ownProps,
        ...stateProps,
        actions: actionProps,
      };
    };

    // get the connected component
    const connectedComponent = reduxConnect(
      mapStateToProps,
      mapDispatchToProps,
      combineProps,
    )(component);

    // update the store to register the new reducer
    Connector.storeManager.update();

    return connectedComponent;
  },
};

export default Connector;
