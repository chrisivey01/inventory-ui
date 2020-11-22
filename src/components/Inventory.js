import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import InventorySlots from "./InventorySlots";
import ShopSlots from "./ShopSlots";

const useStyles = makeStyles((theme) => ({
    container: {
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        flexWrap: "wrap",
        width: 760,
    },
    inventory: {
        display: "flex",
        height: 695,
        flexWrap: "wrap",
        overflow: "auto",
        position: "relative",
        left: 30,
        width: 695,
    },
}));

export default (props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <Typography variant="h4">{props.inventory.type}</Typography>
            </Grid>
            <Grid item className={classes.inventory}>
                {props.inventory ? (
                    props.inventory.type !== "Store" ? (
                        props.inventory.inventory.map((item, i) => {
                            return (
                                <InventorySlots
                                    key={i}
                                    onStart={props.onStart}
                                    onStop={props.onStop}
                                    i={i}
                                    item={item}
                                    inventoryType={props.inventory.type}
                                    isSecondInventory={props.isSecondInventory}
                                />
                            );
                        })
                    ) : (
                        <Fragment />
                    )
                ) : (
                    props.inventory.inventory.map((item, i) => {
                        return (
                            <ShopSlots
                                key={i}
                                onStart={props.onStart}
                                onStop={props.onStop}
                                i={i}
                                item={item}
                                inventoryType={props.inventory.type}
                            />
                        );
                    })
                )}
            </Grid>
        </Grid>
    );
};
