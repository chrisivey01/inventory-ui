import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import InventorySlots from "./InventorySlots";

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

function Inventory(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <Typography variant="h4">{props.inventoryType}</Typography>
            </Grid>
            <Grid item className={classes.inventory}>
                {props.inventory ? (
                    props.inventory.map((item, i) => {
                        return (
                            <InventorySlots
                                key={i}
                                onStart={props.onStart}
                                onStop={props.onStop}
                                i={i}
                                item={item}
                                inventoryType={props.inventoryType}
                                hasSecondInventory={props.hasSecondInventory}
                            />
                        );
                    })
                ) : (
                    <Fragment />
                )}
            </Grid>
        </Grid>
    );
}

export default Inventory;
