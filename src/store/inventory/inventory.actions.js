import Apis from "../../apis/apis";
export const LOAD_INVENTORY = "LOAD_INVENTORY";
export const SHOW_INVENTORY = "SHOW_INVENTORY";
export const CLOSE_INVENTORY = "CLOSE_INVENTORY";
export const LOAD_OTHER_INVENTORY = "LOAD_OTHER_INVENTORY";

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

export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const loadInventory = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INVENTORY,
            payload: data,
        });

        dispatch(showInventory());
    };
};

export const showInventory = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_INVENTORY,
        });
    };
};

export const closeInventory = (personalInventory, otherInventory, info) => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_INVENTORY,
        });

        Apis.closeInventory({ personalInventory, otherInventory, info });
    };
};

export const loadOtherInventory = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_OTHER_INVENTORY,
            payload: data,
        });
    };
};

export const selectInventoryItem = (payload) => ({
    type: SELECT_INVENTORY_ITEM,
    payload: payload,
});

export const moveInventoryItem = (
    item,
    personalInventory,
    otherInventory,
    selectedItem,
    dropLocation,
    index,
    info
) => {
    return (dispatch) => {
        let inventories = {
            personalInventory: { ...personalInventory },
            otherInventory: { ...otherInventory },
            selectedItem: { ...selectedItem },
            info: { ...info },
            dropLocation: dropLocation,
        };

        //SWAPS BETWEEN PERSONAL INVENTORY
        if (selectedItem.type === "Personal" && dropLocation === "Personal") {
            const moveToSlot = inventories.personalInventory.inventory.splice(
                selectedItem.index,
                1,
                item
            );
            inventories.personalInventory.inventory.splice(
                index,
                1,
                moveToSlot[0]
            );
        }

        //PUTS ITEMS INTO OTHER INVENTORY
        if (selectedItem.type === "Personal" && dropLocation !== "Personal") {
            const moveToSlot = inventories.personalInventory.inventory.splice(
                selectedItem.index,
                1,
                item
            );
            inventories.otherInventory.inventory.splice(
                index,
                1,
                moveToSlot[0]
            );
        }

        //SWAPS BETWEEN OTHER INVENTORY
        if (selectedItem.type !== "Personal" && dropLocation !== "Personal") {
            const moveToSlot = inventories.otherInventory.inventory.splice(
                selectedItem.index,
                1,
                item
            );
            inventories.otherInventory.inventory.splice(
                index,
                1,
                moveToSlot[0]
            );
        }

        //GETS ITEM FROM OTHER INVENTORY
        if (selectedItem.type !== "Personal" && dropLocation === "Personal") {
            const moveToSlot = inventories.otherInventory.inventory.splice(
                selectedItem.index,
                1,
                item
            );
            inventories.personalInventory.inventory.splice(
                index,
                1,
                moveToSlot[0]
            );
        }

        Apis.updateInventory(inventories);
        dispatch({ type: MOVE_INVENTORY_ITEM, payload: inventories });
    };
};

export const useInventoryItem = (itemIndex) => ({
    type: USE_INVENTORY_ITEM,
    payload: itemIndex,
});

export const hideUseInventoryItem = () => ({
    type: HIDE_USE_INVENTORY_ITEM,
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

export const transferConfirmation = (selectedItem) => {
    return (dispatch) => {
        dispatch({
            type: TRANSFER_CONFIRMATION,
            payload: selectedItem,
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

export const subtractItem = (sortedInventory, boughtItem, selectedItem) => {
    return (dispatch) => {
        // const moneyIndex = sortedInventory.findIndex(
        //     (item) => item.name === "money"
        // );
        //once it goes negative, the name is removed
        // if(boughtItem.name === undefined){
        //     boughtItem.name = selectedItem.name
        // }
        // if (sortedInventory[moneyIndex].money - boughtItem.price >= 0) {
        dispatch({
            type: SUBTRACT_ITEM,
        });
        // }
    };
};

export const updateQuantity = (value) => {
    return (dispatch) => {
        const regExp = /^[0-9\b]+$/;
        if (regExp.test(parseInt(value)) || value === "") {
            dispatch({
                type: UPDATE_QUANTITY,
                payload: value,
            });
        }
    };
};

export const confirmationHandler = (
    personalInventory,
    otherInventory,
    selectedItem,
    quantity,
    info,
    boughtItem
) => {
    return (dispatch) => {
        let inventory = [...personalInventory.inventory];
        const itemIndex = inventory.findIndex((item) => {
            if (item !== "{}") {
                return (
                    item.name.toLowerCase() ===
                    selectedItem.data.name.toLowerCase()
                );
            }
        });
        const bracketIndex = inventory.findIndex((item) => item === "{}");
        const moneyIndex = inventory.findIndex((item) => item.name === "money");

        if (itemIndex > 0) {
            inventory[itemIndex].price =
                inventory[itemIndex].count * selectedItem.data.price;
            inventory[itemIndex].count = inventory[itemIndex].count + quantity;
            inventory[itemIndex].type = "item_standard";
        }
        inventory[moneyIndex].money =
            inventory[moneyIndex].money - selectedItem.data.price * quantity;

        if (bracketIndex && itemIndex < 0) {
            inventory[bracketIndex] = {};
            inventory[bracketIndex].name = selectedItem.data.name;
            inventory[bracketIndex].count = quantity;
            inventory[bracketIndex].type = "item_standard";
        }


        if (otherInventory.type === "Store") {
            selectedItem.data.type = "item_standard";
        }
        const updated = {
            inventory,
            otherInventory,
            selectedItem,
            quantity,
            info,
            boughtItem,
        };
        Apis.buyItem(updated);
        dispatch({
            type: CONFIRMATION_HANDLER,
            payload: updated,
        });
    };
};

export const openMenu = (data) => {
    return (dispatch) => {
        dispatch({ type: OPEN_MENU, payload: data });
    };
};

export const closeMenu = (data) => {
    return (dispatch) => {
        dispatch({ type: CLOSE_MENU });
    };
};
