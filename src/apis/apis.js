import axios from "axios";

const openInventory = "http://pma-inventory/OpenInventory";
const closeInventory = "http://pma-inventory/CloseInventory";
const useInventoryItem = "http://pma-inventory/UseInventoryItem";

const Apis = {
    openInventory: (inventoryType) => {
        // const data = {items:items};
        return axios.post(openInventory, items);
    },

    closeInventory: (items) => {
        // const data = {items:items};
        return axios.post(closeInventory, items);
    },

    useInventoryItem: (items) => {
        // const data = {items:items};
        return axios.post(useInventoryItem, items);
    },

};

export default Apis;
