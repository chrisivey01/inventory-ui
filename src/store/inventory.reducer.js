import * as types from "./inventory.actions";

const initialState = {
    inventoryShow: false,
    inventoryData: {
        items: [],
        black_money: [{ amount: 0 }],
        weapons: [{}],
        flattenedInventory: new Array(25).fill(null),
    },
    otherInventory: new Array(50).fill(undefined),
    selectedItemIndex: null,
    useItem: {},
    type: "personal",
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_INVENTORY:
            return {
                ...state,
                inventoryShow: true,
            };
        case types.CLOSE_INVENTORY:
            return {
                ...state,
                inventoryShow: false,
            };
        case types.LOAD_PERSONAL_INVENTORY:
            let inventory = { ...state.inventoryData };

            inventory.items = action.payload.items;
            inventory.weapons = action.payload.weapons;
            inventory.black_money = action.payload.black_money;

            for (let key in inventory) {
                inventory[key].forEach((item, i) => {
                    inventory.flattenedInventory[i] = item;
                });
            }

            return {
                ...state,
                inventoryData: inventory,
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItemIndex: action.payload,
            };
        case types.SWAP_POSTION_INVENTORY:
            const inventorySwapper = { ...state.inventoryData };
            const selectedItem =
                inventorySwapper.flattenedInventory[state.selectedItemIndex];
            //returns an array for some odd reason
            let movedTo = inventorySwapper.flattenedInventory.splice(
                action.payload,
                1,
                selectedItem
            );
            inventorySwapper.flattenedInventory.splice(
                state.selectedItemIndex,
                1,
                movedTo[0]
            );
            return {
                ...state,
                inventoryData: inventorySwapper,
            };
        case types.USE_ITEM_SLOT_ONE:
            const inventoryUseOne = { ...state.inventoryData }
            let item = inventoryUseOne.flattenedInventory[action.payload]
            console.log(item)
            return {
                ...state,
                useItem: action.payload,
            };
        case types.USE_ITEM_SLOT_TWO:
            return {
                ...state,
                useItem: action.payload,
            };
        case types.USE_ITEM_SLOT_THREE:
            return {
                ...state,
                useItem: action.payload,
            };
        case types.USE_ITEM_SLOT_FOUR:
            return {
                ...state,
                useItem: action.payload,
            };
        case types.USE_ITEM_SLOT_FIVE:
            return {
                ...state,
                useItem: action.payload,
            };

        default:
            return state;
    }
};

export default inventoryReducer;
