import React, { Component } from "react";
import AboutSection from "./components/aboutSection";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import './styles/about.scss';

class About extends Component {
    render() {
        let description= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam sed sem suscipit mollis mattis eu quam. Morbi luctus massa tellus, quis dignissim lectus condimentum at. Nullam convallis non tellus in gravida. ';
      return (
        <div>
            <Navbar />
            <div className="posts-container">
                <AboutSection description={description} />
                <AboutSection description={description} />
                <AboutSection description={description} />
                <AboutSection description={description} />
                <AboutSection description={description} />
            </div>
            <Footer />
        </div>
      );
    };
};

export default About;