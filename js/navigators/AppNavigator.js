import React from 'react';
import PropTypes from 'prop-types';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
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

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={
      addNavigationHelpers({
        dispatch,
        state: nav,
      })
    }
  />
);

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
