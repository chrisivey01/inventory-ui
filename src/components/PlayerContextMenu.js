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
    const openContextMenu = useSelector(
        (state) => state.inventory.openContextMenu
    );
    const contextItem = useSelector((state) => state.inventory.contextItem);
    const quantity = useSelector((state) => state.inventory.quantity);
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory.inventory
    );

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(inventoryActions.closeContextMenu());
    };

    const handleDrop = () => {
        dispatch(inventoryActions.showDropConfirmation())
    };

    const handleGive = () => {
        dispatch(inventoryActions.showGiveConfirmation())
    };

    const handleSplit = () => {
        dispatch(inventoryActions.showSplitConfirmation())
    };

    if (openContextMenu) {
        return (
            <Menu
                anchorEl={anchorEl}
                open={openContextMenu}
                onClose={handleClose}
                keepMounted
                autoFocusItem={openContextMenu}
                id="menu-list-grow"
            >
                <MenuItem onClick={handleDrop}>Drop</MenuItem>
                <MenuItem onClick={handleGive}>Give</MenuItem>
                <MenuItem onClick={handleSplit}>Split</MenuItem>
            </Menu>
        );
    } else {
        return <Fragment />;
    }
}
