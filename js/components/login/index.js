import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from './styles';
import http from '../../commons/http';
import { login } from '../../actions/auth';
import User from '../../models/User';

const background = require('../../../images/shadow.png');

const validate = (values) => {
  const error = {};
  error.loginname = '';
  error.password = '';
  let ema = values.loginname;
  let pw = values.password;
  if (values.loginname === undefined) {
    ema = '';
  }
  if (values.password === undefined) {
    pw = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.loginname = 'too short';
  }
  if (pw.length > 12) {
    error.password = 'max 11 characters';
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = 'Weak';
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
        console.log('logined User: ', user);
        this.props.onLogin(user);
      } else {
        // 登录失败
        // Todo Alert("用户名或密码错误！");
      }
    })
      .catch((error) => {
        console.log('error', error);
      });
    // this.props.navigation.navigate('Home');
  };

  renderInput = ({
                   input,
                   meta: { error, pristine },
                 }) => {
    let hasError = false;
    if (!pristine && error !== undefined) {
      hasError = true;
    }
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
            <Icon active style={{ color: 'red', marginTop: 5 }} name={'bug'} />
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
