import {combineReducers} from 'redux';

import tweets, {State as TweetsState} from './tweets';

export interface State {
    tweets: TweetsState;
}

export default combineReducers({
    tweets,
});
