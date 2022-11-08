import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import APIcall from "../components/APIcall";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Dashboard() {
  return (
    <div className="container">
      <div>dsds</div>

      <APIcall />
    </div>
  );
}

export default Dashboard;
