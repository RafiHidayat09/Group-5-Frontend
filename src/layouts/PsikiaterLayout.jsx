import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../_services/auth";

export default function PsikiaterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e4d4d] text-white p-6 flex flex-col justify-between shadow-lg">
        
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Psikiater Panel</h2>

          <nav className="flex flex-col gap-4 text-lg">

            <Link
              to="/psikiater/dashboard"
              className={`hover:underline ${
                location.pathname.includes("dashboard") ? "font-bold text-yellow-300" : ""
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/psikiater/profile"
              className={`hover:underline ${
                location.pathname.includes("profile") ? "font-bold text-yellow-300" : ""
              }`}
            >
              Profil Saya
            </Link>

            {/* MENU BARU: ARTIKEL */}
            <Link
              to="/psikiater/artikel"
              className={`hover:underline ${
                location.pathname.includes("artikel") ? "font-bold text-yellow-300" : ""
              }`}
            >
              Buat Artikel
            </Link>

          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-md"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
