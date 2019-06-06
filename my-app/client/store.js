
import {createStore} from 'redux'
import {combineReducers} from 'redux'
import TweetReducer from './reducers/tweetReducer'

const reducer = combineReducers({
    TweetReducer
});

const initialState = {
    TweetReducer: {username: "", tweet: null, result: null}
};


let store = createStore(reducer, initialState);

export default store;