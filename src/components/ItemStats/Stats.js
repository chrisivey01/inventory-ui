import { CardContent, Typography } from "@material-ui/core";
import { Fragment } from "react";
import StatsColoring from "./StatsColoring";

const Stats = ({ item }) => {
    const ifItemIsNotAWeapon = () => {
        if (item.type !== "item_weapon") {
            return (
                <Typography style={{ fontSize: 12 }} component={"span"}>
                    {" "}
                    Weight: {item.weight} | Quantity: {item.count}{" "}
                </Typography>
            );
        }
    };

    const ifWeapon = () => {
        if (item.type === "item_weapon" && item.weaponData) {
            return (
                <Fragment>
                    <StatsColoring
                        label={"Durability"}
                        value={item.weaponData.durability}
                        stat={"item"}
                    />
                    <span> | </span>
                    <StatsColoring
                        label={"Quality"}
                        value={item.weaponData.quality}
                        stat={"item"}
                    />
                    <span> | </span>
                    <span>
                        Serial:{" "}
                        {item.weaponData.weaponSerial
                            ? item.weaponData.weaponSerial
                            : "None"}
                    </span>
                </Fragment>
            );
        }
    };

    return (
        <CardContent style={{ paddingTop: 8, color: "#fff", fontSize: 12 }}>
            {ifItemIsNotAWeapon()}
            {ifWeapon()}
        </CardContent>
    );
};

export default Stats;
