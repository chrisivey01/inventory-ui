import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsedItem from "./components/UsedItem";
import InventoryContainer from "./containers/InventoryContainer";
import * as inventoryActions from "./store/inventory/inventory.actions";
import * as hotbarActions from "./store/hotbar/hotbar.actions";
import HotbarContainer from "./containers/HotbarContainer";

const App = () => {
    const dispatch = useDispatch();
    const showHide = useSelector((state) => state.inventory.showHide);
    const showHotbar = useSelector((state) => state.hotbar.showHotbar);

    const onMessage = (e) => {
        switch (e.data.useItem) {
            case "useItemOne": {
                useDispatch(inventoryActions.useInventoryItem(0));
                break;
            }
            case "useItemTwo": {
                dispatch(inventoryActions.useInventoryItem(1));
                break;
            }
            case "useItemThree": {
                dispatch(inventoryActions.useInventoryItem(2));
                break;
            }
            case "useItemFour": {
                dispatch(inventoryActions.useInventoryItem(3));
                break;
            }
            case "useItemFive": {
                dispatch(inventoryActions.useInventoryItem(4));
                break;
            }
            default:
                return null;
        }
    };

    useEffect(() => {
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            // if (event.data.openInventory) {
            //     dispatch(actions.loadPersonalInventory)
            // }

            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(inventoryActions.loadPersonalInventory(data));
                    } else {
                        if (event.data.inventory) {
                            const sortedPayload = {
                                inventory: event.data.inventory,
                                inventoryType: event.data.inventoryType,
                                sortedInventory: event.data.sortedInventory,
                            };
                            const payload = {
                                inventory: event.data.inventory,
                                inventoryType: event.data.inventoryType,
                            };
                            if (event.data.sortedInventory.length > 0) {
                                dispatch(
                                    inventoryActions.loadSortedInventory(
                                        sortedPayload
                                    )
                                );
                            } else {
                                dispatch(
                                    inventoryActions.loadUnsortedInventory(
                                        payload
                                    )
                                );
                            }
                        }
                    }
                    break;
                }
                case "Hotbar": {
                    const payload = {
                        inventory: event.data.inventory,
                    };
                    dispatch(hotbarActions.loadHotbar(payload));
                }
                case "Trunk": {
                    const payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        carData: event.data.carData,
                        sortedInventory: [],
                    };

                    dispatch(inventoryActions.loadSecondInventory(payload));
                }

                default:
                    return null;
            }
        });
    }, []);

    return (
        <Fragment>
            {showHide ? <InventoryContainer /> : <Fragment />}

            <UsedItem />
            {showHotbar ? <HotbarContainer /> : <Fragment />}
        </Fragment>
    );
};

export default App;
