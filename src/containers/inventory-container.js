import React, { useState, useEffect } from "react";
import Inventory from "../components/inventory";
import Menu from "../components/menu";
import { makeStyles } from "@material-ui/core";
//store
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as actions from "../store/inventory.actions";
import * as selectors from "../store/inventory.selectors";
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

const InventoryContainer = (props) => {
    const [showHideToggler, setShowHideToggler] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.flattenedInventory)

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
                // Apis.useInventoryItem(inventory[0], 0);
                // console.log('test')
                dispatch(actions.useInventoryItem(0));
                break;
            }
            case "useItemTwo": {
                // Apis.useInventoryItem(inventory[1], 1);
                dispatch(actions.useInventoryItem(1));
                break;
            }
            case "useItemThree": {
                // Apis.useInventoryItem(inventory[2], 2);
                dispatch(actions.useInventoryItem(2));
                break;
            }
            case "useItemFour": {
                // Apis.useInventoryItem(inventory[3], 3);
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
                        //if not been flattened, you need to flatten the inventory
                        console.log(event.data)
                        if (event.data.nonFlattenedInventory && event.data.flattenedInventory.length === 0){
                            dispatch(
                                actions.loadPersonalInventory(
                                    event.data.nonFlattenedInventory
                                )
                            );
                        } else {
                        //if flattened, you need to update the inventory
                            dispatch(
                                actions.updateFlattenedPersonalInventory(
                                    event.data.nonFlattenedInventory, 
                                    event.data.flattenedInventory
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
                inventory={props.flattenedInventory}
                inventoryTitle={"Personal"}
                inventoryType={"personal"}
            />
            <Menu />
            <Inventory
                inventoryType={"store"}
                inventory={props.flattenedInventory}
            />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    flattenedInventory: selectors.getFlattenedInventory,
});

export default connect(mapStateToProps)(InventoryContainer);
