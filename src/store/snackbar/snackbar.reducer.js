import { SHOW_ERROR, HIDE_ERROR } from "./snackbar.actions";

const initialState = {
    showMessage: false,
    message: ""
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR: {
            return {
                ...state,
                showMessage: true,
                message: action.payload
            };
        }
        case HIDE_ERROR: {
            return {
                ...state,
                showMessage: false,
                message: ""
            };
        }
        default:
            return state;
    }
};

export default snackbarReducer;
