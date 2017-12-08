import React, { Component } from 'react';
import { Spinner, Container, Footer, Input, Left, Right, Button, Text, Content, View, Form, List, ListItem, Body, H3, Card, CardItem } from 'native-base';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RefreshControl, StyleSheet } from 'react-native';
import http from '../../../commons/http';
import { onFetchComment, onLoadMoreComment } from '../../../actions/comment';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ProposalContentPage extends Component {
  static propTypes = {
    onFetchComment: PropTypes.func,
    onLoadMoreComment: PropTypes.func,
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
    this._fetchComment();
  }

  async _fetchComment() {
    const { proposalId } = this.props;
    const res = await http.get('/platform/cppcc/proposal/comment', {
      id: proposalId,
      pageNo: 1,
      pageSize: 15,
    });
    if (res.code === 0) {
      const data = res.data;
      const comment = data.list;
      this.props.onFetchComment(comment, data.pageNo, data.total);
      this.setState({ loading: false });
    }
  }
  async _submit() {
    this.setState({ submitting: true });
    const { commentVal, proposalId } = this.props;
    if (_.trim(commentVal) !== '') {
      const res = await http.post('/platform/cppcc/proposal/comment', {
        id: proposalId,
        content: commentVal,
      });
      if (res.code === 0) {
        this.props.resetForm('comment');
        this._fetchComment();
        this.setState({ loading: false, submitting: false });
      }
    }
  }
  async _loadMore() {
    this.setState({ refreshing: true });
    const { proposalId } = this.props;
    const res = await http.get('/platform/cppcc/proposal/comment', {
      id: proposalId,
      pageNo: this.props.pageNo + 1,
      pageSize: 10,
    });
    if (res.code === 0) {
      const data = res.data;
      const comment = data.list;
      this.props.onLoadMoreComment(comment, data.pageNo, data.total);
      this.setState({ refreshing: false });
    }
  }
  renderInput = ({ input }) => (
    <Input {...input} placeholderTextColor={'#c0c0c0'} placeholder={'发表评论'} style={{ backgroundColor: '#fff', flex: 1, alignItems: 'flex-end', height: 35, borderWidth: 1, borderColor: '#ddd', paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }} />
  );
  renderRow(item) {
    return (
      <ListItem avatar style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Left style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 0 }}>
          <View style={[styles.avatar, { backgroundColor: 'rgb(179,199,249)' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{item.creatorName.substring(0, 1)}</Text>
          </View>
        </Left>
        <Body style={{ paddingTop: 0 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 0, paddingLeft: 0, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, paddingTop: 0 }}>{ item.creatorName }</Text>
            <Text note style={{ fontSize: 10 }}>{ item.createTime }</Text>
          </View>
          <Text note>{ item.content }</Text>
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
  const formValue = (state && state.form && state.form.comment && state.form.comment.values) || {
    commentVal: '',
  };
  const comment = (state && state.comment && state.comment.comment) || [];
  const params = {
    total: state.comment.total,
    pageNo: state.comment.pageNo,
  }
  return { ...formValue, comment, ...params };
};

const mapDispatchToProps = dispatch => ({
  onFetchComment: (comment, pageNo, total) => dispatch(onFetchComment(comment, pageNo, total)),
  resetForm: formName => dispatch(reset(formName)),
  onLoadMoreComment: (comment, pageNo, total) => dispatch(onLoadMoreComment(comment, pageNo, total)),
  dispatch,
});

const ProposalContentPageWithComment = reduxForm({
  form: 'comment',
})(ProposalContentPage);

export default connect(mapStateToProps, mapDispatchToProps)(ProposalContentPageWithComment);
