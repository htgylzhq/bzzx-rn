import React, {Component} from 'react';
import {Container, Content, Text} from 'native-base';

export default class TianScreen extends Component {

  render() {

    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Text>提案</Text>
        </Content>
      </Container>
    );
  }

}
