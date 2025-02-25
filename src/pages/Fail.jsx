import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import CancelIcon from "@mui/icons-material/Cancel"; // Error icon

const Fail = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <CancelIcon style={styles.icon} />
        <h1 style={styles.heading}>Payment Failed</h1>
        <p style={styles.message}>
          Oops! Something went wrong with your payment. Please try again.
        </p>
        <Link to="/" style={styles.link}>
          <Button style={styles.button}>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
  },
  icon: {
    fontSize: "80px",
    color: "#e74c3c",
    animation: "fadeIn 1s ease-in-out",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#666",
    margin: "10px 0 20px",
  },
  button: {
    background: "#e74c3c",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    transition: "0.3s",
    border: "none",
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
};

export default Fail;
