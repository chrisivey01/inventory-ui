import Apis from "../../apis/apis";
export const SHOW_INVENTORY = "SHOW_INVENTORY";
export const CLOSE_INVENTORY = "CLOSE_INVENTORY";
export const LOAD_SORTED_INVENTORY = "LOAD_SORTED_INVENTORY";
export const LOAD_UNSORTED_INVENTORY = "LOAD_UNSORTED_INVENTORY";

export const SELECT_INVENTORY_ITEM = "SELECT_INVENTORY_ITEM";
export const SELECT_INVENTORY_ITEM_INDEX = "SELECT_INVENTORY_ITEM_INDEX";
export const MOVE_INVENTORY_ITEM = "MOVE_INVENTORY_ITEM";

export const USE_INVENTORY_ITEM = "USE_INVENTORY_ITEM";
export const HIDE_USE_INVENTORY_ITEM = "HIDE_USE_INVENTORY_ITEM";
export const USE_ITEM_SLOT_TWO = "USE_ITEM_SLOT_TWO";
export const USE_ITEM_SLOT_THREE = "USE_ITEM_SLOT_THREE";
export const USE_ITEM_SLOT_FOUR = "USE_ITEM_SLOT_FOUR";
export const USE_ITEM_SLOT_FIVE = "USE_ITEM_SLOT_FIVE";

export const LOAD_SECOND_INVENTORY = "LOAD_SECOND_INVENTORY";

export const closeInventory = (sortedInventory, secondInventory, carData) => {
    return (dispatch) => {
        const payload = {
            sortedInventory: sortedInventory,
            secondInventory: secondInventory,
        };
        dispatch({
            type: CLOSE_INVENTORY,
            payload: payload,
        });
        Apis.closeInventory(sortedInventory, secondInventory, carData);
    };
};

export const loadSortedInventory = (payload) => ({
    type: LOAD_SORTED_INVENTORY,
    payload: payload,
});

export const loadUnsortedInventory = (payload) => ({
    type: LOAD_UNSORTED_INVENTORY,
    payload: payload,
});

export const selectInventoryItem = (payload) => ({
    type: SELECT_INVENTORY_ITEM,
    payload: payload,
});

export const moveInventoryItem = (index) => ({
    type: MOVE_INVENTORY_ITEM,
    payload: index,
});

export const useInventoryItem = (itemIndex) => ({
    type: USE_INVENTORY_ITEM,
    payload: itemIndex,
});

export const hideUseInventoryItem = (item) => ({
    type: HIDE_USE_INVENTORY_ITEM,
    payload: item,
});

export const loadSecondInventory = (payload) => ({
    type: LOAD_SECOND_INVENTORY,
    payload: payload,
});
