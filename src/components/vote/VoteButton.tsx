import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "styled-components";

const VoteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type IconButtonStyledProps = {
  active: boolean;
};

const IconButtonStyled = styled(IconButton)<IconButtonStyledProps>`
  color: ${(props) => (props.active ? "#D96B18FF" : "#525252")} !important;
`;

const VoteButton = () => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => {
    if (!upvoted && !downvoted) {
      setVotes((prevVotes) => prevVotes + 1);
      setUpvoted(true);
    } else if (upvoted) {
      setVotes((prevVotes) => prevVotes - 1);
      setUpvoted(false);
    } else if (downvoted) {
      setVotes((prevVotes) => prevVotes + 2);
      setDownvoted(false);
      setUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (!downvoted && !upvoted) {
      setVotes((prevVotes) => prevVotes - 1);
      setDownvoted(true);
    } else if (downvoted) {
      setVotes((prevVotes) => prevVotes + 1);
      setDownvoted(false);
    } else if (upvoted) {
      setVotes((prevVotes) => prevVotes - 2);
      setUpvoted(false);
      setDownvoted(true);
    }
  };

  return (
    <VoteButtonContainer>
      <IconButtonStyled active={upvoted} onClick={handleUpvote}>
        <ArrowDropUpIcon fontSize={"large"} />
      </IconButtonStyled>
      <Typography variant="body2">{votes}</Typography>
      <IconButtonStyled active={downvoted} onClick={handleDownvote}>
        <ArrowDropDownIcon fontSize={"large"} />
      </IconButtonStyled>
    </VoteButtonContainer>
  );
};

export default VoteButton;
