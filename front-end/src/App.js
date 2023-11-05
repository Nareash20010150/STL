import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './views/public/Home';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import MainLayout from './layouts/MainLayout';

import Services from "./views/customer/Services";
import ForgetPassword from './views/auth/Forget-Password';
import ResetPassword from './views/auth/Reset-Password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout page={<Home />} />} />
        <Route exact path="/login" element={<MainLayout public={true} page={<Login />} />} />
        <Route exact path="/register" element={<MainLayout public={true} page={<Register />} />} />
        <Route exact path="/forget-password" element={<MainLayout public={true} page={<ForgetPassword />} />} />
        <Route exact path="/reset-password" element={<MainLayout public={true} page={<ResetPassword />} />} />
        
        <Route exact path="/services" element={ <MainLayout page={<Services />} />} />
      </Routes>
    </Router>
  );
}

export default App;
