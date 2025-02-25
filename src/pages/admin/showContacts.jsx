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
import {
  contactReset,
  deleteContactData,
  getContactData,
} from "../../features/contact/contactSlice";

export default function ShowContacts() {
  const { user } = useSelector((state) => state.user);
  const { contact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    dispatch(getContactData());
    dispatch(contactReset());
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteContactData(id));
    dispatch(getContactData());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Messages</h2>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.headerCell}>User</TableCell>
              <TableCell style={styles.headerCell} align="center">
                Email
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
            {Array.isArray(contact) && contact.length > 0 ? (
              contact.map((item, index) => (
                <TableRow key={index} style={styles.tableRow}>
                  <TableCell style={styles.cell}>{item?.contact_username}</TableCell>
                  <TableCell style={styles.cell} align="center">{item?.contact_email}</TableCell>
                  <TableCell style={styles.cell} align="center">{item?.contact_message}</TableCell>
                  <TableCell align="center">
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
                <TableCell colSpan={4} align="center" style={styles.noDataCell}>
                  No Contacts Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

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
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  tableContainer: {
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeadRow: {
    backgroundColor: "black",
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
  noDataCell: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#777",
    padding: "20px",
  },
};
