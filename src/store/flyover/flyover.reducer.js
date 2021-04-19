import * as types from "./flyover.actions";

const initialState = {
    showFlyOver: false,
    item: {},
    axis: {}
};

const flyOverReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_HOVER_ITEM:
            return {
                ...state,
                showFlyOver: true,
                item: action.payload.item,
                axis: action.payload.axis
            };
        case types.LEAVE_HOVER_ITEM:
            return {
                ...state,
                showFlyOver: false,
                item: {},
                axis: {}
            };
        default:
            return state;
    }
}

export default flyOverReducer;