import { get } from "./Api";

export async function me() {
  return getToken()!=null
}

export async function getUser() {
  try {
    return await get("/me", {});
  } catch (error) {
    throw error;
  }
}

export function saveToken(token) {
    localStorage.setItem("token", token);
}
export function getToken() {
    return localStorage.getItem("token");
}
export function clearToken() {
    localStorage.removeItem("token");
}

export async function login(form){
    try {
        const res = await post("/login", form);

        const token = res.data?.data?.token ?? res.data?.token;

        if (token) saveToken(token)
    } catch (error) {
        throw error;
    }
}
export async function register(form){
    try {
        const res = await post("/register", form);

        const token = res.data?.data?.token ?? res.data?.token;

        if (token) saveToken(token)
    } catch (error) {
        throw error
    }
}
