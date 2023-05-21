import React, { useState } from "react";
import VoteButton from "../vote/VoteButton";
import Card from "@mui/material/Card";
import { Avatar, IconButton, Modal, Typography } from "@mui/material";
import { AnswerType, RootState } from "../../types";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentImage } from "../styledComponents/ContentImage";
import UpdateForm from "../form/UpdateForm";
import { FORM_TYPE } from "../../CONSTANTS";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AnswerProps {
  answer: AnswerType;
  answers: AnswerType[];
  deleteAnswer: (answer: AnswerType) => void;
  setAnswers: (answers: any) => void;
}

const Answer = ({ answer, deleteAnswer, setAnswers, answers }: AnswerProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [openUpdateAnswerModal, setOpenUpdateAnswerModal] =
    useState<boolean>(false);

  const answerDate = new Date(answer.content.createdAt);
  const isDisabled = answer.creator.id === currentUser.id;

  const handleDeleteAnswer = () => {
    deleteAnswer(answer);
  };

  const handleUpdateAnswer = () => {
    setOpenUpdateAnswerModal(true);
  };
  const handleCloseUpdateAnswerModal = () => {
    setOpenUpdateAnswerModal(false);
  };

  return (
    <>
      <div style={{ display: "flex" }} key={answer.id}>
        <VoteButton
          voteCount={answer.voteCount}
          disabled={isDisabled}
          type="answer"
          answer={answer}
        />
        <Card
          style={{
            marginTop: 20,
            padding: "10px 0",
            backgroundColor: "#f6f6f6",
            flexGrow: 1,
          }}
          elevation={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                marginRight: 1,
              }}
            >
              {answer.creator.firstName[0] + answer.creator.lastName[0]}
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ marginLeft: "5px" }}
              >
                {answer.creator.firstName} {answer.creator.lastName}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                style={{ marginLeft: 5 }}
              >
                Posted on: {answerDate.toLocaleDateString()}
              </Typography>
            </div>
            {(currentUser.role === "admin" || isDisabled) && (
              <div style={{ display: "flex", marginLeft: "auto" }}>
                <IconButton onClick={handleUpdateAnswer}>
                  <ModeEditIcon style={{ fontSize: "35px" }} />
                </IconButton>
                <IconButton
                  style={{ marginLeft: "auto" }}
                  onClick={handleDeleteAnswer}
                >
                  <DeleteIcon style={{ fontSize: "35px" }} />
                </IconButton>
              </div>
            )}
          </div>
          <Typography variant="body1" style={{ marginTop: 10 }}>
            {answer.content.description}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
            style={{ paddingTop: "20px" }}
          >
            Attached picture:
          </Typography>
          {answer.content.picture && (
            <ContentImage
              src={answer.content.picture}
              style={{
                width: "300px",
                objectFit: "scale-down",
                marginLeft: "50px",
              }}
            />
          )}
        </Card>
      </div>
      <Modal
        open={openUpdateAnswerModal}
        onClose={handleCloseUpdateAnswerModal}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Update Answer
          </Typography>
          <UpdateForm
            type={FORM_TYPE.ANSWER}
            setOpenModal={setOpenUpdateAnswerModal}
            answer={answer}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Answer;
