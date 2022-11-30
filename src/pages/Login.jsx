import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '../components/elements/alert';
import { getUserByUsernameAndPassword } from '../services/login';
import { createUser } from '../services/pacientes'
import Logo from "../assets/logo.svg"

export default function Login({setToken}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const [create, setCreate] = useState(false)

    const onSubmit = async (data) => {
        try {
            const result = await getUserByUsernameAndPassword(data.username, data.password, data.type);
            const response = result.data;
            setToken(result.data);
        
        } catch(err) {
            setError("Login ou senha invalidos, tente novamente!");
            console.error(err);
        }
    };

    const onCreate = async (data) => {
        try {
            const result = await createUser(data);
            setSuccess('Cadastro realizado com sucesso!')
            setTimeout(() => {
                setCreate(false)
            }, 3000)
        
        } catch(err) {
            setError("Dados inválidos, tente novamente!");
            console.error(err);
        }
    }

    return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl  text-gray-900 dark:text-white">
             <img src={Logo} width="50" className='mr-3' /> <span className='text-orange-600'><b>Consulta Web</b></span>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                {!create &&
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Faça login em sua conta
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                        
                        {error && <Alert variant="error" text={error} />}

                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eu sou:</label>
                            <select {...register("type", {required: true})} autoComplete="off"  className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}>
                                <option value={'especialista'}>Especialista Ex.: Médico</option>
                                <option value={'paciente'}>Paciente</option>
                            </select>
                            {errors.type && <span>Este campo é obrigatório</span>}
                        </div>

                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                            <input {...register("username", {required: true})} autoComplete="off"  type="text" name="username" id="username" className="input-text" placeholder="Digite seu usuário" required />
                            {errors.username && <span>Este campo é obrigatório</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input {...register("password", {required: true})} autoComplete="off"  type="password" name="password" id="password" placeholder="••••••••" className="input-text" required />
                            {errors.password && <span>Este campo é obrigatório</span>}
                        </div>
                        <button type="submit" className="btn w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>
                        <button onClick={() => setCreate(true)} className="btn w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sou por aqui!</button>
                        <a className='mt-10 block cursor-pointer' onClick={() => alert('Envie um e-mail para: contato@consultaweb.com.br')}>Esqueceu sua senha?</a>
                    </form>
                </div>
                }
                {create &&
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Novo cadastro
                        </h1>
                        <form onSubmit={handleSubmit(onCreate)} className="space-y-4 md:space-y-6" action="#">
                        
                        {error && <Alert variant="error" text={error} />}
                        {success && <Alert variant="success" text={success} />}

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome </label>
                            <input {...register("name", {required: true})} autoComplete="off"  type="text" name="name" id="name" className="input-text" placeholder="Digite seu nome" required />
                            {errors.username && <span>Este campo é obrigatório</span>}
                        </div>

                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input {...register("username", {required: true})} autoComplete="off"  type="text" name="username" id="username" className="input-text" placeholder="Digite seu usuário" required />
                            {errors.username && <span>Este campo é obrigatório</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input {...register("password", {required: true})} autoComplete="off"  type="password" name="password" id="password" placeholder="••••••••" className="input-text" required />
                            {errors.password && <span>Este campo é obrigatório</span>}
                        </div>
                        <button type="submit" className="btn w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cadastrar</button>
                        <button onClick={() => setCreate(false)} className="btn w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Voltar para o login</button>
                    </form>
                    </div>
                }
            </div>
        </div>
    </section>
    )
}