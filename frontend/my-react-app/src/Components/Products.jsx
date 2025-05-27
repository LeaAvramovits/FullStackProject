import loadingIcon from '../assets/Spinner-1s-200px.gif';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchDataAsyncAction } from "../redux/thunk";
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import ShowCard from './ShowCard';

const Products = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customers = useSelector(state => state.customer.cu);
    // const loading = useSelector(state => state.products.loading)
    // const error = useSelector(state => state.products.error);

    useEffect(() => {
        dispatch(fetchDataAsyncAction())
    }, [])

    useEffect(() => {
        if(error){
            navigate("/error")
        }
        
    }, [error])

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px',
        margin: '2px',
        marginTop:'100px'
    };

    const cardStyle = {
        flex: '1 1 calc(33.333% - 16px)',
        boxSizing: 'border-box',
    };

    return (
        <div>
            {loading && <img src={loadingIcon} alt="Loading" width="250px" height="250px" style={{ marginLeft: "800px" }} />}

            <h2 style={{ marginLeft: "800px" ,marginTop:'25px'}}> Products</h2>
            <div style={containerStyle}>
                {customers.length > 0 &&
                    products.map((product) => (
                        <div key={product.id} style={cardStyle}>
                            <ShowCard product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
}


export default Products;