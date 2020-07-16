import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import InventoryContainer from "./containers/InventoryContainer";
import Apis from "./apis/apis";
import { useDispatch } from "react-redux";
import * as actions from "./store/inventory.actions";

const useStyles = makeStyles((theme) => ({
    inventory: {
        position: "relative",
        padding: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
}));

const App = () => {
    const [showHideToggler, setShowHideToggler] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    window.addEventListener("message", (event) => {
        if (event.data.openInventory) {
            setShowHideToggler(true);
        }

        switch (event.data.inventoryType) {
            case "personal": {
                dispatch(actions.loadPersonalInventory(event.data.inventory));
            }
            default:
                return null;
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 27) {
            setShowHideToggler(false);
            Apis.closeInventory();
        }
    });

    return (
        <div className={showHideToggler ? classes.inventory : classes.hide}>
            <InventoryContainer />
        </div>
    );
};

export default App;
