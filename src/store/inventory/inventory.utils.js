import Apis from "../../apis/inventory-apis";
import { weaponReset } from "../../helpers/weapons";
import { itemType, weaponType, accountType } from "../../helpers/types";

function getAllIndexes(arr, val) {
    var indexes = [],
        i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].name === val.name) indexes.push(i);
    return indexes;
}

export const loadInventory = (inventory, playerInventory) => {
    //convert
    if (playerInventory.length === 0) {
        playerInventory.unsorted = inventory.items.filter(
            (item) => item.count > 0
        );

        let weapons;
        playerInventory.unsorted.forEach((item) => {
            item.type = "item_standard";
        });
        if (inventory.weapons) {
            weapons = inventory.weapons;
            weapons.map((item) => {
                item.type = "item_weapon";
                item.name = item.name.toUpperCase();
                const weap = weaponReset(item);
                playerInventory.unsorted.push(weap);
            });
        }
        // currentInventory.items.forEach((item) => inventory.items.push(item));
        if (inventory.accounts) {
            inventory.accounts.forEach((item) => {
                item.type = "item_account";

                if (
                    (item.name === "money" && item.money > 0) ||
                    (item.name === "black_money" && item.money > 0)
                ) {
                    playerInventory.unsorted.push(item);
                }
            });
        }

        while (playerInventory.unsorted.length < 50) {
            playerInventory.unsorted.push("{}");
        }

        return playerInventory.unsorted;
    } else {
        let playerInv = [...playerInventory];
        let items = inventory.items.filter((item) => item.count > 0);
        let weapons = inventory.weapons;
        let array = [];
        weapons.forEach((item) => {
            item.type = "item_weapon";
            item.name = item.name.toUpperCase();
            const weap = weaponReset(item);
            array.push(weap);
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
            const invIndex = playerInv.findIndex(
                (inventory) => inventory.name === item.name
            );
            const indexMap = getAllIndexes(playerInv, item);
            const space = playerInv.findIndex((item) => item === "{}");

            let count = 0;
            if (invIndex > -1) {
                count = 0;
                indexMap.forEach((index) => {
                    if (playerInv[index].count && indexMap.length > 1) {
                        count = playerInv[index].count + count;
                    } else if(playerInv[index].money && indexMap.length > 1) {
                        count = playerInv[index].money + count;
                    } else {
                        count = playerInv[index];
                    }
                });
                if (item.count >= count || item.money >= count) {
                    indexMap.forEach((i) => {
                        if (playerInv[i].count === count) {
                            return playerInv[invIndex];
                        }

                        if(playerInv[i].money === count){
                            return playerInv[invIndex]
                        }
                    });
                } else {
                    return (playerInv[invIndex] = item);
                }
            } else {
                return (playerInv[space] = item);
            }
        });

        playerInv.map((newItem, index) => {
            const inInventory = array.findIndex(
                (inventory) => inventory.name === newItem.name
            );
            if (inInventory === -1) {
                playerInv[index] = "{}";
            }
        });
        return playerInv;
    }
};

export const loadOtherInventory = (inventory, currentInventory) => {
    let items, weapons, accounts;
    let inventoryArray = [];

    if (currentInventory.length === 0) {
        if (inventory.items) {
            items = inventory.items.filter((item) => item.count > 0);

            items.map((item) => {
                inventoryArray.push(itemType(item));
            });
        }
        if (inventory.weapons) {
            weapons = inventory.weapons;

            weapons.forEach((item) => {
                inventoryArray.push(weaponType(item));
            });
        }

        if (inventory.accounts) {
            accounts = inventory.accounts;
            accounts.forEach((item) => {
                if (
                    (item.name === "money" && item.money > 0) ||
                    (item.name === "black_money" && item.money > 0)
                ) {
                    item.type = "item_account";
                    inventoryArray.push(accountType(item));
                }
            });
        }

        while (inventoryArray.length < 50) {
            inventoryArray.push("{}");
        }
    } else {
        inventoryArray = currentInventory.map((item) => {
            if (item.ammo >= 0) {
                return weaponType(item);
            }

            if (item.count >= 0) {
                return itemType(item);
            }

            if (item.money >= 0) {
                return accountType(item);
            }
        });
    }

    if (currentInventory.length > 0) {
        inventoryArray = currentInventory;
    }

    return inventoryArray;
};

export const loadOtherPlayerInventory = (inventory) => {
    let inventoryArray = [];
    inventoryArray = inventory.inventory.filter((item) => item.count > 0);

    let weapons;
    inventoryArray.forEach((item) => {
        item.type = "item_standard";
    });
    if (inventory.weapons) {
        weapons = inventory.weapons;
        weapons.map((item) => {
            item.type = "item_weapon";
            item.name = item.name.toUpperCase();
            const weap = weaponReset(item);
            inventoryArray.push(weap);
        });
    }
    // currentInventory.items.forEach((item) => inventory.items.push(item));
    if (inventory.accounts) {
        inventory.accounts.forEach((item) => {
            item.type = "item_account";

            if (
                (item.name === "money" && item.money > 0) ||
                (item.name === "black_money" && item.money > 0)
            ) {
                inventoryArray.push(item);
            }
        });
    }

    while (inventoryArray.length < 50) {
        inventoryArray.push("{}");
    }

    return inventoryArray;
};

export const useInventoryItem = (
    flattenedInventory,
    itemIndex,
    previousItem
) => {
    if (flattenedInventory[itemIndex] !== "{}") {
        Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);

        if (flattenedInventory[itemIndex].type === "item_standard") {
            if (flattenedInventory[itemIndex].count === 0) {
                flattenedInventory[itemIndex] = "{}";
            } else {
                flattenedInventory[itemIndex];
            }
            return flattenedInventory[itemIndex];
        }

        let item = flattenedInventory[itemIndex];

        if (
            previousItem &&
            previousItem.type === "item_weapon" &&
            flattenedInventory[itemIndex].name !== previousItem.name 
        ) {
            item.unequip = false;
            return item;
        }

        switch (flattenedInventory[itemIndex].type) {
            case "item_standard":
                return item;
                break;
            case "item_weapon":
                if(previousItem){
                    if (previousItem.unequip === undefined || previousItem.unequip) {
                        item.unequip = false;
                        return item;
                        break;
                    } else if (previousItem.unequip === false) {
                        item.unequip = true;
                        return item;
                        break;
                    }
                }
            default:
                return;
        }
    }
};

export const loadHotbar = (inventory) => {
    let inventoryClone = [...inventory];
    let hotbar = inventoryClone.splice(0, 5);
    return [...hotbar];
};
