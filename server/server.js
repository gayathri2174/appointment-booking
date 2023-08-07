const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");
const Appointment = require("./models/appointmentModel");


app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;



/*app.post("/changestatus", async(req,res)=>{
  try{
    const id=req.body.id;
    const status= req.body.status;
    const doctor = await Appointment.findByIdAndUpdate(id, {
      status:status,
    });
  }
  catch(error){
    console.log(error);
  }
  
});*/

// Update status and payment method
app.post("/changestatus", async (req, res) => {
  try {
    const { id, status, method } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {
        status: status,
        method: method,
      },
      { new: true } 
    );
    res.status(200).send({
      message: "Status and payment method updated successfully",
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating status and payment method",
      success: false,
      error,
    });
  }
});



app.delete("/delete/:id",async (req, res) => {
  const id=req.params.id;
  await Appointment.findByIdAndRemove(id).exec();
  res.send("itemdeleted");
});

app.post("/get-amount",async(req,res)=>{
  try{
     
     const result=await Appointment.aggregate([
      {
        $match: {
          status: "approved",
        },
      },
      {
        $group:{
          _id:{
            year:{$year:"$date"},
            month:{$month:"$date"}
          },
          total_appointments:{$sum:1},
          total_cost_month:{$sum:"$pay"},
          itemsSold: { 
            $push:  { 
              fname: "$fname", 
              lname:"$lname",
              total: "$pay" 
            } }
          
        }
      }
     ])
     res.status(200).send({
      message: "Calculated sucessfully",
      success: true,
      data:result,
    });
    
     

  }catch(error){
    console.log(error);

  }
})

app.post("/customer-amount", async (req, res) => {
  try {
    const result = req.body.customer;
    const totalAmountByCustomer = {};

    result.forEach(customer => {
      const { fname, lname, total } = customer;
      const fullName = `${fname} ${lname}`; 

      if (!totalAmountByCustomer[fullName]) {
        totalAmountByCustomer[fullName] = {
          totalamount: 0,
          count: 0,
        };
      }
      totalAmountByCustomer[fullName].totalamount += total;
      totalAmountByCustomer[fullName].count += 1;
    });

    const modifiedResult = Object.keys(totalAmountByCustomer).map(fullName => ({
      name: fullName,
      totalamount: totalAmountByCustomer[fullName].totalamount,
      count: totalAmountByCustomer[fullName].count,
    }));

    res.status(200).send({
      message: "Calculated successfully",
      success: true,
      data: modifiedResult,
    });

  } catch (error) {
    console.log(error);
  }
});

app.post("/status",async(req,res)=>{
  try{
     const count= await Appointment.count();
     const pendingcount = await Appointment.countDocuments({ status: "pending" });
     const sum = await Appointment.aggregate([
      {
        $match: {
          status: "approved",
        },
      },
      {
        $group: {
          _id: null,
          totalApprovedPayAmount: { $sum: "$pay" },
        },
      },
    ]);
    const totalApprovedPayAmount = sum.length > 0 ? sum[0].totalApprovedPayAmount : 0;
     const response={count:count,pending:pendingcount,sum:totalApprovedPayAmount};
     res.status(200).send({
      message: "Calculated successfully",
      success: true,
      data: response,
    });

  }catch(error){
    console.log(error);
  }

})

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));


