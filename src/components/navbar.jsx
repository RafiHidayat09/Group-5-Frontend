import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../_services/auth";
import logo from "./logo.png"; 

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
    }
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-[#1e4d4d] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[#0f2828]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    
          <NavLink to="/" className="flex items-center group">
            <div className="w-12 h-12 mr-3 transition-transform group-hover:scale-110">
             <img
                    src={logo}
                    alt="Logo OverthinkIT"
                    className="w-full h-full object-contain"
                    />
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              OverthinkIT
            </span>
          </NavLink>

          <div className="flex items-center lg:order-2">
            {token && userInfo ? (
              <>
                <span className="text-white font-medium mr-4">
                  {userInfo.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-white font-medium rounded-lg text-sm px-4 py-2 mr-2 transition-all ${
                      isActive
                        ? "bg-white/20"
                        : "hover:bg-white/10 focus:ring-4 focus:ring-[#5ba8a0]/50"
                    }`
                  }
                >
                  Masuk
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `text-white font-medium rounded-lg text-sm px-4 py-2 mr-2 transition-all ${
                      isActive
                        ? "bg-[#4a9990]"
                        : "bg-[#5ba8a0] hover:bg-[#4a9990] focus:ring-4 focus:ring-[#5ba8a0]/50"
                    }`
                  }
                >
                  Bergabung
                </NavLink>
              </>
            )}
          </div>

          {/* Navbar Links */}
          <div
            className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 rounded transition-all ${
                      isActive
                        ? "text-white bg-[#5ba8a0] lg:bg-transparent lg:text-[#7eb8b0]"
                        : "text-gray-200 hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-[#7eb8b0]"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/forums"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3  transition-all ${
                      isActive
                        ? "text-white bg-[#5ba8a0] lg:bg-transparent lg:text-[#7eb8b0]"
                        : "text-gray-200 hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-[#7eb8b0]"
                    }`
                  }
                >
                  Forum
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 transition-all ${
                      isActive
                        ? "text-white bg-[#5ba8a0] lg:bg-transparent lg:text-[#7eb8b0]"
                        : "text-gray-200 hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-[#7eb8b0]"
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 transition-all ${
                      isActive
                        ? "text-white bg-[#5ba8a0] lg:bg-transparent lg:text-[#7eb8b0]"
                        : "text-gray-200 hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-[#7eb8b0]"
                    }`
                  }
                >
                  Layanan
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
