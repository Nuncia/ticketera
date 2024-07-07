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
                           className="text-center border border-slate-300"
                        >
                           {ticket.prioridad}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.estado}
                        </td>
                        <td
                           data-title="id"
                           className="text-center border border-slate-300"
                        >
                           {ticket.fecha}
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
