import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = ({ item }) => {
  console.log("Received item in CarItem:", item); // Debugging

  if (!item || Object.keys(item).length === 0) {
    return <p>Error: No car data found</p>;
  }

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img
            src={
              item.car_images?.[3]?.cloudinaryUrl ||
              "https://via.placeholder.com/300"
            }
            alt={item.car_name || "Car"}
          />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {item.car_name || "Unknown Car"}
          </h4>
          <h6 className="rent__price text-center mt-2">
            ${item.car_rent || "N/A"}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {item.car_model || "N/A"}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i>{" "}
              {item.car_transmission || "N/A"}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {item.car_speed || "N/A"}{" "}
              km/h
            </span>
          </div>

          <Link to={`/cars/${item._id}`} className="w-50">
            <button className="car__item-btn car__btn-rent w-50">Rent</button>
          </Link>

          <Link to={`/cars/${item._id}`} className="w-50">
            <button className="car__item-btn car__btn-details w-50">Details</button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
