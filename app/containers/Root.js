// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from "material-ui/es/styles/createMuiTheme"
import blue from "material-ui/es/colors/blue"

type Props = {
  store: {},
  history: {}
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider theme={theme}>
            <Routes />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
