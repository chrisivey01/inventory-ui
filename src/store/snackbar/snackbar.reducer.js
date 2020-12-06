import { SHOW_ERROR, HIDE_ERROR } from "./snackbar.actions";

const initialState = {
    showMessage: false,
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR: {
            return {
                ...state,
                showMessage: true,
            };
        }
        case HIDE_ERROR: {
            return {
                ...state,
                showMessage: false,
            };
        }
        default:
            return state;
    }
};

export default snackbarReducer;
