import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/public";
import ResultPage from "./pages/public/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PsikiaterLayout from "./layouts/PsikiaterLayout";
import Dashboard from "./pages/psikiater/Dashboard";
import QuizResults from "./pages/psikiater/QuizResults";
import UserDetail from "./pages/psikiater/UserDetail";
import Profile from "./pages/psikiater/Profile";
import QuizPage from "./pages/public/QuizPage";
import Articles from "./pages/public/articles";
import ShowArticle from "./pages/public/articles/show";
import PsikiaterArticles from "./pages/psikiater/articles";
import CreateArticles from "./pages/psikiater/articles/create";
import EditArticles from "./pages/psikiater/articles/edit";
import AdminLayout from "./layouts/admin";
import AdminDashboard from "./pages/admin";
import PsikiaterIndex from "./pages/admin/psikiater";
import CreatePsikiater from "./pages/admin/psikiater/create";
import EditPsikiater from "./pages/admin/psikiater/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =======================
            Public Layout Routes
        ======================== */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} /> {/* path="/" */}

              {/* Publik artikel */}
          <Route path="artikel" element={<Articles />} />
          <Route path="articles/show/:id" element={<ShowArticle />} />

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

          {/* CRUD ARTIKEL PSIKIATER */}
          <Route path="artikel" element={<PsikiaterArticles />} />
          <Route path="articles/create" element={<CreateArticles />} />
          <Route path="articles/edit/:id" element={<EditArticles />} />
        </Route>

         <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="psikiater" element={<PsikiaterIndex />} />
            <Route path="psikiater/create" element={<CreatePsikiater />} />
            <Route path="psikiater/edit/:id" element={<EditPsikiater />} />

         </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
