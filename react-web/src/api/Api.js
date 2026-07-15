import axios from "axios";
import { toast } from "react-toastify";

// Base URL for your Laravel API — adjust to match your .env / config
const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// "Static" shared state — module-level variables in JS behave like a
// static class field: there's only ever one instance, shared by every
// file that imports this module. Not reactive on its own — see
// getLastMessage() below if you need a component to read it.
let lastMessage = null;

export const getLastMessage = () => lastMessage;

/**
 * Reads a message off a response/error payload and, if it's not
 * null/empty, stores it as the latest message and pops a toast.
 *
 * `skipToast` is read off the request config (not a shared global),
 * so it can never leak onto the wrong request/response pair even if
 * multiple requests are in flight at once.
 */
function handleMessage(data, skipToast, type = "info") {
  const message = data?.message ?? null;

  lastMessage = message;

  if (skipToast) return;

  if (message && message.trim() !== "") {
    toast[type](message);
  }
}

// Attach the auth token (if present) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Capture the latest message from every response, success or failure,
// and pop a notification when one is present.
api.interceptors.response.use(
  (response) => {
    handleMessage(response.data, response.config?.skipToast, "success");
    return response;
  },
  (error) => {
    handleMessage(error.response?.data, error.config?.skipToast, "error");

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // e.g. redirect to login if you want:
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * GET request
 * @param {string} path - endpoint path, e.g. "/me"
 * @param {object} params - optional query params
 * @param {object} options - extra axios config, e.g. { skipToast: true }
 */
export const get = (path, params = {}, options = {}) => {
  return api.get(path, { params, ...options });
};

/**
 * POST request
 * @param {string} path - endpoint path, e.g. "/login"
 * @param {object} data - request body
 * @param {object} options - extra axios config, e.g. { skipToast: true }
 */
export const post = (path, data = {}, options = {}) => {
  return api.post(path, data, options);
};

/**
 * PUT request
 * @param {string} path - endpoint path, e.g. "/users/5"
 * @param {object} data - request body
 * @param {object} options - extra axios config, e.g. { skipToast: true }
 */
export const put = (path, data = {}, options = {}) => {
  return api.put(path, data, options);
};

/**
 * DELETE request
 * @param {string} path - endpoint path, e.g. "/users/5"
 * @param {object} options - extra axios config, e.g. { skipToast: true }
 */
export const del = (path, options = {}) => {
  return api.delete(path, options);
};

export default api;
