import { Typography } from "@material-ui/core";
import { Fragment } from "react";
import RenderImage from "./RenderImage";

const Slot = ({ i, inventoryType, item, classes }) => {
    const fallbackSrc = (ev) => {
        ev.target.src = "./assets/no-item.png";
    };

    return (
        <Fragment>
            {item !== "{}" ? (
                <Fragment>
                    {i < 5 && inventoryType === "Personal" ? (
                        <Typography className={classes.slotNumberGrid}>
                            {i + 1}
                        </Typography>
                    ) : (
                        <Fragment />
                    )}
                    <Typography className={classes.countGrid}>
                        {item.ammo ? item.ammo : <Fragment />}
                        {item.count ? item.count : <Fragment />}
                        {item.money ? (
                            <span style={{ color: "green", fontSize: "12" }}>
                                $
                                {item.money
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        ) : (
                            <Fragment />
                        )}
                    </Typography>

                    <RenderImage
                        classes={classes}
                        item={item}
                        fallbackSrc={fallbackSrc}
                    />
                    <Typography className={classes.name}>
                        {item.label}
                    </Typography>
                </Fragment>
            ) : (
                <Fragment>
                    {i < 5 && inventoryType === "Personal" ? (
                        <Typography className={classes.slotNumberGrid}>
                            {i + 1}
                        </Typography>
                    ) : (
                        <Fragment />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Slot;
