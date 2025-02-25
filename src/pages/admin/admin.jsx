import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import CarInfo from "../../components/adminDashboard/CarInfo";
import CarPricing from "../../components/adminDashboard/CarPricing";
import CarImage from "../../components/adminDashboard/CarImage";
import { addCarData, carReset } from "../../features/cars/carSlice";

const Admin = () => {
  const initialFormState = {
    car_name: "",
    car_rating: "",
    car_description: "",
    car_rent: "",
    car_discounted_rent: "",
    car_speed: "",
    car_transmission: "",
    car_model: "",
    car_stock: "",
    car_images: [],
    car_variant: "",
  };

  const [formFields, setFormFields] = useState(initialFormState);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const { carError, carLoading, carSuccess, carMessage } = useSelector((state) => state.cars);

  const publishCar = () => {
    if (!user || !user._id) {
      toast.error("User not authenticated");
      return;
    }

    const carData = {
      ...formFields,
      user: user._id,
    };

    dispatch(addCarData(carData));
  };

  useEffect(() => {
    if (carSuccess) {
      toast.success("Car added successfully", { icon: "🚗" });
      dispatch(carReset());
    } else if (carError) {
      toast.error(carMessage);
      dispatch(carReset());
    }
  }, [carSuccess, carError, dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between add-new align-items-center p-4">
        <div className="d-flex flex-column">
          <Typography variant="h5">Add a new car</Typography>
          <Typography className="text-secondary" variant="body1">
            Orders placed across your store
          </Typography>
        </div>
        <div className="d-flex  add-btn gap-2">
          {/* New Buttons */}
          <Button
            onClick={() => navigate("/admin/show-cars")}
            className="fw-semibold text-capitalize bg-orange"
            style={{ color: "white", background: "#f9a826" }}
            variant="contained"
          >
            Show Cars
          </Button>
          <Button
            onClick={() => navigate("/admin/show-bookings")}
            className="fw-semibold text-capitalize bg-orange"
            style={{ color: "white", background: "#f9a826" }}
            variant="contained"
          >
            Show Bookings
          </Button>
          <Button
            onClick={() => navigate("/admin/show-contacts")}
            className="fw-semibold text-capitalize bg-orange"
            style={{ color: "white", background: "#f9a826" }}
            variant="contained"
          >
            Show Contacts
          </Button>

          {/* Publish Car Button */}
          <Button
            disabled={carLoading}
            onClick={publishCar}
            className={`fw-semibold text-capitalize ${carLoading ? "bg-secondary" : "bg-orange"}`}
            style={{ color: "white", background: "#f9a826" }}
            variant="contained"
          >
            {carLoading ? <ClipLoader /> : "Publish Car"}
          </Button>
        </div>
      </div>

      <div className="p-4 row">
        <div className="col-md-8">
          <CarInfo formFields={formFields} setFormFields={setFormFields} handleChange={handleChange} />
        </div>
        <div className="col-md-4 my-4">
          <CarPricing {...formFields} setFormFields={setFormFields} handleChange={handleChange} />
        </div>
        <div className="col-md-12 my-4">
          <CarImage {...formFields} setFormFields={setFormFields} handleChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default Admin;
