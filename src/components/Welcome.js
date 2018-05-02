import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {graphql} from 'react-apollo';

import GET_LINKS from '../graphql/queries/getLinks'
import Links from '../components/Links'

const Root = styled.View`
  alignItems: center;
  justifyContent: center;
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  width: 90%;
  alignSelf: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.PRIMARY};
  fontSize: 18;
  textAlign: center;
`;

class Welcome extends Component {

  _renderItem = ({ item }) => <Links item={item}/>

  render(){
    const { data } = this.props
    return (
      <FlatList
        data ={data.links}
        keyExtractor={item => item.id}
        renderItem={this._renderItem}
      />
    )
  }  
}

export default graphql(GET_LINKS)(Welcome)
