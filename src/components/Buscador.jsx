import { useState, useContext } from 'react';
import { TicketContext } from '../context/ticketContext';
const Buscador = ({ onSearch }) => {
   const { buscandoTermino, setbuscandoTermino } = useContext(TicketContext);

   const handleInputChange = (e) => {
      setbuscandoTermino(e.target.value);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      onSearch(buscandoTermino);
      setbuscandoTermino('');
   };

   return (
      <div
         className="flex justify-end mr-10 mt-8"
         style={{ marginBottom: '20px' }}
      >
         <form action="" onSubmit={handleSearch}>
            <input
               type="text"
               value={buscandoTermino}
               onChange={(e) => setbuscandoTermino(e.target.value)}
               placeholder="Buscar ticket..."
            />
            <button className="bg-teal-500 hover:bg-teal-700 text-black py-2 px-4 rounded">
               Buscar
            </button>
         </form>
      </div>
   );
};

export default Buscador;
