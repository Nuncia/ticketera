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
               <NavBar />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/formulario" element={<Formulario />} />
               </Routes>
               <Footer />
            </BrowserRouter>
         </TicketProvider>
      </>
   );
}

export default App;
