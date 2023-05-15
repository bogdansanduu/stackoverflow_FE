import "./App.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarNav from "./components/sidebar/SidebarNav";
import { Outlet } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.div`
  flex-grow: 25;
  padding-top: 65px;
`;

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken != null) {
      setToken(localStorageToken);
    }
  }, [token]);

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <Container>
      <SidebarNav setToken={setToken} />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default App;
