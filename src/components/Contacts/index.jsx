import React from "react";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { makeStyles } from "@mui/styles";

import { useQuery } from "@apollo/client";
import { GET_DATA } from "../../gql/ContactList";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../recoil";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
    img: {
        height: "39px",
        maxWidth: "39px",
        marginRight: theme.spacing(2),
        objectFit: "cover",
        objectPosition: "top center",
        borderRadius: "50%"
    }
}));

const Contacts = (props) => {
    const classes = useStyles(props);
    const { user } = useAuth0();

    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

    const { data } = useQuery(GET_DATA, {
        variables: { order_by: { name: "asc" }, _neq: user.sub },
    });

    const users = [{id: null, name: "Lobby"}];
    if ( data && data.users ) {
        users.push(...data.users);
    }

    return (
        <div className="contact-container">
            {
                users.map((user) => (
                    <div className="contact-container" key={user.id}>
                        <ListItem button id={user.id} onClick={() => setSelectedUser(user)}>
                            <img alt="" src={user.picture} className={classes.img}></img>
                            <ListItemText primary={user.name} />
                        </ListItem>
                        <Divider></Divider>
                    </div>
                ))
            }
        </div>
    );
};

export default Contacts;
