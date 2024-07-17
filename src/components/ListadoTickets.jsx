import { useState, useEffect } from 'react';

const ListadoTickets = ({ listadoTicket }) => {
   const url = 'http://localhost:3001/tickets';

   // Estado inicial con los tickets recibidos
   const [ticketStates, setTicketStates] = useState(() => {
      const estadoInicial = listadoTicket.reduce((acc, ticket) => {
         acc[ticket.id] = {
            prioridad: ticket.prioridad,
            estado: ticket.estado,
         };
         return acc;
      }, {});
      return estadoInicial;
   });

   // Función para modificar un ticket
   const modificarTicket = async (id) => {
      try {
         const ticketActualizado = ticketStates[id];
         // console.log('modificarTicket: ', ticketActualizado.prioridad); // Estado actual de la prioridad
         const respuesta = await fetch(url + '/' + id, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketActualizado),
         });
         if (respuesta.ok) {
            const resultado = await respuesta.json();
            console.log('Ticket actualizado', resultado);
            return resultado;
         } else {
            console.error(
               'Error al actualizar el ticket: ',
               respuesta.statusText
            );
         }
      } catch (error) {
         console.log('Error: ', error);
      }
   };

   // Función para manejar los cambios en los select
   const handleSelectChange = (id, field, value) => {
      // console.log('handleSelectChange: ', value);
      setTicketStates((prevStates) => ({
         ...prevStates,
         [id]: {
            ...prevStates[id],
            [field]: value,
         },
      }));
   };

   // Efecto para inicializar el estado cuando cambia listadoTicket
   useEffect(() => {
      const estadoInicial = listadoTicket.reduce((acc, ticket) => {
         acc[ticket.id] = {
            prioridad: ticket.prioridad,
            estado: ticket.estado,
         };
         return acc;
      }, {});
      setTicketStates(estadoInicial);
   }, []);

   return (
      <table
         id="tabla"
         className="bg-dark table-auto w-3/4 dark:bg-slate-800 border border-slate-400 rounded-lg m-auto mt-32"
      >
         <thead className="border-b-2 border-teal-500">
            <tr>
               <th className="border-b cursor-pointer px-10 border border-slate-300">
                  Id
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Título
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Descripción
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Tipo
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Prioridad
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Estado
               </th>
               <th className="cursor-pointer px-10 border border-slate-300">
                  Fecha
               </th>
            </tr>
         </thead>
         <tbody>
            {listadoTicket.map((ticket) => (
               <tr key={ticket.id}>
                  <td className="text-center border border-slate-300">
                     {ticket.id}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.titulo}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.descripcion}
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.tipo}
                  </td>
                  <td className="text-center border border-slate-300 w-48">
                     <select
                        id={`prioridad-${ticket.id}`}
                        name="prioridad"
                        value={ticketStates[ticket.id]?.prioridad || ''}
                        onChange={(e) =>
                           handleSelectChange(
                              ticket.id,
                              'prioridad',
                              e.target.value
                           )
                        }
                        className="bg-gray-50 border m-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     >
                        <option>{ticket.prioridad}</option>
                        <option value="1">Alta</option>
                        <option value="2">Media</option>
                        <option value="3">Baja</option>
                     </select>
                  </td>
                  <td className="text-center border border-slate-300">
                     <select
                        id={`estado-${ticket.id}`}
                        name="estado"
                        value={ticketStates[ticket.id]?.estado || ''}
                        onChange={(e) =>
                           handleSelectChange(
                              ticket.id,
                              'estado',
                              e.target.value
                           )
                        }
                        className="bg-gray-50 border m-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     >
                        <option>{ticket.estado}</option>
                        <option value="1">Abierto</option>
                        <option value="2">Cerrado</option>
                        <option value="3">Pendiente</option>
                     </select>
                  </td>
                  <td className="text-center border border-slate-300">
                     {ticket.fecha}
                  </td>
                  <td className="text-center border-r border-gray-50">
                     <button
                        className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => modificarTicket(ticket.id)}
                     >
                        Modificar
                     </button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default ListadoTickets;
