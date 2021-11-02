import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { loginUser, registerUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   username_email_or_mobile_login: yup.string().required("Required"),
//   password: yup
//     .string()
//     .required("Required")
//     .min(6, "Password must be at least 6 characters"),
// });

const LoginAndRegister = () => {
  // FORM VALIDATION
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(schema) });

  // END FORM VALIDATION

  const dispatch = useDispatch();

  // EYE ICON
  let inputRef = useRef();

  const showIcon = () => (
    <i className="fas fa-eye pointer" aria-hidden="true"></i>
  );

  const hideIcon = () => (
    <i className="fas fa-eye-slash pointer" aria-hidden="true"></i>
  );
  // END EYE ICON

  const loginState = { username_email_or_mobile_login: "", password: "" };
  const [loginData, setLoginData] = useState(loginState);
  const { username_email_or_mobile_login, password } = loginData;

  const handleChangeInputsLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  // REGISTER
  const { auth } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const registerState = {
    firstname: "",
    lastname: "",
    username_email_or_mobile_register: "",
    new_password: "",
    gender: "male",
  };

  const [registerData, setRegisterData] = useState(registerState);

  const {
    firstname,
    lastname,
    username_email_or_mobile_register,
    new_password,
  } = registerData;

  const handleChangeInputsRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
  };
  // END REGISTER

  return (
    <div>
      {/* LOGIN */}
      <div className="row ht-100v flex-row-reverse no-gutters">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="signup-form">
            <div className="auth-logo text-center mb-5">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="https://res.cloudinary.com/slidesface-com/image/upload/v1635738378/slidesface/be_social_icon_egemeq.png"
                    className="logo-img"
                    alt="Logo"
                    width="50"
                  />
                </div>
                {/* <div className="col-md-10">
                  <p>Argon Social Network</p>
                  <span>Design System</span>
                </div> */}
              </div>
            </div>
            <form onSubmit={loginSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control"
                      // {...register("username_email_or_mobile_login")}
                      placeholder="Usuario, correo o teléfono"
                      id="username_email_or_mobile_login"
                      name="username_email_or_mobile_login"
                      value={username_email_or_mobile_login}
                    />
                    {/* {errors.username_email_or_mobile_login && (
                      <p>El usuario, correo teléfono es requerido</p>
                    )} */}
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="form-group">
                    <div className="position-relative">
                      <input
                        ref={inputRef}
                        type="password"
                        onChange={handleChangeInputsLogin}
                        className="form-control"
                        placeholder="Contraseña"
                        id="password"
                        name="password"
                        value={password}
                      />

                      <ReactPasswordToggleIcon
                        inputRef={inputRef}
                        // style={{ height: "120px" }}
                        showIcon={showIcon}
                        hideIcon={hideIcon}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <label className="custom-control material-checkbox">
                    <input type="checkbox" className="material-control-input" />
                    <span className="material-control-indicator"></span>
                    <span className="material-control-description">
                      Remember Me
                    </span>
                  </label>
                </div> */}
                <div className="col-md-12 mt-3 text-center">
                  <div className="form-group">
                    <button
                      className="btn btn-primary sign-up w-100"
                      disabled={
                        username_email_or_mobile_login && password
                          ? false
                          : true
                      }
                      type="submit"
                    >
                      Entrar
                    </button>

                    {/* <button
                      type="button"
                      className="btn border-0 outline-0 shadow-none"
                    >
                      <i className="fas fa-fingerprint fa-2x"></i>
                    </button> */}
                  </div>
                  <div className="col-md-12 mt-3">
                    <a href="#" className="text-decoration-none text-sm">
                      ¿Olvidaste la contraseña?
                    </a>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  {/* <p className="text-muted">Start using your fingerprint</p> */}
                  <hr />
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Crear cuenta nueva
                  </button>
                </div>
                {/* <div className="col-md-12 text-center mt-5">
                  <span className="go-login">
                    Not yet a member? <a href="sign-up.html">Sign Up</a>
                  </span>
                </div> */}
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="auth-left-content mt-5 mb-5">
            {/* <div className="weather-small text-dark">
              <p className="current-weather">
                <i className="bx bx-sun"></i> <span>14&deg;</span>
              </p>
              <p className="weather-city">Gyumri</p>
            </div> */}
            <div className="mt-5 mb-5">
              <h1 className="text-left display-1 create-account mb-3 auth-txt-logo fw-bolderer fs-big">
                slidesface
              </h1>
              <h3 className="text-left fw-normal text-dark">
                La mejor plataforma para compartir con amigos y familiares
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal FINGERPRINT --> */}
      <div
        className="modal fade fingerprint-modal"
        id="fingerprintModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fingerprintModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h3 className="text-muted display-5">
                Place your Finger on the Device Now
              </h3>
              <img
                src="assets/images/icons/auth-fingerprint.png"
                alt="Fingerprint"
              />
            </div>
          </div>
        </div>
      </div>

      {/* END LOGIN */}

      {/* LOGIN ALTERNATIVE */}
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow-lg mt-5">
              <div className="card-title text-center border-bottom">
                <h2 className="p-3">SlidesFace</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={loginSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Usuario o Correo
                    </label>
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control"
                      placeholder="Usuario o Correo"
                      id="email"
                      name="email"
                      value={email}
                    />
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      ref={inputRef}
                      type="password"
                      onChange={handleChangeInputsLogin}
                      className="form-control"
                      placeholder="Contraseña"
                      id="password"
                      name="password"
                      value={password}
                    />

                    <ReactPasswordToggleIcon
                      inputRef={inputRef}
                      style={{ height: "120px" }}
                      showIcon={showIcon}
                      hideIcon={hideIcon}
                    />
                  </div>

                 <div className="mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label htmlFor="remember" className="form-label">
                      Remember Me
                    </label>
                  </div> 

                  <div className="d-grid">
                    <button
                      disabled={email && password ? false : true}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Entrar
                    </button>
                  </div>

                  <p className="my-2 text-center">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                  </p>

                  <hr />

                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal"
                    >
                      Nueva cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* END LOGIN ALTERNATIVE */}

      {/* REGISTER MODAL */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="p-0 m-0" id="registerModalLabel">
                  Registrarte
                </h3>
                <h6 className="fw-normal">Es fácil y rápido.</h6>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={registerSubmit}>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Nombre"
                        id="firstname"
                        name="firstname"
                        value={firstname}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Apellidos"
                        id="lastname"
                        name="lastname"
                        value={lastname}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Nombre de usuario, correo o móvil"
                        id="username_email_or_mobile_register"
                        name="username_email_or_mobile_register"
                        value={username_email_or_mobile_register}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Contraseña nueva"
                        id="new_password"
                        name="new_password"
                        value={new_password}
                      />
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h5 className="text-sm">
                          <small className="text-sm">Género</small>
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="manRadio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="manRadio"
                          >
                            Hombre
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="womanRadio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="womanRadio"
                          >
                            Mujer
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="otherRadio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherRadio"
                          >
                            Otro
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-success text-capitalize">
                  Registrarte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* END REGISTER MODAL */}
    </div>
  );
};

export default LoginAndRegister;
