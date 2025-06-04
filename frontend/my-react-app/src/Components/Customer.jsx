import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsyncAction } from "../redux/thunk";
import { useEffect } from "react";

const Customer=()=>{
    const dispatch=useDispatch()
    const customers=useSelector(state=>state.customer.customerList)
    useEffect(() => {
        dispatch(fetchDataAsyncAction())
    }, [])
    return(
        <div>
            {/* <h1>customers</h1>
            {customers.length > 0 &&
                    customers.map((customer) => (
                       <h1 key={customer.id}>{customer.id}</h1>
                    ))} */}
        </div>
    )
}
export default Customer;