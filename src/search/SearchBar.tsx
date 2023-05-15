import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { QuestionType, TagType, UserType } from "../types";

interface SearchBarProps {
  questions: QuestionType[];
  setCurrentQuestions: (value: any) => void;
  tags: TagType[];
  users: UserType[];
}
const SearchBar = ({
  questions,
  setCurrentQuestions,
  tags,
  users,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  const handleChangeDropdownTag = (newValue: TagType | null) => {
    let searchedQuestions = questions;

    if (newValue) {
      searchedQuestions = questions.filter((question) => {
        return question.tags.some((tag) => tag.tagId === newValue.tagId);
      });
    }

    setCurrentQuestions(searchedQuestions);
    setSelectedTag(newValue);
  };

  const handleChangeDropdownUsers = (newValue: any) => {
    let searchedQuestions = questions;

    if (newValue.length > 0) {
      searchedQuestions = questions.filter((question) => {
        return newValue.some((user: any) => question.creator.id === user.id);
      });
    }

    setCurrentQuestions(searchedQuestions);
    setSelectedUsers(newValue);
  };
  const handleChangeText = (event: any) => {
    const searchedString = event.target.value;

    setSearchTerm(searchedString);

    const searchedQuestions = questions.filter((question) => {
      return question.title.includes(searchedString);
    });

    setCurrentQuestions(searchedQuestions);
  };

  const renderUserLabel = (user: UserType) => {
    //TODO AFTER IMPLEMENTING AUTH AND STORING CURRENT USER
    //const isCurrentUser =

    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 15px",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChangeText}
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        <Autocomplete
          sx={{ flexGrow: "1", width: "120px" }}
          options={tags}
          getOptionLabel={(option: TagType) => option.name}
          value={selectedTag}
          onChange={(event: any, newValue: TagType | null) =>
            handleChangeDropdownTag(newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="tags" variant="outlined" />
          )}
        />
        <Autocomplete
          sx={{ flexGrow: "1", width: "120px" }}
          options={users}
          getOptionLabel={(option: UserType) => renderUserLabel(option)}
          multiple
          value={selectedUsers}
          onChange={(event: any, newValue: any) =>
            handleChangeDropdownUsers(newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="users" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
};

export default SearchBar;
