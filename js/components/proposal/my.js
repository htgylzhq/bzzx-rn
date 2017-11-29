import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, List, Card, CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import ProposalMy from '../model/ProposalMy';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/myOwnProposals';

class ProposalMyScreen extends Component {

  static propTypes = {
    proposals: PropTypes.arrayOf(PropTypes.instanceOf(Proposal)),
    loadMore: PropTypes.func,
    dispatch: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {
    this._refresh();
  }

  async _refresh() {
    const maxUpdate = this.props.maxUpdate;
    const res = await http.get(`/platform/api/cppcc/proposal/type/my?maxUpdate=${maxUpdate}`);
    if (res.code === 0) {
      const data = res.data;
      const proposals = data.list.map(obj => new Proposal(obj));
      const newMinUpdate = data.minUpdate;
      const newMaxUpdate = data.maxUpdate;
      this.props.refresh(proposals, newMinUpdate, newMaxUpdate);
      this.setState({ refreshing: false });
    }
  }

  async _loadMore() {
    const minUpdate = this.props.minUpdate;
    const res = await http.get(`/platform/api/cppcc/proposal/type/my?minUpdate=${minUpdate}`);
    if (res.code === 0) {
      const data = res.data;
      const proposals = data.list.map(obj => new Proposal(obj));
      const newMinUpdate = data.minUpdate;
      const newMaxUpdate = data.maxUpdate;
      this.props.loadMore(proposals, newMinUpdate, newMaxUpdate);
    }
  }

  _onPressProposal(proposal:Proposal) {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'ProposalDetailPage',
      params: {
        id: proposal.id,
      },
    });
  }

  _renderProposalItem(proposal:Proposal) {
    return (
      <ProposalMy proposal={proposal} />
    );
  }

  render() {
    return (
      <Container>
        <Card>
          {
            this.props.proposals.length === 0
            ?
              <CardItem
                button
                onPress={() => this._refresh()}
                style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}
              >
                <Text note>没有数据，点击刷新</Text>
              </CardItem>
              :
              <CardItem cardBody >
                <List
                  button
                  dataArray={this.props.proposals}
                  renderRow={item => this._renderProposalItem(item)}
                  onEndReachedThreshold={20}
                  onEndReached={() => { this._loadMore(); }}
                  refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._refresh()}
                  />}
                />
              </CardItem>
          }
        </Card>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  proposals: state.myOwnProposals.proposals,
  minUpdate: state.myOwnProposals.minUpdate,
  maxUpdate: state.myOwnProposals.maxUpdate,
});

const mapDispatchToProps = dispatch => ({
  refresh: (proposals, minUpdate, maxUpdate) => {
    dispatch(refresh(proposals, minUpdate, maxUpdate));
  },
  loadMore: (proposals, minUpdate, maxUpdate) => {
    dispatch(loadMore(proposals, minUpdate, maxUpdate));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalMyScreen);
