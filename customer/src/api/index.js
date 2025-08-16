const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


const api = {
  register: `${API_BASE_URL}/onboarding/register`,
  verifyOtp: `${API_BASE_URL}/onboarding/verify-otp`,
  // Add more endpoints as needed
};

export default api;
