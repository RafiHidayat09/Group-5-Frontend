import { useState } from "react";
import {
  Activity,
  Bell,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import RequestKonsultasi from "../pages/psikiater/konsultasi";
import KonsultasiAktif from "../pages/psikiater/aktif";
import RiwayatPasien from "../pages/psikiater/histori";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between border border-gray-100">
                {/* bisa sesuaikan dg kebutuhan */}
                <div>
                  <p className="text-gray-500 text-sm">Total Pasien</p>
                  <p className="text-4xl font-extrabold text-gray-800 mt-1">120</p>
                </div>

                <div className="p-4 rounded-xl text-white" style={{ backgroundColor: '#009933' }}>
                  <Activity size={26} />
                </div>
              </div>
            </div>
          </>
        );

      case "konsultasi_request":
        return <RequestKonsultasi />;

      case "aktif":
        return <KonsultasiAktif />; 

      case "histori":
        return <RiwayatPasien />; 

      case "pengaturan":
        return <h1 className="text-xl font-bold">Setting</h1>;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <div 
        className="w-64 border-r p-6 flex flex-col shadow-lg"
        style={{ backgroundColor: '#003333' }}
      >

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Dr. Boyke</h2>
          <p className="text-sm mt-1" style={{ color: '#b0e892' }}>Psikolog</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveMenu("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === "dashboard" 
                ? "text-white shadow-md" 
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: activeMenu === "dashboard" ? '#027f7f' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== "dashboard") {
                e.currentTarget.style.backgroundColor = 'rgba(2, 127, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== "dashboard") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Activity size={18} />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveMenu("konsultasi_request")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === "konsultasi_request" 
                ? "text-white shadow-md" 
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: activeMenu === "konsultasi_request" ? '#027f7f' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== "konsultasi_request") {
                e.currentTarget.style.backgroundColor = 'rgba(2, 127, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== "konsultasi_request") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Bell size={18} />
            <span className="leading-tight font-medium">Permintaan</span>
          </button>

          <button
            onClick={() => setActiveMenu("aktif")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === "aktif" 
                ? "text-white shadow-md" 
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: activeMenu === "aktif" ? '#027f7f' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== "aktif") {
                e.currentTarget.style.backgroundColor = 'rgba(2, 127, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== "aktif") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <MessageSquare size={18} />
            <span className="font-medium">Konsultasi Aktif</span>
          </button>

          <button
            onClick={() => setActiveMenu("histori")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === "histori" 
                ? "text-white shadow-md" 
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: activeMenu === "histori" ? '#027f7f' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== "histori") {
                e.currentTarget.style.backgroundColor = 'rgba(2, 127, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== "histori") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <FileText size={18} />
            <span className="font-medium">Riwayat Pasien</span>
          </button>

          <button
            onClick={() => setActiveMenu("pengaturan")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === "pengaturan" 
                ? "text-white shadow-md" 
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor: activeMenu === "pengaturan" ? '#027f7f' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== "pengaturan") {
                e.currentTarget.style.backgroundColor = 'rgba(2, 127, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== "pengaturan") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Settings size={18} />
            <span className="font-medium">Setting</span>
          </button>
        </nav>

        <button 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}