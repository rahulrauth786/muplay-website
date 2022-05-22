import http from "./httpService";
//const url = "http://localhost:5000/musicapp-cc44d/us-central1/app";
// const url = "https://us-central1-yatraauth.cloudfunctions.net/app";
//const url = "https://us-central1-musicapp-cc44d.cloudfunctions.net/app";
const url = "http://localhost:2410/user";

export async function getCurrentUser(token) {
  let response = await http.get(`${url}/`, {
    headers: { authorization: token },
  });
  console.log(response);
  return response.data;
}

export function getUserLogOut() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {}
}

export function checkUserIdExist(data) {
  return http.post(`${url}/checkUserIdExist`, data);
}

export function login(data) {
  return http.post(`${url}/email`, data);
}

// export function login(data) {
//   return http.post(`${url}/phone`, data);
// }

export function registerUser(data) {
  return http.post(`${url}/register`, data);
}
