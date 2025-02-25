import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const About = () => {
  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Helmet for SEO */}
      <Helmet title="About">
        <CommonSection title="About Us" />
        <AboutSection aboutClass="aboutPage" />

        <section className="about__page-section">
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12">
                <div className="about__page-img">
                  <img src={driveImg} alt="" className="w-100 rounded-3" />
                </div>
              </Col>

              <Col lg="6" md="6" sm="12">
                <div className="about__page-content">
                  <h2 className="section__title">
                    We Are Committed To Provide Safe Ride Solutions
                  </h2>

                  <p className="section__description"> 
                   At <strong>AQ Rentals</strong> ,safety isn't just a priority—it's our promise. We go the extra mile to ensure every ride is secure, comfortable, and reliable. Our fleet is meticulously maintained, and our drivers are trained to provide a smooth, worry-free experience. Whether it's a business trip or a weekend getaway, travel with peace of mind knowing you're in safe hands with <strong>AQ Rentals</strong>. 
                  </p>

                  <p className="section__description">
                  Beyond just providing a ride, we prioritize your well-being. Our rental process is seamless, ensuring that you get a clean, sanitized, and top-quality vehicle every time. We aim to deliver not just a mode of transportation but a premium experience that reflects our dedication to safety and customer satisfaction.
                  </p>

                  <div className="d-flex align-items-center gap-3 mt-4">
                    <span className="fs-4">
                      <i className="ri-phone-line"></i>
                    </span>

                    <div>
                      <h6 className="section__subtitle">Need Any Help?</h6>
                      <h4>+00123456789</h4>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <BecomeDriverSection />

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">Experts</h6>
                <h2 className="section__title">Our Members</h2>
              </Col>
              <OurMembers />
            </Row>
          </Container>
        </section>
      </Helmet>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default About;
