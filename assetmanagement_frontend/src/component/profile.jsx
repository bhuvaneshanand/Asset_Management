import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Table } from 'react-bootstrap';
import { useAuth } from '../context/useAuth';
import EmployeeService from '../services/EmployeeService';

export const Profile = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const username = auth.username;

  const [employee, setEmployee] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllocations, setShowAllocations] = useState(false);

  useEffect(() => {
    if (username) {
      EmployeeService.findByUsername(username, token)
        .then((response) => {
          console.log("Employee details:", response.data);
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employee details: ", error);
          setError("Failed to load employee details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [username, token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("user.")) {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        user: {
          ...prevEmployee.user,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      await EmployeeService.updateEmployeeById(employee.employeeID, employee, token);
      setIsEditing(false);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleAllocations = () => {
    setShowAllocations(!showAllocations);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <div className="d-flex">
    <div className="content-container d-flex flex-column align-items-center w-100">
      <Card style={{ width: '24rem', margin: 'auto', marginTop: '2rem' }}>
        <Card.Header as="h5">My Profile</Card.Header>
        <Card.Body>
          {isEditing ? (
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={employee.gender}
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
                  value={employee.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="user.email"
                  value={employee.user?.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <>
              <Card.Text><strong>Employee ID:</strong> {employee.employeeID}</Card.Text>
              <Card.Text><strong>Name:</strong> {employee.name}</Card.Text>
              <Card.Text><strong>Gender:</strong> {employee.gender}</Card.Text>
              <Card.Text><strong>Contact Number:</strong> {employee.contactNumber}</Card.Text>
              <Card.Text><strong>Username:</strong> {username}</Card.Text>
              <Card.Text><strong>Email:</strong> {employee.user?.email}</Card.Text>
              <Card.Text><strong>Role:</strong> {employee.user?.role}</Card.Text>
            </>
          )}
          <br />
          <Button variant="primary" onClick={isEditing ? handleSaveChanges : handleEditToggle}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={handleEditToggle} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          )}
          <br /><br />
          <Button variant="info" onClick={handleToggleAllocations}>
            {showAllocations ? "Hide Asset Allocations" : "View Asset Allocations"}
          </Button>
        </Card.Body>
      </Card>
      {showAllocations && (
        <div style={{ marginTop: '2rem', margin: 'auto', width: '80%' }}>
          <h5>Asset Allocations</h5>
          {employee.assetAllocation && employee.assetAllocation.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Allocation ID</th>
                  <th>Status</th>
                  <th>Allocation Date</th>
                  <th>Return Date</th>
                  <th>Employee ID</th>
                </tr>
              </thead>
              <tbody>
                {employee.assetAllocation.map((allocation) => (
                  <tr key={allocation.allocationID}>
                    <td>{allocation.allocationID}</td>
                    <td>{allocation.status}</td>
                    <td>{allocation.allocationDate}</td>
                    <td>{allocation.returnDate}</td>
                    <td>{employee.employeeID}</td> {/* Access employeeID from main employee object */}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No assets allocated.</p>
          )}
        </div>
      )}
      </div>
      </div>
    </>
  );
};
