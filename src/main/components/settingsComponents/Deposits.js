import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import classes from "./SettingsComponent.module.css";
import Table from "../table/Table";
import axios from "axios";

const Deposits = () => {
    const [list, setList] = useState([]);
    console.log(list)
    useEffect(async () => {
        let Credit = 0, Debit = 0, hisArr = [], no = 0;
        let remote_id = localStorage.getItem('remoteId')
        try {
            let history = await axios.get(`https://runescape-casino-api.herokuapp.com/api/v1/admin/transactions?remote_id=${remote_id}`);
            if (history.data.status == 200) {
                history = history.data.response
                history.reverse().forEach((element, ind) => {

                    Credit += element.credit;
                    Debit += element.debit;
                    if (element.debit === 0) {
                        no++;
                        hisArr.push({ td1: no, td2: "Deposit", td3: element.date, td4: `$ ${element.credit.toLocaleString()}` })
                    }
                });
                setList(() => hisArr)
            }
        }
        catch {

        }
    }, [])

    const depositList = {
        thRow: ["Sno", "Transaction", "Date", "Amount"],
        tdRow: list,
    };
    return (
        <div className={classes.settingsComponent}>
            {/* <div className={classes.depostiHeader}>
                <Autocomplete
                    defaultValue={{ title: "Last 90 Days" }}
                    className={classes.autocomplete}
                    id="combo-box-demo"
                    options={depositOptions}
                    getOptionLabel={(option) => option.title}
                    getOptionSelected={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
                <h3>Download All Deposits</h3>
            </div> */}
            <Table tableData={depositList} isPagination />
        </div>
    );
};

export default Deposits;

const depositOptions = [
    { title: "Last 90 Days" },
    { title: "Last 60 Days" },
    { title: "Last 30 Days" },
    { title: "Last 15 Days" },
    { title: "Last Week" },
];
