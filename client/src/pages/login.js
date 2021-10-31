import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { loginUser } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    dispatch(loginUser(userData));
  };

  let inputRef = useRef();
  const showIcon = () => (
    <i className="fas fa-eye pointer" aria-hidden="true"></i>
  );
  const hideIcon = () => (
    <i className="fas fa-eye-slash pointer" aria-hidden="true"></i>
  );

  return (
    <>
      {/* <!-- Login Form --> */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow-lg mt-5">
              <div className="card-title text-center border-bottom">
                <h2 className="p-3">SlidesFace</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Usuario o Correo
                    </label>
                    <input
                      type="text"
                      onChange={handleChangeInput}
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
                      onChange={handleChangeInput}
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

                  {/* <div className="mb-4">
                                        <input type="checkbox" className="form-check-input" id="remember" />
                                        <label htmlFor="remember" className="form-label">Remember Me</label>
                                    </div> */}

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
                      data-bs-target="#exampleModal"
                    >
                      Nueva cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="p-0 m-0" id="exampleModalLabel">
                  Registrarte
                </h3>
                <h6 className="fw-normal">Es rápido y fácil.</h6>
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
                      onChange={handleChangeInput}
                      className="form-control"
                      placeholder="Usuario o Correo"
                      id="email"
                      name="email"
                      value={email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      onChange={handleChangeInput}
                      className="form-control"
                      placeholder="Usuario o Correo"
                      id="email"
                      name="email"
                      value={email}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              {/* <button type="button" className="btn btn-primary">Guardar Cambios</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="registerLogo">
            .modal-login .avatar {
		position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		top: -70px;
		width: 95px;
		height: 95px;
		border-radius: 50%;
		z-index: 9;
		background: #FE4321;
		padding: 15px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	}
            </div>  */}
    </>
  );
};

export default Login;
