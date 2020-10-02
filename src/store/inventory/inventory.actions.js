export const SHOW_INVENTORY = "SHOW_INVENTORY";
export const CLOSE_INVENTORY = "CLOSE_INVENTORY";
export const LOAD_PERSONAL_INVENTORY = "LOAD_PERSONAL_INVENTORY";

export const LOAD_HOTBAR = "LOAD_HOTBAR";
export const CLOSE_HOTBAR = "CLOSE_HOTBAR";

export const UPDATE_FLATTENED_PERSONAL_INVENTORY =
    "UPDATE_FLATTENED_PERSONAL_INVENTORY";
export const SWAP_POSTION_INVENTORY = "SWAP_POSTION_INVENTORY";
export const SELECT_INVENTORY_ITEM = "SELECT_INVENTORY_ITEM";
export const SELECT_INVENTORY_ITEM_INDEX = "SELECT_INVENTORY_ITEM_INDEX";
export const MOVE_INVENTORY_ITEM = "MOVE_INVENTORY_ITEM";

export const USE_INVENTORY_ITEM = "USE_INVENTORY_ITEM";
export const HIDE_USE_INVENTORY_ITEM = "HIDE_USE_INVENTORY_ITEM";
export const USE_ITEM_SLOT_TWO = "USE_ITEM_SLOT_TWO";
export const USE_ITEM_SLOT_THREE = "USE_ITEM_SLOT_THREE";
export const USE_ITEM_SLOT_FOUR = "USE_ITEM_SLOT_FOUR";
export const USE_ITEM_SLOT_FIVE = "USE_ITEM_SLOT_FIVE";

export const showInventory = () => ({
    type: SHOW_INVENTORY,
});

export const closeInventory = () => ({
    type: CLOSE_INVENTORY,
});

export const loadPersonalInventory = (payload) => ({
    type: LOAD_PERSONAL_INVENTORY,
    payload: payload,
});

export const closeHotbar = (payload) => ({
    type: CLOSE_HOTBAR,
});

export const loadHotbar = (payload) => ({
    type: LOAD_HOTBAR,
    payload: payload,
});

export const updateFlattenedPersonalInventory = (inventory) => ({
    type: UPDATE_FLATTENED_PERSONAL_INVENTORY,
    payload: inventory,
});

export const selectInventoryItem = (item, index) => ({
    type: SELECT_INVENTORY_ITEM,
    payload: { item, index },
});

export const selectInventoryItemIndex = (index) => ({
    type: SELECT_INVENTORY_ITEM_INDEX,
    payload: index,
});

export const moveInventoryItem = (index) => ({
    type: MOVE_INVENTORY_ITEM,
    payload: index,
});

export const swapPositionsInventory = (item) => ({
    type: SWAP_POSTION_INVENTORY,
    payload: item,
});

export const useInventoryItem = (itemIndex) => ({
    type: USE_INVENTORY_ITEM,
    payload: itemIndex,
});

export const hideUseInventoryItem = (item) => ({
    type: HIDE_USE_INVENTORY_ITEM,
    payload: item,
});
