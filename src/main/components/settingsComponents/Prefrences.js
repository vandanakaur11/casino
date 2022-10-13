import { Button, Switch } from "@material-ui/core";
import React from "react";
import classes from "./SettingsComponent.module.css";

const Prefrences = () => {
    const prefrences = [
        "Hide your bets",
        "SMS opt out",
        "Prevent youself from receving rain",
        "Hide all your player statistics",
        "Hide your race stats",
    ];

    return (
        <div className={classes.settingsComponent}>
            <div className={classes.prefrenceSwitchs}>
                {prefrences.map((prefrence, index) => (
                    <div key={index} className={classes.Switch}>
                        <h3>{prefrence}</h3>
                        <span className={classes.SwitchSpan}></span>
                        <Switch />
                    </div>
                ))}
            </div>
            <Button variant="contained" className={classes.settingsComponentBtn}>
                Save Changes
            </Button>
        </div>
    );
};

export default Prefrences;
