import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";

const useStyles = makeStyles((theme) => ({
    hotkeyBar: {
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        width: "99%",
    },
    slot: {
        width: "96px",
        height: "96px",
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        "&:hover": {
            transform: ["scale(1.1)"],
        },
        color: "#F2F2F2",
    },
    name: {
        bottom: 0,
        left: "50%",
        width: "inherit",
        position: "absolute",
        transform: "translate(-50%, 0%)",
        backgroundColor: "rgba(0,0,0,0.4)",
        fontSize: 12,
        padding: "0px 5px 0px 0px",
    },
    countGrid: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "20%",
        userSelect: "none",
        border: "none",
    },
    slotNumberGrid: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "20%",
        height: "20%",
        userSelect: "none",
        border: "none",
        backgroundColor: "rgba(34, 49, 63, 1)",
        borderRadius: 3,
        border: "inset",
    },
    images: {
        height: "inherit",
        width: "inherit",
        objectFit: "contain",
    },
}));

function HotbarContainer() {
    const classes = useStyles();
    const sortedInventory = useSelector((state) => state.inventory.sortedInventory);
    const showHotbar = useSelector((state) => state.hotbar.showHotbar);
    const dispatch = useDispatch();


    useEffect(() => {
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);


    const onMessage = (e) => {
        if(e.data.useItem) {
            //USE ITEM section
            switch (e.data.useItem) {
                case "useItemOne": {
                    dispatch(inventoryActions.useInventoryItem(0));
                    break;
                }
                case "useItemTwo": {
                    dispatch(inventoryActions.useInventoryItem(1));
                    break;
                }
                case "useItemThree": {
                    dispatch(inventoryActions.useInventoryItem(2));
                    break;
                }
                case "useItemFour": {
                    dispatch(inventoryActions.useInventoryItem(3));
                    break;
                }
                case "useItemFive": {
                    dispatch(inventoryActions.useInventoryItem(4));
                    break;
                }
                default:
                    return null;
            }
        } else {
            //UPDATE WEAPON AMMO for inventory display for client side.
            if(e.data.updateWeapon){
                //weapon
                dispatch(inventoryActions.updateWeapon(e.data.weaponData));
            }

            if(e.data.updateItem){
                //item
                dispatch(inventoryActions.updateItem(e.data.itemData, sortedInventory));
            }

        }
    };


    return (
        <Grid
            container
            className={classes.hotkeyBar}
            style={{ visibility: showHotbar ? "visible" : "hidden" }}
        >
            {sortedInventory.map((item, i) => {
                if (i < 5) {
                    return (
                        <Paper elevation={3} className={classes.slot}>
                            <Typography
                                className={classes.slotNumberGrid}
                                variant="outlined"
                            >
                                {i + 1}
                            </Typography>
                            <Typography
                                className={classes.countGrid}
                                variant="outlined"
                            >
                                {item.ammo ? item.ammo : <Fragment />}
                                {item.count ? item.count : <Fragment />}
                                {item.money ? (
                                    <span style={{ color: "green" }}>
                                        $
                                        {item.money
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                    </span>
                                ) : (
                                    <Fragment />
                                )}
                            </Typography>
                            <img
                                draggable="false"
                                className={classes.images}
                                src={"./assets/" + item.name + ".png"}
                            />
                            <Typography className={classes.name}>
                                {item.label}
                            </Typography>
                        </Paper>
                    );
                }
            })}
        </Grid>
    );
}

export default HotbarContainer;
