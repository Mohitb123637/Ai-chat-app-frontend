import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './components/auth/Login';
import SignUp from './components/auth/SingUp';
import Main from './components/Main/Main';
import PrivateRoute from './components/Private.route';
import AppLayout from './AppLayout';

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
      <Routes>
        {/* Public Routes  */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
