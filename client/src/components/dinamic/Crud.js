import { cloneElement, useEffect, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { postDataAPI, putDataAPI } from "../../utils/fetchData";
import { capFirstLetter, getRandomNum, sort, removeDuplicateWords } from "../../utils/functions";
import Approve from "../alert/Approve";
import MTable from './MTable';
import { Oval } from 'react-loader-spinner'
import Toast from "../alert/Toast";
import TextField from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import NumericInput from 'react-numeric-input';
import { Hint } from 'react-autocomplete-hint';


const Crud = ({ user, arr, limit, addstr, modelRef, forallusersflag, auth, model, fields, optional }) => {
  console.log()
  /**
   console.log('optional', optional)
   * optional
   *  - withModal
   *  -  tabletype(Advanced, Basic, list)
   *  - With Detail only for advanced table
   */
  // console.log(auth)
  let addRef = useRef()
  let inputsNewItemRef = useRef()
  let [addTitle, setAddTitle] = useState("")
  let [addTitleAlone, setAddTitleAlone] = useState("")
  let [addTxt, setAddTxt] = useState("Agregar")
  let [add, setAdd] = useState(false)
  let [showValidInputs, setShowValidInputs] = useState({ flag: false, str: '' })
  let [showLoader, setShowLoader] = useState(false)
  let [values, setValues] = useState(fields)
  let [readData, setReadData] = useState([])
  const [isArrFields, setIsArrFields] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [id, setId] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null)
  const dispatch = useDispatch();

  if (!model) model = 'user'
  if (!modelRef) modelRef = 'user'
  if (!forallusersflag) forallusersflag = false
  if (!optional) {
    optional = {
      withDetail: false,
      tabletype: 'list'
    }
  }

  const getItems = async () => {

    let getObj = { model, fieldsAndValues: values, fields }

    if (auth.user._id !== user._id)
      getObj.otherUser = user._id

    let res = await postDataAPI('getDataField', getObj, auth.token)
    console.log(res);
    if (res.data.data && res.data.data.length > 0) {
      console.log(res.data.data)
      res = sort(res.data.data)
      console.log(res)
      setReadData([...res])
      console.log(res)
    }

    console.log('readData', readData, readData.data, model);
  }

  useEffect(() => {
    /**
   *  Default validations
   */
    if (fields && Array.isArray(fields)) {
      setIsArrFields(true)
      console.log('isArrFields true')

      let errorFlag = { bool: false, msg: '' }
      fields.forEach(field => {
        if (field.hasOwnProperty('inputAndModelName')) {
          if (field['inputAndModelName'] == model) {
            errorFlag.bool = true;
            errorFlag.msg = `El modelo ${model} no puede ser igual al del campo ${field.hasOwnProperty('title') ? field.title : ''}`
            return console.error(errorFlag.msg)
          }
        }
      })

      if (errorFlag.bool == true) {
        return console.error(errorFlag.msg)
      }
    } else {
      setIsArrFields(false)
    }
    /**
   *  END -> Default validations
   */
  }, [])

  useEffect(() => {
    getItems()

    let addString = addstr ? 'Agrega ' : 'Agregar'
    setAddTxt(addString);
    let str = '', strAlone = '', fieldTitleSet = new Set();

    if (Array.isArray(fields)) {
      fields.forEach((field, index) => {
        fieldTitleSet.add(field.title)
      })
    } else {
      Object.values(addstr).forEach((field, index) => {
        fieldTitleSet.add(field)
      })
    }

    let setFieldsToArray = Array.from(fieldTitleSet), fieldLength = setFieldsToArray.length

    setFieldsToArray.forEach((fieldTit, index) => {
      if (fieldLength - 2 == index) {
        str += fieldTit + ' y '
      } else if (fieldLength - 1 == index) {
        str += fieldTit
      } else {
        str += fieldTit + ', '
      }
    })

    setAddTitle(addString + ' ' + str)
    strAlone = capFirstLetter(str)
    setAddTitleAlone(strAlone)
  }, [])

  let manyDinamicFieldsFlag = false;
  if (typeof fields !== undefined && typeof fields == 'object' && fields) {
    manyDinamicFieldsFlag = true
  } else {
    if (!fields)
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
            if (inputsNewItemRef.current.children[index].children[0] && inputsNewItemRef.current.children[index].children[0].type == 'text' && inputsNewItemRef.current.children[index].children[0].placeholder) {
              inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
            }
          })
        }
      }, 0.00001);
    }

    const saveItem = async () => {
      try {
        console.log('item to save or edit', values)
        let newValues = {}, newFields = [], tempObj = [];

        // PREVALIDATION VALUES
        Object.entries(values).map((val) => {
          if (typeof val[1] != 'object') newValues[val[0]] = val[1]
          else tempObj.push(val[1])
        })

        tempObj.map((val) => {
          Object.entries(values).map(valueObj => {
            if (val.inputAndModelName == valueObj[0]) {
              let newObj = {}
              newObj = val
              newObj["value"] = valueObj[1]
              newFields.push(newObj)
            }
          })
        })
        // if (val[1].inputAndModelName == val[0]) {
        //   newFields.push(val[0])
        // }
        // newFields.push(val[1])

        // VALIDAR CAMPOS VACIOS
        let entries = Object.entries(newValues)
        let resReturnFlag = false
        entries.map(input => {
          if (input[1] == '' || !input[1]) {
            resReturnFlag = true
            setShowValidInputs({ flag: true, str: 'Todos los campos son obligatorios' })
          }
        })
        if (resReturnFlag) return;
        // END VALIDAR CAMPOS VACIOS

        let res, newArr = []

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
          readData.forEach(row => newArr.push(row))
          newArr.push(values)
          setReadData(newArr);
          res = await postDataAPI('createField', { model, values, fields, newFields, modelRef, forallusersflag }, auth.token)
          await getItems()
        }

      } catch (error) {
        console.error(error)
      }
    }

    const handleChange = (e, objCustomInput = {}) => {

      console.log(e)
      console.log(objCustomInput)
      let inputAttrs = {}
      if (typeof e == 'string') {
        inputAttrs = objCustomInput
      } else {
        inputAttrs = e.target
      }

      const { name, value } = inputAttrs

      console.log(name, value);
      console.log(values);
      setValues({ ...values, [name]: value });

      // if (typeof e != 'string') {
      //   setTimeout(() => {
      //     let elemInp, flagInpText;
      //     // console.log(inputsNewItemRef.current.children)
      //     if (inputsNewItemRef.current && inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
      //       Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
      //         let elem = inputsNewItemRef.current.children[index].children[0]
      //         console.log(elem);
      //         if (elem.type == 'text') {
      //           flagInpText = true
      //           if (elem.name == name) elemInp = elem
      //           elem.placeholder = elem.placeholder.replace(/,/g, '')
      //         }
      //       })
      //     }
      //     // if (flagInpText && elemInp) elemInp.focus();
      //   }, 0.000001);
      // }


    }

    const handleEditItem = (item) => {
      // console.log(readData)
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setId(item._id);
      setAdd(true)

      let newObj = fields, isArrayObjFields = {}
      if (isArrFields || Array.isArray(fields)) {
        let newValues = []
        Object.entries(values).forEach(val => {
          newValues.push(val[1].inputAndModelName)
        })

        Object.keys(item).forEach(itemObjKey => {
          newValues.forEach(newValue => {
            if (itemObjKey == newValue) {
              isArrayObjFields[itemObjKey] = item[itemObjKey]
            }
          })
        })

        newObj = Object.assign({}, values, isArrayObjFields)

      } else {
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

      }

      console.log('newObj', newObj);

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

        }
      } catch (error) {
        console.error(error);
        throw error
      }
    };

    const handleCancelAdd = () => {
      setAdd(false);
      setId('');
    }

    let randomKey = () => getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString()

    console.log('fields', fields);

    const optionsTest = [
      { id: 1, label: "orange" },
      { id: '2', label: "banana asfsdfsdfsdfsdf sd fsdf sdf sd sd" },
      { id: 3, label: "apple" }
    ];

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
                  ?
                  (
                    isArrFields || Array.isArray(fields)
                      ?
                      fields.map((field) => ( // En construcción lo dinamico muy dinamico
                        <div className="col-12 my-1" key={randomKey()}>

                          {/* console.log() */}

                          {/* Tipos de campos (TEXT😉, NUMBER, DATE, DATETIME, SELECT(MULTIPLE), CHECKBOX, TOGGLE, RADIO BUTTON, RANGE INPUT) */}

                          {
                            ((field.inputType == 'triggerautoselect' && field.triggerArray && field.triggerArray.length > 0
                              && field.optionsObj && Object.keys(field.optionsObj).length > 0) &&
                              <TextField trigger={field.triggerArray} options={field.optionsObj} />)
                            //  trigger={[" ", "@@"]} options={{"@": ["aa", "ab", "abc", "abcd"], "@@": ["az", "ar"]}}
                          }

                          {
                            ((field.inputType == 'checkbox') &&
                              <label htmlFor={field.inputAndModelName} className="my-2 fw-bold">
                                <input
                                  type="checkbox"
                                  value={values[field.inputAndModelName]}
                                  id={field.inputAndModelName}
                                  name={field.inputAndModelName}
                                  onChange={handleChange}
                                  className="form-check-input"
                                />
                                &nbsp;{capFirstLetter(field.title)}
                              </label>)
                          }

                          {
                            ((field.inputType == 'select') &&
                              <div class="input-group mb-3">

                                <select
                                  aria-label="Example text with button addon" aria-describedby="button-addon1"
                                  value={values[field.inputAndModelName]}
                                  id={field.inputAndModelName}
                                  name={field.inputAndModelName}
                                  onChange={handleChange}
                                  required={field.required}
                                  className="form-select my-2"
                                  style={{ height: '50px' }}>
                                  <option selected value="">{capFirstLetter(field.title)}</option>
                                </select>

                                <button className="btn btn-sm btn-primary my-2 px-3" style={{ height: '50px' }} type="button" id="button-addon1">
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>)

                          }

                          {
                            ((field.inputType == 'number') &&
                              <NumericInput
                                value={values[field.inputAndModelName]}
                                id={field.inputAndModelName}
                                name={field.inputAndModelName}
                                onChange={e => handleChange("numericInput", {
                                  value: e,
                                  id: field.inputAndModelName,
                                  name: field.inputAndModelName
                                })}
                                min={field.hasOwnProperty('min') ? field.min : null}
                                max={field.hasOwnProperty('max') ? field.max : null}
                                className="form-control my-2"
                                placeholder={`Ingresa ${field.title}`} />)
                          }

                          {
                            ((field.inputType == 'text' || field.inputType == 'string' || !field.inputType) &&
                              <Hint options={optionsTest}>
                                <input
                                  type="text"
                                  value={values[field.inputAndModelName]}
                                  id={field.inputAndModelName}
                                  name={field.inputAndModelName}
                                  onChange={handleChange}
                                  className="form-control my-2"
                                  placeholder={`Ingresa ${field.title}`}
                                />
                              </Hint>
                            )
                          }

                        </div>
                      ))
                      :
                      (
                        Object.keys(fields).map((field) => ( // En construcción lo dinamico muy dinamico

                          <div className="col-12 my-1" key={randomKey()}>

                            {
                              field.inputType == 'select' &&
                              <select
                                value={values[field]}
                                id={field}
                                name={field}
                                onChange={handleChange}
                                className="form-select"
                              >
                                <option selected>
                                  {capFirstLetter(
                                    Object.entries(addstr).map(placeholder => {
                                      if (placeholder[0] == field)
                                        return (placeholder[1] != ',' ? placeholder[1].replace(/,/g, '') : '').replace(' - ', '').replace(" y", "y").replace(/,/g, '')
                                    })
                                  )}
                                </option>
                              </select>
                            }

                            {
                              field.inputType == 'text' || !field.inputType &&
                              <input
                                type="text"
                                value={values[field]}
                                id={field}
                                name={field}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={
                                  Object.entries(addstr).map(placeholder => {
                                    if (placeholder[0] == field)
                                      return ('Ingresa ' + (placeholder[1] != ',' ? placeholder[1].replace(/,/g, '') : '').replace(' - ', '').replace(" y", "y")).replace(/,/g, '')
                                  })
                                }
                              />
                            }
                          </div>
                        ))
                      )
                  )
                  :
                  // Nunca va a llegar acá
                  <div className="col-12 my-1">
                    <input type="text" value={values[Object.keys(fields)[0][0]]} id={Object.keys(fields)[0][0]} name={Object.keys(fields)[0][0]} onChange={handleChange}
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

          <div>
            {
              ((!forallusersflag && user && user.username === auth.user.username) && (readData.length < limit || !limit)) &&
              <a href="#" className={`h-100 d-flex align-items-center justify-content-start text-left ${add ? 'd-none' : ''}`} onClick={e => { newItem(e); setValues(fields); }}>
                <i className="fas fa-lg fa-plus-circle"></i>&nbsp;
                <span ref={addRef}>
                  {addTitle}
                </span>
              </a>
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
                                  isArrFields || Array.isArray(fields)
                                    ? fields.map((fieldMap, fieldIndex) => (
                                      <div key={randomKey()}>
                                        {console.log(item, fieldMap)}
                                        <p className={`fs-6 fw-semi-bold border-bottom ${fieldIndex > 0 ? 'mt-2' : ''} pb-0 mb-0 ${fieldIndex == 0 ? 'pt-2' :
                                          ''}`} style={{ wordWrap: 'break-word' }} key={randomKey()}>{item[isArrFields || Array.isArray(fields) ? fieldMap.inputAndModelName : fieldMap]}</p>
                                        <span className="fw-bold text-muted p-0 m-0 fs-8 fst-italic text-capitalize">
                                          {fieldMap && fieldMap.title && fieldMap.title.replace('un', '').trim()}
                                        </span>
                                      </div>
                                    ))
                                    : Object.keys(fields).map((fieldMap, fieldIndex) => (
                                      <div key={randomKey()}>
                                        <p className={`fs-6 fw-semi-bold border-bottom ${fieldIndex > 0 ? 'mt-2' : ''} pb-0 mb-0 ${fieldIndex == 0 ? 'pt-2' :
                                          ''}`} style={{ wordWrap: 'break-word' }} key={randomKey()}>{item[isArrFields || Array.isArray(fields) ? fieldMap : fieldMap]}</p>
                                        {
                                          <span className="fw-bold text-muted p-0 m-0 fs-8 fst-italic text-capitalize">
                                            {
                                              readData && readData.length > 0
                                                ? Object.entries(addstr).map(placeholder => {
                                                  return placeholder[0] == fieldMap
                                                    ? (Object.keys(addstr).length == 2 ? placeholder[1].replace('tu', '').replace('-', '').replace(' - ', '').replace(' ', '').replace('>', '').replace('y', '')
                                                      : placeholder[1].replace('tu', '')).replace('-', '').replace(' - ', '').replace(' ', '').replace('>', '').replace('y', '') : ''
                                                })
                                                : Object.entries(addstr).map(placeholder => {
                                                  return placeholder[0] == fieldMap
                                                    ? (Object.keys(addstr).length == 2
                                                      ? placeholder[1].replace('-', '').replace(' - ', '').replace(' ', '').replace('>', '').replace('y', '')
                                                      : placeholder[1]).replace('-', '').replace(' - ', '').replace(' ', '').replace('>', '').replace('y', '')
                                                    : ''
                                                })
                                            }
                                          </span>
                                        }

                                      </div>
                                    ))
                                  //  END READ
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