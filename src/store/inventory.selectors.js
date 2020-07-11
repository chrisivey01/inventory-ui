import { createSelector } from "reselect";

const getInventory = (state) => state.inventoryData;

export const getInventoryData = createSelector(
    [getInventory],
    (data) => data.inventoryData
);
