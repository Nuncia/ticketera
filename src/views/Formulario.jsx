import { useEffect, useState, useContext } from 'react';
import { TicketContext } from '../context/ticketContext';
import { v4 as uuidv4 } from 'uuid';

const Formulario = () => {
   const { listadoTicket, actualizaListado, setListadoTicket } =
      useContext(TicketContext);
   const [titulo, setTitulo] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [tipo, setTipo] = useState('');
   const [prioridad, setPrioridad] = useState('');
   const [estado, setEstado] = useState('abierto');
   const [mensaje, setMensaje] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();

      const fecha = new Date();
      const ticket = {
         id: uuidv4(),
         titulo,
         descripcion,
         tipo,
         fechaHora: fecha.toLocaleString(),
         prioridad,
         estado: 'abierto',
      };
      actualizaListado(ticket);
      resetForm();
   };

   const resetForm = () => {
      setTitulo('');
      setDescripcion('');
      setTipo('');
      setPrioridad('');
      setEstado('');
   };

   useEffect(() => {
      console.log(listadoTicket);
   }, [listadoTicket]);
   return (
      <div>
         <p className="text-2xl text-center pt-10 pb-3">Agregar Ticket</p>
         <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
         >
            <input
               className="form-control text-lg rounded-md block m-3 w-full p-2.5 border dark:bg-gray-700 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
               type="text"
               name="titulo"
               placeholder="Título"
               value={titulo}
               onChange={(e) => setTitulo(e.target.value)}
            />
            <input
               className="form-control text-lg rounded-md block m-3 w-full p-2.5 dark:bg-gray-700 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
               type="text"
               name="descripcion"
               placeholder="Descripción"
               value={descripcion}
               onChange={(e) => setDescripcion(e.target.value)}
            />
            <select
               id="ticket-select"
               name="tipo"
               value={tipo}
               onChange={(e) => setTipo(e.target.value)}
               className="bg-gray-50 border m-3 text-lg border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
               <option>Selecciona un tipo</option>
               <option value="tecnico">Técnico</option>
               <option value="funcional">Funcional</option>
            </select>
            <select
               id="ticket-select"
               name="prioridad"
               value={prioridad}
               onChange={(e) => setPrioridad(e.target.value)}
               className="bg-gray-50 border m-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
               <option>Selecciona prioridad</option>
               <option value="alta">Alta</option>
               <option value="media">Media</option>
               <option value="baja">Baja</option>
            </select>
            <button
               className="btn color text-lg ml-7 m-3 pt-2 pb-2 text-white bg-teal-500 rounded-xl"
               type="submit"
               onClick={handleSubmit}
            >
               Agregar
            </button>
         </form>
         {/* {mensaje && <p>{mensaje}</p>} */}
      </div>
   );
};

export default Formulario;
