import React, { ChangeEvent, useEffect, useState } from "react";
import questionApi from "../api/QuestionApi";
import Button from "@mui/material/Button";
import { QuestionType, TagType, UserType } from "../types";
import SmallQuestion from "../components/question/SmallQuestion";
import { Modal, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Form from "../components/form/Form";
import { FORM_TYPE } from "../CONSTANTS";
import SearchBar from "../components/search/SearchBar";
import { getAllTags } from "../api/TagApi";
import { getAllUsers } from "../api/UserApi";

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
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);

  const [tags, setTags] = useState<TagType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
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

    const fetchTags = async () => {
      try {
        const { data: tags } = await getAllTags();

        setTags(tags);
      } catch (e) {
        console.log("Problem fetching tags!!!");
      }
    };

    const fetchUsers = async () => {
      try {
        const { data: users } = await getAllUsers();

        setUsers(users);
      } catch (e) {
        console.log("Problem fetching users!!!");
      }
    };

    fetchUsers();

    fetchTags();
    fetchQuestions();
  }, []);

  useEffect(() => {
    const newCurrentQuestions = questions.slice(startIndex, endIndex);

    setCurrentQuestions(newCurrentQuestions);
  }, [page, questions]);

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
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar
            questions={questions}
            setCurrentQuestions={setCurrentQuestions}
            tags={tags}
            users={users}
          />
          <div
            style={{
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
          {currentQuestions.map((question: QuestionType) => (
            <SmallQuestion key={question.id} question={question} />
          ))}
        </div>

        <Pagination
          count={Math.ceil(count / pageSize)}
          onChange={handlePageChange}
        />
      </div>

      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
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
