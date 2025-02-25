import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { getCarData, updateCarData } from "../../features/cars/carSlice";

export default function UpdateSidebar({ _id }) {
  const [open, setOpen] = React.useState(false);
  const [field1, setField1] = React.useState("");
  const [field2, setField2] = React.useState("");

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    await dispatch(updateCarData({ car_id: _id, name: field1, price: field2 }));
    dispatch(getCarData()); 
  };
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, padding: 2 }} role="presentation">
      {/* Text Fields */}
      <TextField
        fullWidth
        label="Field 1"
        variant="outlined"
        value={field1}
        onChange={(e) => setField1(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Field 2"
        variant="outlined"
        value={field2}
        onChange={(e) => setField2(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" onClick={handleUpdate}>
        UPDATE
      </Button>

      <Divider />


      <Divider />

    
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="success" onClick={toggleDrawer(true)}>
        UPDATE
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
