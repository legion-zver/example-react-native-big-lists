import {handleActions} from 'redux-actions';

export interface Reducer {
    query: string;
    fetching: boolean;
    authToken: string | null;
    nextToken: string | null;
    ids: string[];
    map: {
        [id: string]: any;
    };
}

const initState: Reducer = {
    query: 'fast large lists',
    fetching: false,
    authToken: null,
    nextToken: null,
    ids: [],
    map: {},
};

export default handleActions({}, initState);
