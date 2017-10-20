import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, View, Text, List, ListItem, H3, Card, CardItem } from 'native-base';
import { refresh, loadMore } from '../../actions/msg';
import http from '../../commons/http';
import Msg from '../../models/Msg';

class MsgScreen extends Component {

  static propTypes = {
    msgs: PropTypes.arrayOf(PropTypes.object),
    minUpdate: PropTypes.number,
    maxUpdate: PropTypes.number,
    refresh: PropTypes.func,
    loadMore: PropTypes.func,
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
    http.get(`/platform/pub/message/query?maxUpdate=${maxUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const msgs = data.list.map(obj => new Msg(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.refresh(msgs, newMinUpdate, newMaxUpdate);
        this.setState({ refreshing: false });
      } else {
        // 查询留言失败
        // Todo Alert("查询留言失败！");
        this.setState({ refreshing: false });
      }
    }).catch((error) => {
      console.log('Refresh msgs error: ', error);
      this.setState({ refreshing: false });
    });
  }

  _loadMore() {
    const minUpdate = this.props.minUpdate;
    http.get(`/platform/pub/message/query?minUpdate=${minUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const msgs = data.list.map(obj => new Msg(obj));
        const newMinUpdate = data.minUpdate;
        const newMaxUpdate = data.maxUpdate;
        this.props.loadMore(msgs, newMinUpdate, newMaxUpdate);
      } else {
        // 查询留言失败
        // Todo Alert("查询留言失败！");
      }
    }).catch((error) => {
      console.log('Refresh msgs error: ', error);
    });
  }

  _renderMsgItem(msg:Msg) {
    return (
      <ListItem>
        <Card transparent>
          <CardItem header>
            <H3 numberOfLines={1} >{msg.title}</H3>
          </CardItem>
          <CardItem>
            <Text numberOfLines={3}>{msg.content}</Text>
          </CardItem>
          <CardItem footer>
            <Text note>{msg.createTime}</Text>
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
            dataArray={this.props.msgs}
            renderRow={item => this._renderMsgItem(item)}
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
  msgs: state.msg.msgs,
  minUpdate: state.msg.minUpdate,
  maxUpdate: state.msg.maxUpdate,
});

const mapDispatchToProps = dispatch => ({
  refresh: (msgs, maxUpdate) => {
    dispatch(refresh(msgs, maxUpdate));
  },
  loadMore: (msgs, minUpdate) => {
    dispatch(loadMore(msgs, minUpdate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgScreen);
