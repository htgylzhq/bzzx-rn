import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Login from '../components/login';
import HomeNavigator from './HomeNavigator';
import ProfileScreen from '../components/me/profile';
import SettingScreen from '../components/me/setting';
import AboutScreen from '../components/me/setting/about';
import ChangePasswordScreen from '../components/me/setting/change_password';
import MsgDetailPage from '../components/msg/detail';
import ProposalIndex from '../components/proposal';
import ProposalDetailPage from '../components/proposal/detail';
import ProposalFormPage from '../components/proposal/form';
import ContactDetailPage from '../components/contact/detail';
import YuShenPage from '../components/proposal/task/yu_shen';
import theme from '../themes/base-theme';

export const AppNavigator = StackNavigator({
  HomeTabRouter: {
    screen: HomeNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Login: { screen: Login },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: '个人信息',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      title: '设置',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      title: '关于我们',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      title: '修改密码',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  },
  MsgDetailPage: {
    screen: MsgDetailPage,
    navigationOptions: {
      title: '留言板',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
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
  ProposalDetailPage: {
    screen: ProposalDetailPage,
    navigationOptions: {
      title: '政协提案',
      headerStyle: {
        backgroundColor: theme.brandPrimary,
      },
      headerTintColor: theme.tabTextColor,
    },
  },
  YuShenPage: {
    screen: YuShenPage,
    navigationOptions: {
      title: '提案预审',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  },
  ProposalFormPage: {
    screen: ProposalFormPage,
    navigationOptions: ({ navigation }) => {
      return {
        title: (navigation && navigation.state && navigation.state.params && navigation.state.params.id) ? '修改提案' : '写新提案',
        headerStyle: {
          backgroundColor: '#941001',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
      };
    },
  },
  ContactDetailPage: {
    screen: ContactDetailPage,
    navigationOptions: {
      title: '通讯录',
      headerStyle: {
        backgroundColor: '#941001',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
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
