import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHotbar, loadHotbar } from "../store/hotbar/hotbar.actions";
import {
    closeContextMenu,
    closeInventory,
    loadInventory,
    loadOtherInventory,
    loadOtherPlayerInventory,
    splitItemHandler,
    storeConfirmationHandler,
    updateInventory,
    updateItem,
    updateWeapon,
    useInventoryItem,
    loadStorage,
    updateWeaponClip,
    itemUseHandler,
} from "../store/inventory/inventory.actions";
import personalInventoryJson from "../helpers/personalInventory.json";
import playerJson from "../data/player.json";
import trunkJson from "../data/trunk.json";

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
    const usedItem = useSelector((state) => state.inventory.usedItem);

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
                    dispatch(useInventoryItem(0, e.data.equipWeapon));
                    break;
                }
                case "useItemTwo": {
                    dispatch(useInventoryItem(1, e.data.equipWeapon));
                    break;
                }
                case "useItemThree": {
                    dispatch(useInventoryItem(2, e.data.equipWeapon));
                    break;
                }
                case "useItemFour": {
                    dispatch(useInventoryItem(3, e.data.equipWeapon));
                    break;
                }
                case "useItemFive": {
                    dispatch(useInventoryItem(4, e.data.equipWeapon));
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
                dispatch(
                    itemUseHandler({
                        itemData: e.data.itemData,
                    })
                );
            }

            if (e.data.itemUse) {
                dispatch(
                    itemUseHandler({
                        itemData: e.data.itemData,
                        equipWeapon: e.data.equipWeapon,
                    })
                );
            }
        }
    };

    useEffect(() => {
        window.addEventListener("message", (event) => {
            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        const data = {
                            inventory: event.data.inventory,
                            playerInventory: event.data.playerInventory,
                            inventoryType: event.data.inventoryType,
                            info: event.data.info,
                            inventoryTitle: event.data.inventoryTitle,
                        };
                        if (event.data.updateInventory) {
                            dispatch(updateInventory(data));
                        } else {
                            dispatch(loadInventory(data));
                        }
                    } else {
                        if (!event.data.closeInventory) {
                            const data = {
                                inventory: event.data.inventory,
                                playerInventory: event.data.playerInventory,
                                inventoryType: event.data.inventoryType,
                                info: event.data.info,
                                inventoryTitle: event.data.inventoryTitle,
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
                        title: event.data.inventoryTitle,
                    };

                    dispatch(loadOtherInventory(payload));
                    break;
                }

                case "Property": {
                    const payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.otherInventory,
                        info: event.data.property,
                        title: event.data.inventoryTitle,
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
                        title: event.data.inventoryTitle,
                    };

                    dispatch(loadOtherPlayerInventory(payload));
                    break;
                }

                case "Gundealer": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Store": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                // case "Tech Store": {
                //     const data = {
                //         inventoryType: event.data.inventoryType,
                //         inventory: event.data.inventory,
                //         title: event.data.inventoryTitle,
                //     };
                //     dispatch(loadStorage(data));
                //     break;
                // }

                case "Job": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        inventorySize: event.data.inventorySize,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Restaurant": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        inventorySize: event.data.inventorySize,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Secondary": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        inventorySize: event.data.inventorySize,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Gangs": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        inventorySize: event.data.inventorySize,
                        info: event.data.info,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Motels": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        info: event.data.info,
                        inventorySize: event.data.inventorySize,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "Apartment": {
                    const data = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        title: event.data.inventoryTitle,
                        inventorySize: event.data.inventorySize,
                    };
                    dispatch(loadStorage(data));
                    break;
                }

                case "UpdateAmmo": {
                    const data = {
                        weapon: event.data.weapon,
                        ammoCount: event.data.ammoCount,
                    };
                    dispatch(updateWeaponClip(data));
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
                Object.keys(boughtItem).length !== 0
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
                contextItem.type === "Personal"
            ) {
                dispatch(
                    splitItemHandler({
                        contextItem,
                        quantity,
                        personalInventory,
                    })
                );
            } else if (
                e.key === "Enter" &&
                confirmation.show &&
                contextItem.type !== "Personal"
            ) {
                dispatch(
                    splitItemHandler({
                        contextItem,
                        quantity,
                        otherInventory,
                    })
                );
            }
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);
    }, [confirmation, quantity, personalInventory, selectedItem, contextItem]);

    return <Fragment />;
};
