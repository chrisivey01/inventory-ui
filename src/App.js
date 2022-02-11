import React, { Fragment } from "react";
import Hotbar from "./containers/Hotbar";
import Inventory from "./containers/Inventory";
import Listener from "./containers/Listener";
import UsedItemContainer from "./containers/UsedItemContainer";

function App() {
    return (
        <Fragment>
            <Listener />
            <UsedItemContainer />
            <Inventory />
            <Hotbar />
        </Fragment>
    );
}

export default App;
