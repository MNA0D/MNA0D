import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfileModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSave = () => {
        if (password === confirmPassword) {
            // Sauvegarder les données
            console.log('Email:', email);
            console.log('Identifiant:', username);
            console.log('Mot de passe:', password);
            handleClose();
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier mon Profil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrer l'email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Identifiant</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrer l'identifiant"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Entrer le mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {!passwordsMatch && (
                            <Form.Text className="text-danger">
                                Les mots de passe ne correspondent pas.
                            </Form.Text>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Sauvegarder
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
