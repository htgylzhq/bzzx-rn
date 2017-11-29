import { AppNavigator } from '../navigators/AppNavigator';

const HomeTabAction = AppNavigator.router.getActionForPathAndParams('HomeTabRouter');
const initialState = AppNavigator.router.getStateForAction(HomeTabAction);

export default function (state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState;
}
