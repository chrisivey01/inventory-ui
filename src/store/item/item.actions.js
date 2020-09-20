export const SET_INFO = "SET_INFO"
export const CLEAR_INFO = "CLEAR_INFO"


export const setInfo = (itemInfo) => ({
    type: SET_INFO,
    payload: itemInfo
})

export const clearInfo = () => ({
    type: CLEAR_INFO,

})