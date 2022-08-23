import { combineReducers } from 'redux';

import ticket from './ticket'
import auth from './auth';

export const reducers = combineReducers({ticket, auth });
