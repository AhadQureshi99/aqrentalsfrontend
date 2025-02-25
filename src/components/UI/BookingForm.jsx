import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createBooking,
  resetBookingState,
} from "../../features/booking/bookingSlice";
import "../../styles/booking-form.css";


const BookingForm = ({ carId }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    booking_first_name: "",
    booking_last_name: "",
    booking_email: "",
    booking_phone_number: "",
    fromAddress: "",
    toAddress: "",
    passengers: "1 person",
    luggage: "1 luggage",
    journeyDate: "",
    journeyTime: "",
    message: "",
  });

  const { user } = useSelector((state) => state.user);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Booking added successfully!");
      setFormData({
        booking_first_name: "",
        booking_last_name: "",
        booking_email: "",
        booking_phone_number: "",
        fromAddress: "",
        toAddress: "",
        passengers: "1 person",
        luggage: "1 luggage",
        journeyDate: "",
        journeyTime: "",
        message: "",
      });
    }
    dispatch(resetBookingState());
  }, [isError, isSuccess, message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if the user is authenticated
    if (!user || !user.token) {
      toast.error("User authentication failed. Please log in again.");
      return;
    }

    // Check if carId exists
    if (!carId) {
      toast.error("Car ID is missing!");
      return;
    }

    const bookingData = { ...formData, user: user._id };

    // Dispatch createBooking action with the required data
    dispatch(createBooking({ carId, bookingData, token: user.token }));
  };

  return (
    <Form onSubmit={submitHandler}>
      {/* First & Last Name */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
          type="text"
          name="booking_first_name"
          value={formData.booking_first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="text"
          name="booking_last_name"
          value={formData.booking_last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>

      {/* Email & Phone */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
          type="email"
          name="booking_email"
          value={formData.booking_email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="number"
          name="booking_phone_number"
          value={formData.booking_phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>

      {/* From & To Address */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
          type="text"
          name="fromAddress"
          value={formData.fromAddress}
          onChange={handleChange}
          placeholder="From Address"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="text"
          name="toAddress"
          value={formData.toAddress}
          onChange={handleChange}
          placeholder="To Address"
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
          
        />
      </FormGroup>

      {/* Passengers & Luggage */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
          type="select"
          name="passengers"
          value={formData.passengers}
          onChange={handleChange}
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        >
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </Input>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="select"
          name="luggage"
          value={formData.luggage}
          onChange={handleChange}
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        >
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </Input>
      </FormGroup>

      {/* Journey Date & Time */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
          type="date"
          name="journeyDate"
          value={formData.journeyDate}
          onChange={handleChange}
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="time"
          name="journeyTime"
          value={formData.journeyTime}
          onChange={handleChange}
          required
          style={{
            backgroundColor: '#141414',
            color: 'white',
            border: 'none',
          }}
        />
      </FormGroup>

      {/* Message */}
      <FormGroup>
  <Input
    type="textarea"
    name="message"
    value={formData.message}
    onChange={handleChange}
    rows={5}
    placeholder="Write your message..."
    style={{
      backgroundColor: '#141414',
      color: 'white',
      border: 'none',
    }}
  />
</FormGroup>

      {/* Submit Button */}
      <Button style={{ background: "#F9A826",border:"none" }} type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Booking"}
      </Button>
    </Form>
  );
};

export default BookingForm;
