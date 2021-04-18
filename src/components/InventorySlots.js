import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
    slot: {
        width: 110,
        height: 110,
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#F2F2F2",
        margin: "0px 3px 5px 3px",
        fontSize: 12,
    },
    menu: {
        padding: theme.spacing(2),
        width: "5vw",
    },
    img: {
        width: "100%",
    },
    name: {
        bottom: 0,
        left: "50%",
        width: "95%",
        position: "absolute",
        transform: "translate(-50%, 0%)",
        backgroundColor: "rgba(0,0,0,0.6)",
        fontSize: 12,
        letterSpacing: "1px",
        padding: "0px 5px 0px 0px",
    },
    div: {
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    countGrid: {
        position: "absolute",
        right: "5px",
        top: "2.5px",
        fontSize: 12,
        height: "20%",
        letterSpacing: "1.25px",
        userSelect: "none",
        border: "none",
    },
    slotNumberGrid: {
        position: "absolute",
        left: "2.5px",
        top: "2.5px",
        width: "20%",
        height: "20%",
        userSelect: "none",
        border: "none",
        backgroundColor: "rgba(34, 49, 63, 1)",
        borderRadius: 3,
        fontSize: 12,
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
export default ({
    isSecondInventory,
    inventoryType,
    i,
    item,
    onStart,
    onStop,
    selectedType,
}) => {
    const classes = useStyles();

    const renderSlots = () => {
        return (
            <Fragment>
                {item !== "{}" ? (
                    <Fragment>
                        {i < 5 && inventoryType === "Personal" ? (
                            <Typography
                                className={classes.slotNumberGrid}
                            >
                                {i + 1}
                            </Typography>
                        ) : (
                            <Fragment />
                        )}
                        <Typography
                            className={classes.countGrid}
                        >
                            {item.ammo ? item.ammo : <Fragment />}
                            {item.count ? item.count : <Fragment />}
                            {item.money ? (
                                <span style={{ color: "green" }}>
                                    $
                                    {item.money
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                            ) : (
                                <Fragment />
                            )}
                        </Typography>
                        <img
                            draggable="false"
                            className={classes.images}
                            src={"./assets/" + item.name + ".png"}
                            onError={fallbackSrc}
                        />
                        <Typography className={classes.name}>
                            {item.label}
                        </Typography>
                    </Fragment>
                ) : (
                    <Fragment>
                        {i < 5 && inventoryType === "Personal" ? (
                            <Typography
                                className={classes.slotNumberGrid}
                            >
                                {i + 1}
                            </Typography>
                        ) : (
                            <Fragment />
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    };

    return (
        <Paper
            elevation={3}
            className={classes.slot}
            onMouseDown={(e) =>
                onStart(e, i, inventoryType, selectedType, item.type)
            }
            onMouseUp={(e) =>
                onStop(e, i, inventoryType, selectedType, item.type)
            }
        >
            {renderSlots()}
        </Paper>
    );
};
