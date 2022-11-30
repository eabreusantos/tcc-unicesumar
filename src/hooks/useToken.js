import { useState } from "react";

export const LOCALSTORAGE_KEY = 'user_session_token_tcc'

export default function useToken() {
    //TODO Validar baseado na data de expiração
    const getToken = () => {
        const tokenString = localStorage.getItem(LOCALSTORAGE_KEY);
        const userToken = JSON.parse(tokenString);
        return userToken
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}