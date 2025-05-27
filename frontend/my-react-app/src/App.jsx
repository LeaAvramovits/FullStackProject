import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Error from './components/Error';
import About from './components/About';
import Cart from './components/Cart';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
const App = () => {
  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const cart = useSelector(state => state.customers);
// const totalCart=cart.length;
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" >Products  </NavLink>
        <NavLink to="/about" >About  </NavLink>
        <NavLink to="/cart" >
         <IconButton>
           <ShoppingCartIcon fontSize="small" width="35px" height="35px" />
           <CartBadge badgeContent={3} color="primary" overlap="circular" />
         </IconButton> 
       </NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/error' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

