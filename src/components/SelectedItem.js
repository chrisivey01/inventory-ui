import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
    hover: {
        position: "absolute",
        width: "110px",
        height: "110px",
        pointerEvents: "none",
        border: "1px solid #eeeeee",
    },
    slot: {
        width: "110px",
        height: "110px",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#F2F2F2",
    },
    img: {
        userSelect: "none",
        width: "inherit",
        height: "inherit",
        objectFit: "contain",
    },
    countGrid: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "20%",
        userSelect: "none",
        width: 25,
        overflow: "hidden",
    },
    slotNumberGrid: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "20%",
        height: "20%",
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        bottom: 0,
        left: "50%",
        width: "100%",
        position: "absolute",
        transform: "translate(-50%, 0%)",
        backgroundColor: "rgba(44,47,51,0.1)",
    },
}));

const initialState = {
    mouseX: null,
    mouseY: null,
};

function fallbackSrc(ev) {
    ev.target.src = "./assets/no-item.png";
}

export default () => {
    const classes = useStyles();
    const [state, setState] = useState(initialState);
    const item = useSelector((state) => state.item.itemInfo);

    useEffect(() => {
        document.addEventListener(
            "mousemove",
            function (event) {
                event.preventDefault();
                setState({
                    mouseX: event.clientX,
                    mouseY: event.clientY,
                });
            },
            true
        );
    }, []);

    if (item.name) {
        return (
            <Paper
                className={classes.hover}
                style={
                    state.mouseY !== null && state.mouseX !== null
                        ? {
                              top: state.mouseY,
                              left: state.mouseX,
                              transform: "translate(-4vw, -12vh)",
                          }
                        : undefined
                }
            >
                <Grid className={classes.slot}>
                    <img
                        draggable="false"
                        className={classes.img}
                        src={"./assets/" + item.name + ".png"}
                        onError={fallbackSrc}
                    />
                    <Typography className={classes.countGrid}>
                        {item.count}
                    </Typography>

                    <Typography className={classes.name}>
                        {item.label}
                    </Typography>
                </Grid>
            </Paper>
        );
    } else {
        return <Fragment />;
    }
};
