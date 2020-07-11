import React from "react";
import { makeStyles, Card, CardHeader, CardContent } from "@material-ui/core";
import InventorySlots from "./InventorySlots";

import { useDispatch } from "react-redux";
import * as actions from "../store/inventory.actions";

const useStyles = makeStyles((theme) => ({
    inventory: {
        display: "flex",
        maxHeight: "565px",
        width: "600px",
        flexWrap: "wrap",
        overflow: "auto",
    },
}));

const Inventory = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const onDragStart = (e, i) => {
        dispatch(actions.selectInventoryItem(i));
    };

    const onDragOver = (e, i) => {
        e.preventDefault();
    };

    const onDrop = (e, i) => {
        dispatch(actions.swapPositionsInventory(i));
    };

    return (
        <Card>
            <CardHeader title={"Personal Inventory"} />
            <CardContent className={classes.inventory}>
                {props.inventory.flattenedInventory.map((item, i) => {
                    return (
                        <InventorySlots
                            key={i}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            i={i}
                            item={item}
                            inventoryType={props.inventoryType}
                        />
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default Inventory;
