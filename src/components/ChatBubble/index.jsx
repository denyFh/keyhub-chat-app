import { makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px",
    paddingLeft: props => props.isMe ? "40px" : "16px",
    marginTop: "16px",
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
    flexDirection: "column",
    justifyContent: "center",
    padding: "12px",
    maxWidth: "60%",
    borderRadius: "12px",
    // backgroundColor: props => props.isMe ? "#0e7490" : "#14B8A6",
    color: props => props.isMe ? "#fff" : "#fff",
    marginLeft: props => props.isMe ? "auto" : "initial",
  },

  timestamp: {
    width: "100%",
    fontSize: "11px",
    marginTop: "6px",
    top: "100%",
    left: "0",
    whiteSpace: "nowrap",
    color: "#ffffff99",
    textAlign: props => props.isMe ? "right" : "left",
  },

  message: {
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "320px"
    },
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    textAlign: "left",
  }
}));

// src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Wink&eyebrowType=FlatNatural&mouthType=Vomit&skinColor=DarkBrown" 

const ChatBubble = (props) => {
  const classes = useStyles(props);
  const { message, name } = props;
  const mode = useSelector((state) => state.darkMode.darkMode);
  const { isdarkMode } = mode;

  return (
    <div className={classes.root} >
      <div className={`${classes.bubble} ${!isdarkMode && props.isMe && "bg-[#d97706]"} ${isdarkMode && props.isMe && "bg-[#2993e9]"} ${!isdarkMode && !props.isMe && "bg-[#d87a5f]"} ${isdarkMode && !props.isMe && "bg-[#0a7988]"}`}>
        {
          name ? (
            <div className={`
            text-sm font-bold
            ${props.isMe && "hidden"} 
            ${isdarkMode ? "text-cyan-400" : "text-amber-300"}
            `}>{name}</div>
          ) : (
            <div className=""></div>
          )
        }
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