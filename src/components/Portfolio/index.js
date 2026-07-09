import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import { Image, ImageKitProvider } from "@imagekit/react";
import "./index.scss";
import portfolioData from '../../data/portfolio.json';
import { imageKitConfig} from '../../configs/imagekit.config';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        const staticData = portfolioData.portfolio;
        const localItems = JSON.parse(localStorage.getItem('portfolioItems')) || [];
        setPortfolio([...staticData, ...localItems]);
    }, []);

    const renderPortfolio = (portfolio) => {
        return (
            <ImageKitProvider urlEndpoint={imageKitConfig.urlEndpoint}>
                <div className="images-container">
                    {
                        portfolio.map((port, idx) => {
                            return (
                                <div className="image-box" key={idx}>
                                    <Image 
                                        src={port.cover}
                                        className="portfolio-image"
                                        alt={port.title}
                                        loading="lazy"
                                        lqip={{ active: true }}
                                        transformation={[
                                            {
                                                height: 400,
                                                width: 400,
                                                quality: 80,
                                                crop: "fill",
                                            }
                                        ]}
                                    />
                                    <div className="content">
                                        <p className="title">{port.title}</p>
                                        <h4 className="description">{port.description}</h4>
                                        <button
                                            className="btn"
                                            onClick={() => window.open(port.url)}
                                        >View</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </ImageKitProvider>
        );
    }


    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                <div className="portfolio">{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;