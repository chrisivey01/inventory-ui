export const SET_INFO = "SET_INFO";
export const CLEAR_INFO = "CLEAR_INFO";

export const setInfo = (info, e) => {
    return (dispatch) => {
        const axis = {
            x: e.clientX,
            y: e.clientY
        }
        const data = {
            info: info,
            axis: axis
        }
        dispatch({ type: SET_INFO, payload: data });
    };
};

export const clearInfo = () => ({
    type: CLEAR_INFO,
});
