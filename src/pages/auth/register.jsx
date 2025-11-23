import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../_services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length < 8 ? "Password must be at least 8 characters" : null,
      }));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (formData.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      setLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      if (!response) throw new Error("Invalid response from server");

      const user = response.user;
      const token = response.token;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "psikiater") navigate("/psikiater");
      else navigate("/");
    } catch (error) {
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: error.response?.data?.message || "Registration failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*  REGISTER FORM  */}
      <section className="bg-[#1a3c3c]/20 py-16 min-h-screen flex items-center">
        <div className="max-w-screen-xl mx-auto px-6 w-full flex justify-center">
          <div className="bg-white rounded-2xl shadow-md border border-[#1e4d4d]/20 p-8 w-full sm:max-w-md">

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-[#1e4d4d] hover:text-[#163737] mb-4 group"
            >
            <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-all"></i>
              Kembali ke Beranda
            </button>

            <h1 className="text-3xl font-bold text-[#163737] mb-6 text-center">
              Create an Account
            </h1>

            {errors.submit && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#163737] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 border border-[#1e4d4d]/30 rounded-lg focus:ring-2 focus:ring-[#1e4d4d] focus:border-[#1e4d4d] text-[#163737]"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#163737] mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full p-3 border border-[#1e4d4d]/30 rounded-lg focus:ring-2 focus:ring-[#1e4d4d] focus:border-[#1e4d4d] text-[#163737]"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#163737] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full p-3 border border-[#1e4d4d]/30 rounded-lg focus:ring-2 focus:ring-[#1e4d4d] focus:border-[#1e4d4d] text-[#163737]"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-[#1e4d4d]/50 rounded focus:ring-[#1e4d4d] text-[#1e4d4d]"
                />
                <label className="ml-2 text-[#163737] text-sm">
                  I agree to the{" "}
                  <span
                    className="underline cursor-pointer text-[#1e4d4d] hover:text-[#163737]"
                    onClick={() => setShowTerms(true)}
                  >
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e4d4d] hover:bg-[#163737] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#1e4d4d] font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/*  POPUP TERMS & CONDITIONS  */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-[#1e4d4d]/20">
            
            <h2 className="text-xl font-bold text-[#163737] mb-4">
              Terms & Conditions
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Dengan menggunakan layanan ini, Anda menyetujui bahwa data Anda
              akan diproses secara aman, tidak dibagikan kepada pihak ketiga,
              dan hanya digunakan untuk keperluan peningkatan layanan.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Pastikan Anda membaca seluruh ketentuan dengan baik. Jika Anda
              tidak setuju, Anda dapat membatalkan proses pendaftaran.
            </p>

            <button
              onClick={() => setShowTerms(false)}
              className="w-full py-2 mt-2 bg-[#1e4d4d] text-white rounded-lg hover:bg-[#163737] transition"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
