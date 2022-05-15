import { cloneElement, useEffect, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { postDataAPI, putDataAPI } from "../../utils/fetchData";
import { capFirstLetter, getRandomNum, sort, removeDuplicateWords } from "../../utils/functions";
import Approve from "../alert/Approve";
import MTable from './MTable';
import { Oval } from 'react-loader-spinner'
import Toast from "../alert/Toast";
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";

const Crud = ({ user, arr, limit, addstr, modelRef, forallusersflag, auth, model, fields, optional, callToActionCmp, callToActionCmpFlag }) => {

  /**
   console.log('optional', optional)
   * optional
   *  - withModal
   *  -  tabletype(Advanced, Basic, list)
   *  - With Detail only for advanced table
   */
  // console.log(auth)
  let addRef = useRef()
  let strAddItemRef = useRef()
  let inputsNewItemRef = useRef()
  let [addTitle, setAddTitle] = useState("")
  let [addTitleAlone, setAddTitleAlone] = useState("")
  let [addTxt, setAddTxt] = useState("Agregar")
  let [add, setAdd] = useState(false)
  let [showValidInputs, setShowValidInputs] = useState({ flag: false, str: '' })
  let [showLoader, setShowLoader] = useState(false)
  let [values, setValues] = useState(fields)
  let [readData, setReadData] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [id, setId] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null)
  const dispatch = useDispatch();

  if (!model) model = 'user'
  if (!modelRef) modelRef = 'user'
  if (!forallusersflag) forallusersflag = false
  if (!optional)
    optional = {
      withDetail: false,
      tabletype: 'list'
    }

  const fixAddStr = () => {
    if (addRef.current) addRef.current.textContent = addRef.current.textContent.replace(/,/g, '')

    if (strAddItemRef.current.children && strAddItemRef.current.children.length > 0) {
      Array.from(strAddItemRef.current.children).forEach((atag, index) => {
        // console.log(strAddItemRef.current.children[index]);
        if (strAddItemRef.current.children[index].span) {
          strAddItemRef.current.children[index].span.textContent = strAddItemRef.current.children[index].textContent.replace(/,/g, '')
        }
        // else{
        //     strAddItemRef.current.children[index].remove()
        // }

        // if(strAddItemRef.current.children[index] && !strAddItemRef.current.children[index].span){
        //   // strAddItemRef.current.removeChild(strAddItemRef.current.children[index])

        // }
      })


    }
  }

  const getItems = async () => {
    fixAddStr();

    let getObj = { model, fieldsAndValues: values, fields }

    if (auth.user._id !== user._id) {
      getObj.otherUser = user._id
    }

    let res = await postDataAPI('getDataField', getObj, auth.token)
    console.log(res);
    if (res.data.data && res.data.data.length > 0) {
      console.log(res.data.data)
      res = sort(res.data.data)
      console.log(res)
      setReadData(res)
    }

    fixAddStr();

    // console.log(inputsNewItemRef)
    console.log('readData', readData);
  }

  // aca esta el error
  useEffect(() => {
    getItems()
    console.log('readData', readData);

    let addString = addstr ? 'Agrega ' : 'Agregar'
    setAddTxt(addString);

    console.log(addString, addTxt)

    let str = '', strAlone = ''
    Object.keys(fields).map((field, index) => {

      if (readData && readData.length > 0) {
        strAlone += Object.entries(addstr).map(placeholder => {
          return placeholder[0] == field
            ? (Object.keys(addstr).length == 2
              ? placeholder[1].replace('tu', 'un').replace('-', 'y')
              : placeholder[1].replace('tu', 'un'))
            : ''
        })

        str += (index == 0 ? addTxt : '') + ' ' + strAlone

      } else {
        strAlone += Object.entries(addstr).map((placeholder, index2) => {
          return placeholder[0] == field
            ? (Object.keys(addstr).length == 2
              ? placeholder[1].replace('-', 'y')
              : placeholder[1])
            : ''
        })
      }

      str += (index == 0 ? addTxt : '') + ' ' + strAlone
    })

    console.log(Object.entries(addstr))
    str = removeDuplicateWords(str)
    setAddTitle(str)
    strAlone = capFirstLetter(strAlone)
    setAddTitleAlone(strAlone)
  }, [])

  let manyDinamicFieldsFlag = false;
  if (typeof fields !== undefined && typeof fields == 'object' && Object.keys(fields).length > 1) {
    manyDinamicFieldsFlag = true
  } else {
    if (!Object.keys(fields)[0])
      return <span className="text-danger">INGRESA EL ID DEL CAMPO POR DEFECTO QUE SE VA A GENERAR DINAMICAMENTE</span>
  }

  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {

    const newItem = e => {
      e.preventDefault()
      setAdd(true)
      setId('')

      setTimeout(() => {
        console.log(inputsNewItemRef.current.children)
        if (inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            if (inputsNewItemRef.current.children[index].children[0] && inputsNewItemRef.current.children[index].children[0].placeholder) {
              inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
            }
          })
        }
      }, 0.00001);
    }

    const saveItem = async () => {
      try {
        console.log('item to save or edit', values)
        // VALIDAR CAMPOS VACIOS
        let entries = Object.entries(values)
        let resReturnFlag = false
        entries.map(input => {
          if (input[1] == '' || !input[1]) {
            resReturnFlag = true
            setShowValidInputs({ flag: true, str: 'Todos los campos son obligatorios' })
          }
        })

        setTimeout(() => {
          fixAddStr()
        }, 0.00001);

        if (resReturnFlag) return;
        // END VALIDAR CAMPOS VACIOS

        let res;
        let newArr = []

        if (id) {
          let idToEdit = id
          setAdd(false);
          setId('')

          newArr = []
          readData.forEach(row => {
            if (row._id == idToEdit) {
              Object.keys(values).forEach(key => {
                row[key] = values[key]
              })
              newArr.push(row)
            } else {
              newArr.push(row)
            }
          })

          setReadData(newArr);

          res = await putDataAPI(`editRow/${idToEdit}`, { model, values, forallusersflag }, auth.token)
          await getItems()
        } else {
          setAdd(false);
          setId('')
          newArr = []
          readData.forEach(row => {
            newArr.push(row)
          })

          newArr.push(values)

          setReadData(newArr);

          res = await postDataAPI('createField', { model, values, fields, modelRef, forallusersflag }, auth.token)
          await getItems()
        }

        setTimeout(() => {
          fixAddStr()
        }, 0.00001);

      } catch (error) {
        console.error(error)
      }
    }

    const handleChange = e => {

      const { name, value } = e.target;

      console.log(name, value);
      setValues({ ...values, [name]: value });

      setTimeout(() => {
        let elemInp;
        console.log(inputsNewItemRef.current.children)
        if (inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            let elem = inputsNewItemRef.current.children[index].children[0]
            console.log(elem);
            if (elem.name == name) elemInp = elem
            elem.placeholder = elem.placeholder.replace(/,/g, '')
          })
        }
        elemInp.focus();
      }, 0.000001);

    }

    const handleEditItem = (item, field) => {
      console.log(readData)
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setId(item._id);
      setAdd(true)

      setTimeout(() => {
        console.log(inputsNewItemRef.current.children)
        if (inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
          })
        }
      }, 5);

      let newObj = fields
      Object.keys(item).forEach(key => {
        if (fields.hasOwnProperty(key)) {
          newObj[key] = item[key]
        }
      })

      Object.keys(fields).forEach(key => {
        if (!item.hasOwnProperty(key)) {
          newObj[key] = ''
        }
      })

      setValues(newObj)
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleDialogClose = () => {
      setOpen(false);
    };

    const prepareDeleteItem = (item) => {
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setItemToDelete(item)
      handleClickOpen()
    };

    const handleDelete = async (action) => {
      try {
        // await getItems()
        console.log(action)
        if (action == 'cancel') {
          setItemToDelete(null)
          handleDialogClose()
        } else {
          setShowLoader(true)
          // ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO
          let newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })
          setReadData(newArr);
          // END ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO

          handleDialogClose()
          console.log(itemToDelete)
          if (!itemToDelete) return console.error('Error, item no encontrado')
          if (!itemToDelete || !itemToDelete._id) {
            setTimeout(async () => {
              await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
            }, 1000);
          }
          await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
          await getItems()
          setShowLoader(false)

          // ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO
          newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })
          setReadData(newArr);
          // END ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO
          setTimeout(() => {
            fixAddStr();
          }, 0.00001);

        }
      } catch (error) {
        console.error(error);
        throw error
      }
    };

    const handleCancelAdd = () => {
      setAdd(false);
      setId('');
      setTimeout(() => {
        fixAddStr();
      }, 0.00001);
    }

    // console.log(auth.user._id, user._id);
    // console.log(user.username, auth.user.username, user);
    // console.log(forallusersflag);
    let randomKey = () => getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString()

    return (
      <>

        <div className="w-100">
          {showValidInputs.flag && (
            <Toast
              msg={{ title: showValidInputs.str, body: "" }}
              handleShow={() => {
                setShowValidInputs(false);
                dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
              }}
              bgColor="bg-danger"
              onlyTitle={true}
            />
          )}

          <Approve
            desc={`¿Estás seguro de que desea eliminar la fila ${itemToDelete && Object.values(itemToDelete)[1] ? 'con id terminado en: ...' + Object.values(itemToDelete)[1].slice(19, Object.values(itemToDelete)[1].length) + '?' : ''}`}
            isOpen={isOpen}
            handleClose={handleDialogClose}
            handleAction={handleDelete}
          />

          <div className={`input-group ${add ? '' : 'd-none'}`}>

            {/* INPUTS */}
            <div ref={inputsNewItemRef} className="justify-content-center" style={{ display: 'contents' }}>
              {
                manyDinamicFieldsFlag
                  ? Object.keys(fields).map((field, index) => ( // En construcción lo dinamico muy dinamico

                    <div className="col-12 my-1" key={randomKey()}>
                      <input type="text" value={values[field]} id={field} name={field} onChange={handleChange}
                        className="form-control"

                        placeholder={Object.entries(addstr).map(placeholder => {
                          if (placeholder[0] == field)
                            return ('Ingresa ' + (placeholder[1] != ',' ? placeholder[1].replace(/,/g, '') : '').replace(' - ', '').replace(" y", "y")).replace(/,/g, '')
                        })}
                      />
                    </div>
                  ))
                  :
                  <div className="col-12 my-1">
                    <input type="text" value={values[Object.keys(fields)[0]]} id={Object.keys(fields)[0]} name={Object.keys(fields)[0]} onChange={handleChange}
                      className="form-control"
                      placeholder={`Ingresa ${Object.entries(addstr)[0][1].replace(/,/g, '')}`}
                    />
                  </div>
              }
            </div>
            {/* END INPUTS */}

            {/* SAVE - EDIT - CANCEL BUTTON */}
            <div className="col-12 justify-content-center text-center mt-2 mb-3">
              <Tooltip content="Guardar" placement="bottom">
                <button
                  type="button"
                  onClick={saveItem}
                  className={`btn btn-${id ? 'warning' : 'primary'} btn-sm text-initial`}
                >
                  <i className={`fas fa-${id ? 'edit' : 'save'}`}></i> {id ? 'Editar' : 'Guardar'}
                </button>
              </Tooltip>
              <Tooltip content="Cancelar" placement="bottom">
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="btn btn-danger btn-sm text-initial ms-2"
                >
                  <i className="fas fa-window-close"></i> Cancelar
                </button>
              </Tooltip>
            </div>
          </div>
          {/* END SAVE - EDIT - CANCEL BUTTON */}

          <div ref={strAddItemRef}>
            {
              ((!forallusersflag && user && user.username === auth.user.username) && (readData.length < limit || !limit)) &&
              <a href="#" className={`h-100 d-flex align-items-center justify-content-start text-left ${add ? 'd-none' : ''}`} onClick={e => { newItem(e); setValues(fields); }}>
                <i className="fas fa-lg fa-plus-circle"></i>&nbsp;
                <span ref={addRef}>
                  {addTitle}
                </span>
              </a>
              // (Object.keys(fields).map((field, index) => (
              //   callToActionCmpFlag
              //     ? cloneElement(callToActionCmp, { ref: addRef, className: `${add ? 'd-none' : ''}`, onClick: newItem })
              //     : <a key={randomKey()} href="#" className={`${add ? 'd-none' : ''}`}
              //       onClick={e => { newItem(e); setValues(fields); }}>
              //       <i className="fas fa-plus-circle"></i>
              //       <span ref={addRef}>
              //         {Object.keys(fields).length > 1 && index > 0 && addTitle}
              //         {Object.keys(fields).length == 1 && addTitle}
              //       </span>
              //     </a>
              // )))
            }
          </div>

          {
            !forallusersflag &&
            <>
              {
                (readData && readData.length > 0) ?
                  <div className="mt-2 w-100">
                    {
                      optional.tabletype == 'list' &&
                      <>
                        {
                          !showLoader && readData.map((item, index) => (
                            <div className="row w-100 ms-1 my-2 border card-crud p-2" style={{ overflow: 'hidden' }} key={randomKey()}>
                              <div className={`mb-2 col-${(!forallusersflag && user && user.username !== auth.user.username) ? '12' : '9'}`}>
                                {
                                  // INFORMACIÓN (READ)
                                  Object.keys(fields).map((field, fieldIndex) => (
                                    <div key={randomKey()}>
                                      <p className={`fs-6 fw-semi-bold border-bottom ${fieldIndex > 0 ? 'mt-2' : ''} pb-0 mb-0 ${fieldIndex == 0 ? 'pt-2' :
                                        ''}`} style={{ wordWrap: 'break-word' }} key={randomKey()}>{item[field]}</p>
                                      <span className="fw-bold text-muted p-0 m-0 fs-8 fst-italic text-capitalize">
                                        {
                                          readData && readData.length > 0
                                            ? Object.entries(addstr).map(placeholder => {
                                              return placeholder[0] == field
                                                ? (Object.keys(addstr).length == 2 ? placeholder[1].replace('tu', '').replace('-', '')
                                                  : placeholder[1].replace('tu', '')) : ''
                                            })
                                            : Object.entries(addstr).map(placeholder => {
                                              return placeholder[0] == field
                                                ? (Object.keys(addstr).length == 2
                                                  ? placeholder[1].replace('-', '')
                                                  : placeholder[1])
                                                : ''
                                            })
                                        }
                                      </span>
                                    </div>
                                  ))
                                }
                              </div>

                              {
                                !forallusersflag && user && user.username === auth.user.username && <>
                                  <div className="justify-content-center text-
                              center d-flex align-items-center col-3" key={randomKey()}>
                                    <div className="row align-items-center text-center justify-content-center d-flex">

                                      <div className="w-100 col-md-12 align-items-center text-center justify-content-center d-flex">
                                        <Tooltip content={`Editar fila`} placement="left" className="float-end" style={{ float: 'right' }}>
                                          <i className="text-center border border-warning justify-content-center h-100 align-items-center d-flex edit-crud-btn  w-100 btn fas float-end fa-edit text-warning pointer"
                                            onClick={() => handleEditItem(item)}></i>
                                        </Tooltip>
                                      </div>

                                      <div className="w-100 col-md-12 mt-2 align-items-center text-center justify-content-center d-flex">
                                        <Tooltip content={`Eliminar fila`} placement="left" className="float-end" style={{ float: 'right' }}>
                                          <i style={{
                                            paddingRight: '0.86rem',
                                            paddingLeft: '0.86rem'
                                          }} className="delete-crud-button border border-danger text-center justify-content-center w-100 btn fas h-100 align-items-center d-flex float-end ms-2 fa-trash text-danger pointer"
                                            onClick={() => { prepareDeleteItem(item); }}
                                          ></i>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              }

                            </div>
                          ))
                        }

                        <div className={`d-flex justify-content-center ${showLoader ? ' ' : 'd-none'}`}>
                          <Oval
                            height="70"
                            width="70"
                            color='grey'
                            ariaLabel={`Cargando ${addTitleAlone}`}
                          />
                        </div>

                      </>
                    }

                  </div>
                  : <span className="fw-bolder fs-6 text-muted">Sin información disponible</span>
              }</>
          }

        </div>

      </>
    )
  }
}

export default Crud