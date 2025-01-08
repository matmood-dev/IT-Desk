import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import ServiceExpiryTracker from './Pages/ServiceExpireyTracker/ServiceExpireyTracker';
import CCTVConfiguration from './Pages/CCTVConfiguration/CCTVConfiguration'; 
import MobileNumberConfiguration from './Pages/MobileNumberConfiguration/MobileNumberConfiguration'; 
import LineExtensionsConfiguration from './Pages/LineExtensionsConfiguration/LineExtensionsConfiguration';
import PCListConfiguration from './Pages/PCListConfiguration/PCListConfiguration';
import { AuthProvider } from './firebaseHelpers/AuthContext';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/service-expiry-tracker" element={<ProtectedRoute element={<ServiceExpiryTracker />} />} />
            <Route path="/cctv-configuration" element={<ProtectedRoute element={<CCTVConfiguration />} />} />
            <Route path="/mobile-number-configuration" element={<ProtectedRoute element={<MobileNumberConfiguration />} />} />
            <Route path="/line-extensions-configuration" element={<ProtectedRoute element={<LineExtensionsConfiguration />} />} />
            <Route path="/pc-list-configuration" element={<ProtectedRoute element={<PCListConfiguration />} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
