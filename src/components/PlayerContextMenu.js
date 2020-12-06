import React, { Fragment } from "react";
import { Menu, MenuItem } from "@material-ui/core";
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

export default function PlayerContextMenu({ anchorEl, dropHandler }) {
    const openContextMenu = useSelector(
        (state) => state.inventory.openContextMenu
    );
    const contextItem = useSelector((state) => state.inventory.contextItem);
    const personalInventory = useSelector(
        (state) => state.inventory.personalInventory.inventory
    );
    const playerInfo = useSelector((state) => state.inventory.info.personal);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(inventoryActions.closeContextMenu());
    };

    const handleUse = () => {
        dispatch(
            inventoryActions.useItemHandler(contextItem, personalInventory, playerInfo)
        );
    };

    const handleDrop = () => {
        dispatch(
            inventoryActions.dropItemHandler(contextItem, personalInventory, playerInfo)
        );
    };

    const handleGive = () => {
        dispatch(
            inventoryActions.giveItemHandler(contextItem, personalInventory, playerInfo)
        );
    };

    const handleSplit = () => {
        dispatch(inventoryActions.showSplitConfirmation());
    };
    if (openContextMenu && contextItem.item.type !== undefined) {
        return (
            <Menu
                anchorEl={anchorEl}
                open={openContextMenu}
                onClose={handleClose}
                keepMounted
                autoFocusItem={openContextMenu}
                id="menu-list-grow"
            >
                <Fragment />
                {contextItem.item.type === "item_weapon" ||
                contextItem.item.usable ? (
                    <MenuItem onClick={handleUse}>Use</MenuItem>
                ) : (
                    <Fragment />
                )}
                <MenuItem onClick={handleDrop}>Drop</MenuItem>
                <MenuItem onClick={handleGive}>Give</MenuItem>
                {contextItem.item.type === "item_standard" ||
                contextItem.item.type == "item_account" ? (
                    <MenuItem onClick={handleSplit}>Split</MenuItem>
                ) : (
                    <Fragment />
                )}
            </Menu>
        );
    } else {
        return <Fragment />;
    }
}
