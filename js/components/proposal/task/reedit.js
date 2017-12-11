import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text, Item, Label, Input, Picker, View, Spinner, ListItem, Left, Right, Radio } from 'native-base';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import http from '../../../commons/http';
import { Toaster } from '../../../commons/util';
import { onFetchUndertakers } from '../../../actions/undertaker';
import { onFetchProposalInfo } from '../../../actions/reedit';
import Proposal from '../../../models/Proposal';

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

class ReeditForm extends Component {

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
      loadingUndertakers: true,
      loadingProposal: true,
      submitting: false,
    };
  }

  async componentWillMount() {
    this._fetchUndertakers();
    this._fetchProposal();
  }

  navigateBack() {
    this.props.dispatch(NavigationActions.back());
  }

  async _fetchUndertakers() {
    const res = await http.get('/platform/api/unit/undertaker');
    if (res.code === 0) {
      const undertakers = res.data;
      this.props.onFetchUndertakers(undertakers);
      this.setState({ loadingUndertakers: false });
      if (!this.state.loadingUndertakers && !this.state.loadingProposal) {
        this.props.initialize(this.props.initialValues);
      }
    }
  }

  async _fetchProposal() {
    const proposalId = this.props.navigation.state.params.id;
    const res = await http.get(`/platform/api/cppcc/proposal/${proposalId}`);
    if (res.code === 0) {
      const data = res.data;
      const proposal = new Proposal(data.proposal);
      this.setState({ loadingProposal: false });
      this.props.onFetchProposalInfo(proposal);
      if (!this.state.loadingUndertakers && !this.state.loadingProposal) {
        this.props.initialize(this.props.initialValues);
      }
    }
  }

  async _submit() {
    const { id, title, content, proposalUnitId, comment, proc_string_reedit } = this.props.formValues;
    const filteredUndertakers = _.filter(this.props.undertakers, n => n.id === proposalUnitId);
    const selectedUndertaker = _.first(filteredUndertakers) || {};
    const proposalUnitName = selectedUndertaker.name || '';

    const url = '/platform/cppcc/proposal/claimAndComplete';

    const res = await http.post(url, {
      id,
      title,
      content,
      proposalUnitId,
      proposalUnitName,
      comment,
      proc_string_reedit,
      needSaveEntity: true,
    });
    this.setState({ submitting: false });
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
          <Input {...input} style={{ fontSize: 12, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }} />
        );
        break;
      case 'content':
        label = '内容';
        comp = (
          <Input
            {...input}
            multiline
            style={{ height: 180, textAlignVertical: 'top', fontSize: 12, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }}
          />
        );
        break;
      case 'comment':
        label = '办理意见';
        comp = (
          <Input
            {...input}
            multiline
            style={{ height: 100, textAlignVertical: 'top', fontSize: 12, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Item error={hasError} stackedLabel>
        <Label style={{ flex: 1, width: Dimensions.get('window').width, borderBottomWidth: 2, borderBottomColor: '#921001', fontSize: 15, color: '#000',marginBottom: 10 }}>{label}</Label>
        {comp}
      </Item>
    );
  };

  renderPicker = ({ input: { onChange, value }, ...pickerProps }) => (
    <View style={{ marginTop: 10 }}>
      <Label style={{ flex: 1, width: Dimensions.get('window').width, borderBottomWidth: 2, borderBottomColor: '#921001', marginBottom: 10, fontSize: 15, color: '#000' }}>建议承办单位</Label>
      <Picker
        selectedValue={value}
        onValueChange={val => onChange(val)}
        {...pickerProps}
        style={{ borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', borderRadius: 5 }}
      >
        {this.props.undertakers.map(i => <Picker.Item label={i.name} value={i.id} key={i.id} />)}
      </Picker>
    </View>
  );

  renderOperation = ({ input: { onChange, value } }) => {
    const selection = value || 'submit';
    return (
      <View style={{ marginTop: 10 }}>
        <Label style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#921001', fontSize: 15, color: '#000' }}>选择操作</Label>
        <ListItem style={{ marginLeft: 0 }}>
          <Left>
            <Text style={{ fontSize: 12 }}>重新提交</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'submit'} onPress={() => onChange('submit')} />
          </Right>
        </ListItem>
        <ListItem style={{ marginLeft: 0 }}>
          <Left>
            <Text style={{ fontSize: 12 }}>撤销提案</Text>
          </Left>
          <Right>
            <Radio selected={selection === 'cancel'} onPress={() => onChange('cancel')} />
          </Right>
        </ListItem>
      </View>
    );
  };

  render() {
    let comp;
    if (this.state.loadingUndertakers || this.state.loadingProposal) {
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
          <Field name={'comment'} component={this.renderInput} />
          <Field name={'proc_string_reedit'} component={this.renderOperation} />
          <Button
            block
            style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#941001' }}
            disabled={this.state.submitting}
            onPress={() => {
              this.setState({ submitting: true });
              this._submit(true);
            }}
          >
            {
              this.state.submitting
              ?
                <Spinner />
              :
                <Text>提交</Text>
            }
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
  const formValues = (state && state.form && state.form.reedit && state.form.reedit.values) || {
    title: '',
    proposalUnitId: '',
    content: '',
  };
  const undertakers = (state.undertaker && state.undertaker.undertakers) || [];

  const initialValues = { ...state.reedit.proposal, proc_string_reedit: 'submit' };
  return { formValues, undertakers, initialValues };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  onFetchUndertakers: (undertakers) => { dispatch(onFetchUndertakers(undertakers)); },
  onFetchProposalInfo: (proposal) => { dispatch(onFetchProposalInfo(proposal)); },
});

const ReeditPage = reduxForm(
  {
    form: 'reedit',
    validate,
  },
)(ReeditForm);

export default connect(mapStateToProps, mapDispatchToProps)(ReeditPage);
