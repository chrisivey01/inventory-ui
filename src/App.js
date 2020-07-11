import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import InventoryContainer from "./containers/InventoryContainer";
import { useDispatch } from "react-redux";
import { loadPersonalInventory } from "./store/inventory.actions";

const useStyles = makeStyles((theme) => ({
    inventory: {
        // width: "95%",
        // maxHeight: "100%",
        // height: "100%",
        // margin: 0,
        // overflowY: "auto",
        // overflowX: "visible",
        padding: theme.spacing(2),
    },
}));



const App = (props) => {
    const classes = useStyles();
    // const type = props.data ? props.data["Type"] : "";
    // const owner = props.data ? props.data.Owner : "";

    // const componentDisplay = (component) => {
    //     switch (component) {
    //         case "trunk":
    //             return <TrunkInventory />;
    //         case "search":
    //             return <SearchInventory />;
    //         case "house":
    //             return <HouseInventory />;
    //         case "store":
    //             return <StoreInventory />;
    //         default:
    //             return <PersonalInventory />;
    //     }
    // }
    // useEffect(() => {
    //     dispatch(actions.loadPersonalInventory)
    // },[])

    return (
        <div className={classes.inventory}>
            <InventoryContainer/>
        </div>
    );
};

export default App;
