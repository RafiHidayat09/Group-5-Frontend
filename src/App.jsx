import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequestKonsultasi from './pages/psikiater/konsultasi';
import KonsultasiAktif from './pages/psikiater/aktif';
import Catatan from './pages/psikiater/catatan';
import RiwayatPasien from './pages/psikiater/histori';
import Dashboard from './layouts/psikiater';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
       <Route path="/psikiater" element={<Dashboard />} >
        
        <Route path="konsultasi" element={<RequestKonsultasi />} />    
        <Route path="aktif" element={<KonsultasiAktif />} />  
        <Route path="histori" element={<RiwayatPasien />} />  

        <Route path="aktif/:id/catatan" element={<Catatan />} />
       </Route>
        
  

      </Routes>
    </BrowserRouter>
  );
}

export default App;
