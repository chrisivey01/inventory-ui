import { Fragment } from "react";

const RenderImage = ({ classes, item, fallbackSrc }) => {
    let stringCheck = "";
    if (item.name !== undefined) {
        for (let i = item.name.length - 1; i >= item.name.length - 5; i--) {
            stringCheck += item.name[i];
            if (stringCheck.split("").reverse().join("") === "shoes") {
                return (
                    <img
                        draggable="false"
                        className={classes.images}
                        src={"./assets/shoes.png"}
                        onError={fallbackSrc}
                    />
                );
            }
        }

        return (
            <img
                draggable="false"
                className={classes.images}
                src={"./assets/" + item.name + ".png"}
                onError={fallbackSrc}
            />
        );
    } else {
        return <Fragment />;
    }
};
export default RenderImage;
