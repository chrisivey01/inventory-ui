import React from "react";
import { makeStyles, MenuList, MenuItem, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Menu = () => {
    const classes = useStyles();

    const actionHandler = (event) => {
        switch (event.target.id) {
            case "split": {
                console.log("use");
            }
            case "give": {
                console.log("give");
            }
            case "drop": {
                console.log("drop");
            }
        }
    };

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
