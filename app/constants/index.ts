// Screens
export const RECYCLE_LIST_VIEW_SCREEN = 'screens.RecycleListView';
export const AUTO_COMPLETE_SCREEN = 'screens.AutoComplete';
export const FLAT_LIST_SCREEN = 'screens.FlatList';

// Actions
export const RUN_GET_TWEETS = 'sagas.runGetTweets';
export const CHANGE_NET_STATUS = 'op.changeNetStatus';
export const CHANGE_SEARCH_QUERY = 'sagas.changeSearchQuery';

// Api actions
export const API_AUTH_TWITTER = 'api.authTwitter';
export const API_GET_TWEETS = 'api.getTweets';
export const API_SEARCH = 'api.search';

// Helpers
export function _SUCCESS(type: string): string {
    return `${type}.success`;
}

export function _FAIL(type: string): string {
    return `${type}.fail`;
}
