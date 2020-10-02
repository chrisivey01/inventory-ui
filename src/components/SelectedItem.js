import { makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    hover: {
        position: "absolute",
        width: "6vw",
        pointerEvents: "none",
    },
    slot: {
        width: 116,
        height: 120,
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(44,47,51,0.8)",
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

function SelectedItem(props){
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
            <Paper
                container
                className={classes.hover}
                style={
                    state.mouseY !== null && state.mouseX !== null
                        ? {
                              top: state.mouseY,
                              left: state.mouseX,
                              transform: "translate(-3vw, -15vh)",
                          }
                        : undefined
                }
            >
                <Grid className={classes.slot}>
                    <img
                        draggable="false"
                        className={classes.img}
                        src={"./assets/" + item.name + ".png"}
                    />
                    <Typography
                        className={classes.countGrid}
                        variant="outlined"
                    >
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

export default SelectedItem;
