import React, { useState, useRef, useContext, useEffect } from "react";
import DashCard from "../../components/cards/dashCard/DashCard";
import { Button, IconButton } from "@material-ui/core";
import { FileCopy, Delete } from "@material-ui/icons";
import classes from "./HomeScreen.module.css";
import Crown from "../../../shared/assets/images/crown.png";
import Diamond from "../../../shared/assets/images/diamond.png";
import Money from "../../../shared/assets/images/cash.png";
// import ScreenFooter from "../../components/screenFooter/ScreenFooter";
import Table from "../../components/table/Table";
import { AppContext } from "../../../contextApi";
import { gamesList } from "../../../data/Data";
import axios from "axios";


const updateLeaderBoard =async(response)=>{
    let hisArr =[];
    for (let index = 0; index < response.length; index++) {
        if (response[index].hasOwnProperty('highScore')) {
                    let { data: { res } } = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/user/get-player?remote_id=${response[index].highScore.remote_id}`)
                    let playerName = res.firstname;
                    hisArr.push({
                        td1: '#1', td2: gamesList[response[index].game_id-1].gameName, td3: playerName, td4: response[index].highScore.score
                    });
                }
        
    }

    return hisArr
}

const HomeScreen = () => {
    const [active, setActive] = useState(1);
    const { appState, applyAction } = useContext(AppContext);
    const [transcation, setTransaction] = useState({
        totalCredit: 0,
        totalDebit: 0,
        historyArr: [],
    });
    console.log('render');
    useEffect(async () => {
        console.log("run use effect");
        let Credit = 0,
            Debit = 0,
            hisArr = [];
        let remote_id = localStorage.getItem("remoteId");
        try {
            let history = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/admin/transactions?remote_id=${remote_id}`);
            if (history.data.status == 200) {
                history = history.data.response;
                history.forEach((element, ind) => {
                    Credit += element.credit;
                    Debit += element.debit;
                    // if (element.debit === 0) hisArr.push({ td1: ind + 1, td2: "Deposit", td3: element.date, td4: `$ ${element.credit.toLocaleString()}` });
                    // if (element.credit === 0) hisArr.push({ td1: ind + 1, td2: "Withdraw", td3: element.date, td4: `$ ${element.debit.toLocaleString()}` });
                });
                let topPlayer = await axios.get('https://runescape-casino-api.herokuapp.com/api/v1/admin/getAllTopPlayer');
                let { data: { message } } = topPlayer;
                // message.forEach(async (ele) => {
                //     if (ele.hasOwnProperty('highScore')) {
                //         let { data: { res } } = await axios.get(`http://localhost:5050/api/v1/user/get-player?remote_id=${ele.highScore.remote_id}`)
                //         let playerName = res.firstname;
                //         hisArr.push({
                //             td1: '#1', td2: gamesList[ele.game_id].gameName, td3: playerName, td4: ele.highScore.score
                //         });
                //     }
                // })
                const list  = await updateLeaderBoard(message);
                
                setTimeout(() => {
                    
                    setTransaction({
                        ...transcation,
                        totalCredit: Credit.toLocaleString(),
                        totalDebit: Debit.toLocaleString(),
                        historyArr: list
                    });
                }, 0);
            }

        } catch (error) {
            console.log("Error: ", error.message);
        }
        return () => setTransaction({
            totalCredit: 0,
        totalDebit: 0,
        historyArr: [],
        })
    }, []);

    const activityList = {
        thRow: ["Rank", "Game Name", "Player Name", "Amount"],
        tdRow: transcation.historyArr,
    };

    const mainRef = useRef();

    const dashCards = [
        {
            img: Money,
            price: transcation.totalCredit,
            text: "Total Credit",
        },
        {
            img: Diamond,
            price: transcation.totalDebit,
            text: "Total Debit",
        },
        {
            img: Crown,
            price: appState.headerBalance,
            text: "Total Available",
            isGreen: true,
        },
    ];

    const handleActive = (num) => {
        setActive(num);
    };

    const tableData = active === 1 ? { ...activityList } : { ...codesList };

    return (
        <div ref={mainRef} className={classes.home}>
            <div className={classes.homeTop}>
                <h3>Referrals</h3>
                <div className={classes.homeTopCards}>
                    {dashCards.map((card, index) => (
                        <DashCard key={index} card={card} />
                    ))}
                </div>
            </div>
            {/* <div className={classes.homeLinks}>
                <div className={classes.homeLink}>
                    <h3>Affilate Link</h3>
                    <div className={classes.homeLinkInput}>
                        <input type="text" placeholder="https://runestake.io/?c=1234567" />
                        <IconButton>
                            <FileCopy />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.homeLink}>
                    <h3>Create Custom Code </h3>
                    <div className={classes.homeLinkInput}>
                        <input type="text" placeholder="Set your custom referral code" />
                        <Button variant="contained">Create</Button>
                    </div>
                </div>
            </div> */}

            <div className={classes.homeTable}>
                <div className={classes.homeTableTabs}>
                    <Button className={active === 1 ? classes.btnActive : null} onClick={handleActive.bind(this, 1)}>
                        Top Player of All Games
                    </Button>
                    {/* <Button className={active === 2 ? classes.btnActive : null} onClick={handleActive.bind(this, 2)}>
                        Codes List
                    </Button> */}
                </div>
                <Table tableData={tableData} />
            </div>

            {/* <ScreenFooter /> */}
        </div>
    );
};

export default HomeScreen;

const codesList = {
    thRow: ["Promo Code", "Created on", "Users Used", "Actions"],
    tdRow: [
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
        {
            td1: "20OFSBONUS",
            td2: "05.10.2021 20:00",
            td3: 3,
            td4: <Button startIcon={<Delete />}>Delete</Button>,
        },
    ],
};
