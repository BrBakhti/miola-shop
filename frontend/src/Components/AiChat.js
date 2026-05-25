import React, { Component } from 'react';
import axios from 'axios';

const getAuthHeaders = () => ({
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'text/plain'
    }
});

export default class AiChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: false,
            mode: 'chat',
            history: []
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.message.trim()) return;
        this.setState({ loading: true });

        const url = this.state.mode === 'chat'
            ? 'http://localhost:9090/ai/chat'
            : 'http://localhost:9090/ai/recommander';

        try {
            const response = await axios.post(url, this.state.message, getAuthHeaders());
            this.setState({
                loading: false,
                history: [{
                    question: this.state.message,
                    answer: response.data,
                    mode: this.state.mode
                }, ...this.state.history],
                message: ''
            });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <div style={{paddingBottom: '80px'}}>
                <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                    <div style={{
                        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                        padding: '16px 24px',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                    }}>
                        Assistant IA - Conseiller Automobile
                    </div>
                    <div style={{padding: '24px'}}>
                        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                            <button
                                onClick={() => this.setState({mode: 'chat'})}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: this.state.mode === 'chat'
                                        ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                                        : '#f1f5f9',
                                    color: this.state.mode === 'chat' ? '#fff' : '#64748b',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                Chat General
                            </button>
                            <button
                                onClick={() => this.setState({mode: 'recommander'})}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: this.state.mode === 'recommander'
                                        ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                                        : '#f1f5f9',
                                    color: this.state.mode === 'recommander' ? '#fff' : '#64748b',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                Recommandation Voiture
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <textarea
                                value={this.state.message}
                                onChange={(e) => this.setState({message: e.target.value})}
                                placeholder={this.state.mode === 'chat'
                                    ? "Posez votre question..."
                                    : "Ex: Je cherche une voiture rouge pas chere..."}
                                rows={4}
                                style={{
                                    width: '100%',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    color: '#1e293b',
                                    padding: '12px 14px',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    marginBottom: '16px',
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={this.state.loading}
                                style={{
                                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    padding: '10px 24px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    opacity: this.state.loading ? 0.7 : 1
                                }}>
                                {this.state.loading ? 'En cours...' : 'Envoyer'}
                            </button>
                        </form>
                    </div>
                </div>

                {this.state.history.map((entry, index) => (
                    <div key={index} style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            marginBottom: '12px',
                            borderLeft: '3px solid #4f46e5'
                        }}>
                            <div style={{
                                color: '#4f46e5',
                                fontWeight: '600',
                                fontSize: '0.8rem',
                                marginBottom: '4px',
                                textTransform: 'uppercase'
                            }}>Question</div>
                            <p style={{color: '#334155', margin: 0}}>{entry.question}</p>
                        </div>
                        <div style={{
                            background: '#f0fdf4',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            borderLeft: '3px solid #059669'
                        }}>
                            <div style={{
                                color: '#059669',
                                fontWeight: '600',
                                fontSize: '0.8rem',
                                marginBottom: '4px',
                                textTransform: 'uppercase'
                            }}>Reponse IA</div>
                            <p style={{color: '#334155', lineHeight: '1.7', margin: 0}}>
                                {entry.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
