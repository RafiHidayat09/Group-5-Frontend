import { FileText } from "lucide-react";
import { useState } from "react";

{/* { id: 1, name: 'Ahmad Fauzi', sessions: 5, lastVisit: '2024-11-10' }, */} //data dummy

const RiwayatPasien = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patients = [
    
  ];

  const patientDetails = {
    1: {
      history: [
        { date: '2024-11-10', diagnosis: 'Gangguan Kecemasan Umum', notes: 'Pasien menunjukkan perbaikan', treatment: 'Terapi CBT, relaksasi' },
        { date: '2024-10-20', diagnosis: 'Stres Akut', notes: 'Gejala kecemasan tinggi', treatment: 'Konseling, teknik pernapasan' }
      ]
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Pasien</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Cari pasien..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            {patients.map(patient => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedPatient === patient.id ? 'bg-blue-50' : ''
                }`}
              >
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.sessions} sesi konsultasi</p>
                <p className="text-xs text-gray-400">Terakhir: {patient.lastVisit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Riwayat Konsultasi - {patients.find(p => p.id === selectedPatient)?.name}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {patientDetails[selectedPatient]?.history.map((record, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-800">Sesi #{patientDetails[selectedPatient].history.length - idx}</span>
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-gray-700">Diagnosis:</strong> {record.diagnosis}</p>
                      <p><strong className="text-gray-700">Catatan:</strong> {record.notes}</p>
                      <p><strong className="text-gray-700">Penanganan:</strong> {record.treatment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Pilih pasien untuk melihat riwayat konsultasi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RiwayatPasien;
