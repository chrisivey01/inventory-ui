import Apis from "../../apis/apis";

let pastWeaponForSwaps;

export const loadUnsortedInventory = (currentInventory) => {
    let inventory = {};
    inventory.items = currentInventory.items.filter((item) => item.count > 0);

    let weapons;
    if (currentInventory.weapons) {
        weapons = currentInventory.weapons;
        weapons.map((item) => inventory.items.push(item));
    }
    // currentInventory.items.forEach((item) => inventory.items.push(item));
    if (currentInventory.accounts) {
        currentInventory.accounts.forEach((item) => {
            if (
                (item.name === "money" && item.money > 0) ||
                (item.name === "black_money" && item.money > 0)
            ) {
                inventory.items.push(item);
            }
        });
    }
    inventory.weight = currentInventory.weight;
    inventory.money = currentInventory.money;
    inventory.maxWeight = currentInventory.maxWeight;

    while (inventory.items.length < 50) {
        inventory.items.push("{}");
    }
    return inventory.items;
};

export const loadSortedInventory = (inventory, currentInventory) => {
    let items = inventory.items.filter((item) => item.count > 0);
    let weapons = inventory.weapons;
    let array = [];
    weapons.forEach((item) => array.push(item));
    items.forEach((item) => array.push(item));
    inventory.accounts.forEach((item) => {
        if (
            (item.name === "money" && item.money > 0) ||
            (item.name === "black_money" && item.money > 0)
        ) {
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

export const moveInventoryItem = (
    origInventory,
    secondInventory,
    firstItemIndex,
    secondItemIndex
) => {
    let inventory = [...origInventory]
    const selectedItem = inventory[firstItemIndex];
    let movedTo = inventory.splice(secondItemIndex, 1, selectedItem);
    inventory.splice(firstItemIndex, 1, movedTo[0]);
    return inventory;
};

export const useInventoryItem = (flattenedInventory, itemIndex, item) => {
    Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);
    if (flattenedInventory[itemIndex] !== undefined) {
        if (flattenedInventory[itemIndex].ammo !== undefined) {
            if (
                flattenedInventory[itemIndex].name === item.name &&
                item.unequip === true
            ) {
                return { ...flattenedInventory[itemIndex], unequip: false };
            } else if (
                flattenedInventory[itemIndex].name === item.name &&
                item.unequip === false
            ) {
                return { ...flattenedInventory[itemIndex], unequip: true };
            } else if (
                flattenedInventory[itemIndex].name !== item.name &&
                item.unequip === true &&
                item.count === undefined
            ) {
                pastWeaponForSwaps = flattenedInventory[itemIndex];
                return { ...flattenedInventory[itemIndex], unequip: false };
            } else if (
                pastWeaponForSwaps &&
                flattenedInventory[itemIndex].name !== pastWeaponForSwaps.name
            ) {
                return { ...flattenedInventory[itemIndex], unequip: false };
            } else if (
                flattenedInventory[itemIndex].name !== item.name &&
                item.unequip === true &&
                item.count
            ) {
                return { ...flattenedInventory[itemIndex], unequip: true };
            } else if (
                flattenedInventory[itemIndex].name !== item.name &&
                item.unequip === false
            ) {
                return { ...flattenedInventory[itemIndex], unequip: false };
            } else if (item === undefined) {
                return { ...flattenedInventory[itemIndex], unequip: true };
            } else if (item[0] === "{" && item[1] === "}") {
                return { ...flattenedInventory[itemIndex], unequip: true };
            }
            return { ...flattenedInventory[itemIndex], unequip: false };
        }
        if (item.ammo) {
            pastWeaponForSwaps = item;
        }
        return { ...flattenedInventory[itemIndex], unequip: true };
    }
};

export const loadHotbar = (inventory) => {
    let inventoryClone = [...inventory];
    let hotbar = inventoryClone.splice(0, 5);
    return [...hotbar];
};
