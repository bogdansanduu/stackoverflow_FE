import React, { ChangeEvent, useEffect, useState } from "react";
import questionApi from "../api/QuestionApi";
import Button from "@mui/material/Button";
import { Question } from "../types";
import SmallQuestion from "../components/question/SmallQuestion";
import { Modal, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Form from "../components/form/Form";
import { FORM_TYPE } from "../CONSTANTS";

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

const pageSize = 10;

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const count = questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: questions } = await questionApi.get("/getAll");

        setQuestions(questions);
      } catch (e) {
        console.log("Problem fetching questions!!!");
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "5px",
          height: "100wh",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>ADD QUESTION</div>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddQuestion}
          >
            Press me
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            width: "100%",
            height: "calc(100vh - 190px)",
          }}
        >
          {currentQuestions.map((question: Question) => (
            <SmallQuestion key={question.questionId} question={question} />
          ))}
        </div>

        <Pagination
          count={Math.ceil(count / pageSize)}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Question
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              setOpenModal={setOpenModal}
              type={FORM_TYPE.QUESTION}
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default QuestionsPage;
