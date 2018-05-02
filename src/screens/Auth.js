import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Button  } from 'react-native';

import Modal from "react-native-modal";

import { graphql } from 'react-apollo'
import CREATE_USER from './../graphql/mutations/signup'

import Welcome from '../components/Welcome'

class AuthScreen extends Component {

  state ={
    username: '',
    password: '',
    email: '',
    registered: false,
    modal: true,
  }
  
  _toggleModal = () => this.setState({ modal: false });

  _onChangeText = (text, type) => this.setState({ [type]: text });

  _onSignupPress = async () => {
    const { username, password, email } = this.state

    const { data } = await this.props.mutate({
      variables: {
        username,
        email,
        password,
      }
    })

    this.setState({ registered: true })
  }

  render() {
    if (this.state.registered){
      return (
        <View>
        <Modal style={{backgroundColor: 'yellow'}} backdropOpacity={0.8} isVisible={this.state.modal}>
          <View style={{flex:1}}>
            <Text>Logueate para iniciar sesion</Text>
            <Button title="OK" onPress={this._toggleModal} />
          </View>
        </Modal>
        <Welcome />
        </View>
      )
    }
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
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          onChangeText={text => this._onChangeText(text, 'email')}
        />
        <Button onPress={this._onSignupPress} style={styles.button} title="REGISTRATE"></Button>        
      </View>
    );
  }
}

export default graphql(CREATE_USER)(AuthScreen);

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