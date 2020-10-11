import axios from "axios";

const openInventoryUrl = "http://pma-inventory/OpenInventory";
const closeInventoryUrl = "http://pma-inventory/CloseInventory";
const useItemOneUrl = "http://pma-inventory/UseItemOne";
const useItemTwoUrl = "http://pma-inventory/UseItemTwo";
const useItemThreeUrl = "http://pma-inventory/UseItemThree";
const useItemFourUrl = "http://pma-inventory/UseItemFour";
const useItemFiveUrl = "http://pma-inventory/UseItemFive";

const openTrunkUrl = "http://pma-inventory/OpenTrunk";

const Apis = {
    openInventory() {
        return axios.post(openInventoryUrl);
    },

    closeInventory(sortedInventory, secondInventory, carData) {
        let data = {
            sortedInventory: sortedInventory,
            secondInventory: secondInventory,
            carData: carData,
        };
        axios.post(closeInventoryUrl, data);
    },

    useInventoryItem(item, itemSlot) {
        if (item) {
            if (itemSlot === 0) {
                return axios.post(useItemOneUrl, item);
            } else if (itemSlot === 1) {
                return axios.post(useItemTwoUrl, item);
            } else if (itemSlot === 2) {
                return axios.post(useItemThreeUrl, item);
            } else if (itemSlot === 3) {
                return axios.post(useItemFourUrl, item);
            } else if (itemSlot === 4) {
                return axios.post(useItemFiveUrl, item);
            }
        }
    },

    openTrunk() {
        return axios.post(openTrunkUrl);
    },
};

export default Apis;
