import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class MsgScreen extends Component {

  render() {

    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Text>消息</Text>
        </Content>
      </Container>
    );
  }

}