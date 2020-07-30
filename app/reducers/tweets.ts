import {handleActions} from 'redux-actions';
import {_FAIL, _SUCCESS, API_GET_TWEETS, RUN_GET_TWEETS} from '../constants';

export interface State {
    error?: any;
    query: string;
    fetching: boolean;
    authToken: string | null;
    nextToken: string | null;
    users: {
        [id: string]: any;
    };
    ids: string[];
    map: {
        [id: string]: any;
    };
}

const initState: State = {
    query: 'react native',
    fetching: false,
    authToken: null,
    nextToken: null,
    users: {},
    ids: [],
    map: {},
};

export default handleActions(
    {
        [RUN_GET_TWEETS]: (state: State, {payload: {reload}}: any) => ({
            ...state,
            fetching: true,
            error: undefined,
            nextToken: !reload ? state.nextToken : null,
        }),
        [_SUCCESS(API_GET_TWEETS)]: (state: State, {reload, payload}: any) => {
            const {map, ids} = (payload?.data || []).reduce(
                (result: any, item: any) => {
                    if (item) {
                        if (!(item.id in state.map) || reload) {
                            result.ids.push(item.id);
                        }
                        result.map[item.id] = item;
                    }
                    return result;
                },
                {
                    map: {},
                    ids: [],
                },
            );
            return {
                ...state,
                map: reload
                    ? map
                    : {
                          ...state.map,
                          ...map,
                      },
                ids: reload ? ids : [...state.ids, ...ids],
                users: (payload?.includes?.users || []).reduce(
                    (users: any, user: any) => {
                        if (!(user?.id in users)) {
                            users[user.id] = user;
                        }
                        return users;
                    },
                    {...state.users},
                ),
                nextToken: payload?.meta?.next_token,
                fetching: false,
            };
        },
        [_FAIL(API_GET_TWEETS)]: (state: State, {error}: any) => ({
            ...state,
            fetching: false,
            error,
        }),
    },
    initState,
);
