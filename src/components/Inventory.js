import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";
import * as itemActions from "../store/item/item.actions";
import InventorySlots from "./InventorySlots";

const useStyles = makeStyles((theme) => ({
    container: {
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
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
        dispatch(inventoryActions.selectInventoryItemIndex(i));
        dispatch(inventoryActions.selectInventoryItem(props.inventory[i]));
        dispatch(itemActions.setInfo(props.inventory[i]));
    };

    const onStop = (e, i) => {
        dispatch(inventoryActions.moveInventoryItem(i));
        dispatch(inventoryActions.selectInventoryItem());
        dispatch(itemActions.clearInfo());
    };

    return (
        <Card className={classes.container}>
            <CardHeader title={props.inventoryTitle} />
            <CardContent className={classes.inventory}>
                {props.inventory ? (
                    props.inventory.map((item, i) => {
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
                    })
                ) : (
                    <Fragment />
                )}
            </CardContent>
        </Card>
    );
};

export default Inventory;
