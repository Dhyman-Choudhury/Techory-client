import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';




const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecure = () => {
  const { user, logout } = use(AuthContext)

  axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${user?.accessToken}`
    return config;
  })

  // response interceptor
  axiosInstance.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.status === 401 || error.status === 403) {
      logout()
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign out user for 401 status code",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err=>{
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: err.message,
            showConfirmButton: false,
            timer: 1500
          });
        })
      console.log('logout the user for 401', error)
    }

    return Promise.reject(error)
  })
  return axiosInstance;
};

export default useAxiosSecure;