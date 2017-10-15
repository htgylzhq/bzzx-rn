import { StackNavigator } from 'react-navigation';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Login from '../components/login/';
import BlankPage from '../components/blankPage';
import HomeTabRouter from './HomeTabRouter';
import ProfileScreen from '../components/me/profile';

export default (StackNavigator({
  HomeTabRouter: {
    screen: HomeTabRouter,
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
}));
