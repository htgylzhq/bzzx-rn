import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, View, Body, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { logout } from '../../actions/auth';

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 60,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
                <View style={[styles.avatar, { backgroundColor: 'rgb(179,199,249)' }]}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>{this.props.username.substring(0, 1)}</Text>
                </View>
                <Body>
                  <Text>{this.props.username}</Text>
                  <Text note>{this.props.unitName}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem button bordered onPress={() => this.navigate('ChangePassword')}>
              <Icon name="lock" style={{ color: '#921001' }} />
              <Text>修改密码</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('About')}>
              <Icon name="md-infinite" style={{ color: '#921001' }} />
              <Text>关于我们</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem button onPress={() => this.props.onLogout()}>
              <Icon name="md-log-out" style={{ color: '#921001' }} />
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
