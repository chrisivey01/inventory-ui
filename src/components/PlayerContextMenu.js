import { Menu, MenuItem } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";

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
            inventoryActions.useItemHandler(
                contextItem,
                personalInventory,
                playerInfo
            )
        );
    };

    const handleDrop = () => {
        dispatch(
            inventoryActions.dropItemHandler(
                contextItem,
                personalInventory,
                playerInfo
            )
        );
    };

    const handleGive = () => {
        dispatch(
            inventoryActions.giveItemHandler(
                contextItem,
                personalInventory,
                playerInfo
            )
        );
    };

    const handleSplit = () => {
        dispatch(inventoryActions.showSplitConfirmation());
    };

    const contextMenuHandler = () => {

        if (contextItem.type === "Personal") {

            if (contextItem.item.type === "item_weapon") {
                return (
                    <Fragment>
                        <MenuItem onClick={handleUse}>Use</MenuItem>
                        <MenuItem onClick={handleDrop}>Drop</MenuItem>
                        <MenuItem onClick={handleGive}>Give</MenuItem>
                    </Fragment>
                );
            } else {
                if (contextItem.item.usable === true) {
                    return (
                        <Fragment>
                            <MenuItem onClick={handleUse}>Use</MenuItem>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                            <MenuItem onClick={handleSplit}>Split</MenuItem>
                        </Fragment>
                    );
                } else if (contextItem.item.count === 1) {
                    return (
                        <Fragment>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                        </Fragment>
                    );
                } else if (contextItem.item.count > 1 || contextItem.item.type === "item_account") {
                    return (
                        <Fragment>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                            <MenuItem onClick={handleSplit}>Split</MenuItem>
                        </Fragment>
                    );
                }
            }
        } else if ( contextItem.item.count > 1 || contextItem.item.type === "item_account") {
            return (
                <Fragment>
                    <MenuItem onClick={handleSplit}>Split</MenuItem>
                </Fragment>
            );
        }
    };

    if (openContextMenu && contextItem.item.type !== undefined && contextItem.type === "Personal") {
        return (
            <Menu
                anchorEl={anchorEl}
                open={openContextMenu}
                onClose={handleClose}
                keepMounted
                autoFocusItem={openContextMenu}
                id="menu-list-grow"
            >
                {contextMenuHandler()}
            </Menu>
        );
    } else if (openContextMenu && contextItem.item.type !== undefined && contextItem.type !== "Personal" && contextItem.item.type !== "item_weapon") {
        return (
            <Menu
                anchorEl={anchorEl}
                open={openContextMenu}
                onClose={handleClose}
                keepMounted
                autoFocusItem={openContextMenu}
                id="menu-list-grow"
            >
                {contextMenuHandler()}
            </Menu>
        );
    } else {
        return <Fragment />;
    }
}
