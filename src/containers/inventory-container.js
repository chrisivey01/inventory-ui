import React, { useState, useEffect } from "react";
import Inventory from "../components/inventory";
import Menu from "../components/menu";
import { makeStyles } from "@material-ui/core";
//store
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/inventory.actions";
import data from "../data/items.json";

const useStyles = makeStyles((theme) => ({
    inventoryDisplay: {
        display: "flex",
        height: "auto",
        padding: theme.spacing(2),
        position: "relative",
    },
    inventoryHide: {
        display: "none",
    },
}));

function InventoryContainer() {
    const [showHideToggler, setShowHideToggler] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state.inventory.inventory);

    useEffect(() => {
        document.addEventListener("keydown", (e) => onKeyPress(e));
        return () => {
            document.removeEventListener("keydown", (e) => onKeyPress(e));
        };
    }, []);

    //Press ESC to close the application
    const onKeyPress = (e) => {
        if (e.keyCode === 27) {
            setShowHideToggler(false);
            dispatch(actions.closeInventory());
        }
    };

    //message/action handler from the service/client of lua
    useEffect(() => {
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);

    const onMessage = (e) => {
        switch (e.data.useItem) {
            case "useItemOne": {
                dispatch(actions.useInventoryItem(0));
                break;
            }
            case "useItemTwo": {
                dispatch(actions.useInventoryItem(1));
                break;
            }
            case "useItemThree": {
                dispatch(actions.useInventoryItem(2));
                break;
            }
            case "useItemFour": {
                dispatch(actions.useInventoryItem(3));
                break;
            }
            case "useItemFive": {
                dispatch(actions.useInventoryItem(4));
                break;
            }
            default:
                return null;
        }
    };

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.data.openInventory) {
                setShowHideToggler(true);
            }

            switch (event.data.inventoryType) {
                case "personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(actions.loadPersonalInventory(data));
                    } else {
                        if (event.data.inventory) {
                            dispatch(
                                actions.loadPersonalInventory(
                                    event.data.inventory
                                )
                            );
                        }
                    }
                }
                default:
                    return null;
            }
        });
    }, []);

    return (
        <div
            className={
                showHideToggler
                    ? classes.inventoryDisplay
                    : classes.inventoryHide
            }
        >
            <Inventory
                inventoryTitle={"Personal"}
                inventoryType={"personal"}
                inventory={inventory}
            />
            <Menu />
            <Inventory inventoryType={"store"} inventory={inventory} />
        </div>
    );
}

export default InventoryContainer;
