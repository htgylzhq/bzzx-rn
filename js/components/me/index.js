import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, Thumbnail, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { logout } from '../../actions/auth';

class MeScreen extends Component {

  static propTypes = {
    username: PropTypes.string,
    unitName: PropTypes.string,
    dispatch: PropTypes.func,
    onLogout: PropTypes.func,
  };

  navigate(routeName:string, params:Object, route:string) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: route,
    });
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
            <CardItem button bordered onPress={() => this.navigate('ChangePassword')}>
              <Text>修改密码</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('About')}>
              <Text>关于我们</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem button onPress={() => this.props.onLogout()}>
              <Text>退出</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = state => ({ ...(state.auth.user) } || {
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MeScreen);
