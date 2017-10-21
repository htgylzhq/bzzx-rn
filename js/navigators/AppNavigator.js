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
import MsgDetailPage from '../components/msg/detail';

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
  MsgDetailPage: {
    screen: MsgDetailPage,
    navigationOptions: {
      title: '留言板',
    },
  },
});

class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
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

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log('Root state', state);
  return {
    nav: state.nav,
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
