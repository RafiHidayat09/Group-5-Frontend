import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/public";
import Forums from "./pages/public/forums";
import QuizPage from "./pages/public/QuizPage";
import ResultPage from "./pages/public/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =======================
            Public Layout Routes
        ======================== */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} /> {/* path="/" */}
          <Route path="forums" element={<Forums />} />
           {/* 🔒 hanya user login */}
          <Route
            path="quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          {/* 🔒 result juga harus login */}
          <Route
            path="result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* =======================
            Auth Routes
        ======================== */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
