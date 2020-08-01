import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import InventoryContainer from "./containers/inventory-container";
import Apis from "./apis/apis";
import { useDispatch } from "react-redux";
import * as actions from "./store/inventory.actions";
import data from "./data/items.json";

const App = () => {
    return (
        <div>
            <InventoryContainer />
        </div>
    );
};

export default App;
