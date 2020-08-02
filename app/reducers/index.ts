import {combineReducers} from 'redux';

import tweets, {State as TweetsState} from './tweets';
import search, {State as SearchState} from './search';
import net from './net';

export interface State {
    tweets: TweetsState;
    search: SearchState;
    net: boolean;
}

export default combineReducers({
    tweets,
    search,
    net,
});
