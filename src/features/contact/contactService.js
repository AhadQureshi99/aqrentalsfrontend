import axios from "axios";

const base_url = "http://localhost:3001/api/contact";

export const addContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${base_url}/add-contact`,
    contactData,
    config
  );
  return response.data;
};


export const deleteContact = async (contact_id) => {
  let response = await axios.delete(`${base_url}/delete-contact/${contact_id}`);
  return response.data;
};


export const getContact = async () => {
  let response = await axios.get(`${base_url}/get-contact`);
  return response.data;
};