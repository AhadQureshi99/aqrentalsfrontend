import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  deleteCartData,
  deleteSingleCartData,
  getCarData,
  getCartData,
} from "../features/cars/carSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, cars, cartLoading, cartError, cartMessage } = useSelector(
    (state) => state.cars
  );
  const [cartItems, setCartItems] = useState(cart);
  const [selectedImages, setSelectedImages] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = (carId, imageUrl) => {
    setSelectedImages((prev) => ({
      ...prev,
      [carId]: imageUrl,
    }));
  };

  const calculateCost = () => {
    return cart.reduce((total, item) => {
      const carData = cars.find((car) => car?._id === item.car_id);
      return carData
        ? total + carData.car_discounted_rent * item.quantity
        : total;
    }, 0);
  };

  const totalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handlePayment = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/payment/checkout",
        { cars: cart }
      );
      window.location.assign(response.data.url);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleDeleteCart = async () => {
    dispatch(deleteCartData());
    toast.success("Deleted successfully", { icon: "🚮" });
  };

  const handleRemove = async (id) => {
    await dispatch(deleteSingleCartData(id));
    dispatch(getCartData());
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cart?.map((item) => {
            const carData = cars.find((car) => car._id === item.car_id);
            if (!carData || !carData.car_images?.length) {
              console.warn("Invalid car object or missing car images:", item);
              return null;
            }

            const mainImage =
              selectedImages[item.car_id] ||
              carData.car_images[0]?.cloudinaryUrl;

            return (
              <Grid item xs={12} sm={6} md={4} key={item.car_id}>
                <Card style={{
                background: "linear-gradient(to right,rgb(41, 40, 40),rgb(150, 150, 150))"
              }} sx={{ p: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={mainImage}
                    alt={carData.car_name || "Car image"}
                    sx={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      height: 200,
                    }}
                  />

                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {carData.car_images.map((image, index) => (
                      <Grid item key={index}>
                        <img
                          src={image.cloudinaryUrl}
                          alt={`Thumbnail ${index + 1}`}
                          onClick={() =>
                            handleImageClick(item.car_id, image.cloudinaryUrl)
                          }
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            border:
                              mainImage === image.cloudinaryUrl
                                ? "2px solid #f9a826"
                                : "1px solid #ddd",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {carData.car_name || "Unnamed Car"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {carData.car_description || "No description available."}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${carData.car_discounted_rent} / Day{" "}
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ color: "white" }}
                      >
                        <s>${carData.car_rent} / Day</s>
                      </Typography>
                    </Typography>
                    <Typography>Quantity: {item.quantity || 1}</Typography>
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                      Total: ${carData.car_discounted_rent * item.quantity}
                    </Typography>

                    <Button
                      onClick={() => handleRemove(item?._id)}
                      color="error"
                      variant="contained"
                    >
                      REMOVE
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {cart.length > 0 && (
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Button
              onClick={handlePayment}
              variant="contained"
              color="success"
              startIcon={
                loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <ShoppingCartCheckoutIcon />
                )
              }
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleDeleteCart}
              variant="contained"
              color="error"
              startIcon={
                cartLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <ShoppingCartCheckoutIcon />
                )
              }
            >
              {cartLoading ? "Processing..." : "Delete Cart"}
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
