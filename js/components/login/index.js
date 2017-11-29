import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, Container, Content, Icon, Input, Item, Text, View } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import styles from './styles';
import http from '../../commons/http';
import { login } from '../../actions/auth';
import User from '../../models/User';

const background = require('../../../images/shadow.png');

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
    };
    this.renderInput = this.renderInput.bind(this);
  }

  async _login() {
    const loginname = this.props.loginname;
    const password = this.props.password;

    const params = {
      username: loginname,
      password,
    };
    const res = await http.post('/platform/login/doLogin', params);
    if (res.code === 0) {
      const user = new User(res.data);
      this.props.onLogin(user);
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
