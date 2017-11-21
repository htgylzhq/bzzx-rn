import React, { Component } from 'react';
import { Container, Content, Card, Text, CardItem, Left, Right, Icon, Toast, Spinner, List, ListItem, H3 } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import http from '../../commons/http';
import onHomeDataLoaded from '../../actions/home';

class HomeScreen extends Component {

  static propTypes = {
    proposalsTodo: PropTypes.arrayOf(PropTypes.instanceOf(Proposal)),
    dispatch: PropTypes.func,
    onHomeDataLoaded: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchData();
  }

  navigate(route:string) {
    this.props.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: route,
    });
  }

  _fetchData() {
    http.get('/platform/api/home')
      .then((response) => {
        if (response.data.code === 0) {
          const data = response.data.data;
          const proposalsTodo = data.proposalsTodo.map(obj => new Proposal(obj));
          this.props.onHomeDataLoaded(proposalsTodo);
        } else {
          Toast.show({
            text: response.data.msg,
            buttonText: '确定',
            position: 'bottom',
            type: 'warning',
            duration: 3000,
          });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        Toast.show({
          text: `貌似网络开小差了？${error}`,
          buttonText: '确定',
          position: 'bottom',
          type: 'danger',
          duration: 3000,
        });
      });
  }

  _renderProposalItem(proposal: Proposal) {
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Card transparent>
          <CardItem header style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Left>
              <Text numberOfLines={1}>{proposal.title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text note>{proposal.creatorName}</Text>
            </Left>
            <Right>
              <Text note>{proposal.createTime}</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Card>
            <CardItem header button onPress={() => this.navigate('MyTodoProposalsPage')}>
              <Left>
                <H3>我的待办提案</H3>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            {
              this.state.loading
                ?
                  <CardItem style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                    <Spinner />
                  </CardItem>
                :
                  null
            }
            {
              this.props.proposalsTodo.length === 0
              ?
                <CardItem cardBody style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                  <Icon active name="happy" style={{ color: 'green', fontSize: 36 }} />
                </CardItem>
                :
                <CardItem cardBody>
                  <List
                    button
                    dataArray={this.props.proposalsTodo}
                    renderRow={item => this._renderProposalItem(item)}
                  />
                </CardItem>
            }
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  proposalsTodo: state.home.proposalsTodo,
});

const mapDispatchToProps = dispatch => ({
  onHomeDataLoaded: (proposalsTodo) => {
    dispatch(onHomeDataLoaded(proposalsTodo));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
