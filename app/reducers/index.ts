import {combineReducers} from 'redux';

import tweets, {Reducer as TweetsReducer} from './tweets';

export interface Reducers {
    tweets: TweetsReducer;
}

export default combineReducers({
    tweets,
});
