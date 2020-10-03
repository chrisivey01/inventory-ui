import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    secondInventory: new Array(50).fill(undefined),
    selectedItem: {},
    selectedItemIndex: null,

    usedItem: {},
    inventoryShow: false,
    inventoryType: "",
    inventory: [],
    sortedInventory: [],

    hotbar: [],
    showHotbar: false,
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
                    action.payload.sortedInventory,
                ),
                inventoryType: action.payload.inventoryType,
            };
        case types.LOAD_HOTBAR:
            return {
                ...state,
                sortedInventory: utils.loadPersonalInventory(
                    action.payload.inventory,
                    state.sortedInventory
                ),
                hotbar: utils.loadHotbar(state.sortedInventory),
                showHotbar: true,
            };
        case types.CLOSE_HOTBAR:
            return {
                ...state,
                showHotbar: false,
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItem: state.sortedInventory[action.payload],
            };
        case types.SELECT_INVENTORY_ITEM_INDEX:
            return {
                ...state,
                selectedItemIndex: action.payload,
            };
        case types.MOVE_INVENTORY_ITEM:
            return {
                ...state,
                sortedInventory: utils.moveInventoryItem(
                    state.sortedInventory,
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
        default:
            return state;
    }
};

export default inventoryReducer;
