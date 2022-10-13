import React from "react";
import classes from "./DashCard.module.css";

const DashCard = ({ card }) => {
    const { img, price, text, isGreen } = card;

    return (
        <div className={classes.dashCard}>
            <img src={img} alt="" />

            <div className={classes.dashCardMain}>
                <h1 className={isGreen ? classes.green : null}>${price}</h1>

                <h3>{text}</h3>
            </div>
        </div>
    );
};

export default DashCard;
