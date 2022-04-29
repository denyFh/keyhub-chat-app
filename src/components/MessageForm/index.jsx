import React from "react";
import { useState } from "react";

import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import { useMutation } from "@apollo/client";
import { INSERT_MESSAGES } from "../../gql/Messages";

import { useAuth0 } from "@auth0/auth0-react";

import { useRecoilState } from "recoil";
import { selectedUserState } from "../../recoil";

const useStyles = makeStyles((theme) => ({
    messageForm: {
        overflow: "hidden",
        margin: "20px",
        padding: "0",
    },
}));

const MessageForm = () => {
    const classes = useStyles();
    const { user } = useAuth0();
    const [ message, setMessage ] = useState("");
    const [selectedUser] = useRecoilState(selectedUserState);

    const [ insertMessage ] = useMutation(INSERT_MESSAGES, {
        variables: {
            fromUserId: user?.sub,
            message: message,
            toUserId: selectedUser?.id,
        },
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        insertMessage();
        setMessage("");
    }

    return (
        <form className={classes.messageForm} noValidate autoComplete='off' onSubmit={handleSubmit}>
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
        </form>
    );
}

export default MessageForm;