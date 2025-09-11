import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/CreatePost";
import PostsDashboard from "../pages/PostsDashboard";
import { useAuthValue } from "../context/AuthContext";
import SearchResults from "../pages/SearchResults";
import EditPost from "../pages/EditPost";
import ViewPost from "../pages/ViewPost";
import ErrorPage from "../pages/ErrorPage";
import LootSplit from "../pages/LootSplit";
const AppRoutes = () => {
  const { user } = useAuthValue();
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/loot-split" element={<LootSplit />} />

          {/* Rotas privadas */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/posts/create"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/posts"
            element={user ? <PostsDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/posts/edit/:postId"
            element={user ? <EditPost /> : <Navigate to="/login" />}
          />
          <Route
            path="/view/:postId"
            element={user ? <ViewPost /> : <Navigate to="/login" />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
