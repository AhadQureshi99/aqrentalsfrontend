import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { addCartData, cartReset, getCarData } from "../features/cars/carSlice";
import toast from "react-hot-toast";
import ChatBox from "./ChatBox";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cars, cartError, cartSuccess, cartMessage } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(getCarData());
  }, []);

  const singleCarItem = cars.find((item) => item._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const mainImageUrl =
    singleCarItem?.car_images?.[0]?.cloudinaryUrl ||
    "https://via.placeholder.com/300";

  const [mainImage, setMainImage] = useState(mainImageUrl);

  useEffect(() => {
    setMainImage(mainImageUrl);
  }, [mainImageUrl]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartMessage);
    }
    if (cartSuccess) {
      toast.success("Car added to cart", { icon: "🚗" });
    }
    dispatch(cartReset());
  }, [cartError, cartSuccess, cartMessage, dispatch]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You need to login first");
      return;
    }
    dispatch(addCartData(singleCarItem?._id));
  };

  if (!singleCarItem) {
    return <p>Car not found</p>;
  }

  return (
    <>
      <Header />
      <Helmet title={singleCarItem.car_name}>
        <section>
          <Container>
            <Row>
              {/* Image Section */}
              <Col lg="6">
                <img
                  src={mainImage}
                  alt={singleCarItem.car_name}
                  className="w-100"
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />

                <div className="thumbnail-gallery d-flex gap-2 mt-3">
                  {singleCarItem.car_images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.cloudinaryUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                      onClick={() => setMainImage(image.cloudinaryUrl)}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border:
                          mainImage === image.cloudinaryUrl
                            ? "2px solid #f9a826"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </Col>

              {/* Car Information Section */}
              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">{singleCarItem.car_name}</h2>
                  <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">
                      ${singleCarItem.car_discounted_rent}.00 / Day
                      <small className="text-secondary">
                        <sub>
                          <s>${singleCarItem?.car_rent}.00 / Day</s>
                        </sub>
                      </small>
                    </h6>
                  </div>

                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ columnGap: "4rem" }}
                  >
                    <span className="d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-roadster-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.car_model}
                    </span>

                    <span className="d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.car_transmission}
                    </span>

                    <span className="d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.car_speed} km/h
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ columnGap: "2.8rem" }}
                  >
                    <span className="d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-building-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.car_variant}
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ columnGap: "2.8rem" }}
                  >
                    <span className="d-flex align-items-center gap-1 section__description">
                      RATING:
                      {Array.from({ length: singleCarItem?.car_rating }).map(
                        (_, index) => {
                          return "⭐";
                        }
                      )}
                    </span>
                  </div>
                  <div className="my-3 border-dark border-1">
                    <h6>{singleCarItem.car_description}</h6>
                  </div>
                  <div>
                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-primary mt-3"
                      style={{
                        backgroundColor: "#f9a826",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Add to Cart
                    </button>
                    <ChatBox socket={socket} />
                  </div>
                </div>
              </Col>

              {/* Booking and Payment Sections */}
              <Col lg="7" className="mt-5">
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold">Booking Information</h5>
                  <BookingForm carId={id} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default CarDetails;
