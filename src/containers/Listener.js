import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHotbar, loadHotbar } from "../store/hotbar/hotbar.actions";
import {
    closeContextMenu,
    closeInventory,
    loadInventory,
    loadOtherInventory,
    loadOtherPlayerInventory,
    loadStoreInventory,
    splitItemHandler,
    storeConfirmationHandler,
    updateInventory,
    updateItem,
    updateWeapon,
    useInventoryItem,
    loadGunInventory,
} from "../store/inventory/inventory.actions";

export default () => {
    const dispatch = useDispatch();
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory
    );
    const selectedItem = useSelector((state) => state.inventory.selectedItem);
    const otherInventory = useSelector(
        (state) => state.inventory.otherInventory
    );
    const info = useSelector((state) => state.inventory.info);
    const inventoryType = useSelector((state) => state.inventory.inventoryType);
    const confirmation = useSelector((state) => state.inventory.confirmation);
    const quantity = useSelector((state) => state.inventory.quantity);
    const boughtItem = useSelector((state) => state.inventory.boughtItem);
    const contextItem = useSelector((state) => state.inventory.contextItem);

    useEffect(() => {
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);

    const onMessage = (e) => {
        if (e.data.useItem) {
            switch (e.data.useItem) {
                case "useItemOne": {
                    dispatch(useInventoryItem(0));
                    break;
                }
                case "useItemTwo": {
                    dispatch(useInventoryItem(1));
                    break;
                }
                case "useItemThree": {
                    dispatch(useInventoryItem(2));
                    break;
                }
                case "useItemFour": {
                    dispatch(useInventoryItem(3));
                    break;
                }
                case "useItemFive": {
                    dispatch(useInventoryItem(4));
                    break;
                }
                default:
                    return null;
            }
        } else {
            //UPDATE WEAPON AMMO for inventory display for client side.
            if (e.data.updateWeapon) {
                dispatch(updateWeapon(e.data.weaponData));
            }

            if (e.data.updateItem) {
                dispatch(updateItem(e.data.itemData, personalInventory.sorted));
            }
        }
    };

    useEffect(() => {
        window.addEventListener("message", (event) => {
            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(loadPersonalInventory(data));
                    } else {
                        if (!event.data.closeInventory) {
                            const data = {
                                inventory: event.data.inventory,
                                playerInventory: event.data.playerInventory,
                                inventoryType: event.data.inventoryType,
                                info: event.data.info,
                            };
                            if (event.data.updateInventory) {
                                dispatch(updateInventory(data));
                            } else {
                                dispatch(loadInventory(data));
                            }
                        }
                    }
                    break;
                }
                case "Hotbar": {
                    if (event.data.hotbar) {
                        dispatch(loadHotbar());
                    } else {
                        dispatch(closeHotbar());
                    }
                    break;
                }
                case "Trunk": {
                    const payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.otherInventory,
                        info: event.data.carData,
                    };

                    dispatch(loadOtherInventory(payload));
                    break;
                }
                case "Gundealer": {
                    dispatch(loadGunInventory(event.data.guns));
                    break;
                }
                case "Store": {
                    dispatch(loadStoreInventory(event.data.items));
                    break;
                }
                case "Property": {
                    const payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.otherInventory,
                        info: event.data.property,
                    };

                    dispatch(loadOtherInventory(payload));

                    break;
                }

                case "Player": {
                    const payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: [],
                        info: event.data.info,
                    };

                    dispatch(loadOtherPlayerInventory(payload));
                    break;
                }
                default:
                    return null;
            }
        });
    }, []);

    useEffect(() => {
        window.addEventListener("message", closeFunction);
        return () => {
            window.removeEventListener("message", closeFunction);
        };
    }, [personalInventory, selectedItem, otherInventory]);

    const closeFunction = (event) => {
        if (event.data.closeInventory) {
            dispatch(
                closeInventory(
                    personalInventory,
                    otherInventory,
                    info,
                    inventoryType
                )
            );
            dispatch(closeContextMenu());
            dispatch(closeHotbar());
        }
    };

    useEffect(() => {
        function onKeyup(e) {
            if (
                e.key === "Enter" &&
                confirmation.show &&
                selectedItem.type === "Store"
            ) {
                dispatch(
                    storeConfirmationHandler(
                        personalInventory,
                        otherInventory,
                        selectedItem,
                        quantity,
                        info,
                        boughtItem
                    )
                );
            } else if (
                e.key === "Enter" &&
                confirmation.show &&
                selectedItem.type === "Personal"
            ) {
                dispatch(
                    splitItemHandler({
                        contextItem,
                        quantity,
                        personalInventory,
                    })
                );
            }
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);
    }, [confirmation, quantity, personalInventory, selectedItem, contextItem]);

    return <Fragment />;
};
