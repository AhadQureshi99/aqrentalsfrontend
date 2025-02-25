import axios from "axios";
const base_url = "http://localhost:3001/api/cars";

export const addCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${base_url}/add-car`, carData, config);
  return response.data;
};

export const getCars = async () => {
  let response = await axios.get(`${base_url}/get-cars`);
  return response.data;
};

export const deleteCar = async (car_id) => {
  let response = await axios.delete(`${base_url}/delete-car/${car_id}`);
  return response.data;
};
export const deleteCart = async (cart_id) => {
  let response = await axios.delete(`${base_url}/delete-cart/${cart_id}`);
  return response.data;
};
export const updateCar = async (car_data) => {
  let response = await axios.put(
    `${base_url}/update-car/${car_data.car_id}`,
    { name: car_data.name, price: car_data.price }
  );
  
  return response.data;
};

export const addToCart = async (car_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios.post(
    `${base_url}/add-to-cart/${car_id}`,
    {},
    config
  );
  return response.data;
};
export const getMyCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios.get(`${base_url}/get-my-cart`, config);
  return response.data;
};

export const deleteFromCart = async () => {
  let response = await axios.delete(`${base_url}/delete-from-cart`);
  return response.data;
};
