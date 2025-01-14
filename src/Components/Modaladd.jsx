import React from 'react';
import { Modal as BootstrapModal, Form, Button } from 'react-bootstrap';

const Modaladd = ({ show, handleClose, handleSubmit, handleChange, employee, isEdit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("form")
    handleSubmit();
  };

  return (
    <BootstrapModal show={show} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{isEdit ? 'Edit Employee' : 'Add Employee'}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="employeeName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={employee?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="employeeEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={employee?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Group>
          <Button style={{
            margin:"0 1rem"
          }} variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit'>
          {isEdit ? 'Update Employee' : 'Add Employee'}
        </Button>
        </Form>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modaladd;
