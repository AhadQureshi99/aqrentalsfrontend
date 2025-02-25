import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <div className="about__section-container p-4">
      <video autoPlay loop muted>
    <source src="https://videos.pexels.com/video-files/7670836/7670836-uhd_2560_1440_30fps.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="about__section-content">
                <h4 className="section__subtitle">About Us</h4>
                <h2 className="section__title">Welcome to AQ RENTALS</h2>
                <p className="section__description">
                  At AQ RENTALS, we are dedicated to providing top-notch car
                  rental services with a focus on comfort, safety, and
                  reliability. Whether you need a vehicle for city transfers,
                  long road trips, or special occasions, we have a diverse fleet
                  to meet your needs. With our seamless booking process,
                  unlimited mileage options, and multiple pickup locations, we
                  ensure a hassle-free experience for every customer. Trust AQ
                  RENTALS to deliver the perfect ride for your journey!
                </p>

                <div className="about__section d-flex flex-wrap justify-content-between">
                  <div className="about__section-item d-flex align-items-center gap-4">
                    <p className="section__description d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Get the best
                      deals on high-quality vehicles.
                    </p>
                    <p className="section__description d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Flexible
                      pickup & drop-off locations
                    </p>
                  </div>

                  <div className="about__section-item d-flex align-items-center gap-4">
                    <p className="section__description d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Assistance
                      whenever you need it.
                    </p>
                    <p className="section__description d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Unlimited
                      mileage options
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="about__img">
                <img src={aboutImg} alt="" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default AboutSection;
