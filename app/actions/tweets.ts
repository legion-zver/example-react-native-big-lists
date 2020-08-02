import {RUN_GET_TWEETS} from '../constants';

export function runGetTweets(reload: boolean) {
    return {type: RUN_GET_TWEETS, payload: {reload}};
}
