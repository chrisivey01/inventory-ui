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
        other: {},
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
    quantity: 1,
    boughtItem: {},
    storeItem: {},
    usedItem: {},
    confirmation: {
        show: false,
        title: "",
        type: "",
    },
    openContextMenu: false,
    contextItem: {},
    useIndex: null,
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
                info: {
                    ...state.info,
                    personal: action.payload.info,
                },
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
                    inventory: [],
                },
                info: {
                    ...state.info,
                    other: {},
                },
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
        case types.REMOVED_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: {
                    data: {},
                    index: null,
                    type: "",
                },
            };
        case types.MOVE_INVENTORY_ITEM:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: action.payload.personalInventory.inventory,
                },
                otherInventory: {
                    ...state.otherInventory,
                    inventory: action.payload.otherInventory.inventory,
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
                personalInventory: {
                    ...state.personalInventory,
                    inventory: state.personalInventory.inventory.map((item) => {
                        if (item.count) {
                            item.count - 1;
                            return item;
                        } else if (item.count === 0) {
                            return "{}";
                        } else {
                            return item;
                        }
                    }),
                },
                info: {
                    ...state.info,
                    personal: {
                        ...state.personal,
                        weight: state.personalInventory.inventory[
                            action.payload
                        ].count
                            ? state.info.personal.weight - 1
                            : state.personalInventory.inventory[action.payload]
                                  .count,
                    },
                },
                openContextMenu: false,
                useIndex: action.payload,
            };
        case types.HIDE_USE_INVENTORY_ITEM:
            return {
                ...state,
                useIndex: null,
            };
        case types.LOAD_OTHER_INVENTORY:
            return {
                ...state,
                otherInventory: {
                    ...state.otherInventory,
                    inventory: utils.loadOtherInventory(
                        action.payload.inventory,
                        action.payload.otherInventory
                    ),
                    type: action.payload.inventoryType,
                },
                inventoryShow: true,
                info: {
                    ...state.info,
                    other: action.payload.info,
                },
            };
        case types.LOAD_OTHER_PLAYER_INVENTORY:
            return {
                ...state,
                otherInventory: {
                    inventory: utils.loadOtherPlayerInventory(
                        action.payload.inventory,
                        action.payload.otherInventory
                    ),
                    type: action.payload.inventoryType,
                },
                inventoryShow: true,
                info: {
                    ...state.info,
                    other: action.payload.info,
                },
            };
        case types.LOAD_STORE_INVENTORY:
            return {
                ...state,
                otherInventory: {
                    inventory: action.payload,
                    type: "Store",
                },
                inventoryShow: true,
            };
        case types.UPDATE_WEAPON_INFO:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: state.personalInventory.inventory.map((item) => {
                        if (item.name && item.name === action.payload.name) {
                            //if item is weapon, take the new weapon count
                            return (item = action.payload);
                        } else {
                            return item;
                        }
                    }),
                },
            };
        case types.UPDATE_ITEM_INFO:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: [...state.personalInventory.inventory].map(
                        (item) => {
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
                        }
                    ),
                },
            };
        case types.STORE_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    show: true,
                    title: "How much?",
                    type: "Store",
                },
                quantity: 1,
                boughtItem: action.payload,
                storeItem: action.payload,
            };
        case types.STORE_CONFIRMATION_HANDLER:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: action.payload.inventory,
                },
                boughtItem: {},
                quantity: 1,
                confirmation: {
                    ...state.confirmation,
                    show: false,
                    title: "",
                    type: "",
                },
            };
        case types.UPDATE_QUANTITY_STORE:
            return {
                ...state,
                quantity: action.payload.quantity,
                storeItem: action.payload.item,
            };
        case types.UPDATE_QUANTITY_CONTEXT:
            return {
                ...state,
                quantity: action.payload,
            };
        case types.ADD_ITEM_STORE:
            return {
                ...state,
                quantity: state.quantity + 1,
                storeItem: {
                    ...state.storeItem,
                    price: state.storeItem.price + state.boughtItem.price,
                },
            };
        case types.SUBTRACT_ITEM_STORE:
            return {
                ...state,
                quantity: state.quantity - 1,
                storeItem: {
                    ...state.storeItem,
                    price: state.storeItem.price - state.boughtItem.price,
                },
            };
        case types.ADD_ITEM_CONTEXT:
            return {
                ...state,
                quantity: state.quantity + 1,
            };
        case types.SUBTRACT_ITEM_CONTEXT:
            return {
                ...state,
                quantity: state.quantity !== 0 ? state.quantity - 1 : 0,
            };
        case types.OPEN_CONTEXT_MENU:
            return {
                ...state,
                openContextMenu: true,
                contextItem: action.payload,
            };
        case types.CLOSE_CONTEXT_MENU:
            return {
                ...state,
                openContextMenu: false,
            };
        case types.SHOW_SPLIT_CONFIRMATION:
            return {
                ...state,
                openContextMenu: false,
                confirmation: {
                    show: true,
                    title: "How many to split?",
                    type: "Split",
                },
                quantity: 1,
            };
        case types.CLOSE_CONFIRMATION:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    show: false,
                    title: "",
                    type: "",
                },
                quantity: 1,
            };
        case types.DROP_ITEM_HANDLER:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: action.payload.personalInventory,
                },
                info: {
                    ...state.info,
                    personal: action.payload.playerInfo,
                },
                openContextMenu: false,
            };
        case types.GIVE_ITEM_SUCCESS:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: action.payload.personalInventory,
                },
                info: {
                    ...state.info,
                    personal: action.payload.playerInfo,
                },
                openContextMenu: false,
            };
        case types.SPLIT_ITEM_HANDLER:
            return {
                ...state,
                personalInventory: {
                    ...state.personalInventory,
                    inventory: action.payload,
                },
                openContextMenu: false,
            };
        case types.SPLIT_OTHER_ITEM_HANDLER:
            return {
                ...state,
                otherInventory: {
                    ...state.otherInventory,
                    inventory: action.payload,
                },
                openContextMenu: false,
            };
        case types.USE_ITEM_HANDLER:
            return {
                ...state,
                personalInventory: action.payload,
            };
        default:
            return state;
    }
};

export default inventoryReducer;
