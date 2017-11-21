import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, Container, Content, Icon, Input, Item, Text, Toast, View } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from './styles';
import http from '../../commons/http';
import { login } from '../../actions/auth';
import User from '../../models/User';

const background = require('../../../images/shadow.png');

const validate = ({ loginname, password }) => {
  const error = {};

  if (!loginname) {
    error.loginname = '必填';
  }
  if (!password) {
    error.password = '必填';
  }

  return error;
};

class Login extends Component {
  static propTypes = {
    loginname: PropTypes.string,
    password: PropTypes.string,
    onLogin: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.renderInput = this.renderInput.bind(this);
  }

  _login = () => {
    const loginname = this.props.loginname;
    const password = this.props.password;

    http.request({
      url: '/platform/login/doLogin',
      method: 'post',
      data: {
        username: loginname,
        password,
      },
      transformRequest: [data => qs.stringify(data)],
    }, {
      username: loginname,
      password,
    }).then((response) => {
      if (response.data.code === 0) {
        const user = new User(response.data.data);
        this.props.onLogin(user);
      } else {
        Toast.show({
          text: response.data.msg,
          buttonText: '确定',
          position: 'bottom',
          type: 'warning',
          duration: 3000,
        });
      }
    })
      .catch((error) => {
        Toast.show({
          text: `貌似网络开小差了？${error}`,
          buttonText: '确定',
          position: 'bottom',
          type: 'danger',
          duration: 3000,
        });
      });
  };

  renderInput = ({
                   input,
                   meta: { error },
                 }) => {
    const hasError = !!error;
    return (
      <Item error={hasError}>
        <Icon active name={input.name === 'loginname' ? 'person' : 'unlock'} />
        <Input
          placeholder={input.name === 'loginname' ? '登录名' : '密码'}
          secureTextEntry={input.name === 'password'}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: 'transparent' }}>
            <Icon active style={{ color: 'red', marginTop: 5 }} name={'warning'} />
            <Text style={{ fontSize: 15, color: 'red' }}>{error}</Text>
          </Item>
          : <Text />}
      </Item>
    );
  };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Field name={'loginname'} component={this.renderInput} />
                <Field name={'password'} component={this.renderInput} />
                <Button
                  style={styles.btn}
                  onPress={() => this._login()}
                >
                  <Text>登录</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => (state && state.form && state.form.login && state.form.login.values) || {
  loginname: '',
  password: '',
};

const mapDispatchToProps = dispatch => ({
  onLogin: (user) => {
    dispatch(login(user));
  },
});

const LoginForm = reduxForm(
  {
    form: 'login',
    validate,
  },
)(Login);
LoginForm.navigationOptions = {
  header: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
