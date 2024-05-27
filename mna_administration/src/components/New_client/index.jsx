import React, { useState } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';

function FormComponent() {
    const [form, setForm] = useState({
        programmeName: '',
        programme: null,
        checked: [],
        radio: ''
    });

    const [show, setShow] = useState(true);

    const checkboxes = [
        { label: 'Option 1', description: 'First checkbox' },
        { label: 'Option 2', description: 'Second checkbox' },
        { label: 'Option 3', description: 'Third checkbox' },
        { label: 'Option 4', description: 'Fourth checkbox' },
        { label: 'Option 5', description: 'Fifth checkbox' }
    ];
    const radios = [
        { label: 'Option 1', description: 'First radio' },
        { label: 'Option 2', description: 'Second radio' },
        { label: 'Option 3', description: 'Third radio' }
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(form));
    };

    const handleReset = (event) => {
        event.preventDefault();
        setForm({
            programmeName: '',
            programme: null,
            checked: [],
            radio: ''
        });
        setShow(false);
        setTimeout(() => setShow(true), 0);
    };

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === 'checkbox') {
            if (checked) {
                setForm((prevForm) => ({
                    ...prevForm,
                    checked: [...prevForm.checked, value]
                }));
            } else {
                setForm((prevForm) => ({
                    ...prevForm,
                    checked: prevForm.checked.filter((item) => item !== value)
                }));
            }
        } else if (type === 'radio') {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value
            }));
        } else if (type === 'file') {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: files[0]
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    return (
        <>

            <Helmet>
                <title>Nouveau client - MNA0D</title>
            </Helmet>

            <div>
                {show && (
                    <Form onSubmit={handleSubmit} onReset={handleReset}>
                        <FormGroup controlId="input-1">
                            <FormLabel>Nom du programme:</FormLabel>
                            <FormControl
                                type="text"
                                name="programmeName"
                                value={form.programmeName}
                                onChange={handleChange}
                                placeholder="Entrez le nom du programme"
                                required
                            />
                        </FormGroup>

                        <Form.Text className="text-muted">
                            Le nom du programme doit être unique, il sera utilisé pour générer le client.
                        </Form.Text>

                        <FormGroup controlId="input-4">
                            <FormLabel>Programme:</FormLabel>
                            <FormControl
                                type="file"
                                name="programme"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center">
                            <FormGroup controlId="checkboxes">
                                <FormLabel>Checkboxes:</FormLabel>
                                <div className="list-group">
                                    {checkboxes.map((checkbox, index) => (
                                        <label key={index} className="list-group-item d-flex gap-2">
                                            <input
                                                className="form-check-input flex-shrink-0"
                                                type="checkbox"
                                                name="checked"
                                                value={checkbox.label}
                                                checked={form.checked.includes(checkbox.label)}
                                                onChange={handleChange}
                                            />
                                            <span>
                                                {checkbox.label}
                                                <small className="d-block text-body-secondary">{checkbox.description}</small>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FormGroup>

                            <FormGroup controlId="radios">
                                <FormLabel>Radios:</FormLabel>
                                <div className="list-group">
                                    {radios.map((radio, index) => (
                                        <label key={index} className="list-group-item d-flex gap-2">
                                            <input
                                                className="form-check-input flex-shrink-0"
                                                type="radio"
                                                name="radio"
                                                value={radio.label}
                                                checked={form.radio === radio.label}
                                                onChange={handleChange}
                                            />
                                            <span>
                                                {radio.label}
                                                <small className="d-block text-body-secondary">{radio.description}</small>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FormGroup>
                        </div>
                        <Button type="submit" variant="primary">
                            Générer le client
                        </Button>
                        <Button type="reset" variant="danger" className="ms-2">
                            Annuler
                        </Button>
                    </Form>
                )}
                <Card className="mt-3">
                    <Card.Header>Résultat pour nerds 🤓</Card.Header>
                    <Card.Body>
                        <pre className="m-0">{JSON.stringify(form, null, 2)}</pre>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default FormComponent;
