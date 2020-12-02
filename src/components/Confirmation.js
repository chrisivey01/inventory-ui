import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Input,
    Slide,
    TextField,
    Typography,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryActions from "../store/inventory/inventory.actions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RenderShopConfirmation = ({
    quantity,
    confirmation,
    inventory,
    boughtItem,
    selectedItem,
    closeHandler,
    agreeHandler,
    disagreeHandler,
    dispatch,
}) => {
    return (
        <Dialog
            open={confirmation.show}
            onClose={closeHandler}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>{confirmation.title}</DialogTitle>
            <DialogContent>
                {boughtItem ? (
                    <Typography>Cost: {boughtItem.price} </Typography>
                ) : (
                    <Fragment />
                )}

                <TextField
                    style={{ border: "none" }}
                    value={quantity ? quantity : null}
                    onChange={(e) =>
                        dispatch(
                            inventoryActions.updateQuantityStore(e.target.value)
                        )
                    }
                    variant="outlined"
                    size="small"
                />
                <IconButton
                    style={{ border: "none" }}
                    onClick={() => dispatch(inventoryActions.addItemStore())}
                >
                    <Add />
                </IconButton>
                <IconButton
                    style={{ border: "none" }}
                    onClick={() =>
                        dispatch(
                            inventoryActions.subtractItemStore(
                                inventory,
                                boughtItem,
                                selectedItem
                            )
                        )
                    }
                >
                    <Remove />
                </IconButton>
            </DialogContent>
            <DialogActions>
                <Button onClick={agreeHandler}>Agree</Button>
                <Button onClick={disagreeHandler}>Disagree</Button>
            </DialogActions>
        </Dialog>
    );
};

const RenderContextConfirmation = ({
    quantity,
    confirmation,
    inventory,
    selectedItem,
    closeHandler,
    agreeHandler,
    disagreeHandler,
    dispatch,
}) => {
    return (
        <Dialog
            open={confirmation.show}
            onClose={closeHandler}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>{confirmation.title}</DialogTitle>
            <DialogContent>
                <TextField
                    style={{ border: "none" }}
                    value={quantity ? quantity : null}
                    onChange={(e) =>
                        dispatch(
                            inventoryActions.updateQuantityContext(
                                e.target.value
                            )
                        )
                    }
                    variant="outlined"
                    size="small"
                />
                <IconButton
                    style={{ border: "none" }}
                    onClick={() => dispatch(inventoryActions.addItemContext())}
                >
                    <Add />
                </IconButton>
                <IconButton
                    style={{ border: "none" }}
                    onClick={() =>
                        dispatch(inventoryActions.subtractItemContext())
                    }
                >
                    <Remove />
                </IconButton>
            </DialogContent>
            <DialogActions>
                <Button onClick={agreeHandler}>Agree</Button>
                <Button onClick={disagreeHandler}>Disagree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ({ agreeHandler, disagreeHandler }) => {
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.inventory.quantity);
    const confirmation = useSelector((state) => state.inventory.confirmation);
    const inventory = useSelector(
        (state) => state.inventory.personalInventory.inventory
    );
    const boughtItem = useSelector((state) => state.inventory.boughtItem);
    const selectedItem = useSelector((state) => state.inventory.selectedItem);
    const closeHandler = () => {
        dispatch(inventoryActions.closeConfirmationHandler());
    };

    const renderConfirmationView = () => {
        if (confirmation.type === "Store" && boughtItem.price != '' ) {
            return (
                <RenderShopConfirmation
                    quantity={quantity}
                    confirmation={confirmation}
                    inventory={inventory}
                    boughtItem={boughtItem}
                    selectedItem={selectedItem}
                    closeHandler={closeHandler}
                    agreeHandler={agreeHandler}
                    disagreeHandler={disagreeHandler}
                    dispatch={dispatch}
                />
            );
        }

        if (confirmation.type !== "Store") {
            return (
                <RenderContextConfirmation
                    quantity={quantity}
                    confirmation={confirmation}
                    inventory={inventory}
                    selectedItem={selectedItem}
                    closeHandler={closeHandler}
                    agreeHandler={agreeHandler}
                    disagreeHandler={disagreeHandler}
                    dispatch={dispatch}
                />
            );
        }
    };

    return <Fragment>{renderConfirmationView()}</Fragment>;
};
