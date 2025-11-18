import { Outlet, Link } from "react-router-dom";

export default function PsikiaterLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e4d4d] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Psikiater Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/psikiater/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/psikiater/results" className="hover:underline">Hasil Assessment</Link>
          <Link to="/psikiater/profile" className="hover:underline">Profil Saya</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
