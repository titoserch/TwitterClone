import { combineReducers } from 'redux';

import user from './users'
import nav from './navigation'

export default client => combineReducers({
  apollo: client.reducer(),
  nav,
  user,
});