// noinspection SpellCheckingInspection
import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {throttle, put, call, all} from 'redux-saga/effects';
import {CHANGE_SEARCH_QUERY, API_SEARCH, _FAIL, _SUCCESS} from '../constants';

// For cancel other search requests
let _source: CancelTokenSource | null = null;

function fetchSearch({query: q, cancelToken, brandId = 24}: any) {
    return axios
        .get('https://api.savetime.net/v1/client/suggest/item', {
            timeout: 10000,
            cancelToken,
            params: {
                brandId,
                q,
            },
        })
        .then((res: AxiosResponse) => {
            if (res.data?.error) {
                return Promise.reject(res.data);
            }
            return Promise.resolve(res.data);
        });
}

export function* runSearch({payload: {query, brandId}}: any) {
    _source?.cancel('Operation canceled');
    if (query!.length < 1) {
        return;
    }
    // Generate new source
    _source = axios.CancelToken.source();
    try {
        const result = yield call(fetchSearch, {query, brandId, cancelToken: _source.token});
        // Clear cancel token source
        _source = null;
        // Put result
        yield put({type: _SUCCESS(API_SEARCH), query, payload: result});
    } catch (e) {
        yield put({type: _FAIL(API_SEARCH), error: e});
    }
}

export default function* () {
    yield all([throttle(1000, CHANGE_SEARCH_QUERY, runSearch)]);
}
