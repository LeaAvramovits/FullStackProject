import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
 
    return(
        <div>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      
      <h2>cart</h2>
      </div>
    )
};

export default Cart;