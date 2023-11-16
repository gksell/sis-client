import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import { useDispatch, useSelector } from 'react-redux'; 
import { setToken } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth); 
    const [values, setValues] = useState({
        email: '',
        password: '',
        roleName: '',
        firstName: '',
        lastName: '',
        birthDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const formattedBirthDate = name === 'birthDate' ? new Date(value).toISOString().split('T')[0] : value;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: formattedBirthDate,
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

        createAPIEndpoint(ENDPOINTS.auth + '/register',config)
            .post(values)
            .then((response) => {
                console.log('Post işlemi başarılı:', response.data);
                navigate('/ana-sayfa');
            })
            .catch((error) => {
                console.error('Post işlemi sırasında bir hata oluştu:', error);
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Kullanıcı Ekle
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel id="role-label">Role Name</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                label="Role Name"
                                name="roleName"
                                defaultValue=""
                                value={values.roleName}
                                onChange={handleChange}
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Öğrenci">Öğrenci</MenuItem>
                                <MenuItem value="Öğretmen">Öğretmen</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="First Name"
                            name="firstName"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={values.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={values.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Birth Date"
                            name="birthDate"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="date"
                            value={values.birthDate}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Ekle
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserCreate;