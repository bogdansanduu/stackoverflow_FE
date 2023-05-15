import React from "react";
import background from "../images/Stack_Overflow-Background.png";
import styled from "styled-components";
import { Typography } from "@mui/material";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(93, 93, 93, 0.15);
  z-index: 1;
`;

const Title = styled(Typography)`
  color: white;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 50px;
`;

const Description = styled(Typography)`
  color: white;
  z-index: 2;
  text-align: center;
  max-width: 600px;
  margin-top: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 25px;
`;

const HomePage = () => {
  return (
    <Container>
      <Overlay />
      <Title>Welcome to Stack Overflow Clone</Title>
      <Description>
        A community-driven question and answer platform for developers. Join our
        community and get answers to your programming questions from experts
        around the world.
      </Description>
    </Container>
  );
};

export default HomePage;
