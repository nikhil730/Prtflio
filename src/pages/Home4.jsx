import data from "../Data.json";
import About from "../components/About/About";
import Iconbox from "../components/Iconbox/Iconbox";
import Skill from "../components/Skill/Skill";
import Resume from "../components/Resume/ResumeSection";
import BlogSection from "../components/Blog/BlogSection";
import ReviewSection from "../components/Review/ReviewSection";
import Contact from "../components/Contact/Contact";
import PortfolioSection from "../components/Protfolio/PortfolioSection";
import Hero4 from "../components/Hero/Hero4";
import axios from "axios";
import { useEffect, useState } from "react";

const Home4 = ({ userData }) => {
  const {
    _heroData,
    _aboutData,
    _serviceData,
    _skillData,
    _portfolioData,
    _blogData,
    _resumeData,
    _reviewData,
    contactData, // Only using contactData from static Data.json (Not found in API Response)
    _socialData,
    _socialData2,
  } = data;

  return (
    <>
      <Hero4 data={userData.heroData} socialData={userData.socialLinks} />
      <About data={userData.aboutData} data-aos="fade-right" />
      <Iconbox data={userData.serviceData} data-aos="fade-right" />
      <Skill data={userData.skillData} data-aos="fade-right" />
      <Resume data={userData.resumeData} />
      <PortfolioSection data={userData.portfolioData} data-aos="fade-right" />
      <ReviewSection data={userData.reviewData} data-aos="fade-right" />
      <BlogSection data={userData.blogData} data-aos="fade-right" />
      <Contact
        data={{
          ...contactData,
          phone: userData.aboutData
            ? userData.aboutData.details[0].info
            : "Loading...",

          address: userData.aboutData
            ? userData.aboutData.details[2].info
            : "Loading...",

          email: userData.aboutData
            ? userData.aboutData.details[1].info
            : "Loading...",
        }}
        socialData={userData.socialLinks}
        data-aos="fade-right"
      />
    </>
  );
};

export default Home4;
