// export const LOAD_SECOND_INVENTORY = "LOAD_SECOND_INVENTORY";
// export const SELECT_SECOND_INVENTORY_ITEM = "SELECT_SECOND_INVENTORY_ITEM";
// export const SELECT_SECOND_INVENTORY_ITEM_INDEX = "SELECT_SECOND_INVENTORY_ITEM_INDEX";
// export const MOVE_SECOND_INVENTORY_ITEM = "MOVE_SECOND_INVENTORY_ITEM";

// export const loadSecondInventory = (payload) => ({
//     type: LOAD_SECOND_INVENTORY,
//     payload: payload,
// });

// export const selectInventoryItem = (item, index) => ({
//     type: SELECT_SECOND_INVENTORY_ITEM,
//     payload: { item, index },
// });

// export const selectInventoryItemIndex = (index) => ({
//     type: SELECT_SECOND_INVENTORY_ITEM_INDEX,
//     payload: index,
// });

// export const moveInventoryItem = (index) => ({
//     type: MOVE_SECOND_INVENTORY_ITEM,
//     payload: index,
// });

export const LOAD_HOTBAR = "LOAD_HOTBAR";
export const CLOSE_HOTBAR = "CLOSE_HOTBAR";

export const closeHotbar = (payload) => ({
    type: CLOSE_HOTBAR,
});

export const loadHotbar = (payload) => ({
    type: LOAD_HOTBAR,
    payload: payload,
});
