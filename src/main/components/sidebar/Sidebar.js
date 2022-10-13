import React, { useState, useContext } from "react";
import { Collapse, IconButton, ListItem, ListItemIcon, ListItemText, Button, ButtonGroup, Switch } from "@material-ui/core";
import { ExpandLess, Chat, Close, ExpandMore, Person, Settings, ExitToApp, LockOpen, RecordVoiceOver } from "@material-ui/icons";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import LogoImg from "../../../shared/assets/images/rune.png";
import { AppContext } from "../../../contextApi";
// import { ReactComponent as BannerSvg } from "../../../images/banner-svg.svg";
import bannerSvg from "../../../images/banner-svg.png";
import bannerIconSvg from "../../../images/bannericon-svg.png";
// import { Chat, Close, ExpandMore, Person, Settings, ExitToApp, LockOpen, RecordVoiceOver } from "@material-ui/icons";

const Sidebar = ({ openSideBar, setOpenSideBar, handleSignup, handleSignin, logout }) => {
    const [active, setActive] = useState("Home");
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const { appState, applyAction } = useContext(AppContext);

    const setController = (title) => {
        setActive(title);
        applyAction("sort", title);
    };

    const toggleGameMode = () => {
        const auth = localStorage.getItem("auth");

        if (auth) {
            applyAction("toggle-mode", !appState.gameMode);
        }
    };

    const emoArray1 = [
        {
            emoji: "🎉",
            title: "ALL GAMES",
            link: "/games/games-screen",
        },
        {
            emoji: "🎰",
            title: "Slots",
            link: "/games/games-screen",
        },
        {
            emoji: "🎲",
            title: "dice",
            link: "/games/games-screen",
        },
        {
            emoji: "♦️",
            title: "Poker",
            link: "/games/games-screen",
        },
        {
            emoji: "🎱",
            title: "Black Jack",
            link: "/games/games-screen",
        },
    ];

    const emoArray2 = [
        { emoji: "🎉", title: "New & Fresh" },
        { emoji: "🔥", title: "Popular" },
    ];

    const emoArray3 = [
        { emoji: "🏁", title: "24h Race" },
        { emoji: "🍀", title: "Weekly Race" },
        { emoji: "🏆", title: "Monthly Race" },
    ];
    const emoArray4 = [
        { emoji: <Settings />, title: "Settings" },
        { emoji: <RecordVoiceOver />, title: "Promotions" },
        { emoji: <ExitToApp />, title: "Logout" },
    ];
    return (
        <div className={classes.sidebar}>
            {openSideBar && (
                <div className={classes.headerLogo}>
                    <IconButton onClick={() => setOpenSideBar(false)}>
                        <img src={bannerIconSvg} alt="" className={classes.bannerIconStyle} />
                        <img src={bannerSvg} alt="" className={classes.bannerTextStyle}/>
                    </IconButton>
                    {/* <h3> */}
                    {/* <span>Rune</span> Stake */}
                    {/* <img src={bannerSvg} /> */}
                    {/* </h3> */}
                </div>
            )}
            <div className={classes.btnWrapper}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Balance : </p>
                <ButtonGroup className={classes.btnGroup}>
                    <Button variant="contained" className={classes.btnAction}>
                        <p>{appState.headerBalance}</p>
                        {/* <span className={classes.btnActionSpan}>
                            <ExpandMore />
                        </span> */}
                        {/* <div className={classes.btnTooltip}>{appState.headerBalance}</div> */}
                    </Button>
                    {/* <Button variant="contained" onClick={() => history.push("/deposit")}>
                        Deposit
                    </Button> */}
                </ButtonGroup>
            </div>
            {appState.uRemoteId !== "" && (
                <div className={classes.btnWrapper}>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>Remote Id: </p>
                    <ButtonGroup className={classes.btnGroup}>
                        <Button variant="contained" className={classes.btnAction}>
                            <p>{appState.uRemoteId}</p>
                            {/* <span className={classes.btnActionSpan}>
                            <ExpandMore />
                        </span> */}
                            {/* <div className={classes.btnTooltip}>{appState.headerBalance}</div> */}
                        </Button>
                        {/* <Button variant="contained" onClick={() => history.push("/deposit")}>
                        Deposit
                    </Button> */}
                    </ButtonGroup>
                </div>
            )}
            <div className={classes.btnWrapper}>
                <div className={classes.btnGroup}>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>Fun Mode : </p>
                    <Switch
                        checked={appState.gameMode}
                        onChange={() => toggleGameMode()}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </div>
            </div>
            <div className={classes.sidebarList}>
                <ListItem button onClick={() => setOpen1(!open1)}>
                    <ListItemText primary="Games" />
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={open1} timeout="auto" unmountOnExit>
                    {emoArray1.map(({ emoji, title, link }, index) => (
                        <ListItem
                            component={Link}
                            to={link}
                            key={index}
                            button
                            className={active === title ? classes.active : null}
                            onClick={() => setController(title)}
                        >
                            <ListItemIcon style={{ color: "rgba(0,0,0,1)", fontSize: 20 }}>{emoji}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </Collapse>
            </div>
            <div className={classes.sidebarList}>
                {emoArray2.map(({ emoji, title }, index) => (
                    <ListItem
                        key={index}
                        button
                        component={Link}
                        to="/"
                        className={active === title ? classes.active : null}
                        onClick={() => setActive(title)}
                    >
                        <ListItemIcon style={{ color: "rgba(0,0,0,1)", fontSize: 20 }}>{emoji}</ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
            </div>
            <div className={classes.sidebarList}>
                <ListItem button onClick={() => setOpen2(!open2)}>
                    <ListItemText primary="Promotions" />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    {emoArray3.map(({ emoji, title }, index) => (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to="/"
                            className={active === title ? classes.active : null}
                            onClick={() => setActive(title)}
                        >
                            {emoji ? (
                                <ListItemIcon style={{ color: "rgba(0,0,0,1)", fontSize: 20 }}>{emoji}</ListItemIcon>
                            ) : (
                                <ListItemIcon>
                                    <p className={classes.span}></p>
                                </ListItemIcon>
                            )}
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </Collapse>

                <div className={classes.sidebarAuth}>
                    {/* {emoArray4.map(({ emoji, title }, index) => (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to="/"
                            className={active === title ? classes.active : null}
                            onClick={() => setActive(title)}
                        >
                            <ListItemIcon style={{ color: "white", fontSize: 20 }}>{emoji}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))} */}
                    <div className={classes.showOptions}>
                        <div className={classes.innerAuth}>
                            <div className={classes.iconAuth}>
                                <Settings />
                            </div>
                            <div>Settings</div>
                        </div>
                        <div className={classes.innerAuth}>
                            <div className={classes.iconAuth}>
                                {" "}
                                <RecordVoiceOver />
                            </div>
                            <div>Promotions</div>
                        </div>
                        {appState.singined === true && (
                            <div className={classes.innerAuth}>
                                <div className={classes.iconAuth}>
                                    <ExitToApp />
                                </div>
                                <div onClick={() => logout()}>Logout</div>
                            </div>
                        )}
                        {appState.singined === false && (
                            <div className={classes.innerAuth}>
                                <div className={classes.iconAuth}>
                                    <ExitToApp />
                                </div>
                                <div onClick={() => handleSignup()}>SignUp</div>
                            </div>
                        )}
                        {appState.singined === false && (
                            <div className={classes.innerAuth}>
                                <div className={classes.iconAuth}>
                                    <ExitToApp />
                                </div>
                                <div onClick={() => handleSignin()}>SignIn</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
