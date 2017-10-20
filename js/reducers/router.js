import { AppNavigator } from '../navigators/AppNavigator';

const HomeTabAction = AppNavigator.router.getActionForPathAndParams('HomeTabRouter');
const initialState = AppNavigator.router.getStateForAction(HomeTabAction);

export default function (state = initialState, action) {
  console.log('action', action);

  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log(nextState);
  return nextState;
}
