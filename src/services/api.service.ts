import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
    },
});


class ApiService {

    async get<T>(url: string): Promise<T> {
        try {
            const response = await axiosInstance.get<T>(url);
            return response.data;
        }
        catch (error) {
            throw error;
        }
        
    }
    async post<T>(url: string, body:any): Promise<T> {
        try {
            const response = await axiosInstance.post<T>(url, body);
            return response.data;
        }
        catch (error) {
            throw error;
        }
        
    }
     async put<T>(url: string, body:any): Promise<T> {
        try {
            const response = await axiosInstance.put<T>(url, body);
            return response.data;
        }
        catch (error) {
            throw error;
        }
        
    }
    async delete<T>(url: string, id: number): Promise<T> {
        try {
            const response = await axiosInstance.delete<T>(`${url}/${id}`);
            return response.data;
        }
        catch (error) {
            throw error;
        }
        
    }
}

const apiService = new ApiService();

export default apiService;