import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else if (error.request) {
            throw new Error("No response from server")
        } else {
            throw new Error("Error sending request")
        }
    }
)

export const bmiService = {
    calculateBMI: async (weight, height) => {
        try {
            return await api.post("/bmi", {
                weight,
                height
            });
        } catch (error) {
            console.error("Error calculating BMI", error);
            throw error;
        }
    }
}

export default api;