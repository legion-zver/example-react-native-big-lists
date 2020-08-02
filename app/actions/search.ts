import {CHANGE_SEARCH_QUERY} from '../constants';

export function changeSearchQuery(query: string): any {
    return {type: CHANGE_SEARCH_QUERY, payload: {query}};
}
