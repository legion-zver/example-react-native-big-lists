// Screens
export const RECYCLE_LIST_VIEW_SCREEN = 'app.RecycleListView';
export const FLAT_LIST_SCREEN = 'app.FlatList';

// Actions
export const RUN_GET_TWEETS = 'sagas.runGetTweets';

// Api actions
export const API_AUTH_TWITTER = 'api.authTwitter';
export const API_GET_TWEETS = 'api.getTweets';

// Helpers
export function _SUCCESS(type: string): string {
    return `${type}.success`;
}

export function _FAIL(type: string): string {
    return `${type}.fail`;
}
