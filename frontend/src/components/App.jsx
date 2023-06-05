import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../routes/Login';
import Chat from '../routes/Chat';
import ErrorPage from '../routes/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from '../contexts/AuthProvider';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
            )}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
