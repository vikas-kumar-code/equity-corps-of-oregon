import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
export default function Documents() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <Row>
            <Col md={12} className='d-flex justify-content-center'>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </Col>
        </Row>
    )
}
