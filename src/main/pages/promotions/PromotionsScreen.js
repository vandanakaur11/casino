import React from "react";
import { Button } from "@material-ui/core";
import classes from "./PromotionsScreen.module.css";
import ScreenFooter from "../../components/screenFooter/ScreenFooter";
import SpinnerImg from "../../../shared/assets/images/converted.png";

const PromotionsScreen = () => {
  return (
    <div className={classes.promotionsScreen}>
      <div className={classes.promotionsScreenMain}>
        <h2>Ongoing Promotions</h2>

        <p>
          With over 2000 games on RuneStake, we're always raising the bar with
          our promo offering. Whether we are getting games before any other
          casino, enchasing games through in-game bonuses and features, or
          highlighting certain games for their brilliance, our casino offering
          is second to none.
        </p>
        <div className={classes.PromotionsScreenBox}>
          <div className={classes.PromotionsScreenBoxLeft}>
            <h3>June 12- June 19</h3>
            <h1>$100k Weekly Giveaway </h1>
            <div className={classes.timerContainer}>
              <div className={classes.timerContainer}>
                <div className={classes.timerContainerBox}>
                  <h4>2</h4>
                  <p>Days</p>
                </div>
                <div className={classes.timerContainerBox}>
                  <h4>15</h4>
                  <p>Hours</p>
                </div>
              </div>

              <div className={classes.timerContainer}>
                <div className={classes.timerContainerBox}>
                  <h4>53</h4>
                  <p>Minutes</p>
                </div>
                <div className={classes.timerContainerBox}>
                  <h4>59</h4>
                  <p>Seconds</p>
                </div>
              </div>
            </div>
            <p>
              Wager to earn tickets into a giveaway where anybody can win. Just
              one ticket can win big. We giveaways in $1000 every singe week.
              With $1,000 wagered eaquating to 100,000. Earn as many tickets as
              possible to give your self the best change of winning.
            </p>
            <Button variant="contained">Let me in! </Button>
          </div>
          <img src={SpinnerImg} alt="" />
        </div>
      </div>

      <ScreenFooter />
    </div>
  );
};

export default PromotionsScreen;
