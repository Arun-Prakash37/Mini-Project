import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch all courses when the component mounts
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Error fetching courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete a course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      setSuccess('Course deleted successfully!');
      setCourses(courses.filter(course => course.courseId !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('An error occurred while deleting the course.');
    }
  };

  // Navigate to Enrollment page with courseId
  const handleEnroll = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  return (
    <Container className="mt-5">
      <h2>Available Courses</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {courses.length > 0 ? (
          courses.map(course => (
            <Col md={4} key={course.courseId} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{course.courseName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{course.category}</Card.Subtitle>
                  <Card.Text>{course.courseDescription}</Card.Text>
                  <Card.Text><strong>Duration:</strong> {course.duration} hours</Card.Text>
                  <Card.Text><strong>Instructor:</strong> {course.createdBy}</Card.Text>
                  <Button variant="danger" onClick={() => deleteCourse(course.courseId)}>Delete</Button>
                  <Button variant="primary" onClick={() => handleEnroll(course.courseId)} className="ms-2">
                    Enroll
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </Row>
    </Container>
  );
};

export default CoursePage;
