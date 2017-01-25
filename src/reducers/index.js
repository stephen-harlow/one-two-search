import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import food from './food';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
    food
});

export default rootReducer;
