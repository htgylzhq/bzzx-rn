import { StackNavigator } from 'react-navigation';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Login from '../components/login/';
import BlankPage from '../components/blankPage';
import HomeTabRouter from './HomeTabRouter';

export default (new StackNavigator({
  HomeTabRouter: {
    screen: HomeTabRouter,
    navigationOptions: {
      header: null,
    },
  },
  BlankPage: { screen: BlankPage },
  Login: { screen: Login },
}));
