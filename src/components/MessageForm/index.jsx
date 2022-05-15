import React from "react";
import { useState } from "react";

import TextField from '@mui/material/TextField';

import { BsArrowRightSquareFill } from "react-icons/bs";

import { useMutation } from "@apollo/client";
import { INSERT_MESSAGES } from "../../gql/Messages";

import { useAuth0 } from "@auth0/auth0-react";

import { useRecoilState } from "recoil";
import { selectedGroupState, selectedUserState } from "../../recoil";

import "./style.css";
import { INSERT_MSG_GROUP } from "../../gql/MessagesGroup";
import { useSelector } from "react-redux";

const MessageForm = () => {
    const { user } = useAuth0();
    const [ message, setMessage ] = useState("");
    const [ messageGrup, setMessageGrup ] = useState("");
    const [selectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup] = useRecoilState(selectedGroupState);
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    const [ insertMessage ] = useMutation(INSERT_MESSAGES, {
        variables: {
            fromUserId: user?.sub,
            message: message,
            toUserId: selectedUser?.id,
        },
    });

    const [ insertGroupMessage ] = useMutation(INSERT_MSG_GROUP, {
        variables: {
            fromMemberId: user?.sub,
            groupId: selectedGroup?.id,
            message: messageGrup,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message === '') {
            setMessage("");
        } else {
            insertMessage();
            setMessage("");
        }
    }

    const handleSubmitGroup = (e) => {
        e.preventDefault();
        if (messageGrup === '') {
            setMessageGrup("");
        } else {
            insertGroupMessage();
            setMessageGrup("");
        }
    }

    if (selectedUser.id === null && selectedGroup.id === null) {
        return (
            <div></div>
        )
    } else if ( selectedUser.id !== null ) {
        return (
            <form 
                className={`m-5 p-0 overflow-hidden flex justify-between gap-5 user`} 
                noValidate 
                autoComplete='off' 
                onSubmit={handleSubmit}
            >
                <TextField 
                    id="input-message" 
                    variant="outlined" 
                    placeholder="Ketik pesan" 
                    fullWidth={true}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        background: "#fff"
                    }} />
                <button className="submit-button" type="submit">
                    <BsArrowRightSquareFill fill={`${isdarkMode ? "#0E7490" : "#D97706"}`}></BsArrowRightSquareFill>
                </button>
            </form>
        );
    } else if ( selectedGroup.id !== null ) {
        return (
            <form 
                className={`m-5 p-0 overflow-hidden flex justify-between gap-5 group`} 
                noValidate 
                autoComplete='off' 
                onSubmit={handleSubmitGroup}
            >
                <TextField 
                    id="input-message" 
                    variant="outlined" 
                    placeholder="Ketik pesan" 
                    fullWidth={true}
                    value={messageGrup}
                    onChange={(e) => setMessageGrup(e.target.value)}
                    style={{
                        background: "#fff"
                    }} />
                <button className="submit-button" type="submit">
                    <BsArrowRightSquareFill fill={`${isdarkMode ? "#0E7490" : "#D97706"}`}></BsArrowRightSquareFill>
                </button>
            </form>
        )
    }

}

export default MessageForm;