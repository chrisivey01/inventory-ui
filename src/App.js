import React, { Fragment } from "react";
import HotbarContainer from "./containers/HotbarContainer";
import InventoryContainer from "./containers/InventoryContainer";
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
