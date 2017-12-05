import React, { Component } from 'react';
import { Spinner, Container, Footer, Input, Left, Right, Button, Text, Content, Thumbnail, Form, List, ListItem, Body, H3, Card, CardItem } from 'native-base';
import { Dimensions } from 'react-native';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import Comment from '../../../models/Comment';
import { onFetchComment } from '../../../actions/comment';

class ProposalContentPage extends Component {
  static propTypes = {
    onFetchComment: PropTypes.func,
    commentVal: PropTypes.string,
    resetForm: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitting: false,
    };
  }
  componentWillMount() {
    this._fetchComment();
  }

  async _fetchComment() {
    const { proposalId } = this.props;
    const res = await http.get(`${proposalId}`);
    if (res.code === 0) {
      const data = res.data;
      const comment = new Comment(data.proposal);
      this.setState({ loading: false });
      this.props.onFetchComment(comment);
    }
  }
  async _submit() {
    this.setState({ submitting: true });
    const { commentVal } = this.props;
    const res = await http.post('111', {
      commentVal,
    });
    if (res.code === 0) {
      const comment = res.data;
      this.props.onFetchComment(comment);
      this.props.resetForm('comment');
      this.setState({ loading: false });
    }
  }
  renderInput = ({ input }) => (
    <Input {...input} placeholderTextColor={'#c0c0c0'} placeholder={'发表评论'} style={{ backgroundColor: '#fff', flex: 1, alignItems: 'flex-end', height: 35, borderWidth: 1, borderColor: '#ddd', paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }} />
  );
  render() {
    return (
      <Container style={{ backgroundColor: '#ddd' }}>
        <Content>
          <Card style={{ flex: 1, height: Dimensions.get('window').height, marginTop: 0 }}>
            <CardItem cardBody style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
              <List style={{ flex: 1 }}>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            </CardItem>
          </Card>
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

const mapStateToProps = state => (state && state.form && state.form.comment && state.form.comment.values) || {
  commentVal: '',
};

const mapDispatchToProps = dispatch => ({
  onFetchComment: comment => dispatch(onFetchComment(comment)),
  resetForm: formName => dispatch(reset(formName)),
  dispatch,
});

const ProposalContentPageWithComment = reduxForm({
  form: 'comment',
})(ProposalContentPage);

export default connect(mapStateToProps, mapDispatchToProps)(ProposalContentPageWithComment);
