import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';


export default class HomeScreen extends Component {

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Text>首页</Text>
        </Content>
      </Container>
    );
  }
}
