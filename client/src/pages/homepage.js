import React from "react";
import { Route } from "react-router-dom";
import SideBar from "./SideBar";
import Login from "./Login";
import Register from "./Register";
import { Stack,Box } from "@mui/material";

function Homepage(){
    return(
        <div>
            <Stack sx={{ flexDirection: "row" }}>
                <SideBar/>
            <Box
            pd={2}
            sx={{
              flexDirection: "row",
              overflowY: "auto",
              height: "100vh",
              flex: 2,
              padding: "20px",
              backgroundColor: "black",
              flex: "100%"
            }}>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
            </Box>
            </Stack>
        </div>
    )
}
export default Homepage;