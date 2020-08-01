import Apis from "../apis/apis";

export const loadPersonalInventory = (inventory) => {
    let flatInventory = [];
    let items = inventory.items.filter((items) => items.count > 0);
    items.map((item) => flatInventory.push(item));
    let weapons = inventory.weapons;
    weapons.map((item) => flatInventory.push(item));
    flatInventory.push(inventory.accounts[0]);
    flatInventory.weight = inventory.weight;
    flatInventory.money = inventory.money;
    flatInventory.maxWeight = inventory.maxWeight;

    while (flatInventory.length < 25) {
        flatInventory.push("{}");
    }

    return [...flatInventory];
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
    let nonFlattenedList = flattenedInventory.nonFlattened;

    flattenedList.map((item, i) => {
        if (item.count) {
            const itemIndex = nonFlattenedList.items
                .map((nonFlatItem) => nonFlatItem.name)
                .indexOf(item.name);
            if (nonFlattenedList.items[itemIndex].count > 0) {
                flattenedList[i] = nonFlattenedList.items[itemIndex];
                console.log(nonFlattenedList);
                console.log(flattenedList);
            } else {
                flattenedList[i] = "{}";
                console.log(nonFlattenedList);
                console.log(flattenedList);
            }
        }
    });

    return [...flattenedList];
};

const useInventoryItem = (flattenedInventory, itemIndex) => {
    Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);
    return [...flattenedInventory];
};

const closeInventory = (flattenedInventory) => {
    Apis.closeInventory(flattenedInventory);
    return [...flattenedInventory];
};

export { useInventoryItem, closeInventory };
