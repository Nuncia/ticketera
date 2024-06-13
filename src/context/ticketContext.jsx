import { createContext, useState } from 'react';

export const TicketContext = createContext();
export const TicketProvider = ({ children }) => {
   const [buscandoTermino, setbuscandoTermino] = useState('');

   const [filteredColaboradores, setFilteredColaboradores] = useState([]);
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
         // console.log(listado);
         setListadoTicket(listado);
         console.log(listadoTicket);
      }
   };

   return (
      <TicketContext.Provider
         value={{
            listadoTicket,
            actualizaListado,
            buscandoTermino,
            setbuscandoTermino,
         }}
      >
         {children}
      </TicketContext.Provider>
   );
};

export default TicketProvider;
