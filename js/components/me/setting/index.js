import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

class SettingScreen extends Component {

  static propTypes = {
    username: PropTypes.string,
    unitName: PropTypes.string,
    mobile: PropTypes.string,
    jiebieName: PropTypes.string,
    sex: PropTypes.string,
    ethnicityName: PropTypes.string,
    educationName: PropTypes.string,
    politicsName: PropTypes.string,
    onLogout: PropTypes.func,
  };

  render() {
    return (
      <Container>
        <Content>
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

const mapStateToProps = (state) => {
  const { id, unitName, username, jiguan, weiyuan, mobile, sex, jiebieName, ethnicityName, educationName, politicsName } = state.auth.user;
  return { id, unitName, username, jiguan, weiyuan, mobile, sex, jiebieName, ethnicityName, educationName, politicsName };
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
