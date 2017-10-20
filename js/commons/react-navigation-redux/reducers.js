export default function navigationReducer(navigator: Object) {
  console.log('navigator: ', navigator);
  const router = navigator.router;
  const initScreen = navigator.initScreen;
  const initTabState = router.router.getStateForAction(
    router.router.getActionForPathAndParams(initScreen)
  );
  return (state: Object = initTabState, action: Object) => {
    const nextState = router.router.getStateForAction(action, state);
    return nextState || state;
  };
}
