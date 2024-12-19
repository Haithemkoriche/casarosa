import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { Row, Col, CardTitle, Form, Label, Input, Button } from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { useTranslation } from "react-i18next";
import Auth from "../../auth";
import { useEffect, useState } from "react";
import Regex from "../../utility/Regex";

const LoginCover = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const { t } = useTranslation();
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const result = await Auth.login(email, password);
    if (result) navigate("/dashboard");
  };

  if (localStorage.getItem("authenticated") === "true") navigate("/dashboard");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    if (!Regex.validate(email, Regex.reg_email)) setValidEmail(() => true);
    else setValidEmail(() => false);
    if (email === "") setValidEmail(() => false);
  }, [email]);
  useEffect(() => {
    if (!Regex.validate(password, Regex.reg_password)) setValidPassword(() => true);
    else setValidPassword(() => false);
    if (password === "") setValidPassword(() => false);
  }, [password]);

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-primary ms-1">Casa Rosa</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Casa Rosa
            </CardTitle>
            <Form className="auth-login-form mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  {t("Email")}
                </Label>
                <Input type="email" id="login-email" placeholder="john@example.com" autoFocus value={email} invalid={validEmail} onChange={(e) => setEmail(() => e.target.value)} />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    {t("Password")}
                  </Label>
                </div>
                <InputPasswordToggle className="input-group-merge" id="login-password" value={password} invalid={validPassword} onChange={(e) => setPassword(() => e.target.value)} />
              </div>
              <Button color="primary" onClick={login}>
                {t("Sign in")}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default LoginCover;
