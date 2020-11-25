import React, { Fragment } from "react";
import {
    ClickAwayListener,
    Grow,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function PlayerContextMenu({ anchorEl }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const openMenu = useSelector((state) => state.inventory.openMenu);
    const contextCoords = useSelector((state) => state.inventory.contextCoords);
    const dispatch = useDispatch();

    const handleClose = (event) => {
        dispatch(inventoryActions.closeMenu());
    };

    if (openMenu) {
        return (

                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        keepMounted
                        autoFocusItem={openMenu}
                        id="menu-list-grow"
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>

        );
    } else {
        return <Fragment />;
    }
}
