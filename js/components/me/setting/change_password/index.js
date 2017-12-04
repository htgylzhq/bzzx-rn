import React, { Component } from 'react';
import { Container, Content, Button, Text, Item, Label, Input, Icon, View } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import qs from 'qs';
import http from '../../../../commons/http';
import { logout } from '../../../../actions/auth';
import { Toaster } from '../../../../commons/util';

const validate = (values) => {
  const error = {};
  const { oldPassword, newPassword, repeatPassword } = values;
  if (!oldPassword) {
    error.oldPassword = '必填';
  }
  if (!newPassword) {
    error.newPassword = '必填';
  }
  if (!repeatPassword) {
    error.repeatPassword = '必填';
  }
  if (repeatPassword !== newPassword) {
    error.repeatPassword = '两次输入的新密码不一致';
  }

  return error;
};

class ChangePassword extends Component {

  static propTypes = {
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    onLogout: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }

  _submit = () => {
    const { oldPassword, newPassword } = this.props;
    http.request({
      url: '/platform/sys/user/doChangePassword',
      method: 'post',
      data: {
        oldPassword,
        newPassword,
      },
      transformRequest: [data => qs.stringify(data)],
    }).then((response) => {
      if (response.data.code === 0) {
        Toaster.success('密码已修改，请重新登录');
        this.props.onLogout();
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((error) => {
      Toaster.error(`貌似网络开小差了？${error}`);
    });
  };

  renderInput = ({
    input,
    meta: { error },
  }) => {
    const hasError = !!error;

    let label = '';
    switch (input.name) {
      case 'oldPassword':
        label = '原密码';
        break;
      case 'newPassword':
        label = '新密码';
        break;
      case 'repeatPassword':
        label = '确认新密码';
        break;
      default:
        break;
    }

    return (
      <Item error={hasError} stackedLabel>
        <Label>{label}</Label>
        <View style={{ flexDirection: 'row' }} >
          <Input
            secureTextEntry
            {...input}
          />
          {
            hasError
            ?
              <Item style={{ borderColor: 'transparent' }} >
                <Icon active style={{ color: 'red', marginTop: 5 }} name="warning" />
                <Text style={{ fontSize: 15, color: 'red' }}>{error}</Text>
              </Item>
              :
              <Text />
          }
        </View>
      </Item>
    );
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Field name={'oldPassword'} component={this.renderInput} />
          <Field name={'newPassword'} component={this.renderInput} />
          <Field name={'repeatPassword'} component={this.renderInput} />
          <Button
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={() => this._submit()}
          >
            <Text>提交</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = state => (state && state.form && state.form.changePassword && state.form.changePassword.values) || {
  oldPassword: '',
  newPassword: '',
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
});

const ChangePasswordForm = reduxForm(
  {
    form: 'changePassword',
    validate,
  },
)(ChangePassword);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
