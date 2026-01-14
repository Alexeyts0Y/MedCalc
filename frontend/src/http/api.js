import axios from "axios";

const api = axios.create({
    baseURL: "/api",
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
    calculateBMI: async (weight, height, city = null) => {
        try {
            const requestData = { weight, height };
            if (city !== null && city !== '') {
                requestData.city = city;
            }
            return await api.post("/bmi", requestData);
        } catch (error) {
            console.error("Error calculating BMI", error);
            throw error;
        }
    },
    getStatistics: async () => {
        try {
            return await api.get("/stats");
        } catch (error) {
            console.error("Error fetching statistics", error);
            throw error;
        }
    }
}

export default api;