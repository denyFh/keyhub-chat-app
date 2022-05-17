import React, { Component } from "react";
import Slider from "react-slick";
import './style.css';

import reactLogo from '../../assets/react.png';
import craLogo from '../../assets/cra.png';
import reduxLogo from '../../assets/redux.png';
import hasuraLogo from '../../assets/hasura.svg';
import gqlLogo from '../../assets/graphql.png';
import apolloLogo from '../../assets/apollo.png';
import authLogo from '../../assets/Auth0.png';
import muiLogo from '../../assets/mui.png';
import recoilLogo from '../../assets/recoil.png';
import routerLogo from '../../assets/reactrouter6.png';
import iconsLogo from '../../assets/react-icons.png';
import alertLogo from '../../assets/SweetAlert2.png';
import netlifyLogo from '../../assets/netlify.png';
import githubLogo from '../../assets/GitHub.png';

export default class Toolkit extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 3000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <>
                <h2 className="text-2xl text-center font-semibold mb-6">Libraries and Tools</h2>
                <div className="bg-slate-200 bg-opacity-30 shadow-inner max-h-32 py-5">
                    <Slider {...settings} className="text-black">
                        <div className="logo-container align-middle flex-row gap-3">
                            <img src={reactLogo} alt="reactLogo" className="max-h-16" />
                            <h4 className="text-2xl font-medium">React</h4>
                        </div>
                        <div className="logo-container align-middle flex-row gap-3">
                            <img src={craLogo} alt="craLogo" className="max-h-16"/>
                            <h4 className="text-xl font-medium">Create React App</h4>
                        </div>
                        <div className="logo-container align-middle flex-row gap-3">
                            <img src={reduxLogo} alt="reduxLogo" className="max-h-16"/>
                            <h4 className="text-xl font-medium">Redux & Toolkit</h4>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={recoilLogo} alt="recoilLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={hasuraLogo} alt="hasuraLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={gqlLogo} alt="gqlLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={apolloLogo} alt="apolloLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={routerLogo} alt="routerLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={authLogo} alt="auth0Logo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={muiLogo} alt="muiLogo" className="max-h-16"/>
                        </div>
                        <div className="logo-container align-middle flex-row gap-3">
                            <img src={iconsLogo} alt="iconsLogo" className="max-h-16"/>
                            <h4 className="text-xl font-medium">React Icons</h4>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={alertLogo} alt="alertLogo" className="max-h-16 w-[80%]"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={netlifyLogo} alt="netlifyLogo" className="max-h-16 max-w-[80%]"/>
                        </div>
                        <div className="logo-container align-middle">
                            <img src={githubLogo} alt="githubLogo" className="max-h-16"/>
                        </div>
                    </Slider>
                </div>
            </>
        );
    }
}