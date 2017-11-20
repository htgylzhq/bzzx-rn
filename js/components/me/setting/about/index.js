import React, { Component } from 'react';
import { Card, CardItem, Container, Content, Left, Right, Text, Thumbnail, View } from 'native-base';
import { connect } from 'react-redux';

class AboutScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            <Thumbnail
              large
              source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }}
            />
          </View>
          <Card style={{ flex: 1 }}>
            <CardItem button bordered>
              <Left>
                <Text>官网</Text>
              </Left>
              <Right>
                <Text note>http://bzzx.tengri.cc</Text>
              </Right>
            </CardItem>
            <CardItem button bordered>
              <Left>
                <Text>技术支持</Text>
              </Left>
              <Right>
                <Text note>http://www.tengri.cc</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


export default connect()(AboutScreen);
