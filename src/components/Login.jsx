import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const { SaleOrder } = useContext(AuthContext);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      setAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={handleUsernameChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
