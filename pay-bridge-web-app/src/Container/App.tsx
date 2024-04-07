import React, { useEffect } from "react";
import { Footer, Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../Pages";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../Interfaces";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token)
      {
        const {id, userName, email, role} : userModel = jwtDecode(token);
        dispatch(setLoggedInUser({id, userName, email, role}))
      }
  }, [])

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
