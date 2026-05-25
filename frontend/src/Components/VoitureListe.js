import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faList } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyToast from './myToast';

const getAuthHeaders = () => ({
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
});

export default class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = { voitures: [], show: false };
        this.isAdmin = localStorage.getItem('role') === 'ADMIN';
    }

    componentDidMount() {
        axios.get("http://localhost:9090/voitures", getAuthHeaders())
            .then(response => response.data)
            .then((data) => { this.setState({ voitures: data }); });
    }

    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:9090/voitures/" + voitureId, getAuthHeaders())
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        show: true,
                        voitures: this.state.voitures.filter(v => v.id !== voitureId)
                    });
                    setTimeout(() => this.setState({ show: false }), 3000);
                }
            });
    };

    render() {
        return (
            <div>
                <MyToast children={{
                    show: this.state.show,
                    message: "Voiture supprimee avec succes !",
                    type: "danger"
                }} />
                <div className="card-custom">
                    <div className="card-header-custom">
                        <FontAwesomeIcon icon={faList} />
                        Liste des Voitures
                        <span className="badge-count">{this.state.voitures.length}</span>
                        {!this.isAdmin && (
                            <span style={{
                                marginLeft: 'auto',
                                background: 'rgba(63,185,80,0.1)',
                                border: '1px solid rgba(63,185,80,0.3)',
                                color: '#3fb950',
                                padding: '3px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem'
                            }}>
                                Mode lecture seule
                            </span>
                        )}
                    </div>
                    <table className="table table-custom">
                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modele</th>
                                <th>Couleur</th>
                                <th>Immatricule</th>
                                <th>Annee</th>
                                <th>Prix</th>
                                {this.isAdmin && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.voitures.length === 0 ?
                                <tr><td colSpan="7">
                                    <div className="empty-state">
                                        <p>Aucune Voiture disponible</p>
                                    </div>
                                </td></tr> :
                                this.state.voitures.map((voiture) => (
                                    <tr key={voiture.id}>
                                        <td style={{fontWeight: 600}}>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>
                                            <span className="couleur-badge">
                                                {voiture.couleur}
                                            </span>
                                        </td>
                                        <td style={{
                                            fontFamily: 'monospace',
                                            color: '#8b949e'
                                        }}>
                                            {voiture.immatricule}
                                        </td>
                                        <td>{voiture.annee}</td>
                                        <td className="prix-text">
                                            {voiture.prix.toLocaleString()} DH
                                        </td>
                                        {this.isAdmin && (
                                            <td>
                                                <Link to={"/edit/" + voiture.id}
                                                    className="btn-edit">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <button className="btn-delete"
                                                    onClick={this.deleteVoiture.bind(
                                                        this, voiture.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
