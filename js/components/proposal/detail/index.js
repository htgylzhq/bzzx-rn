import React, { Component } from 'react';
import { Container, Tabs, Tab, Fab, Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import ProposalDiagram from './diagram';
import ProposalInfoPage from './info';
import ProposalContentPage from './content';
import ProposalLogPage from './log';
import ProposalCommentPage from './comment';
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
      case '立案审查':
        formPage = 'LiAnPage';
        break;
      case '修改提案':
        formPage = 'ReeditPage';
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
        <Tabs locked tabBarUnderlineStyle={{ backgroundColor: '#941001' }}>
          <Tab heading={'基础信息'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalInfoPage proposalId={this.state.params.id} />
          </Tab>
          <Tab heading="内容" textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalContentPage proposalId={this.state.params.id} />
          </Tab>
          <Tab heading={'流程图'} style={{ paddingLeft: 0, paddingRight: 0 }} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalDiagram proposalId={this.state.params.id} />
          </Tab>
          <Tab heading={'办理历史'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalLogPage proposalId={this.state.params.id} />
          </Tab>
          <Tab heading={'评论'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalCommentPage proposalId={this.state.params.id} />
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
