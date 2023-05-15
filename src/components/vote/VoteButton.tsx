import React, { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AnswerType, QuestionType, RootState } from "../../types";
import { voteQuestion } from "../../api/QuestionApi";
import { getVote } from "../../api/VoteApi";
import { voteAnswer } from "../../api/AnswerApi";

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

interface VoteButtonProps {
  voteCount: number;
  disabled: boolean;
  type: "question" | "answer";
  question?: QuestionType;
  answer?: AnswerType;
}

const VoteButton = ({
  voteCount,
  disabled,
  type,
  answer,
  question,
}: VoteButtonProps) => {
  const [changeInitialVote, setChangeInitialVote] = useState<boolean>(false);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [votes, setVotes] = useState(voteCount);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentQuestion } = useSelector((state: RootState) => state.question);

  const isQuestion = type === "question";
  const isAnswer = type === "answer";

  const handleUpvote = () => {
    !changeInitialVote && setChangeInitialVote(true);

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
    !changeInitialVote && setChangeInitialVote(true);

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

  useEffect(() => {
    const getVoteUser = async () => {
      let response;

      if (question != null) {
        response = await getVote(currentUser.id, question.content.contentId);
      }

      if (answer != null) {
        response = await getVote(currentUser.id, answer.content.contentId);
      }

      if (!response) return;

      const { value } = response.data;

      if (value == 1) {
        setUpvoted(true);
        setDownvoted(false);
      }
      if (value == -1) {
        setDownvoted(true);
        setUpvoted(false);
      }
      if (value == 0) {
        setDownvoted(false);
        setUpvoted(false);
      }
    };

    getVoteUser();
  }, []);

  useEffect(() => {
    if (disabled) {
      return;
    }
    if (!changeInitialVote) {
      return;
    }

    let value = 0;

    if (upvoted && !downvoted) {
      value = 1;
    } else if (!upvoted && downvoted) {
      value = -1;
    } else if (!upvoted && !downvoted) {
      value = 0;
    }

    isQuestion &&
      question != null &&
      voteQuestion({
        userId: currentUser.id,
        questionId: question.id,
        value,
      });

    isAnswer &&
      answer != null &&
      voteAnswer({
        userId: currentUser.id,
        answerId: answer.id,
        value,
      });

    console.log("voted");
  }, [upvoted, downvoted]);

  return (
    <VoteButtonContainer>
      <IconButtonStyled
        active={upvoted}
        onClick={handleUpvote}
        disabled={disabled}
      >
        <ArrowDropUpIcon fontSize={"large"} />
      </IconButtonStyled>
      <Typography variant="body2">{votes}</Typography>
      <IconButtonStyled
        active={downvoted}
        onClick={handleDownvote}
        disabled={disabled}
      >
        <ArrowDropDownIcon fontSize={"large"} />
      </IconButtonStyled>
    </VoteButtonContainer>
  );
};

export default VoteButton;
