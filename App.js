import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo'
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';

import login from './src/actions/user'

import Welcome from './src/components/Welcome';
import Auth from './src/screens/Auth'
import Login from './src/screens/login'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {

  state = {
    appIsReady: false
  }

  componentWillMount(){
    this._checkIfLogin()
  }

  _checkIfLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if (token != null){
        store.dispatch(login())
      }
    } catch (error) {
      
    }
    this.setState({ appIsReady: true })
  }
  render() {
    if(!this.state.appIsReady){
      return <AppLoading />
    }

    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <Login />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
