import http from "./httpService";

// const url = "https://us-central1-yatraauth.cloudfunctions.net/app";
const url = "https://us-central1-musicapp-cc44d.cloudfunctions.net/app";
//const url = "http://localhost:2410";

export async function getCurrentUser(token) {
  let response = await http.get(`${url}/user`, {
    headers: { authorization: token },
  });
  console.log(response);
  return response.data;
}

export function getUserLogOut() {
  try {
    sessionStorage.removeItem("token");
  } catch (error) {}
}

export function checkUserIdExist(data) {
  return http.post(`${url}/checkUserIdExist`, data);
}

export function login(data) {
  return http.post(`${url}/login`, data);
}

export function registerUser(data) {
  return http.post(`${url}/register`, data);
}
