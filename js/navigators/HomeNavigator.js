import React from 'react';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import { TabNavigator } from 'react-navigation';
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
      <FooterTab>
        <Button
          vertical
          active={props.navigationState.index === 0}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Icon name="home" />
          <Text>首页</Text>
        </Button>
        <Button
          vertical
          active={props.navigationState.index === 1}
          onPress={() => props.navigation.navigate('Work')}
        >
          <Icon name="apps" />
          <Text>工作</Text>
        </Button>
        <Button
          vertical
          active={props.navigationState.index === 2}
          onPress={() => props.navigation.navigate('Contact')}
        >
          <Icon name="contacts" />
          <Text>通讯录</Text>
        </Button>
        <Button
          vertical
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

const HomeNavigator = () => (
  <Navigator />
);

export default connect()(HomeNavigator);
