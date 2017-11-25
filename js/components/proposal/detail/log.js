import React, { Component } from 'react';
import { Spinner, List, ListItem, Card, CardItem, Text, Left, Right, Body, View, H3 } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import { Toaster } from '../../../commons/util';
import ProposalLog from '../../../models/ProposalLog';
import { onFetchProposalLogs } from '../../../actions/proposalDetail';
import theme from '../../../themes/base-theme';

class ProposalLogPage extends Component {

  static propTypes = {
    proposalId: PropTypes.string,
    proposalLogs: PropTypes.arrayOf(PropTypes.instanceOf(ProposalLog)),
    onFetchProposalLogs: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchProposalLogs();
  }

  _fetchProposalLogs() {
    const { proposalId } = this.props;
    http.get(`/platform/api/cppcc/proposal/${proposalId}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposalLogs = data.taskComments.map(obj => new ProposalLog(obj));
        this.setState({ loading: false });
        this.props.onFetchProposalLogs(proposalLogs);
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((error) => {
      Toaster.error(`貌似网络开小差了？${error}`);
    });
  }

  _renderProposalLog(proposalLog: ProposalLog) {
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Card transparent>
          <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 5 }}>
            <H3 style={{ color: theme.brandPrimary }}>{proposalLog.taskName}</H3>
          </CardItem>
          <CardItem style={{ paddingTop: 0 }}>
            <Left>
              <Text note>{proposalLog.createTime}</Text>
            </Left>
            <Right>
              <Text note>{proposalLog.userName}</Text>
            </Right>
          </CardItem>
          <CardItem style={{ paddingTop: 0 }}>
            <Body>
              <Text>{proposalLog.content}</Text>
            </Body>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  render() {
    let comp = null;
    if (this.state.loading) {
      comp = <Spinner />;
    } else if (this.props.proposalLogs.length === 0) {
      comp = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text note>没有数据</Text>
        </View>
      );
    } else {
      comp = (
        <List
          button
          dataArray={this.props.proposalLogs}
          renderRow={item => this._renderProposalLog(item)}
        />
      );
    }

    return comp;
  }

}

const mapStateToProps = state => ({
  proposalLogs: state.proposalDetail.proposalLogs,
});

const mapDispatchToProps = dispatch => ({
  onFetchProposalLogs: (proposalLogs) => {
    dispatch(onFetchProposalLogs(proposalLogs));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalLogPage);
