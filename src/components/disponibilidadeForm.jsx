import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';

export default function DisponibilidadeForm({especialistaId, onSubmit, onClose}) {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {especialista_id: especialistaId},
        mode: "onChange" 
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg'>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Horário
                    </label>
                    <input {...register("horario", {required: true})} type="datetime-local" className='block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' />  
                    {errors.horario && <p className="text-red-500 text-xs italic">Este campo é obrigatório.</p>}
                </div>
            </div>     
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button disabled={!isValid} type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Confirmar agendamento</button>
                <button   onClick={() => onClose() } type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
            </div>
        </form>
    )
}