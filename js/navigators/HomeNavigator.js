/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import { TabNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import HomeScreen from '../components/home';
import WorkScreen from '../components/work';
import ContactScreen from '../components/contact';
import MeScreen from '../components/me';

const Navigator = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Work: {
    screen: WorkScreen,
  },
  Contact: {
    screen: ContactScreen,
  },
  Me: {
    screen: MeScreen,
  },
}, {
  lazy: true,
  tabBarPosition: 'bottom',
  tabBarComponent: props => (
    <Footer>
      <FooterTab style={{ backgroundColor: '#941001' }}>
        <Button
          vertical
          active={props.navigationState.index === 0}
          style={{ backgroundColor: '#941001' }}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Icon name="home" />
          <Text>首页</Text>
        </Button>
        <Button
          vertical
          style={{ backgroundColor: '#941001' }}
          active={props.navigationState.index === 1}
          onPress={() => props.navigation.navigate('Work')}
        >
          <Icon name="apps" />
          <Text>工作</Text>
        </Button>
        <Button
          vertical
          style={{ backgroundColor: '#941001' }}
          active={props.navigationState.index === 2}
          onPress={() => props.navigation.navigate('Contact')}
        >
          <Icon name="contacts" />
          <Text>通讯录</Text>
        </Button>
        <Button
          vertical
          style={{ backgroundColor: '#941001' }}
          active={props.navigationState.index === 3}
          onPress={() => props.navigation.navigate('Me')}
        >
          <Icon name="person" />
          <Text>我的</Text>
        </Button>
      </FooterTab>
    </Footer>
    ),
});

const defaultGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
  if (action.type === NavigationActions.NAVIGATE) {
    const route = state.routes[state.index];
    if (route.routeName === action.routeName) {
      return null;
    }

    const actions = state.actions || [];
    actions.push(action);
    const newState = defaultGetStateForAction(action, state);
    return { ...newState, actions };
  }

  if (action.type === NavigationActions.BACK) {
    const actions = state.actions;
    actions.pop();
    let newAction = actions.pop();
    actions.push(action);
    if (!newAction) {
      newAction = NavigationActions.navigate({
        routeName: state.routes[0].routeName,
      });
      if (state.index === 0) {
        return null;
      }
    }

    const newState = defaultGetStateForAction(newAction, state);
    return { ...newState, actions };
  }

  return defaultGetStateForAction(action, state);
};

const HomeNavigator = () => (
  <Navigator />
);

export default connect()(HomeNavigator);
