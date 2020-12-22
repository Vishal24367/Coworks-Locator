import * as actions from './actionTypes';


export function fetchCoworkData(data) {
    return {type: actions.FETCH_COWORK_DATA, payload: {
            data
        }};
}