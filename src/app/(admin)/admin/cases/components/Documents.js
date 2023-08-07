import moment from 'moment';
import React, { useState } from 'react'
import { Row, Col, Form, Card, FloatingLabel, Button, Spinner } from 'react-bootstrap';

export default function Documents(props) {
    const [documentName, setDocumentName] = useState('');
    const [document, setDocument] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const allowedExtensions = ['docx', 'doc', 'xl', 'xls', 'jpg', 'jpeg', 'png', 'pdf']
    const [documents, setDocuments] = useState(props.documents)

    const handleChange = async (document) => {
        let errors = {};
        setDocument(document.target.files[0])
        const fileDetails = document.target.value.split(/(\\|\/)/g).pop()
        const fileName = fileDetails.split('.');
        if (allowedExtensions.find((extension) => extension === fileName[1].toLowerCase())) {
            setDocumentName(fileName[0])
            setErrors(errors)
        }
        else {
            errors["document"] = "Please choose allowed extesions only.";
            setErrors(errors)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const data = new FormData();
            data.append('document', document);
            data.append('document_name', documentName);
            const res = await fetch('/api/cases/upload', {
                method: 'POST',
                body: data
            });
            const response = await res.json();
            if (response.success) {
                documents.push(response.file)
                setDocuments(documents);
                props.updateDocuments(documents);
                setDocumentName('');
                setDocument(null);
                window.document.getElementById('document').value = '';
            }
        }

    }
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (documentName === '') {
            formIsValid = false;
            errors["document_name"] = "Please enter document name.";
        }
        if (!document) {
            formIsValid = false;
            errors["document"] = "Please choose document to upload.";
        }
        setErrors(errors);
        return formIsValid;
    };
    const deleteRecord = (index) => {
        if (window.confirm('Are you sure to delete?')) {
            if (documents[index].case_id === undefined) {
                let newDocuments = documents.filter((r, indx) => index !== indx);
                setDocuments(newDocuments)
                props.updateDocuments(newDocuments)
            }
            else {
                let params = { id: documents[index].id }
                events.deleteProgram(params).then((response) => {
                    if (response.data.success) {
                        let records = this.state.records.filter((r) => parseInt(r.id) !== parseInt(this.state.records[index].id))
                        this.setState({ records }, () => {
                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT,
                            })
                        })
                    } else {
                        toast.error(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error('Unexpected error !', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                })
            }
        }
    }
    return (
        <Row>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Upload Document</Card.Title>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Document Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" name="document_name" placeholder='file_name' value={documentName} isInvalid={!!errors.document_name} onChange={(e) => setDocumentName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">{errors.document_name}</Form.Control.Feedback>
                        </FloatingLabel>

                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Control type="file" id="document" size="lg" onChange={handleChange} name="document" isInvalid={!!errors.document} />
                            <Form.Control.Feedback type="invalid">{errors.document}</Form.Control.Feedback>
                            <small className='text-default'>Only docx, doc, xl, xls, jpg, jpeg, png and pdf</small>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className='text-end'>
                        <Button
                            variant="danger"
                            type="button"
                            disabled={submitted}
                            className='me-2'
                            onClick={() => {
                                setDocument(null)
                                setDocumentName('')
                                window.document.getElementById('document').value = ''
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                            disabled={submitted}
                            onClick={handleSubmit}
                        >
                            {submitted && (
                                <Spinner
                                    size="sm"
                                    variant="light"
                                    className="me-1"
                                />
                            )}
                            Submit
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
            <Col md={8}>
                <Card>
                    <Card.Body>
                        <Card.Title>Documents</Card.Title>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Document Name </th>
                                    <th>Uploaded On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((record, index) => <tr key={`documents-key-${index}`}>
                                    <td>{Number(index + 1)}.</td>
                                    <td>{record.document_name}</td>
                                    <td>{moment(new Date(record.uploaded_on)).format('MMMM DD, YYYY')}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => deleteRecord(index)} size='sm'>Delete</Button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
