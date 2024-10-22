import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // 리프레시 방지
    try {
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요");
      }
      const response = await api.post("/user", { name, email, password });
      if (response.status == 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error); // 프론트엔드, 백엔드에서 받아옴
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="display-center">
      {error && <div className="red_error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1 className="register-header-h1">REGISTRATION</h1>
        <h1 class="register-header-h1">TODO.TIME</h1>
        <div className="register-div">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>YOUR NAME</Form.Label>
            <Form.Control
              type="string"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

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
              onChange={(event) => setPasswrod(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>RE-ENTER THE PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="re-enter the password"
              onChange={(event) => setSecPassword(event.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          <div className="button-box">
            <Button className="button-black" type="submit">
              REGISTER NOW
            </Button>
          </div>
          <span>
            ALREADY HAVE AN ACCOUNT? <Link to="/login">Login now</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
