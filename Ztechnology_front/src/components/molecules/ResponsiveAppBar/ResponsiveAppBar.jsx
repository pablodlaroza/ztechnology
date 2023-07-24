import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ChangePassword from '../../../pages/ChangePassword';

const pages = ['Usuarios', 'Cotizaciones', 'Productos', 'Clientes'];
const settings = [ 'Cambiar Contraseña', 'Cerrar Sesión'];

function ResponsiveAppBar({setLoggedIn}) {
  const { state } = useLocation();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  console.log(user.idRol);

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    
    setLoggedIn(false)
    localStorage.removeItem('loggedIn');


  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#222', }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 1000,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ZT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
            {pages.map((page) => (
              (user.idRol == 1 ) && (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )
            ))}

              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/home"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ZT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                (user.idRol == 1 || page !== 'Usuarios') && (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={page}
                  >
                    {page}
                  </Button>
                )
              ))}
            </Box>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6 style={{ marginRight: 11, marginTop: '3px' }}>{user.username}</h6>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        if (setting === 'Cerrar Sesión') {
                          handleLogOut();
                          navigate('/login', { replace: true });
                        } else if (setting === 'Cambiar Contraseña') {
                          navigate('/change-password');
                          handleCloseUserMenu();
                        } else {
                          handleCloseUserMenu();
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;
