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
  View,
  Image,
} from 'native-base';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshControl, StyleSheet } from 'react-native';
import _ from 'lodash';
import http from '../../commons/http';
import { onFetchClueComments, onLoadMoreClueComments } from '../../actions/clueComments';
import CommentContent from '../model/CommentContent';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
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
        this.props.resetForm('clueComment');
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
    <Input {...input} placeholderTextColor={'#c0c0c0'} placeholder={'发送评论'} style={{ backgroundColor: '#fff', flex: 1, alignItems: 'flex-end', height: 35, lineHeight: 12, borderWidth: 1, borderColor: '#ddd', paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, borderRadius: 3, fontSize: 12 }} />
  );
  renderRow(item) {
    return (
      <ListItem avatar style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0 }}>
        <Left style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 0, width: 50 }}>
          <View style={[styles.avatar, { backgroundColor: 'rgb(179,199,249)' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{item.creatorName.substring(0, 1)}</Text>
          </View>
        </Left>
        <Body style={{ paddingTop: 0, paddingLeft: 5 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 0, paddingLeft: 0, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, paddingTop: 0 }}>{ item.creatorName }</Text>
            <Text note style={{ fontSize: 10 }}>{ item.createTime }</Text>
          </View>
          <CommentContent content={item.content} />
        </Body>
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
                <CardItem cardBody style={{ flex: 1, flexDirection: 'row' }}>
                  <List
                    style={{ flex: 1 }}
                    renderRow={item => this.renderRow(item)}
                    dataArray={this.props.comment}
                    onEndReachedThreshold={20}
                    onEndReached={() => { this._loadMore(); }}
                    refreshControl={<RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this._fetchComments()}
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
            <Button disabled={this.state.submitting} onPress={() => this._submit()} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', height: 35, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
              {
                this.state.submitting
                  ?
                    <Spinner color={'#c0c0c0'} />
                  :
                    <Text style={{ color: '#c0c0c0', fontSize: 12, paddingTop: 0, paddingBottom: 4, marginTop: 0, marginBottom: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>发送</Text>
              }
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const formValue = (state && state.form && state.form.clueComment && state.form.clueComment.values) || {
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
  form: 'clueComment',
})(ClueCommentsPage);

export default connect(mapStateToProps, mapDispatchToProps)(ClueCommentsPageWithForm);
