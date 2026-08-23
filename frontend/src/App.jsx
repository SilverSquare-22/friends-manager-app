import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FriendDetails from "./pages/FriendDetails";
import AddFriend from "./pages/AddFriend";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/friends/:id"
          element={
            <ProtectedRoute>
              <FriendDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-friend"
          element={
            <ProtectedRoute>
              <AddFriend />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;