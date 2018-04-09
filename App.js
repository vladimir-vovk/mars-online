import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { AppLoading } from "expo";
import reducers from "./src/reducers";
import Router from "./src/Router";
import { loadAssetsAsync } from "./src/utils";

import appImages from "./assets/images/index";
import appFonts from "./assets/fonts/index";

// TODO: Figure out how to use Redux with redux-devtools package
// import { composeWithDevTools } from "redux-devtools-extension";
// const enhancer = composeWithDevTools()(applyMiddleware(...[ReduxThunk]));
// const store = createStore(reducers, {}, enhancer);

export default class App extends Component {
  state = { isReady: false };

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const _loadAssetsAsync = loadAssetsAsync.bind(this, appImages, appFonts);

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={_loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.log}
        />
      );
    }

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
