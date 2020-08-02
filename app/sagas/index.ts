import {fork, all} from 'redux-saga/effects';

import searchSaga from './search';
import tweetsSaga from './tweets';

export default function* rootSaga() {
    yield all([fork(searchSaga), fork(tweetsSaga)]);
}
