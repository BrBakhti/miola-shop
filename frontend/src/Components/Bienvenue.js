import React from 'react';

class Bienvenue extends React.Component {
    render() {
        return (
            <div style={{paddingBottom: '80px'}}>
                <div className="jumbotron-custom">
                    <h1 className="hero-title">
                        Bienvenue dans votre Magasin de Voitures
                    </h1>
                    <hr style={{borderColor: 'rgba(255,255,255,0.3)', marginBottom: '20px'}} />
                    <p className="hero-subtitle">
                        Le meilleur de nos voitures est expose pres de chez vous.
                    </p>
                    <p className="hero-author">-- Master MIOLA</p>
                    <div style={{marginTop: '30px', display: 'flex', gap: '12px'}}>
                        <a href="/add" className="btn-primary-custom">
                            Ajouter une Voiture
                        </a>
                        <a href="/list" className="btn-outline-custom">
                            Voir la Liste
                        </a>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderTop: '3px solid #4f46e5',
                        borderRadius: '12px',
                        padding: '28px 24px',
                        textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#4f46e5',
                            marginBottom: '8px'
                        }}>3</div>
                        <div style={{
                            color: '#94a3b8',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: '500'
                        }}>Total Voitures</div>
                    </div>
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderTop: '3px solid #059669',
                        borderRadius: '12px',
                        padding: '28px 24px',
                        textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#059669',
                            marginBottom: '8px'
                        }}>2</div>
                        <div style={{
                            color: '#94a3b8',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: '500'
                        }}>Proprietaires</div>
                    </div>
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderTop: '3px solid #0ea5e9',
                        borderRadius: '12px',
                        padding: '28px 24px',
                        textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#0ea5e9',
                            marginBottom: '8px'
                        }}>3</div>
                        <div style={{
                            color: '#94a3b8',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: '500'
                        }}>Marques</div>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                }}>
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '28px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            color: '#4f46e5',
                            fontWeight: '600',
                            fontSize: '1.05rem',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{
                                background: '#ede9fe',
                                color: '#5b21b6',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: '600'
                            }}>NEW</span>
                            Ajouter une Voiture
                        </div>
                        <p style={{
                            color: '#64748b',
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            Ajoutez facilement une nouvelle voiture dans votre
                            magasin en remplissant le formulaire avec les
                            informations necessaires.
                        </p>
                        <a href="/add" style={{
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            color: '#fff',
                            padding: '9px 20px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            Commencer
                        </a>
                    </div>
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '28px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            color: '#059669',
                            fontWeight: '600',
                            fontSize: '1.05rem',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{
                                background: '#d1fae5',
                                color: '#065f46',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: '600'
                            }}>LIST</span>
                            Gerer les Voitures
                        </div>
                        <p style={{
                            color: '#64748b',
                            fontSize: '0.9rem',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            Consultez la liste complete de vos voitures,
                            modifiez les informations ou supprimez des
                            entrees facilement.
                        </p>
                        <a href="/list" style={{
                            background: '#d1fae5',
                            border: '1px solid #a7f3d0',
                            color: '#059669',
                            padding: '9px 20px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            Voir la liste
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bienvenue;
