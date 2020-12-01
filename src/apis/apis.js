import axios from "axios";

const openInventoryUrl = "http://pma-inventory/OpenInventory";
const closeInventoryUrl = "http://pma-inventory/CloseInventory";
const useItemUrl = "http://pma-inventory/UseItem";

const openTrunkUrl = "http://pma-inventory/OpenTrunk";

const updateInventoryUrl = "http://pma-inventory/UpdateInventory";

const buyItemUrl = "http://pma-inventory/BuyItem";

const dropItemUrl = "http://pma-inventory/DropItem";

const givePlayerItemUrl = "http://pma-inventory/GivePlayerItem";


const Apis = {
    openInventory() {
        return axios.post(openInventoryUrl);
    },

    closeInventory(data) {
        return axios.post(closeInventoryUrl, data);
    },

    useInventoryItem(item) {
        return axios.post(useItemUrl, item);
    },

    openTrunk() {
        return axios.post(openTrunkUrl);
    },

    updateInventory(data) {
        return axios.post(updateInventoryUrl, data);
    },

    buyItem(item) {
        return axios.post(buyItemUrl, item);
    },

    dropItem(item) {
        return axios.post(dropItemUrl, item);
    },

    givePlayerItem(item) {
        return axios.post(givePlayerItemUrl, item)
    }
};

export default Apis;
