import { createStore } from 'redux';
import reducer from './account';

const store = createStore(reducer);

export default store;