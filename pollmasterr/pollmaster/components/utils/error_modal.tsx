import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface IErrorModalProps {
    message: string;
    onHide(): void;
    show: boolean; 
}

export default function ErrorModal({ message, onHide, show }: IErrorModalProps) {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Ooops aconteceu um erro!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Mensagem de erro</h4>
            <p>
            {message}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}
