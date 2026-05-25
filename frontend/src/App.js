import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Login from './Components/Login';
import AiChat from './Components/AiChat';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div style={{background: '#f0f4ff', minHeight: '100vh'}}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={
                        <PrivateRoute>
                            <NavigationBar />
                            <div style={{
                                maxWidth: '1200px',
                                margin: '0 auto',
                                padding: '30px 24px 100px 24px'
                            }}>
                                <Routes>
                                    <Route path="/" element={<Bienvenue />} />
                                    <Route path="/add" element={<Voiture />} />
                                    <Route path="/edit/:id" element={<Voiture />} />
                                    <Route path="/list" element={<VoitureListe />} />
                                    <Route path="/ai" element={<AiChat />} />
                                </Routes>
                            </div>
                            <Footer />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
