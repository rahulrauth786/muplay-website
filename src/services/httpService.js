import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (error.response.status == 401) {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {}
  }

  if (!expectedError) {
    console.log("Logging the error", error);
    alert("An expected error occured");
  }
  return Promise.reject(error);
});

// axios.defaults.withCredentials = true;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
