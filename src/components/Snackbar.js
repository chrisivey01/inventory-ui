import { Snackbar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorMessage } from "../store/snackbar/snackbar.actions";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {
    const dispatch = useDispatch();
    const showMessage = useSelector((state) => state.snackbar.showMessage);
    const message = useSelector((state) => state.snackbar.message);
    const handleClose = () => {
        dispatch(hideErrorMessage());
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showMessage}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    );
};
