import styled from "styled-components";

export const ContentImage = styled.img`
  transition: transform 0.2s linear, box-shadow 0.2s linear;
  transform: translate3d(0, 0, 0);

  &:hover {
    box-shadow: 12px 12px 5px 1px rgba(129, 129, 129, 0.2);
    transform: scale(1.2);
  }
`;