import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteBookingData, getBookingData, resetBookingState } from "../../features/booking/bookingSlice";

export default function ShowBookings() {
  const { user } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    dispatch(getBookingData())
      .unwrap()
      .then((data) => console.log("Fetched bookings:", data))
      .catch((error) => console.error("Error fetching bookings:", error));
    dispatch(resetBookingState());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteBookingData(id));
    dispatch(getBookingData());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Messages</h2>
      <div style={styles.tableWrapper}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={styles.tableHeadRow}>
                <TableCell style={styles.headerCell}>User</TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Email
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Phone
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  From Address
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  To Address
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Date
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Time
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Message
                </TableCell>
                <TableCell style={styles.headerCell} align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((item, index) => (
                  <TableRow key={index} style={styles.tableRow}>
                    <TableCell style={styles.cell}>{item?.booking_first_name}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.booking_email}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.booking_phone_number}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.fromAddress}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.toAddress}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.journeyDate}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.journeyTime}</TableCell>
                    <TableCell style={styles.cell} align="right">{item?.message}</TableCell>
                    <TableCell align="right">
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
                  <TableCell colSpan={9} align="center" style={styles.noDataCell}>
                    No Bookings Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "95%",
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "10px",
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  tableWrapper: {
    overflowX: "auto", // Makes table scrollable on smaller screens
  },
  tableContainer: {
    borderRadius: "10px",
    overflow: "hidden",
    minWidth: "100%",
  },
  tableHeadRow: {
    backgroundColor: "black",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    padding: "10px",
  },
  tableRow: {
    transition: "background 0.2s ease-in-out",
  },
  cell: {
    fontSize: "13px",
    color: "#333",
    padding: "10px",
    wordBreak: "break-word", // Prevents overflow
  },
  deleteButton: {
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  noDataCell: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#777",
    padding: "15px",
  },
};
