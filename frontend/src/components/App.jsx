import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../routes/Login';
import Chat from '../routes/Chat';
import Signup from '../routes/Signup';
import ErrorPage from '../routes/ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
import useAuth from '../hooks/useAuth';
import ChatNav from './ChatNav/ChatNav';
import routes from '../routes';

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
              <Route path={routes.login()} element={<Login />} />
              <Route path={routes.signup()} element={<Signup />} />
              <Route path={routes.error()} element={<ErrorPage />} />
              <Route
                path={routes.chat()}
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
