import React from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Center from './Center';
import useForm from '../hooks/useForm';
import { ENDPOINTS, createAPIEndpoint } from '../api';
import store from '../store/store';
import { setToken } from '../reducers/authReducer';


const getFreshModel = () => ({
    password: '',
    email: '',
})

export default function Login() {
    const navigate = useNavigate();
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = (e) => {
        e.preventDefault();
        console.log(values);
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.auth +'/login')
            .post(values)
            .then(res=> {store.dispatch(setToken(res.data));
             console.log("Redux State:", store.getState());
             navigate('/ana-sayfa');
            })
            .catch(err => console.log(err))
        }
    }

    const validate = () => {
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
                    <Typography variant='h3' sx={{ my: 3 }}> SiS </Typography>
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
