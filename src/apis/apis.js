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

const Apis = {
    openInventory() {
        return axios.post(openInventoryUrl);
    },

    closeInventory(sortedInventory, secondInventory, carData) {
        const data = {
            sortedInventory: sortedInventory,
            secondInventory: secondInventory,
            carData: carData,
        };
        axios.post(closeInventoryUrl, data);
    },

    useInventoryItem(item, itemSlot) {
        return axios.post(useItemUrl, item);
    },

    openTrunk() {
        return axios.post(openTrunkUrl);
    },

    updateInventory(item) {
        return axios.post(updateInventoryUrl, item);
    },
};

export default Apis;
