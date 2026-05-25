import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, error: '' });
        try {
            const response = await axios.post(
                'http://localhost:8082/auth/login', {
                username: this.state.username,
                password: this.state.password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
            window.location.href = '/';
        } catch (error) {
            this.setState({
                error: 'Identifiants incorrects. Veuillez reessayer.',
                loading: false
            });
        }
    };

    render() {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif'
            }}>
                <div style={{
                    background: '#ffffff',
                    border: '1px solid #fecaca',
                    borderTop: '4px solid #dc2626',
                    borderRadius: '16px',
                    padding: '48px 40px',
                    width: '100%',
                    maxWidth: '420px',
                    boxShadow: '0 10px 40px rgba(220,38,38,0.1)'
                }}>
                    <div style={{textAlign: 'center', marginBottom: '32px'}}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                            borderRadius: '16px',
                            margin: '0 auto 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.6rem',
                            color: '#fff',
                            fontWeight: '700'
                        }}>M</div>
                        <h2 style={{
                            color: '#1e293b',
                            fontWeight: '700',
                            fontSize: '1.6rem',
                            margin: '0 0 6px'
                        }}>
                            MIOLA Shop
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '0.9rem',
                            margin: 0
                        }}>
                            Connectez-vous pour acceder a votre espace
                        </p>
                    </div>

                    {this.state.error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#dc2626',
                            marginBottom: '20px',
                            fontSize: '0.88rem'
                        }}>
                            {this.state.error}
                        </div>
                    )}

                    <form onSubmit={this.handleSubmit}>
                        <div style={{marginBottom: '20px'}}>
                            <label style={{
                                color: '#374151',
                                fontSize: '0.88rem',
                                fontWeight: '500',
                                marginBottom: '8px',
                                display: 'block'
                            }}>
                                Nom d utilisateur
                            </label>
                            <input
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                                placeholder="Entrez votre nom d utilisateur"
                                style={{
                                    width: '100%',
                                    background: '#fff5f5',
                                    border: '1px solid #fecaca',
                                    borderRadius: '10px',
                                    color: '#1e293b',
                                    padding: '12px 16px',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div style={{marginBottom: '28px'}}>
                            <label style={{
                                color: '#374151',
                                fontSize: '0.88rem',
                                fontWeight: '500',
                                marginBottom: '8px',
                                display: 'block'
                            }}>
                                Mot de passe
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                                placeholder="Entrez votre mot de passe"
                                style={{
                                    width: '100%',
                                    background: '#fff5f5',
                                    border: '1px solid #fecaca',
                                    borderRadius: '10px',
                                    color: '#1e293b',
                                    padding: '12px 16px',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={this.state.loading}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                                border: 'none',
                                borderRadius: '10px',
                                color: '#fff',
                                padding: '13px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                opacity: this.state.loading ? 0.7 : 1
                            }}>
                            {this.state.loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
