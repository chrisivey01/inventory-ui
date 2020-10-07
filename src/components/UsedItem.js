import { Fade, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/inventory/inventory.actions";
const useStyles = makeStyles((theme) => ({
    grid: {
        bottom: 225,
        position: "absolute",
        overflow: "hidden",
        left: "50%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
        width: 96,
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.6)",
        height: 96,
    },
    slot: {
        width: 96,
        height: 96,
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    countGrid: {
        width: 25,
        overflow: "hidden",
        bottom: 0,
        position: "absolute",
        textAlign: "center",
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
    img: {
        height: "inherit",
        width: "inherit",
        objectFit: "contain",
        position: "absolute",
    },
    usedItem: {
        backgroundColor: "rgba(44,47,51,0.8)",
        borderRadius: 3,
    },
    textUsed: {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        fontSize: 12,
        height: "20%",
        userSelect: "none",
        border: "none",
        backgroundColor: "rgba(34, 49, 63, 1)",
        borderRadius: 3,
        border: "inset",
    },
    textCount: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "20%",
        userSelect: "none",
        border: "none",
    },
}));

function UsedItem() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const usedItem = useSelector((state) => state.inventory.usedItem);
    const show = useSelector((state) => state.inventory.show);
    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(actions.hideUseInventoryItem()),
            2000
        );
        return () => clearTimeout(timer);
    }, [usedItem]);
    return (
        <div>
            {usedItem.name ? (
                <Fade className={classes.grid} timeout={2000} in={show}>
                    <Paper className={classes.slot}>
                        {usedItem.count ? (
                            <Typography className={classes.textUsed}>
                                USED
                            </Typography>
                        ) : usedItem.ammo && usedItem.unequip ? (
                            <Typography className={classes.textUsed}>
                                UNEQUIP
                            </Typography>
                        ) : usedItem.ammo && usedItem.unequip === false ? (
                            <Typography className={classes.textUsed}>
                                EQUIP
                            </Typography>
                        ) : (
                            <Fragment />
                        )}

                        <img
                            draggable="false"
                            className={classes.img}
                            src={"./assets/" + usedItem.name + ".png"}
                        />

                        <Typography className={classes.name}>
                            {usedItem.label}
                        </Typography>
                    </Paper>
                </Fade>
            ) : (
                <Fragment />
            )}
        </div>
    );
}

export default UsedItem;
