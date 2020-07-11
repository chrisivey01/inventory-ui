import axios from "axios";

const openInventory = "http://pma-inventory/OpenInventory";
const closeInventory = "http://pma-inventory/CloseInventory";

const Api = {
    openPersonalInventory: (items) => {
        const data = {items:items};
        return axios.post(openInventory, data);
    },

    closePersonalInventory: (items) => {
        const data = {items:items};
        return axios.post(closeInventory, data);
    },
    
};
