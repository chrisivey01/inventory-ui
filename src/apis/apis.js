import axios from "axios";

const openInventoryUrl = "http://pma-inventory/OpenInventory";
const closeInventoryUrl = "http://pma-inventory/CloseInventory";
const useItemUrl = "http://pma-inventory/UseItem";
// const useItemTwoUrl = "http://pma-inventory/UseItemTwo";
// const useItemThreeUrl = "http://pma-inventory/UseItemThree";
// const useItemFourUrl = "http://pma-inventory/UseItemFour";
// const useItemFiveUrl = "http://pma-inventory/UseItemFive";

const openTrunkUrl = "http://pma-inventory/OpenTrunk";

const updateInventoryUrl = "http://pma-inventory/UpdateInventory";

const buyItemUrl = "http://pma-inventory/BuyItem";

const dropItemUrl = "http://pma-inventory/DropItem";

const Apis = {
    openInventory() {
        return axios.post(openInventoryUrl);
    },

    closeInventory(data) {
        axios.post(closeInventoryUrl, data);
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
    }
};

export default Apis;
