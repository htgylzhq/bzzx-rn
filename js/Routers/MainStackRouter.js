import { StackNavigator } from 'react-navigation';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Login from '../components/login/';
import Home from '../components/home/';
import BlankPage from '../components/blankPage';
import HomeDrawerRouter from './HomeDrawerRouter';
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null,
});
export default (StackNav = StackNavigator({
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  Login: { screen: Login },
}));
