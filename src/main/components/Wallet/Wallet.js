import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import classes from "./Wallet.module.css";
import axios from "axios";
import { AppContext } from "../../../contextApi";
import IgnoredUsers from "../settingsComponents/IgnoredUsers";

const Wallet = ({ isDeposit }) => {
    const [forCredit, setForCredit] = useState("")
    const [forDebit, setForDebit] = useState("");
    const { appState, applyAction } = useContext(AppContext)
    const credit = async () => {

        let remote_id = localStorage.getItem('remoteId');
        console.log(remote_id)
        let res = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/admin?action=credit&remote_id=${remote_id}&amount=${forCredit}&casino_id=${process.env.REACT_APP_CASINO_ID}&token=${process.env.REACT_APP_CASINO_TOKEN}`);
        console.log(res)
        if (res.data.status === 200) {

            let balance = res.data.balance
            applyAction('set balance', balance)
        }

    }

    const debit = async () => {
        if (forDebit >= 15) {

            let remote_id = localStorage.getItem('remoteId');
            console.log(remote_id)
            let res = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/admin?action=debit&remote_id=${remote_id}&amount=${forDebit}&casino_id=${process.env.REACT_APP_CASINO_ID}&token=${process.env.REACT_APP_CASINO_TOKEN}`);
            console.log(res)
            if (res.data.status === 200) {

                let balance = res.data.balance
                applyAction('set balance', balance)
            }
            setForDebit('')
        } else {
            setForDebit('')
        }
    }

    const deposit = (
        <div className={classes.wallet}>
            <h2>Deposit</h2>
            <div className={classes.walletForm}>
                <div className={classes.Input}>
                    <input type="number" onChange={(e) => setForCredit(e.target.value)} placeholder="Enter Amount" min='15' />
                    <span>$</span>
                </div>
                <Button variant="contained" className={classes.walletFormBtn} onClick={credit}>
                    Deposit
                </Button>
            </div>
            <p>Please read the following before making a deposit:</p>
            <ul>
                <li>1. Be aware of imposters. Match up the RuneScape Names.</li>
                <li>2. Always confirm in the RuneStake Chat BEFORE accepting any trade screens.</li>
                <li>3. Message us for special deposits if you don't play RunScape</li>
            </ul>
        </div>
    );

    const withdraw = (
        <div className={classes.wallet}>
            <h2>Withdraw</h2>
            <p>Withdraws can take up to 48 hours as they are done manually.</p>

            <div className={classes.walletForm}>
                <div className={classes.Input}>
                    <input type="number" onChange={(e) => setForDebit(e.target.value)} value={forDebit} placeholder="150,0000,000" min='15' />
                    <span>$</span>
                </div>
                <Button variant="contained" className={classes.walletFormBtn} onClick={debit}>
                    Withdraw
                </Button>
            </div>
            <p>There is a minimum of 15$ to be withdrawn.</p>
        </div>
    );

    return isDeposit ? deposit : withdraw;
};

export default Wallet;
