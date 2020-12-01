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
        margin: "5px"
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

function fallbackSrc(ev){
	ev.target.src =  "./assets/no-item.png"
}

export default (props) => {
    const classes = useStyles();

    return (
        <div>
            {
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
                        {props.item.price ? (
                            <span style={{ color: "green" }}>
                                $
                                {props.item.price
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
						src={"./assets/" + props.item.name + ".png"}
						onError={fallbackSrc}
                    />
                    <Typography className={classes.name}>
                        {props.item.label}
                    </Typography>
                </Paper>
            }
        </div>
    );
};
