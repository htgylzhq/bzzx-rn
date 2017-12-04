import React, { Component } from 'react';
import { Container, Tabs, Tab, Fab, Icon } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import ProposalMyScreen from '../proposal/my';
import ProposalTodoScreen from '../proposal/todo';
import ProposalDoneScreen from '../proposal/done';
import theme from '../../themes/base-theme';

class ProposalIndex extends Component {

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
        <Tabs locked initialPage={initialPage} tabBarUnderlineStyle={{ backgroundColor: '#941001' }}>
          <Tab heading={'我的'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalMyScreen />
          </Tab>
          <Tab heading={'待办'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalTodoScreen />
          </Tab>
          <Tab heading={'已办'} textStyle={{ color: '#000' }} activeTextStyle={{ color: '#941001' }} tabStyle={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }} activeTabStyle={{ backgroundColor: '#fff' }}>
            <ProposalDoneScreen />
          </Tab>
        </Tabs>
        <Fab
          direction="up"
          style={{ backgroundColor: theme.brandPrimary }}
          position="bottomRight"
          onPress={() => this.navigate('ProposalFormPage')}
        >
          <Icon name="create" />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  nothing: state.nothing || {},
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(ProposalIndex);
