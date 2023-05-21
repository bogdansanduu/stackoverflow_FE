import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/UserApi";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Avatar,
} from "@material-ui/core";
import { RootState, UserType } from "../types";
import { IconButton } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useSelector } from "react-redux";
import { banUser } from "../api/AdminApi";

const UsersPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users } = await getAllUsers();

        setUsers(users);
      } catch (e) {
        console.log("Problem fetching users!!!");
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (user: UserType) => {
    const { data: bannedUser } = await banUser(user.id);

    const updatedUsers = users.map((currentUser) => {
      if (currentUser.id === bannedUser.id) {
        return bannedUser;
      }
      return currentUser;
    });

    setUsers(updatedUsers);
  };

  return (
    <>
      <Typography variant="h6">Users</Typography>
      <Divider />
      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
      {users &&
        users.map((user: UserType) => (
          <React.Fragment key={user.id}>
            <Card style={{ margin: "16px 0" }}>
              <CardHeader
                avatar={
                  <Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
                }
                title={`${user.firstName} ${user.lastName}`}
                subheader={`SCORE: ${user.score}`}
                action={
                  currentUser.role === "admin" && (
                    <IconButton
                      aria-label="ban"
                      onClick={() => {
                        handleBanUser(user);
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  )
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  <p>{user.role}</p>
                  <p>User Status: {user.banned ? "BANNED" : "NOT BANNED"}</p>
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
    </>
  );
};

export default UsersPage;
