import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FriendDetails from "./pages/FriendDetails";
import AddFriend from "./pages/AddFriend";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/friends/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <FriendDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-friend"
          element={
            <ProtectedRoute>
              <Layout>
                <AddFriend />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;