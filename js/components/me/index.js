import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class MeScreen extends Component {

  render() {

    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Text>我的</Text>
        </Content>
      </Container>
    );
  }

}