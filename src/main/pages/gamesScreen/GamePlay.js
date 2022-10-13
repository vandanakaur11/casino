import React, { useState, useEffect, useContext, } from "react";
import { useLocation } from "react-router-dom";
import classes from "./GamePlay.module.css";
import { AppContext } from '../../../contextApi'
import socketClient from "socket.io-client";
import axios from "axios";
import { useHistory } from "react-router-dom";
// const videoLink = "https://urgent.games/DiaDeMuertos/?mode=offline";

const auth = {
    token: process.env.REACT_APP_GAME_TOKEN,
    casino_id: process.env.REACT_APP_CASINO_TOKEN,
    session_id: process.env.REACT_APP_URGENT_GAME_SESSION_ID
}
const SERVER = "https://runescape-casino-api.herokuapp.com";

const updateSingleTransaction = async (id, game_id) => {

    try {
        const res = await axios.post('https://runescape-casino-api.herokuapp.com/api/v1/admin/update-transaction', {
            doc_id: id,
            game_id
        })

    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

function GamePlay() {
    const history = useHistory();
    const socket = socketClient(SERVER);
    const game_id = localStorage.getItem('game_id');
    console.log(game_id)
    socket.on('update-transaction', (data) => {
        console.log('update-transaction');
        const { remote_id, doc_id } = data;
        const authID = localStorage.getItem('remoteId');
        if (authID === remote_id) {
            if (!game_id) {
                history.push('/');
            }
            updateSingleTransaction(doc_id, game_id);
        }
    })

    const [gameshow, setGameshow] = useState();
    const { appState, applyAction } = useContext(AppContext)
    let { state } = useLocation();

    useEffect(() => {
        if (state?.gameName === "Dia De Muertos") {
            console.log(appState.gameMode);
            if (appState.gameMode) setGameshow("https://urgent.games/DiaDeMuertos/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/DiaDeMuertos/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Vikings Slots") {

            if (appState.gameMode) setGameshow("https://urgent.games/Vikings/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Vikings/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }

        }
        if (state.gameName === "BlackJack SingleDeck") {
            if (appState.gameMode) setGameshow("https://urgent.games/BlackjackSingleDeck/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BlackjackSingleDeck/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Yakuza") {

            if (appState.gameMode) setGameshow("https://urgent.games/Yakuza/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Yakuza/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }

        }
        if (state.gameName === "BlackJack DoubleDeck") {

            if (appState.gameMode) setGameshow("https://urgent.games/BlackjackDoubleDeck/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BlackjackDoubleDeck/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "BlackJack FourDeck") {

            if (appState.gameMode) setGameshow("https://urgent.games/BlackjackFourDeck/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BlackjackFourDeck/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "BlackJack SixDeck") {

            if (appState.gameMode) setGameshow("https://urgent.games/BlackjackSixDeck/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BlackjackSixDeck/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "BlackJack EightDeck") {

            if (appState.gameMode) setGameshow("https://urgent.games/BlackjackEightDeck/?mode=offline");

            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BlackjackEightDeck/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }

        }
        if (state.gameName === "Baseball Slots") {
            if (appState.gameMode) setGameshow("https://urgent.games/BaseballGrandSlam/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/BaseballGrandSlam/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Mobsters Slots") {
            if (appState.gameMode) setGameshow("https://urgent.games/Mobsters/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Mobsters/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Haloween Slots") {
            if (appState.gameMode) setGameshow("https://urgent.games/Halloween/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Halloween/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Mystic Cave") {
            if (appState.gameMode) setGameshow("https://urgent.games/MysticCave/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/MysticCave/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Lucky Farm") {
            if (appState.gameMode) setGameshow("https://urgent.games/LuckyFarm/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/LuckyFarm/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Bingo") {
            if (appState.gameMode) setGameshow("https://urgent.games/Bingo/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Bingo/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Three Card Poker") {
            if (appState.gameMode) setGameshow("https://urgent.games/ThreeCardPoker/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/ThreeCardPoker/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Joker Poker") {
            if (appState.gameMode) setGameshow("https://urgent.games/JokerPoker/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/JokerPoker/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Craps") {
            if (appState.gameMode) setGameshow("https://urgent.games/Craps/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Craps/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "American Roulette") {
            if (appState.gameMode) setGameshow("https://urgent.games/AmericanRoulette/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/AmericanRoulette/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Egyptian Treasure") {
            if (appState.gameMode) setGameshow("https://urgent.games/EgyptianTreasures/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/EgyptianTreasures/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Golden Slots") {
            if (appState.gameMode) setGameshow("https://urgent.games/GoldenSlots/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/GoldenSlots/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Baccarat") {
            if (appState.gameMode) setGameshow("https://urgent.games/Baccarat/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Baccarat/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Zombieland") {
            if (appState.gameMode) setGameshow("https://urgent.games/Zombieland/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/Zombieland/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Magical Fish Tank") {
            if (appState.gameMode) setGameshow("https://urgent.games/MagicalFishTank/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/MagicalFishTank/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Enchanted Forest") {
            if (appState.gameMode) setGameshow("https://urgent.games/EnchantedForest/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/EnchantedForest/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Pumpkin Fiesta") {
            if (appState.gameMode) setGameshow("https://urgent.games/PumpkinsFiesta/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/PumpkinsFiesta/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
        if (state.gameName === "Wild Wilds West") {
            if (appState.gameMode) setGameshow("https://urgent.games/WildWildsWest/?mode=offline");
            if (!appState.gameMode) {
                setGameshow(`https://urgent.games/WildWildsWest/?token=${auth.token}&remote_id=${appState.uRemoteId}&casino=${auth.casino_id}&language=en&currency=RSG&session_id=${auth.session_id}&server=https://dev.gamessecure.com`);
            }
        }
    }, [state, appState]);

    return (
        <div>
            <div className={classes.main}>
                <iframe src={gameshow} title="game"></iframe>
            </div>
        </div>
    );
}

export default GamePlay;
