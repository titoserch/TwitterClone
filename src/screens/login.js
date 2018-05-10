import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import LOGIN_MUTATION from '../graphql/mutations/login'
import Loading from '../components/Loading'
import { login } from '../actions/user'

class Login extends Component {

  state ={
    username: '',
    password: '',
    loading: false,
  }
      
  _onChangeText = (text, type) => this.setState({ [type]: text });

  _onLoginPress = async () => {
    this.setState({ loading: true })
    const { username, password } = this.state

    const { data } = await this.props.mutate({
      variables: {
        username,
        password,
      }
    })
    try {
      await AsyncStorage.setItem('@token', data.tokenAuth.token)
      this.setState({ loading: false })
      return this.props.login()
    } catch (error) {
      throw error
    }
  }
  render() {

    return (
        <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder="Usuario"
          onChangeText={text => this._onChangeText(text, 'username')}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña"
          onChangeText={text => this._onChangeText(text, 'password')}
        />
        <Button onPress={this._onLoginPress} style={styles.button} title="LOGIN"></Button>        
      </View>
    );
  }
}

export default compose(
  graphql(LOGIN_MUTATION),
  connect(undefined, { login }),
)(Login);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    input: {
      width: '80%',
      borderBottomWidth: 2,
      borderColor: 'black',
      padding: 10,
    },
    button: {
      backgroundColor: 'blue'
    }
  });