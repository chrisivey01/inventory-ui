import React, { useEffect } from "react";
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
        userSelect: "none",
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
    paper: {
        backgroundColor: "rgba(44,47,51,0.1)",
    },
    countGrid: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "20%",
        userSelect: "none",
    },
    slotNumberGrid: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "20%",
        height: "20%",
        userSelect: "none",
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
                            {props.item ? (
                                <Paper elevation={3} className={classes.slot}>
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
                                        {props.i}
                                    </Paper>
                                    <img
                                        className={classes.images}
                                        draggable="true"
                                        onDragStart={(e) =>
                                            props.onDragStart(e, props.i)
                                        }
                                        onDragOver={(e) =>
                                            props.onDragOver(e, props.i)
                                        }
                                        onDrop={(e) => props.onDrop(e, props.i)}
                                        src={
                                            "src/assets/" +
                                            props.item.name +
                                            ".png"
                                        }
                                    />
                                </Paper>
                            ) : (
                                <Paper
                                    draggable="true"
                                    onDragStart={(e) =>
                                        props.onDragStart(e, props.i)
                                    }
                                    onDragOver={(e) =>
                                        props.onDragOver(e, props.i)
                                    }
                                    onDrop={(e) => props.onDrop(e, props.i)}
                                    elevation={3}
                                    className={classes.slot}
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
                } else if (props.item) {
                    return (
                        <Paper elevation={3} className={classes.slot}>
                            <img
                                className={classes.images}
                                draggable="true"
                                onDragStart={(e) =>
                                    props.onDragStart(e, props.i)
                                }
                                onDragOver={(e) => props.onDragOver(e, props.i)}
                                onDrop={(e) => props.onDrop(e, props.i)}
                                src={"src/assets/" + props.item.name + ".png"}
                            />
                        </Paper>
                    );
                } else {
                    return (
                        <Paper
                            draggable="true"
                            onDragStart={(e) => props.onDragStart(e, props.i)}
                            onDragOver={(e) => props.onDragOver(e, props.i)}
                            onDrop={(e) => props.onDrop(e, props.i)}
                            elevation={3}
                            className={classes.slot}
                        ></Paper>
                    );
                }
            })()}
        </div>
    );
};

export default InventorySlots;
