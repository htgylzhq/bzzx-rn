import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import Proposal from '../../../models/Proposal';
import ProposalInfo from '../../model/ProposalInfo';
import { onFetchProposalInfo } from '../../../actions/proposalDetail';

class ProposalInfoPage extends Component {

  static propTypes = {
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

  async _fetchProposal() {
    const { proposalId } = this.props;
    const res = await http.get(`/platform/api/cppcc/proposal/${proposalId}`);
    if (res.code === 0) {
      const data = res.data;
      const proposal = new Proposal(data.proposal);
      this.setState({ loading: false });
      this.props.onFetchProposalInfo(proposal);
    }
  }

  render() {
    return (
    this.state.loading
      ?
        <Spinner />
      :
        <ProposalInfo proposal={this.props.proposal} />
    );
  }
}

const mapStateToProps = state => ({
  proposal: state.proposalDetail.proposal,
});

const mapDispatchToProps = dispatch => ({
  onFetchProposalInfo: proposal => dispatch(onFetchProposalInfo(proposal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalInfoPage);
