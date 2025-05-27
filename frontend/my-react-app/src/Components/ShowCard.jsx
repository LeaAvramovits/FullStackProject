import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const ShowCard = ({customer}) => {

    return(
    
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  // image={product.images[0] }
                  title={customer.firstName}
                />
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography> */}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {/* {product.description}  */}
                 <h2>age:</h2> 
                  {customer.age}
                  </Typography>
                </CardContent>
                <button type="submit">Add to cart</button>
              </Card>
            );
          
        }
export default ShowCard;
