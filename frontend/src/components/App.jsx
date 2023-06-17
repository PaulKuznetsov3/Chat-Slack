import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../routes/Login';
import Chat from '../routes/Chat';
import ErrorPage from '../routes/ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
import useAuth from '../hooks/useAuth';
import ChatNav from './ChatNav/ChatNav';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100vh bg-light">
    <div className="h-100" id="chat">
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <ChatNav />
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
          </div>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  </div>
);

export default App;
