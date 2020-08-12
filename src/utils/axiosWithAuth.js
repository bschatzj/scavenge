import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://backend-chef.herokuapp.com/api",
    headers: {
      Authorization: token
    }
  });
};