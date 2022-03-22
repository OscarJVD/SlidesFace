import { cloneElement, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { postDataAPI } from "../../utils/fetchData";

const Crud = ({ arr, addstr, forallusers, forallusersflag, auth, modelToAlter, fields, withModal, callToActionCmp, callToActionCmpFlag }) => {

  console.log(auth)
  let addRef = useRef()
  let [add, setAdd] = useState(false)
  let [values, setValues] = useState(fields)

  // const { defaultVal } = values

  // Uno o mas campos predefinidos dinamicos
  let manyDinamicFieldsFlag = false;
  if (typeof fields !== undefined && typeof fields == 'object' && Object.keys(fields).length > 1) {
    manyDinamicFieldsFlag = true
  } else {
    if (!Object.keys(fields)[0])
      return <span className="text-danger">INGRESA EL ID DEL CAMPO POR DEFECTO QUE SE VA A GENERAR DINAMICAMENTE</span>
  }

  // console.log(arr, id)
  // let isForAllUsers = false;

  if (!modelToAlter) modelToAlter = 'Users'

  // if (forallusers && auth.user && auth.user.role == 'admin' && forallusersflag)
  //   isForAllUsers = true
  console.log('auth.token', auth, typeof auth)

  // Si no hay datos
  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {
    let newaddstr = addstr ? 'Agrega ' + addstr : 'Agregar'

    const newItem = e => {
      e.preventDefault()
      setAdd(true)
    }

    const saveItem = async () => {

      console.log('values', values)
      let res;
      // if (!manyDinamicFieldsFlag) {
      //   res = await postDataAPI('createField', { modelToAlter, fieldname, values, forallusersflag }, auth.token)
      // } else {
      // Muchos inputs -> arreglo fields
      res = await postDataAPI('createField', { modelToAlter, fields, values, forallusersflag }, auth.token)
      // }

      console.log('res', res);
    }

    const handleChange = e => {
      const { name, value } = e.target;

      console.log(name, value);
      setValues({ ...values, [name]: value });
    }

    return (
      <>
        {/* d-flex */}
        <div className={`input-group ${add ? '' : 'd-none'}`}>
          {
            manyDinamicFieldsFlag
              ? Object.keys(fields).map(field => ( // En construcción lo dinamico muy dinamico
                <div className="col-12">
                  <input type="text" value={values[field]} id={field} name={field} onChange={handleChange}
                    className="form-control" placeholder={newaddstr} />
                </div>
              ))
              : <div className="col-12">
                <input type="text" value={values[Object.keys(fields)[0]]} id={Object.keys(fields)[0]} name={Object.keys(fields)[0]} onChange={handleChange}
                  className="form-control" placeholder={newaddstr} />
              </div>
          }


          <div className="col-12 justify-content-center text-center mt-2">
            <Tooltip content="Guardar" placement="bottom">
              <button
                type="button"
                onClick={saveItem}
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