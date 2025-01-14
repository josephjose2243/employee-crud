import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table as BootstrapTable, Button } from 'react-bootstrap';
import Modal from './Modaladd';

const Updatetable = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ name: '', email: '' });

    useEffect(() => {
        axios.get('http://localhost:3001/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleShow = (employee = { name: '', email: '' }, edit = false) => {
        setCurrentEmployee(employee);
        setIsEdit(edit);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (field, value) => {
        setCurrentEmployee({ ...currentEmployee, [field]: value });
    };

    const handleSubmit = () => {
        if (isEdit) {
            axios.put(`http://localhost:3001/employees/${currentEmployee.id}`, currentEmployee)
                .then(response => {
                    setEmployees(employees.map(emp =>
                        emp.id === currentEmployee.id ? response.data : emp
                    ));
                    handleClose();
                })
                .catch(error => console.error('Error updating employee:', error));
        } else {
            axios.post('http://localhost:3001/employees', currentEmployee)
                .then(response => {
                    setEmployees([...employees, response.data]);
                    handleClose();
                })
                .catch(error => console.error('Error adding employee:', error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
            .catch(error => console.error('Error deleting employee:', error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Details</h2>
            <Button variant="primary" className="mb-3" onClick={() => handleShow()}>Add Employee</Button>
            <BootstrapTable striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => handleShow(employee, true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </BootstrapTable>
            <Modal
                show={showModal}
                handleClose={handleClose}
                employee={currentEmployee}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit}
            />
        </div>
    );
};

export default Updatetable;
