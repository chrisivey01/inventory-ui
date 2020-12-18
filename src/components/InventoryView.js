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

const personal = "Personal";
const trunk = "Trunk";
const store = "Store";
const property = "Property";
const player = "Player";

const PersonalInventory = ({
    inventory,
    anchorEl,
    onStart,
    onStop,
    isSecondInventory,
}) => {
    return (
        <Fragment>
            {inventory.inventory.map((item, i) => {
                return (
                    <InventorySlots
                        anchorEl={anchorEl}
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        i={i}
                        item={item}
                        inventoryType={inventory.type}
                        isSecondInventory={isSecondInventory}
                    />
                );
            })}
        </Fragment>
    );
};

const LargeInventory = ({inventory, onStart, onStop, isSecondInventory}) => {
    return (
        <Fragment>
            {inventory.inventory.map((item, i) => {
                return (
                    <InventorySlots
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        i={i}
                        item={item}
                        inventoryType={inventory.type}
                        isSecondInventory={isSecondInventory}
                    />
                );
            })}
        </Fragment>
    );
};

const Shop = ({ inventory, onStart, onStop }) => {
    return (
        <Fragment>
            {inventory.inventory.map((item, i) => {
                return (
                    <ShopSlots
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        i={i}
                        item={item}
                        inventoryType={inventory.type}
                    />
                );
            })}
        </Fragment>
    );
};

export default ({
    inventory,
    anchorEl,
    onStart,
    onStop,
    isSecondInventory,
}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <Typography variant="h4">{inventory.type}</Typography>
            </Grid>
            <Grid item className={classes.inventory}>
                {inventory.type === personal ? (
                    <PersonalInventory
                        inventory={inventory}
                        anchorEl={anchorEl}
                        onStart={onStart}
                        onStop={onStop}
                        isSecondInventory={isSecondInventory}
                    />
                ) : (
                    <Fragment />
                )}

                {inventory.type === trunk ||
                inventory.type === property ||
                inventory.type === player ? (
                    <LargeInventory
                        inventory={inventory}
                        onStart={onStart}
                        onStop={onStop}
                        isSecondInventory={isSecondInventory}
                    />
                ) : (
                    <Fragment />
                )}

                {inventory.type === store ? (
                    <Shop
                        inventory={inventory}
                        onStart={onStart}
                        onStop={onStop}
                        isSecondInventory={isSecondInventory}
                    />
                ) : (
                    <Fragment />
                )}
            </Grid>
        </Grid>
    );
};
