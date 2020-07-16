import React from "react";
import { makeStyles, MenuList, MenuItem, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Menu = () => {
    const classes = useStyles();

    return (
        <Paper>
            <MenuList className={classes.menu} open>
                <MenuItem>Use</MenuItem>
                <MenuItem>Give</MenuItem>
                <MenuItem>Drop</MenuItem>
            </MenuList>
        </Paper>
    );
};

export default Menu;
