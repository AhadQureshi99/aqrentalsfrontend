import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36, // Adjusted width
  height: 20, // Adjusted height
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2, // Adjusted padding for centering the thumb
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)", // Centered for smaller width
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#f9a826", // Checked track color
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16, // Adjusted thumb size
    height: 16, // Adjusted thumb size
    backgroundColor: "white",
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2, // Adjusted for smaller height
    backgroundColor: "#EAE9EB",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

// StockSwitch Component
export default function StockSwitch({ car_stock, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 1 }}
            checked={car_stock} // Use the product_stock state value
            onChange={(e) =>
              handleChange({
                target: {
                  name: "car_stock", // Name should match the state property
                  value: e.target.checked, // Use the checked value of the switch
                },
              })
            }
          />
        }
      />
    </FormGroup>
  );
}
