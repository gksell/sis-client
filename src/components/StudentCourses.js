import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useSelector } from 'react-redux';

const StudentCourses = () => {
  const authState = useSelector(state => state.auth);
  const [studentCourses, setStudentCourses] = useState([]);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState(null);

  const authToken = authState.token;
  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  };

  useEffect(() => {
    const userId = authState.user;

    createAPIEndpoint(ENDPOINTS.students + '/by-user-id' + `/${userId}`)
      .fetch()
      .then((response) => {
        const student = response.data;
        if (student && student.id) {
          setStudentId(student.id);
          console.log(student);
        }
      })
      .catch((error) => {
        setError('Öğrenci bilgisi alınırken bir hata oluştu.');
      });
  }, [authState.token, authState.user]);

  useEffect(() => {
    if (studentId) {

        const notesEndpoint = `${ENDPOINTS.notes}/get-notes-by-student/${studentId}`;
        console.log(config);
        console.log(notesEndpoint);

      createAPIEndpoint(notesEndpoint, config)
        .fetch()
        .then((response) => {
          setStudentCourses(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Kurs ve not listesi alınırken bir hata oluştu:', error);
          setError('Kurs ve not listesialınırken bir hata oluştu.');
        });
    }
  }, [studentId]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '50%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Aldığım Kurslar
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <List>
            {studentCourses.map((course, index) => (
              <ListItem key={course.id}>
                <ListItemText
                  primary={`${index + 1}. ${course.courseName} - Öğretmen: ${course.teacherName} - Not: ${course.grade}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentCourses;
