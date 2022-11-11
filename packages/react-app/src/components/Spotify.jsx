import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function Spotify() {
  const { currentTheme } = useThemeSwitcher();

  return (
    <div style={{ display: "flex" }}>
      <Button
        style={{ marginLeft: 5 }}
        shape="round"
        onClick={() => {
          //access link to https://supporting-fan.vercel.app/login
          window.location.href = "https://supporting-fan.vercel.app/login";
        }}
      >
        Connect to Spotify
      </Button>
    </div>
  );
}
