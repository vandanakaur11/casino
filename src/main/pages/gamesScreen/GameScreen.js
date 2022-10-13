import React, { useState, useEffect } from "react";
import classes from "./GameScreen.module.css";
import DoubleArrow from "@material-ui/icons/DoubleArrow";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import Table from "../../components/table/Table";
import { Button, IconButton } from "@material-ui/core";
import axios from "axios";
import { gamesList } from "../../../data/Data";
// const videoLink = "https://www.youtube.com/watch?v=Mw_KIa_CVQc";

const updateTable = async (message, game_id) =>{
    let userData = []
    for(let i =0 ; i< message.length ; i++){
        let {data:{res}} = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/user/get-player?remote_id=${message[i].remote_id}`);
        console.log(res);
        let {firstname} = res
        let _d = { td1: `#${i+1}`, td2: gamesList[game_id-1].gameName, td3: firstname, td4: message[i].score}
        userData.push(_d)
    }
    return userData;
}

function GameScreen() {
    const history = useHistory();
    let { state } = useLocation();
    const [activityList, setActiveList] = useState({
        thRow: ["Rank", "Game Name", "Player Name", "Amount"],
        tdRow: [],
    })

    const [videoLink, setVideolink] = useState("");

    useEffect(async() => {
        localStorage.setItem('game_id', state.id);
        
        if (state.gameName === "Dia De Muertos") {
            setVideolink("https://youtu.be/mtTrG7eyhl8");
        }
        if (state.gameName === "Vikings Slots") {
            setVideolink("https://www.youtube.com/watch?v=-o93O_8xpwQ");
        }
        if (state.gameName === "BlackJack SingleDeck") {
            setVideolink("https://www.youtube.com/watch?v=nzE-NddRB4U");
        }
        if (state.gameName === "Yakuza") {
            setVideolink("https://www.youtube.com/watch?v=Mw_KIa_CVQc");
        }
        if (state.gameName === "BlackJack DoubleDeck") {
            setVideolink("https://www.youtube.com/watch?v=JqOKKobYAps");
        }
        if (state.gameName === "BlackJack FourDeck") {
            setVideolink("https://www.youtube.com/watch?v=hi8l_nr1o8s");
        }
        if (state.gameName === "BlackJack SixDeck") {
            setVideolink("https://www.youtube.com/watch?v=-i7aNAnFRI8");
        }
        if (state.gameName === "BlackJack EightDeck") {
            setVideolink("https://www.youtube.com/watch?v=WQ_VEUZLcj4");
        }
        if (state.gameName === "Baseball Slots") {
            setVideolink("https://www.youtube.com/watch?v=8YALnpnjOdQ");
        }
        if (state.gameName === "Mobsters Slots") {
            setVideolink("https://www.youtube.com/watch?v=v-jEUWxhbKM");
        }
        if (state.gameName === "​Haloween Slots") {
            setVideolink("https://www.youtube.com/watch?v=iUlUKXw8aSg");
        }
        if (state.gameName === "Mystic Cave") {
            setVideolink("https://www.youtube.com/watch?v=4HNDPxlkadY");
        }
        if (state.gameName === "Lucky Farm") {
            setVideolink("https://www.youtube.com/watch?v=PjY4lSKL07Y");
        }
        if (state.gameName === "Bingo") {
            setVideolink("https://www.youtube.com/watch?v=TjwuJECKr_A");
        }
        if (state.gameName === "Three Card Poker") {
            setVideolink("https://www.youtube.com/watch?v=19K0Kvm4fSk");
        }
        if (state.gameName === "Joker Poker") {
            setVideolink("https://www.youtube.com/watch?v=BVaQfVlOByo");
        }
        if (state.gameName === "Craps") {
            setVideolink("https://www.youtube.com/watch?v=3feWidTF0io");
        }
        if (state.gameName === "American Roulette") {
            setVideolink("https://www.youtube.com/watch?v=8RR1tfQHvDE");
        }
        if (state.gameName === "Egyptian Treasure") {
            setVideolink("https://www.youtube.com/watch?v=MSHIJh-BFjY");
        }
        if (state.gameName === "Golden Slots") {
            setVideolink("https://www.youtube.com/watch?v=Gb5RuEDpJs8");
        }
        if (state.gameName === "Baccarat") {
            setVideolink("https://www.youtube.com/watch?v=bjC1cJlCp8o");
        }
        if (state.gameName === "Zombieland") {
            setVideolink("https://www.youtube.com/watch?v=2ImytCGgT7g");
        }
        if (state.gameName === "Magical Fish Tank") {
            setVideolink("https://www.youtube.com/watch?v=7KPTcqnDtNk");
        }
        if (state.gameName === "Enchanted Forest") {
            setVideolink("https://www.youtube.com/watch?v=qR2W-4-sNr4");
        }
        if (state.gameName === "Pumpkin Fiesta") {
            setVideolink("https://www.youtube.com/watch?v=q2rfM_LnSIU");
        }
        if (state.gameName === "Wild Wilds West") {
            setVideolink("https://www.youtube.com/watch?v=7o9w1rlQHB0");
        }
        const {data:{message}} = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/admin/getLeaderBoard?game_id=${state.id}`);
        let tableList = await updateTable(message, state.id);
        setActiveList({
            ...activityList,
            tdRow: tableList
        })
    }, [state]);

    function handleGame(gameName ) {
        history.push({ pathname: "/games/gamePlay-screen", state: { gameName } });
    }

    return (
        <div>
            <div className={classes.topWrapper}>
                <div>
                    <div className={classes.heading}>{state.gameName}</div>
                    <div className={classes.subheading}>{state.gameInfo}</div>
                    <div className={classes.Btn} onClick={() => handleGame(state.gameName)}>
                        Play Now
                    </div>
                </div>
                <div className={classes.video}>
                    {/* <iframe src={videoLink}></iframe> */}
                    {/* <video controls="controls">
                        <source src={videoLink} type="video/mp4" />
                    </video> */}
                    <div>
                        <ReactPlayer
                            width="70%"
                            height="300px"
                            controls={true}
                            url={videoLink}
                            config={{ file: { attributes: { controlsList: "nodownload" } } }}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.bottomWrapper}>
                <div className={classes.leftWrapper}>
                    <div className={classes.detailHeading}>Game Details</div>
                    <div>{state.gameDetail}</div>
                </div>
                <div className={classes.rightWrapper}>
                    <div className={classes.rightWrapperInfo}>
                        <div>
                            <span>
                                <DoubleArrow />
                            </span>
                            Release Date
                        </div>
                        <div>
                            <span> {state.releaseDate}</span>
                        </div>
                    </div>
                    <div className={classes.rightWrapperInfo}>
                        <div>
                            <span>
                                <DoubleArrow />
                            </span>
                            Game Type
                        </div>
                        <div>
                            <span>{state.gameType}</span>
                        </div>
                    </div>
                    <div className={classes.rightWrapperInfo}>
                        <div>
                            <span>
                                <DoubleArrow />
                            </span>
                            Paylines
                        </div>
                        <div>
                            <span>{state.paylines}</span>
                        </div>
                    </div>
                    <div className={classes.rightWrapperInfo}>
                        <div>
                            <span>
                                <DoubleArrow />
                            </span>
                            RTP
                        </div>
                        <div>
                            <span>{state.rtp}</span>
                        </div>
                    </div>
                    <div className={classes.rightWrapperInfo}>
                        <div>
                            <span>
                                <DoubleArrow />
                            </span>
                            volatility
                        </div>
                        <div>
                            <span>{state.volatility}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.homeTable}>
                <div className={classes.homeTableTabs}>
                    <Button className={classes.tableBtn} >
                        Top Player of {state.gameName}
                    </Button>
                    {/* <Button className={active === 2 ? classes.btnActive : null} onClick={handleActive.bind(this, 2)}>
                        Codes List
                    </Button> */}
                </div>
                <div className={classes.tableDiv}>

                <Table tableData={activityList} />
                </div>
            </div>
        </div>
    );
}
// const activityList = {
//     thRow: ["Rank", "Game Name", "Player Name", "Amount"],
//     tdRow: [],
// };

export default GameScreen;
