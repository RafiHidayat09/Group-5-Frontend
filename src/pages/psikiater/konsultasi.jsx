import { useState } from "react";
import { Bell, MessageSquare, Calendar, Clock } from "lucide-react";

const RequestKonsultasi = () => {
  const [requests, setRequests] = useState([]); {/* ambil data */}

  const handleRequest = (id, action) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Permintaan Konsultasi
      </h1>

      <div className="bg-white rounded-lg shadow">
        {requests.filter((r) => r.status === "pending").length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Tidak ada permintaan konsultasi baru</p>
          </div>
        ) : (
          requests
            .filter((r) => r.status === "pending")
            .map((request) => (
              <div
                key={request.id}
                className="p-6 border-b last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {request.patient}
                      </h3>

                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 flex items-center gap-1">
                        <MessageSquare size={14} /> Chat
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">
                      <strong>Keluhan:</strong> {request.issue} {/* ini bisa ambil dari asessment (kalau udh bisa) */}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {request.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {request.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleRequest(request.id, "accepted")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Terima
                    </button>
                    <button
                      onClick={() => handleRequest(request.id, "rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>


      {requests.filter((r) => r.status !== "pending").length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-700">
              Riwayat Tindakan
            </h2>
          </div>

          {requests
            .filter((r) => r.status !== "pending")
            .map((request) => (
              <div
                key={request.id}
                className="p-4 border-b last:border-b-0 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {request.patient}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={14} />
                    {request.date} - {request.time}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {request.status === "accepted"
                    ? "Diterima"
                    : "Ditolak"}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RequestKonsultasi;
