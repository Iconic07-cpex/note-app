import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response error interceptor to normalize errors
api.interceptors.response.use(
    (response) => {
        // Pass through successful responses
        return response;
    },
    (error) => {
        // Normalize error structure
        const normalizedError = {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred.',
            fields: {},
        };

        if (error.response) {
            // Server responded with error status
            const errorData = error.response.data?.error;

            if (errorData) {
                // Backend sent standardized error format
                normalizedError.code = errorData.code || 'SERVER_ERROR';
                normalizedError.message = errorData.message || 'Server error occurred.';
                normalizedError.fields = errorData.fields || {};
            } else {
                // Backend sent non-standardized error
                normalizedError.code = error.response.status === 404 ? 'NOT_FOUND_ERROR' : 'SERVER_ERROR';
                normalizedError.message = error.response.data?.detail || error.response.statusText || 'Server error occurred.';
            }
        } else if (error.request) {
            // Network error - request was made but no response received
            normalizedError.code = 'NETWORK_ERROR';
            normalizedError.message = 'Network error. Please check your connection and try again.';
        } else {
            // Something else happened
            normalizedError.message = error.message || 'An unexpected error occurred.';
        }

        // Attach normalized error to the error object
        error.normalizedError = normalizedError;

        // Reject with the error so it can be caught by calling code
        return Promise.reject(error);
    }
);

export default api;
