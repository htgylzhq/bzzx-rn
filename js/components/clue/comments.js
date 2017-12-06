/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  Input,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail
} from 'native-base';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import _ from 'lodash';
import http from '../../commons/http';
import { onFetchClueComments, onLoadMoreClueComments } from '../../actions/clueComments';

const formName = 'clueComment';

class ClueCommentsPage extends Component {
  static propTypes = {
    onFetchClueComments: PropTypes.func,
    onLoadMoreClueComments: PropTypes.func,
    commentVal: PropTypes.string,
    resetForm: PropTypes.func,
    comment: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitting: false,
      refreshing: false,
    };
  }
  componentWillMount() {
    this._fetchComments();
  }

  async _fetchComments() {
    const { id } = this.props;
    const res = await http.get('/platform/cppcc/clue/comment', {
      id,
      pageNo: 1,
      pageSize: 15,
    });
    if (res.code === 0) {
      const data = res.data;
      const comments = data.list;
      this.props.onFetchClueComments(comments, data.pageNo, data.total);
      this.setState({ loading: false });
    }
  }
  async _submit() {
    this.setState({ submitting: true });
    const { commentVal, id } = this.props;
    if (_.trim(commentVal) !== '') {
      const res = await http.post('/platform/cppcc/clue/comment', {
        id,
        content: commentVal,
      });
      if (res.code === 0) {
        this.props.resetForm(formName);
        this._fetchComments();
        this.setState({ loading: false, submitting: false });
      }
    }
  }
  async _loadMore() {
    this.setState({ refreshing: true });
    const { id } = this.props;
    const res = await http.get('/platform/cppcc/clue/comment', {
      id,
      pageNo: this.props.pageNo + 1,
      pageSize: 10,
    });
    if (res.code === 0) {
      const data = res.data;
      const comments = data.list;
      this.props.onLoadMoreClueComments(comments, data.pageNo, data.total);
      this.setState({ refreshing: false });
    }
  }
  renderInput = ({ input }) => (
    <Input {...input} placeholderTextColor={'#c0c0c0'} placeholder={'发表评论'} style={{ backgroundColor: '#fff', flex: 1, alignItems: 'flex-end', height: 35, borderWidth: 1, borderColor: '#ddd', paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }} />
  );
  renderRow(item) {
    return (
      <ListItem avatar style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Left>
          <Thumbnail source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
        </Left>
        <Body>
          <Text>{ item.creatorName }</Text>
          <Text note>{ item.content }</Text>
        </Body>
        <Right>
          <Text note>{ item.createTime }</Text>
        </Right>
      </ListItem>);
  }
  render() {
    return (
      <Container>
        <Content>
          { this.state.loading
            ?
              <Spinner />
            :
              <Card style={{ flex: 1, marginTop: 0 }}>
                <CardItem cardBody style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                  <List
                    style={{ flex: 1 }}
                    renderRow={item => this.renderRow(item)}
                    dataArray={this.props.comment}
                    onEndReachedThreshold={20}
                    onEndReached={() => { this._loadMore(); }}
                    refreshControl={<RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this._fetchComment()}
                    />}
                  />
                </CardItem>
              </Card>
          }
        </Content>
        <Footer style={{ backgroundColor: '#fdfdfd', borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
          <Left style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Field style={{ flex: 1 }} name="commentVal" component={this.renderInput} type="text" />
          </Left>
          <Right style={{ flex: 0, marginLeft: 10, marginRight: 10 }}>
            <Button disabled={false} onPress={() => this._submit()} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', height: 35, borderRadius: 3 }}>
              <Text style={{ color: '#c0c0c0' }}>发表</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const formValue = (state && state.form && state.form[clueComment] && state.form[clueComment].values) || {
    commentVal: '',
  };
  const comment = (state && state.clueComments && state.clueComments.comments) || [];
  const params = {
    total: state.clueComments.total,
    pageNo: state.clueComments.pageNo,
  };
  return { ...formValue, comment, ...params };
};

const mapDispatchToProps = dispatch => ({
  onFetchClueComments: (comment, pageNo, total) => dispatch(onFetchClueComments(comment, pageNo, total)),
  resetForm: form => dispatch(reset(form)),
  onLoadMoreClueComments: (comment, pageNo, total) => dispatch(onLoadMoreClueComments(comment, pageNo, total)),
  dispatch,
});

const ClueCommentsPageWithForm = reduxForm({
  form: formName,
})(ClueCommentsPage);

export default connect(mapStateToProps, mapDispatchToProps)(ClueCommentsPageWithForm);
