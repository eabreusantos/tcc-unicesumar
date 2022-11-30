import React from "react";
import useToken from "../hooks/useToken";


export default function Header() {
    const {token} = useToken()
    return (
        <nav className="border-b pl-72 border-gray bg-white p-4">
            Seja bem-vindo <b>{token.name}</b>!
            <span className="float-right mr-8">Você é um <b>{(token.type == 'especialista')? 'Especialista' : 'Paciente'}</b></span>
        </nav>
        )
};