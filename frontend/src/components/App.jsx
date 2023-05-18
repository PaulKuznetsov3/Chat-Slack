import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../routes/Login';
import Chat from '../routes/Chat';
import ErrorPage from '../routes/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
