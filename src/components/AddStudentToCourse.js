import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddStudentToCourse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [values, setValues] = useState({
        studentId: '',
        courseId: ''
    });
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    const setAddStudentToCourseEndpoint = '/add-student-to-course';

    useEffect(() => {
        const authToken = authState.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        createAPIEndpoint(ENDPOINTS.students, config)
            .fetch()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                setError('Öğrenci listesi alınırken bir hata oluştu.');
            });

        createAPIEndpoint(ENDPOINTS.courses, config)
            .fetch()
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                setError('Kurs listesi alınırken bir hata oluştu.');
            });
    }, [authState.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const authToken = authState.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        createAPIEndpoint(ENDPOINTS.studentcourses+setAddStudentToCourseEndpoint, config)
            .post(values)
            .then((response) => {
                console.log('Öğrenci kursa eklendi:', response.data);
                navigate('/ana-sayfa');
            })
            .catch((error) => {
                console.error('Öğrenci kursa eklenirken bir hata oluştu:', error);
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Kursa Öğrenci Ekle
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel id="course-label">Kurs</InputLabel>
                            <Select
                                labelId="course-label"
                                id="courseId"
                                label="Kurs"
                                name="courseId"
                                value={values.courseId}
                                onChange={handleInputChange}
                            >
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.courseName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel id="student-label">Öğrenci</InputLabel>
                            <Select
                                labelId="student-label"
                                id="studentId"
                                label="Öğrenci"
                                name="studentId"
                                value={values.studentId}
                                onChange={handleInputChange}
                            >
                                {students.map((student) => (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.firstName} {student.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Ekle
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddStudentToCourse;
