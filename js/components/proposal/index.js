import React, { Component } from 'react';
import { Container, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProposalMyScreen from '../proposal/my';
import ProposalTodoScreen from '../proposal/todo';
import ProposalDoneScreen from '../proposal/done';

class ProposalIndex extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
    };
  }

  render() {
    let initialPage = 0;
    switch (this.state.params.tab) {
      case 'my':
        initialPage = 0;
        break;
      case 'todo':
        initialPage = 1;
        break;
      case 'done':
        initialPage = 2;
        break;
      default:
        initialPage = 0;
        break;
    }

    return (
      <Container>
        <Tabs locked initialPage={initialPage}>
          <Tab heading={'我的'}>
            <ProposalMyScreen />
          </Tab>
          <Tab heading={'待办'}>
            <ProposalTodoScreen />
          </Tab>
          <Tab heading={'已办'}>
            <ProposalDoneScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default connect()(ProposalIndex);
