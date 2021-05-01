import { Card, CardHeader, Divider } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Stats from "./ItemStats/Stats";
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
                              width: "325px",
                              height: "100px",
                              transform: "translate(2vw, -21vh)",
                              backgroundColor: "#212121",
                              color: "#fff",
                          }
                        : undefined
                }
            >
                <CardHeader title={item.label} />
                <Divider style={{ backgroundColor: "#fff" }} variant="middle" />
                <Stats item={item} />
            </Card>
        );
    } else {
        return <Fragment />;
    }
};

export default FlyOver;
