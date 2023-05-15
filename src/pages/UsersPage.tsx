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
import { UserType } from "../types";

const UsersPage = () => {
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
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  OTHER INFO
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
    </>
  );
};

export default UsersPage;
