import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text, Item, Label, Input, Picker, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import qs from 'qs';
import http from '../../commons/http';
import { Toaster } from '../../commons/util';

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

const proposalUnits = [
  { name: '单位A', id: 'A' },
  { name: '单位B', id: 'B' },
  { name: '单位C', id: 'C' },
  { name: '单位D', id: 'D' },
  { name: '单位E', id: 'E' },
];

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
      proposalUnitId: 'B',
    };
  }

  navigateBack() {
    this.props.dispatch(NavigationActions.back());
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

  renderPicker = ({ input: { onChange, value}, meta, ...pickerProps }) => (
    <View style={{ marginTop: 10 }}>
      <Label>建议承办单位</Label>
      <Picker
        selectedValue={value}
        onValueChange={val => onChange(val)}
        {...pickerProps}
      >
        {proposalUnits.map(i => <Picker.Item label={i.name} value={i.id} key={i.id} />)}
      </Picker>
    </View>
  );

  _submit = () => {
    const { title, content, proposalUnitId } = this.props;

    http.request({
      url: '/platform/cppcc/proposal/save',
      method: 'post',
      data: {
        title,
        content,
      },
      transformRequest: [data => qs.stringify(data)],
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
          <Field
            name={'proposalUnitId'}
            component={this.renderPicker}
            iosHeader="建议承办单位"
            mode="dropdown"
          />
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
