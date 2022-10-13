import { Button } from "@material-ui/core";
import React from "react";
import classes from "./HomeCard.module.css";

const HomeCard = ({ card }) => {
    const { frontImage, backGroundImage, primary, secondary, text, btn1, btn2 } = card;

    const style = {
        background: `url( ${backGroundImage}) right no-repeat`,
        backgroundSize: "contain",
    };

    return (
        <div style={style} className={classes.homeCard}>
            <img src={frontImage} alt="" />
            <div className={classes.homeCardConent}>
                <h4>{primary}</h4>
                <h2>{secondary}</h2>
                <p>{text}</p>
                <div className={classes.homeLeftBoxLeftBtns}>
                    <Button variant="contained">{btn1}</Button>
                    <Button>{btn2}</Button>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;

// const mainCard = {
//     frontImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/E04C6256-5736-48EC-8D1E-0E95CD9BC259.svg",
//     backGroundImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/A8424931-73A8-4500-B303-2D5E44158200.png",

//     primary: "DAILY JACKPOT",
//     secondary: "$242,423",
//     text: "Choose from the best Jackpot Games including Mystery Reels, Rainbow Jackpots",
//     btn1: "Join Now",
//     btn2: "T&A Apply",
// };
// const secondaryCard = [
//     {
//         frontImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/461A3EDF-C66E-419A-AB95-337250517F58.svg",
//         backGroundImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/8DFF986A-F0C7-4642-8D69-BFB1CE0928AC.png",
//         primary: "WELCOME BONUS",
//         secondary: "150 Free Spins",
//         text: "Sign up today and get 200% up to $400 and free risk-free spins on Book of Dead",
//         btn1: "Claim Bonus",
//         btn2: "",
//     },
//     {
//         frontImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/02341873-79ED-40A6-B433-CF2937C43564.svg",
//         backGroundImage: "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/8DFF986A-F0C7-4642-8D69-BFB1CE0928AC.png",
//         primary: "NEW SLOT",
//         secondary: "Crazy Time",
//         text: "Live online game show built on our extremely successful wheel concept. ",
//         btn1: "Play Now",
//         btn2: "",
//     },
// ];
