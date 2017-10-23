/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Spinner, H3, Left, Thumbnail, Body, List, View, ListItem } from 'native-base';
import { connect } from 'react-redux';
import http from '../../commons/http';
import Msg from '../../models/Msg';
import Comment from '../../models/Comment';
import { loadMore, onFetchMsg } from '../../actions/msgDetail';

class MsgDetailPage extends Component {

  static propTypes = {
    msg: PropTypes.instanceOf(Msg),
    comments: PropTypes.arrayOf(PropTypes.object),
    maxUpdate: PropTypes.number,
    onFetchMsg: PropTypes.func,
    loadMoreComments: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {
    this._fetchMsg();
  }

  _fetchMsg() {
    const messageId = this.props.navigation.state.params.id;
    http.get(`/platform/pub/message/query/${messageId}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const message = new Msg(data.message);
        const comments = data.comments.list.map(obj => new Comment(obj));
        const maxUpdate = data.comments.maxUpdate;
        console.log('comments: ', comments);
        console.log('maxUpdate: ', maxUpdate);
        this.props.onFetchMsg(message, comments, maxUpdate);
      } else {
        // 查询留言失败
        // Todo Alert("查询留言失败！");
      }
    }).catch((error) => {
      console.log('Refresh msgs error: ', error);
    });
  }

  _renderCommentItem(comment:Comment) {
    return (
      <ListItem>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail small source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
              <Body>
                <Text>{comment.creatorName}</Text>
                <Text note>{comment.createTime}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Text>{comment.content}</Text>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  _loadMoreComments() {
    const maxUpdate = this.props.maxUpdate;
    http.get(`/platform/pub/message/comments?messageId=${maxUpdate}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const comments = data.list.map(obj => new Comment(obj));
        const newMaxUpdate = data.maxUpdate;
        this.props.loadMoreComments(comments, newMaxUpdate);
        this.setState({ refreshing: false });
      } else {
        // 查询评论失败
        // Todo Alert("查询评论失败！");
        this.setState({ refreshing: false });
      }
    }).catch((error) => {
      console.log('Load more comments error: ', error);
      this.setState({ refreshing: false });
    });
  }

  render() {
    const ready = !!this.props.msg;
    if (ready) {
      const msg = this.props.msg;
      return (
        <Container>
          <Content>
            <Card transparent>
              <CardItem header style={{ backgroundColor: '#4054B2' }}>
                <H3 style={{ color: '#FFFFFF' }}>{msg.title}</H3>
              </CardItem>
              <CardItem style={{ backgroundColor: '#B4C8F7' }}>
                <Left>
                  <Thumbnail small source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
                  <Body>
                    <Text>{msg.creatorName}</Text>
                    <Text note>{msg.createTime}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ backgroundColor: '#B4C8F7' }}>
                <Text>{msg.content}</Text>
              </CardItem>
            </Card>
            <View>
              <List
                dataArray={this.props.comments}
                renderRow={item => this._renderCommentItem(item)}
                onEndReachedThreshold={20}
                onEndReached={() => { this._loadMoreComments(); }}
                refreshControl={<RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this._loadMoreComments()}
                />}
              />
            </View>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  msg: state.msgDetail.msg,
  comments: state.msgDetail.comments,
  maxUpdate: state.msgDetail.maxUpdate,
});

const mapDispatchToProps = dispatch => ({
  onFetchMsg: (msg, comments, maxUpdate) => dispatch(onFetchMsg(msg, comments, maxUpdate)),
  loadMoreComments: (comments, maxUpdate) => dispatch(loadMore(comments, maxUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgDetailPage);
