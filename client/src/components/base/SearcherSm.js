import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

const SearcherSm = () => {

  const [searchsm, setSearchSm] = useState('')
  const [users, setUsers] = useState([])

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchsm && auth.token) {
      getDataAPI(`searchUser?q=${searchsm}`, auth.token)
        .then(res => {
          console.log(res);
          setUsers(res.data.users)
        })
        .catch(err => {
          console.log(err)
          dispatch({
            type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg ? err.response.data.msg : 'Error al buscar usuarios' + err }
          })
        })
    }
  }, [searchsm, auth.token, dispatch])

  return (
    <>
      <form className="d-inline form-inline w-100 px-4">
        <div className="input-group position-relative">

          <input type="text" name="searchsm"
            value={searchsm}
            id="searchsm"
            onChange={(e) => setSearchSm(e.target.value.toLowerCase().replace(/\s/g, ''))} className="form-control searchsm-input" placeholder="Buscar en SlidesFace" aria-label="Buscar" aria-describedby="searchsm-addon" />

          <div className="input-group-append">
            <button className="btn searchsm-button shadow-none" type="button">
              <i className='fas fa-searchsm'></i>
            </button>
          </div>

          <i onClick={() => setSearchSm('')} className={`p-2 fas fa-times position-absolute pointer ${searchsm ? ' ' : 'd-none'}`} style={{
            left: '86%',
            top: '0.6rem',
            zIndex: '10'
          }}></i>
        </div>
      </form>
    </>
  )
}

export default SearcherSm
