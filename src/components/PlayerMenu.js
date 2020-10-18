import {
    Grid,
    makeStyles,
    MenuList,
    MenuItem,
    Typography,
    Paper,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    menu: {
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: 100,
        textAlign: "center",
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
}));

export default (props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.menu}>
            <Paper className={classes.paper}>
                <MenuList open>
                    <MenuItem>
                        <Typography variant="h6">Use</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography variant="h6">Give</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography variant="h6">Drop</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Grid>
    );
}