import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, Input, Item, Label, Button, Text, ListItem, Left, Right, Radio, View } from 'native-base';
import { Toaster } from '../../../commons/util';
import http from '../../../commons/http';

class LiAnForm extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
    dispatch: PropTypes.func,
  };

  async componentWillMount() {
    this.props.initialize({
      id: this.props.navigation.state.params.id,
      comment: this.props.comment,
      proc_string_li_an_shen_cha: this.props.proc_string_li_an_shen_cha,
    });
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  async _submit() {
    const { comment, proc_string_li_an_shen_cha } = this.props;
    const id = this.props.navigation.state.params.id;

    const url = '/platform/cppcc/proposal/claimAndComplete';

    const res = await http.post(url, {
      id,
      comment,
      proc_string_li_an_shen_cha,
    });

    if (res.code === 0) {
      Toaster.success('操作成功');
      this.navigate('ProposalIndex', { tab: 'done' });
    }
  }

  renderInput = ({
                   input,
                   meta: { error },
                 }) => {
    const hasError = !!error;

    let label = '';
    let comp = null;
    switch (input.name) {
      case 'comment':
        label = '办理意见';
        comp = (
          <Input
            {...input}
            multiline
            style={{ height: 200, textAlignVertical: 'top' }}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Item error={hasError} stackedLabel>
        <Label>{label}</Label>
        {comp}
      </Item>
    );
  };

  renderOperation = ({ input: { onChange, value } }) => {
    const selection = value || 'continue';
    return (
      <View style={{ marginTop: 10 }}>
        <Label>办理结果</Label>
        <ListItem>
          <Left>
            <Text>立案通过</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'continue'} onPress={() => onChange('continue')} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>不予立案</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'terminate'} onPress={() => onChange('terminate')} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>立案退回</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'back'} onPress={() => onChange('back')} />
          </Right>
        </ListItem>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Field name={'comment'} component={this.renderInput} />
          <Field name={'proc_string_li_an_shen_cha'} component={this.renderOperation} />
          <Button
            block
            style={{ marginTop: 20 }}
            onPress={() => this._submit()}
          >
            <Text>提交</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  const formValues = (state && state.form && state.form.liAn && state.form.liAn.values) || {
    comment: '',
    proc_string_li_an_shen_cha: 'continue',
  };

  return { ...formValues };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const LiAnPage = reduxForm(
  {
    form: 'liAn',
  },
)(LiAnForm);

export default connect(mapStateToProps, mapDispatchToProps)(LiAnPage);
