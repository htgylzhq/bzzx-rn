import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, View, List, ListItem, Card, CardItem, H3, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/proposalIndex';

class ProposalScreen extends Component {

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
    http.get(`/platform/api/cppcc/proposal/shared?maxUpdate=${maxUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposals = data.list.map(obj => new Proposal(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.refresh(proposals, newMinUpdate, newMaxUpdate);
        this.setState({ refreshing: false });
      } else {
        // 查询提案失败
        // Todo Alert("查询提案失败！");
        this.setState({ refreshing: false });
      }
    }).catch((error) => {
      console.log('Refresh proposals error: ', error);
      this.setState({ refreshing: false });
    });
  }

  _loadMore() {
    const minUpdate = this.props.minUpdate;
    http.get(`/platform/api/cppcc/proposal/shared?minUpdate=${minUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const proposals = data.list.map(obj => new Proposal(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.loadMore(proposals, newMinUpdate, newMaxUpdate);
      } else {
        // 查询提案失败
        // Todo Alert("查询提案失败！");
      }
    }).catch((error) => {
      console.log('Refresh proposals error: ', error);
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
      <ListItem onPress={() => this._onPressProposal(proposal)}>
        <Card transparent>
          <CardItem header>
            <H3 numberOfLines={1} >{proposal.title}</H3>
          </CardItem>
          <CardItem>
            <Text numberOfLines={3}>{proposal.content}</Text>
          </CardItem>
          <CardItem footer>
            <Text note>{proposal.createTime}</Text>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <View>
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
        </View>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  proposals: state.proposalIndex.proposals,
  minUpdate: state.proposalIndex.minUpdate,
  maxUpdate: state.proposalIndex.maxUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProposalScreen);
