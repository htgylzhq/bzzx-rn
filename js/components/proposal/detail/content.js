import React, { Component } from 'react';
import { WebView, Dimensions } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import { Toaster } from '../../../commons/util';
import Proposal from '../../../models/Proposal';
import { onFetchProposalInfo } from '../../../actions/proposalDetail';

class ProposalContentPage extends Component {

  static propTypes = {
    proposalId: PropTypes.string,
    onFetchProposalInfo: PropTypes.func,
    proposal: PropTypes.instanceOf(Proposal),
  };

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchProposal();
  }

  _fetchProposal() {
    const { proposalId } = this.props;
    http.get(`/platform/api/cppcc/proposal/${proposalId}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposal = new Proposal(data.proposal);
        this.setState({ loading: false });
        this.props.onFetchProposalInfo(proposal);
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((error) => {
      Toaster.error(`貌似网络开小差了？${error}`);
    });
  }

  render() {
    return (
    this.state.loading
      ?
        <Spinner />
      :
        <WebView
          source={{ html: this.props.proposal.content }}
          style={{ height: Dimensions.get('window').height - 75 }}
        />
    );
  }
}

const mapStateToProps = state => ({
  proposal: state.proposalDetail.proposal,
});

const mapDispatchToProps = dispatch => ({
  onFetchProposalInfo: proposal => dispatch(onFetchProposalInfo(proposal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalContentPage);
