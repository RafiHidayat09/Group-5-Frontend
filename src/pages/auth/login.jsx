import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken, redirectToGoogleAuth, handleGoogleCallback  } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [processingGoogle, setProcessingGoogle] = useState(false);

  const token = localStorage.getItem("accessToken")
  const decodedData = useDecodeToken(token)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)      
    try {
      const response = await login(formData)
      localStorage.setItem("accessToken", response.token)
      localStorage.setItem("userInfo", JSON.stringify(response.user))
      
      if (response.user.role === "admin") {
        navigate("/admin");
      } else if (response.user.role === "psikiater") {
        navigate("/psikiater");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle Google Login
  const handleGoogleLogin = () => {
    setError(null);
    redirectToGoogleAuth();
  };

  useEffect(() => {
    if (token && decodedData?.success) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const role = userInfo.role;

      console.log("Already logged in, redirecting...", role);

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "psikiater") {
        navigate("/psikiater", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [token, decodedData, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const hasGoogleCallback = urlParams.get('token') || urlParams.get('success');
    
    // Jika ada parameter callback dari Google OAuth
    if (hasGoogleCallback) {
      setProcessingGoogle(true);
      setError(null);
      
      console.log("Processing Google OAuth callback...");
      
      const result = handleGoogleCallback();
      
      if (result.success && result.user) {
        console.log("Google login successful:", result.user);
        
        // Redirect based on role setelah delay singkat
        setTimeout(() => {
          const userRole = result.user.role;
          
          if (userRole === "admin") {
            navigate("/admin", { replace: true });
          } else if (userRole === "psikiater") {
            navigate("/psikiater", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 500);
      } else {
        console.error("Google login failed:", result.error);
        setError(result.error || "Google authentication failed");
        setProcessingGoogle(false);
        
        // Clear URL parameters setelah error
        navigate("/login", { replace: true });
      }
    }
  }, [location, navigate]);

  if (processingGoogle) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Processing Google login...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return ( 
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <div className="px-3 text-gray-500 dark:text-gray-400">or</div>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  {loading ? "Signing in...." : "Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <Link 
                    to={"/register"}
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}