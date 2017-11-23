import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, List, Card, CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import ProposalTodo from '../model/ProposalTodo';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/myTodoProposals';
import { Toaster } from '../../commons/util';

class ProposalTodoScreen extends Component {

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
    };
  }

  componentWillMount() {
    this._refresh();
  }

  _refresh() {
    const maxUpdate = this.props.maxUpdate;
    http.get(`/platform/api/cppcc/proposal/type/todo?maxUpdate=${maxUpdate}`).then((response) => {
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
    }).catch((err) => {
      this.setState({ refreshing: false });
      Toaster.error(`貌似网络开小差了？${err}`);
    });
  }

  _loadMore() {
    const minUpdate = this.props.minUpdate;
    http.get(`/platform/api/cppcc/proposal/type/todo?minUpdate=${minUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposals = data.list.map(obj => new Proposal(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.loadMore(proposals, newMinUpdate, newMaxUpdate);
      } else {
        Toaster.warn(response.data.msg);
      }
    }).catch((err) => {
      Toaster.error(`貌似网络开小差了？${err}`);
    });
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
      <ProposalTodo proposal={proposal} />
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
                  <Text note>没有数据</Text>
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
  proposals: state.myTodoProposals.proposals,
  minUpdate: state.myTodoProposals.minUpdate,
  maxUpdate: state.myTodoProposals.maxUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTodoScreen);
