import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

const Searcher = () => {

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (search && auth.token) {
      getDataAPI(`searchUser?q=${search}`, auth.token)
        .then(res => {
          console.log(res);
          setUsers(res.data.users)
        })
        .catch(err => {
          console.log(err)
          dispatch({
            type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg ? err.response.data.msg : 'Error al buscar usuario' + err }
          })
        })
    }
  }, [search, auth.token, dispatch])

  return (
    <>
      <form className="w-30 mx-2 my-auto d-inline form-inline mr-5 dropdown search-form">
        <div className="input-group position-relative" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="searchDropdown">

          <input
            type="text"
            name="search"
            value={search}
            id="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/\s/g, ''))}
            className="form-control search-input w-75"
            placeholder="Buscar en SlidesFace"
            aria-label="Buscar"
            aria-describedby="search-addon"
          />

          <div className="input-group-append">
            <button className="btn search-button shadow-none" type="button">
              <i className='fas fa-search'></i>
            </button>
          </div>

          <i onClick={() => setSearch('')} className={`p-2 fas fa-times position-absolute pointer ${search ? ' ' : 'd-none'}`} style={{
            left: '76%',
            top: '0.7rem',
            zIndex: '10'
          }}></i>
        </div>

        <ul className="dropdown-menu notify-drop nav-drop shadow-sm" aria-labelledby="searchDropdown">
          <div className="notify-drop-title">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6 fs-8">Resultados de búsqueda
                <span className="badge badge-pill badge-primary ml-2">29</span>
              </div>
            </div>
          </div>
          {/* <!-- end notify title -->

                                    <!-- notify content --> */}
          <div className="drop-content">
            <h6 className="dropdown-header">Personas</h6>
            <li className="dropdown-item">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="notify-img">
                  <img src="/images/users/user-6.png" alt="Search result" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <a href="#" className="notification-user">Susan P. Jarvis</a>
                <a href="#" className="btn btn-quick-link join-group-btn border text-right float-right">
                  Add Friend
                </a>
                <p className="time">6 Mutual friends</p>
              </div>
            </li>
            <li className="dropdown-item">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="notify-img">
                  <img src="/images/users/user-5.png" alt="Search result" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <a href="#" className="notification-user">Ruth D. Greene</a>
                <a href="#" className="btn btn-quick-link join-group-btn border text-right float-right">
                  Add Friend
                </a>
              </div>
            </li>
            <h6 className="dropdown-header">Groups</h6>
            <li className="dropdown-item">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="notify-img">
                  <img src="/images/groups/group-2.jpg" alt="Search result" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <a href="#" className="notification-user">Tourism</a>
                <a href="#" className="btn btn-quick-link join-group-btn border text-right float-right">
                  Join
                </a>
                <p className="time">2.5k Members 35+ post a week</p>
              </div>
            </li>
            <li className="dropdown-item">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="notify-img">
                  <img src="/images/groups/group-1.png" alt="Search result" />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <a href="#" className="notification-user">Argon Social Network <img src="/images/theme/verify.png" width="10px" className="verify" alt="Group verified" /></a>
                <a href="#" className="btn btn-quick-link join-group-btn border text-right float-right">
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
      </form>
    </>
  )
}

export default Searcher
