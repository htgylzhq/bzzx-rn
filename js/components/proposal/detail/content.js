import React, { Component } from 'react';
import { WebView, Dimensions } from 'react-native';
import { Spinner, Container, Footer, Input, Left, Right, Button, Text, Content, Thumbnail, View, List, ListItem, Body, H3, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../../commons/http';
import Proposal from '../../../models/Proposal';
import { onFetchProposalInfo } from '../../../actions/proposalDetail';

class ProposalContentPage extends Component {

  static propTypes = {
    onFetchProposalInfo: PropTypes.func,
    proposal: PropTypes.shape(Proposal),
  };

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchProposal();
  }

  async _fetchProposal() {
    const { proposalId } = this.props;
    const res = await http.get(`/platform/api/cppcc/proposal/${proposalId}`);
    if (res.code === 0) {
      const data = res.data;
      const proposal = new Proposal(data.proposal);
      this.setState({ loading: false });
      this.props.onFetchProposalInfo(proposal);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#ddd' }}>
        <Content>
          <Card style={{ flex: 1, height: Dimensions.get('window').height - 275, marginTop: 0 }}>
            <CardItem header style={{ alignItems: 'flex-start' }}>
              <H3 style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#921001', paddingLeft: 15, paddingBottom: 10 }}>提案内容</H3>
            </CardItem>
            <CardItem cardBody style={{ flex: 1 }}>
              {
                this.state.loading
              ?
                <Spinner />
              :
                <WebView
                  source={{ html: this.props.proposal.content }}
                />}
            </CardItem>
          </Card>
          <Card style={{ flex: 1 }}>
            <CardItem header style={{ flex: 1 }}>
              <H3 style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#921001', paddingLeft: 15, paddingBottom: 10 }}>提案评论</H3>
            </CardItem>
            <CardItem cardBody style={{ flex: 1, flexDirection: 'row' }}>
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
            <Input placeholderTextColor={'#c0c0c0'} placeholder={'发表评论'} style={{ backgroundColor: '#fff', height: 35, flex: 1, alignItems: 'flex-end', borderWidth: 1, borderColor: '#ddd', paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }} />
          </Left>
          <Right style={{ flex: 0, marginLeft: 10, marginRight: 10 }}>
            <Button style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', height: 35, borderRadius: 3 }}>
              <Text style={{ color: '#c0c0c0' }}>发表</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  proposal: state.proposalDetail.proposal,
});

const mapDispatchToProps = dispatch => ({
  onFetchProposalInfo: proposal => dispatch(onFetchProposalInfo(proposal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalContentPage);
