import Apis from "../apis/apis";
export const loadPersonalInventory = (inventory, currentInventory) => {
    let items = inventory.items.filter((item) => item.count > 0);
    let weapons = inventory.weapons;
    if (currentInventory.length === 0) {
        weapons.map((item) => currentInventory.push(item));
        items.forEach((item) => currentInventory.push(item));
        inventory.accounts.forEach((item) => {
            if (
                (item.name !== "bank" &&
                    item.name === "money" &&
                    item.money > 0) ||
                (item.name === "black_money" && item.money > 0)
            ) {
                currentInventory.push(item);
            }
        });
        currentInventory.weight = inventory.weight;
        currentInventory.money = inventory.money;
        currentInventory.maxWeight = inventory.maxWeight;

        while (currentInventory.length < 25) {
            currentInventory.push("{}");
        }
        return [...currentInventory];
    } else {
        let array = [];
        weapons.forEach((item) => array.push(item));
        items.forEach((item) => array.push(item));
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
    while (itemList.length < 25) {
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
// itemList.reduce((prev, cur, index, array) => {
//     if(prev === cur)
// })

// itemList.map((nonFlatItem, notFlatIterator) => {
//     flattenedList.map((flatItem, flatItemIterator) => {
//         if(flatItem === nonFlatItem) {
//             // itemList[notFlatIterator] = '{}'
//             itemList[flatItemIterator] = nonFlatItem
//         }
//     })
// })

// flattenedList.map((flatItem, flatIterator) => {
//     if(nonFlatItem.name === flatItem.name && notFlatIterator === flatIterator){
//         itemList[flatIterator] = nonFlatItem;
//     } else {
//         itemList.splice(notFlatIterator, 1);
//         itemList[flatIterator] = nonFlatItem;

//         itemList.splice(notFlatIterator, 1, '{}');
//     }
// })

//     const index = itemList.map(nonFlat => nonFlat.name).indexOf(item.name);
//     if (index === -1) {
//         return flattenedList[i] = "{}";
//     } else {
//         return (flattenedList[i].count = item.count);
//     }
// });
// //updates count of each item in the flattenedArray
// itemList.map((item) => {
//     flattenedList.map((flatItem) => {
//         if (flatItem.name === item.name) {
//             return flatItem.count = item.count;
//         }
//     });
// });

// flattenedList.map((item) => {
//     if (item.count === 0) {
//         return "{}";
//     } else {
//         flattenedList[item.name] = item.count;
//     }
// });

// [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
//     return accumulator + currentValue
//   })

// itemList.reduce((accumulator, currentValue) => {

//     return accumulator + currentValue
// })

// itemList.map((item) => {
//     flattenedList.map(flatItem => {
//         flattenedList.filter(.)
//         if(flatItem.name === itemList.name){
//             flatItem.count = itemList.count
//         }
//     })
// })

// /flattenedList.filter()
// flattenedList.map((item, i) => {
//     if (item.count) {
//         const itemIndex = nonFlattenedList.items
//             .map((nonFlatItem) => nonFlatItem.name)
//             .indexOf(item.name);
//         if (nonFlattenedList.items[itemIndex].count > 0) {
//             flattenedList[i] = nonFlattenedList.items[itemIndex];
//             console.log(nonFlattenedList);
//             console.log(flattenedList);
//         } else {
//             flattenedList[i] = "{}";
//             console.log(nonFlattenedList);
//             console.log(flattenedList);
//         }
//     }
// });
// };

export const useInventoryItem = (flattenedInventory, itemIndex) => {
    Apis.useInventoryItem(flattenedInventory[itemIndex], itemIndex);
    return [...flattenedInventory];
};

export const closeInventory = (flattenedInventory) => {
    Apis.closeInventory(flattenedInventory);
};
