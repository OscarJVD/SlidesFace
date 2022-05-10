import { cloneElement, useEffect, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { deleteDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";
import { capFirstLetter, getEsDate, getRandomNum, sort } from "../../utils/functions";
import Approve from "../alert/Approve";
import MTable from './MTable';
import random from 'random-key-generator'
import { nanoid } from 'nanoid'

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
  let [add, setAdd] = useState(false)
  let [values, setValues] = useState(fields)
  let [readData, setReadData] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [id, setId] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null)

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
        strAddItemRef.current.children[index].textContent = strAddItemRef.current.children[index].textContent.replace(/,/g, '')
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

  useEffect(() => {
    getItems()
    console.log('readData', readData);
  }, [])

  // Uno o mas campos predefinidos dinamicos
  let manyDinamicFieldsFlag = false;
  if (typeof fields !== undefined && typeof fields == 'object' && Object.keys(fields).length > 1) {
    manyDinamicFieldsFlag = true
  } else {
    if (!Object.keys(fields)[0])
      return <span className="text-danger">INGRESA EL ID DEL CAMPO POR DEFECTO QUE SE VA A GENERAR DINAMICAMENTE</span>
  }

  let newaddstr = 'Agregar'
  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {
    newaddstr = addstr ? 'Agrega ' : 'Agregar'

    const newItem = e => {
      e.preventDefault()
      setAdd(true)
      setId('')

      setTimeout(() => {
        console.log(inputsNewItemRef.current.children)
        if (inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
          })
        }
      }, 0.00001);
    }

    const saveItem = async () => {
      try {
        console.log('item to save or edit', values)
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

      } catch (error) {
        console.error(error)
      }
    }

    const handleChange = e => {

      const { name, value } = e.target;

      console.log(name, value);
      setValues({ ...values, [name]: value });

      setTimeout(() => {
        console.log(inputsNewItemRef.current.children)
        if (inputsNewItemRef.current.children && inputsNewItemRef.current.children.length > 0) {
          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
          })
        }
      }, 0.00001);
    }

    const handleEditItem = (item, field) => {
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

    const handleDeleteItem = (item) => {
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setItemToDelete(item)
      handleClickOpen()
    };

    const handleAction = async (action) => {
      try {
        // await getItems()
        console.log(action)
        if (action == 'cancel') {
          setItemToDelete(null)
          handleDialogClose()
        } else {
          let newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })

          setReadData(newArr);
          handleDialogClose()
          console.log(itemToDelete)
          console.log(auth.token);
          if (!itemToDelete) return console.error('Error, item no encontrado')
          if (!itemToDelete || !itemToDelete._id) {
            setTimeout(async () => {
              await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
            }, 1000);
          }
          await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
          await getItems()
          newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })

          setReadData(newArr);
        }
      } catch (error) {
        console.error(error);
        throw error
      }
    };

    const hoverTitles = () => {
      console.log(strAddItemRef.current.children)
      // let arrChildren = Array.from(strAddItemRef.current.children)
      // let count = arrChildren.length
      // let mouseoverEvent = new Event('mouseover');
      // strAddItemRef.current.children[0].dispatchEvent(mouseoverEvent)
      // strAddItemRef.current.children[1].dispatchEvent(mouseoverEvent)

      // let event = new MouseEvent('mouseover', {
      //   // 'view': window,
      //   'bubbles': true,
      //   // 'cancelable': false
      // });

      // var evObj = document.createEvent('Events');
      // evObj.initEvent('mouseover', true, false);
      // // document.getElementById(elementId).dispatchEvent(evObj);

      // // const mouseoverEvent = new Event('mouseover');
      // arrChildren.forEach((elem, index) => {
      //   elem.dispatchEvent(evObj);
      //   // elem.onmouseover()
      //   // strAddItemRef.current.children[index].dispatchEvent(event);
      //   // strAddItemRef.current.children[index].dispatchEvent(mouseoverEvent);

      //   // strAddItemRef.current.children[index].focus()
      // })
    }

    const handleCancelAdd = () => {
      setAdd(false);
      setId('');
      setTimeout(() => {
        if (addRef.current) addRef.current.textContent = addRef.current.textContent.replace(/,/g, '')

        if (strAddItemRef.current.children && strAddItemRef.current.children.length > 0) {
          Array.from(strAddItemRef.current.children).forEach((atag, index) => {
            strAddItemRef.current.children[index].textContent = strAddItemRef.current.children[index].textContent.replace(/,/g, '')
          })
        }
      }, 0.00001);
    }

    // console.log(auth.user._id, user._id);
    // console.log(user.username, auth.user.username, user);
    // console.log(forallusersflag);
    let randomKey = () => getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString() + getRandomNum(1, 99999).toString()

    return (
      <>
        {/* {
        !forallusersflag && user && user.username === auth.user.username &&
      } */}
        <div className="w-100" style={{ overflowY: 'auto', overflowX: 'auto' }}>
          <Approve
            desc={`¿Estás seguro de que desea eliminar la fila con id terminado en: ...${itemToDelete ? Object.values(itemToDelete)[1].slice(19, Object.values(itemToDelete)[1].length) : ''} ?`}
            isOpen={isOpen}
            handleClose={handleDialogClose}
            handleAction={handleAction}
          />

          <div className={`input-group ${add ? '' : 'd-none'}`}>
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
                  : <div className="col-12 my-1">
                    {/* ref={inputFocus} */}
                    <input type="text" value={values[Object.keys(fields)[0]]} id={Object.keys(fields)[0]} name={Object.keys(fields)[0]} onChange={handleChange}
                      className="form-control"
                      placeholder={`Ingresa ${Object.entries(addstr)[0][1].replace(/,/g, '')}`}
                    />
                  </div>
              }
            </div>

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
          {/* END INPUTS */}

          <div ref={strAddItemRef}>
            {
              ((!forallusersflag && user && user.username === auth.user.username) && (readData.length <= limit || !limit)) &&
              (Object.keys(fields).map((field, index) => (
                callToActionCmpFlag
                  // inputFocus.current.focus(); // Esto es para que el input se quede en foco
                  ? cloneElement(callToActionCmp, { ref: addRef, className: `${add ? 'd-none' : ''}`, onClick: newItem })

                  :
                  // onMouseOver={hoverTitles}
                  <a
                    key={randomKey()} href="#" ref={addRef} className={`${add ? 'd-none' : ''}`} onClick={e => { newItem(e); setValues(fields); }}>{readData && readData.length > 0
                      ? (index == 0 ? newaddstr : '') + '' + Object.entries(addstr).map(placeholder => {
                        return placeholder[0] == field ? (Object.keys(addstr).length == 2 ? placeholder[1].replace('tu', 'un').replace('-', 'y') : placeholder[1].replace('tu', 'un')) : ''
                      })
                      : (index == 0 ? newaddstr : '') + '' + Object.entries(addstr).map(placeholder => {
                        return placeholder[0] == field ? (Object.keys(addstr).length == 2 ? placeholder[1].replace('-', 'y') : placeholder[1]) : ''
                      })}
                  </a>
              )))
            }
          </div>

          {
            !forallusersflag &&
            <>
              {
                (readData && readData.length > 0) ?
                  <div className="mt-2">
                    {
                      optional.tabletype == 'list' &&
                      <>
                        {
                          readData.map((item, index) => (
                            <div className="row ms-1 my-2 border card-crud p-2 w-100" style={{overflow: 'hidden'}} key={randomKey()}>
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
                                        <Tooltip content={`Editar fila`} placement="bottom" className="float-end" style={{ float: 'right' }}>
                                          <i className="text-center justify-content-center h-100 align-items-center d-flex edit-crud-btn  w-100 btn fas float-end fa-edit text-warning pointer"
                                            onClick={() => handleEditItem(item)}></i>
                                        </Tooltip>
                                      </div>
                                      <div className="w-100 col-md-12 mt-2 align-items-center text-center justify-content-center d-flex">
                                        <Tooltip content={`Eliminar fila`} placement="bottom" className="float-end" style={{ float: 'right' }}>
                                          <i style={{
                                            paddingRight: '0.86rem',
                                            paddingLeft: '0.86rem'
                                          }} className="delete-crud-button text-center justify-content-center w-100 btn fas h-100 align-items-center d-flex float-end ms-2 fa-trash text-danger pointer"
                                            onClick={() => { handleDeleteItem(item); }}
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

                      </>
                    }

                    {/* {
              readData && readData.length > 0 &&
              <div className="mt-2">

                {optional.tabletype == 'list' &&
                  <>
                    {
                      readData.map(data => (
                        data.phones && data.phones.map((phone, index) => (
                          <p className="fs-6 fw-semi-bold border-bottom" key={(index.toString() + random.getRandom(5).toString() + getRandomNum(1, 99999).toString()+ getRandomNum(1, 99999)).toString()}>{phone}

                            <Tooltip content={`Eliminar ${newaddstr.split(" ").splice(-1)}`} placement="bottom" className="float-end" style={{ float: 'right', marginRight: '0.5rem' }}>
                              <i className="fas h-100 align-self-center align-items-center d-flex float-end ms-2 fa-trash text-end text-danger pointer"
                              // onClick={() => handleEditItem(phone)}
                              ></i>
                            </Tooltip>

                            <Tooltip content={`Editar ${newaddstr.split(" ").splice(-1)}`} placement="bottom" className="float-end" style={{ float: 'right' }}>
                              <i className="fas float-end fa-edit text-end text-warning pointer"
                                onClick={() => handleEditItem(phone)}></i>
                            </Tooltip>
                          </p>
                        ))
                      ))
                    }
                  </>}

                {
                  optional.tabletype == 'advanced' &&
                  <MTable
                    withSearcher={false}
                    withFiltering={false}
                    withExportButton={false}
                    withPagination={false}
                    title={false}
                    data={readData}
                    columns={[
                      // {
                      //   title: '#',
                      //   field: '_id',
                      //   defaultSort: 'desc'
                      // },
                      {
                        title: 'CELULARES', field: 'phones', render: (rowData) => (
                          <>
                            {
                              rowData.phones.map(item => <>{item.phone.phone}</>)
                              // rowData && rowData.map(item => (
                              //   <p>{item.phone}</p>
                              // ))
                            }
                          </>
                        )
                      },
                      // {
                      //   title: '',
                      //   field: 'name',
                      //   render: (rowData) => (
                      //     <>
                      //       <EditIcon
                      //         className='cursor-pointer'
                      //         onClick={() => handleEditCategory(rowData)}
                      //         title='Editar Categoría'
                      //         color='primary'
                      //       />

                      //       <DeleteIcon
                      //         className='cursor-pointer'
                      //         title='Eliminar Categoría'
                      //         color='secondary'
                      //         onClick={() => {
                      //           handleClickOpen();
                      //           dispatch({
                      //             type: 'ADD_CONFIRM',
                      //             payload: [
                      //               {
                      //                 data: categories,
                      //                 id: rowData._id,
                      //                 title: rowData.name,
                      //                 type: 'ADD_CATEGORIES',
                      //               },
                      //             ],
                      //           });
                      //         }}
                      //       />
                      //     </>
                      //   ),
                      // },
                    ]}
                    grouping={false}
                  // detailPanel={(rowData) => (
                  //   <>
                  //     <table className='table table-striped table-responsive text-center'>
                  //       <thead>
                  //         <tr>
                  //           <th scope='col'>Fecha creación</th>
                  //           <th scope='col'>Fecha actualización</th>
                  //         </tr>
                  //       </thead>
                  //       <tbody>
                  //         <tr>
                  //           <th>{getEsDate(rowData.createdAt)}</th>
                  //           <th>{getEsDate(rowData.updatedAt)}</th>
                  //         </tr>
                  //       </tbody>
                  //     </table>
                  //   </>
                  // )}
                  />}

              </div>
            } */}

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