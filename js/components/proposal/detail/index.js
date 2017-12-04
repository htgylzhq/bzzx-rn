import React, { Component } from 'react';
import { Container, Tabs, Tab, Fab, Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import ProposalDiagram from './diagram';
import ProposalInfoPage from './info';
import ProposalContentPage from './content';
import ProposalLogPage from './log';
import theme from '../../../themes/base-theme';

class ProposalDetailIndex extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
    };
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  render() {
    const task = (this.state.params && this.state.params.task) || '';
    let formPage = '';
    switch (task) {
      case '预审':
        formPage = 'YuShenPage';
        break;
      default:
        formPage = '';
        break;
    }
    const operationComp = formPage
      ?
      (
        <Fab
          direction="up"
          style={{ backgroundColor: theme.brandPrimary }}
          position="bottomRight"
          onPress={() => this.navigate(formPage, { id: this.state.params.id })}
        >
          <Icon name="play" />
        </Fab>
      )
      : null;

    return (
      <Container>
        <Tabs locked>
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
        { operationComp }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  nothing: state.nothing,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalDetailIndex);
