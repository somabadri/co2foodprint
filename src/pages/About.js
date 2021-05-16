import React, { Component } from "react";
import AboutSection from "../components/AboutSection";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import '../styles/about.scss';
import destinpic from '../assets/destin.jpg';
import somapic from '../assets/soma.jpg';
import kelleypic from '../assets/kelley.jpg';
import raymondpic from '../assets/raymond.jpg';
import rileypic from '../assets/riley.jpg';

class About extends Component {
    render() {
        let soma= 'My name is Soma Badri, I am a graduating computer science student at UC Santa Cruz. I am intersted in sustainable living, specifically limiting my carbon footprint. This app was an oppurtunity to create a tool to aid that goal. ';
        let riley='My name is Riley Murphy, I am a 4th year computer science student at UC Santa Cruz. I wanted to make this application because of the issues regarding carbon emissions that negatively impact our planet. I wanted to create an app that allows people to work to reduce their carbon emission rates and better improve the world.';
        let kelley='I am Kelley, a 3rd year cs & math major. I wanted to help create this app bc I am interested in eco-conservation stuff and thought it would be useful. Fun fact I like cats I am on a mission to pet every cat in my neighborhood';
        let raymond='I am Raymond, a 3rd year CS major, wanted to create this app because I wanted to personally track my own carbon emissions.';
        let destin ='I am Destin, a third year Computer Science major at UCSC. I like walking my two dogs Oreo and Charlie, and ice skating.';
        return (
        <div>
            <Navbar />
            <div className="posts-container">
                <AboutSection profile= {somapic} description={soma} />
                <AboutSection profile= {rileypic} description={riley} />
                <AboutSection profile= {kelleypic} description={kelley} />
                <AboutSection profile= {raymondpic} description={raymond} />
                <AboutSection profile= {destinpic} description={destin} />
            </div>
            <Footer />
        </div>
      );
    };
};

export default About;