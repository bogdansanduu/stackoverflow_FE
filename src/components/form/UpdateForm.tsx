import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FORM_TYPE } from "../../CONSTANTS";
import Button from "@mui/material/Button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase64 from "react-file-base64";
import { AnswerType, QuestionType } from "../../types";
import { updateQuestion } from "../../api/QuestionApi";
import { useDispatch } from "react-redux";
import { SET_CURRENT_QUESTION } from "../../store/actions/QuestionsActions";
import { updateAnswer } from "../../api/AnswerApi";

interface UpdateFormProps {
  type: FORM_TYPE;
  setOpenModal: (value: boolean) => void;
  question?: QuestionType;
  answer?: AnswerType;

  answers?: any;
  setAnswers?: (value: any) => void;
}

const UpdateForm = ({
  type,
  setOpenModal,
  question,
  answer,
  answers,
  setAnswers,
}: UpdateFormProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const placeHolderTitle = "Update question title.";

  const placeHolderDescription =
    type === FORM_TYPE.QUESTION
      ? "Describe your problem in detail. The more information you give, the better answers you'll get."
      : "Your answer should be as detailed as possible.";

  const typeText = type === FORM_TYPE.QUESTION ? "Question" : "Answer";

  const isDisabled =
    type === FORM_TYPE.QUESTION
      ? !!title && !!description && !!picture
      : !!description && !!picture;
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (type === FORM_TYPE.QUESTION && question) {
        const { data: updatedQuestion }: { data: QuestionType } =
          await updateQuestion({
            questionId: question.id,
            title,
            description,
            picture,
          });

        dispatch(SET_CURRENT_QUESTION(updatedQuestion));
      }

      if (type === FORM_TYPE.ANSWER && answer) {
        const { data: updatedAnswer }: { data: AnswerType } =
          await updateAnswer({
            answerId: answer.id,
            description,
            picture,
          });

        console.log(updatedAnswer);

        const updatedAnswers = answers.map((currentAnswer: AnswerType) => {
          if (currentAnswer.id === updatedAnswer.id) return updatedAnswer;
          return currentAnswer;
        });

        setAnswers && setAnswers(updatedAnswers);
      }
    } catch (e) {
      console.log("Error Updating Question/Answer !!!");
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
      {type === FORM_TYPE.QUESTION && (
        <TextField
          type="text"
          variant="outlined"
          label="Title"
          placeholder={placeHolderTitle}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
      )}
      <TextField
        type="text"
        variant="outlined"
        label="Description"
        placeholder={placeHolderDescription}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        fullWidth
        required
        multiline
        rows={6}
        sx={{ marginBottom: 2 }}
      />

      <div style={{ paddingBottom: "5px" }}>
        <FileBase64
          multiple={false}
          onDone={({ base64 }: any) => setPicture(base64)}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isDisabled}
      >
        Update Your {typeText}
      </Button>
    </form>
  );
};

export default UpdateForm;
