import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    selectedItem: {},
    selectedItemIndex: null,
    selectedType: null,
    usedItem: {},
    inventoryShow: false,
    inventoryType: "",
    inventory: [],
    sortedInventory: [],
    secondInventory: [],
    secondInventoryType: null,
    data: {},
    showHide: false,
    show: false,
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CLOSE_INVENTORY:
            return {
                ...state,
                showHide: false,
                type: "",
                sortedInventory: action.payload.sortedInventory,
                secondInventory: [],
                secondInventoryType: null,
            };
        case types.LOAD_UNSORTED_INVENTORY:
            return {
                ...state,
                sortedInventory: utils.loadUnsortedInventory(
                    action.payload.inventory,
                    state.inventory
                ),
                currentWeight: action.payload.inventory.weight,
                maxWeight: action.payload.inventory.maxWeight,
                inventoryType: action.payload.inventoryType,
                showHide: true,
            };
        case types.LOAD_SORTED_INVENTORY:
            return {
                ...state,
                sortedInventory: utils.loadSortedInventory(
                    action.payload.inventory,
                    action.payload.sortedInventory
                ),
                inventoryType: action.payload.inventoryType,
                showHide: true,
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItem: action.payload.item,
                selectedItemIndex: action.payload.index,
                selectedType: action.payload.type,
                selectedItemType: action.payload.itemType,
            };
        case types.MOVE_INVENTORY_ITEM:
            let inv = [...state.sortedInventory];
            let secInv = [];
            if (state.secondInventory) {
                secInv = [...state.secondInventory];
            }
            const selectedType = state.selectedType;
            const invData = action.payload;
            const selectedItemIndex = state.selectedItemIndex;
            const itemIndex = state.sortedInventory.filter(item => state.selectedItem.type === "item_weapon" && item.name === state.selectedItem.name)
            if (
                action.payload.type === "Personal" &&
                action.payload.itemType !== "Personal" &&
                state.selectedItem.type === "item_weapon" &&
                itemIndex.length > 0
            ) {
                return {
                    ...state,
                    sortedInventory: inv,
                    secondInventory: secInv,
                };
            } else if (
                selectedType === invData.type &&
                selectedType === "Personal"
            ) {
                const selectedItem = inv[selectedItemIndex];
                let movedTo = inv.splice(invData.index, 1, selectedItem);
                inv.splice(selectedItemIndex, 1, movedTo[0]);
            } else if (
                selectedType === invData.type &&
                selectedType !== "Personal"
            ) {
                const selectedItem = secInv[selectedItemIndex];
                let movedTo = secInv.splice(invData.index, 1, selectedItem);
                secInv.splice(selectedItemIndex, 1, movedTo[0]);
            } else if (
                selectedType !== invData.type &&
                selectedType === "Personal"
            ) {
                const selectedItem = inv[selectedItemIndex];
                let movedTo = secInv.splice(invData.index, 1, selectedItem);
                inv.splice(selectedItemIndex, 1, movedTo[0]);
            } else if (
                selectedType !== invData.type &&
                selectedType !== "Personal"
            ) {
                const selectedItem = secInv[selectedItemIndex];
                let movedTo = inv.splice(invData.index, 1, selectedItem);
                secInv.splice(selectedItemIndex, 1, movedTo[0]);
            }
            return {
                ...state,
                sortedInventory: inv,
                secondInventory: secInv,
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
        case types.LOAD_SECOND_INVENTORY:
            return {
                ...state,
                secondInventory: utils.loadUnsortedInventory(
                    action.payload.inventory,
                    action.payload.sortedInventory
                ),
                secondInventoryType: action.payload.inventoryType,
                data: action.payload.carData,
                showHide: true,
            };
        case types.LOAD_SECOND_INVENTORY_SORTED:
            return {
                ...state,
                secondInventory: action.payload.inventory.items,
                secondInventoryType: action.payload.inventoryType,
                data: {
                    plate: action.payload.inventory.plate,
                    weight: action.payload.inventory.weight,
                },
                showHide: true,
            };
        default:
            return state;
    }
};

export default inventoryReducer;
