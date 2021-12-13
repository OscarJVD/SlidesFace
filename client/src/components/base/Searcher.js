import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import { Link } from "react-router-dom";

const Searcher = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    if (search && auth.token) {
      setLoad(true);
      getDataAPI(`searchUser?q=${search}`, auth.token)
        .then((res) => {
          // console.log(res);

          if (res.data.users !== "empty") {
            setUsers(res.data.users);
            setUsersCount(res.data.users.length);
            if (res.data.users.length === 0) {
              setNoUsersFound(true);
            } else {
              setNoUsersFound(false);
            }
          } else {
            setUsers([]);
            setUsersCount(0);
            setNoUsersFound(true);
          }
          setLoad(false);
        })

        // COMENTAR AL ACABAR S.F
        .catch((err) => {
          // if (res.data.users.length === 0) {
          //   setNoUsersFound(true);
          //   return;
          // } else {
          //   setNoUsersFound(false);
          // }
          console.log(usersCount);
          // alert(err.response.data.code);
          if (usersCount <= 0) {
            dispatch({
              type: GLOBAL_TYPES.ALERT,
              payload: {
                error: err.response.data.msg
                  ? err.response.data.msg
                  : "Error al buscar usuario" + err,
              },
            });
          }
        });

      setLoad(false);
    } else {
      setUsers([]);
      setUsersCount(0);
      setNoUsersFound(true);
    }
  }, [search, auth.token, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search && auth.token) {
      getDataAPI(`searchUser?q=${search}`, auth.token)
        .then((res) => {
          console.log(res);

          if (res.data.users !== "empty") {
            setUsers(res.data.users);
            setUsersCount(res.data.users.length);
            if (res.data.users.length === 0) {
              setNoUsersFound(true);
            } else {
              setNoUsersFound(false);
            }
          } else {
            setUsers([]);
            setUsersCount(0);
            setNoUsersFound(true);
          }
        })
        .catch((err) => {
          // if (res.data.users.length === 0) {
          //   setNoUsersFound(true);
          //   return;
          // } else {
          //   setNoUsersFound(false);
          // }
          console.log(usersCount);
          // alert(err.response.data.code);
          if (usersCount <= 0) {
            dispatch({
              type: GLOBAL_TYPES.ALERT,
              payload: {
                error: err.response.data.msg
                  ? err.response.data.msg
                  : "Error al buscar usuario" + err,
              },
            });
          }
        });
    } else {
      setUsers([]);
      setUsersCount(0);
      setNoUsersFound(true);
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        className="w-30 mx-2 my-auto d-inline form-inline mr-5 dropdown search-form"
        onSubmit={handleSearch}
      >
        <div
          className="input-group position-relative"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="searchDropdown"
        >
          <input
            type="text"
            name="search"
            value={search}
            id="search"
            autoComplete="off"
            // autoComplete="new-password"
            onChange={(e) => setSearch(e.target.value)}
            className="form-control search-input w-75"
            placeholder="Buscar en SlidesFace"
            aria-label="Buscar"
            aria-describedby="search-addon"
          />

          <div className="input-group-append">
            <button className="btn search-button shadow-none">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <i
            onClick={() => setSearch("")}
            className={`p-2 fas fa-times position-absolute pointer ${
              search ? " " : "d-none"
            }`}
            style={{
              left: "76%",
              top: "0.7rem",
              zIndex: "10",
            }}
          ></i>
        </div>

        {/* RESULTADOS BUSCADOR */}
        <ul
          className={`shadow dropdown-menu notify-drop nav-drop ${
            search ? "show" : " "
          }`}
          aria-labelledby="searchDropdown"
        >
          <div className="notify-drop-title">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6 fs-8">
                Resultados de búsqueda
                <span className="badge rounded-pill bg-primary ms-2">
                  {usersCount}
                </span>
              </div>
            </div>
          </div>
          {/* <!-- end notify title -->

                                    <!-- notify content --> */}
          <div className="drop-content">
            <h6 className="dropdown-header">Usuarios</h6>

            <li className={`${load ? " " : "d-none"}`}>
              <div className="container container-center h-auto">
                <div className="loader">
                  <div className="loader-shap"></div>
                  <div className="loader-shap"></div>
                  <div className="loader-shap"></div>
                </div>
              </div>
            </li>

            {!noUsersFound ? (
              search &&
              users.map((user) => (
                <li key={user._id} className="dropdown-item px-3 py-2">
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={() => setSearch("")}
                  >
                    <div className="col-md-2 col-sm-2 col-xs-2 align-items-center d-flex h-100">
                      <div className="notify-img m-0 align-items-center d-flex h-100">
                        <img
                          src={
                            user.avatar
                              ? user.avatar
                              : "https://res.cloudinary.com/solumobil/image/upload/v1639261011/user/icons8-usuario-masculino-en-c%C3%ADrculo-96_ipicdt.png"
                          }
                          alt={`Añadir a ${user.fullname} cómo ${
                            user.gender == "male" ? "amigo" : "amiga"
                          } en SlidesFace`}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="col-md-10 col-sm-10 col-xs-10 align-items-center d-flex h-100 justify-content-between">
                    <Link
                      to={`/profile/${user._id}`}
                      onClick={() => setSearch("")}
                      className="notification-user fs-6 "
                    >
                      {user.fullname}
                    </Link>
                    <button className="bg-clear-red btn btn-sm rounded-circle float-end btn-quick-link join-group-btn border">
                      <i className="fas fa-user-plus fa-xs text-white"></i>
                    </button>
                    {/* <p className="time">6 Mutual friends</p> */}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3">
                <span>Sin usuarios coincidentes</span>
              </li>
            )}

            {/* <h6 className="dropdown-header">Grupos</h6>
            <li className="dropdown-item">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="notify-img">
                  <img src="/images/groups/group-1.png" alt="Search result" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <a href="#" className="notification-user">
                  Argon Social Network{" "}
                  <img
                    src="/images/theme/verify.png"
                    width="10px"
                    className="verify"
                    alt="Group verified"
                  />
                </a>
                <a
                  href="#"
                  className="btn btn-quick-link join-group-btn border text-right float-right"
                >
                  Join
                </a>
                <p className="time">10k Members 20+ post a week</p>
              </div>
            </li> */}
          </div>
          <div className="notify-drop-footer text-center">
            <a href="#">Ver mas</a>
          </div>
        </ul>
        {/* END RESULTADOS BUSCADOR */}
      </form>
    </>
  );
};

export default Searcher;
