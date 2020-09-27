import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
//store
import { useDispatch, useSelector } from "react-redux";
import Inventory from "../components/Inventory";
import Menu from "../components/Menu";
import SelectedItem from "../components/SelectedItem";
import data from "../data/items.json";
import * as actions from "../store/inventory/inventory.actions";

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(44, 62, 80, 1)',
          outline: '1px solid slategrey'
        },
    },
    inventoryDisplay: {
        display: "flex",
        height: "auto",
        padding: theme.spacing(2),
        position: "relative",
        justifyContent: "center",
        top: "90px",
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
    const inventoryType = useSelector((state) => state.inventory.inventoryType);

    const item = useSelector((state) => state.inventory.item);

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
                case "Personal": {
                    if (process.env.NODE_ENV === "development") {
                        dispatch(actions.loadPersonalInventory(data));
                    } else {
                        if (event.data.inventory) {
                            const payload = {
                                inventory: event.data.inventory,
                                inventoryType: event.data.inventoryType,
                            };
                            dispatch(actions.loadPersonalInventory(payload));
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
            <SelectedItem />
            <Inventory
                inventoryTitle={inventoryType}
                inventoryType={inventoryType}
                inventory={inventory}
            />
            <Menu />
            <Inventory />
        </div>
    );
}

export default InventoryContainer;
