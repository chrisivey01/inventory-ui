import axios from "axios";

const openInventoryUrl = "http://pma-inventory/OpenInventory";
const closeInventoryUrl = "http://pma-inventory/CloseInventory";
const useItemUrl = "http://pma-inventory/UseItem";
const useHotbarItemUrl = "http://pma-inventory/UseHotbarItem";
const openTrunkUrl = "http://pma-inventory/OpenTrunk";

const updateInventoryUrl = "http://pma-inventory/UpdateInventory";

const swapUpdateInventoryUrl = "http://pma-inventory/SwapUpdateInventory";


const buyItemUrl = "http://pma-inventory/BuyItem";

const dropItemUrl = "http://pma-inventory/DropItem";

const givePlayerItemUrl = "http://pma-inventory/GivePlayerItem";

const giveItemsFromSortsUrl = "http://pma-inventory/GiveItemsFromSort";

const Apis = {
    openInventory() {
        return axios.post(openInventoryUrl);
    },

    closeInventory(data) {
        return axios.post(closeInventoryUrl, data);
    },

    useItem(item) {
        return axios.post(useItemUrl, item)
    },

    useInventoryItem(item) {
        return axios.post(useHotbarItemUrl, item);
    },

    openTrunk() {
        return axios.post(openTrunkUrl);
    },

    updateInventory(data) {
        return axios.post(updateInventoryUrl, data);
    },

    swapUpdateInventory(data) {
        return axios.post(swapUpdateInventoryUrl, data);
    },

    buyItem(item) {
        return axios.post(buyItemUrl, item);
    },

    dropItem(item) {
        return axios.post(dropItemUrl, item);
    },

    givePlayerItem(item, personalInventory) {
        return axios.post(givePlayerItemUrl, { item, personalInventory })
    },

    giveItemsFromSort(personalInventory) {
        return axios.post(giveItemsFromSortsUrl, personalInventory)
    }
};

export default Apis;
