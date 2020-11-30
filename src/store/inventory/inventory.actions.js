import Apis from "../../apis/apis";
export const LOAD_INVENTORY = "LOAD_INVENTORY";
export const SHOW_INVENTORY = "SHOW_INVENTORY";
export const CLOSE_INVENTORY = "CLOSE_INVENTORY";
export const LOAD_OTHER_INVENTORY = "LOAD_OTHER_INVENTORY";
export const LOAD_OTHER_PLAYER_INVENTORY = "LOAD_OTHER_PLAYER_INVENTORY";

export const SELECT_INVENTORY_ITEM = "SELECT_INVENTORY_ITEM";
export const SELECT_INVENTORY_ITEM_INDEX = "SELECT_INVENTORY_ITEM_INDEX";
export const MOVE_INVENTORY_ITEM = "MOVE_INVENTORY_ITEM";
export const USE_ITEM_HANDLER = "USE_ITEM_HANDLER";
export const USE_INVENTORY_ITEM = "USE_INVENTORY_ITEM";
export const HIDE_USE_INVENTORY_ITEM = "HIDE_USE_INVENTORY_ITEM";
export const USE_ITEM_SLOT_TWO = "USE_ITEM_SLOT_TWO";
export const USE_ITEM_SLOT_THREE = "USE_ITEM_SLOT_THREE";
export const USE_ITEM_SLOT_FOUR = "USE_ITEM_SLOT_FOUR";
export const USE_ITEM_SLOT_FIVE = "USE_ITEM_SLOT_FIVE";

export const UPDATE_WEAPON_INFO = "UPDATE_WEAPON_INFO";
export const UPDATE_ITEM_INFO = "UPDATE_ITEM_INFO";

export const LOAD_STORE_INVENTORY = "LOAD_STORE_INVENTORY";
export const BUY_STORE_ITEMS = "BUY_STORE_ITEMS";

// Belongs to Confirmation Box
export const CLOSE_CONFIRMATION = "CLOSE_CONFIRMATION";
export const DROP_ITEM_CONFIRMATION = "DROP_ITEM_CONFIRMATION";
export const GIVE_ITEM_CONFIRMATION = "GIVE_ITEM_CONFIRMATION";
export const SPLIT_ITEM_CONFIRMATION = "SPLIT_ITEM_CONFIRMATION";
export const STORE_CONFIRMATION = "STORE_CONFIRMATION";
export const UPDATE_QUANTITY_STORE = "UPDATE_QUANTITY_STORE";
export const ADD_ITEM_STORE = "ADD_ITEM_STORE";
export const SUBTRACT_ITEM_STORE = "SUBTRACT_ITEM_STORE";
export const UPDATE_QUANTITY_CONTEXT = "UPDATE_QUANTITY_CONTEXT";
export const ADD_ITEM_CONTEXT = "ADD_ITEM_CONTEXT";
export const SUBTRACT_ITEM_CONTEXT = "SUBTRACT_ITEM_CONTEXT";

export const STORE_CONFIRMATION_HANDLER = "STORE_CONFIRMATION_HANDLER";
export const SHOW_DROP_CONFIRMATION = "SHOW_DROP_CONFIRMATION";
export const SHOW_GIVE_CONFIRMATION = "SHOW_GIVE_CONFIRMATION";
export const SHOW_SPLIT_CONFIRMATION = "SHOW_SPLIT_CONFIRMATION";

export const OPEN_CONTEXT_MENU = "OPEN_CONTEXT_MENU";
export const CLOSE_CONTEXT_MENU = "CLOSE_CONTEXT_MENU";

export const DROP_ITEM_HANDLER = "DROP_ITEM_HANDLER";
export const GIVE_ITEM_HANDLER = "GIVE_ITEM_HANDLER";
export const GIVE_ITEM_SUCCESS = "GIVE_ITEM_SUCCESS";
export const SPLIT_ITEM_HANDLER = "SPLIT_ITEM_HANDLER";

export const loadInventory = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INVENTORY,
            payload: data,
        });

        dispatch(showInventory());
    };
};

export const updateInventory = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INVENTORY,
            payload: data,
        });
    };
};

export const showInventory = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_INVENTORY,
        });
    };
};

export const closeInventory = (
    personalInventory,
    otherInventory,
    info,
    inventoryType
) => {
    return async (dispatch) => {
        await Apis.closeInventory({
            personalInventory,
            otherInventory,
            info,
            inventoryType,
        }).then((res) => {
            if (res.data === "true") {
                dispatch({
                    type: CLOSE_INVENTORY,
                });
            }
        });
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

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

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
            //this is for item splits, and recombinding stacks, this makes it to where you cant stack a stack on a stack[dupe]
            if (
                selectedItem.data.name ===
                    personalInventory.inventory[index].name &&
                selectedItem.index !== index
            ) {
                let moveToSlot = inventories.personalInventory.inventory.splice(
                    selectedItem.index,
                    1,
                    "{}"
                );
                moveToSlot[0].count += item.count;
                inventories.personalInventory.inventory.splice(
                    index,
                    1,
                    moveToSlot[0]
                );
            } else {
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
        }

        //PUTS ITEMS INTO OTHER INVENTORY
        if (selectedItem.type === "Personal" && dropLocation !== "Personal") {
            if (inventories.otherInventory.inventory[index] === "{}") {
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
            } else {
                return;
            }
        }

        //SWAPS BETWEEN PERSONAL AND PLAYER TO PREVENT DUPING, THIS NEEDS TO REMAIN BEFORE OTHERS
        if (selectedItem.type === "Player" && dropLocation === "Player") {
            return;
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
            if (inventories.personalInventory.inventory[index] === "{}") {
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
            } else {
                return;
            }
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

export const closeConfirmation = () => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_CONFIRMATION,
        });
    };
};

export const storeConfirmation = (selectedItem) => {
    return (dispatch) => {
        dispatch({
            type: STORE_CONFIRMATION,
            payload: selectedItem,
        });
    };
};

export const addItemStore = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_ITEM_STORE,
        });
    };
};

export const subtractItemStore = () => {
    return (dispatch) => {
        dispatch({
            type: SUBTRACT_ITEM_STORE,
        });
    };
};

export const updateQuantityStore = (value) => {
    return (dispatch) => {
        const regExp = /^[0-9\b]+$/;
        if (regExp.test(parseInt(value)) || value === "") {
            dispatch({
                type: UPDATE_QUANTITY_STORE,
                payload: value,
            });
        }
    };
};

export const addItemContext = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_ITEM_CONTEXT,
        });
    };
};

export const subtractItemContext = () => {
    return (dispatch) => {
        dispatch({
            type: SUBTRACT_ITEM_CONTEXT,
        });
    };
};

export const updateQuantityContext = (value) => {
    return (dispatch) => {
        const regExp = /^[0-9\b]+$/;
        if (regExp.test(parseInt(value)) || value === "") {
            dispatch({
                type: UPDATE_QUANTITY_CONTEXT,
                payload: value,
            });
        }
    };
};

export const storeConfirmationHandler = (
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
            type: STORE_CONFIRMATION_HANDLER,
            payload: updated,
        });
    };
};

export const openContextMenu = (data) => {
    return (dispatch) => {
        dispatch({ type: OPEN_CONTEXT_MENU, payload: data });
    };
};

export const closeContextMenu = () => {
    return (dispatch) => {
        dispatch({ type: CLOSE_CONTEXT_MENU });
    };
};

//re-render the inventory to display where the inventory's current state

export const showDropConfirmation = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_DROP_CONFIRMATION,
        });
    };
};

export const showGiveConfirmation = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_GIVE_CONFIRMATION,
        });
    };
};

export const showSplitConfirmation = () => {
    return (dispatch) => {
        dispatch({
            type: SHOW_SPLIT_CONFIRMATION,
        });
    };
};

export const useItemHandler = (contextItem, personalInventory) => {
    return (dispatch) => {
		contextItem.item.count = --contextItem.item.count;
        personalInventory[contextItem.index] = contextItem.item;
        dispatch({ type: USE_ITEM_HANDLER, payload: personalInventory });
        Apis.useItem(contextItem);
    };
};

export const dropItemHandler = (contextItem, personalInventory) => {
    return (dispatch) => {
        personalInventory[contextItem.index] = "{}";
        dispatch({ type: DROP_ITEM_HANDLER, payload: personalInventory });
        Apis.dropItem(contextItem);
    };
};

export const giveItemSuccess = (contextItem, personalInventory) => {
    return (dispatch) => {
        personalInventory[contextItem.index] = "{}";
        dispatch({ type: GIVE_ITEM_SUCCESS, payload: personalInventory });
    };
};

export const giveItemFailure = () => {};

export const giveItemHandler = (contextItem, personalInventory) => {
    return (dispatch) => {
        Apis.givePlayerItem(contextItem)
            .then((res) => {
                if (res.data === "true") {
                    dispatch(giveItemSuccess(contextItem, personalInventory));
                } else {
                    console.log("Error");
                }
            })
            .catch((error) => console.log(error));
    };
};
// { item, quantity, personalInventory }
export const splitItemHandler = (data) => {
    return (dispatch) => {
        if (data.item.type !== "item_weapon") {
            let splitItem = { ...data.item };
            splitItem.count = data.quantity;
            data.item.count = data.item.count - data.quantity;

            const newLocation = data.personalInventory.inventory.findIndex(
                (item) => item === "{}"
            );
            if (newLocation !== -1) {
                data.personalInventory.inventory[newLocation] = splitItem;
                dispatch({
                    type: SPLIT_ITEM_HANDLER,
                    payload: data.personalInventory.inventory,
                });
            }
        }
        dispatch(closeConfirmation());
    };
};

export const loadOtherPlayerInventory = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_OTHER_PLAYER_INVENTORY,
            payload: data,
        });
    };
};
