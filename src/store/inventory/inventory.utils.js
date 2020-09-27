import Apis from "../../apis/apis";
export const loadPersonalInventory = (inventory, currentInventory) => {
    let items = inventory.items.filter((item) => item.count > 0);
    let weapons = inventory.weapons;
    if (currentInventory.length === 0) {
        weapons.map((item) => currentInventory.push(item));
        items.forEach((item) => currentInventory.push(item));
        inventory.accounts.forEach((item) => {
            if ((item.name === "money" && item.money > 0) || (item.name === "black_money" && item.money > 0)) {
                currentInventory.push(item);
            }
        });
        currentInventory.weight = inventory.weight;
        currentInventory.money = inventory.money;
        currentInventory.maxWeight = inventory.maxWeight;

        while (currentInventory.length < 50) {
            currentInventory.push("{}");
        }
        return [...currentInventory];
    } else {
        let array = [];
        weapons.forEach((item) => array.push(item));
        items.forEach((item) => array.push(item));
        inventory.accounts.forEach((item) => {
            if ((item.name === "money" && item.money > 0) || (item.name === "black_money" && item.money > 0)) {
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
            // let inInventory = false
            const inInventory = array.findIndex(
                (inventory) => inventory.name === newItem.name
            );
            if (inInventory === -1) {
                currentInventory[index] = "{}";
            }
        });

        return [...currentInventory];
    }
};

export const moveInventoryItem = (
    flattenedInventory,
    firstItemIndex,
    secondItemIndex
) => {
    const selectedItem = flattenedInventory[firstItemIndex];
    //returns an array for some odd reason
    let movedTo = flattenedInventory.splice(secondItemIndex, 1, selectedItem);
    flattenedInventory.splice(firstItemIndex, 1, movedTo[0]);
    return [...flattenedInventory];
};

export const updateFlattenedPersonalInventory = (flattenedInventory) => {
    let flattenedList = flattenedInventory.flattened;
    let nonFlattenedList = flattenedInventory.nonFlattened.items;
    let itemList = nonFlattenedList.filter((item) => item.count > 0);

    // this is here to make itemList have 25 places for inventory
    while (itemList.length < 50) {
        itemList.push("{}");
    }

    itemList.map((item) => {
        let index = flattenedList
            .map((flatItem) => flatItem.name)
            .indexOf(item.name);
        console.log(index);
        return (itemList[index] = item);
    });

    return itemList;
};

export const useInventoryItem = (flattenedInventory, itemIndex) => {
    Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);

    return flattenedInventory[itemIndex];
};

export const closeInventory = (flattenedInventory) => {
    Apis.closeInventory(flattenedInventory);
};
