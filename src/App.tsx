import "./App.css";
import React from "react";
import styled from "styled-components";
import SidebarNav from "./components/sidebar/SidebarNav";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.div`
  flex-grow: 25;
  padding-top: 65px;
`;
function App() {
  // const [token, setToken] = useState('');
  //
  // useEffect(() => {
  //     const localStorageToken = localStorage.getItem("token");
  //
  //     if (localStorageToken) {
  //         setToken(localStorageToken);
  //     }
  // }, [token])
  //
  // if (!token) {
  //     return <SignIn setToken={setToken}/>
  // }

  return (
    <Container>
      <SidebarNav />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default App;
