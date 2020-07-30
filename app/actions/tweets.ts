import {RUN_GET_TWEETS} from '../constants';

interface RunOptions {
    authToken?: string | null;
    nextToken?: string | null;
    query: string;
}

export function runGetTweets(reload: boolean) {
    return {type: RUN_GET_TWEETS, payload: {reload}};
}
