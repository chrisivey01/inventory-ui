// export const loadSecondInventory = (inventory, sortedInventory) => {
//     let currentInventory = [...inventory];
//     while (currentInventory.length < 50) {
//         currentInventory.push("{}");
//     }
//     return [...currentInventory];
// };

// export const moveInventoryItem = (
//     flattenedInventory,
//     firstItemIndex,
//     secondItemIndex
// ) => {
//     const selectedItem = flattenedInventory[firstItemIndex];
//     //returns an array for some odd reason
//     let movedTo = flattenedInventory.splice(secondItemIndex, 1, selectedItem);
//     flattenedInventory.splice(firstItemIndex, 1, movedTo[0]);
//     return [...flattenedInventory];
// };
