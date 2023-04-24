import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { signIn } from "../../api/AuthApi";
import isEmail from "validator/lib/isEmail";

const theme = createTheme();

export default function SignIn({ setToken }: any) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleEmailChange = (event: any) => {
    const val = event.target.value;

    setEmail(val);
    setIsEmailValid(isEmail(val));
  };

  const handlePasswordChange = (event: any) => {
    const val = event.target.value;
    setPassword(val);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const token = await signIn({
      email: data.get("email"),
      password: data.get("password"),
    });

    setToken(token);
  };

  useEffect(() => {
    const isDisabled = !!password && isEmailValid;

    setIsSubmitDisabled(isDisabled);
  }, [password, isEmailValid]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={emailDirty && !isEmailValid}
              label={"Email Address"}
              name={"email"}
              variant="outlined"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              fullWidth
              required
              margin="normal"
              type={"email"}
              onBlur={() => setEmailDirty(true)}
            />
            <TextField
              error={passwordDirty && !password}
              label={"Password"}
              name={"password"}
              variant="outlined"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              fullWidth
              required
              margin="normal"
              type={"password"}
              onBlur={() => setPasswordDirty(true)}
            />
            <Button
              disabled={!isSubmitDisabled}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
