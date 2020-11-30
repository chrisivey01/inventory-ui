import React, { Fragment } from "react";
import HotbarContainer from "./containers/HotbarContainer";
import InventoryContainer from "./containers/InventoryContainer";
import UsedItemContainer from "./containers/UsedItemContainer";

function App() {
    return (
        <Fragment>
            <InventoryContainer />
            <HotbarContainer />
            {/* <UsedItemContainer /> */}
        </Fragment>
    );
}

export default App;
