import {take, put, call, fork, all} from 'redux-saga/effects';

export function* watchGetTweetsData() {}

export default function* () {
    yield all([fork(watchGetTweetsData)]);
}
