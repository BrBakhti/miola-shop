import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const isAdmin = role === 'ADMIN';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const linkStyle = (path) => ({
        color: location.pathname === path ? '#dc2626' : '#64748b',
        textDecoration: 'none',
        margin: '0 4px',
        padding: '6px 16px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: location.pathname === path ? '600' : '400',
        background: location.pathname === path ? '#fef2f2' : 'transparent',
        border: location.pathname === path
            ? '1px solid #fecaca'
            : '1px solid transparent',
        transition: 'all 0.2s'
    });

    return (
        <nav style={{
            background: '#ffffff',
            borderBottom: '2px solid #fee2e2',
            padding: '14px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(220,38,38,0.06)'
        }}>
            <Link to={"/"} style={{
                color: '#dc2626',
                fontWeight: '700',
                fontSize: '1.4rem',
                textDecoration: 'none',
                letterSpacing: '1px'
            }}>
                MIOLA Shop
            </Link>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                {isAdmin && (
                    <Link to={"/add"} style={linkStyle('/add')}>
                        Ajouter
                    </Link>
                )}
                <Link to={"/list"} style={linkStyle('/list')}>
                    Voitures
                </Link>
                <Link to={"/ai"} style={{
                    ...linkStyle('/ai'),
                    color: location.pathname === '/ai' ? '#059669' : '#10b981',
                    background: location.pathname === '/ai' ? '#d1fae5' : 'rgba(16,185,129,0.08)',
                    border: '1px solid rgba(16,185,129,0.3)'
                }}>
                    Assistant IA
                </Link>
                <div style={{
                    marginLeft: '12px',
                    padding: '6px 14px',
                    background: isAdmin ? '#fef2f2' : '#d1fae5',
                    borderRadius: '20px',
                    border: isAdmin ? '1px solid #fecaca' : '1px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{
                        color: isAdmin ? '#b91c1c' : '#065f46',
                        fontSize: '0.82rem',
                        fontWeight: '600'
                    }}>
                        {username}
                    </span>
                    <span style={{
                        background: isAdmin
                            ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                            : '#059669',
                        color: '#fff',
                        fontSize: '0.7rem',
                        padding: '1px 8px',
                        borderRadius: '10px',
                        fontWeight: '600'
                    }}>
                        {role}
                    </span>
                </div>
                <button onClick={handleLogout} style={{
                    marginLeft: '8px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                }}>
                    Deconnexion
                </button>
            </div>
        </nav>
    );
}
export default NavigationBar;
