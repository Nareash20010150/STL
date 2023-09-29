import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './views/public/Home';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainLayout page={<Home />} />} />
        <Route exact path="/login" element={<MainLayout public={true} page={<Login />} />} />
        <Route exact path="/register" element={<MainLayout public={true} page={<Register />} />} />
      </Routes>
    </Router>
  );
}

export default App;
