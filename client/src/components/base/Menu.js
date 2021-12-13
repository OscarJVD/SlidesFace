import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import Searcher from "./Searcher";
import SearcherSm from "./SearcherSm";
import Tooltip from "react-simple-tooltip";

const Menu = () => {
  // const darkModeRef = useRef();

  const { auth, theme } = useSelector((state) => state);
  const [showSettings, setShowSettings] = useState(" ");
  const [showMsgs, setShowMsgs] = useState(" ");
  const dispatch = useDispatch();

  // console.log(auth)

  // const alternateTheme = () => {
  //   // document.getElementById('themePoint').click();
  //   darkModeRef.current.click()

  //   dispatch({ type: GLOBAL_TYPES.ALERT, payload: !theme })
  //   // onClick={() => dispatch({type: GLOBAL_TYPES.THEME, payload: !theme})}
  // }

  return (
    <>
      <nav
        id="navbar-main"
        className="navbar navbar-expand-lg shadow-sm sticky-top"
      >
        <div className="w-100 justify-content-md-center">
          <ul className="nav navbar-nav enable-mobile px-2">
            <li className="nav-item">
              <button type="button" className="btn nav-link p-0">
                <img
                  src="/images/icons/theme/post-image.png"
                  className="f-nav-icon"
                  alt="Quick make post"
                />
              </button>
            </li>

            <li className="nav-item w-100 py-2">
              <SearcherSm />
            </li>

            <li className="nav-item">
              <a
                href="messages.html"
                className="nav-link nav-icon nav-links message-drop drop-w-tooltip"
                data-placement="bottom"
                data-title="Messages"
              >
                {/* <img
                  src="/images/icons/navbar/message.png"
                  className="message-dropdown f-nav-icon"
                  alt="navbar icon"
                /> */}
                <i className="fas fa-comments text-dark"></i>
              </a>
            </li>
          </ul>

          <ul className="navbar-nav mr-5 flex-row" id="main_menu">
            <Link className="navbar-brand nav-item mr-lg-5" to="/home">
              <img
                src="/favicon_logos/be_social_icon.png"
                width="40"
                height="40"
                className="mr-3"
                alt="Logo"
              />
            </Link>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}

            {/* BUSCADOR */}
            <Searcher />
            {/* END BUSCADOR */}

            <li className="nav-item s-nav dropdown d-mobile">
              <Tooltip content="Publicar" placement="bottom">
                <a
                  href="#"
                  className="nav-link nav-icon nav-links drop-w-tooltip"
                  data-toggle="dropdown"
                  data-placement="bottom"
                  data-title="Create"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <img src="/images/icons/navbar/create.png" alt="navbar icon" /> */}
                  <i className="fas fa-plus text-dark fa-sm"></i>
                </a>
              </Tooltip>

              <div className="dropdown-menu dropdown-menu-right nav-dropdown-menu">
                <a
                  href="#"
                  className="dropdown-item"
                  aria-describedby="createGroup"
                >
                  <div className="row">
                    <div className="col-md-2">
                      <i className="bx bx-group post-option-icon"></i>
                    </div>
                    <div className="col-md-10">
                      <span className="fs-9">Group</span>
                      <small id="createGroup" className="form-text text-muted">
                        Find people with shared interests
                      </small>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  aria-describedby="createEvent"
                >
                  <div className="row">
                    <div className="col-md-2">
                      <i className="bx bx-calendar post-option-icon"></i>
                    </div>
                    <div className="col-md-10">
                      <span className="fs-9">Event</span>
                      <small id="createEvent" className="form-text text-muted">
                        bring people together with a public or private event
                      </small>
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item s-nav dropdown message-drop-li">
              {/* BTN MESSAGES POPUP */}
              <Tooltip content="Mensajes" placement="bottom">
                <a
                  href="#"
                  onClick={() => setShowMsgs(showMsgs == "show" ? " " : "show")}
                  className="nav-link nav-links message-drop tpp"
                  // data-toggle="dropdown"
                  data-placement="bottom"
                  title="Show Messages"
                  data-toggle="tooltip"
                  data-title="Messages"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-original-title="sdfsdf"
                >
                  {/* <img
                  src="/images/icons/navbar/message.png"
                  className="message-dropdown"
                  alt="navbar icon"
                /> */}
                  <i className="fas fa-comments text-dark fa-2x"></i>
                  <span className="badge rounded-circle bg-clear-red">1</span>
                </a>
              </Tooltip>
              {/* END BTN MESSAGES POPUP */}

              {/* MENSAJES POPUP */}
              <ul
                className={`dropdown-menu notify-drop dropdown-menu-right nav-drop shadow-sm ${showMsgs}`}
              >
                <div className="notify-drop-title">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6 fs-8">
                      Mensajes | <a href="#">Solicitudes</a>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                      <a
                        href="#"
                        className="notify-right-icon"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Marcar todo como leído
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- end notify title -->
                                    <!-- notify content --> */}
                <div className="drop-content">
                  <li className="px-2 pointer">
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-6.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Susan P. Jarvis
                      </a>

                      <a href="#" className="notify-right-icon">
                        {/* <i className='bx bx-radio-circle-marked'></i> */}
                        <p className="time">lunes</p>
                        <i className="fas fa-circle text-green-lime position-relative fs-5"></i>
                        <span
                          className="position-absolute"
                          style={{
                            right: "21.5px",
                            color: "white",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            top: "4.83rem",
                          }}
                        >
                          1
                        </span>
                      </a>

                      <p className="time">
                        {/* <i className='bx bx-check'></i> */}
                        {/* 
                                      - check -> no llego porque no tiene internet o tiene apagado el celular
                                      - check-double -> le llego pero no lo havisto
                                      - check-double con color azul celeste -> le llego y lo vió
                              */}
                        {/* 
                                - texto en negrita -> nuevo mensaje
                                - texto en gris -> mensaje leido | Tú: texto del mensaje
                              */}
                        <i className="fas fa-check text-stroke-white"></i> This
                        party is going to have a DJ, food, and drinks.
                        <span> · </span>
                        <span className="text-muted">2 min</span>
                      </p>
                    </div>
                  </li>
                </div>
                <div className="notify-drop-footer text-center">
                  <Link to="/message">Ver mas</Link>
                </div>
              </ul>
            </li>
            <li className="nav-item s-nav dropdown notification">
              <Tooltip content="Notificaciones" placement="bottom">
                <a
                  href="#"
                  className="nav-link nav-links rm-drop-mobile drop-w-tooltip"
                  data-toggle="dropdown"
                  data-placement="bottom"
                  data-title="Notifications"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <img
                  src="/images/icons/navbar/notification.png"
                  className="notification-bell"
                  alt="navbar icon"
                /> */}
                  {/* <img
                  src="/fontAwesomeProIcons/bells.svg"
                  alt="Notificaciones en SlidesFace"
                /> */}
                  <i className="fas fa-bell fa-2x text-dark"></i>
                  <span className="badge rounded-circle bg-clear-red">1</span>
                </a>
              </Tooltip>
              <ul className="dropdown-menu notify-drop dropdown-menu-right nav-drop shadow-sm">
                <div className="notify-drop-title">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6 fs-8">
                      Notifications
                      <span className="badge badge-pill badge-primary ml-2">
                        3
                      </span>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                      <a href="#" className="notify-right-icon">
                        Mark All as Read
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- end notify title -->
                                    <!-- notify content --> */}
                <div className="drop-content">
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-10.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Sean
                      </a>
                      <span className="notification-type">
                        replied to your comment on a post in
                      </span>
                      <a href="#" className="notification-for">
                        PHP
                      </a>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bxs-group"></i>
                        </span>
                        3h
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-7.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Kimberly
                      </a>
                      <span className="notification-type">
                        likes your comment "I would really...
                      </span>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bxs-like"></i>
                        </span>
                        7h
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-8.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <span className="notification-type">
                        10 people saw your story before it disappeared. See who
                        saw it.
                      </span>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bx-images"></i>
                        </span>
                        23h
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-11.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Michelle
                      </a>
                      <span className="notification-type">posted in </span>
                      <a href="#" className="notification-for">
                        Argon Social Design System
                      </a>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bxs-quote-right"></i>
                        </span>
                        1d
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-5.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Karen
                      </a>
                      <span className="notification-type">
                        likes your comment "Sure, here...
                      </span>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bxs-like"></i>
                        </span>
                        2d
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <div className="notify-img">
                        <img
                          src="/images/users/user-12.png"
                          alt="notification user image"
                        />
                      </div>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                      <a href="#" className="notification-user">
                        Irwin
                      </a>
                      <span className="notification-type">posted in </span>
                      <a href="#" className="notification-for">
                        Themeforest
                      </a>
                      <a href="#" className="notify-right-icon">
                        <i className="bx bx-radio-circle-marked"></i>
                      </a>
                      <p className="time">
                        <span className="badge badge-pill badge-primary">
                          <i className="bx bxs-quote-right"></i>
                        </span>
                        3d
                      </p>
                    </div>
                  </li>
                </div>
                <div className="notify-drop-footer text-center">
                  <a href="#">See More</a>
                </div>
              </ul>
            </li>
            <li className="nav-item s-nav dropdown d-mobile">
              <a
                href="#"
                className="nav-link nav-links nav-icon drop-w-tooltip"
                data-toggle="dropdown"
                data-placement="bottom"
                data-title="Pages"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src="/images/icons/navbar/flag.png" alt="navbar icon" />
              </a>
              <div className="dropdown-menu dropdown-menu-right nav-drop">
                <a className="dropdown-item" href="newsfeed-2.html">
                  Newsfeed 2
                </a>
                <a className="dropdown-item" href="sign-in.html">
                  Sign in
                </a>
                <a className="dropdown-item" href="sign-up.html">
                  Sign up
                </a>
              </div>
            </li>
            <li className="nav-item s-nav d-mobile">
              <a
                href="marketplace.html"
                className="nav-link nav-links nav-icon drop-w-tooltip"
                data-placement="bottom"
                data-title="Marketplace"
              >
                <img src="/images/icons/navbar/market.png" alt="navbar icon" />
              </a>
            </li>
            <li className="nav-item s-nav nav-icon d-mobile d-flex align-items-center justify-content-center text-center">
              <Tooltip
                content="Mi perfil"
                placement="bottom"
                style={{ fontSize: "1rem" }}
              >
                <Link
                  to={`/profile/${auth.user._id}`}
                  data-title="Perfil"
                  className="nav-link settings-link rm-drop-mobile drop-w-tooltip bg-pill-shadow rounded-pill "
                >
                  <div className="menu-user-image">
                    {/* PROFILE PHOTO */}
                    <img
                      src={
                        auth.user.avatar
                          ? auth.user.avatar
                          : "https://res.cloudinary.com/solumobil/image/upload/v1639261011/user/icons8-usuario-masculino-en-c%C3%ADrculo-96_ipicdt.png"
                      }
                      style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
                      className="menu-user-img ml-1 nav-settings"
                      alt="Foto de perfil en SlidesFace"
                    />
                  </div>
                  <span className="text-dark fs-6 fw-bold m-1">
                    {auth.user.firstname}
                  </span>
                </Link>
              </Tooltip>
            </li>
            <li className="nav-item s-nav nav-icon dropdown">
              {/* BTN DROPDOWN SETTINGS AVATAR */}
              <a
                href="#"
                onClick={() =>
                  setShowSettings(showSettings == "show" ? " " : "show")
                }
                data-toggle="dropdown"
                data-placement="bottom"
                data-title="Settings"
                className="nav-link settings-link rm-drop-mobile drop-w-tooltip rounded-circle bg-shadow position-relative"
                style={{ height: "3rem", width: "3rem" }}
                id="settings-dropdown"
              >
                {/* <div className="menu-user-image"> */}
                {/* <img src={auth.user.avatar}
                    style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
                  className="menu-user-img ml-1 nav-settings" alt="Menu Image" /> */}
                {/* </div> */}
              </a>

              <i
                onClick={() =>
                  setShowSettings(showSettings == "show" ? " " : "show")
                }
                className="fas fa-sort-down bg-shadow-icon text-dark fa-sm position-absolute pointer"
              ></i>
              {/* END BTN DROPDOWN SETTINGS AVATAR */}

              <div
                className={`dropdown-menu dropdown-menu-right settings-dropdown shadow-sm ${showSettings}`}
                aria-labelledby="settings-dropdown"
              >
                <Link className="dropdown-item" to="/">
                  <img src="/images/icons/navbar/help.png" alt="Navbar icon" />
                  Soporte
                </Link>

                <a
                  className="dropdown-item d-table align-items-center dark-mode"
                  href="#"
                >
                  <img
                    className=""
                    src="/images/icons/navbar/moon.png"
                    alt="Navbar icon"
                  />

                  {/* <span className="position-absolute mt-1 pt-1">
                          Modo Oscuro
                        </span> */}

                  <div className="d-inline pointer">
                    <label
                      htmlFor="theme"
                      onClick={() =>
                        dispatch({
                          type: GLOBAL_TYPES.THEME,
                          payload: !theme,
                        })
                      }
                      // onClick={alternateTheme}
                      // ref={darkModeRef}
                      // id="themePoint"
                      className="pointer"
                    >
                      {theme ? "Modo Claro" : "Modo Oscuro"}
                    </label>
                    {/* <button type="button" className="btn btn-lg btn-toggle ml-auto" style={{ marginLeft: "auto" }} data-toggle="button" aria-pressed="false" autoComplete="off">
                              <div className="handle"></div>
                            </button> */}
                  </div>
                </a>
                <Link className="dropdown-item" to="/">
                  <img
                    src="/images/icons/navbar/gear-1.png"
                    alt="Navbar icon"
                  />
                  Configuración
                </Link>
                <Link
                  className="dropdown-item logout-btn"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  <img
                    src="/images/icons/navbar/logout.png"
                    alt="Navbar icon"
                  />
                  Salir
                </Link>
              </div>
            </li>
            <button
              type="button"
              className="btn border-0 nav-link shadow-none"
              id="menu-toggle"
            >
              {/* <img src="/images/icons/theme/navs.png" alt="Navbar navs" /> */}
              <i className="fas fa-bars text-dark fa-lg fw-bold"></i>
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
