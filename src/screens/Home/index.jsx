import * as React from 'react';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles, useTheme } from '@mui/styles';

import { RecoilRoot } from 'recoil';

import { useAuth0 } from "@auth0/auth0-react";

import { useSelector } from 'react-redux';

import Message from '../Message';
import Conversation from '../../components/Conversation';
import MessageHeader from '../../components/MessageHeader';
import MessageForm from '../../components/MessageForm';
import ToggleDarkMode from '../../components/ToggleDarkMode';
import SidebarHeader from '../../components/SidebarHeader';
import UserProfile from '../../components/UserProfile';

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "calc(100% - 40px)",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: "1.1rem"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: "#f5f5f5",
        color: "rgba(0,0,0,.87)",
        boxShadow: "unset",
        borderBottom: "1px solid rgba(0,0,0,.12)",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: {
        minHeight: "58px!important",
    },
    toolbarSide: {
        height: "calc(100% - 4rem)",
    },
    chatContent: {
        width: "100%",
        height: "calc(100% - 120px)",
        paddingLeft: theme.spacing(0),
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarColor: "rgba(0,0,0,.2) rgba(255,255,255,.1)",
        scrollbarWidth: "thin",
    },
    messageForm: {
        overflow: "hidden",
        margin: "20px",
        padding: "0",
    },
}));

const Home = ({ window }) => {
    const { logout } = useAuth0();
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [startChat, setStartChat] = useState(false);
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleStartChat = () => {
        setStartChat(!startChat);
    }

    const drawer = (
        <div className={`h-[calc(100%-4rem)]`}>
            <div onClick={handleStartChat} className="absolute top-0 z-[1200] w-full">
                <SidebarHeader>
                </SidebarHeader>
            </div>
            <div className="flex flex-col justify-between h-full">
                <List sx={{
                    marginTop: "64px",
                    paddingTop: "1px",
                    overflowY: "auto"
                }}>
                    <div onClick={handleDrawerToggle}>
                        <Conversation></Conversation>
                    </div>
                </List>
                <UserProfile></UserProfile>
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <RecoilRoot>
            <Box className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={isdarkMode ? {
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: "#0E7490",
                        boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    } : {
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: "#ffdc81",
                        boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <MessageHeader></MessageHeader>
                        <ToggleDarkMode></ToggleDarkMode>
                        <div
                            className={`border-2 border-solid rounded p-0.5 hover:cursor-pointer active:scale-90 ${isdarkMode ? "border-white hover:bg-rose-500" : "border-amber-700 hover:bg-white"}`}
                            onClick={() =>
                                logout({
                                    returnTo: process.env.REACT_APP_BASE_URL,
                                })
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={`${isdarkMode ? "#fff" : "#B45309"}`} height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                            </svg>
                        </div>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    className={classes.drawer}
                    aria-label="chat drawer"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={isdarkMode ? {
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#292c35"},
                        } : {
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#ffa680"},
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        className={classes.toolbarSide}
                        sx={isdarkMode ? {
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#292c35"},
                        } : {
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#ffa680"},
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    className="p-0 mt-6 sm:p-6"
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <Toolbar
                        className={classes.toolbar}
                    />

                    <div className={classes.chatContent}>
                        <Message></Message>
                    </div>

                    <div className={classes.chatFooter}>
                        <MessageForm></MessageForm>
                    </div>
                </Box>
            </Box>
        </RecoilRoot>
    );
}

export default Home;
