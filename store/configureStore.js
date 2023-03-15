import { configureStore } from '@reduxjs/toolkit';
//import { createStore } from 'redux';
import reducer from './account';

const store = configureStore({reducer});

export default store;