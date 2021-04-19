import { combineReducers } from "redux";
import inventoryReducer from "./inventory/inventory.reducer";
import itemReducer from "./item/item.reducer";
import hotbarReducer from "./hotbar/hotbar.reducer";
import snackbarReducer from "./snackbar/snackbar.reducer";
import pauseReducer from "./pause/pause.reducer";
import flyOverReducer from "./flyover/flyover.reducer";

export default combineReducers({
    inventory: inventoryReducer,
    item: itemReducer,
    hotbar: hotbarReducer,
    snackbar: snackbarReducer,
    pause: pauseReducer,
    flyover: flyOverReducer
});
