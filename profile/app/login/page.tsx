"use client";
import React, { useState } from 'react';
import { Grid2, Paper, Avatar, Link, Box } from '@mui/material'
import { TextField, Button, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

import { login, signup } from './actions';

const theme = createTheme({
  palette: {
    // mode: 'light',
  },
});

export default function LoginPage(supabase) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');





  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    await signup(email, password);
  };


  const handleGithubLogin = async () => {
    async function githubLogin() {
      const redurectUrl = "../"
      console.log(redurectUrl)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redurectUrl
        }
      })

      await githubLogin();
    };
  }


  const socialLoginButton = {
    textTransform: "none",
    height: "34px",
    width: "128px",
    border: "1px solid black",
    marginLeft: "8px",
    '&:hover': {
      backgroundColor: "rgba(8, 44, 248, 0.14)",
    },
  }


  const socialAvatar = {
    marginRight: "6px",
    width: "28px",
    height: "28px"

  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', }}
      >
        <Paper elevation={10} sx={{ marginTop: 1, width: 390, borderRadius: "12px" }} >
          <Grid2 container direction="column" alignItems="center" justifyContent="center" sx={{ padding: 1, width: "380px" }} >
            <h4 > Sign in with</h4>
            <Grid2 container direction="row">
              <Button sx={socialLoginButton} onClick={handleGithubLogin}>
                <Avatar sx={socialAvatar}><GitHubIcon /></Avatar>Github
              </Button>
              <Button sx={socialLoginButton}>
                <Avatar sx={socialAvatar}><LinkedInIcon /></Avatar>LinkedIn
              </Button>
            </Grid2>
            <hr style={{ marginTop: "18px", marginBottom: 0, width: "100%" }} />
            <h4 style={{ marginTop: "6px" }}> Or Sign In</h4>
            <Grid2 container direction="row" sx={{ marginLeft: "6px", marginTop: "-24px", marginBottom: "2px" }}>
              <TextField
                required
                fullWidth
                autoFocus
                name="email"
                margin="normal"
                size="small"
                id="email"
                autoComplete="email"
                placeholder="email" />
              <TextField
                required
                fullWidth
                name="password"
                margin="normal"
                size="small"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="password"
                sx={{ mt: 1, mb: 0 }}
                variant="standard"
              />
              <Typography sx={{ float: "right" }}>
                <Link href="#" sx={{ fontSize: "12px" }}>
                  forgot password ?
                </Link>
              </Typography>
              <Button size="small" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: "none", }} formAction={login}>
                Sign in
              </Button>
              <Button size="small" fullWidth variant="outlined" sx={{ mt: -0.5, mb: 2, textTransform: "none" }} formAction={signup}>
                Sign up
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}