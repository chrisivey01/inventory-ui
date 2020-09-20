import React from "react";
import { makeStyles, Card, CardHeader, CardContent } from "@material-ui/core";
import InventorySlots from "./inventory-slots";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";
import * as itemActions from "../store/item/item.actions";

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
        <Card>
            <CardHeader title={props.inventoryTitle} />
            <CardContent className={classes.inventory}>
                {props.inventory.length > 0
                    ? props.inventory.map((item, i) => {
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
                    : null}
            </CardContent>
        </Card>
    );
};

export default Inventory;
