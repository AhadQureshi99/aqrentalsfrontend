import axios from "axios";

const base_url = "http://localhost:3001/api/bookings";

export const addBookingData = async (carId, bookingData, token) => {
  console.log("Token being sent:", token); // Debugging

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/add-booking/${carId}`,
    bookingData,
    config
  );
  return response.data;
};

export const deleteBooking = async (boooking_id) => {
  let response = await axios.delete(
    `${base_url}/delete-booking/${boooking_id}`
  );
  return response.data;
};

export const getBooking = async () => {
  let response = await axios.get(`${base_url}/get-booking`);
  return response.data;
};
