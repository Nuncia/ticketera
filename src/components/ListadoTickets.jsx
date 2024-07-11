import { useState, useEffect } from 'react';
import {
   getCoreRowModel,
   useReactTable,
   flexRender,
} from '@tanstack/react-table';
import { TicketContext } from '../context/ticketContext';
import Buscador from './Buscador';
import UseColumns from '../hooks/useColumns';
import UseRows from '../hooks/UseRows';

const ListadoTickets = ({ listadoTicket }) => {
   const [prioridad, setPrioridad] = useState('');
   const [estado, setEstado] = useState('');

   const modificarTicket = () => {
      console.log(prioridad);
   };
   useEffect(() => {
      console.log(listadoTicket);
   }, []);

   return (
      <>
         {
            <table
               id="tabla"
               className="bg-dark table-auto w-3/4 dark:bg-slate-800 border border-slate-400 rounded-lg m-auto mt-32"
            >
               <thead className="border-b-2 border-teal-500">
                  {/* {tabla.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th key={header.id}>
                              {header.column.columnDef.header}
                           </th>
                        ))}
                     </tr>
                  ))} */}
                  <tr>
                     <th
                        className="border-b cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(0)}
                     >
                        Id
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(1)}
                     >
                        Título
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(2)}
                     >
                        Descripción
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(3)}
                     >
                        Tipo
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(4)}
                     >
                        Prioridad
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(5)}
                     >
                        Estado
                     </th>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
                        // onClick={listarOrdenado(6)}
                     >
                        Fecha
                     </th>
                     {/* <th className="border-none"></th> */}
                  </tr>
               </thead>
               <tbody>
                  {listadoTicket.map((ticket) => (
                     <tr key={ticket.id}>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.id}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.titulo}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.descripcion}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.tipo}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300 w-48"
                        >
                           <select
                              id={ticket.id}
                              name="prioridad"
                              value={ticket.prioridad || ''}
                              onChange={(e) => setPrioridad(e.target.value)}
                              className="bg-gray-50 border m-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           >
                              <option>{ticket.prioridad}</option>
                              <option value={1}>Alta</option>
                              <option value={2}>Media</option>
                              <option value={3}>Baja</option>
                           </select>
                           {/* </select> */}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           <select
                              id="estado-select"
                              name="estado"
                              value={ticket.estado || ''}
                              className="bg-gray-50 border m-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => setEstado(e.target.value)}
                           >
                              <option value={ticket.estado}>
                                 {ticket.estado}
                              </option>
                              <option value={2}>Abierto</option>
                              <option value={3}>Cerrado</option>
                              <option value={4}>Pendiente</option>
                           </select>
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.fecha}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border-r border-gray-50"
                        >
                           <button
                              className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => modificarTicket()}
                           >
                              Modificar
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         }
      </>
   );
};

export default ListadoTickets;
