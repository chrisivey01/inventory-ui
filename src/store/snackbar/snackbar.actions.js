export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const showErrorMessage = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_ERROR,
        });
    };
};

export const hideErrorMessage = () => {
    return (dispatch) => {
        dispatch({
            type: HIDE_ERROR,
        });
    };
};
