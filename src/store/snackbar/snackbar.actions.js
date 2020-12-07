export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const showErrorMessage = (data) => {
    return (dispatch) => {
        dispatch({
            type: SHOW_ERROR,
            payload: data
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
