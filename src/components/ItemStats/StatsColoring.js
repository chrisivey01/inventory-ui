import { Typography } from "@material-ui/core";

const StatsColoring = ({ value, stat, maxWeight, label }) => {
    switch (stat) {
        case "item":
            if (value >= 75) {
                return (
                    <Typography
                        component={"span"}
                        style={{ color: "green", fontSize: 12 }}
                    >
                        {label}: {Math.round(value)}
                    </Typography>
                );
            } else if (value <= 74 && value >= 25) {
                return (
                    <Typography
                        component={"span"}
                        style={{ color: "yellow", fontSize: 12 }}
                    >
                        {label}: {Math.round(value)}
                    </Typography>
                );
            } else if (value <= 24 && value >= 0) {
                return (
                    <Typography
                        component={"span"}
                        style={{ color: "red", fontSize: 12 }}
                    >
                        {label}: {Math.round(value)}
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
