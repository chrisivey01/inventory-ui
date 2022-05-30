import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import InventorySlots from "./InventorySlots";
import ShopSlots from "./ShopSlots";
import StatsColoring from "./ItemStats/StatsColoring";

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
const motels = "Motels";
const gangs = "Gangs";
const restaurant = "Restaurant";
const apartment = "Apartment";
const secondary = "Secondary"


const PersonalInventory = ({
    onClick,
    inventory,
    anchorEl,
    onStart,
    onStop,
    onMouseOver,
    onMouseLeave,
    isSecondInventory,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
            {inventory.inventory.map((item, i) => {
                return (
                    <InventorySlots
                        onClick={onClick}
                        anchorEl={anchorEl}
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
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

const LargeInventory = ({
    onClick,
    inventory,
    onStart,
    onStop,
    onMouseOver,
    onMouseLeave,
    isSecondInventory,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
            {inventory.inventory.map((item, i) => {
                return (
                    <InventorySlots
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
                        i={i}
                        item={item}
                        inventoryType={inventory.type}
                        isSecondInventory={isSecondInventory}
                        onClick={onClick}
                    />
                );
            })}
        </div>
    );
};

const Shop = ({ inventory, onStart, onStop, onMouseOver, onMouseLeave }) => {
    const classes = useStyles();

    return (
        <div className={classes.inventoryWrapper}>
            {inventory.inventory.map((item, i) => {
                return (
                    <ShopSlots
                        key={i}
                        onStart={onStart}
                        onStop={onStop}
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
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
    onMouseOver,
    onMouseLeave,
    isSecondInventory,
    info,
    onClick
}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                {inventory.type === personal ? (
                    <StatsColoring
                        value={info.personal.weight}
                        stat={"weight"}
                        maxWeight={info.personal.maxWeight}
                    />
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
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
                        isSecondInventory={isSecondInventory}
                        onClick={onClick}
                    />
                ) : (
                    <Fragment />
                )}

                {inventory.type === trunk ||
                inventory.type === property ||
                inventory.type === player ||
                inventory.type === job ||
                inventory.type === restaurant ||
                inventory.type === motels ||
                inventory.type === gangs ||
                inventory.type === apartment ||
                inventory.type === secondary ? (
                    <LargeInventory
                        inventory={inventory}
                        onStart={onStart}
                        onStop={onStop}
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
                        isSecondInventory={isSecondInventory}
                        onClick={onClick}
                    />
                ) : (
                    <Fragment />
                )}

                {inventory.type === store ? (
                    <Shop
                        inventory={inventory}
                        onStart={onStart}
                        onStop={onStop}
                        onMouseOver={onMouseOver}
                        onMouseLeave={onMouseLeave}
                        isSecondInventory={isSecondInventory}
                        onClick={onClick}
                    />
                ) : (
                    <Fragment />
                )}
            </Grid>
        </Grid>
    );
};
