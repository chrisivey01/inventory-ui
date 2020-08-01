import { createSelector } from "reselect";

const getInventory = (state) => state.flattenedInventory;

export const getFlattenedInventory = createSelector(
    [getInventory],
    (data) => data.flattenedInventory
);
