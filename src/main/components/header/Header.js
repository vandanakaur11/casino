import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import { Button, ButtonGroup, Dialog, IconButton, Drawer, Popper, MenuItem, Grow, MenuList, ClickAwayListener } from "@material-ui/core";
import { Chat, Close, ExpandMore, Person, Settings, ExitToApp, LockOpen, RecordVoiceOver } from "@material-ui/icons";
import LogoImg from "../../../shared/assets/images/rune.png";
import SearchImg from "../../../shared/assets/images/search.png";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import ChatChannel from "../chatChannel/ChatChannel";
import OTP from "../../components/otpComp/OtpComp";
import axios from "axios";
import { AppContext } from "../../../contextApi";
import bannerSvg from "../../../images/banner-svg.png";
import bannerIconSvg from "../../../images/bannericon-svg.png";

// let logo = "https://cdn.zeplin.io/60ce4ef4ada95e14a9dde2f5/assets/775424A6-8E33-4ED5-B3D0-CD9ABB030EF5.svg"

const Header = ({ headerProps }) => {
    const { handleOpen, openSideBar, setOpenSideBar, innerWidth, chatScreen, handleCloseChat } = headerProps;
    const { appState, applyAction } = useContext(AppContext);
    const history = useHistory();

    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordAgain, setUserPasswordAgain] = useState("");
    const [forOtp, setForOtp] = useState("");
    const [warnMessage, setWarnMessage] = useState("");
    const [name, setName] = useState("*******");

    let auth = localStorage.getItem("auth");
    if (auth) {
        auth = JSON.parse(auth);
        auth = auth.name;
        if (name !== `hi, ${auth}`) setName("hi, " + auth);
    } else {
    }

    let body = {
        firstname: Fname,
        lastname: Lname,
        email: UserEmail,
        password: userPassword,
    };
    let bodyLogin = {
        email: UserEmail,
        password: userPassword,
    };

    let bodyVerify = {
        email: UserEmail,
    };

    let bodyOtp = {
        Otpcode: forOtp,
    };

    let bodyReset = {
        email: UserEmail,
        password: userPassword,
    };

    // async function handleSignUp() {
    //     console.log(body);
    //     await handleSubmit();
    // }

    const [customerSigin, setCustomerSigin] = useState(false);
    const [customerSigup, setCustomerSigup] = useState(false);

    const [openSettings, setOpenSettings] = useState(false);
    const [showForget, setShowForget] = useState(false);
    const [showVerify, setShowVerify] = useState(false);

    const [modalToShow, setModalToShow] = useState("");
    const [showtime, setShowtime] = useState(false);
    const [Uremote_id, setRemote_id] = useState("");

    const anchorRef = useRef();
    const prevOpen = useRef(openSettings);

    // return focus to the button when we transitioned from !open -> open
    useEffect(async () => {
        if (prevOpen.current === true && openSettings === false) {
            anchorRef.current.focus();
        }
        let auth = localStorage.getItem("auth");
        if (auth) {
            auth = JSON.parse(auth);
            let remote_id = auth.remote_id;
            applyAction("set-remote-id", JSON.parse(remote_id));
            const balanceObj = await axios.get(
                `https://runescape-casino-api.herokuapp.com/api/v1/admin/fe?action=balance&remote_id=${remote_id}`,
            );
            localStorage.setItem("currentBalnce", balanceObj.data.balance);
            applyAction("set balance", balanceObj.data.balance);
        }

        prevOpen.current = openSettings;
    }, [openSettings]);

    const handleToggleSettings = () => {
        setOpenSettings(!openSettings);
    };

    const logout = () => {
        localStorage.clear();
        history.push("/");
        window.location.reload();
    };

    const handleSignin = () => {
        setCustomerSigup(false);
        setCustomerSigin(true);
        setShowForget(false);
        setModalToShow("login");
    };

    const handleSignup = () => {
        setFname("");
        setLname("");
        setUserEmail("");
        setUserPassword("");
        setCustomerSigin(false);
        setCustomerSigup(true);
        setShowForget(false);
    };
    // const handleForgotPassword = () => {
    //     setShowForget(true);
    // };
    const handleVerify = (val) => {
        if (val === "forgot") {
            setUserEmail("");
            setModalToShow(val);
        }
        if (val === "verify") {
            // setModalToShow(val);
            emailVerify();
        }
        if (val === "otp") {
            // timeWait(val);
            // setShowtime(true);
            // setModalToShow(val);
            otpVerify();
        }
        if (val === "reset") {
            setUserPassword("");
            setUserPasswordAgain("");
            console.log(userPasswordAgain, userPassword);
            if (userPassword === userPasswordAgain && userPassword && userPasswordAgain) {
                resetVerify();
            } else {
                setWarnMessage("Password Mismatch");
                setUserPassword("");
                setUserPasswordAgain("");
                setTimeout(() => {
                    setWarnMessage("");
                }, 3000);
            }
        }
    };
    async function emailVerify() {
        try {
            let res = await axios.post("https://runescape-casino-api.herokuapp.com/api/v1/user/req-otp", bodyVerify);
            console.log(res);
            if (res.data.status == 200) setModalToShow("verify");
            if (res.data.status == 400) {
                setWarnMessage(res.data.response);
                setTimeout(() => {
                    setWarnMessage("");
                }, 3000);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    async function otpVerify() {
        try {
            console.log(bodyOtp);
            let res = await axios.post("https://runescape-casino-api.herokuapp.com/api/v1/user/verify-otp", bodyOtp);
            console.log(res);
            if (res.data.status == 200) setModalToShow("otp");
            if (res.data.status == 400) {
                console.log(res.data.response);
                setWarnMessage("Otp code invalid or expired");
                setTimeout(() => {
                    setWarnMessage("");
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    }
    async function resetVerify() {
        try {
            let res = await axios.post("https://runescape-casino-api.herokuapp.com/api/v1/user/change-password", bodyReset);
            if (res.data.status == 200) setCustomerSigin(false);
        } catch (err) {
            console.log(err);
        }
    }

    function timeWait(val) {
        setTimeout(() => {
            setShowtime(false);
        }, 30000);
    }

    async function handleSubmit(e) {
        // e.preventDefault();
        console.log(body);
        try {
            let res = await axios.post("https://runescape-casino-api.herokuapp.com/api/v1/user/signup", body);
            console.log(res);
            if (res.data.status == 200) {
                setCustomerSigup(false);
                // let auth = localStorage.getItem('auth');
                // auth = JSON.parse(auth);
                // let remote_id = auth.remote_id;
                // const res = await axios.post(`http://localhost:5050/api/v1/admin?action=balance&remote_id=${remote_id}`);
                // console.log(res)
            }
            if (res.data.status == 400) {
                setWarnMessage(res.data.response);
                setTimeout(() => {
                    setWarnMessage("");
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    }
    async function handleSubmitLogin(e) {
        // e.preventDefault();
        try {
            let res = await axios.post("https://runescape-casino-api.herokuapp.com/api/v1/user/login", bodyLogin);
            console.log(res.data);

            if (res.data.status == 200) {
                let auth = res.data.response;
                let remote_id = auth.remote_id;
                localStorage.setItem("remoteId", remote_id);

                const balanceObj = await axios.get(
                    `https://runescape-casino-api.herokuapp.com/api/v1/admin?action=balance&remote_id=${remote_id}`,
                );
                localStorage.setItem("currentBalnce", balanceObj.data.balance);
                applyAction("set balance", balanceObj.data.balance);
                auth = JSON.stringify(auth);
                localStorage.setItem("auth", auth);
                localStorage.setItem("email", res.data.response.email);
                setName(`hi, ${res.data.response.name}`);
                applyAction("signin", {
                    singined: true,
                });
                setCustomerSigin(false);
                window.location.reload();
            }

            if (res.data.status == 400) {
                setWarnMessage(res.data.response);
                setTimeout(() => {
                    setWarnMessage("");
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const customerSigupDialog = (
        <Dialog open={customerSigup} fullWidth={true} maxWidth="md" onClose={() => setCustomerSigup(false)}>
            <div className={classes.customerSigupDialog}>
                <div className={classes.customerSigupDialogLeft}>
                    <div className={classes.customerSigupDialogLeftLogo}>
                        <img src={LogoImg} alt="" />
                        <h3>Rune Stack</h3>
                    </div>
                    <div className={classes.content}>
                        <h3>Create a free account and start playing at Rune Stake</h3>
                        <p>It only takes a minute.</p>
                    </div>
                    <Button variant="contained" onClick={handleSignin}>
                        Already a Customer?
                    </Button>
                </div>
                <div className={classes.customerSigupDialogRight}>
                    <IconButton onClick={() => setCustomerSigup(false)}>
                        <Close />
                    </IconButton>

                    <form onSubmit={handleSubmit} className={classes.customerSiginDialogMain} style={{ width: "100%" }}>
                        <div className={classes.dialogInput}>
                            <label>First Name</label>
                            <input type="text" onChange={(e) => setFname(e.target.value)} />
                        </div>
                        <div className={classes.dialogInput}>
                            <label>Last Name</label>
                            <input type="text" onChange={(e) => setLname(e.target.value)} />
                        </div>
                        <div className={classes.dialogInput}>
                            <label>Email</label>
                            <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
                        </div>
                        <div className={classes.dialogInput}>
                            <label>Password</label>
                            <input type="password" onChange={(e) => setUserPassword(e.target.value)} />
                            <p style={{ textAlign: "center", color: "red" }}>{warnMessage}</p>
                            <p>
                                Your password must be at least 6 characters long, and should contain both upper (A-Z) and lower (a-z) case
                                characters, and at least 1 number (0-9)
                            </p>
                        </div>
                        <div className={classes.formBtns}>
                            <Button variant="contained" onClick={() => handleSubmit()}>
                                Sign up
                            </Button>
                        </div>
                        <p>
                            By creating an account you agree to the <Link to="/">Terms of Service</Link> and
                            <Link to="/"> Privacy Policy.</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Dialog>
    );

    const customerSiginDialog = (
        <Dialog open={customerSigin} fullWidth={true} maxWidth="sm" onClose={() => setCustomerSigin(false)}>
            <>
                {modalToShow === "login" && (
                    <div className={classes.customerSiginDialog}>
                        <IconButton onClick={() => setCustomerSigin(false)}>
                            <Close />
                        </IconButton>
                        <form className={classes.customerSiginDialogMain}>
                            <h2>Customer Login</h2>
                            <div className={classes.dialogInput}>
                                <label>Email</label>
                                <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div className={classes.dialogInput}>
                                <div className={classes.dialogInputOptions}>
                                    <label>Password</label>
                                    <Link to="/" onClick={() => handleVerify("forgot")}>
                                        {" "}
                                        Forgot Password{" "}
                                    </Link>
                                </div>
                                <input type="password" onChange={(e) => setUserPassword(e.target.value)} />
                            </div>
                            <div className={classes.formBtns}>
                                <Button variant="contained" onClick={() => handleSubmitLogin()}>
                                    Login
                                </Button>
                                <Button onClick={handleSignup}>Create An Account</Button>
                            </div>
                            <p style={{ textAlign: "center", color: "red" }}>{warnMessage}</p>
                        </form>
                    </div>
                )}
                {modalToShow === "forgot" && (
                    <div>
                        <div className={classes.customerSiginDialog}>
                            <IconButton onClick={() => setCustomerSigin(false)}>
                                <Close />
                            </IconButton>
                            <form className={classes.customerSiginDialogMain}>
                                <h2>Reset Password</h2>
                                <div className={classes.dialogInput}>
                                    <label>Email</label>
                                    <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
                                </div>

                                <div className={classes.formBtns}>
                                    <Button onClick={() => handleVerify("verify")}>Verify Email</Button>
                                </div>
                                <p style={{ textAlign: "center", color: "red" }}>{warnMessage}</p>
                            </form>
                        </div>
                    </div>
                )}
                {modalToShow === "verify" && (
                    <div>
                        <div className={classes.customerSiginDialog}>
                            <IconButton onClick={() => setCustomerSigin(false)}>
                                <Close />
                            </IconButton>
                            <form className={classes.customerSiginDialogMain}>
                                <h2>Enter OTP Code</h2>
                                <div className={classes.dialogInput}>
                                    <label></label>
                                    {/* <div className={classes.otp}>
                                        <input type="email" />
                                        <input type="email" />
                                        <input type="email" />
                                        <input type="email" />
                                    </div> */}
                                    <OTP setForOtp={setForOtp} />
                                </div>

                                <div className={classes.formBtns}>
                                    <Button onClick={() => handleVerify("otp")}>Verify Code</Button>
                                </div>
                                <p style={{ textAlign: "center", color: "red" }}>{warnMessage}</p>
                                {showtime && <div style={{ textAlign: "center", marginTop: "10px" }}>Wait for 30 Seconds</div>}
                                {showtime && (
                                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                                        Didn't get code !! <span style={{ color: "blue" }}>Resend</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
                {modalToShow === "otp" && (
                    <div>
                        <div className={classes.customerSiginDialog}>
                            <IconButton onClick={() => setCustomerSigin(false)}>
                                <Close />
                            </IconButton>
                            <form className={classes.customerSiginDialogMain}>
                                <h2>Reset Password</h2>
                                <div className={classes.dialogInput}>
                                    <label>Choose New Password</label>

                                    <input type="email" onChange={(e) => setUserPassword(e.target.value)} />
                                    <label>Confirm New Password</label>

                                    <input type="email" onChange={(e) => setUserPasswordAgain(e.target.value)} />
                                    <p style={{ textAlign: "center", color: "red" }}>{warnMessage}</p>
                                </div>

                                <div className={classes.formBtns}>
                                    <Button onClick={() => handleVerify("reset")}>Update Password</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        </Dialog>
    );

    // const forgetPasswordDialog = (
    //     <Dialog open={customerSigin} fullWidth={true} maxWidth="sm" onClose={() => setCustomerPassForget(false)}>
    //         {showForget && (
    //             <div>
    //                 <div className={classes.customerSiginDialog}>
    //                     <IconButton onClick={() => setCustomerSigin(false)}>
    //                         <Close />
    //                     </IconButton>
    //                     <form className={classes.customerSiginDialogMain}>
    //                         <h2>Reset Password</h2>
    //                         <div className={classes.dialogInput}>
    //                             <label>Email</label>
    //                             <input type="email" />
    //                         </div>

    //                         <div className={classes.formBtns}>
    //                             <Button onClick={handleSignup}>Verify Email</Button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         )}
    //     </Dialog>
    // );

    const sidebarDrawer = (
        <Drawer anchor="left" open={openSideBar} onClose={() => setOpenSideBar(false)}>
            <div className={classes.sidebarDrawer}>
                <Sidebar
                    openSideBar={openSideBar}
                    setOpenSideBar={setOpenSideBar}
                    handleSignin={handleSignin}
                    handleSignup={handleSignup}
                    logout={logout}
                />
            </div>
        </Drawer>
    );
    const chatDrawer = (
        <Drawer anchor="right" open={chatScreen} onClose={handleCloseChat}>
            <div className={classes.sidebarDrawer}>
                <ChatChannel handleClose={handleCloseChat} />
            </div>
        </Drawer>
    );

    const handleClosePopper = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenSettings(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenSettings(false);
        }
    }

    const myAccountPopper = (
        <Popper open={openSettings} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                >
                    <div className={classes.settingsButton}>
                        <ClickAwayListener onClickAway={() => setOpenSettings(false)}>
                            <MenuList autoFocusItem={openSettings} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <h5>{name}</h5>
                                <MenuItem
                                    component={Link}
                                    to="/settings/general"
                                    className={classes.settingsButtonList}
                                    onClick={handleClosePopper}
                                >
                                    <Settings style={{ marginRight: 5 }} />
                                    Settings
                                </MenuItem>
                                <MenuItem className={classes.settingsButtonList} onClick={() => history.push("/promotions")}>
                                    <RecordVoiceOver style={{ marginRight: 5 }} />
                                    Promotions
                                </MenuItem>
                                {appState.singined === false && (
                                    <div>
                                        <MenuItem className={classes.settingsButtonList} onClick={handleSignup}>
                                            <ExitToApp style={{ marginRight: 5 }} />
                                            Sign up
                                        </MenuItem>

                                        <MenuItem className={classes.settingsButtonList} onClick={handleSignin}>
                                            <LockOpen style={{ marginRight: 5 }} />
                                            Sign in
                                        </MenuItem>
                                    </div>
                                )}
                                {appState.singined === true && (
                                    <div>
                                        <MenuItem className={classes.settingsButtonList} onClick={logout}>
                                            <ExitToApp style={{ marginRight: 5 }} />
                                            Logout
                                        </MenuItem>
                                    </div>
                                )}
                            </MenuList>
                        </ClickAwayListener>
                    </div>
                </Grow>
            )}
        </Popper>
    );

    return (
        <div className={classes.header}>
            <div className={classes.headerLogo}>
                <IconButton
                    // onClick={() => (innerWidth < 1200 ? setOpenSideBar(true) : null)}
                    onClick={() => setOpenSideBar(true)}
                >
                    <img src={bannerIconSvg} alt="" className={classes.bannerIconStyle} />
                </IconButton>
                <h3>
                    <Link to="/">
                        {/* <span>Rune</span> Stake */}
                        <img src={bannerSvg} alt="" className={classes.bannerTextStyle} />
                    </Link>
                </h3>
            </div>
            {/* <div className={classes.search}>
                <img src={SearchImg} alt="" className={classes.searchIcon} />
                <input placeholder={"Search Games"} />
            </div> */}
            {/* <div className={classes.navText}>
                <div onClick={() => history.push("/games/games-screen")}>* ALL GAMES *</div>
            </div> */}

            <div className={classes.headerMain}>
                <ButtonGroup className={classes.btnGroup}>
                    <Button variant="contained" className={classes.btnAction}>
                        <p>{appState.headerBalance}</p>
                        {/* <span className={classes.btnActionSpan}>
                            <ExpandMore />
                        </span> */}
                        <div className={classes.btnTooltip}>{appState.headerBalance}</div>
                    </Button>
                    {/* <Button variant="contained" onClick={() => history.push("/deposit")}>
                        Deposit
                    </Button> */}
                </ButtonGroup>

                <div className={classes.headerMainActions}>
                    {/* <Button variant="contained" className={classes.btnDeposit} onClick={() => history.push("/withdraw")}>
                        Withdraw
                    </Button> */}
                    <IconButton ref={anchorRef} onClick={handleToggleSettings}>
                        <Person />
                    </IconButton>
                    {myAccountPopper}
                    {/* <IconButton onClick={handleOpen}>
                        <Chat />
                    </IconButton> */}
                </div>
            </div>

            {customerSiginDialog}
            {customerSigupDialog}
            {/* {forgetPasswordDialog} */}
            {sidebarDrawer}
            {innerWidth <= 970 && chatDrawer}
        </div>
    );
};

export default Header;
