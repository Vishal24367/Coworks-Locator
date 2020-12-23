import { compose, createStore } from 'redux';
import reducer from './reducer';
import persistState from 'redux-sessionstorage'


const createPersistentStore = compose(persistState())(createStore)
const store = createPersistentStore(reducer)

export default store;