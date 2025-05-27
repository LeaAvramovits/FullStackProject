import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0, width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={styles.link}
          >
            Home Page
          </Button>
          <Button
            component={Link}
            to="/branches"
            color="inherit"
            sx={styles.link}
          >
            Branches
          </Button>
          <Button
            component={Link}
            to="/contact"
            color="inherit"
            sx={styles.link}
          >
            Log in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  link: {
    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  },
};

export default NavBar;