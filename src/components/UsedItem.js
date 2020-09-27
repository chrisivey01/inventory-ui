import { Fade, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    grid: {
        bottom: 0,
        position: "absolute",
        overflow: "hidden",
        left: "50%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: 150,
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.6)",
        height: 110,
    },
    slot: {
        height: 120,
        margin: "auto",
        padding: theme.spacing(1),
        textAlign: "center",
        userSelect: "none",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    countGrid: {
        width: 25,
        overflow: "hidden",
        bottom: 0,
        position: "absolute",
        textAlign: "center",
    },
    name: {
        width: "100%",
        textAlign: "center",
        position: "absolute",
        paddingLeft: 5,
        paddingRight: 5,
        bottom: 0,
    },
    img: {
        height: 100,
        width: 100,
        objectFit: "contain",
        position: "absolute",
    },
    usedItem: {
        backgroundColor: "rgba(44,47,51,0.8)",
        borderRadius: 3,
    },
    textUsed: {
        paddingLeft: 5,
        paddingRight: 5,
    },
}));

function UsedItem() {
    const classes = useStyles();
    const usedItem = useSelector((state) => state.inventory.usedItem);
    const show = useSelector((state) => state.inventory.show);

    // useEffect(() => {
    //     setTimeout(() => dispatch(actions.hideUseInventoryItem()), 2000);
    // }, [show]);
    return (
        <div>
            {usedItem ? (
                <Fade className={classes.grid} in={show} timeout={2000}>
                    <Grid className={classes.slot}>
                        <Grid container justify={"space-between"}>
                            {usedItem.count ? (
                                <Typography className={classes.textUsed}>
                                    USED
                                </Typography>
                            ) : (
                                <Typography className={classes.textUsed}>
                                    EQUIP
                                </Typography>
                            )}
                            <Typography className={classes.textUsed}>
                                {usedItem.count}
                            </Typography>
                        </Grid>
                        <img
                            draggable="false"
                            className={classes.img}
                            src={"./assets/" + usedItem.name + ".png"}
                        />

                        <Typography className={classes.name}>
                            {usedItem.label}
                        </Typography>
                    </Grid>
                </Fade>
            ) : (
                <Fragment />
            )}
        </div>
    );
}

export default UsedItem;
