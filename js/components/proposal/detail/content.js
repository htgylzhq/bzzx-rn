import React, { Component } from 'react';
import { WebView, Dimensions } from 'react-native';
import { Spinner, Container, Card, CardItem, Content } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import Proposal from '../../../models/Proposal';
import { onFetchProposalInfo } from '../../../actions/proposalDetail';

class ProposalContentPage extends Component {

  static propTypes = {
    onFetchProposalInfo: PropTypes.func,
    proposal: PropTypes.shape(Proposal),
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
      <Container style={{ backgroundColor: '#ddd' }}>
        <Content>
          <Card style={{ flex: 1, height: Dimensions.get('window').height - 75, marginTop: 0 }}>
            <CardItem cardBody style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'center' }}>
              {
                this.state.loading
              ?
                <Spinner />
              :
                <WebView
                  source={{ html: this.props.proposal.content }}
                />}
            </CardItem>
          </Card>
        </Content>
      </Container>
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
