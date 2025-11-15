import { useState } from "react";

const Catatan = ({ patient, onBack }) => {
  const [formData, setFormData] = useState({
    keluhan: '',
    diagnosis: '',
    tindakan: '',
    resep: '',
    catatan_tambahan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const catatanData = {
      id: Date.now(),
      patient_id: patient.id,
      patient_name: patient.patient,
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID'),
      ...formData
    };

    // Simpan ke backend atau state management
    console.log('Catatan tersimpan:', catatanData);
    alert('Catatan berhasil disimpan!');
    onBack();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button onClick={onBack} className="text-blue-500 hover:text-blue-600 mb-2">
            ← Kembali ke Chat
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Catatan Konsultasi</h2>
          <p className="text-gray-600">Pasien: {patient.patient}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keluhan 
          </label>
          <textarea
            name="keluhan"
            value={formData.keluhan}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jelaskan keluhan utama pasien..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagnosis
          </label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis diagnosis..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rencana Tindakan/Terapi
          </label>
          <textarea
            name="tindakan"
            value={formData.tindakan}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rencana tindakan atau terapi..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resep Obat (jika ada)
          </label>
          <textarea
            name="resep"
            value={formData.resep}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Daftar obat dan dosis..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catatan Tambahan
          </label>
          <textarea
            name="catatan_tambahan"
            value={formData.catatan_tambahan}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Catatan tambahan untuk follow-up..."
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Simpan Catatan
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catatan;