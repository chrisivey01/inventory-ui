import { Grid, makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confirmation from "../components/Confirmation";
import InventoryView from "../components/InventoryView";
import Pause from "../components/Pause";
import PlayerContextMenu from "../components/PlayerContextMenu";
import SelectedItem from "../components/SelectedItem";
import Snackbar from "../components/Snackbar";
import * as hotbarActions from "../store/hotbar/hotbar.actions";
import * as inventoryActions from "../store/inventory/inventory.actions";
import * as itemActions from "../store/item/item.actions";
import { showPause, removePause } from "../store/pause/pause.actions";

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
        justifyContent: "center",
        marginTop: "5%",
    },
    inventoryHide: {
        display: "none",
    },
}));

function InventoryContainer() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const pause = useSelector((state) => state.pause.show)
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory
    );
    const otherInventory = useSelector(
        (state) => state.inventory.otherInventory
    );
    const inventoryShow = useSelector((state) => state.inventory.inventoryShow);
    const info = useSelector((state) => state.inventory.info);
    const selectedItem = useSelector((state) => state.inventory.selectedItem);
    const boughtItem = useSelector((state) => state.inventory.boughtItem);
    const quantity = useSelector((state) => state.inventory.quantity);
    const inventoryType = useSelector(
        (state) => state.inventory.otherInventory.type
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const confirmation = useSelector((state) => state.inventory.confirmation);
    const contextItem = useSelector((state) => state.inventory.contextItem);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            switch (event.data.inventoryType) {
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(inventoryActions.loadPersonalInventory(data));
                    } else {
                        if (!event.data.closeInventory) {
                            const data = {
                                inventory: event.data.inventory,
                                playerInventory: event.data.playerInventory,
                                inventoryType: event.data.inventoryType,
                                info: event.data.info,
                            };
                            if (event.data.updateInventory) {
                                dispatch(
                                    inventoryActions.updateInventory(data)
                                );
                            } else {
                                dispatch(inventoryActions.loadInventory(data));
                            }
                        }
                    }
                    break;
                }
                case "Hotbar": {
                    if (event.data.hotbar) {
                        dispatch(hotbarActions.loadHotbar());
                    } else {
                        dispatch(hotbarActions.closeHotbar());
                    }
                    break;
                }
                case "Trunk": {
                    let payload = {};

                    payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.otherInventory,
                        info: event.data.carData,
                    };

                    dispatch(inventoryActions.loadOtherInventory(payload));
                    break;
                }
                case "Store": {
                    dispatch(
                        inventoryActions.loadStoreInventory(event.data.items)
                    );
                    break;
                }
                case "Property": {
                    let payload = {};

                    payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: event.data.otherInventory,
                        info: event.data.property,
                    };

                    dispatch(inventoryActions.loadOtherInventory(payload));

                    break;
                }

                case "Player": {
                    let payload = {};

                    payload = {
                        inventoryType: event.data.inventoryType,
                        inventory: event.data.inventory,
                        otherInventory: [],
                        info: event.data.info,
                    };

                    dispatch(
                        inventoryActions.loadOtherPlayerInventory(payload)
                    );
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

    const onStart = (e, index, type) => {
        let payload;

        if (type === "Personal") {
            payload = {
                item: personalInventory.inventory[index],
                index: index,
                type: type,
            };
        } else if (
            type === "Trunk" ||
            type === "Store" ||
            type === "Property" ||
            type === "Player"
        ) {
            payload = {
                item: otherInventory.inventory[index],
                index: index,
                type: type,
            };
        }

        if (e.button === 2) {
            if (type === "Personal") {
                setAnchorEl(e.currentTarget);
                dispatch(inventoryActions.openContextMenu(payload));
            // } else {
            //     setAnchorEl(e.currentTarget);
            }
        } else {
            dispatch(inventoryActions.selectInventoryItem(payload));
            dispatch(itemActions.setInfo(payload));
        }
    };

    //selectedItem.data is the full item object
    const onStop = (e, index, dropLocation) => {
        if (e.button !== 2 && index !== null) {
            console.log(index, selectedItem.index);
            if (index === selectedItem.index) {
                dispatch(itemActions.clearInfo());
                return;
            }
            if (dropLocation === "Personal") {
                const item = personalInventory.inventory[index];
                if (selectedItem.type === "Store") {
                    dispatch(itemActions.clearInfo());
                    dispatch(
                        inventoryActions.storeConfirmation(selectedItem.data)
                    );
                } else {
                    dispatch(itemActions.clearInfo());
                    dispatch(
                        inventoryActions.moveInventoryItem(
                            item,
                            personalInventory,
                            otherInventory,
                            selectedItem,
                            dropLocation,
                            index,
                            info
                        )
                    );
                }
            } else {
                const item = otherInventory.inventory[index];
                dispatch(itemActions.clearInfo());
                dispatch(
                    inventoryActions.moveInventoryItem(
                        item,
                        personalInventory,
                        otherInventory,
                        selectedItem,
                        dropLocation,
                        index,
                        info
                    )
                );
            }
            dispatch(showPause());
        
            setTimeout(() =>dispatch(removePause()),450)
        }
    };

    const closeFunction = (event) => {
        if (event.data.closeInventory) {
            dispatch(
                inventoryActions.closeInventory(
                    personalInventory,
                    otherInventory,
                    info,
                    inventoryType
                )
            );
            dispatch(inventoryActions.closeContextMenu());
            dispatch(hotbarActions.closeHotbar());
        }
    };

    const agreeHandlerStore = () => {
        dispatch(
            inventoryActions.storeConfirmationHandler(
                personalInventory,
                otherInventory,
                selectedItem,
                quantity,
                info,
                boughtItem
            )
        );
    };

    const agreeHandlerSplit = () => {
        // const item = contextItem.item;
        dispatch(
            inventoryActions.splitItemHandler({
                contextItem,
                quantity,
                personalInventory,
                otherInventory,
            })
        );
    };

    const disagreeHandler = () => {
        dispatch(inventoryActions.closeConfirmation());
    };

    const confirmationRenderer = () => {
        switch (confirmation.type) {
            case "Store":
                return (
                    <Confirmation
                        agreeHandler={agreeHandlerStore}
                        disagreeHandler={disagreeHandler}
                        selectedItem={selectedItem}
                    />
                );
                break;
            case "Drop":
                return (
                    <Confirmation
                        agreeHandler={agreeHandlerDrop}
                        disagreeHandler={disagreeHandler}
                        selectedItem={selectedItem}
                    />
                );
                break;
            case "Give":
                return (
                    <Confirmation
                        agreeHandler={agreeHandlerGive}
                        disagreeHandler={disagreeHandler}
                        selectedItem={selectedItem}
                    />
                );
                break;
            case "Split":
                return (
                    <Confirmation
                        agreeHandler={agreeHandlerSplit}
                        disagreeHandler={disagreeHandler}
                        selectedItem={selectedItem}
                    />
                );
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>
            {pause ? <Pause /> : <Fragment />}
            <Snackbar />
            <Grid
                className={classes.inventoryDisplay}
                style={{ visibility: inventoryShow ? "visible" : "hidden" }}
                container
            >
                {personalInventory.inventory.length > 0 ? (
                    <Fragment>
                        <InventoryView
                            inventory={personalInventory}
                            info={info}
                            onStart={onStart}
                            onStop={onStop}
                            isSecondInventory={false}
                        />
                        <InventoryView
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
                <PlayerContextMenu anchorEl={anchorEl} />
            </Grid>
            {confirmationRenderer()}
        </Fragment>
    );
}

export default InventoryContainer;
