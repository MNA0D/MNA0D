import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import DataTableFlock from './DataTableFlock';
import DataTableUser from './DataTableUser';
import DataTableToast from './DataTableToast';
import { fetchSheepData } from './FetchSheepData';
import { fetchUserData } from './FetchUserData';
import { fetchToastData } from './FetchToastData';
import { fetchCreateUser } from './FetchCreateUser';
import updateUser from './FetchUpdateUser';
import deleteUser from './FetchDeleteUser';

function Administration() {
    const [sheepData, setSheepData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [toastData, setToastData] = useState([]);
    const [userDataCreation, setDataCreation] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ user: '', mail: '', admin: false });

    const getDataCreation = async () => {
        try {
            const data = await fetchCreateUser();
            setDataCreation(data);
        } catch (error) {
            setError('Erreur lors de la création de l\'utilisateur');
            setDataCreation(null);
            console.error("Error loading toast data:", error);
        }
    };

    const handleDeleteUser = () => {
        if (selectedUser) {
            deleteUser(selectedUser.user, userData, setUserData, setSelectedUser);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (selectedUser) {
            updateUser(selectedUser._id, formData, setUserData);
        }
    };

    const generatePassword = (length = 12) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getSheepData = async () => {
            try {
                const data = await fetchSheepData();
                setSheepData(data);
            } catch (error) {
                console.error("Error loading sheep data:", error);
            }
        };

        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        const getToastData = async () => {
            try {
                const data = await fetchToastData();
                setToastData(data);
            } catch (error) {
                console.error("Error loading toast data:", error);
            }
        };

        if (selectedUser) {
            setFormData({ user: selectedUser.user, mail: selectedUser.mail, admin: selectedUser.admin });
        }

        getSheepData();
        getUserData();
        getToastData();
    }, [selectedUser]);

    return (
        <>
            <Helmet>
                <title>Administration - MNA0D</title>
            </Helmet>

            <link href="./assets/css/staterTemplate.css" rel="stylesheet" />

            <div className="container">
                <h2 className="text-primary">Bienvenue sur le Panneau d'Administration</h2>
                <p className="lead">Ici, vous pouvez gérer diverses fonctionnalités et utilisateurs avec des privilèges d'administrateur. Veuillez utiliser ces outils avec discernement et respect pour la sécurité et la confidentialité des données.</p>
            </div>

            <div className="container mb-4 card">
                <h2 className="pb-2 border-bottom">Gestion des utilisateurs :</h2>

                <div className="row mb-4 mt-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Crée un nouvel utilisateur</h5>
                            </div>
                            <div className="card-body">
                                <p>Vous pouvez créer un utilisateur en cliquant sur le bouton ci-dessous.</p>
                                <p>L'utilisateur est crée par défaut. Il aura lui même la possibilité de modifier ses informations. Les informations s'afficheront à droite.</p>
                                <button onClick={getDataCreation} className="btn btn-success">Crée un nouvel utilisateur</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Information à propos de l'utilisateur crée : </h5>
                            </div>
                            <div className="card-body">
                                {userDataCreation ? (
                                    <>
                                        <p className="text-center">⚠️ Il n'est pas recommandé d'envoyer l'id de l'utilisateur. L'utilisateur, l'email ainsi que le mot de passe <span className="text-danger">"plainPassword"</span> suffit à se connecter.⚠️</p>
                                        <pre>{JSON.stringify(userDataCreation, null, 2)}</pre>
                                    </>

                                ) : (
                                    <p className="">Les informations une fois l'utilisateur crée apparaissent ici.</p>
                                )}
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Visualisation et management des utilisateurs :</h5>

                            </div>
                            <div className="card-body">
                                <DataTableUser userData={userData} setSelectedUser={setSelectedUser} />
                                {selectedUser && (
                                    <>
                                        <small className="text-muted">⚠️ L'utilisateur sera supprimé définitivement. ⚠️</small><br></br>
                                        <small className="text-muted">Utilisateur sélectionné : {selectedUser.user}</small>
                                        <button className="btn btn-warning w-100" onClick={handleDeleteUser}>
                                            Supprimer l'utilisateur : <span className="text-danger">{selectedUser.user}</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {selectedUser && (
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Update un utilisateur</h5>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={handleUpdateUser}>
                                        <Form.Group className="mb-3" controlId="formUsername">
                                            <Form.Label>Nom d'utilisateur</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="user"
                                                placeholder={selectedUser.user}
                                                value={formData.user}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="mail"
                                                placeholder={selectedUser.mail}
                                                value={formData.mail}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label>Mot de passe</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Hum, not sorry. Nice try btw."
                                                    value={formData.password || ''}
                                                    onChange={handleChange}
                                                />
                                                <Button
                                                    variant="warning"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? "Masquer" : "🔎"}
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setFormData((prevData) => ({ ...prevData, password: generatePassword() }))}
                                                >
                                                    Générer
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAdmin">
                                            <Form.Check
                                                type="checkbox"
                                                label="Approuvé en tant qu'Administrateur"
                                                name="admin"
                                                checked={formData.admin}
                                                onChange={(e) => setFormData((prevData) => ({ ...prevData, admin: e.target.checked }))}
                                            />
                                        </Form.Group>

                                        <Button type="submit" variant="primary">Update l'utilisateur</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                <div className="row mb-4">

                </div>
            </div>

            <div className="container mb-4 card">
                <h2 className="pb-2 border-bottom">Gestion des notifications :</h2>

                <div className="row mb-4 mt-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Crée une nouvelle notification</h5>
                            </div>
                            <div className="card-body">
                                <a href="/manage-sheep" className="btn btn-success">Crée un nouvel utilisateur</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm">
                        <p>Tronche de la notification ici</p>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Notifications en cache</h5>
                            </div>
                            <div className="card-body">
                                <DataTableToast toastData={toastData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mb-4 card">
                <h2 className="pb-2 border-bottom">Gestion des sheeps :</h2>

                <div className="row mb-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">DATA TABLE SHEEP MANAGEMENT</h5>
                            </div>
                            <div className="card-body">
                                <DataTableFlock sheepData={sheepData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Supprimer un SHEEP</h5>
                            </div>
                            <div className="card-body">
                                <p>Vous pouvez supprimer un utilisateur. Soyez prudent concernant la suppression d'utilisateur. Il n'y a malheureusement pas possibilité de revenir en arrière. Une fois supprimé, l'utilisateur ne retrouvera plus son compte.</p>
                                <a href="/manage-sheep" className="btn btn-warning">Supprimer le sheep : <span className="">x</span></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Update du SHEEP X</h5>
                            </div>
                            <div className="card-body">
                                <p>Accédez à la liste des "sheep" et choisissez de les modifier ou non. Utilisez cette section pour gérer les cas particuliers nécessitant une attention administrative.</p>
                                <a href="/manage-sheep" className="btn btn-primary">Update le sheep : <span className="">x</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Visualiser infos du sheep x</h5>
                            </div>
                            <div className="card-body">
                                <p>Accédez à la liste des "sheep" et choisissez de les modifier ou non. Utilisez cette section pour gérer les cas particuliers nécessitant une attention administrative.</p>
                                <a href="/manage-sheep" className="btn btn-info">Visualiser le sheep [=- sous format nerd + redirection vers features du sheep]: <span className="">x</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Administration