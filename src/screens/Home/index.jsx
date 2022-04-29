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
import { ExitToAppTwoTone } from '@mui/icons-material';

import { RecoilRoot } from 'recoil';

import { useAuth0 } from "@auth0/auth0-react";

import Message from '../Message';
import Contacts from '../../components/Contacts';
import MessageHeader from '../../components/MessageHeader';
import MessageForm from '../../components/MessageForm';

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "calc(100% - 40px)",
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
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        display: "flex",
        marginTop: "40px",
        flexWrap: "wrap",
        height: "100%",
    },
    chatContent: {
        width: "100%",
        height: "calc(100% - 120px)",
        paddingLeft: theme.spacing(0),
        overflowY: "auto",
    },
    messageForm: {
        overflow: "hidden",
        margin: "20px",
        padding: "0",
    },
}));

const Home = (props) => {
    const { window } = props;
    const { logout } = useAuth0();
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <List>
                    <Contacts></Contacts>
                </List>
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
                    sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
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
                        <ExitToAppTwoTone
                            onClick={() => 
                            logout({
                                returnTo: process.env.REACT_APP_BASE_URL,
                            })
                        }
                        >
                        </ExitToAppTwoTone>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    className={classes.drawer}
                    aria-label="mailbox folders"
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
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar 
                    className={classes.toolbar} 
                    sx={{minHeight: "40px!important"}}
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
