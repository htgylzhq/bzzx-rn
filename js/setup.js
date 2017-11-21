import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider, Root } from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function setup():React.Component {
  class Bzzx extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        <Root>
          <StyleProvider style={getTheme(platform)}>
            <Provider store={this.state.store}>
              <App />
            </Provider>
          </StyleProvider>
        </Root>
      );
    }
  }

  return Bzzx;
}

export default setup;
