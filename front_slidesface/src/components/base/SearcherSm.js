import React, { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { GLOBAL_TYPES } from "../../redux/actions/globalTypes"
import { getDataAPI } from "../../utils/fetchData"

const SearcherSm = () => {
  const [searchsm, setSearchSm] = useState("")
  const [users, setUsers] = useState([])
  const [usersCount, setUsersCount] = useState(0)
  const [noUsersFound, setNoUsersFound] = useState(false)

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchsm && auth.token) {
      getDataAPI(`searchUser?q=${searchsm}`, auth.token)
        .then((res) => {
          console.log(res)
          setUsers(res.data.users)
        })
        .catch((err) => {
          console.log(err)
          if (usersCount <= 0) {
            dispatch({
              type: GLOBAL_TYPES.ALERT,
              payload: {
                error: err.response.data.msg
                  ? err.response.data.msg
                  : "Error al buscar usuario" + err,
              },
            })
          }
        })
    } else {
      setUsers([])
      setUsersCount(0)
      setNoUsersFound(true)
    }
  }, [searchsm, auth.token, dispatch])

  return (
    <>
      <form className="d-inline form-inline w-100 px-4" autoComplete="off">
        <div className="input-group position-relative">
          <input
            type="text"
            name="searchsm"
            value={searchsm}
            id="searchsm"
            autoComplete="off"
            onChange={(e) => setSearchSm(e.target.value)}
            className="form-control searchsm-input"
            placeholder="Buscar en SlidesFace"
            aria-label="Buscar"
            aria-describedby="searchsm-addon"
          />

          <div className="input-group-append">
            <button className="btn searchsm-button shadow-none" type="button">
              <i className="fas fa-searchsm" />
            </button>
          </div>

          <i
            onClick={() => setSearchSm("")}
            className={`p-2 fas fa-times position-absolute pointer ${
              searchsm ? " " : "d-none"
            }`}
            style={{
              left: "86%",
              top: "0.6rem",
              zIndex: "10",
            }}
           />
        </div>

        {/* RESULTADOS BUSCADOR */}
        <ul
          className={`dropdown-menu notify-drop nav-drop shadow-sm ${
            searchsm ? "show" : " "
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
            <h6 className="dropdown-header">Personas</h6>

            {!noUsersFound ? (
              searchsm &&
              users.map((user) => (
                <li key={user._id} className="dropdown-item px-3 py-2">
                  <Link to={`/${user.username}`}>
                    <div className="col-md-2 col-sm-2 col-xs-2 align-items-center d-flex h-100">
                      <div className="notify-img m-0 align-items-center d-flex h-100">
                        <img
                          src={user.avatar}
                          alt={`Añadir a ${user.fullname} cómo ${
                            user.gender == "male" ? "amigo" : "amiga"
                          } en SlidesFace`}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="col-md-10 col-sm-10 col-xs-10 align-items-center d-flex h-100 justify-content-between">
                    <a href="#" className="notification-user">
                      {user.fullname}
                    </a>
                    <button className="bg-clear-red btn btn-sm rounded-circle float-end btn-quick-link join-group-btn border">
                      <i className="fas fa-user-plus fa-xs text-white" />
                    </button>
                    {/* <p className="time">6 Mutual friends</p> */}
                  </div>
                </li>
              ))
            ) : (
              <li className="dropdown-item px-3">
                <span>Sin personas coincidentes</span>
              </li>
            )}

            <h6 className="dropdown-header">Grupos</h6>

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
            </li>
          </div>
          <div className="notify-drop-footer text-center">
            <a href="#">See More</a>
          </div>
        </ul>
        {/* END RESULTADOS BUSCADOR */}
      </form>
    </>
  )
}

export default SearcherSm
