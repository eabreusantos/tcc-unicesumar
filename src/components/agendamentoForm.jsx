import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAll, } from '../services/especialidades';
import {getAllByEspecialidadeId, getDisponibilidades} from '../services/especialistas'
import usePageLoading from '../hooks/usePageLoading';
import moment from 'moment/moment';

export default function AgendamentoForm({ onSubmit, onClose}) {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {},
        mode: "onChange" 
    });
    const [especialidades, setEspecialidades] = useState([])
    const [especialistas, setEspecialistas] = useState([]);
    const [disponibilidades, setDisponibilidades] = useState([])
    const {setIsLoadingActive} = usePageLoading();

    
    useEffect(() => {
        getAll()
        .then((response) => {
            setEspecialidades(response.data)
        })
    }, [])

    function handleEspecialidade(e) {
        const value = e.target.value;
        setIsLoadingActive(true)
        getAllByEspecialidadeId(value)
        .then((response) => {
            setEspecialistas(response.data)
        }).finally(() => {
            setIsLoadingActive(false)
        })
    }

    function handleEspecialista(e) {
        const value = e.target.value;
        setIsLoadingActive(true)
        getDisponibilidades(value)
        .then((response) => {
            setDisponibilidades(response.data)
        }).finally(() => {
            setIsLoadingActive(false)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg'>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Especialidade
                    </label>
                    <select {...register("especialidade_id", {required: true})} onChange={(e) => handleEspecialidade(e)} className='block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                        <option>Selecione</option>
                        {especialidades.map((el, i) => {
                            return <option key={i} value={el.id}>{el.name}</option>
                        })}
                    </select>
                    {errors.especialidade_id && <p className="text-red-500 text-xs italic">Este campo é obrigatório.</p>}

                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Especialista
                    </label>
                    <select {...register("especialista_id", {required: true})} onChange={(e) => handleEspecialista(e)} className='block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                        <option>Selecione</option>
                        {especialistas.map((el, i) => {
                            return <option key={i} value={el.id}>{el.name}</option>
                        })}
                    </select>
                    {errors.especialista_id && <p className="text-red-500 text-xs italic">Este campo é obrigatório.</p>}

                </div>
                
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="bg-gray-200 m-2 w-full p-3 px-3 mb-6">
                {disponibilidades.length == 0 && 
                    <p><b>Selecione primeiro uma <span className='text-orange-500'>especialidade</span> e um <span className='text-orange-500'>especialista</span>!</b></p>
                }
                {disponibilidades.length > 0 &&
                    disponibilidades.map((el, i) => {
                    return (<label key={i}><input {...register("disponibilidade_id", {required: true})} value={el.id} type='radio' /> {moment(el.horario).format('DD/MM/YYYY HH:mm')}</label>)
                })}

                {errors.disponibilidade_id && <p className="text-red-500 text-xs italic">Não há disponibilidade</p>}

            </div>
                
            </div>
                       
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button disabled={!isValid} type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Confirmar agendamento</button>
                <button   onClick={() => onClose() } type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
            </div>
        </form>
    )
}