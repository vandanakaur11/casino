import React, { useState, useEffect, useContext } from "react";
import classes from "./GamesScreen.module.css";

import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { gamesList } from "../../../data/Data";
import { AppContext } from "../../../contextApi";

const GamesScreen = () => {
    const [showGame, setShowGame] = useState([]);
    const { appState, applyAction } = useContext(AppContext);
    const history = useHistory();
    const handleGame = (game) => {
        console.log(game)
        history.push({ pathname: "/games/game-screen", state: game });
    };



    useEffect(() => {

        let filterList = []
        filterList = gamesList.filter((ele, i) => {

            if (ele.gameName.includes(appState.gameSort)) {
                return ele
            }

            if (ele.gameDetail.includes(appState.gameSort)) {
                return ele;
            }

            if (ele.gameDetail.includes(appState.gameSort) || ele.gameName.includes(appState.gameSort) || ele.gameInfo.includes(appState.gameSort)) {
                return ele;
            }



        });

        filterList = filterList.length ? filterList : gamesList;

        var newVal = filterList.slice(0, gamesList.length / 2);

        setShowGame(newVal);
    }, [appState]);
    function handleLoad() {
        setShowGame(gamesList);
    }
    // console.log(showGame, "length");
    return (
        <div>
            <div className={classes.headingWrap}>
                <div>OUR GAMES</div>
            </div>
            <div className={classes.bottomHeading}>Games</div>
            <div className={classes.gamesWrapper}>
                <Grid container spacing={8}>
                    {showGame?.map((game, i) => (
                        <Grid item lg={4} md={6} sm={12} key={i}>
                            <img key={i} src={game?.name} onClick={() => handleGame(game)} alt="" />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div className={classes.loadBtn} onClick={() => handleLoad()}>
                Load More
                <br />
            </div>
        </div>
    );
};

export default GamesScreen;
