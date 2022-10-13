import React from "react";
import classes from "./ScreenFooter.module.css";

import Netent from "../../../shared/assets/images/netent.png";
import PlayGo from "../../../shared/assets/images/play.png";
import QuickSpin from "../../../shared/assets/images/quickspin.png";
import Microgaming from "../../../shared/assets/images/micro.PNG";
import NextGen from "../../../shared/assets/images/next.PNG";
import Evolution from "../../../shared/assets/images/evolve.PNG";
import BetSoft from "../../../shared/assets/images/betSoft.png";
import { Link } from "react-router-dom";

const ScreenFooter = () => {
    const images = [Netent, PlayGo, QuickSpin, Microgaming, NextGen, Evolution, BetSoft];

    return (
        <div className={classes.screenFooter}>
            <div className={classes.screenFooterImages}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="" />
                ))}
            </div>
            <p>
                Lucky Spades is operated by Gambler Fox Limited. The company is licensed and regulated in Kahnawake by the Kahnawake Gaming
                Commission. For more information please click on the Kahnawake link on the footer.
                <br />
                <br />
                Lucky Spades has been alive since 2020 and works with widely known and reliable Casino games platform providers like NetEnt,
                Micro gaming, Nyxgames, Ezugi, Bet Games Tv, Evolution Gaming and Yggdrasil gaming.
                <br />
                <br />
                Lucky Spades has been developed with using the latest technologies and all the games within the website have licence and a
                safe gaming system.
            </p>
            {/* <div className={classes.screenFooterLinks}>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms & Conditions</Link>
                <Link to="/">Disclaimer</Link>
                <Link to="/">Responsibility</Link>
                <Link to="/">Contacts</Link>
            </div> */}
        </div>
    );
};

export default ScreenFooter;
