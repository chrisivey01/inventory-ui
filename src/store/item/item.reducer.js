import * as types from "./item.actions";

const initialState = {
    itemInfo: {},
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_INFO:
            return {
                ...state,
                itemInfo: action.payload,
            };
        case types.CLEAR_INFO:
            return {
                ...state,
                itemInfo: {}
            };
        default:
            return state;
    }
};

export default itemReducer;
