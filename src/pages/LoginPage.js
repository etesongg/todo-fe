import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate, Navigate } from "react-router-dom";

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token; // fe에서 be로 보낼때 token 값을 어디에 넣어서 보내면 좋을까? get이기때문에 body에 넣어서 보내는건 안 맞음 그러므로 header에 붙여서 보내야 함
        setError("");
        navigate("/");
      } else {
        throw new Error(response.data.error); // 백엔드에서 받아옴
      }
    } catch (error) {
      setError(error.message);
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="display-center">
      {error && <div className="red_error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1 class="login-header-h1">LOGIN</h1>
        <h1 class="login-header-h1">TODO.TIME</h1>
        <div class="login-div">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>EMAIL ADDRESS</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </div>
        <div className="button-box">
          <Button type="submit" className="button-black">
            Login
          </Button>
        </div>
        <span>
          NOT A MEMBER? <Link to="/register">Signup now</Link>
        </span>
      </Form>
    </div>
  );
};

export default LoginPage;
