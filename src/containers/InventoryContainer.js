import { Grid, makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confirmation from "../components/Confirmation";
import Inventory from "../components/Inventory";
import PlayerMenu from "../components/PlayerMenu";
import SelectedItem from "../components/SelectedItem";
import * as hotbarActions from "../store/hotbar/hotbar.actions";
import * as inventoryActions from "../store/inventory/inventory.actions";
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
    const carData = useSelector((state) => state.inventory.data);
    const selectedItem = useSelector((state) => state.inventory.selectedItem);
    const selectedType = useSelector((state) => state.inventory.selectedType);
    const quantity = useSelector((state) => state.inventory.quantity);

    useEffect(() => {
        console.log(sortedInventory);
    }, [sortedInventory]);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(inventoryActions.loadPersonalInventory(data));
                    } else {
                        if (event.data.inventory) {
                            const inventory = event.data.inventory;
                            const sortedInventory = event.data.sortedInventory;

                            dispatch(
                                inventoryActions.loadInventory({
                                    inventory,
                                    sortedInventory,
                                })
                            );
                        }
                    }
                    break;
                }
                case "Hotbar": {
                    dispatch(hotbarActions.loadHotbar());
                    break;
                }
                case "Trunk": {
                    let payload = {};
                    if (event.data.sortedInventory.length === 0) {
                        payload = {
                            inventoryType: event.data.inventoryType,
                            inventory: event.data.inventory,
                            carData: event.data.carData,
                        };
                        dispatch(inventoryActions.loadSecondInventory(payload));
                    } else {
                        payload.inventoryType = event.data.inventoryType;
                        payload.inventory = {};
                        payload.inventory.items = [];
                        payload.inventory.items = event.data.sortedInventory;
                        payload.inventory.plate = event.data.carData.plate;
                        payload.inventory.weight = event.data.carData.max;
                        dispatch(
                            inventoryActions.loadSecondInventorySorted(payload)
                        );
                    }
                    break;
                }
                case "Store": {
                    dispatch(
                        inventoryActions.loadStoreInventory(event.data.items)
                    );
                }

                default:
                    return null;
            }
        });
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", closeFunction);
        return () => window.removeEventListener("keydown", closeFunction);
    }, [sortedInventory, selectedItem]);

    const onStart = (e, i, type, itemType, selectedType) => {
        let payload;
        if (type === "Personal") {
            payload = {
                item: sortedInventory[i],
                index: i,
                type: type,
                itemType: itemType,
            };
        } else if (type === "Trunk" || type === "Store") {
            payload = {
                item: secondInventory[i],
                index: i,
                type: type,
                itemType: itemType,
            };
        }
        dispatch(inventoryActions.selectInventoryItem(payload));
        dispatch(itemActions.setInfo(payload));
    };

    const onStop = (e, i, type, itemType, selectedType) => {
        let payload;
        if (type === "Personal") {
            payload = {
                item: sortedInventory[i],
                index: i,
                type: type,
                itemType: itemType,
            };
            if (itemType === "Store") {
                dispatch(itemActions.clearInfo());
                dispatch(inventoryActions.transferConfirmation());
            } else {
                dispatch(itemActions.clearInfo());
                dispatch(
                    inventoryActions.moveInventoryItem(payload, selectedItem)
                );
            }
        } else {
            payload = {
                item: secondInventory[i],
                index: i,
                type: type,
                itemType: itemType,
            };
            dispatch(itemActions.clearInfo());
            dispatch(inventoryActions.moveInventoryItem(payload, selectedItem));
        }
    };

    const closeFunction = (event) => {
        if (event.which === 27) {
            dispatch(
                inventoryActions.closeInventory(
                    sortedInventory,
                    secondInventory,
                    carData
                )
            );
            dispatch(hotbarActions.closeHotbar());
        }
    };

    const agreeHandler = () => {
        const data = {
            selectedItem: selectedItem,
            quantity: quantity,
            sortedInventory: sortedInventory
        };

        dispatch(inventoryActions.confirmationHandler(data));
    };

    const disagreeHandler = () => {
        console.log("disagree");
    };

    return (
        <Fragment>
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
                    selectedType={selectedType}
                />
                <PlayerMenu />
                <Inventory
                    inventoryTitle={secondInventoryType}
                    inventoryType={secondInventoryType}
                    inventory={secondInventory}
                    onStart={onStart}
                    onStop={onStop}
                    isSecondInventory={true}
                    selectedType={selectedType}
                />
                <SelectedItem />
            </Grid>
            <Confirmation
                agreeHandler={agreeHandler}
                disagreeHandler={disagreeHandler}
                selectedItem={selectedItem}
            />
        </Fragment>
    );
}

export default InventoryContainer;
