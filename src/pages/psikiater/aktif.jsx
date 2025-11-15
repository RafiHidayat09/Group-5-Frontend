import { useState } from "react";
import ChatConsultation from "./chat";
import Catatan from "./catatan";

    {/* { id: 1, patient: "Ahmad Fauzi", lastMessage: "Terima kasih atas sarannya dokter", time: "5 menit lalu", unread: 2 },
    { id: 2, patient: "Siti Nurhaliza", lastMessage: "Saya masih merasa cemas", time: "15 menit lalu", unread: 1 }, */}  

export default function KonsultasiAktif() {
  const [sessions] = useState([
   
  ]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const handleCreateNotes = () => {
    setShowNotes(true);
  };

  const handleBackFromNotes = () => {
    setShowNotes(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Chat Aktif</h2>
        </div>

        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => {
              setSelectedSession(session);
              setShowNotes(false);
            }}
            className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer ${
              selectedSession?.id === session.id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {session.patient[0]}
              </div>
              <div>
                <h2 className="text-gray-800 font-medium">{session.patient}</h2>
                <p className="text-gray-500 text-sm">{session.lastMessage}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{session.time}</span>
              {session.unread > 0 && (
                <span className="mt-1 w-5 h-5 text-xs bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {session.unread}
                </span>
              )}
            </div>
          </div>
        ))}

        {sessions.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            Tidak ada sesi konsultasi aktif
          </div>
        )}
      </div>

      <div className="lg:col-span-2">
        {selectedSession ? (
          showNotes ? (
            <Catatan 
              patient={selectedSession} 
              onBack={handleBackFromNotes}
            />
          ) : (
            <ChatConsultation 
              patient={selectedSession} 
              onBack={() => setSelectedSession(null)}
              onCreateNotes={handleCreateNotes}
            />
          )
        ) : (
          <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center text-gray-500">
            Pilih sesi untuk memulai chat
          </div>
        )}
      </div>
    </div>
  );
}