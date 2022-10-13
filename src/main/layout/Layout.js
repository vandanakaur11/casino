import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScreenComponent from "../components/screenComponent/ScreenComponent";
import Loader from "../../shared/UI/Loader";

const HomeScreen = lazy(() => import("../pages/homeScreen/HomeScreen"));
const SettingsScreen = lazy(() => import("../pages/settingsScreen/SettingsScreeen"));

const Wallet = lazy(() => import("../pages/walletScreen/WalletScreen"));
const PromotionsScreen = lazy(() => import("../pages/promotions/PromotionsScreen"));
// const PokerMavens = lazy(() => import("../pages/gamesScreen/PokerMavens"));
const GamesScreen = lazy(() => import("../pages/gamesScreen/GamesScreen"));
const GameScreen = lazy(() => import("../pages/gamesScreen/GameScreen"));
const GamesHomeScreen = lazy(() => import("../pages/gamesScreen/GamesHome"));
const GamesPlayScreen = lazy(() => import("../pages/gamesScreen/GamePlay"));

const Layout = () => {
    return (
        <Router>
            <Suspense fallback={<Loader color={"#0a212f"} />}>
                <Route exact path="/">
                    <ScreenComponent Screen={HomeScreen} />
                </Route>
                <Route path="/settings">
                    <ScreenComponent Screen={SettingsScreen} />
                </Route>
                <Route path="/deposit">
                    <ScreenComponent Screen={() => <Wallet isDeposit />} />
                </Route>
                <Route path="/withdraw">
                    <ScreenComponent Screen={Wallet} />
                </Route>
                <Route path="/promotions">
                    <ScreenComponent Screen={PromotionsScreen} />
                </Route>
                <Route path="/games/games-screen">
                    <ScreenComponent Screen={GamesScreen} />
                </Route>
                <Route path="/games/game-screen">
                    <ScreenComponent Screen={GameScreen} />
                </Route>
                <Route path="/games/gamesHome-screen">
                    <ScreenComponent Screen={GamesHomeScreen} />
                </Route>
                <Route path="/games/gamePlay-screen">
                    <ScreenComponent Screen={GamesPlayScreen} />
                </Route>
            </Suspense>
        </Router>
    );
};

export default Layout;
