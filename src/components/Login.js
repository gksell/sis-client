import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Center from './Center';
import useForm from '../hooks/useForm';
import { ENDPOINTS, createAPIEndpoint,setRouteWithRole } from '../api';
import store from '../store/store';
import { setToken, setUser } from '../reducers/authReducer'; 

const getFreshModel = () => ({
    password: '',
    email: '',
})



export default function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = (e) => {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.auth +'/login')
                .post(values)
                .then(res => {
                    store.dispatch(setToken(res.data.token)); 
                    localStorage.setItem("Role",res.data.roleName); 
                    localStorage.setItem("Token",res.data.token); 
                    setRouteWithRole(res.data.roleName);
                    store.dispatch(setUser(res.data.userId)); 
                    navigate('/ana-sayfa');
                })
                .catch(err => {
          setError(err.response.data.message); 
          setTimeout(() => {
            setError(null);
          }, 3000);
        })
        }
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email) ? "" : "E-mail is not valid"
        temp.password = values.password !== "" ? "" : "This field is required"
        setErrors(temp)
        return Object.values(temp).every(x => x === "")
    }

    const setRouteRoles = () => {
        let temp = {}
        temp.email = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email) ? "" : "E-mail is not valid"
        temp.password = values.password !== "" ? "" : "This field is required"
        setErrors(temp)
        return Object.values(temp).every(x => x === "")
    }

    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant='h3' sx={{ my: 3 }}> SIS </Typography>
                    {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete='off' onSubmit={login}>
                            <TextField
                                label="Email"
                                name='email'
                                value={values.email}
                                onChange={handleInputChange}
                                variant='outlined'
                                sx={{ margin: 1 }}
                                {...(errors.email && { error: true, helperText: errors.email })}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                sx={{ margin: 1 }}
                                {...(errors.password && { error: true, helperText: errors.password })}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{ width: '90%' }}
                            > Login
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}
