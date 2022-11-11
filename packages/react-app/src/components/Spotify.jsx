import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function Spotify() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // //set isLoggedIn to false
  // //create a function to set isLoggedIn to true
  // const login = () => {
  //   window.open("https://supporting-fan.vercel.app/login", "_blank");
  //   //get info from window and set isLoggedIn to true
  //   setIsLoggedIn(true);
  //   //get info from
  // };
  // console.log(isLoggedIn);

  return (
    <div style={{ display: "flex" }}>
      {/* <Button
        style={{ marginLeft: 5 }}
        shape="round"
        onClick={() => {
          //access link to https://supporting-fan.vercel.app/login
          //open new window to https://supporting-fan.vercel.app/login
          // change the state of the user to logged in
          login();
          console.log(isLoggedIn);
          // window.location.href = "https://supporting-fan.vercel.app/login";
        }}
      >
        Connect to Spotify
      </Button> */}
    </div>
  );
}
