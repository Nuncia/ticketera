import { useState, useEffect, useContext } from 'react';
import {
   getCoreRowModel,
   useReactTable,
   createColumnHelper,
   flexRender,
} from '@tanstack/react-table';
import { TicketContext } from '../context/ticketContext';
import Buscador from '../components/Buscador';
import UseColumns from '../hooks/useColumns';
import UseRows from '../hooks/UseRows';
import { useRouteError } from 'react-router-dom';

const ListadoTickets = () => {
   const { listadoTicket, setListadoTicket, buscandoTermino } =
      useContext(TicketContext);
   const [cargando, setCargando] = useState(true);
   const [filteredTicket, setFilteredTicket] = useState([]);

   const filterTicket = () => {
      const filtered = listadoTicket.filter((ticket) =>
         ticket.titulo.includes(buscandoTermino)
      );
      setFilteredTicket(filtered);
   };

   useEffect(() => {
      if (listadoTicket.length > 0) {
         setCargando(false);
      } else {
         setCargando(true);
      }
   }, [listadoTicket]);

   const ticketDesplegados =
      filteredTicket.length >= 0 ? filteredTicket : listadoTicket;

   return (
      <>
         <Buscador onSearch={filterTicket} />
         {cargando ? (
            <p>Cargando...</p>
         ) : (
            <table
               id="tabla"
               className="bg-white dark:bg-slate-800 border-separate border border-slate-400 rounded-lg m-auto mt-32"
            >
               <thead>
                  <tr>
                     <th
                        className="cursor-pointer px-10 border border-slate-300"
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
                  {ticketDesplegados.map((ticket) => (
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
                           {ticket.fechaHora}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default ListadoTickets;
