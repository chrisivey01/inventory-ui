import axios from "axios";

const openInventoryUrl = "http://pma-inventory/OpenInventory";
const closeInventoryUrl = "http://pma-inventory/CloseInventory";
const useItemOneUrl = "http://pma-inventory/UseItemOne";
const useItemTwoUrl = "http://pma-inventory/UseItemTwo";
const useItemThreeUrl = "http://pma-inventory/UseItemThree";
const useItemFourUrl = "http://pma-inventory/UseItemFour";
const useItemFiveUrl = "http://pma-inventory/UseItemFive";

const Apis = {
    openInventory(inventoryType) {
        return axios.post(openInventoryUrl, items);
    },

    closeInventory(items) {
        return axios.post(closeInventoryUrl, items);
    },

    useInventoryItem(item, itemSlot) {
        if(item){
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
};

export default Apis;
