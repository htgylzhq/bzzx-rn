import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Button, Container, Content, Icon, Input, Item, Text, View, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import styles from './styles';
import http from '../../commons/http';
import { login } from '../../actions/auth';
import User from '../../models/User';

const background = require('../../../images/bg_1.png');
const bgLogo = require('../../../images/bg_logo.png');

const validate = ({ loginname, password }) => {
  const err = {};

  if (!loginname) {
    err.loginname = '必填';
  }
  if (!password) {
    err.password = '必填';
  }

  return err;
};

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: false,
    };
    this.isUnmounted = false;
    this.renderInput = this.renderInput.bind(this);
  }
  componentWillUnmount() {
    this.isUnmounted = true;
  }
  async _login() {
    const loginname = this.props.loginname;
    const password = this.props.password;

    const params = {
      username: loginname,
      password,
    };
    const res = await http.post('/platform/login/doLogin', params);
    if (!this.isUnmounted) { this.setState({ login: false }); }
    if (res.code === 0) {
      const user = new User(res.data.user);
      const sid = res.data.sid;
      this.props.onLogin(user, sid);
    }
  }

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
          style={{ fontSize: 12 }}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: 'transparent' }}>
            <Icon active style={{ color: 'red', marginTop: 5, fontSize: 12 }} name={'warning'} />
            <Text style={{ fontSize: 12, color: 'red' }}>{error}</Text>
          </Item>
          : <Text />}
      </Item>
    );
  };

  render() {
    return (
      <Container style={{ overflow: 'hidden' }}>
        <View style={styles.container}>
          <Content>
            <ImageBackground source={background} style={styles.shadow} resizeMode="cover">
              <Image source={bgLogo} style={styles.logo} resizeMode="contain" />
              <View style={styles.bg}>
                <Field name={'loginname'} component={this.renderInput} />
                <Field name={'password'} component={this.renderInput} />
                <Button
                  style={styles.btn}
                  disabled={this.state.login}
                  onPress={() => {
                    this.setState({ login: true });
                    this._login();
                  }}
                >
                  {
                    this.state.login
                      ?
                        <Spinner color={'#fff'} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                      :
                        <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>登录</Text>
                  }
                </Button>
              </View>
            </ImageBackground>
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
  onLogin: (user, sid) => {
    dispatch(login(user, sid));
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
