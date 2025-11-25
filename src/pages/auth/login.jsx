import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodeToken(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login(formData);

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      if (response.user.role === "admin") {
        navigate("/admin");
      } else if (response.user.role === "psikiater") {
        navigate("/psikiater");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && decodedData && decodedData.user) {
      const role = decodedData.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "psikiater") navigate("/psikiater");
      else navigate("/");
    }
  }, [token, decodedData, navigate]);

  return (
    <section className="bg-[#1a3c3c]/20 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-[#1e4d4d]/20 shadow-lg rounded-3xl p-10 w-full max-w-md">

        {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-[#1e4d4d] hover:text-[#163737] mb-4 group"
          >
          <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-all"></i>
            Kembali ke Beranda
          </button>   

        <h1 className="text-3xl font-bold text-[#163737] text-center mb-6">
          Login to OverthinkIT
        </h1>

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#163737] mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full p-3 rounded-xl border border-[#1e4d4d]/30 focus:ring-2 
                         focus:ring-[#1e4d4d] focus:outline-none text-[#163737] bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#163737] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 rounded-xl border border-[#1e4d4d]/30 focus:ring-2 
                         focus:ring-[#1e4d4d] focus:outline-none text-[#163737] bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e4d4d] text-white p-3 rounded-xl font-semibold 
                       hover:bg-[#163737] transition-all shadow-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#1e4d4d] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
