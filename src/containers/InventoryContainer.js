import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Inventory from "../components/Inventory";
import PlayerMenu from "../components/PlayerMenu";
import SelectedItem from "../components/SelectedItem";
import * as inventoryActions from "../store/inventory/inventory.actions";
import * as hotbarActions from "../store/hotbar/hotbar.actions";

import * as itemActions from "../store/item/item.actions";

const useStyles = makeStyles((theme) => ({
    "@global": {
        "*::-webkit-scrollbar": {
            width: "0.45em",
        },
        "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(44, 62, 80, 1)",
            outline: "1px solid slategrey",
        },
    },

    inventoryDisplay: {
        width: "90vw",
        position: "absolute",
        height: "80vh",
        margin: "auto",
        overflow: "hidden",
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        zIndex: -1,
    },
    inventoryHide: {
        display: "none",
    },
}));

function InventoryContainer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [useOnce, setUseOnce] = useState(false);
    const sortedInventory = useSelector(
        (state) => state.inventory.sortedInventory
    );
    const secondInventory = useSelector(
        (state) => state.inventory.secondInventory
    );
    const inventoryType = useSelector((state) => state.inventory.inventoryType);
    const secondInventoryType = useSelector(
        (state) => state.inventory.secondInventoryType
    );
    const showHide = useSelector((state) => state.inventory.showHide);

    useEffect(() => {
        setUseOnce(true);
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);

    useEffect(() => {
        window.addEventListener("message", (event) => {
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

    useEffect(() => {
        window.addEventListener("keydown", closeFunction);
        return () => window.removeEventListener("keydown", closeFunction);
    }, [sortedInventory]);

    const onStart = (e, i, type) => {
        const payload = {
            item: sortedInventory[i],
            index: i,
        };
        console.log(type);
        dispatch(inventoryActions.selectInventoryItem(payload));
        dispatch(itemActions.setInfo(payload));
    };

    const onStop = (e, i, type) => {
        console.log(type);
        dispatch(itemActions.clearInfo());
        dispatch(inventoryActions.moveInventoryItem(i));
    };

    const closeFunction = (event) => {
        if (event.which === 27) {
            dispatch(
                inventoryActions.closeInventory(
                    sortedInventory,
                    secondInventory
                )
            );
            dispatch(hotbarActions.closeHotbar());
        }
    };

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

    return (
        <Grid
            className={classes.inventoryDisplay}
            style={{ visibility: showHide ? "visible" : "hidden" }}
            container
        >
            <Inventory
                inventoryTitle={inventoryType}
                inventoryType={inventoryType}
                inventory={sortedInventory}
                onStart={onStart}
                onStop={onStop}
                isSecondInventory={false}
            />
            <PlayerMenu />
            <Inventory
                inventoryTitle={secondInventoryType}
                inventoryType={secondInventoryType}
                inventory={secondInventory}
                onStart={onStart}
                onStop={onStop}
                isSecondInventory={true}
            />
            <SelectedItem />
        </Grid>
    );
}

export default InventoryContainer;
