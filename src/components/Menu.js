import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Menu = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('Role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
      };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Menü Başlığı</Typography>
                <Box sx={{ marginLeft: 'auto' }}>
                    <nav>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                            {userRole === 'Admin' && (
                                <>
                                    <li style={{ margin: '0.5rem' }}>
                                        <Button variant="contained" component={Link} to="/kullanici-ekle">
                                            Kullanıcı Ekle
                                        </Button>
                                    </li>
                                    <li style={{ margin: '0.5rem' }}>
                                        <Button variant="contained" component={Link} to="/kurs-ekle">
                                            Kurs Ekle
                                        </Button>
                                    </li>
                                    <li style={{ margin: '0.5rem' }}>
                                        <Button variant="contained" component={Link} to="/kursa-ogrenci-ekle">
                                            Kursa Öğrenci Ekle
                                        </Button>
                                    </li>
                                </>
                            )}
                            {userRole === 'Teacher' && (
                                <li style={{ margin: '0.5rem' }}>
                                    <Button variant="contained" component={Link} to="/kurslarim-ogretmen">
                                        Kurslarım - Öğretmen
                                    </Button>
                                </li>
                            )}
                            {userRole === 'Student' && (
                                <li style={{ margin: '0.5rem' }}>
                                    <Button variant="contained" component={Link} to="/kurslarim-ogrenci">
                                        Kurslarım - Öğrenci
                                    </Button>
                                </li>
                            )}
                            <li style={{ margin: '0.5rem' }}>
                                <Button variant="contained" onClick={handleLogout}>
                                    Çıkış
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;