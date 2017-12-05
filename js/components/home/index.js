import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Left, Right, Icon, Spinner, List, H3, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Proposal from '../../models/Proposal';
import http from '../../commons/http';
import onHomeDataLoaded from '../../actions/home';
import ProposalTodo from '../model/ProposalTodo';
import ProposalMy from '../model/ProposalMy';
import _global from '../../commons/global';

class HomeScreen extends Component {

  static propTypes = {
    proposalsTodo: PropTypes.arrayOf(PropTypes.shape(Proposal)),
    proposalsMy: PropTypes.arrayOf(PropTypes.shape(Proposal)),
    dispatch: PropTypes.func,
    onHomeDataLoaded: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    _global.setDispatch(props.dispatch);
  }

  componentWillMount() {
    this._fetchData();
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  async _fetchData() {
    const res = await http.get('/platform/api/home');
    if (res.code === 0) {
      const proposalsTodo = res.data.proposalsTodo.map(obj => new Proposal(obj));
      const proposalsMy = res.data.proposalsMy.map(obj => new Proposal(obj));
      this.props.onHomeDataLoaded(proposalsTodo, proposalsMy);
      this.setState({ loading: false });
    }
  }

  _renderProposalItem(proposal: Proposal, type: String) {
    let comp;
    switch (type) {
      case 'todo':
        comp = <ProposalTodo proposal={proposal} dispatch={this.props.dispatch} />;
        break;
      case 'my':
        comp = <ProposalMy proposal={proposal} dispatch={this.props.dispatch} />;
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
            <CardItem header button onPress={() => this.navigate('ProposalIndex', { tab: 'my' })} style={{ borderBottomWidth: 1, borderBottomColor: '#921001' }}>
              <Left>
                <Icon name="paper" style={{ marginRight: 10, color: '#921001' }} />
                <H3>我创建的提案</H3>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: '#921001' }} />
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
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Button iconLeft primary style={{ marginTop: 20, backgroundColor: '#921001' }} onPress={() => this.navigate('ProposalFormPage')} >
                      <Icon active name="create" />
                      <Text>写新提案</Text>
                    </Button>
                  </CardItem>
                :
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <List
                      button
                      dataArray={this.props.proposalsMy}
                      renderRow={item => this._renderProposalItem(item, 'my')}
                    />
                  </CardItem>
            }
          </Card>
          <Card>
            <CardItem header button onPress={() => this.navigate('ProposalIndex', { tab: 'todo' })} style={{ borderBottomWidth: 1, borderBottomColor: '#921001' }}>
              <Left>
                <Icon name="refresh" style={{ marginRight: 10, color: '#921001' }} />
                <H3>我的待办提案</H3>
              </Left>
              <Right>
                <Icon name="arrow-forward" style={{ color: '#921001' }} />
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
