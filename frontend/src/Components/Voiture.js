import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './myToast';
import { useParams, useNavigate } from 'react-router-dom';

const getAuthHeaders = () => ({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        let navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
}

class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.initialState, show: false };
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    initialState = {
        marque: '', modele: '', couleur: '',
        immatricule: '', prix: '', annee: ''
    };

    componentDidMount() {
        const voitureId = this.props.params && this.props.params.id;
        if (voitureId) {
            axios.get("http://localhost:8082/voitures/" + voitureId, getAuthHeaders())
                .then(response => {
                    const { marque, modele, couleur, immatricule, prix, annee } = response.data;
                    this.setState({ marque, modele, couleur, immatricule, prix, annee });
                });
        }
    }

    resetVoiture = () => { this.setState({ ...this.initialState }); };

    submitVoiture = event => {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };
        const voitureId = this.props.params && this.props.params.id;
        if (voitureId) {
            axios.put("http://localhost:8082/voitures/" + voitureId, voiture, getAuthHeaders())
                .then(response => {
                    if (response.data != null) {
                        this.setState({ show: true });
                        setTimeout(() => {
                            this.setState({ show: false });
                            this.props.navigate('/list');
                        }, 2000);
                    }
                });
        } else {
            axios.post("http://localhost:8082/voitures", voiture, getAuthHeaders())
                .then(response => {
                    if (response.data != null) {
                        this.setState({ ...this.initialState, show: true });
                        setTimeout(() => this.setState({ show: false }), 3000);
                    }
                });
        }
    };

    voitureChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { marque, modele, couleur, immatricule, prix, annee } = this.state;
        const voitureId = this.props.params && this.props.params.id;
        return (
            <div>
                <MyToast children={{
                    show: this.state.show,
                    message: voitureId ? "Voiture modifiee avec succes !" : "Voiture enregistree avec succes !",
                    type: "success"
                }} />
                <div className="form-card">
                    <div className="form-card-header">
                        <FontAwesomeIcon icon={voitureId ? faEdit : faPlusSquare} style={{marginRight: '8px'}} />
                        {voitureId ? "Modifier la Voiture" : "Ajouter une Voiture"}
                    </div>
                    <form onReset={this.resetVoiture} onSubmit={this.submitVoiture} style={{padding: '28px'}}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                <label className="form-label-custom">Marque</label>
                                <input required name="marque" type="text" value={marque}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: Toyota" />
                            </div>
                            <div>
                                <label className="form-label-custom">Modele</label>
                                <input required name="modele" type="text" value={modele}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: Corolla" />
                            </div>
                            <div>
                                <label className="form-label-custom">Couleur</label>
                                <input required name="couleur" type="text" value={couleur}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: Rouge" />
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '20px',
                            marginBottom: '28px'
                        }}>
                            <div>
                                <label className="form-label-custom">Immatricule</label>
                                <input required name="immatricule" type="text" value={immatricule}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: A-1-9090" />
                            </div>
                            <div>
                                <label className="form-label-custom">Prix (DH)</label>
                                <input required name="prix" type="number" value={prix}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: 95000" />
                            </div>
                            <div>
                                <label className="form-label-custom">Annee</label>
                                <input required name="annee" type="number" value={annee}
                                    autoComplete="off" onChange={this.voitureChange}
                                    className="form-control form-control-custom"
                                    placeholder="Ex: 2020" />
                            </div>
                        </div>
                        <div style={{
                            borderTop: '1px solid #30363d',
                            paddingTop: '20px',
                            textAlign: 'right'
                        }}>
                            <button type="submit" className="btn-save">
                                <FontAwesomeIcon icon={faSave} style={{marginRight: '6px'}} />
                                {voitureId ? "Modifier" : "Enregistrer"}
                            </button>
                            <button type="reset" className="btn-reset">
                                <FontAwesomeIcon icon={faUndo} style={{marginRight: '6px'}} />
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Voiture);
