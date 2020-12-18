import {SHOW_PAUSE, REMOVE_PAUSE} from './pause.actions';

const initialState = {
    show: false
}

const pauseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PAUSE:
            return {
                ...state,
                show: true
            };
        case REMOVE_PAUSE:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
}

export default pauseReducer;