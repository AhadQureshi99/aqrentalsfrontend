import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarData } from "../features/cars/carSlice";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const CarListing = () => {
  const dispatch = useDispatch();
  const { carLoading, cars } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getCarData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Helmet title="Cars">
        <CommonSection title="Car Listing" />
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="d-flex align-items-center gap-3 mb-5">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>

                  <select style={{ backgroundColor: "#383737", color: "#fff",border:"none", borderRadius:"10px" }}>
                    <option>Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
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
      </Helmet>
      <Footer />
    </>
  );
};

export default CarListing;
