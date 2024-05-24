import axios from "axios";
const backendUrl = `https://story-backend-rho.vercel.app/api/v1`;

export const registerUser = async ({ username, password }) => {
    try {
      const reqUrl = `${backendUrl}/auth/register`;
      console.log("Request URL:", reqUrl); // Log request URL for debugging
      console.log("Request Data:", { username, password }); // Log request data for debugging
      const response = await axios.post(reqUrl, {
        username,
        password   
      });
      console.log("Response Data:", response.data); // Log response data for debugging
    } catch (error) {
      console.log("Error:", error); // Log error for debugging
      alert("Something went wrong!");
    }
  };
  

export const loginUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(reqUrl, { username, password });
    localStorage.setItem("token", response.data.token);
    return response.data.username;
    
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};

