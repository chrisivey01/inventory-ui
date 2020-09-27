import React from "react";
import { makeStyles, MenuList, MenuItem, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    menu: {
        color: "#F2F2F2",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
}));

const Menu = () => {
    const classes = useStyles();

    return (
        <MenuList className={classes.menu} open>
            <MenuItem>Use</MenuItem>
            <MenuItem>Give</MenuItem>
            <MenuItem>Drop</MenuItem>
        </MenuList>
    );
};

export default Menu;
