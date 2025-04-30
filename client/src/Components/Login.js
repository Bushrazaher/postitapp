import {
  Container,
  Row,
  Col,
} from "reactstrap";
import logo from "../Images/logo-t.png";
import { useEffect, useState } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { msg, isLogin, user } = useSelector(state=> state.users);
  const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const onSubmit = () => {
      const userData = {
        email: email,
        password: password,
       
      };
     dispatch(login(userData))
     navigate("/")
   };


  useEffect(() => {
    if (isLogin && user) {
      navigate("/");
    }
  }, [isLogin, user, navigate]);

  return (
    <Container fluid className="justify-content-center">
      <Row>
        <Col md={3}>
          <img src={logo} alt="Logo" className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle"><h4>Sign In</h4></div>
            <section>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email",{onChange:(e)=>setemail(e.target.value),})}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password",{onChange:(e)=>setpassword(e.target.value)})}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="button w-100"
              >
                Sign In
              </button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      <Row className="mt-3">
        <Col> <p>{msg}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
