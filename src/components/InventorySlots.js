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

export default (props) => {
    const classes = useStyles();

    return (
        <div>
            {(() => {
                if (!props.isSecondInventory) {
                    if (props.i < 5 && props.inventoryType === "Personal") {
                        return (
                            <React.Fragment>
                                {props.item !== "{}" ? (
                                    <Paper
                                        elevation={3}
                                        className={classes.slot}
                                        onMouseDown={(e) =>
                                            props.onStart(
                                                e,
                                                props.i,
                                                props.inventoryType,
                                                props.selectedType,
                                                props.item.type
                                            )
                                        }
                                        onMouseUp={(e) =>
                                            props.onStop(
                                                e,
                                                props.i,
                                                props.inventoryType,
                                                props.selectedType,
                                                props.item.type
                                            )
                                        }
                                    >
                                        <Typography
                                            className={classes.slotNumberGrid}
                                            variant="outlined"
                                        >
                                            {props.i + 1}
                                        </Typography>
                                        <Typography
                                            className={classes.countGrid}
                                            variant="outlined"
                                        >
                                            {props.item.ammo ? (
                                                props.item.ammo
                                            ) : (
                                                <Fragment />
                                            )}
                                            {props.item.count ? (
                                                props.item.count
                                            ) : (
                                                <Fragment />
                                            )}
                                            {props.item.money ? (
                                                <span
                                                    style={{ color: "green" }}
                                                >
                                                    $
                                                    {props.item.money
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
                                            src={
                                                "./assets/" +
                                                props.item.name +
                                                ".png"
                                            }
                                        />
                                        <Typography className={classes.name}>
                                            {props.item.label}
                                        </Typography>
                                    </Paper>
                                ) : (
                                    <Paper
                                        elevation={3}
                                        className={classes.slot}
                                        onMouseDown={(e) =>
                                            props.onStart(
                                                e,
                                                props.i,
                                                props.inventoryType,
                                                props.selectedType,
                                                props.item.type
                                            )
                                        }
                                        onMouseUp={(e) =>
                                            props.onStop(
                                                e,
                                                props.i,
                                                props.inventoryType,
                                                props.selectedType,
                                                props.item.type
                                            )
                                        }
                                    >
                                        <Typography
                                            className={classes.slotNumberGrid}
                                            variant="outlined"
                                        >
                                            {props.i + 1}
                                        </Typography>
                                    </Paper>
                                )}
                            </React.Fragment>
                        );
                    } else if (props.item !== "{}") {
                        return (
                            <Paper
                                elevation={3}
                                className={classes.slot}
                                onMouseDown={(e) =>
                                    props.onStart(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                                onMouseUp={(e) =>
                                    props.onStop(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                            >
                                <Typography
                                    className={classes.countGrid}
                                    variant="outlined"
                                >
                                    {props.item.ammo ? (
                                        props.item.ammo
                                    ) : (
                                        <Fragment />
                                    )}
                                    {props.item.count ? (
                                        props.item.count
                                    ) : (
                                        <Fragment />
                                    )}
                                    {props.item.money ? (
                                        <span style={{ color: "green" }}>
                                            {" "}
                                            $
                                            {props.item.money
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
                                    src={"./assets/" + props.item.name + ".png"}
                                />
                                <Typography className={classes.name}>
                                    {props.item.label}
                                </Typography>
                            </Paper>
                        );
                    } else {
                        return (
                            <Paper
                                elevation={3}
                                className={classes.slot}
                                onMouseDown={(e) =>
                                    props.onStart(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                                onMouseUp={(e) =>
                                    props.onStop(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                            />
                        );
                    }
                } else {
                    if (props.item !== "{}") {
                        return (
                            <Paper
                                elevation={3}
                                className={classes.slot}
                                onMouseDown={(e) =>
                                    props.onStart(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                                onMouseUp={(e) =>
                                    props.onStop(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                            >
                                <Typography
                                    className={classes.countGrid}
                                    variant="outlined"
                                >
                                    {props.item.ammo ? (
                                        props.item.ammo
                                    ) : (
                                        <Fragment />
                                    )}
                                    {props.item.count ? (
                                        props.item.count
                                    ) : (
                                        <Fragment />
                                    )}
                                    {props.item.money ? (
                                        <span style={{ color: "green" }}>
                                            {" "}
                                            $
                                            {props.item.money
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
                                    src={"./assets/" + props.item.name + ".png"}
                                />
                                <Typography className={classes.name}>
                                    {props.item.label}
                                </Typography>
                            </Paper>
                        );
                    } else {
                        return (
                            <Paper
                                elevation={3}
                                className={classes.slot}
                                onMouseDown={(e) =>
                                    props.onStart(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                                onMouseUp={(e) =>
                                    props.onStop(
                                        e,
                                        props.i,
                                        props.inventoryType,
                                        props.selectedType,
                                        props.item.type
                                    )
                                }
                            />
                        );
                    }
                }
            })()}
        </div>
    );
};
