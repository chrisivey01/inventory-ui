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
                    <div>
                        <MenuItem onClick={handleUse}>Use</MenuItem>
                        <MenuItem onClick={handleDrop}>Drop</MenuItem>
                        <MenuItem onClick={handleGive}>Give</MenuItem>
                    </div>
                );
            } else {
                if (contextItem.item.usable === true) {
                    return (
                        <div>
                            <MenuItem onClick={handleUse}>Use</MenuItem>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                            <MenuItem onClick={handleSplit}>Split</MenuItem>
                        </div>
                    );
                } else if (contextItem.item.count === 1) {
                    return (
                        <div>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                        </div>
                    );
                } else if (
                    contextItem.item.count > 1 ||
                    contextItem.item.type === "item_account"
                ) {
                    return (
                        <div>
                            <MenuItem onClick={handleDrop}>Drop</MenuItem>
                            <MenuItem onClick={handleGive}>Give</MenuItem>
                            <MenuItem onClick={handleSplit}>Split</MenuItem>
                        </div>
                    );
                }
            }
        } else if (
            contextItem.item.count > 1 ||
            contextItem.item.type === "item_account"
        ) {
            return (
                <div>
                    <MenuItem onClick={handleSplit}>Split</MenuItem>
                </div>
            );
        }
    };

    if (contextItem.item) {
        return (
            <Menu
                anchorEl={anchorEl}
                open={openContextMenu}
                onClose={handleClose}
                keepMounted
                id="menu-list-grow"
            >
                {contextMenuHandler()}
            </Menu>
        );
    } else {
        return <Fragment />;
    }
}
