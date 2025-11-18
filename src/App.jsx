import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/public";
import Forums from "./pages/public/forums";
import QuizPage from "./pages/public/QuizPage";
import ResultPage from "./pages/public/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PsikiaterLayout from "./layouts/PsikiaterLayout";
import Dashboard from "./pages/psikiater/Dashboard";
import QuizResults from "./pages/psikiater/QuizResults";
import UserDetail from "./pages/psikiater/UserDetail";
import Profile from "./pages/psikiater/Profile";

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

         {/* =======================
            Psikiater Routes
        ======================== */}
        <Route
          path="/psikiater"
          element={
            <ProtectedRoute role="psikiater">
              <PsikiaterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="results" element={<QuizResults />} />
          <Route path="results/:id" element={<UserDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
