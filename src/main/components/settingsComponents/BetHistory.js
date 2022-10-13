import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import classes from "./SettingsComponent.module.css";
import Table from "../table/Table";

const BetHistory = () => {
    return (
        <div className={classes.settingsComponent}>
            <div className={classes.depostiHeader}>
                <Autocomplete
                    defaultValue={{ title: "Last 90 Days" }}
                    className={classes.autocomplete}
                    id="combo-box-demo"
                    options={depositOptions}
                    getOptionLabel={(option) => option.title}
                    getOptionSelected={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
                <h3>Balance: $143.43</h3>
            </div>
            <Table tableData={depositList} isPagination />
        </div>
    );
};

export default BetHistory;

const depositOptions = [
    { title: "Last 90 Days" },
    { title: "Last 60 Days" },
    { title: "Last 30 Days" },
    { title: "Last 15 Days" },
    { title: "Last Week" },
];

const depositList = {
    thRow: ["Date", "Operation", "Change $", "Balance"],
    tdRow: [
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
        { td1: "2020-10-21", td2: "Money Train", td3: "+10.50", td4: 1330.4 },
    ],
};
