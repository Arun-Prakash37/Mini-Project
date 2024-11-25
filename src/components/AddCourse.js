import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseDescription: '',
    duration: '',
    category: '',
    createdBy: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/courses', {
        ...courseData
      });
      setSuccess('Course added successfully!');
      setError('');
      setCourseData({ courseName: '', courseDescription: '', duration: '', category: '', createdBy: '' });
    } catch (err) {
      setError('An error occurred while adding the course.');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add New Course</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCourseDescription" className="mt-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            as="textarea"
            name="courseDescription"
            value={courseData.courseDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDuration" className="mt-3">
          <Form.Label>Duration (in hours)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCreatedBy" className="mt-3">
          <Form.Label>Instructor</Form.Label>
          <Form.Control
            type="text"
            name="createdBy"
            value={courseData.createdBy}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Add Course
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourse;
