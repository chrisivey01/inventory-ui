import { Grid, makeStyles } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confirmation from "../components/Confirmation";
import InventoryView from "../components/InventoryView";
import Pause from "../components/Pause";
import PlayerContextMenu from "../components/PlayerContextMenu";
import SelectedItem from "../components/SelectedItem";
import Snackbar from "../components/Snackbar";
import * as inventoryActions from "../store/inventory/inventory.actions";
import * as itemActions from "../store/item/item.actions";
import { removePause, showPause } from "../store/pause/pause.actions";

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

    const pause = useSelector((state) => state.pause.show);
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
    const [anchorEl, setAnchorEl] = useState(null);
    const confirmation = useSelector((state) => state.inventory.confirmation);
    const contextItem = useSelector((state) => state.inventory.contextItem);

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
            }
        } else {
            dispatch(inventoryActions.selectInventoryItem(payload));
            dispatch(itemActions.setInfo(payload));
        }
    };

    //selectedItem.data is the full item object
    const onStop = (e, index, dropLocation) => {
        if (e.button !== 2 && index !== null) {
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
            setTimeout(() => dispatch(removePause()), 450);
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
