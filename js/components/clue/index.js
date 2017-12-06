import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, List, Card, CardItem, Text, ListItem, Left, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import http from '../../commons/http';
import { refresh, loadMore } from '../../actions/pubClues';

class ClueIndexScreen extends Component {

  static propTypes = {
    clues: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })),
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
    const res = await http.get('/platform/api/cppcc/clue/pub?maxUpdate=0');
    if (res.code === 0) {
      const data = res.data;
      const clues = data.list;
      const newMinUpdate = data.minUpdate;
      const newMaxUpdate = data.maxUpdate;
      this.props.refresh(clues, newMinUpdate, newMaxUpdate);
      this.setState({ refreshing: false });
    }
  }

  async _loadMore() {
    const minUpdate = this.props.minUpdate;
    const res = await http.get(`/platform/api/cppcc/clue/pub?minUpdate=${minUpdate}`);
    if (res.code === 0) {
      const data = res.data;
      const clues = data.list;
      const newMinUpdate = data.minUpdate;
      const newMaxUpdate = data.maxUpdate;
      this.props.loadMore(clues, newMinUpdate, newMaxUpdate);
    }
  }

  _onPressClue(clue:Object) {
    this.navigate('ClueDetailPage', clue);
  }

  _renderClueItem(clue:Object) {
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }} onPress={() => this._onPressClue(clue)}>
        <Card transparent>
          <CardItem header style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Left>
              <Text numberOfLines={1}>{clue.title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text note>{clue.state}</Text>
            </Left>
            <Right>
              <Text note>{clue.createTime}</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Card>
          {
            this.props.clues.length === 0
              ?
                <CardItem
                  button
                  onPress={() => this._refresh()}
                  style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}
                >
                  <Text note>没有数据，点击刷新</Text>
                </CardItem>
              :
                <CardItem cardBody style={{ flex: 1 }} >
                  <List
                    button
                    dataArray={this.props.clues}
                    renderRow={item => this._renderClueItem(item)}
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
  clues: _.cloneDeep(state.pubClues.clues),
  minUpdate: state.pubClues.minUpdate,
  maxUpdate: state.pubClues.maxUpdate,
});

const mapDispatchToProps = dispatch => ({
  refresh: (clues, minUpdate, maxUpdate) => {
    dispatch(refresh(clues, minUpdate, maxUpdate));
  },
  loadMore: (clues, minUpdate, maxUpdate) => {
    dispatch(loadMore(clues, minUpdate, maxUpdate));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClueIndexScreen);
