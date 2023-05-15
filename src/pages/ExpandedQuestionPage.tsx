import * as React from "react";
import { useEffect, useState } from "react";
import {
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import answerApi, { deleteAnswer } from "../api/AnswerApi";
import { useSelector } from "react-redux";
import { AnswerType, RootState } from "../types";
import { FineLine } from "../components/styledComponents/FineLine";
import Form from "../components/form/Form";
import { FORM_TYPE } from "../CONSTANTS";
import VoteButton from "../components/vote/VoteButton";
import Answer from "../components/answer/Answer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteQuestion } from "../api/QuestionApi";
import { useNavigate } from "react-router";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ContentImage } from "../components/styledComponents/ContentImage";
import UpdateForm from "../components/form/UpdateForm";
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

const ExpandedQuestionPage = () => {
  const { currentQuestion } = useSelector((state: RootState) => state.question);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [openUpdateQuestionModal, setOpenUpdateQuestionModal] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const date = new Date(currentQuestion.content.createdAt);

  const handleDeleteAnswer = (answerToDelete: AnswerType) => {
    const updatedAnswers = answers.filter(
      (answer) => answer.id !== answerToDelete.id
    );

    deleteAnswer({ answerId: answerToDelete.id });

    setAnswers(updatedAnswers);
  };

  const handleDeleteQuestion = () => {
    deleteQuestion({ questionId: currentQuestion.id });
    navigate("/questions");
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await answerApi.get(
          `/getAllByQuestionId/${currentQuestion.id}`
        );

        setAnswers(response.data);
      } catch (e) {
        console.log("Problem fetching answers!!!");
      }
    };

    fetchAnswers();
  }, []);

  const isDisabled = currentQuestion.creator.id === currentUser.id;

  const handleUpdateQuestion = () => {
    setOpenUpdateQuestionModal(true);
  };

  const handleCloseUpdateQuestionModal = () => {
    setOpenUpdateQuestionModal(false);
  };

  return (
    <>
      <Paper>
        <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <VoteButton
              voteCount={currentQuestion.voteCount}
              disabled={isDisabled}
              type="question"
              question={currentQuestion}
            />
            <div
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">{currentQuestion.title}</Typography>
                {isDisabled && (
                  <div style={{ display: "flex" }}>
                    <IconButton onClick={handleUpdateQuestion}>
                      <ModeEditIcon style={{ fontSize: "35px" }} />
                    </IconButton>
                    <IconButton onClick={handleDeleteQuestion}>
                      <DeleteIcon style={{ fontSize: "35px" }} />
                    </IconButton>
                  </div>
                )}
              </div>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Asked on: {date.toLocaleDateString()}
              </Typography>
              <FineLine />
              <Stack
                direction="row"
                spacing={1}
                style={{ marginLeft: "10px", marginBottom: "5px" }}
              >
                {currentQuestion.tags.map((tag) => (
                  <Chip
                    key={tag.tagId}
                    label={tag.name}
                    sx={{ borderRadius: "10px" }}
                  />
                ))}
              </Stack>
              <Divider variant="middle" />
              <Typography variant="body1" style={{ marginTop: 10 }}>
                {currentQuestion.content.description}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
                style={{ paddingTop: "20px" }}
              >
                Attached picture:
              </Typography>
              {currentQuestion.content.picture && (
                <ContentImage
                  src={currentQuestion.content.picture}
                  style={{
                    width: "300px",
                    objectFit: "scale-down",
                    marginLeft: "50px",
                  }}
                />
              )}
            </div>
          </div>

          <Divider
            variant="middle"
            style={{ padding: "10px 0", marginBottom: "10px" }}
          />
          {answers.length > 0 ? (
            answers.map((answer: AnswerType) => (
              <Answer
                key={answer.id}
                answer={answer}
                deleteAnswer={handleDeleteAnswer}
                setAnswers={setAnswers}
                answers={answers}
              />
            ))
          ) : (
            <div>No answers yet</div>
          )}

          <FineLine />
          <Typography variant="h6">Your Answer</Typography>
          <Form
            type={FORM_TYPE.ANSWER}
            answers={answers}
            setAnswers={setAnswers}
          />
        </div>
      </Paper>
      <Modal
        open={openUpdateQuestionModal}
        onClose={handleCloseUpdateQuestionModal}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Update Question
          </Typography>
          <UpdateForm
            type={FORM_TYPE.QUESTION}
            setOpenModal={setOpenUpdateQuestionModal}
            question={currentQuestion}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ExpandedQuestionPage;
