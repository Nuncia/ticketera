import { useState, useEffect, useContext } from 'react';
import { TicketContext } from '../context/ticketContext';
import Buscador from '../components/Buscador';

const ListadoTickets = () => {
   const { listadoTicket } = useContext(TicketContext);
   // const [tickets, setTickets] = useState([]);
   const [cargando, setCargando] = useState(true);

   useEffect(() => {
      if (listadoTicket.length === 0) {
         setCargando(false);
      } else {
         setCargando(false);
      }
   }, [listadoTicket]);

   return (
      <>
         <Buscador />
         {cargando ? (
            <p>Cargando...</p>
         ) : (
            <table className="table-auto border-collapse">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Título</th>
                     <th>Descripción</th>
                     <th>Tipo</th>
                     <th>Prioridad</th>
                     <th>Estado</th>
                     <th>Fecha</th>
                  </tr>
               </thead>
               <tbody>
                  {listadoTicket.map((ticket) => (
                     <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.titulo}</td>
                        <td>{ticket.descripcion}</td>
                        <td>{ticket.tipo}</td>
                        <td>{ticket.prioridad}</td>
                        <td>{ticket.estado}</td>
                        <td>{ticket.fechaHora}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default ListadoTickets;
