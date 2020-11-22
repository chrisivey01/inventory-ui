import * as types from "./inventory.actions";
import * as utils from "./inventory.utils";

const initialState = {
    personalInventory: {
        type: "Personal",
        inventory: [],
        unsorted: [],
    },
    info: {
        personal: {},
        car: {}
    },
    otherInventory: {
        type: "",
        inventory: [],
    },
    inventoryShow: false,
    selectedItem: {
        data: {},
        index: null,
        type: "",
    },
    selectedItemIndex: null,
    selectedType: null,
    usedItem: {},
    showConfirmation: false,
    // quantity: 1,
    // boughtItem: {},
    // secondInventory: [],
    // secondInventoryType: null,
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_INVENTORY:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: utils.loadInventory(
                        action.payload.inventory,
                        action.payload.playerInventory,
                        action.payload.otherInventory
                    ),
                    unsorted: action.payload.inventory,
                },
                info:{
                    ...state.info,
                    personal: action.payload.info
                } 
            };
        case types.SHOW_INVENTORY:
            return {
                ...state,
                inventoryShow: true,
            };
        case types.CLOSE_INVENTORY:
            return {
                ...state,
                inventoryShow: false,
                otherInventory: {
                    ...state.otherInventory,
                    type: "",
                    inventory: []
                }
            };

        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItem: {
                    data: action.payload.item,
                    index: action.payload.index,
                    type: action.payload.type,
                },
            };
        case types.MOVE_INVENTORY_ITEM:
            let inv = [...state.personalInventory.inventory];
            let secInv = [...state.otherInventory.inventory];

            const itemSelected = state.selectedItem;
            const itemDrop = action.payload;

            //SWAPS BETWEEN PERSONAL INVENTORY
            if(itemSelected.type === "Personal" && itemDrop.type === "Personal"){
                const moveToSlot = inv.splice(itemSelected.index, 1, itemDrop.item)
                inv.splice(itemDrop.index, 1, moveToSlot[0])
            }

            //PUTS ITEMS INTO OTHER INVENTORY
            if(itemSelected.type === "Personal" && itemDrop.type !== "Personal"){
                const moveToSlot = inv.splice(itemSelected.index, 1, itemDrop.item)
                secInv.splice(itemDrop.index, 1, moveToSlot[0])
            }

            //SWAPS BETWEEN OTHER INVENTORY
            if(itemSelected.type !== "Personal" && itemDrop.type !== "Personal"){
                const moveToSlot = secInv.splice(itemSelected.index, 1, itemDrop.item)
                secInv.splice(itemDrop.index, 1, moveToSlot[0])
            }

            //GETS ITEM FROM OTHER INVENTORY
            if(itemSelected.type !== "Personal" && itemDrop.type === "Personal"){
                const moveToSlot = secInv.splice(itemSelected.index, 1, itemDrop.item)
                inv.splice(itemDrop.index, 1, moveToSlot[0])
            }

            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: inv,
                },
                otherInventory: {
                    ...state.otherInventory,
                    inventory: secInv,
                },
            };

        case types.USE_INVENTORY_ITEM:
            return {
                ...state,
                usedItem: utils.useInventoryItem(
                    state.personalInventory.inventory,
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
        case types.LOAD_OTHER_INVENTORY:
            return {
                ...state,
                otherInventory: {
                    inventory: utils.loadOtherInventory(
                        action.payload.inventory,
                        action.payload.otherInventory
                    ),
                    type: action.payload.inventoryType,
                },
                inventoryShow: true,
                info:{
                    ...state.info,
                    car: action.payload.info,
                } 
            };
        case types.LOAD_STORE_INVENTORY:
            return {
                ...state,
                otherInventory: {
                    inventory: action.payload,
                    type: "Store"
                },
                inventoryShow: true,
            };
        case types.UPDATE_WEAPON_INFO:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: state.sortedInventory.map((item) => {
                        if (item.name && item.name === action.payload.name) {
                            //if item is weapon, take the new weapon count
                            return (item = action.payload);
                        } else {
                            return item;
                        }
                    }),
                }
            };
        case types.UPDATE_ITEM_INFO:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: state.personalInventory.inventory.map((item) => {
                        if (
                            item.name &&
                            item.name === action.payload.name &&
                            item.count > 0
                        ) {
                            //if item take the new item count
                            item.count = item.count - 1;
                            if (item.count > 0) {
                                return item;
                            } else {
                                item = "{}";
                                return item;
                            }
                        } else {
                            return item;
                        }
                    }),
                }
            };

        case types.TRANSFER_CONFIRMATION:
            return {
                ...state,
                showConfirmation: true,
            };
        case types.UPDATE_QUANTITY:
            return {
                ...state,
                quantity: action.payload,
            };
        case types.ADD_ITEM:
            return {
                ...state,
                quantity: (state.quantity += 1),
                boughtItem: {
                    price: state.boughtItem.price + state.selectedItem.price,
                },
            };
        case types.SUBTRACT_ITEM:
            return {
                ...state,
                quantity: state.quantity !== 0 ? (state.quantity -= 1) : 0,
                boughtItem: {
                    price:
                        state.boughtItem.price !== 0
                            ? state.boughtItem.price - state.selectedItem.price
                            : 0,
                },
            };
        case types.CONFIRMATION_HANDLER:
            return {
                ...state,
                showConfirmation: false,
                sortedInventory: action.payload,
                quantity: 1,
            };
        case types.CLOSE_CONFIRMATION_HANDLER:
            return {
                ...state,
                showConfirmation: false,
                quantity: 1,
            };
        default:
            return state;
    }
};

export default inventoryReducer;
