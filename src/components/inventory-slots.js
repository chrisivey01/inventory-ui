import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    slot: {
        width: "96px",
        height: "96px",
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(44,47,51,0.8)",
        "&:hover": {
            transform: ["scale(1.1)"],
        },
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
        height: "20%",
        width: "100%",
        position: "absolute",
        transform: "translate(-50%, 0%)",
        backgroundColor: "rgba(44,47,51,0.1)",
    },
    div: {
        backgroundColor: "rgba(44,47,51,0.1)",
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
    },
    images: {
        height: "inherit",
        width: "inherit",
        objectFit: "contain",
    },
}));

const InventorySlots = (props) => {
    const classes = useStyles();

    return (
        <div>
            {(() => {
                if (props.i < 5 && props.inventoryType === "personal") {
                    return (
                        <React.Fragment>
                            {props.item !== '{}' ? (
                                <Paper
                                    elevation={3}
                                    className={classes.slot}
                                    onMouseDown={(e) => props.onStart(e, props.i)}
                                    onMouseUp={(e) => props.onStop(e, props.i)}
                                >
                                    <Paper
                                        className={classes.slotNumberGrid}
                                        variant="outlined"
                                    >
                                        {props.i + 1}
                                    </Paper>
                                    <Paper
                                        className={classes.countGrid}
                                        variant="outlined"
                                    >
                                        {props.item.count}
                                    </Paper>
                                    <img
                                        draggable="false"
                                        className={classes.images}
                                        src={
                                            "./assets/" +
                                            props.item.name +
                                            ".png"
                                        }
                                    />
                                </Paper>
                            ) : (
                                <Paper
                                    elevation={3}
                                    className={classes.slot}
                                    onMouseDown={(e) => props.onStart(e, props.i)}
                                    onMouseUp={(e) => props.onStop(e, props.i)}

                                >
                                    <Paper
                                        className={classes.slotNumberGrid}
                                        variant="outlined"
                                    >
                                        {props.i + 1}
                                    </Paper>
                                </Paper>
                            )}
                        </React.Fragment>
                    );
                } else if (props.item !== "{}") {
                    return (
                        <Paper
                            elevation={3}
                            className={classes.slot}
                            onMouseDown={(e) => props.onStart(e, props.i)}
                            onMouseUp={(e) => props.onStop(e, props.i)}
                        >
                            <Paper
                                className={classes.countGrid}
                                variant="outlined"
                            >
                                {props.item.count}
                            </Paper>
                            <img
                                draggable="false"
                                className={classes.images}
                                src={"./assets/" + props.item.name + ".png"}
                            />
                        </Paper>
                    );
                } else {
                    return (
                        <Paper
                            elevation={3}
                            className={classes.slot}
                            onMouseDown={(e) => props.onStart(e, props.i)}
                            onMouseUp={(e) => props.onStop(e, props.i)}
                        />
                    );
                }
            })()}
        </div>
    );
};

export default InventorySlots;
