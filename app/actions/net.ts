import {CHANGE_NET_STATUS} from '../constants';

export function changeNetStatus(online: boolean) {
    return {type: CHANGE_NET_STATUS, payload: online};
}
