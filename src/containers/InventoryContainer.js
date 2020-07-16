import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import Menu from "../components/Menu";
import { makeStyles } from "@material-ui/core";
//store
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as actions from "../store/inventory.actions";
import * as selectors from "../store/inventory.selectors";
import Apis from "../apis/apis";
import data from "../data/items.json";

const useStyles = makeStyles((theme) => ({
    inventoryDisplay: {
        display: "flex",
        height: "auto",
    },
}));

const InventoryContainer = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //need to put type of inventory here
    // useEffect(() => {
        // if (process.env.NODE_ENV === "development") {
        //     dispatch(actions.loadPersonalInventory(data));
        // } else {
        //     Apis.openInventory().then((data) =>
        //         dispatch(actions.loadPersonalInventory(data.json()))
        //     );
        // }
    // }, []);

    useEffect(() => {
        window.addEventListener("keydown", keyHandler)
        return () => {
            window.removeEventListener("keydown", keyHandler)
        }
    })

    const keyHandler = (e) => {
        switch(e.keyCode){
            case 49:
                dispatch(actions.useItemSlotOne());
                console.log("You pressed 1")
                break;
            case 50:
                dispatch(actions.useItemSlotTwo());
                console.log("You pressed 2")
                break;
            case 51:
                dispatch(actions.useItemSlotThree());
                console.log("You pressed 3")
                break;
            case 52:
                dispatch(actions.useItemSlotFour());
                console.log("You pressed 4")
                break;
            case 53:
                dispatch(actions.useItemSlotFive());
                console.log("You pressed 5")
                break;
            default:
                null
        }
    }

    return (
        <div className={classes.inventoryDisplay}>
            <Inventory
                inventory={props.inventoryData}
                inventoryTitle={"Personal"}
                inventoryType={"personal"}
            />
            <Menu />
            <Inventory
                inventory={props.inventoryData}
                inventoryType={"store"}
            />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    inventoryData: selectors.getInventoryData,
});

export default connect(mapStateToProps)(InventoryContainer);
