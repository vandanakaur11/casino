import React from "react";
import classes from "./GamesHome.module.css";
import { useHistory } from "react-router-dom";
import CarouselComp from "../../components/carousel/Carousel";

function GamesHome() {
    const history = useHistory();
    return (
        <div className={classes.main}>
            <div className={classes.options}>
                <div onClick={() => history.push("/games/gamesHome-screen")}>Home</div>
                <div onClick={() => history.push("/games/games-screen")}>Games</div>
                <div>FAQ</div>
                <div>Blog</div>
                <div>Contact</div>
            </div>
            <div className={classes.info}>
                <div>RUNE STACK GAMES - THE FUTURE OF IGAMING</div>
                <div className={classes.infopara}>
                    The industry leading casino API provider offering innovative high-quality HTML5 casino games. We offer a ride range of
                    games from baccarat, bingo, craps, roulette and more! All of our games come fully optimized for all mobile devices,
                    multiple currencies and multiple languages.
                </div>
                <div className={classes.Btn}>Contact Us</div>
            </div>
            <div className={classes.trending}>
                <div>Trending Games</div>
                <CarouselComp />
            </div>
        </div>
    );
}

export default GamesHome;
