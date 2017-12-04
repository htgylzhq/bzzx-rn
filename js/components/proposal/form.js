import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text, Item, Label, Input, Picker, View, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import http from '../../commons/http';
import { Toaster } from '../../commons/util';
import { onFetchUndertakers } from '../../actions/undertaker';

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
    navigation: PropTypes.shape({ }),
    undertakers: PropTypes.arrayOf(
      PropTypes.shape({})
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentWillMount() {
    this.props.initialize({
      proposalUnitId: this.props.proposalUnitId,
      proposalUnitName: this.props.proposalUnitName,
      ...this.props.navigation.state.params,
    });
    const res = await http.get('/platform/api/unit/undertaker');
    if (res.code === 0) {
      const undertakers = res.data;
      this.props.onFetchUndertakers(undertakers);
      this.setState({ loading: false });
    }
  }

  navigateBack() {
    this.props.dispatch(NavigationActions.back());
  }

  async _submit(onlySave:boolean = true) {
    const { title, content, proposalUnitId } = this.props;
    const filteredUndertakers = _.filter(this.props.undertakers, n => n.id === proposalUnitId);
    const selectedUndertaker = _.first(filteredUndertakers) || {};
    const proposalUnitName = selectedUndertaker.name || '';

    const url = onlySave ? '/platform/cppcc/proposal/save' : '/platform/cppcc/proposal/saveAndSubmit';

    const res = await http.post(url, {
      title,
      content,
      proposalUnitId,
      proposalUnitName,
    });

    if (res.code === 0) {
      Toaster.success('操作成功');
      this.navigateBack();
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

  renderPicker = ({ input: { onChange, value }, ...pickerProps }) => (
    <View style={{ marginTop: 10 }}>
      <Label>建议承办单位</Label>
      <Picker
        selectedValue={value}
        onValueChange={val => onChange(val)}
        {...pickerProps}
      >
        {this.props.undertakers.map(i => <Picker.Item label={i.name} value={i.id} key={i.id} />)}
      </Picker>
    </View>
  );

  render() {
    let comp;
    if (this.state.loading) {
      comp = (
        <Content padder>
          <Spinner />
        </Content>
      );
    } else {
      comp = (
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
            style={{ marginTop: 20, backgroundColor: '#941001' }}
            onPress={() => this._submit(true)}
          >
            <Text>保存</Text>
          </Button>
          <Button
            block
            style={{ marginTop: 20, backgroundColor: '#941001' }}
            onPress={() => this._submit(false)}
          >
            <Text>保存并提交</Text>
          </Button>
        </Content>
      );
    }

    return (
      <Container>
        {comp}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const formValues = (state && state.form && state.form.proposal && state.form.proposal.values) || {
    title: '',
    proposalUnitId: '',
    content: '',
  };
  const undertakers = (state.undertaker && state.undertaker.undertakers) || [];
  const undertaker = undertakers[0] || {};

  const initialValues = {
    proposalUnitId: undertaker.id || '',
    proposalUnitName: undertaker.name || '',
  };
  return { ...formValues, undertakers, ...initialValues };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  onFetchUndertakers: (undertakers) => { dispatch(onFetchUndertakers(undertakers)); },
});

const ProposalFormPage = reduxForm(
  {
    form: 'proposal',
    validate,
  },
)(ProposalForm);

export default connect(mapStateToProps, mapDispatchToProps)(ProposalFormPage);
