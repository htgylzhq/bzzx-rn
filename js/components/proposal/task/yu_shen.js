import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, Input, Item, Label, Button, Text, ListItem, Left, Right, Radio, View } from 'native-base';
import { Toaster } from '../../../commons/util';
import http from '../../../commons/http';

class YuShenForm extends Component {

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
      proc_string_yu_shen: this.props.proc_string_yu_shen,
    });
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  async _submit() {
    const { comment, proc_string_yu_shen } = this.props;
    const id = this.props.navigation.state.params.id;

    const url = '/platform/cppcc/proposal/claimAndComplete';

    const res = await http.post(url, {
      id,
      comment,
      proc_string_yu_shen,
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
            style={{ height: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Item error={hasError} stackedLabel style={{ flex: 1 }}>
        <Label style={{ flex: 1, width: Dimensions.get('window').width, borderBottomWidth: 2, borderBottomColor: '#921001', marginBottom: 10, fontSize: 15, color: '#000' }}>{label}</Label>
        {comp}
      </Item>
    );
  };

  renderOperation = ({ input: { onChange, value } }) => {
    const selection = value || 'continue';
    return (
      <View style={{ marginTop: 10 }}>
        <Label style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#921001', fontSize: 15, color: '#000' }}>办理结果</Label>
        <ListItem style={{ marginLeft: 0 }}>
          <Left>
            <Text style={{ fontSize: 12 }}>预审通过</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'continue'} onPress={() => onChange('continue')} />
          </Right>
        </ListItem>
        <ListItem style={{ marginLeft: 0 }}>
          <Left>
            <Text style={{ fontSize: 12 }}>预审终止</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'terminate'} onPress={() => onChange('terminate')} />
          </Right>
        </ListItem>
        <ListItem style={{ marginLeft: 0 }}>
          <Left>
            <Text style={{ fontSize: 12 }}>退回</Text>
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
          <Field name={'proc_string_yu_shen'} component={this.renderOperation} />
          <Button
            block
            style={{ marginTop: 20, backgroundColor: '#921001' }}
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
  const formValues = (state && state.form && state.form.yuShen && state.form.yuShen.values) || {
    comment: '',
    proc_string_yu_shen: 'continue',
  };

  return { ...formValues };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const YuShenPage = reduxForm(
  {
    form: 'yuShen',
  },
)(YuShenForm);

export default connect(mapStateToProps, mapDispatchToProps)(YuShenPage);
