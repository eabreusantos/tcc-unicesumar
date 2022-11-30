import React, { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import { getAllAgendamentos} from '../services/pacientes';
import {getAllAgendamentosEspecialista, getDisponibilidadesAll} from '../services/especialistas'
import usePageLoading from '../hooks/usePageLoading';
import moment from 'moment'
import { Link } from 'react-router-dom';

function HomePaciente() {
    const {token} = useToken()
    const [agendamentos, setAgendamentos] = useState([])
    const [nextAgendamento, setNextAgendamento] = useState(null)
    const {setIsLoadingActive} = usePageLoading();

    useEffect(() => {
        getAllAgendamentos(token.id)
        .then((response) => {
            setAgendamentos(response.data)
            if (response.data.length > 0)
                setNextAgendamento(response.data[0])
        })
        .catch((err) => {
            showToast('Ocorreu um erro ao tentar carregar os dados', 'error')
            console.log(err);
        })
        .finally(() => {
            setIsLoadingActive(false);
        })
        ;

    }, [])

    return (
        <div>
            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Minha página inicial</h5>
            {nextAgendamento && 
            <div className="mt-5 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>Sua próxima consulta/sessão é <b>{moment(nextAgendamento.horario).format('DD/MM/YYYY HH:mm')}</b> com o especialista <b>{nextAgendamento.Especialistum.name}</b>.</p>
            </div>
            }

            {!nextAgendamento &&
                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                    <p className="font-bold">Olá</p>
                    <p className="text-sm">Você ainda não possui agendamentos, vá para <b>Meus Agendamentos</b> e agende um.</p>
                </div>
            }

            <h5 className="font-medium mt-10 leading-tight text-xl mt-0 mb-2 text-orange-600">Próximos agendamentos</h5>
            <div className="mt-5 overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Especialista
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Horário
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {nextAgendamento && agendamentos.filter((el) => el.id != nextAgendamento.id).map((el, i) => {
                           return (<tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {el.Especialistum.name}
                            </th>
                            <td className="py-4 px-6">
                                {moment(el.horario).format('DD/MM/YYYY HH:mm')}
                            </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}


function HomeEspecialista() {
    const {token} = useToken()
    const [agendamentos, setAgendamentos] = useState([])
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [nextAgendamento, setNextAgendamento] = useState(null)
    const {setIsLoadingActive} = usePageLoading();

    useEffect(() => {
        getAllAgendamentosEspecialista(token.id)
        .then((response) => {
            setAgendamentos(response.data)
            if (response.data.length > 0)
                setNextAgendamento(response.data[0])
        })
        .catch((err) => {
            showToast('Ocorreu um erro ao tentar carregar os dados', 'error')
            console.log(err);
        })
        .finally(() => {
            setIsLoadingActive(false);
        })
        ;

        getDisponibilidadesAll(token.id)
            .then((response) => {
                setDisponibilidades(response.data)
            })
            .catch((err) => {
                showToast('Ocorreu um erro ao tentar carregar os dados', 'error')
                console.log(err);
            })
            .finally(() => {
                setIsLoadingActive(false);
            })

    }, [])



    return (
        <div>
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Minha página inicial</h5>
            <div className='mt-10 flex'>
                <div className='text-center mr-4 bg-blue-500 text-white p-8 '>
                    <Link to='/disponibilidades'>
                    <h1 className='text-5xl'>{disponibilidades.length}</h1>
                    {disponibilidades.length == 1 ? "Disponibilidade" : "Disponibilidades"}
                    </Link>
                </div>
                <div className='text-center bg-green-500 text-white p-8 '>
                    <Link to='/agendamentos-especialista'>
                        <h1 className='text-5xl'>{agendamentos.length}</h1>
                        {agendamentos.length == 1 ? "Agendamento" : "Agendamentos"}
                    </Link>

                </div>
            </div>
            {nextAgendamento && 
            <div className="mt-5 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>Sua próxima consulta/sessão é <b>{moment(nextAgendamento.horario).format('DD/MM/YYYY HH:mm')}</b> com o paciente <b>{nextAgendamento.User.name}</b>.</p>
            </div>
            }  
        </div>
    )
}

export default function Home() {

    const {token} = useToken()

    let homeComponente = null

    if (token.type == 'especialista') {
        homeComponente = <HomeEspecialista />
    } else {
        homeComponente = <HomePaciente />
    }

    return (
        <> {homeComponente}
        </>
    )
}