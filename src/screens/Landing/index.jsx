import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from '../../assets/keyLogo-white.svg';

import Toolkit from '../../components/Toolkit';
import Button from '@mui/material/Button';

import { useAuth0 } from '@auth0/auth0-react';

import { BsGithub } from 'react-icons/bs';

const Landing = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <div className="px-[5vw] py-9 h-[90%] mb-4 flex justify-center bg-gradient-to-bl from-[#F43F5E] via-[#0A7988] to-[#D87A5F] shadow-inner">
                <div className="w-full max-w-[1100px]">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <img className="h-12" src={logo} alt="AppLogo" />
                        </div>
                        <div className="flex items-center">
                            {/* <ToggleDarkMode></ToggleDarkMode> */}
                            <a
                                href="https://github.com/denyFh/keyhub-chat-app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xl p-3 text-white hover:bg-black hover:rounded active:scale-90"
                            >
                                <BsGithub></BsGithub>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-10 md:mt-5 md:flex-row lg:mt-10">
                        <div className="flex-1 bg-white rounded-xl p-12 w-fit">
                            <img className="w-full h-full" src="/illustration.svg" alt="Illustration" />
                        </div>

                        <div className="flex flex-col items-center flex-1 gap-4 mt-12 md:items-start lg:mt-24">
                            <h1 className="text-3xl text-center md:text-left md:text-4xl text-white">
                                Your Alternative Chat Platform
                            </h1>
                            <p className="text-xl text-center md:text-left md:text-2xl text-white">
                                It's free, fast and secure. We make it easy and fun to connect you with people all around the world.
                            </p>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "black",
                                    ":hover": {
                                        backgroundColor: "#f43f5e"
                                    }
                                }}
                                className="w-fit"
                                onClick={() => { loginWithRedirect() }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Start Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <Toolkit></Toolkit>
            </div>
        </>
    );
}

export default Landing;