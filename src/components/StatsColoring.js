import { Typography } from "@material-ui/core";
import { Fragment } from "react";

const StatsColoring = ({ value, stat, maxWeight }) => {
    switch (stat) {
        case "item":
            if (value) {
                return (
                    <Typography component={"span"} style={{ color: "green" }}>
                        Durability: {value}
                    </Typography>
                );
            }
        case "weight":
            if (value >= 135) {
                return (
                    <Typography
                        variant="h5"
                        component={"span"}
                        style={{ color: "red" }}
                    >
                        Capacity: {value}/{maxWeight}
                    </Typography>
                );
            } else if (value <= 134 && value >= 75) {
                return (
                    <Typography
                        variant="h5"
                        component={"span"}
                        style={{ color: "yellow" }}
                    >
                        Capacity: {value}/{maxWeight}
                    </Typography>
                );
            } else if (value <= 74 && value >= 0) {
                return (
                    <Typography
                        variant="h5"
                        component={"span"}
                        style={{ color: "green" }}
                    >
                        Capacity: {value}/{maxWeight}
                    </Typography>
                );
            }
        default:
            return null;
    }
};

export default StatsColoring;
