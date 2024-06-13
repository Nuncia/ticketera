import React from 'react';

const Table = () => {
   return (
      <table
         id="tabla"
         className="bg-white dark:bg-slate-800 border-separate border border-slate-400 rounded-lg m-auto mt-32"
      >
         <thead>
            <tr>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(0)}
               >
                  Id
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(1)}
               >
                  Título
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(2)}
               >
                  Descripción
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(3)}
               >
                  Tipo
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(4)}
               >
                  Prioridad
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(5)}
               >
                  Estado
               </th>
               <th
                  className="cursor-pointer px-10 border border-slate-300"
                  onClick={listarOrdenado(6)}
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
                     data-title="titulo"
                     className="text-center border border-slate-300"
                  >
                     {ticket.titulo}
                  </td>
                  <td data-titl className="text-center border border-slate-300">
                     {ticket.descripcion}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.tipo}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.prioridad}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.estado}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.fechaHora}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default Table;
