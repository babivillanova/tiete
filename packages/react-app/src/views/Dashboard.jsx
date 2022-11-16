import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import APIcall from "../components/APIcall";
import { Button } from "antd";
import axios from "axios";

// /**
//  * web3 props can be passed from '../App.jsx' into your local view component for use
//  * @param {*} yourLocalBalance balance on current network
//  * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
//  * @returns react component
//  **/

function Dashboard() {
  const [token, setToken] = useState("");
  // const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  // const [images, setImages] = useState([]);

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
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.localStorage.clear();
    setArtists([]);
  };

  // const searchArtists = async e => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });
  //   setArtists(data.artists.items);
  // };

  // const renderArtists = () => {
  //   return artists.map(artist => (
  //     <div key={artist.id}>
  //       {artist.track.artists[0].name}
  //     </div>
  //   ));
  // };

  const recentlyPlayed = async e => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    });
    setTimeout(() => {
      setArtists(data.items);
      console.log(data.items);
    }, 1000);
  };

  const renderUniqueArtists = () => {
    const uniqueArtists = artists.reduce((acc, artist) => {
      if (!acc[artist.track.artists[0].name]) {
        acc[artist.track.artists[0].name] = artist;
      }
      return acc;
    }, {});
    return Object.values(uniqueArtists).map(artist => (
      <div className="card" key={artist.id}>
        <div className="id">#{artists.indexOf(artist) + 1}</div>
        <div>
          <img src={artist.track.album.images[0].url} alt="album cover" className="cover" />
          <div className="artistName">
            {artist.track.artists[0].name} <br />
            <br /> Donate and Claim your NFT
          </div>
          {/* 
                <div className='mint'>You unlocked</div>
                <div className='mint'>Mint NFT</div> */}
        </div>
      </div>
    ));
  };

  // const topArtists = async e => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       limit: 50,
  //       time_range: "short_term",
  //     },
  //   });
  //   setTimeout(() => {
  //     setArtists(data.items);
  //   }, 1000);
  // };

  return (
    <div>
      <div className="ribbon">
        <div className="ribbon-title">Let's empower the small artists and connect with them </div>
        Login into your stream account to verify your listening history.
        <br />
        Every month unlock a new NFT by listening and donating to your favorite artists.
      </div>
      <div className="container2">
        {!token && (
          <div style={{ display: "flex", justifyContent: "right", flexDirection: "row" }}>
            <Button type="default" style={{ width: "100vw" }}>
              <a href="https://accounts.spotify.com/authorize?client_id=34c24373d1af48428d219f760ee07384&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20user-top-read%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/dashboard/">
                Login to Spotify
              </a>
            </Button>
          </div>
        )}
        {token && (
          <div style={{ display: "flex", justifyContent: "right", flexDirection: "row" }}>
            <Button type="default" onClick={recentlyPlayed} style={{ width: "83.33333vw" }}>
              Get your Top Artists
            </Button>
            <Button type="default" onClick={logout} style={{ width: "16.66667vw" }}>
              Logout
            </Button>

            {/* <form onSubmit={searchArtists}>
            <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form> */}
          </div>
        )}
        <div className="cards">{renderUniqueArtists()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
