import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { auth } = useAuth();
    const token = auth.token;
    const [error, setError] = React.useState("")
    const errorRef = useRef()
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await EmployeeService.findAllEmployees(token);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You are not permitted to view employee page")
                }
                else {
                    setError("No Server Response")
                }
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeID) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await EmployeeService.deleteEmployeeById(employeeID, token);
                setEmployees(employees.filter(employee => employee.employeeID !== employeeID));
                alert("Employee deleted successfully.");
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Error deleting employee: " + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedEmployee(null);
    };

    const handleUpdate = async () => {
        try {
            const updatedEmployee = {
                ...selectedEmployee,
                user: {
                    ...selectedEmployee.user
                }
            };
            await EmployeeService.updateEmployeeById(selectedEmployee.employeeID, updatedEmployee, token);
            setEmployees(employees.map(emp => emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp));
            setShowEditModal(false);
            alert("Employee updated successfully.");
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Error updating employee: " + (error.response?.data?.message || error.message));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("user.")) {
            setSelectedEmployee({
                ...selectedEmployee,
                user: {
                    ...selectedEmployee.user,
                    [name.split(".")[1]]: value
                }
            });
        } else {
            setSelectedEmployee({
                ...selectedEmployee,
                [name]: value
            });
        }
    };

    return (
        <div className="d-flex">
        <Sidenav />
        <div className="content-container d-flex flex-column align-items-center w-100">
            <div>
                <h3 className="text-center">Employee List</h3>
                <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}
                    aria-live='assertive'>{error}
                </p>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Contact Number</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No employees available.</td>
                            </tr>
                        ) : (
                            employees.map(employee => (
                                <tr key={employee.employeeID}>
                                    <td>{employee.employeeID}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.contactNumber}</td>
                                    <td>{employee.user?.username}</td>
                                    <td>{employee.user?.email}</td>
                                    <td>
                                        <Button
                                            onClick={() => handleEdit(employee)}
                                            variant="primary"
                                            size="sm"
                                            className="mr-2">
                                            Edit
                                        </Button> &nbsp; &nbsp;
                                        <Button
                                            onClick={() => handleDelete(employee.employeeID)}
                                            variant="danger"
                                            size="sm">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEmployee && (
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={selectedEmployee.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={selectedEmployee.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contactNumber"
                                    value={selectedEmployee.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user.username"
                                    value={selectedEmployee.user?.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="user.email"
                                    value={selectedEmployee.user?.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default EmployeeManagement;
