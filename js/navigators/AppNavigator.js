import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Login from '../components/login/';
import BlankPage from '../components/blankPage';
import HomeNavigator from './HomeNavigator';
import ProfileScreen from '../components/me/profile';
import SettingScreen from '../components/me/setting';
import AboutScreen from '../components/me/setting/about';
import ChangePasswordScreen from '../components/me/setting/change_password';
import MsgDetailPage from '../components/msg/detail';
import ProposalIndex from '../components/proposal';
import ProposalDetailIndex from '../components/proposal/detail';
import MyOwnProposalsPage from '../components/me/proposal/own';
import MyTodoProposalsPage from '../components/me/proposal/todo';
import MyDoneProposalsPage from '../components/me/proposal/done';
import theme from '../themes/base-theme';

export const AppNavigator = StackNavigator({
  HomeTabRouter: {
    screen: HomeNavigator,
    navigationOptions: {
      header: null,
    },
  },
  BlankPage: { screen: BlankPage },
  Login: { screen: Login },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: '个人信息',
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      title: '设置',
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      title: '关于我们',
    },
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      title: '修改密码',
    },
  },
  MsgDetailPage: {
    screen: MsgDetailPage,
    navigationOptions: {
      title: '留言板',
    },
  },
  ProposalIndex: {
    screen: ProposalIndex,
    navigationOptions: {
      title: '政协提案',
      headerStyle: {
        backgroundColor: theme.brandPrimary,
      },
      headerTintColor: theme.tabTextColor,
    },
  },
  ProposalDetailIndex: {
    screen: ProposalDetailIndex,
    navigationOptions: {
      title: '政协提案',
      headerStyle: {
        backgroundColor: theme.brandPrimary,
      },
      headerTintColor: theme.tabTextColor,
    },
  },
  MyOwnProposalsPage: {
    screen: MyOwnProposalsPage,
    navigationOptions: {
      title: '我的提案',
    },
  },
  MyTodoProposalsPage: {
    screen: MyTodoProposalsPage,
    navigationOptions: {
      title: '提案 - 我的待办',
    },
  },
  MyDoneProposalsPage: {
    screen: MyDoneProposalsPage,
    navigationOptions: {
      title: '提案 - 我的已办',
    },
  },
});

class AppWithNavigationState extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape({
      index: PropTypes.number,
    }).isRequired,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (this.props.nav.index === 0) {
      return false;
    }
    this.props.dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
    });
    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
