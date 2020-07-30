import {handleActions} from 'redux-actions';
import {CHANGE_NET_STATUS} from '../constants';

export default handleActions(
    {
        [CHANGE_NET_STATUS]: (state: boolean, {payload}: any) => payload,
    },
    true,
);
