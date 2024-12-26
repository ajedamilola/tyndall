"use client";
import React from "react";
import { signOut } from "supertokens-auth-react/recipe/session";

function Logout() {
  async function onLogout() {
    await signOut();
    window.location.href = "/auth"; // or to wherever your logic page is
  }
  return (
    <ul>
      <li>Home</li>
      <li onClick={onLogout}>Logout</li>
    </ul>
  );
}

export default Logout;
