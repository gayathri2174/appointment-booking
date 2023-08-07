import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Customer from "../components/Customer"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "../trainer.css";
import { Box } from "@mui/material";

function DetailRevenue(){
    const location = useLocation();
  const monthlyData = location.state?.monthlyData || {};
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    const customeramount = async () => {
    try {
        const response = await axios.post("/customer-amount", {
          customer: monthlyData.Customer,
        });
  
        if (response.data.success) {
          // Add unique 'id' property to each row
          const revenueWithIds = response.data.data.map((row, index) => ({
            ...row,
            id: index + 1, // You can use any unique identifier here
          }));
  
          setRevenue(revenueWithIds);
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
   };
   useEffect(() => { 
    customeramount();
  }, []); 

  console.log(revenue)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 180 },
    {
      field: 'count',
      headerName: 'Booking',
      type: 'number',
      width: 200,
    },
    {
      field: 'totalamount',
      headerName: 'Amount  ₹',
      type: 'number',
      width: 290,
    },

   
  ];
  
  
    return(
        <Layout>
            <div className="revenue-main">
            <Box display="flex" alignItems="center" marginBottom="20px">
      <CalendarTodayIcon  style={{ color: "black",fontSize:"40px" }} />
      <h1 style={{ marginBottom: "-5px", marginLeft: "10px" }}>
        {monthlyData.month} {monthlyData.year}
      </h1>
    </Box>
                <DataGrid rows={revenue} columns={columns} getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}/>
            </div>
        </Layout>
    )

}

export default DetailRevenue;