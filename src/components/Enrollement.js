import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Enrollment = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [employeeId, setEmployeeId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
        const enrollmentData = {
            employeeId: employeeId,    // This matches the DTO field name
            courseId: courseId,        // This matches the DTO field name
            enrollmentDate: new Date().toISOString().split('T')[0], // Date in YYYY-MM-DD format
            status: 'Ongoing'          // Status is directly set
          };

      const response = await axios.post('http://localhost:8080/api/enrollments', enrollmentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess('Enrollment successful!');
        setError('');
      } else {
        setError('Enrollment failed: Unexpected server response');
        setSuccess('');
      }
    } catch (err) {
      console.error('Error during enrollment:', err);
      // Check if err.response exists for a more specific error message
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Failed to enroll in the course: ${errorMessage}`);
      setSuccess('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Enroll in Course</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleEnroll}>
        <Form.Group controlId="formEmployeeId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            value="Ongoing"
            readOnly
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Enroll
        </Button>
      </Form>
    </Container>
  );
};

export default Enrollment;
