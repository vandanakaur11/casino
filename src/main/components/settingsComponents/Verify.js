import React from "react";
import classes from "./SettingsComponent.module.css";
import { Button } from "@material-ui/core";
import CloudImg from "../../../shared/assets/images/cloud.png";

const Verify = () => {
    return (
        <div className={classes.settingsComponent}>
            <p className={classes.verifyPara}>
                We hope you are enjoying playing. As a safe measure we kindly ask you to verify your account by providing us with the
                following documents.
            </p>
            <div className={classes.settingsComponentVerifyBox}>
                <img src={CloudImg} alt="" />
                <p>
                    For example, an ID card or passport. Files must be a maximum size of 15MB, and of type png, pdf, jpg/jpeg, bmp or gif
                    (Multiple files allowed).
                </p>
                <Button variant="contained" className={classes.settingsComponentBtn}>
                    Verify Your Account
                </Button>
            </div>
        </div>
    );
};

export default Verify;
