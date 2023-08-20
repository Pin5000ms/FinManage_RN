import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import reducer from './combinedReducer';
import { devToolsEnhancer } from '@redux-devtools/extension';

// const store = configureStore(
//     {
//         reducer,
//         devTools:[ devToolsEnhancer({ realtime: true })]
//     });

const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;