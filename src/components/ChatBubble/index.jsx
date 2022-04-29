import { makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px",
    paddingLeft: props => props.isMe ? "40px" : "16px",
    marginTop: "28px",
  },

  img: {
    position: "absolute",
    left: "-42px",
    margin: "0",
    height: "49px",
    width: "49px",
    top: "0",
    borderRadius: "50%",
  },

  bubble: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    maxWidth: "100%",
    borderRadius: "12px",
    backgroundColor: props => props.isMe ? "#e0e0e0" : "#3c4252",
    color: props => props.isMe ? "rgba(0,0,0,.87)" : "#fff",
    marginLeft: props => props.isMe ? "auto" : "initial",
  },

  timestamp: {
    position: "absolute",
    width: "100%",
    fontSize: "11px",
    marginTop: "6px",
    top: "100%",
    left: "0",
    whiteSpace: "nowrap",
    color: "#999",
    textAlign: props => props.isMe ? "right" : "left",
    marginLeft: props => props.isMe ? "-26px" : "6px",
  },

  message: {
    position: "relative",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "320px"
    },
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  }
}));

// src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Wink&eyebrowType=FlatNatural&mouthType=Vomit&skinColor=DarkBrown" 

const ChatBubble = (props) => {
  const classes = useStyles(props);
  const { message } = props;

  return (
    <div className={classes.root} >
      <div className={classes.bubble}>
        <div className={classes.message}>
          {message.message}
        </div>
        <div className={classes.timestamp}>
          {moment(message.created_at).format("l LT")}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;