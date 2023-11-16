import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Menu = () => {
  return (
    <Box sx={{ background: '#f5f5f5', padding: 2 }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.5rem 0' }}>
            <Button variant="contained" component={Link} to="/kullanici-ekle">
              Kullanıcı Ekle
            </Button>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Button variant="contained" component={Link} to="/kurs-ekle">
              Kurs Ekle
            </Button>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Button variant="contained" component={Link} to="/kursa-ogrenci-ekle">
              Kursa Öğrenci Ekle
            </Button>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Button variant="contained" component={Link} to="/kursa-not-ekle">
              Kursa Not Ekle
            </Button>
          </li>
        </ul>
      </nav>
    </Box>
  );
};

export default Menu;