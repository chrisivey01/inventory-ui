import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    inventoryShow: false,
    inventory: [],
    secondInventory: new Array(50).fill(undefined),
    selectedItem: {},
    selectedItemIndex: null,
    type: "personal",
    useItem: null,
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_INVENTORY:
            return {
                ...state,
                inventoryShow: true,
            };
        case types.CLOSE_INVENTORY:
            utils.closeInventory(state.inventory);
            return {
                ...state,
                inventoryShow: false,
            };
        case types.LOAD_PERSONAL_INVENTORY:
            return {
                ...state,
                inventory: utils.loadPersonalInventory(
                    action.payload,
                    state.inventory
                ),
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
                inventory: utils.useInventoryItem(
                    state.inventory,
                    action.payload
                ),
            };
        default:
            return state;
    }
};

export default inventoryReducer;
