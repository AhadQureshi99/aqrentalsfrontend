import React from "react";
import { TextField, Typography } from "@mui/material";
import "../../styles/about-section.css";

const carInfo = ({
  car_name,
  car_model,
  car_variant,
  car_transmission,
  car_speed,
  car_rating,
  car_description,
  setFormFields,
  handleChange,
}) => {
  return (
    <>
      <div style={{background:"white"}} className="card border-0 shadow p-3">
        <Typography className="text-gray" variant="h6">
          Car Information
        </Typography>

        <TextField
          color="secondary"
          className="my-3 textfield-custom"
          id="outlined-basic"
          value={car_name}
          onChange={handleChange}
          name="car_name"
          placeholder="Car Name"
          variant="outlined"
          fullWidth
        />

        <div className="row">
          <div className="col-sm-6">
            <TextField
              color="secondary"
              className="my-1 w-100 textfield-custom"
              id="outlined-basic"
              onChange={handleChange}
              label="Car Model"
              name="car_model"
              value={car_model}
              placeholder="Enter Car Model"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-sm-6">
            <TextField
              color="secondary"
              className="my-1 w-100 textfield-custom"
              id="outlined-basic"
              label="Car Variant"
              onChange={handleChange}
              placeholder="Car Variant"
              name="car_variant"
              value={car_variant}
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <TextField
              color="secondary"
              className="my-1 w-100 textfield-custom"
              id="outlined-basic"
              value={car_rating}
              onChange={handleChange}
              name="car_rating"
              placeholder="Car Rating"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-sm-6">
            <TextField
              color="secondary"
              className="my-1 w-100 textfield-custom"
              id="outlined-basic"
              value={car_transmission}
              onChange={handleChange}
              name="car_transmission"
              placeholder="Car Transmission"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <TextField
          color="secondary"
          className="my-3 textfield-custom"
          id="outlined-basic"
          value={car_speed}
          onChange={handleChange}
          name="car_speed"
          placeholder="Car Speed"
          variant="outlined"
          fullWidth
        />

        <Typography className="text-secondary my-2" variant="body1">
          Description (Important)
        </Typography>
        <TextField
          color="secondary"
          className="my-3 text-field-height textfield-custom"
          id="outlined-basic"
          name="car_description"
          value={car_description}
          onChange={handleChange}
          placeholder="Car Description"
          variant="outlined"
          fullWidth
        />
      </div>
    </>
  );
};

export default carInfo;
