import React, { Fragment } from "react";
import HotbarContainer from "./containers/Hotbar";
import InventoryContainer from "./containers/Inventory";
import Listener from "./containers/Listener";

function App() {
    return (
        <Fragment>
            <Listener/>
            <InventoryContainer />
            <HotbarContainer />
        </Fragment>
    );
}

export default App;
