import { cloneElement, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";

const Crud = ({ arr, id, addstr, forallusers, auth, modelToAlter, withModal, callToActionCmp, callToActionCmpFlag }) => {

  console.log(arr, id)
  let addRef = useRef()
  let [add, setAdd] = useState(false)
  let isForAllUsers = false;

  if (forallusers && auth.user && auth.user.role == 'admin')
    isForAllUsers = true

  // Si no hay datos
  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {
    let newaddstr = addstr ? 'Agrega ' + addstr : 'Agregar'

    const newItem = e => {
      e.preventDefault()
      console.log(addRef.current)
      // addRef.current.classList.add('d-none')
      setAdd(true)

      // console.log(addRef.current.previousSibling)
      // addRef.current.previousSibling.classList.remove('d-none')
    }

    return (
      <>
        {/* d-flex */}
        <div className={`input-group ${add ? '' : 'd-none'}`}>
          <div className="col-12">
            <input type="text" id="addItem" className="form-control" placeholder={newaddstr} />
          </div>
          <div className="col-12 justify-content-center text-center mt-2">
            <Tooltip content="Guardar" placement="bottom">
              <button
                type="button"
                // onClick={submitSetIntro}
                className="btn btn-primary btn-sm text-initial"
              >
                <i className="fas fa-save"></i> Guardar
              </button>
            </Tooltip>
            <Tooltip content="Cancelar" placement="bottom">
              <button
                type="button"
                onClick={() => setAdd(false)}
                className="btn btn-danger btn-sm text-initial ms-2"
              >
                <i className="fas fa-window-close"></i> Cancelar
              </button>
            </Tooltip>
          </div>
        </div>

        {
          callToActionCmpFlag
            ? cloneElement(callToActionCmp, { ref: addRef, className: `${add ? 'd-none' : ''}`, onClick: newItem })
            : <a href="#" ref={addRef} className={`${add ? 'd-none' : ''}`} onClick={newItem}>{newaddstr}
            </a>
        }

      </>
    )
  }

  // Si si hay datos
  return (
    <div>Crud</div>
  )
}

export default Crud