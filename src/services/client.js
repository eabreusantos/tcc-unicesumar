import axios from "axios";

import {LOCALSTORAGE_KEY} from '../hooks/useToken'

export function redirectToLogin() {
   localStorage.removeItem(LOCALSTORAGE_KEY);
   window.location.reload();
}

export function getAxiosClient(notValidateToken) {
    let headers = {};
    if (!notValidateToken) {
        const tokenStored = localStorage.getItem(LOCALSTORAGE_KEY);
    
        if (!tokenStored) {
           redirectToLogin();
        }
    
        const {token} = JSON.parse(tokenStored);
     
        headers.authorization = `Bearer ${token}`
    }

    const instance = axios.create({
        baseURL: "http://localhost:3004/",
        timeout: 30000,
        headers: headers
    });

    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        if (error.response.status === 403) {
            redirectToLogin();
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });
    return instance
}
