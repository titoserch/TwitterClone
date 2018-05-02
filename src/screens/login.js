import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { graphql } from 'react-apollo'

import LOGIN from '../graphql/mutations/login'

class Login extends Component {

    state ={
        username: '',
        password: '',
      }
          
      _onChangeText = (text, type) => this.setState({ [type]: text });
    
      _onSignupPress = async () => {
        const { username, password } = this.state
    
        const { data } = await this.props.mutate({
          variables: {
            username,
            password,
          }
        })
    
        this.setState({ registered: true })
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
        <Button onPress={this._onSignupPress} style={styles.button} title="LOGIN"></Button>        
      </View>
    );
  }
}

export default graphql(LOGIN)(Login);

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