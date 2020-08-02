import axios from 'axios';
import {handleActions} from 'redux-actions';
import {AllHtmlEntities} from 'html-entities';
import {_FAIL, _SUCCESS, API_SEARCH, CHANGE_SEARCH_QUERY} from '../constants';

export interface State {
    query: string;
    items: any[];
    error: any;
    fetching: boolean;
    categories: {
        [categoryId: number]: any;
    };
}

const initState: State = {
    query: '',
    items: [],
    categories: {},
    fetching: false,
    error: null,
};

export default handleActions(
    {
        [CHANGE_SEARCH_QUERY]: (state: State, {payload: {query = ''}}: any): State => {
            const hasQuery = query.trim().length > 0;
            return {
                ...state,
                query: hasQuery ? state.query : '',
                fetching: hasQuery,
                error: null,
            };
        },
        [_SUCCESS(API_SEARCH)]: (state: State, {query, payload: {items = [], categories = []}}: any): State => ({
            ...state,
            categories: (categories || []).reduce((m: any, category: any) => {
                m[category.id] = category;
                return m;
            }, {}),
            fetching: false,
            query,
            items: items.map((item: any) => ({
                ...(item || {}),
                name: AllHtmlEntities.decode(item?.name || ''),
            })),
        }),
        [_FAIL(API_SEARCH)]: (state: State, {error = null}: any): State =>
            !axios.isCancel(error)
                ? {
                      ...state,
                      fetching: false,
                      error,
                  }
                : state,
    },
    initState,
);
