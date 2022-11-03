import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function Spotify() {
  const { currentTheme } = useThemeSwitcher();

  return (
    <div style={{ display: "flex" }}>
      <Button style={{ marginLeft: 5 }} shape="round">
        Connect to Spotify
      </Button>
    </div>
  );
}
