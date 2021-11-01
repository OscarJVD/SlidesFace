import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { loginUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginAndRegister = () => {
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

  const loginState = { email: "", password: "" };
  const [loginData, setLoginData] = useState(loginState);
  const { email, password } = loginData;

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
    fullname: "",
    username: "",
    new_email: "",
    new_password: "",
    gender: "male",
  };

  const [registerData, setRegisterData] = useState(registerState);
  const { fullname, username, new_email, new_password, gender } = registerData;

  const handleChangeInputsRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    // dispatch(registerUser(registerData));
  };
  // END REGISTER

  return (
    <div>
      {/* LOGIN */}
      <div class="row ht-100v flex-row-reverse no-gutters">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="signup-form">
            <div class="auth-logo text-center mb-5">
              <div class="row">
                <div class="col-md-12">
                  <img
                    src="https://res.cloudinary.com/slidesface-com/image/upload/v1635738378/slidesface/be_social_icon_egemeq.png"
                    class="logo-img"
                    alt="Logo"
                    width="50"
                  />
                </div>
                {/* <div class="col-md-10">
                  <p>Argon Social Network</p>
                  <span>Design System</span>
                </div> */}
              </div>
            </div>
            <form onSubmit={loginSubmit}>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
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
                </div>
                <div class="col-md-12 mt-2">
                  <div class="form-group">
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

                {/* <div class="col-md-6">
                  <label class="custom-control material-checkbox">
                    <input type="checkbox" class="material-control-input" />
                    <span class="material-control-indicator"></span>
                    <span class="material-control-description">
                      Remember Me
                    </span>
                  </label>
                </div> */}
                <div class="col-md-12 mt-3 text-center">
                  <div class="form-group">
                    <button
                      className="btn btn-primary sign-up w-100"
                      disabled={email && password ? false : true}
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
                <div class="col-md-12 text-center">
                  {/* <p class="text-muted">Start using your fingerprint</p> */}
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
                {/* <div class="col-md-12 text-center mt-5">
                  <span class="go-login">
                    Not yet a member? <a href="sign-up.html">Sign Up</a>
                  </span>
                </div> */}
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="auth-left-content mt-5 mb-5">
            {/* <div class="weather-small text-dark">
              <p class="current-weather">
                <i class="bx bx-sun"></i> <span>14&deg;</span>
              </p>
              <p class="weather-city">Gyumri</p>
            </div> */}
            <div class="mt-5 mb-5">
              <h1 class="text-left display-1 create-account mb-3 auth-txt-logo fw-bolderer fs-big">
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
        class="modal fade fingerprint-modal"
        id="fingerprintModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="fingerprintModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <h3 class="text-muted display-5">
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
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control "
                      placeholder="Nombre"
                      id="email"
                      name="email"
                      value={email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control "
                      placeholder="Apellidos"
                      id="email"
                      name="email"
                      value={email}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control "
                      placeholder="Nombre de usuario o correo electrónico"
                      id="username"
                      name="username"
                      value={username}
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
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
                    <div className="col-md-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="manRadio"
                        />
                        <label class="form-check-label" for="manRadio">
                          Hombre
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="womanRadio"
                        />
                        <label class="form-check-label" for="womanRadio">
                          Mujer
                        </label>
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Default radio
                      </label>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button> */}
              <button className="btn btn-success text-capitalize">
                Registrarte
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END REGISTER MODAL */}
    </div>
  );
};

export default LoginAndRegister;
