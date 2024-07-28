import { createContext, useState } from 'react';

export const TicketContext = createContext();
export const TicketProvider = ({ children }) => {
   const [buscandoTermino, setbuscandoTermino] = useState('');

   const [filteredColaboradores, setFilteredColaboradores] = useState([]);
   const [listadoTicket, setListadoTicket] = useState([]);
   const actualizaListado = (ticket) => {
      // console.log('actualizaListado', ticket);
      if (
         ticket.titulo === '' ||
         ticket.descripcion === '' ||
         ticket.tipo === '' ||
         ticket.prioridad === ''
      ) {
         // console.log('faltan campos');
         setMensaje('Faltan campos por llenar');
      } else {
         const listado = [...listadoTicket, ticket];
         // setListadoTicket((prevTicket) => [...prevTicket, ticket]);
         enviarFormulario(ticket);
         // console.log(ticket);
      }
   };

   const enviarFormulario = async (ticket) => {
      console.log('enviarFormulario: ', ticket);
      try {
         const respuesta = await fetch('http://localhost:3001/tickets', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
         });

         // console.log(respuesta);
         if (respuesta.ok) {
            const resultado = await respuesta.json();
            console.log('Success:', resultado);
         } else {
            console.error('Error:', respuesta.statusText);
         }
      } catch (error) {
         console.log('Error: ', error);
      }
   };

   return (
      <TicketContext.Provider
         value={{
            listadoTicket,
            setListadoTicket,
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
