import axios from "axios";

<<<<<<< HEAD
const api = axios.create({
=======
const api = await axios.create({
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
  baseURL: "http://localhost:5000/api/onboarding",
  withCredentials: true,
});

export const submitStep1 = (data) => api.post("/step1", data);
export const submitStep2 = (data) => api.post("/step2", data);
export const sendOTP = (data) => api.post("/send-otp", data);
export const verifyOTP = (data) => api.post("/verify-otp", data);
export const saveAddress = (data) => api.post("/address", data);
export const uploadDocuments = (data) =>
  api.post("/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const setSecurity = (data) => api.post("/security", data);
export const finalSubmit = () => api.post("/submit");
