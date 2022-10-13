import React from "react";
import Wallet from "../../components/Wallet/Wallet";
import ScreenFooter from "../../components/screenFooter/ScreenFooter";
import classes from "./WalletScreen.module.css";

const WalletScreen = ({ isDeposit }) => {
    return (
        <div className={classes.walletScreen}>
            <Wallet isDeposit={isDeposit} />
            <ScreenFooter />
        </div>
    );
};

export default WalletScreen;
