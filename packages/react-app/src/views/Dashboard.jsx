import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import APIcall from "../components/APIcall";
import { Button } from "antd";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/

function Dashboard() {
  const CLIENT_ID = "34c24373d1af48428d219f760ee07384";
  const REDIRECT_URI = "http://localhost:3000/dashboard/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.localStorage.clear();
  };

  if (token !== "") {
    return (
      <div className="container3">
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify
        </a>
      </div>
    );
  }
}

export default Dashboard;
