import * as actions from './actionTypes';
export default function reducer(state = { cowork: [] }, action) {
    switch (action.type) { // case "": something
        case actions.FETCH_COWORK_DATA:
            {
                return {
                    ...state,
                    cowork: action.payload.data
                }
            }
        default:
            return state;
    }
}