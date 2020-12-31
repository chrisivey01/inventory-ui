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
        borderRadius: 5,
    },
    inventory: {
        height: 695,
        overflow: "auto",
        left: 30,
        width: 695,
    },
    inventoryWrapper: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 10,
    },
}));

const personal = "Personal";
const trunk = "Trunk";
const store = "Store";
const property = "Property";
const player = "Player";
const job = "Job";

const PersonalInventory = ({
    inventory,
    anchorEl,
    onStart,
    onStop,
    isSecondInventory,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
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
        </div>
    );
};

const LargeInventory = ({ inventory, onStart, onStop, isSecondInventory }) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
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
        </div>
    );
};

const Shop = ({ inventory, onStart, onStop }) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
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
        </div>
    );
};

export default ({
    inventory,
    anchorEl,
    onStart,
    onStop,
    isSecondInventory,
    info,
}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                {inventory.type === personal ? (
                    <Typography variant="h5">
                        Capacity: {info.personal.weight}/{info.personal.maxWeight}
                    </Typography>
                ) : (
                    <Typography variant="h4">{inventory.title}</Typography>
                )}
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
                inventory.type === player ||
                inventory.type === job ? (
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
