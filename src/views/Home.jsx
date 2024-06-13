import { useContext, useState } from 'react';
import ListadoTickets from './ListadoTickets';
import Buscador from '../components/Buscador';

const Home = () => {
   // const filterTicket = () => {
   //    const [filteredTicket, setFilteredTicket] = useState([]);
   //    const { listadoTicket, buscandoTermino } = useContext(TicketContext);

   //    const filtered = listadoTicket.filter((ticket) =>
   //       ticket.titulo.includes(buscandoTermino)
   //    );
   //    console.log(filtered);
   //    setFilteredTicket(filtered);
   // };

   return (
      <>
         <ListadoTickets />
      </>
   );
};

export default Home;
