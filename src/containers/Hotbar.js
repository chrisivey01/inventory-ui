import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

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
        transform: ["translate(0, -30px)"],
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

function Hotbar() {
    const classes = useStyles();
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory
    );
    const useIndex = useSelector((state) => state.inventory.useIndex);
    const hotbarShow = useSelector((state) => state.hotbar.hotbarShow);

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
                                key={i}
                                elevation={3}
                                className={
                                    i === useIndex
                                        ? classes.slotSelected
                                        : classes.slot
                                }
                            >
                                <Typography className={classes.slotNumberGrid}>
                                    {i + 1}
                                </Typography>
                                <Typography className={classes.countGrid}>
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

export default Hotbar;
