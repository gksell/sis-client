import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

const CourseCreate = () => {
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);
    const [values, setValues] = useState({
        courseName: '',
        teacherId: ''
    });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const authToken = authState.token;
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        createAPIEndpoint(ENDPOINTS.teachers, config)
            .fetch()
            .then((response) => {
                setTeachers(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error('Öğretmenleri alma sırasında bir hata oluştu:', error);
            });
    }, [authState.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const authToken = authState.token;
        console.log(`Bearer ${authToken}`);
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        createAPIEndpoint(ENDPOINTS.courses, config)
            .post(values)
            .then((response) => {
                console.log('Kurs ekleme başarılı:', response.data);
                navigate('/ana-sayfa');
            })
            .catch((error) => {
                console.log(values);
                console.error('Kurs ekleme sırasında bir hata oluştu:', error);
            });
    };

    return (
        <div>
            <Menu />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Kurs Ekle
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Kurs Adı"
                                name="courseName"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={values.courseName}
                                onChange={handleChange}
                            />
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <InputLabel id="teacher-label">Eğitmen</InputLabel>
                                <Select
                                    labelId="teacher-label"
                                    id="teacherId" // Değişiklik: id -> teacherId olarak güncellendi
                                    label="Eğitmen"
                                    name="teacherId" // Değişiklik: teacher -> teacherId olarak güncellendi
                                    value={values.teacherId}
                                    onChange={handleChange}
                                >
                                    {teachers.map((teacher) => (
                                        <MenuItem key={teacher.id} value={teacher.id}>
                                            {teacher.firstName} {teacher.lastName}
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
        </div>
    );
};

export default CourseCreate;
