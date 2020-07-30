import {combineReducers} from 'redux';

import tweets, {State as TweetsState} from './tweets';
import net from './net';

export interface State {
    tweets: TweetsState;
    net: boolean;
}

export default combineReducers({
    tweets,
    net,
});
