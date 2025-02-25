import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarData } from "../features/cars/carSlice";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { carLoading, cars } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getCarData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Helmet title="Home">
        <section className="p-0 hero__slider-section">
          <HeroSlider />
        </section>

        <AboutSection />

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">See our</h6>
                <h2 className="section__title">Popular Services</h2>
              </Col>
              <ServicesList />
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">Come with</h6>
                <h2 className="section__title">Hot Offers</h2>
              </Col>

              {carLoading ? (
                <p className="text-center">Loading...</p>
              ) : cars?.length === 0 ? (
                <h2 className="text-center mt-5">No Cars Available</h2>
              ) : (
                cars.map((item, index) => <CarItem key={index} item={item} />)
              )}
            </Row>
          </Container>
        </section>

        <BecomeDriverSection />

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-4 text-center">
                <h6 className="section__subtitle">Our clients say</h6>
                <h2 className="section__title">Testimonials</h2>
              </Col>
              <Testimonial />
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">Explore our blogs</h6>
                <h2 className="section__title">Latest Blogs</h2>
              </Col>
              <BlogList />
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default Home;
