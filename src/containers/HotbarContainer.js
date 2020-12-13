import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Translate } from "@material-ui/icons";
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
        width: "100px",
        height: "100px",
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#F2F2F2",
        margin: "0px 3px 5px 3px",
        fontSize: 12,
        transform: ["translate(0, 0)"],
        transition: "250ms ease-in-out",
    },
    slotSelected: {
        transform: ["translate(0, -10px)"],
        width: "100px",
        height: "100px",
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#F2F2F2",
        margin: "0px 3px 5px 3px",
        fontSize: 12,
        transition: "250ms ease-in-out",
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
        width: "95%",
        letterSpacing: "1px",
        whiteSpace: "nowrap",
    },
    countGrid: {
        position: "absolute",
        right: "5px",
        top: "2.5px",
        height: "20%",
        userSelect: "none",
        border: "none",
        fontSize: 12,
    },
    slotNumberGrid: {
        position: "absolute",
        left: "2.5px",
        top: "2.5px",
        width: "15%",
        height: "15%",
        userSelect: "none",
        border: "none",
        backgroundColor: "rgba(34, 49, 63, 1)",
        borderRadius: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    images: {
        height: "inherit",
        width: "inherit",
        objectFit: "contain",
    },
}));

function fallbackSrc(ev) {
    ev.target.src = "./assets/no-item.png";
}

function HotbarContainer() {
    const classes = useStyles();
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory
    );
    const hotbarShow = useSelector((state) => state.hotbar.hotbarShow);
    const dispatch = useDispatch();

    const [inUse, setInUse] = React.useState(false);
    const [useIndex, setUseIndex] = React.useState();

    useEffect(() => {
        window.addEventListener("message", (e) => onMessage(e));
        return () => {
            window.removeEventListener("message", (e) => onMessage(e));
        };
    }, []);

    const onMessage = (e) => {
        if (e.data.useItem) {
            //USE ITEM section
            switch (e.data.useItem) {
                case "useItemOne": {
                    dispatch(inventoryActions.useInventoryItem(0));
                    setInUse(true);
                    setUseIndex(0);
                    setTimeout(() => setUseIndex(5), 500);
                    break;
                }
                case "useItemTwo": {
                    dispatch(inventoryActions.useInventoryItem(1));
                    setInUse(true);
                    setUseIndex(1);
                    setTimeout(() => setUseIndex(5), 500);
                    break;
                }
                case "useItemThree": {
                    dispatch(inventoryActions.useInventoryItem(2));
                    setInUse(true);
                    setUseIndex(2);
                    setTimeout(() => setUseIndex(5), 500);
                    break;
                }
                case "useItemFour": {
                    dispatch(inventoryActions.useInventoryItem(3));
                    setInUse(true);
                    setUseIndex(3);
                    setTimeout(() => setUseIndex(5), 500);
                    break;
                }
                case "useItemFive": {
                    dispatch(inventoryActions.useInventoryItem(4));
                    setInUse(true);
                    setUseIndex(4);
                    setTimeout(() => setUseIndex(5), 500);
                    break;
                }
                default:
                    return null;
            }
        } else {
            //UPDATE WEAPON AMMO for inventory display for client side.
            if (e.data.updateWeapon) {
                dispatch(inventoryActions.updateWeapon(e.data.weaponData));
            }

            if (e.data.updateItem) {
                //item
                dispatch(
                    inventoryActions.updateItem(
                        e.data.itemData,
                        personalInventory.sorted
                    )
                );
            }
        }
    };

    return (
        <Grid
            container
            className={classes.hotkeyBar}
            style={{ visibility: hotbarShow ? "visible" : "hidden" }}
        >
            {personalInventory.inventory ? (
                personalInventory.inventory.map((item, i) => {
                    if (i < 5) {
                        return (
                            <Paper
                                elevation={3}
                                className={
                                    inUse === true && i === useIndex
                                        ? classes.slotSelected
                                        : classes.slot
                                }
                            >
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
                                {item.count !== undefined ||
                                item.ammo !== undefined ||
                                item.money !== undefined ? (
                                    <img
                                        draggable="false"
                                        className={classes.images}
                                        src={"./assets/" + item.name + ".png"}
                                        onError={fallbackSrc}
                                    />
                                ) : (
                                    <Fragment />
                                )}

                                <Typography className={classes.name}>
                                    {item.label}
                                </Typography>
                            </Paper>
                        );
                    }
                })
            ) : (
                <Fragment />
            )}
        </Grid>
    );
}

export default HotbarContainer;
