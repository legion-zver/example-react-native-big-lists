// noinspection SpellCheckingInspection
import axios, {AxiosResponse} from 'axios';
import {takeLatest, select, put, call, all} from 'redux-saga/effects';
import {RUN_GET_TWEETS, API_GET_TWEETS, _FAIL, _SUCCESS} from '../constants';

function fetchTweets({query, authToken, nextToken}: any) {
    return axios
        .get('https://api.twitter.com/labs/2/tweets/search', {
            timeout: 10000,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                'tweet.fields': 'created_at,author_id,public_metrics',
                'user.fields': 'name,profile_image_url',
                expansions: 'author_id',
                next_token: nextToken,
                max_results: 32,
                query,
            },
        })
        .then((res: AxiosResponse) => {
            if (res.data?.data) {
                return Promise.resolve(res.data);
            }
            return Promise.reject(res.data);
        });
}

export function* runGetTweets({payload: {reload}}: any) {
    try {
        const state = yield select();
        let {authToken, nextToken, query} = state.tweets || {};
        if (!authToken) {
            // TODO: Зарегал приложение на портале Developers Twitter, но пока его не проверили ;-)
            authToken =
                'AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX';
        }
        const result = yield call(fetchTweets, {query, authToken, nextToken: !reload ? nextToken : null});
        yield put({type: _SUCCESS(API_GET_TWEETS), reload, payload: result});
    } catch (e) {
        yield put({type: _FAIL(API_GET_TWEETS), error: e});
    }
}

export default function* () {
    yield all([takeLatest(RUN_GET_TWEETS, runGetTweets)]);
}
