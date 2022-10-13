import React from "react";
import { Button, Switch } from "@material-ui/core";
import classes from "./SettingsComponent.module.css";

const Security = () => {
    return (
        <div className={classes.settingsComponent}>
            <div className={classes.settingsComponentHeader}>
                <h2>Two-Factor Authentication</h2>
                <Switch />
            </div>
            <p className={classes.settingsComponentPara}>
                Ensure top-level security for your account with Two-Factor Authentication. When enabled, you are required to enter both a
                password and an authentication code. Ehther from SMS or entering from phone call.{" "}
            </p>

            <div className={classes.settingsComponentFormMain}>
                <div className={classes.settingsComponentFormMainInput}>
                    <label>Phone Number</label>
                    <input type="text" />
                </div>
                <div className={classes.settingsComponentFormMainInput}>
                    <label>Email</label>
                    <input type="text" />
                </div>
            </div>
            <Button variant="contained" className={classes.settingsComponentBtn}>
                Save and Enable
            </Button>
        </div>
    );
};

export default Security;
