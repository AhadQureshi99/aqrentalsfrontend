import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { carReset, deleteCarData, getCarData } from "../../features/cars/carSlice";
import { Button } from "@mui/material";
import UpdateSidebar from "./UpdateSidebar";
import { useNavigate } from "react-router-dom";

export default function ShowCars() {
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    dispatch(getCarData());
    dispatch(carReset());
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteCarData(id));
    dispatch(getCarData());
  };

  const styles = {
    container: {
      width: "90%",
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      textAlign: "center",
    },
    tableContainer: {
      borderRadius: "10px",
      overflow: "hidden",
    },
    tableHeadRow: {
      backgroundColor: "#000", // Changed to black
    },
    headerCell: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#fff",
      padding: "12px",
    },
    tableRow: {
      transition: "background 0.2s ease-in-out",
    },
    cell: {
      fontSize: "14px",
      color: "#333",
      padding: "12px",
    },
    deleteButton: {
      fontSize: "12px",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    carImage: {
      width: "70px",
      height: "50px",
      objectFit: "cover",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.headerCell}>Car Name</TableCell>
              <TableCell style={styles.headerCell} align="right">Car Price</TableCell>
              <TableCell style={styles.headerCell} align="right">Car Images</TableCell>
              <TableCell style={styles.headerCell} align="right">Update</TableCell>
              <TableCell style={styles.headerCell} align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars?.length > 0 ? (
              cars.map((item, index) => (
                <TableRow key={index} style={styles.tableRow}>
                  <TableCell style={styles.cell} component="th" scope="row">
                    {item?.car_name}
                  </TableCell>
                  <TableCell style={styles.cell} align="right">
                    {item?.car_discounted_rent}
                  </TableCell>
                  <TableCell style={styles.cell} align="right">
                    <img
                      src={item.car_images?.[3]?.cloudinaryUrl || "https://via.placeholder.com/300"}
                      alt={item.car_name || "Car"}
                      style={styles.carImage}
                    />
                  </TableCell>
                  <TableCell style={styles.cell} align="right">
                    {<UpdateSidebar {...item} />}
                  </TableCell>
                  <TableCell style={styles.cell} align="right">
                    <Button
                      onClick={() => handleDelete(item?._id)}
                      variant="contained"
                      color="error"
                      style={styles.deleteButton}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{ fontSize: "16px", fontWeight: "bold", color: "#777", padding: "20px" }}>
                  No Cars Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
