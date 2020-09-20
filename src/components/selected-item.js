import React, { Fragment, useEffect } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Img from "react-image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    hover: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "6vw",
        pointerEvents: "none",
    },
    slot: {
        width: "100%",
        height: 120,
        padding: theme.spacing(1),
        position: "relative",
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(44,47,51,0.8)",
    },
    img: {
        width: "100%",
        userSelect: "none",
    },
    countGrid: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "20%",
        userSelect: "none",
    },
    paper: {
        backgroundColor: "rgba(44,47,51,0.1)",
    },
    slotNumberGrid: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "20%",
        height: "20%",
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
}));

const initialState = {
    mouseX: null,
    mouseY: null,
};

const selectedItem = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState);
    const item = useSelector((state) => state.item.itemInfo);

    // const hover = useSelector((state) => state.inventory.hoverItem);
    // const iD = useSelector((state) => state.itemData.info);

    // const itemData = () => {
    //     return iD[hover.data.item.Id] ? iD[hover.data.item.Id] : {};
    // };
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
            <Grid
                container
                className={classes.hover}
                style={
                    state.mouseY !== null && state.mouseX !== null
                        ? {
                              top: state.mouseY,
                              left: state.mouseX,
                              transform: "translate(-5vw, -10vh)",
                          }
                        : undefined
                }
            >
                <Paper className={classes.slot}>
                    <img
                        draggable="false"
                        className={classes.img}
                        src={"./assets/" + item.name + ".png"}
                    />
                    <Paper className={classes.countGrid} variant="outlined">
                        {item.count}
                    </Paper>

                    <Paper className={classes.name}>{item.name}</Paper>
                </Paper>
            </Grid>
        );
    } else {
        return <Fragment />;
    }
};

export default selectedItem;