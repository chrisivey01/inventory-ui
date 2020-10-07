import * as types from "./hotbar.actions";

const initialState = {
    itemSlots: [],
    showHotbar: false,
};

const hotbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_HOTBAR:
            return {
                ...state,
                itemSlots: action.payload,
                showHotbar: true,
            };
        case types.CLOSE_HOTBAR:
            return {
                ...state,
                showHotbar: false,
            };
        default:
            return state;
    }
};

export default hotbarReducer;
