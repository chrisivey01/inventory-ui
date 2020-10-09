import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
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

function InventoryContainer(props) {
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

    //message/action handler from the service/client of lua

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
        if (event.which === 27 || event.which === 113) {
            dispatch(
                inventoryActions.closeInventory(
                    sortedInventory,
                    secondInventory
                )
            );
            dispatch(hotbarActions.closeHotbar());
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", closeFunction);
        return () => window.removeEventListener("keydown", closeFunction);
    }, []);

    return (
        <Grid className={classes.inventoryDisplay} container>
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
