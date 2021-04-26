import React, { Fragment } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    slot: {
        width: "110px",
        height: "110px",
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#F2F2F2",
        margin: "5px",
    },
    menu: {
        padding: theme.spacing(1),
        width: "5vw",
    },
    img: {
        width: "100%",
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
    div: {
        backgroundColor: "rgba(0,0,0,0.4)",
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
    onStart,
    onStop,
    onMouseOver,
    onMouseLeave,
    i,
    inventoryType,
    selectedType,
    item,
}) => {
    const classes = useStyles();

    return (
        <div>
            {
                <Paper
                    elevation={3}
                    className={classes.slot}
                    onMouseDown={(e) =>
                        onStart(e, i, inventoryType, selectedType, item.type)
                    }
                    onMouseUp={(e) =>
                        onStop(e, i, inventoryType, selectedType, item.type)
                    }
                    onMouseEnter={(e) => onMouseOver(e, i, inventoryType)}
                    onMouseLeave={(e) => onMouseLeave()}
                >
                    <Typography className={classes.countGrid}>
                        {item.price ? (
                            <span style={{ color: "green" }}>
                                $
                                {item.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        ) : (
                            <Fragment />
                        )}
                    </Typography>
                    {item.name != "" ? (
                        <img
                            draggable="false"
                            className={classes.images}
                            src={"./assets/" + item.name + ".png"}
                            onError={fallbackSrc}
                        />
                    ) : (
                        <img />
                    )}
                    <Typography className={classes.name}>
                        {item.label}
                    </Typography>
                </Paper>
            }
        </div>
    );
};
