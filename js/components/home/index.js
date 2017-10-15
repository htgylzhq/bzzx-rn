import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { WebView } from 'react-native';


export default class HomeScreen extends Component {

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <WebView
            style={{ marginTop: 20 }}
            startInLoadingState
            source={{ uri: 'https://m.taobao.com' }}
          />
        </Content>
      </Container>
    );
  }
}
