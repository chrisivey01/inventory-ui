import * as types from "./inventory.actions";
import Api from "../apis/apis";

const initialState = {
    inventoryShow: false,
    inventoryData: {
        items: [],
        black_money: [{ amount: 0 }],
        weapons: [{}],
    },
    flattened: [],
    otherInventory: new Array(50).fill(undefined),
    selectedItemIndex: null,
    useItem: {},
    type: "personal",
};

const inventoryReducer = (state = initialState, action) => {
    let inventory = { ...state.inventoryData };
    let flattened = [...state.flattened];
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
            flattened = [];
            inventory.items = action.payload.inventory.filter(
                (items) => items.count > 0
            );
            inventory.items.map((item) => flattened.push(item));
            inventory.weapons = action.payload.weapons;
            inventory.weapons.map((item) => flattened.push(item));
            flattened.push(action.payload.accounts[0]);
            flattened.weight = action.payload.weight;
            flattened.money = action.payload.money;
            flattened.maxWeight = action.payload.maxWeight;
            // maxWeight: 150
            // money: 810
            // weapons: []
            // weight: 127
            // for (let key in inventory) {
            //     if(key === 'items' || key === 'weapons'){
            //         for (let item of inventory[key]) {
            //             flattened.push(item);
            //         }
            //     }
            // }
            return {
                ...state,
                flattened: flattened,
            };
        case types.SELECT_INVENTORY_ITEM:
            return {
                ...state,
                selectedItemIndex: action.payload,
            };
        case types.SWAP_POSTION_INVENTORY:
            const selectedItem =
                inventory.flattenedInventory[state.selectedItemIndex];
            //returns an array for some odd reason
            let movedTo = inventory.flattenedInventory.splice(
                action.payload,
                1,
                selectedItem
            );
            inventory.flattenedInventory.splice(
                state.selectedItemIndex,
                1,
                movedTo[0]
            );

            // Api.reloadInventory(inventorySwapper);
            return {
                ...state,
                inventoryData: inventory,
            };
        case types.USE_ITEM_SLOT_ONE:
            // inventory.flattenedInventory[action.payload].count -= 1;
            return {
                ...state,
                inventoryData: inventory,
            };
        case types.USE_ITEM_SLOT_TWO:
            // inventory.flattenedInventory[action.payload].count -= 1;
            return {
                ...state,
                inventoryData: inventory,
            };
        case types.USE_ITEM_SLOT_THREE:
            // inventory.flattenedInventory[action.payload].count -= 1;
            return {
                ...state,
                inventoryData: inventory,
            };
        case types.USE_ITEM_SLOT_FOUR:
            // inventory.flattenedInventory[action.payload].count -= 1;
            return {
                ...state,
                inventoryData: inventory,
            };
        case types.USE_ITEM_SLOT_FIVE:
            // inventory.flattenedInventory[action.payload].count -= 1;
            return {
                ...state,
                inventoryData: inventory,
            };

        default:
            return state;
    }
};

export default inventoryReducer;
