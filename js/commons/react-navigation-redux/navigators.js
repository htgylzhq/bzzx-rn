import React from 'react';
import { connect } from 'react-redux';
import {
  TabNavigator as TabNav,
  DrawerNavigator as DrawerNav,
  StackNavigator as StackNav,
  addNavigationHelpers,
} from 'react-navigation';

type Props = {
  dispatch: () => void,
  routeState: Object
};

function createRouter(navigator, routes, routeConfigs, navigationStoreKey) {
  const Router = navigator(routes, routeConfigs);

  function Wrapper(props: Props) {
    const { dispatch, routeState } = props;
    return (
      <Router
        navigation={addNavigationHelpers({
          dispatch,
          state: routeState,
        })}
      />
    );
  }

  const mapDataToProps = state => ({
    routeState: state[navigationStoreKey],
  });

  const Container = connect(mapDataToProps)(Wrapper);

  const initScreen = Object.keys(routes)[0];
  Container.initScreen = initScreen;
  Container.router = Router;
  return Container;
}

export function TabNavigator(routes: Object, routeConfigs: Object) {
  return (navigationStoreKey: string) =>
    createRouter(TabNav, routes, routeConfigs, navigationStoreKey);
}

export function DrawerNavigator(routes: Object, routeConfigs: Object) {
  return (navigationStoreKey: string) =>
    createRouter(DrawerNav, routes, routeConfigs, navigationStoreKey);
}

export function StackNavigator(routes: Object, routeConfigs: Object) {
  return (navigationStoreKey: string) =>
    createRouter(StackNav, routes, routeConfigs, navigationStoreKey);
}
