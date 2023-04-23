import { useState, useEffect } from "react";
import { Avatar, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import answerApi from "../api/AnswerApi";
import { useSelector } from "react-redux";
import { Answer, RootState } from "../types";
import { FineLine } from "../components/styledComponents/FineLine";
import styled from "styled-components";
import Form from "../components/form/Form";
import { FORM_TYPE } from "../CONSTANTS";
import * as React from "react";
import VoteButton from "../components/vote/VoteButton";
import Card from "@mui/material/Card";

const QuestionImage = styled.img`
  transition: transform 0.2s linear, box-shadow 0.2s linear;
  transform: translate3d(0, 0, 0);

  &:hover {
    box-shadow: 12px 12px 5px 1px rgba(129, 129, 129, 0.2);
    transform: scale(1.2);
  }
`;

const ExpandedQuestionPage = () => {
  const { currentQuestion } = useSelector((state: RootState) => state.question);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const date = new Date(currentQuestion.content.createdAt);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await answerApi.get(
          `/getAllByQuestionId/${currentQuestion.questionId}`
        );
        setAnswers(response.data);
      } catch (e) {
        console.log("Problem fetching answers!!!");
      }
    };

    fetchAnswers();
  }, []);

  return (
    <Paper>
      <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <VoteButton />
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Typography variant="h4">{currentQuestion.title}</Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
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
              <QuestionImage
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
          answers.map((answer: Answer, index: number) => {
            const answerDate = new Date(answer.content.createdAt);

            return (
              <div style={{ display: "flex" }}>
                <VoteButton />
                <Card
                  key={answer.answerId}
                  style={{
                    marginTop: index === 0 ? 0 : 20,
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
                      {answer.user.firstName[0] + answer.user.lastName[0]}
                    </Avatar>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        style={{ marginLeft: "5px" }}
                      >
                        {answer.user.firstName} {answer.user.lastName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        style={{ marginLeft: 5 }}
                      >
                        Posted on: {answerDate.toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="body1" style={{ marginTop: 10 }}>
                    {answer.content.description}
                  </Typography>
                </Card>
              </div>
            );
          })
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
  );
};

export default ExpandedQuestionPage;
