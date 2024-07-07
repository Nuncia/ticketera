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

   const filterTicket = (searchTearm) => {
      if (typeof searchTearm == 'string') {
         const filterd = listadoTicket.filter((ticket) =>
            ticket.titulo.toLowerCase().includes(searchTearm.toLowerCase())
         );
      }
      setFilteredTicket(filterd);
   };

   useEffect(() => {
      getData();
   }, []);
   return (
      <>
         <Buscador onSearch={filterTicket} />
         <ListadoTickets
            listadoTicket={filteredTicket > 0 ? filteredTicket : listadoTicket}
         />
         {/* <Table /> */}
         {/* <CRUD /> */}
      </>
   );
};

export default Home;
