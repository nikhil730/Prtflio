import PropTypes from "prop-types";
import React from "react";
import "./Hero.scss";
import { Icon } from "@iconify/react";
import perser from "html-react-parser";
import SocialLinks2 from "../SocialLinks/SocialLinks2";
import Preloader from "../Preloader/Preloader";

const Hero4 = ({ data, socialData }) => {
  // const { title, text, imgAuthor, bgImgLink } = data;
  return !data ? (
    <div />
  ) : (
    <section
      id="home"
      className="st-hero st-style2 st-bg st-dynamic-bg st-ripple-version"
      style={{ backgroundImage: `url(${data.bgImgLink})` }}
    >
      <div className="container">
        <div className="st-hero-text">
          <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            {perser(data.title)}
          </h1>
          <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            {perser(data.text)}
          </p>
          <SocialLinks2 data={socialData} />
        </div>
      </div>
    </section>
  );
};

Hero4.propTypes = {
  data: PropTypes.object,
  socialData: PropTypes.array,
};

export default Hero4;
