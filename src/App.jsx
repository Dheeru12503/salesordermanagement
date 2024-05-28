import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import BrowserRouter as Router
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        
        {/* Wrap Routes inside Router */}
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
