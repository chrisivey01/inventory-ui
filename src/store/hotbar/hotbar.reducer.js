import * as types from "./hotbar.actions";

const initialState = {
    itemSlots: [],
    hotbarShow: false,
};

const hotbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_HOTBAR:
            return {
                ...state,
                itemSlots: action.payload,
                hotbarShow: true,
            };
        case types.CLOSE_HOTBAR:
            return {
                ...state,
                hotbarShow: false,
            };
        default:
            return state;
    }
};

export default hotbarReducer;
