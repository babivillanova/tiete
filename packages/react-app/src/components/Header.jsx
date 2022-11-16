import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center", width: "60vw" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ margin: "0 0.5rem 0 0", fontFamily: "serif", color: "white" }}>
            {title}
          </Title>
        </a>
        <Text
          type="secondary"
          style={{
            textAlign: "end",
            fontFamily: "serif",
            fontWeight: "100",
            color: "white",
            width: "52vw",
            letterSpacing: "0.2rem",
          }}
        >
          {subTitle}
        </Text>
      </div>
      {props.children}
    </div>
  );
}

Header.defaultProps = {
  link: "../home",
  title: "tiete",
  subTitle: "bridging the gap between artists and fans",
};
