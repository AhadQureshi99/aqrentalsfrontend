import {
  Checkbox,
  FormLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import StockSwitch from "./StockSwitch";

const carPricing = ({car_rent,car_stock,car_discounted_rent,setFormFields,handleChange}) => {
  return (
    <>
      <div className="card border-0 p-3 shadow">
        <Typography className="text-gray" variant="h6">
          Pricing
        </Typography>

        
        <TextField
          color="secondary"
          className="my-2 w-100"
          id="outlined-basic"
          label="Rent Per Day"
          onChange={handleChange}
          value={car_rent}
          name="car_rent"
          placeholder="Enter Car Price Per Day"
          variant="outlined"
        />
        <TextField
          color="secondary"
          className="my-2 w-100"
          id="outlined-basic"
          label="Discounted Rent Per Day"
          onChange={handleChange}
          value={car_discounted_rent}
          name="car_discounted_rent"
          placeholder="Enter Car Discounted  Price Per Day"
          variant="outlined"
        />


       

        <hr className="m-0 p-0" />

        {/* Stock Switch */}
        <div className="d-flex justify-content-between align-items-center my-3">
          <Typography className="text-secondary">In stock</Typography>
          <StockSwitch
           car_stock={car_stock}
           handleChange={handleChange}
          />
        </div>
      </div>
    </>
  )
}

export default carPricing
