import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

class SettingScreen extends Component {

  static propTypes = {
    onLogout: PropTypes.func,
    dispatch: PropTypes.func,
  };

  navigate(route:string) {
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
            <CardItem button bordered>
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

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
  dispatch,
});

export default connect(mapDispatchToProps)(SettingScreen);
