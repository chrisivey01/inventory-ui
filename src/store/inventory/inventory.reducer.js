import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    secondInventory: new Array(50).fill(undefined),
    selectedItem: {},
    selectedItemIndex: null,
    usedItem: null,

    inventoryShow: false,
    inventoryType: "",
    inventory: [],

};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_INVENTORY:
            return {
                ...state,
                show: true,
                type: "Personal"
            };
        case types.CLOSE_INVENTORY:
            utils.closeInventory(state.inventory);
            return {
                ...state,
                show: false,
                type: ""
            };
        case types.LOAD_PERSONAL_INVENTORY:
            return {
                ...state,
                inventory: utils.loadPersonalInventory(
                    action.payload.inventory,
                    state.inventory
                ),
                inventoryType: action.payload.inventoryType
            };
        case types.UPDATE_FLATTENED_PERSONAL_INVENTORY:
            return {
                ...state,
                inventory: utils.updateFlattenedPersonalInventory(
                    action.payload
                ),
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItem: state.inventory[action.payload],
            };
        case types.SELECT_INVENTORY_ITEM_INDEX:
            return {
                ...state,
                selectedItemIndex: action.payload,
            };
        case types.MOVE_INVENTORY_ITEM:
            return {
                ...state,
                inventory: utils.moveInventoryItem(
                    state.inventory,
                    state.selectedItemIndex,
                    action.payload
                ),
            };
        case types.USE_INVENTORY_ITEM:
            return {
                ...state,
                usedItem: utils.useInventoryItem(
                    state.inventory,
                    action.payload
                ),
                show: !state.show,
            };
        case types.HIDE_USE_INVENTORY_ITEM:
            return {
                ...state,
                usedItem: null,
                show: false,
            };
        default:
            return state;
    }
};

export default inventoryReducer;
