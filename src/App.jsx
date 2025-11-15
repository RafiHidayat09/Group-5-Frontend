import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Psikiater from './layouts/psikiater';
import RequestKonsultasi from './pages/psikiater/konsultasi';
import KonsultasiAktif from './pages/psikiater/aktif';
import Catatan from './pages/psikiater/catatan';
import RiwayatPasien from './pages/psikiater/histori';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/psikiater" element={<Psikiater />} />
        <Route path="/konsultasi" element={<RequestKonsultasi />} />    
        <Route path="/aktif" element={<KonsultasiAktif />} />  
        <Route path="/histori" element={<RiwayatPasien />} />  

        <Route path="/psikiater/aktif/:id/catatan" element={<Catatan />} />
  

      </Routes>
    </BrowserRouter>
  );
}

export default App;
