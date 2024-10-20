import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
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
  return (
    <div className="display-center">
      {error && <div className="red_error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
