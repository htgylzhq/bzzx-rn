import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, List, Card, CardItem, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import ProposalDone from '../model/ProposalDone';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/myDoneProposals';
import { Toaster } from '../../commons/util';

class ProposalDoneScreen extends Component {

  static propTypes = {
    proposals: PropTypes.arrayOf(PropTypes.instanceOf(Proposal)),
    minUpdate: PropTypes.number,
    maxUpdate: PropTypes.number,
    refresh: PropTypes.func,
    loadMore: PropTypes.func,
    dispatch: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      refreshing: false,
      fabActive: false,
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

  _refresh() {
    const maxUpdate = this.props.maxUpdate;
    http.get(`/platform/api/cppcc/proposal/type/done?maxUpdate=${maxUpdate}`).then((response) => {
      this.setState({ refreshing: false });
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposals = data.list.map(obj => new Proposal(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.refresh(proposals, newMinUpdate, newMaxUpdate);
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((error) => {
      this.setState({ refreshing: false });
      Toaster.error(`貌似网络开小差了？${error}`);
    });
  }

  _loadMore() {
    const minUpdate = this.props.minUpdate;
    http.get(`/platform/api/cppcc/proposal/type/done?minUpdate=${minUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposals = data.list.map(obj => new Proposal(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.loadMore(proposals, newMinUpdate, newMaxUpdate);
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((error) => {
      Toaster.error(`貌似网络开小差了？${error}`);
    });
  }

  _onPressProposal(proposal:Proposal) {
    this.navigate('ProposalDetailIndex', { id: proposal.id });
  }

  _renderProposalItem(proposal:Proposal) {
    return (
      <ProposalDone proposal={proposal} onPress={() => this._onPressProposal(proposal)} />
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
  proposals: state.myDoneProposals.proposals,
  minUpdate: state.myDoneProposals.minUpdate,
  maxUpdate: state.myDoneProposals.maxUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProposalDoneScreen);
