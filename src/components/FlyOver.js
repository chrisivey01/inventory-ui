import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const FlyOver = () => {
    const showFlyOver = useSelector((state) => state.flyover.showFlyOver);
    const axis = useSelector((state) => state.flyover.axis);
    const item = useSelector((state) => state.flyover.item);

    if (showFlyOver && item.type !== "item_account") {
        return (
            <Card
                style={
                    axis.y !== null && axis.x !== null
                        ? {
                              top: axis.y,
                              left: axis.x,
                              position: "absolute",
                              width: "300px",
                              height: "110px",
                              transform: "translate(2vw, -21vh)",
                              backgroundColor: "#212121",
                              color: "#fff",
                          }
                        : undefined
                }
            >
                <CardHeader title={item.label} />
                <Divider style={{ backgroundColor: "#fff" }} />
                <CardContent>
                    <Typography style={{ color: "#fff" }}>
                        Weight: {item.weight} | Quantity: {item.count} |
                        Quality:
                    </Typography>
                </CardContent>
                <Typography style={{ color: "white" }}>
                    {JSON.stringify(item)}
                </Typography>
            </Card>
        );
    } else {
        return <Fragment />;
    }
};

export default FlyOver;
