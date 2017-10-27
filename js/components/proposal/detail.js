import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Spinner, H3, Left, Thumbnail, Body, List, View, ListItem } from 'native-base';
import { connect } from 'react-redux';
import http from '../../commons/http';
import Proposal from '../../models/Proposal';
import Comment from '../../models/Comment';
import { loadMore, onFetchProposal } from '../../actions/proposalDetail';

class ProposalDetailPage extends Component {

  static propTypes = {
    proposal: PropTypes.instanceOf(Proposal),
    comments: PropTypes.arrayOf(PropTypes.instanceOf(Comment)),
    maxUpdate: PropTypes.number,
    onFetchProposal: PropTypes.func,
    loadMoreComments: PropTypes.func,
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {
    this._fetchProposal();
  }

  _fetchProposal() {
    const messageId = this.props.navigation.state.params.id;
    http.get(`/platform/pub/message/query/${messageId}`).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data;
        const message = new Proposal(data.message);
        const comments = data.comments.list.map(obj => new Comment(obj));
        const maxUpdate = data.comments.maxUpdate;
        console.log('comments: ', comments);
        console.log('maxUpdate: ', maxUpdate);
        this.props.onFetchProposal(message, comments, maxUpdate);
      } else {
        // 查询留言失败
        // Todo Alert("查询留言失败！");
      }
    }).catch((error) => {
      console.log('Refresh proposals error: ', error);
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
    const ready = !!this.props.proposal;
    if (ready) {
      const proposal = this.props.proposal;
      return (
        <Container>
          <Content>
            <Card transparent>
              <CardItem header style={{ backgroundColor: '#4054B2' }}>
                <H3 style={{ color: '#FFFFFF' }}>{proposal.title}</H3>
              </CardItem>
              <CardItem style={{ backgroundColor: '#B4C8F7' }}>
                <Left>
                  <Thumbnail small source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
                  <Body>
                    <Text>{proposal.creatorName}</Text>
                    <Text note>{proposal.createTime}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ backgroundColor: '#B4C8F7' }}>
                <Text>{proposal.content}</Text>
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
  proposal: state.proposalDetail.proposal,
  comments: state.proposalDetail.comments,
  maxUpdate: state.proposalDetail.maxUpdate,
});

const mapDispatchToProps = dispatch => ({
  onFetchProposal: (proposal, comments, maxUpdate) => dispatch(onFetchProposal(proposal, comments, maxUpdate)),
  loadMoreComments: (comments, maxUpdate) => dispatch(loadMore(comments, maxUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalDetailPage);
