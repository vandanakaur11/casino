import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import { Close, ExpandMore, Launch } from "@material-ui/icons";
import React from "react";
import classes from "./ChatChannel.module.css";

const ChatChannel = ({ handleClose }) => {
    return (
        <div className={classes.chat}>
            <div className={classes.chatHeader}>
                <Button>
                    <img src={"https://cdn.rawgit.com/lipis/flag-icon-css/0255b4b9/flags/1x1/gb.svg"} alt="" />
                    Chat English
                    <ExpandMore className={classes.chatHeaderIcon} />
                </Button>
                <ButtonGroup>
                    <IconButton>
                        <Launch />
                    </IconButton>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </ButtonGroup>
            </div>

            <div className={classes.chatMessages}>
                {[...Array(100)].map((_, i) => (
                    <p key={i} className={classes.chatMessage}>
                        <img
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzODfFwiBQ-n7jzOJBd3H-U-S037Ql1CStog&usqp=CAU"}
                            alt=""
                        />
                        <h4>Jhon Doe:</h4>
                        Why are you tagging dude?
                    </p>
                ))}
            </div>

            <div className={classes.chatBottom}>
                <div className={classes.messageInput}>
                    <input placeholder={"Type Your Message Here"} />
                    <Button variant="contained">Send</Button>
                </div>
                <p>
                    <span />
                    42422 Customers Online
                </p>
            </div>
        </div>
    );
};

export default ChatChannel;
