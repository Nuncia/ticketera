import { useState, useEffect } from 'react';
import Buscador from '../components/Buscador.jsx';
import ListadoTickets from '../components/ListadoTickets';

const Home = () => {
   const url = 'http://localhost:3001/tickets';

   const [listadoTicket, setListadoTicket] = useState([]);
   const [filteredTicket, setFilteredTicket] = useState([]);
   const [cargando, setCargando] = useState(true);

   const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.rows);
      setListadoTicket(data.rows);
   };

   const ticketDesplegados =
      filteredTicket.length >= 0 ? filteredTicket : listadoTicket;

   const filterTicket = (onSearch) => {
      if (typeof onSearch.trim() == 'string') {
         const filterd = listadoTicket.filter(
            (ticket) =>
               String(ticket.titulo).includes(onSearch.trim()) ||
               String(ticket.id).includes(onSearch.trim()) ||
               String(ticket.prioridad).includes(onSearch.trim()) ||
               String(ticket.estado).includes(onSearch.trim()) ||
               String(ticket.fecha).includes(onSearch.trim()) ||
               String(ticket.tipo).includes(onSearch.trim())
         );
         setFilteredTicket(filterd);
      } else {
         console.log('no hay datos');
      }
   };

   useEffect(() => {
      getData();
   }, [ticketDesplegados]);
   return (
      <>
         <Buscador onSearch={filterTicket} />
         <ListadoTickets
            listadoTicket={
               ticketDesplegados.length > 0 ? filteredTicket : listadoTicket
            }
         />
         {/* <Table /> */}
         {/* <CRUD /> */}
      </>
   );
};

export default Home;
