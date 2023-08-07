import React from "react"; 
import Grid from "@mui/material/Grid";



function Customer({customer}){
    console.log(customer.name);
    return( 
        <Grid container spacing={1} sx={{marginBottom:"10px"}}>
            <Grid item md={4} xs={12}>
            <h4>Name : {customer.name}</h4>
            </Grid>
            <Grid item md={4} xs={12}>
            <h4>Booking : {customer.totalamount}</h4>
            </Grid>
            <Grid item md={4} xs={12}>
            <h4>Total Amount : {customer.totalamount}</h4>
            </Grid>
        </Grid>

    )
}

export default Customer;