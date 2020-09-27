import React from "react";
import UsedItem from "./components/UsedItem";
import InventoryContainer from "./containers/InventoryContainer";

const App = () => {
    return (
        <div>
            <InventoryContainer />
            <UsedItem />
        </div>
    );
};

export default App;
