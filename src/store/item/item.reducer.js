import * as types from "./item.actions";

const initialState = {
    itemInfo: {},
    axis: {}
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_INFO:
            return {
                ...state,
                itemInfo: action.payload.info.item,
                axis: action.payload.axis
            };
        case types.CLEAR_INFO:
            return {
                ...state,
                itemInfo: {},
                axis: {}
            };
        default:
            return state;
    }
};

export default itemReducer;
