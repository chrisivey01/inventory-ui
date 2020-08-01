import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";
import Apis from "../apis/apis";

const initialState = {
    inventoryShow: false,
    flattenedInventory: [],
    otherInventory: new Array(50).fill(undefined),
    selectedItemIndex: null,
    type: "personal",
    useItem: null,
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_INVENTORY:
            console.log("1");
            return {
                ...state,
                inventoryShow: true,
            };
        case types.CLOSE_INVENTORY:
            console.log("2");
            return {
                ...state,
                inventoryShow: false,
                flattenedInventory: utils.closeInventory(
                    state.flattenedInventory
                ),
            };
        case types.LOAD_PERSONAL_INVENTORY:
            console.log("3");
            return {
                ...state,
                flattenedInventory: utils.loadPersonalInventory(action.payload),
            };
        case types.UPDATE_FLATTENED_PERSONAL_INVENTORY:
            console.log("4");
            return {
                ...state,
                flattenedInventory: utils.updateFlattenedPersonalInventory(action.payload),
            };
        case types.SELECT_INVENTORY_ITEM:
            console.log("5");
            return {
                ...state,
                selectedItemIndex: action.payload,
            };
        case types.MOVE_INVENTORY_ITEM:
            console.log("6");
            return {
                ...state,
                flattenedInventory: utils.moveInventoryItem(
                    state.flattenedInventory,
                    state.selectedItemIndex,
                    action.payload
                ),
            };
        case types.USE_INVENTORY_ITEM:
            console.log("7");
            return {
                ...state,
                flattenedInventory: utils.useInventoryItem(
                    state.flattenedInventory,
                    action.payload
                ),
            };

        default:
            return state;
    }
};

export default inventoryReducer;
