import React, { Fragment } from "react";
import Hotbar from "./containers/Hotbar";
import Inventory from "./containers/Inventory";
import Listener from "./containers/Listener";

function App() {
    return (
        <Fragment>
            <Listener/>
            <Inventory />
            <Hotbar />
        </Fragment>
    );
}

export default App;
