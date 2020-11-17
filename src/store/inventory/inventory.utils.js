import Apis from "../../apis/apis";

let pastWeaponForSwaps;

export const loadUnsortedInventory = (currentInventory) => {
    let inventory = {};
    inventory.items = currentInventory.inventory.items.filter((item) => item.count > 0);

    let weapons;
    inventory.items.forEach((item) => {
        item.type = "item_standard";
    });
    if (currentInventory.inventory.weapons) {
        weapons = currentInventory.inventory.weapons;
        weapons.map((item) => {
            item.type = "item_weapon";
            inventory.items.push(item);
        });
    }
    // currentInventory.items.forEach((item) => inventory.items.push(item));
    if (currentInventory.inventory.accounts) {
        currentInventory.inventory.accounts.forEach((item) => {
            item.type = "item_account";

            if (
                (item.name === "money" && item.money > 0) ||
                (item.name === "black_money" && item.money > 0)
            ) {
                inventory.items.push(item);
            }
        });
    }
    inventory.weight = currentInventory.inventory.weight;
    inventory.money = currentInventory.inventory.money;
    inventory.maxWeight = currentInventory.inventory.maxWeight;

    while (inventory.items.length < 50) {
        inventory.items.push("{}");
    }

    return inventory.items;
};

export const loadSortedInventory = (inventory, currentInventory) => {
    let items = inventory.items.filter((item) => item.count > 0);
    let weapons = inventory.weapons;
    let array = [];
    weapons.forEach((item) => {
        item.type = "item_weapon";
        array.push(item);
    });
    items.forEach((item) => {
        item.type = "item_standard";
        array.push(item);
    });
    inventory.accounts.forEach((item) => {
        if (
            (item.name === "money" && item.money > 0) ||
            (item.name === "black_money" && item.money > 0)
        ) {
            item.type = "item_account";
            array.push(item);
        }
    });
    array.map((item) => {
        const invIndex = currentInventory.findIndex(
            (inventory) => inventory.name === item.name
        );
        const space = currentInventory.findIndex((item) => item === "{}");

        if (invIndex > -1) {
            currentInventory[invIndex] = item;
        } else {
            currentInventory[space] = item;
        }
    });

    currentInventory.map((newItem, index) => {
        const inInventory = array.findIndex(
            (inventory) => inventory.name === newItem.name
        );
        if (inInventory === -1) {
            currentInventory[index] = "{}";
        }
    });

    return currentInventory;
};

export const useInventoryItem = (
    flattenedInventory,
    itemIndex,
    previousItem
) => {
    Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);

    if (flattenedInventory[itemIndex].type === "item_standard") {
        flattenedInventory[itemIndex].count -= 1
        if(flattenedInventory[itemIndex].count === 0){
            flattenedInventory[itemIndex] = '{}'
        } else {
            flattenedInventory[itemIndex]
        }
       return flattenedInventory[itemIndex]
    }

    let item = flattenedInventory[itemIndex];

    if (
        previousItem &&
        previousItem.type === "item_weapon" &&
        flattenedInventory[itemIndex] !== previousItem
    ) {
        item.unequip = false;
        return item;
    }

    switch (flattenedInventory[itemIndex].type) {
        case "item_standard":
            return item;
        case "item_weapon":
            if (previousItem.type === "item_standard") {
                item.unequip = false;
                return item;
                break;
            } else if (item.unequip === undefined || item.unequip) {
                item.unequip = false;
                return item;
                break;
            } else if (item.unequip === false) {
                item.unequip = true;
                return item;
                break;
            }
        default:
            return;
    }
};

export const loadHotbar = (inventory) => {
    let inventoryClone = [...inventory];
    let hotbar = inventoryClone.splice(0, 5);
    return [...hotbar];
};
