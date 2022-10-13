import React, { useState, Suspense, lazy } from "react";
import classes from "./SettingsScreen.module.css";
import { Button, ButtonGroup } from "@material-ui/core";
import {
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
  Switch,
} from "react-router-dom";
import General from "../../components/settingsComponents/General";
import ScreenFooter from "../../components/screenFooter/ScreenFooter";
import Loader from "../../../shared/UI/Loader";

const Deposits = lazy(() =>
  import("../../components/settingsComponents/Deposits")
);
const WithDraws = lazy(() =>
  import("../../components/settingsComponents/WithDraws")
);
const BetHistory = lazy(() =>
  import("../../components/settingsComponents/BetHistory")
);
const Security = lazy(() =>
  import("../../components/settingsComponents/Security")
);
const Prefrences = lazy(() =>
  import("../../components/settingsComponents/Prefrences")
);
const IgnoredUsers = lazy(() =>
  import("../../components/settingsComponents/IgnoredUsers")
);
const Verify = lazy(() => import("../../components/settingsComponents/Verify"));

const SettingsScreeen = () => {
  const [activeTab, setactiveTab] = useState("General");
  const history = useHistory();

  const buttons = [
    { title: "General", route: "general" },
    { title: "Deposits", route: "deposits" },
    { title: "Withdraws", route: "withdraws" },
    // { title: "Bets History", route: "bet-history" },
    // { title: "Security", route: "security" },
    // { title: "Prefrences", route: "prefrences" },
    // { title: "Ignored Users", route: "ignored-users" },
    // { title: "Verify", route: "verify" },
  ];

  const { url, path } = useRouteMatch();

  const handleTab = (title, route) => {
    setactiveTab(title);
    history.push(`${url}/${route}`);
  };

  return (
    <div className={classes.settingsScreeen}>
      <div className={classes.settingsScreeenNavigation}>
        <ButtonGroup className={classes.btnGroup}>
          {buttons.map(({ title, route }, index) => (
            <Button
              key={index}
              className={activeTab === title ? classes.active : null}
              onClick={handleTab.bind(this, title, route)}
            >
              {title}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <Switch>
        <Suspense fallback={<Loader color={"#223744"} />}>
          <Route path={`${path}/general`} component={General} />
          <Route path={`${path}/deposits`} component={Deposits} />
          <Route path={`${path}/withdraws`} component={WithDraws} />
          <Route path={`${path}/bet-history`} component={BetHistory} />
          <Route path={`${path}/security`} component={Security} />
          <Route path={`${path}/prefrences`} component={Prefrences} />
          <Route path={`${path}/ignored-users`} component={IgnoredUsers} />
          <Route path={`${path}/verify`} component={Verify} />
        </Suspense>
        <Redirect from="/settings" to="/" />
      </Switch>
      {/* <div style={{ margin: 30 }}> */}
      <ScreenFooter />
      {/* </div> */}
    </div>
  );
};

export default SettingsScreeen;
