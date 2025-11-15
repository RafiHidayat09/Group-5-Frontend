import { useState } from "react";

const ChatConsultation = ({ patient, onBack, onCreateNotes }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'patient', text: 'Selamat pagi dokter, saya merasa sangat cemas akhir-akhir ini', time: '09:00' },
    { id: 2, sender: 'doctor', text: 'Selamat pagi. Saya Dr. Sarah. Mari kita bicarakan keluhannya. Sejak kapan Anda merasakan kecemasan ini?', time: '09:02' },
    { id: 3, sender: 'patient', text: 'Sudah sekitar 2 minggu, terutama saat bekerja', time: '09:03' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'doctor',
        text: newMessage,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full gap-6">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="text-blue-500 hover:text-blue-600">
            ← Kembali
          </button>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {patient?.patient?.charAt(0) || 'P'}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{patient?.patient || 'Pasien'}</p>
            <p className="text-xs text-green-500">● Online</p>
          </div>
        </div>
        <button 
          onClick={onCreateNotes}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Buat Catatan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatConsultation;