import { combineReducers } from 'redux';

import user from './users'

export default client => combineReducers({
  apollo: client.reducer(),
  user,
});