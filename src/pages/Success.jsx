import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Animated checkmark icon

const Success = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <CheckCircleIcon style={styles.icon} />
        <h1 style={styles.heading}>Payment Successful!</h1>
        <p style={styles.message}>
          Your payment has been completed successfully. Thank you for your purchase!
        </p>
        <Link to="/" style={styles.link}>
          <Button style={styles.button} variant="contained">
            Return Home
          </Button>
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
    background: "linear-gradient(135deg, #1abc9c, #16a085)",
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
    color: "#2ecc71",
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
    background: "#f39c12",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    transition: "0.3s",
  },
  link: {
    textDecoration: "none",
  },
};

export default Success;
