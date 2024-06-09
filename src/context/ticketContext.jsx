import { createContext, useState } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
   const [listadoTicket, setListadoTicket] = useState([]);

   const actualizaListado = (ticket) => {
      if (
         ticket.titulo === '' ||
         ticket.descripcion === '' ||
         ticket.tipo === '' ||
         ticket.prioridad === ''
      ) {
         console.log('faltan campos');
         setMensaje('Faltan campos por llenar');
      } else {
         const listado = [...listadoTicket, ticket];
         setListadoTicket((prevTicket) => [...prevTicket, ticket]);
         console.log(listado);
      }
   };

   return (
      <TicketContext.Provider
         value={{ listadoTicket, setListadoTicket, actualizaListado }}
      >
         {children}
      </TicketContext.Provider>
   );
};
