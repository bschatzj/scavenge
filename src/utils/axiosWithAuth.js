import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://salty-peak-24943.herokuapp.com/api",
    headers: {
      Authorization: token
    }
  });
};