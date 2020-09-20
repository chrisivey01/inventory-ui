import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";
import Apis from "../apis/apis";

const initialState = {
    inventoryShow: false,
    inventory: [],
    secondInventory: new Array(50).fill(undefined),
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
            utils.closeInventory(state.inventory)
            return {
                ...state,
                inventoryShow: false,
            };
        case types.LOAD_PERSONAL_INVENTORY:
            console.log("3");
            return {
                ...state,
                inventory: utils.loadPersonalInventory(action.payload, state.inventory),
            };
        case types.UPDATE_FLATTENED_PERSONAL_INVENTORY:
            console.log("4");
            return {
                ...state,
                inventory: utils.updateFlattenedPersonalInventory(
                    action.payload
                ),
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
                inventory: utils.moveInventoryItem(
                    state.inventory,
                    state.selectedItemIndex,
                    action.payload
                ),
            };
        case types.USE_INVENTORY_ITEM:
            console.log("7");
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
