import { createStore } from 'redux'
import restroReducer from './restroReducer'
import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const store = createStore(restroReducer,applyMiddleware(thunk))

export default store
