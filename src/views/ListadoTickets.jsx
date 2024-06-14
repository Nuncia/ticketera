import { useState, useEffect, useContext } from 'react';
import {
   getCoreRowModel,
   useReactTable,
   flexRender,
} from '@tanstack/react-table';
import { TicketContext } from '../context/ticketContext';
import Buscador from '../components/Buscador';
import UseColumns from '../hooks/useColumns';
import UseRows from '../hooks/UseRows';

const ListadoTickets = () => {
   const { listadoTicket, setListadoTicket, buscandoTermino } =
      useContext(TicketContext);
   const [cargando, setCargando] = useState(true);
   const [filteredTicket, setFilteredTicket] = useState([]);

   const columns = [
      { header: 'Id', accessorKey: 'id' },
      { header: 'Titulo', accessorKey: 'titulo' },
      { header: 'Descripción', accessorKey: 'descripcion' },
      { header: 'Estado', accessorKey: 'estado' },
      { header: 'Tipo', accessorKey: 'tipo' },
      { header: 'Prioridad', accessorKey: 'prioridad' },
      { header: 'Fecha', accessorKey: 'fechaHora' },
   ];

   const filterTicket = () => {
      const filtered = listadoTicket.filter((ticket) =>
         ticket.titulo.toLowerCase().includes(buscandoTermino.toLowerCase())
      );
      setFilteredTicket(filtered);
   };

   const data = listadoTicket;
   const tabla = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   useEffect(() => {
      console.log(listadoTicket.length);
      if (listadoTicket.length > 0) {
         setCargando(false);
      } else {
         setCargando(false);
      }
   }, [listadoTicket]);

   const ticketDesplegados =
      filteredTicket.length > 0 ? filteredTicket : listadoTicket;

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
                  {tabla.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th key={header.id}>
                              {header.column.columnDef.header}
                           </th>
                        ))}
                     </tr>
                  ))}
                  {/* <tr>
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
                  </tr> */}
               </thead>
               <tbody>
                  {/* {ticketDesplegados.map((ticket) => (
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
                  ))} */}
                  {tabla.getRowModel().rows.map((row) => (
                     <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                           <td key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default ListadoTickets;
