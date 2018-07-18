import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
//root reducer refers to reducers/index.js (the combiner reducer)
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk]


const store = createStore(
   rootReducer,
   initialState,
   //use compose for redux dev tools extension in chrome
   compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );

export default store;