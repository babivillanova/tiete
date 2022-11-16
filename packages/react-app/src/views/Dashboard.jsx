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
  const CLIENT_ID = "a8576b041f0347669b29fab833d46638";
  const CLIENT_SECRET = " ";
  const REDIRECT_URI = "http://localhost:3000/dashboard/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const scopes = [
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "app-remote-control",
    "user-read-email",
    "user-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "user-library-modify",
    "user-library-read",
    "user-top-read",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-follow-read",
    "user-follow-modify",
  ];
  const SCOPE = "";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

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
  };

  const searchArtists = async e => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.name}
        {artist.images.length > 0 && <img src={artist.images[0].url} width={"100px"} alt="artist" />}
      </div>
    ));
  };

  const topArtists = async e => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
        time_range: "short_term",
      },
    });
    setTimeout(() => {
      setArtists(data.items);
    }, 1000);
  };

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

  return (
    <div className="container">
      {!token && (
        <a
          // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
          //href spotify login with scopes
          href="https://accounts.spotify.com/authorize?client_id=34c24373d1af48428d219f760ee07384&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20user-top-read%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/dashboard/"
        >
          Login to Spotify
        </a>
      )}
      {token && (
        <div>
          <Button onClick={logout}>Logout</Button>
          <Button onClick={recentlyPlayed}>Get your Top Artists</Button>
          <form onSubmit={searchArtists}>
            <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      {/* {renderArtists()} */}
    </div>
  );
}

export default Dashboard;
