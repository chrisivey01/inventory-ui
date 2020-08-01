import React from "react";
import { makeStyles, Card, CardHeader, CardContent } from "@material-ui/core";
import InventorySlots from "./inventory-slots";

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

    const onStart = (e, i) => {
        dispatch(actions.selectInventoryItem(i));
    };

    const onStop = (e, i) => {
        dispatch(actions.moveInventoryItem(i));
    };

    return (
        <Card>
            <CardHeader title={props.inventoryTitle} />
            <CardContent className={classes.inventory}>
                {props.inventory.length > 0 ? props.inventory.map((item, i) => {
                    return (
                        <InventorySlots
                            key={i}
                            onStart={onStart}
                            onStop={onStop}
                            i={i}
                            item={item}
                            inventoryType={props.inventoryType}
                        />
                    );
                }): null}
            </CardContent>
        </Card>
    );
};

export default Inventory;
