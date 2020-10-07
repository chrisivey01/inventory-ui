import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    selectedItem: {},
    selectedItemIndex: null,

    usedItem: {},
    inventoryShow: false,
    inventoryType: "",
    inventory: [],
    sortedInventory: [],
    secondInventory: [],
    secondInventoryType: null,
    data: {},
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CLOSE_INVENTORY:
            return {
                ...state,
                show: utils.closeInventory(state.sortedInventory),
                type: "",
            };
        case types.LOAD_UNSORTED_INVENTORY:
            return {
                ...state,
                sortedInventory: utils.loadUnsortedInventory(
                    action.payload.inventory,
                    state.inventory
                ),
                inventoryType: action.payload.inventoryType,
            };
        case types.LOAD_SORTED_INVENTORY:
            return {
                ...state,
                sortedInventory: utils.loadSortedInventory(
                    action.payload.inventory,
                    action.payload.sortedInventory
                ),
                inventoryType: action.payload.inventoryType,
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItem: action.payload.item,
                selectedItemIndex: action.payload.index
            };
        case types.MOVE_INVENTORY_ITEM:
            return {
                ...state,
                sortedInventory: utils.moveInventoryItem(
                    state.sortedInventory,
                    state.secondInventory,
                    state.selectedItemIndex,
                    action.payload
                ),
            };
        case types.USE_INVENTORY_ITEM:
            return {
                ...state,
                usedItem: utils.useInventoryItem(
                    state.sortedInventory,
                    action.payload,
                    state.usedItem
                ),
                show: !state.show,
            };
        case types.HIDE_USE_INVENTORY_ITEM:
            return {
                ...state,
                show: false,
            };
        case types.LOAD_TRUNK_INVENTORY:
            return {
                ...state,
                secondInventory: utils.loadUnsortedInventory(
                    action.payload.inventory,
                    action.payload.sortedInventory
                ),
                secondInventoryType: action.payload.inventoryType,
                data: action.payload.carData,
            };
        default:
            return state;
    }
};

export default inventoryReducer;
