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

export default (props) => {
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.inventory.quantity);
    const showConfirmation = useSelector(
        (state) => state.inventory.showConfirmation
    );
    const selectedType = useSelector((state) => state.inventory.selectedType);
    const boughtItem = useSelector((state) => state.inventory.boughtItem);

    const closeHandler = () => {
        dispatch(inventoryActions.closeConfirmationHandler());
    };

    return (
        <Dialog
            // style={{ width: 200 }}
            open={showConfirmation}
            onClose={closeHandler}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>How much?</DialogTitle>
            <DialogContent>
                {selectedType === "Store" ? (
                    <Typography>Cost: {boughtItem.price} </Typography>
                ) : (
                    <Fragment />
                )}

                <TextField
                    style={{ border: "none" }}
                    value={quantity}
                    onChange={(e) =>
                        dispatch(inventoryActions.updateQuantity(value))
                    }
                    variant="outlined"
                    size="small"
                />
                <IconButton
                    style={{ border: "none" }}
                    onClick={(e) => dispatch(inventoryActions.addItem())}
                >
                    <Add />
                </IconButton>
                <IconButton
                    style={{ border: "none" }}
                    onClick={(e) => dispatch(inventoryActions.subtractItem())}
                >
                    <Remove />
                </IconButton>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.agreeHandler}>Agree</Button>
                <Button onClick={props.disagreeHandler}>Disagree</Button>
            </DialogActions>
        </Dialog>
    );
};
