import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TicketProvider } from './context/ticketContext';
import Formulario from './views/Formulario';
import Home from './views/Home';
import NavBar from './components/NavBar';
import Footer from './components/Fotter';

function App() {
   return (
      <>
         <TicketProvider>
            <BrowserRouter>
               <div className="grid__contenedor">
                  <NavBar />
                  <div className="container">
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/formulario" element={<Formulario />} />
                     </Routes>
                  </div>
                  <Footer />
               </div>
            </BrowserRouter>
         </TicketProvider>
      </>
   );
}

export default App;
