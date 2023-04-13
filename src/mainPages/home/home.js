import React from "react";
import LoginPage from "../login/Login";
import "./home.css";
export default function Home() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  return (
    <div className="mainHome">
      <h1>
        {" "}
        Welcome <span>{user ? user.name : ""}</span>
      </h1>
    </div>
  );
}
