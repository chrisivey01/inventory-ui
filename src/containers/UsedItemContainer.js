import { Fade, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideUseInventoryItem } from "../store/inventory/inventory.actions";
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
        fontSize: 11,
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
        padding: 3,
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

export default () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const usedItem = useSelector((state) => state.inventory.usedItem);
    const [showItem, setShowItem] = useState(false);
    const itemPopupHandler = () => {
        if (usedItem.data) {
            if (usedItem.data.count) {
                return (
                    <Typography className={classes.textUsed}>USED</Typography>
                );
            } else if (
                usedItem.data.type === "item_weapon" &&
                !usedItem.equipWeapon
            ) {
                return (
                    <Typography className={classes.textUsed}>
                        UNEQUIP
                    </Typography>
                );
            } else if (
                usedItem.data.type === "item_weapon" &&
                usedItem.equipWeapon
            ) {
                return (
                    <Typography className={classes.textUsed}>EQUIP</Typography>
                );
            } else {
                return <Fragment />;
            }
        }
    };

    useEffect(() => {
        setShowItem(true);

        setTimeout(() => {
            setShowItem(false);
        }, 2000);
    }, [usedItem]);

    if (usedItem.data) {
        return (
            <Fade className={classes.grid} timeout={2000} in={showItem}>
                <Paper className={classes.slot}>
                    {itemPopupHandler()}
                    <img
                        draggable="false"
                        className={classes.img}
                        src={"./assets/" + usedItem.data.name + ".png"}
                    />
                    <Typography className={classes.name}>
                        {usedItem.data.label}
                    </Typography>
                </Paper>
            </Fade>
        );
    } else {
        return <></>;
    }
};
