import React, { useEffect, useState } from "react";
import Header from "../header/Header";
// import Sidebar from "../sidebar/Sidebar";
import ChatChannel from "../chatChannel/ChatChannel";
import classes from "./ScreenComponent.module.css";

const ScreenComponent = ({ Screen }) => {
  const [chatScreen, setChatScreen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [innerWidth, setInnerWidth] = useState(1400);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      if (window.innerWidth > 1200) {
        setOpenSideBar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    setInnerWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseChat = () => {
    setChatScreen(false);
  };

  const handleOpen = () => {
    setChatScreen(!chatScreen);
  };

  const headerProps = {
    handleOpen,
    openSideBar,
    setOpenSideBar,
    innerWidth,
    chatScreen,
    handleCloseChat,
  };

  return (
    <div className={classes.layoutScreen}>
      <div className={classes.layoutContainer}>
        <Header headerProps={headerProps} />
        <div className={classes.layoutDiv}>
          {/* {innerWidth > 1200 ? <Sidebar /> : null} */}
          <Screen />
        </div>
      </div>
      <div className={chatScreen ? classes.showChat : classes.hideChat}>
        <ChatChannel handleClose={handleCloseChat} />
      </div>
    </div>
  );
};

export default ScreenComponent;
