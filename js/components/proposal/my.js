import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, List, Card, CardItem, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Proposal from '../../models/Proposal';
import ProposalMy from '../model/ProposalMy';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/myOwnProposals';

class ProposalMyScreen extends Component {

  static propTypes = {
    proposals: PropTypes.arrayOf(PropTypes.shape(Proposal)),
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

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  async _refresh() {
    const res = await http.get('/platform/api/cppcc/proposal/type/my?maxUpdate=0');
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
    if (proposal.state === '待提交') {
      this.navigate('ProposalFormPage', proposal);
    } else {
      this.navigate('ProposalDetailPage', proposal);
    }
  }

  _renderProposalItem(proposal:Proposal) {
    return (
      <ProposalMy proposal={proposal} onPress={() => this._onPressProposal(proposal)} />
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
  proposals: _.cloneDeep(state.myOwnProposals.proposals),
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
