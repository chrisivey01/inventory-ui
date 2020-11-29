
export const LOAD_HOTBAR = "LOAD_HOTBAR";
export const CLOSE_HOTBAR = "CLOSE_HOTBAR";

export const closeHotbar = () => ({
    type: CLOSE_HOTBAR,
});

export const loadHotbar = () => ({
    type: LOAD_HOTBAR,
});
