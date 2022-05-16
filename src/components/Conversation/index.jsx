import React from "react";

import logo from "../../logo.svg";

import _ from "lodash";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from "@mui/styles";

import { useSubscription } from "@apollo/client";
import { GET_CONTACTED_USER, GET_NEWCOMER_USER } from "../../gql/ContactList";
import { CHECK_USER_GROUPS } from "../../gql/MessagesGroup";
import { useRecoilState } from "recoil";
import { selectedGroupState, selectedUserState } from "../../recoil";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

import './style.css';

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

const Conversation = (props) => {
    const classes = useStyles(props);
    
    const { user } = useAuth0();

    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState);

    const users = [];
    
    const { data: dataNewcomer, loading: loadingNewcomer } = useSubscription(GET_NEWCOMER_USER, {
        variables: { order_by: { name: "desc" }, _neq: user.sub },
        fetchPolicy: "no-cache",
    });

    const { data: dataContacted, loading: loadingContacted } = useSubscription(GET_CONTACTED_USER, {
        variables: { order_by: { name: "asc" }, _neq: user.sub },
        fetchPolicy: "no-cache",
    });

    const { data: dataUserGroup, loading: loadingGroups } = useSubscription(CHECK_USER_GROUPS, {
        variables: { _eq: user.sub},
        fetchPolicy: "no-cache",
    })

    // console.log("usergroup", dataUserGroup);
    // const contactedArr = dataContacted?.users;
    // const newcomerArr = dataNewcomer?.users;

    // if (dataNewcomer && dataNewcomer?.users && !dataContacted ) {
    //     console.log("masuk satu");
    //     users.push(...dataNewcomer.users)
    // } else if (dataContacted && dataContacted?.users && !dataNewcomer ) {
    //     console.log("masuk dua");
    //     users.push(...dataContacted.users)
    // } else 

    console.log("newcomer", dataNewcomer)
    console.log("contacted", dataContacted)

    if ((dataNewcomer && dataNewcomer?.users) || (dataContacted && dataContacted?.users)) {
        console.log("masuk tiga")
        const mergeByProperty = (arr1, arr2, prop) => {
            _.each(arr2, function (arr2obj) {
                var arr1obj = _.find(arr1, function (arr1obj) {
                    return arr1obj[prop] === arr2obj[prop];
                });

                arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
            });
        }

        var target /* arr1 */ = dataNewcomer?.users;
        var source /* arr2 */ = dataContacted?.users;

        console.log("target",target)
        console.log("source", source)

        mergeByProperty(target, source, 'id');

        users?.push(...target);
    }

    if (loadingNewcomer && loadingContacted && loadingGroups) {
        return (
            <div className={`flex items-center justify-center h-full ${isdarkMode ? "text-white" : "text-black"}`}>
                Retrieving chats...
            </div>
        )
    } else {
        return (
            <div className="pt-0 contact-list">
                {
                    dataUserGroup?.groups.map((group) => (
                        <div className="group-container" key={group.id}>
                            <ListItem 
                            button 
                            id={selectedGroup.id} 
                            onClick={() => {setSelectedUser({id: null, name: ""}); setSelectedGroup(group);}}
                            sx={ isdarkMode ? (group.id === selectedGroup.id ? {
                                backgroundColor: "#155E75"
                            } : {
                                backgroundColor: "transparent",
                            }) : ( group.id === selectedGroup.id ? {
                                backgroundColor: "#fff4da",
                            } : {
                                backgroundColor: "transparent",
                            })}
                            >
                                <img alt="GrupImg" src={logo} className={`${classes.img} p-0.5 ${isdarkMode ? "bg-black" : "bg-white"}`}></img>
                                <ListItemText
                                    primary={group.groupName}
                                    sx={isdarkMode ? {
                                        color: 'white'
                                    } : {
                                        color: 'black'
                                    }}
                                />
                            </ListItem>
                        </div>
                    ))
                }
                {
                    users?.map((user) => (
                        <div className="contact-container" key={user.id}>
                            <ListItem 
                            button 
                            id={selectedUser.id} 
                            onClick={() => {setSelectedGroup({id: null, groupName: ""}); setSelectedUser(user);}}
                            sx={ isdarkMode ? (user.id === selectedUser.id ? {
                                backgroundColor: "#155E75"
                            } : {
                                backgroundColor: "transparent",
                            }) : ( user.id === selectedUser.id ? {
                                backgroundColor: "#fff4da",
                            } : {
                                backgroundColor: "transparent",
                            })}
                            >
                                <img alt="" src={user.picture} className={classes.img}></img>
                                <ListItemText
                                    primary={user.name}
                                    sx={isdarkMode ? {
                                        color: 'white'
                                    } : {
                                        color: 'black'
                                    }}
                                />
                            </ListItem>
                        </div>
                    ))
                }
            </div>
        );
    }
};

export default Conversation;
