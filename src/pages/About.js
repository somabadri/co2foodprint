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

// This page holds information about the creators of the app.
class About extends Component {
    render() {
        let soma= 'I am a graduating Computer Science student at UC Santa Cruz. I am interested in sustainable living, specifically limiting my carbon footprint. This app was an opportunity to create a tool to aid that goal. ';
        let riley='I am a 4th year Computer Science student at UC Santa Cruz. I wanted to make this application because of the issues regarding carbon emissions that negatively impact our planet. I wanted to create an app that allows people to work to reduce their carbon emission rates and better improve the world.';
        let kelley='I am a 3rd year majoring in Computer Science and Math at UC Santa Cruz. I wanted to help create this app bc I am interested in eco-conservation and thought it would be useful. I am on a mission to pet every cat in my neighborhood';
        let raymond='I am a 3rd year Computer Science major at UC Santa Cruz. I wanted to create this app because I wanted to personally track my own carbon emissions, especially when eating all the carbs I can.';
        let destin ='I am a 3rd year Computer Science major at UC Santa Cruz. I wanted to make this app because I want to help spread environmental awareness. I like walking my two dogs Oreo and Charlie, and ice skating.';
        return (
        <div>
            <Navbar />
            <div className="posts-container">
                <AboutSection name={"Soma Badri"} profile= {somapic} description={soma} />
                <AboutSection name={"Riley Murphy"}profile= {rileypic} description={riley} />
                <AboutSection name={"Kelley Broderick"} profile= {kelleypic} description={kelley} />
                <AboutSection name={"Raymond Lee"}profile= {raymondpic} description={raymond} />
                <AboutSection name={"Destin Wong"}profile= {destinpic} description={destin} />
            </div>
            <Footer />
        </div>
      );
    };
};

export default About;
