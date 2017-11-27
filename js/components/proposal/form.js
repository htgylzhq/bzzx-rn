import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text, Item, Label, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import qs from 'qs';
import http from '../../commons/http';
import { Toaster } from '../../commons/util';

const PickerItem = Picker.Item;

const validate = (values) => {
  const error = {};
  const { title, proposalUnitId, content } = values;
  if (!title) {
    error.title = '必填';
  }
  if (!proposalUnitId) {
    error.proposalUnitId = '必填';
  }
  if (!content) {
    error.content = '必填';
  }

  return error;
};

class ProposalForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    proposalUnitId: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      proposalUnitId: this.props.proposalUnitId,
    };
  }

  navigateBack() {
    this.props.dispatch(NavigationActions.back());
  }

  onProposalUnitIdChange(proposalUnitId:string) {
    this.setState({ proposalUnitId });
  }

  renderInput = ({
                   input,
                   meta: { error },
                 }) => {
    const hasError = !!error;

    let label = '';
    let comp = null;
    switch (input.name) {
      case 'title':
        label = '案由';
        comp = (
          <Input {...input} />
        );
        break;
      case 'content':
        label = '内容';
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

  renderPicker = () => (
    <Picker
      iosHeader="建议承办单位"
      mode="dropdown"
      onValueChange={value => this.onProposalUnitIdChange(value)}
    >
      <PickerItem lable={'单位A'} value={1} />
      <PickerItem lable={'单位B'} value={2} />
      <PickerItem lable={'单位C'} value={3} />
      <PickerItem lable={'单位D'} value={4} />
    </Picker>
    );

  _submit = () => {
    const { title, content } = this.props;

    http.request({
      url: '/platform/cppcc/proposal/save',
      method: 'post',
      data: {
        title,
        content,
      },
      transformRequest: [data => qs.stringify(data)],
    }, {
      title,
      content,
    }).then((response) => {
      if (response.data.code === 0) {
        Toaster.success('操作成功');
        this.navigateBack();
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((err) => {
      Toaster.error(err);
    });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Field name={'title'} component={this.renderInput} />
          {/* 闪退 <Field name={'proposalUnitId'} component={this.renderPicker} />*/}
          <Field name={'content'} component={this.renderInput} />
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

const mapStateToProps = state => (state && state.form && state.form.proposal && state.form.proposal.values) || {
  title: '',
  proposalUnitId: '',
  content: '',
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const ProposalFormPage = reduxForm(
  {
    form: 'proposal',
    validate,
  },
)(ProposalForm);

export default connect(mapStateToProps, mapDispatchToProps)(ProposalFormPage);
