export const SET_INFO = "SET_INFO";
export const CLEAR_INFO = "CLEAR_INFO";

export const setInfo = (payload) => ({
    type: SET_INFO,
    payload: payload,
});

export const clearInfo = () => ({
    type: CLEAR_INFO,
});
