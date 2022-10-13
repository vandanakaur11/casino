import React from "react";
import { Button } from "@material-ui/core";
import Table from "../table/Table";
import classes from "./SettingsComponent.module.css";

const IgnoredUsers = () => {
    return (
        <div className={classes.settingsComponent}>
            <Table tableData={depositList} isPagination />
        </div>
    );
};

export default IgnoredUsers;

const depositList = {
    thRow: ["Username", "Date Added", "Action"],
    tdRow: [
        { td1: "JaagerZ", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Dexter", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "AlexClark", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Blankey2020", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "JaagerZ", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Dexter", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "AlexClark", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Blankey2020", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "JaagerZ", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Dexter", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "AlexClark", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Blankey2020", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "JaagerZ", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Dexter", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "AlexClark", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Blankey2020", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "JaagerZ", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Dexter", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "AlexClark", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Lementale94", td2: "2020-10-21", td3: <Button>Remove</Button> },
        { td1: "Blankey2020", td2: "2020-10-21", td3: <Button>Remove</Button> },
    ],
};
