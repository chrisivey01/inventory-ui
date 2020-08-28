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
    let nonFlattenedList = flattenedInventory.nonFlattened.items;
    let itemList = nonFlattenedList.filter((item) => item.count > 0);
    
    // this is here to make itemList have 25 places for inventory
    while(itemList.length < 25){
        itemList.push('{}')
    }

    itemList.map(item => {
        let index = flattenedList.map(flatItem => flatItem.name).indexOf(item.name)
        console.log(index)
        return itemList[index] = item
    })
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

    return [...itemList];
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
