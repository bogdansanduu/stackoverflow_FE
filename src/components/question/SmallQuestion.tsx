import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Chip, IconButton, Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FineLine } from "../styledComponents/FineLine";
import { SET_CURRENT_QUESTION } from "../../store/actions/QuestionsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Question } from "../../types";
import VoteButton from "../vote/VoteButton";

interface QuestionProps {
  question: Question;
}

const SmallQuestion = ({ question }: QuestionProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date(question.content.createdAt);

  const handleClick = () => {
    dispatch(SET_CURRENT_QUESTION(question));
    navigate(`/questions/${question.questionId}`);
  };

  return (
    <Card style={{ width: "100%", overflow: "visible" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: red[500] }} aria-label="question">
            {question.creator.firstName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <KeyboardArrowRightIcon />
          </IconButton>
        }
        title={question.title}
        subheader={date.toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {question.content.description}
        </Typography>
        <FineLine />
        <Stack
          direction="row"
          spacing={1}
          style={{ marginLeft: "10px", marginBottom: "5px" }}
        >
          {question.tags.map((tag) => (
            <Chip
              key={tag.tagId}
              label={tag.name}
              sx={{ borderRadius: "10px" }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SmallQuestion;
