import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Table,Button } from "antd";
import moment from "moment";
import "../trainer.css"; 
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Modal, Form, Input } from "antd";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");


  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers:  {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  
  const deleteuser=(id)=>{
    try{
      if(window.confirm("Are you sure you want to delete?")){
        dispatch(showLoading());
    axios.delete(`/delete/${id}`).then(getAppointmentsData());
    dispatch(hideLoading());
    getAppointmentsData();
      }
      
    }
    catch(error){
      dispatch(hideLoading());
    }
  }

 
  const openPaymentDialog = (record) => {
    setSelectedAppointment(record);
    setDialogVisible(true);
  };

  const handlePaymentSubmit = async (record) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/changestatus",
        {
          id: record._id,
          status: "approved",
          method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDialogVisible(false);
        getAppointmentsData();
        setPaymentMethod(""); 
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  
  const columns = [
    {
      title: "Name",
      dataIndex: "_id",
      render:(text,record)=>(
        <span>
          {record.fname} {record.lname}
        </span>
      )
      
    },  
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    
    {
      title:"Amount",
      dataIndex:"pay",
    },
    {
      title:"Payment method",
      dataIndex:"method",
    },
    
    {
      title:"Payment",
      dataIndex:"status",
      render:(text,record)=>(
        <div>
          {record.status === "pending" && (
            <div>
              <Button
                type="primary"
                onClick={() => openPaymentDialog(record)}
                className="buttonapp"
              >
                Pending
              </Button>
              <Modal
                title="Enter Payment Method"
                visible={dialogVisible && selectedAppointment === record}
                onCancel={() => setDialogVisible(false)}
                onOk={() => handlePaymentSubmit(record)}
              >
                <Form>
                  <Form.Item label="Payment Method">
                    <Input
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          )}
          {record.status === "approved" && (
            <Button type="primary" className="buttonapp">
              Approved
            </Button>
          )}
        </div>
      )
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (text, record) => (
        <Button type="primary" onClick={() => deleteuser(text)} className="buttonapp">
          Delete
        </Button>
      ),
    }
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
   
  <Layout>
    <div className="appointment-table">
      <BeenhereIcon fontSize="large" sx={{color:"#222"}}/>
      <h1>Appointments</h1>
    <Table columns={columns} dataSource={appointments}>
    </Table>
    </div>
    
  </Layout>
  
   ) 
}

export default Appointments;
