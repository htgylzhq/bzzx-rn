import React, { Component } from 'react';
import { Container, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProposalDiagram from './diagram';
import ProposalInfoPage from './info';
import ProposalContentPage from './content';
import ProposalLogPage from './log';

class ProposalDetailIndex extends Component {

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
          <Tab heading={'基础信息'}>
            <ProposalInfoPage proposalId={this.state.params.id} />
          </Tab>
          <Tab heading="内容">
            <ProposalContentPage proposalId={this.state.params.id} />
          </Tab>
          <Tab heading={'流程图'} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <ProposalDiagram proposalId={this.state.params.id} />
          </Tab>
          <Tab heading={'办理历史'}>
            <ProposalLogPage proposalId={this.state.params.id} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default connect()(ProposalDetailIndex);
