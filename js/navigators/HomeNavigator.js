import React from 'react';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import HomeScreen from '../components/home';
import ProposalScreen from '../components/proposal';
import MsgScreen from '../components/msg';
import MeScreen from '../components/me';

const Navigator = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Proposal: {
    screen: ProposalScreen,
  },
  Msg: {
    screen: MsgScreen,
  },
  Me: {
    screen: MeScreen,
  },
}, {
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
          onPress={() => props.navigation.navigate('Proposal')}
        >
          <Icon name="document" />
          <Text>提案</Text>
        </Button>
        <Button
          vertical
          active={props.navigationState.index === 2}
          onPress={() => props.navigation.navigate('Msg')}
        >
          <Icon name="chatboxes" />
          <Text>留言板</Text>
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
