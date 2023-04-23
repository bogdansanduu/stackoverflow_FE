import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addQuestion } from "../../api/QuestionApi";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase64 from "react-file-base64";
import { FORM_TYPE } from "../../CONSTANTS";
import { addAnswer } from "../../api/AnswerApi";
import { useSelector } from "react-redux";
import { Answer, Question, RootState, Tag } from "../../types";
import { addTagsToQuestion, getAllTags } from "../../api/TagApi";
import { Autocomplete, Chip } from "@mui/material";

interface FormProps {
  setOpenModal?: (value: boolean) => void;
  type: number;

  answers?: any;
  setAnswers?: (value: any) => void;

  questions?: any;
  setQuestions?: (value: any) => void;
}
const Form = ({
  setOpenModal,
  type,
  answers,
  setAnswers,
  questions,
  setQuestions,
}: FormProps) => {
  const { currentQuestion } = useSelector((state: RootState) => state.question);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (type === FORM_TYPE.QUESTION) {
        const { data: question }: { data: Question } = await addQuestion({
          title,
          description,
          userId: 1,
          picture,
        });

        question.tags = await addTagsToQuestion(
          selectedTags,
          question.questionId
        );

        setQuestions && setQuestions([...questions, question]);
      }

      if (type === FORM_TYPE.ANSWER) {
        const { data: answer }: { data: Answer } = await addAnswer({
          userId: 1,
          picture,
          description,
          questionId: currentQuestion.questionId,
        });

        setAnswers && setAnswers([...answers, answer]);
      }
    } catch (e) {
      console.log("Error Adding Question/Answer !!!");
    } finally {
      setOpenModal && setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data: tags } = await getAllTags();

        const tagNames = tags.map((tag: Tag) => tag.name);

        setTags(tagNames);
      } catch (e) {
        console.log("Problem fetching tags!!!");
      }
    };

    fetchTags();
  }, []);

  const isDisabled = !!title && !!description && !!picture;
  const typeText = type === FORM_TYPE.QUESTION ? "Question" : "Answer";

  const placeHolderTitle =
    type === FORM_TYPE.QUESTION
      ? "What's your programming question? Be specific."
      : "Resume your answer in a sentence.";

  const placeHolderDescription =
    type === FORM_TYPE.QUESTION
      ? "Describe your problem in detail. The more information you give, the better answers you'll get."
      : "Your answer should be as detailed as possible.";
  return (
    <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
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

      {type === FORM_TYPE.QUESTION && (
        <Autocomplete
          value={selectedTags}
          onChange={(event: any, newValue: any) => {
            setSelectedTags(newValue);
          }}
          multiple
          options={tags}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) => {
            return value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="c++"
            />
          )}
        />
      )}

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
        Post Your {typeText}
      </Button>
    </form>
  );
};

export default Form;
