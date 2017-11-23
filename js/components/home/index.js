import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Left, Right, Icon, Spinner, List, H3, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Proposal from '../../models/Proposal';
import http from '../../commons/http';
import onHomeDataLoaded from '../../actions/home';
import ProposalTodo from '../model/ProposalTodo';
import ProposalMy from '../model/ProposalMy';
import { Toaster } from '../../commons/util';

class HomeScreen extends Component {

  static propTypes = {
    proposalsTodo: PropTypes.arrayOf(PropTypes.instanceOf(Proposal)),
    proposalsMy: PropTypes.arrayOf(PropTypes.instanceOf(Proposal)),
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
          const proposalsMy = data.proposalsMy.map(obj => new Proposal(obj));
          this.props.onHomeDataLoaded(proposalsTodo, proposalsMy);
        } else {
          Toaster.warn(response.data.msg);
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        Toaster.error(err);
      });
  }

  _renderProposalItem(proposal: Proposal, type: String) {
    let comp;
    switch (type) {
      case 'todo':
        comp = <ProposalTodo proposal={proposal} />;
        break;
      case 'my':
        comp = <ProposalMy proposal={proposal} />;
        break;
      default:
        comp = null;
        break;
    }

    return comp;
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
                    renderRow={item => this._renderProposalItem(item, 'todo')}
                  />
                </CardItem>
            }
          </Card>
          <Card>
            <CardItem header button onPress={() => this.navigate('MyTodoProposalsPage')}>
              <Left>
                <H3>我创建的提案</H3>
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
              this.props.proposalsMy.length === 0
                ?
                  <CardItem cardBody style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                    <Button iconLeft primary style={{ marginTop: 20 }}>
                      <Icon active name="create" />
                      <Text>写新提案</Text>
                    </Button>
                  </CardItem>
                :
                  <CardItem cardBody>
                    <List
                      button
                      dataArray={this.props.proposalsTodo}
                      renderRow={item => this._renderProposalItem(item, 'my')}
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
  proposalsMy: state.home.proposalsMy,
});

const mapDispatchToProps = dispatch => ({
  onHomeDataLoaded: (proposalsTodo, proposalsMy) => {
    dispatch(onHomeDataLoaded(proposalsTodo, proposalsMy));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
