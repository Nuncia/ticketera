import { useState } from 'react';
const Buscador = () => {
   const [buscandoTermino, setbuscandoTermino] = useState('');

   const handleSearch = (e) => {
      e.preventDefault();
      onSearch();
   };

   return (
      <div
         className="flex justify-end mr-10 mt-8"
         style={{ marginBottom: '20px' }}
      >
         <form action="" onSubmit={handleSearch}>
            <input
               type="text"
               name="name"
               value={buscandoTermino}
               onChange={(e) => setbuscandoTermino(e.target.value)}
               placeholder="Buscar ticket..."
            />
            <button style={{ backgroundColor: '#2f4f4f', color: 'white' }}>
               Buscar
            </button>
         </form>
      </div>
   );
};

export default Buscador;
