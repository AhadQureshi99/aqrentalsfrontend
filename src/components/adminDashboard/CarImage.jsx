import { Typography } from "@mui/material";
import React from "react";
import CustomFileUploader from "./CustomFileUploader";

const CarImage = ({ formFields, setFormFields }) => {
  return (
    <div className="card border-0 shadow p-3">
      <div className="d-flex align-items-center product-img-text justify-content-between">
        <Typography className="text-gray" variant="h6">
          Car Image
        </Typography>
        <Typography className="text-purple">Add media from URL</Typography>
      </div>
      <CustomFileUploader formFields={formFields} setFormFields={setFormFields} />
    </div>
  );
};

export default CarImage;
