import {fork, all} from 'redux-saga/effects';

import tweetsSaga from './tweets';

export default function* rootSaga() {
    yield all([fork(tweetsSaga)]);
}
