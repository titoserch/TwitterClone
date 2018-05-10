import { router } from '../screens/navigations';

export default (state, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
}