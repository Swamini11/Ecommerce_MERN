import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import Layout from '../../components/Layouts/Layout'

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner path=""/>;
  }