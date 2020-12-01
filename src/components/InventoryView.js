import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import InventorySlots from "./InventorySlots";
import ShopSlots from "./ShopSlots";

const useStyles = makeStyles((theme) => ({
    container: {
        color: "#F2F2F2",
        backgroundColor: "#33333385",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: 725,
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

const personal = "Personal";
const trunk = "Trunk";
const store = "Store";
const property = "Property";
const player = "Player";


const PersonalInventory = (props) => {
    return (
        <Fragment>
            {props.inventory.inventory.map((item, i) => {
                return (
                    <InventorySlots
                        anchorEl={props.anchorEl}
                        key={i}
                        onStart={props.onStart}
                        onStop={props.onStop}
                        i={i}
                        item={item}
                        inventoryType={props.inventory.type}
                        isSecondInventory={props.isSecondInventory}
                    />
                );
            })}
        </Fragment>
    );
};

const LargeInventory = (props) => {
    return (
        <Fragment>
            {props.inventory.inventory.map((item, i) => {
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
            })}
        </Fragment>
    );
};

const Shop = (props) => {
    return (
        <Fragment>
            {props.inventory.inventory.map((item, i) => {
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
            })}
        </Fragment>
    );
};

export default (props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <Typography variant="h4">{props.inventory.type}</Typography>
            </Grid>
            <Grid item className={classes.inventory}>
                {props.inventory.type === personal ? (
                    <PersonalInventory {...props} />
                ) : (
                    <Fragment />
                )}

                {props.inventory.type === trunk ||  props.inventory.type === property || props.inventory.type === player ? (
                    <LargeInventory {...props} />
                ) : (
                    <Fragment />
                )}

                {props.inventory.type === store ? (
                    <Shop {...props} />
                ) : (
                    <Fragment />
                )}
            </Grid>
        </Grid>
    );
};
