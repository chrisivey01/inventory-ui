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
export const LOAD_SECOND_INVENTORY_SORTED = "LOAD_SECOND_INVENTORY_SORTED";

export const UPDATE_WEAPON_INFO = "UPDATE_WEAPON_INFO";
export const UPDATE_ITEM_INFO = "UPDATE_ITEM_INFO";

export const LOAD_STORE_INVENTORY = "LOAD_STORE_INVENTORY";
export const BUY_STORE_ITEMS = "BUY_STORE_ITEMS";

export const TRANSFER_CONFIRMATION = "TRANSFER_CONFIRMATION";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const ADD_ITEM = "ADD_ITEM";
export const SUBTRACT_ITEM = "SUBTRACT_ITEM";

export const CONFIRMATION_HANDLER = "CONFIRMATION_HANDLER";
export const CLOSE_CONFIRMATION_HANDLER = "CLOSE_CONFIRMATION_HANDLER";
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

export const moveInventoryItem = (payload, selectedItem, selectedType) => {
    return (dispatch) => {
        dispatch({ type: MOVE_INVENTORY_ITEM, payload: payload });
        const data = {
            selectedItem: selectedItem,
            type: payload.type,
            itemType: payload.itemType,
        };
        Apis.updateInventory(data);
    };
};

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

export const loadSecondInventorySorted = (payload) => ({
    type: LOAD_SECOND_INVENTORY_SORTED,
    payload: payload,
});

export const updateWeapon = (weaponData) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_WEAPON_INFO,
            payload: weaponData,
        });
    };
};

export const updateItem = (itemData) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ITEM_INFO,
            payload: itemData,
        });
    };
};

export const loadStoreInventory = (items) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_STORE_INVENTORY,
            payload: items,
        });
    };
};

export const transferConfirmation = () => {
    return (dispatch) => {
        dispatch({
            type: TRANSFER_CONFIRMATION,
        });
    };
};

export const addItem = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_ITEM,
        });
    };
};

export const subtractItem = () => {
    return (dispatch) => {
        dispatch({
            type: SUBTRACT_ITEM,
        });
    };
};

export const updateQuantity = (value) => {
    return (dispatch) => {
        const regExp = /^[0-9\b]+$/;
        if (regExp.test(e.target.value)) {
            const value = e.target.value;
            dispatch({
                type: UPDATE_QUANTITY,
                payload: value,
            });
        }
    };
};

export const confirmationHandler = (data) => {
    return (dispatch) => {
        let sortedInventory = [...data.sortedInventory];
        const itemIndex = sortedInventory.findIndex((item) => {
            if (item !== "{}") {
                return (
                    item.name.toLowerCase() ===
                    data.selectedItem.name.toLowerCase()
                );
            }
        });
        const bracketIndex = sortedInventory.findIndex((item) => item === "{}");

        if (itemIndex > 0) {
            sortedInventory[itemIndex].price =
                sortedInventory[itemIndex].count * data.selectedItem.price;
            sortedInventory[itemIndex].count =
                sortedInventory[itemIndex].count + data.quantity;
        }

        if (bracketIndex && itemIndex < 0) {
            sortedInventory[bracketIndex] = data.selectedItem;
            sortedInventory[bracketIndex].count = data.quantity;
        }
        // const modifiedData = data.sortedInventory.map((item) => {
        //     if (item.type !== "item_weapon") {
        //         if(item.name === data.selectedItem.name){
        //             item.price = data.quantity * data.selectedItem.price;
        //             item.count = data.quantity + item.count
        //             return item
        //         } else {
        //             return item
        //         }
        //     } else {
        //         return item
        //     }
        // });
        // if(data.selectedItem.count){
        //     data.selectedItem.count = data.quantity
        //     modifiedData.splice(findBracket, 1, data.selectedItem)
        // }

        console.log(sortedInventory);
        dispatch({
            type: CONFIRMATION_HANDLER,
            payload: sortedInventory,
        });
    };
};

export const closeConfirmationHandler = (data) => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_CONFIRMATION_HANDLER,
        });
    };
};
