import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Menu = () => {

    const userRole = localStorage.getItem('Role');

    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Menü Başlığı</Typography>
            <Box sx={{ marginLeft: 'auto' }}> {/* Menü elemanlarını sağa yerleştirmek için auto margin kullanılıyor */}
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
                  <li style={{ margin: '0.5rem' }}>
                    <Button variant="contained" component={Link} to="/kursa-not-ekle">
                      Kursa Not Ekle
                    </Button>
                  </li>
                  {userRole === 'Öğretmen' && (
                    <li style={{ margin: '0.5rem' }}>
                      <Button variant="contained" component={Link} to="/kurslarim-ogretmen">
                        Kurslarım - Öğretmen
                      </Button>
                    </li>
                  )}
                </ul>
              </nav>
            </Box>
          </Toolbar>
        </AppBar>
      );
    };

export default Menu;