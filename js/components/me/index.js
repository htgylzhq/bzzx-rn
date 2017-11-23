import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, Thumbnail, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class MeScreen extends Component {

  static propTypes = {
    username: PropTypes.string,
    unitName: PropTypes.string,
    dispatch: PropTypes.func,
  };

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem button onPress={() => this.navigate('Profile')}>
              <Left>
                <Thumbnail source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
                <Body>
                  <Text>{this.props.username}</Text>
                  <Text note>{this.props.unitName}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Icon active name={'document'} style={{ color: '#0E9EF4' }} />
              <Text>提案</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('MyOwnProposalsPage')}>
              <Text>我的提案</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('MyTodoProposalsPage')}>
              <Text>我的待办</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('MyDoneProposalsPage')}>
              <Text>我的已办</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem button onPress={() => this.navigate('Setting')}>
              <Icon active name={'settings'} style={{ color: '#0E9EF4' }} />
              <Text>设置</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  const { id, unitName, username, jiguan, weiyuan, mobile, sex } = state.auth.user;
  return { id, unitName, username, jiguan, weiyuan, mobile, sex };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MeScreen);
