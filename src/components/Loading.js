import React, { Component } from 'react';
import { ActivityIndicator, View  } from 'react-native';

class Loading extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;
