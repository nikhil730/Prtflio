import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import Page404 from "./components/404/Page404";
import BlogDetails from "./components/Blog/BlogDetails";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout2 from "./components/Layout/Layout2";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    Aos.init({ once: true });

    axios
      .get(
        "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
      )
      .then((response) => {
        // Arrays to store the data of indivdual components
        let socialLinks = [];
        let servicesData = [];
        let skillData = [];
        let workExperience = [];
        let education = [];
        let portfolioItems = [];
        let reviewInformation = [];
        let blogInformation = [];

        // Iterate through social handles in response to store them
        // into array in proper format required by Social Links Component
        for (let i = 0; i < response.data.user.social_handles.length; i++) {
          // console.log(response.data.user.social_handles[i].image.url);
          socialLinks.push({
            icon: response.data.user.social_handles[i].image.url,
            title: response.data.user.social_handles[i].platform,
            link: response.data.user.social_handles[i].url,
          });
        }

        // Iterate through services in response to store them
        // into array in proper format required by IconBox Component
        for (let i = 0; i < response.data.user.services.length; i++) {
          servicesData.push({
            imgLink: response.data.user.services[i].image.url,
            title: response.data.user.services[i].name,
            text: response.data.user.services[i].desc,
            effect: "zoom-out-up",
            duration: "500",
            delay: (i + 2) * 100,
          });
        }
        // Iterate through skills in response to store them
        // into array in proper format required by Skills Component
        for (let i = 0; i < response.data.user.skills.length; i++) {
          skillData.push({
            title: response.data.user.skills[i].name,
            progress: response.data.user.skills[i].percentage,
            effect: "fade-up",
            duration: "500",
            delay: (i + 2) * 100,
          });
        }

        // Iterate through social handles in response to store them
        // into array in proper format required by Social Links Component
        for (let i = 0; i < response.data.user.timeline.length; i++) {
          // note: I haven't found single item in response that has "forEducation" set true
          // So I assumed the format for education data
          if (response.data.user.timeline[i].forEducation) {
            education.push({
              title: response.data.user.timeline[i].jobTitle,
              duration: `${response.data.user.timeline[i].startDate} - ${response.data.user.timeline[i].endDate}`,
              subTitle: response.data.user.timeline[i].company_name,
              text: response.data.user.timeline[i].summary,
            });
          } else {
            workExperience.push({
              title: response.data.user.timeline[i].jobTitle,
              duration: `${response.data.user.timeline[i].startDate} - ${response.data.user.timeline[i].endDate}`,
              subTitle: response.data.user.timeline[i].company_name,
              text: response.data.user.timeline[i].summary,
            });
          }
        }

        // Iterate through portfolio in response to store them
        // into array in proper format required by PortfolioSection Component
        for (let i = 0; i < response.data.user.projects.length; i++) {
          portfolioItems.push({
            imgLink: response.data.user.projects[i].image.url,
            imgLinkLg: response.data.user.projects[i].image.url,
            title: response.data.user.projects[i].title,
            subTitle: response.data.user.projects[i].description,
            effect: "fade-up",
            duration: "500",
            delay: (i + 2) * 100,
          });
        }

        // Iterate through Testimonials in response to store them
        // into array in proper format required by Testimonials Component
        for (let i = 0; i < response.data.user.testimonials.length; i++) {
          reviewInformation.push({
            imgLink: response.data.user.testimonials[i].image.url,
            title: response.data.user.testimonials[i].name,
            text: response.data.user.testimonials[i].review,
            designation: response.data.user.testimonials[i].position,
          });
        }

        // note: I haven't found the blogs in response so I assume the format
        if (response.data.user.blogs) {
          for (let i = 0; i < response.data.user.blogs.length; i++) {
            blogInformation.push({
              imgLink: response.data.user.blogs[i].image.url,
              title: response.data.user.blogs[i].name,
              date: response.data.user.blogs[i].date,
              href: response.data.user.blogs[i].link,
              designation: response.data.user.role,
            });
          }
        }

        // Set the user data from the response and the indivdual arrays
        setUserData({
          heroData: {
            title: response.data.user.about.name,
            subTitle: response.data.user.about.subTitle,
            designation: response.data.user.about.title,
            imgLink: response.data.user.about.avatar.url,
            text: response.data.user.about.subTitle,
            imgAuthor: response.data.user.about.avatar.url,
          },
          socialLinks: socialLinks,
          aboutData: {
            imgLink: response.data.user.about.avatar.url,
            title: response.data.user.about.name,
            subTitle: response.data.user.about.title,
            text: response.data.user.about.description,
            cvPdf: "#", // note: CV not found in API response
            details: [
              {
                title: "Phone",
                info: response.data.user.about.phoneNumber,
              },
              {
                title: "Email",
                info: response.data.user.email,
              },
              {
                title: "From",
                info: response.data.user.about.address,
              },
              {
                title: "Language",
                info: "English, Spanish", // note: Language not found in API
              },
              {
                title: "Freelance",
                info: "Available", // note: Freelance not found in API
              },
            ],
          },
          serviceData: {
            services: servicesData,
          },
          skillData: {
            title:
              "All the skills that I have in that field of work are mentioned.", // note: Title not found in API response
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.", // note: Text not found in API response
            skills: skillData,
          },
          resumeData: {
            experienceTitle: "Experience",
            experience: workExperience,
            educationTitle: "Education",
            education: education,
          },
          portfolioData: {
            portfolioItems: portfolioItems,
          },
          reviewData: {
            useFor: "review",
            sliderSetting: {
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: false,
              responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                    autoplay: true,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    autoplay: true,
                  },
                },
              ],
            },
            informations: reviewInformation,
          },
          blogData: {
            useFor: "blog",
            sliderSetting: {
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: false,
              responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                    autoplay: true,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    autoplay: true,
                  },
                },
              ],
            },
            informations: blogInformation,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              phoneno={
                userData.aboutData ? userData.aboutData.details[0].info : ""
              }
            />
          }
        >
          <Route index element={<Home userData={userData} />} />
          <Route path="home-v3" element={<Home3 userData={userData} />} />
          <Route path="home-v4" element={<Home4 userData={userData} />} />
          <Route path="*" element={<Page404 />} />
          <Route path="blog/blog-details" element={<BlogDetails />} />
        </Route>
        <Route
          path="/home-v2"
          element={
            <Layout2
              avatar={userData.aboutData ? userData.aboutData.imgLink : ""}
            />
          }
        >
          <Route index element={<Home2 userData={userData} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
