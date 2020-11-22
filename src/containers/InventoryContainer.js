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

    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory
    );
    const otherInventory = useSelector(
        (state) => state.inventory.otherInventory
    );
    const inventoryShow = useSelector((state) => state.inventory.inventoryShow);
    const info = useSelector((state) => state.inventory.info);
    const selectedItem = useSelector((state) => state.inventory.selectedItem);

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
    const selectedType = useSelector((state) => state.inventory.selectedType);
    const quantity = useSelector((state) => state.inventory.quantity);

    useEffect(() => {
        console.log(personalInventory);
    }, [personalInventory]);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(inventoryActions.loadPersonalInventory(data));
                    } else {
                        if (event.data.inventory) {
                            const data = {
                                inventory: event.data.inventory,
                                playerInventory: event.data.playerInventory,
                                inventoryType: event.data.inventoryType,
                                info: event.data.info
                            };
                            dispatch(inventoryActions.loadInventory(data));
                        }
                    }
                }
                break;
                case "Hotbar": {
                    dispatch(hotbarActions.loadHotbar());
                }
                break;
                case "Trunk": {
                    let payload = {};

                    payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.sortedInventory,
                        info: event.data.carData,
                    };

                    dispatch(inventoryActions.loadOtherInventory(payload));
                    break;
                }
                case "Store": {
                    dispatch(
                        inventoryActions.loadStoreInventory(event.data.items)
                    );
                }
                break;
                default:
                    return null;
            }
        });
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", closeFunction);
        return () => window.removeEventListener("keydown", closeFunction);
    }, [personalInventory, selectedItem]);

    const onStart = (e, i, type, itemType, selectedType) => {
        let payload;
        if (type === "Personal") {
            payload = {
                item: personalInventory.inventory[i],
                index: i,
                type: type,
            };
        } else if (type === "Trunk" || type === "Store") {
            payload = {
                item: otherInventory.inventory[i],
                index: i,
                type: type,
            };
        }
        dispatch(inventoryActions.selectInventoryItem(payload));
        dispatch(itemActions.setInfo(payload));
    };

    //selectedItem.data is the full item object
    const onStop = (e, i, type, itemType, selectedType) => {
        let data;
        if (type === "Personal") {
            data = {
                item: personalInventory.inventory[i],
                index: i,
                type: type,
                selectedItem: selectedItem
            };
            if (itemType === "Store") {
                dispatch(itemActions.clearInfo());
                dispatch(inventoryActions.transferConfirmation());
            } else {
                dispatch(itemActions.clearInfo());
                dispatch(inventoryActions.moveInventoryItem(data));
            }
        } else {
            data = {
                item: otherInventory.inventory[i],
                index: i,
                type: type,
                selectedItem: selectedItem
            };
            dispatch(itemActions.clearInfo());
            dispatch(inventoryActions.moveInventoryItem(data));
        }
    };

    const closeFunction = (event) => {
        if (event.which === 27) {
            dispatch(
                inventoryActions.closeInventory(
                    personalInventory,
                    otherInventory,
                    info
                )
            );
            dispatch(hotbarActions.closeHotbar());
        }
    };

    const agreeHandler = () => {
        const data = {
            selectedItem: selectedItem,
            quantity: quantity,
            personalInventory: personalInventory,
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
                style={{ visibility: inventoryShow ? "visible" : "hidden" }}
                container
            >
                {personalInventory.inventory.length > 0 ? (
                    <Fragment>
                        <Inventory
                            inventory={personalInventory}
                            info={info}
                            onStart={onStart}
                            onStop={onStop}
                            isSecondInventory={false}
                        />
                        <PlayerMenu />
                        <Inventory
                            inventory={otherInventory}
                            onStart={onStart}
                            onStop={onStop}
                            isSecondInventory={true}
                        />
                    </Fragment>
                ) : (
                    <Fragment />
                )}
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
