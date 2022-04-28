import { cloneElement, useEffect, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { deleteDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";
import { getEsDate, sort } from "../../utils/functions";
import Approve from "../alert/Approve";
import MTable from './MTable';

const Crud = ({ arr, addstr, modelRef, forallusersflag, auth, model, fields, optional, callToActionCmp, callToActionCmpFlag }) => {

  console.log('optional', optional)
  /**
   * optional
   *  - withModal
   *  -  tabletype(Advanced, Basic, list)
   *  - With Detail only for advanced table
   */
  // console.log(auth)
  let addRef = useRef()
  let [add, setAdd] = useState(false)
  let [values, setValues] = useState(fields)
  let [readData, setReadData] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [id, setId] = useState('');
  const [itemToDelete, setItemToDelete] = useState()

  const getItems = async () => {
    let res = await postDataAPI('getDataField', { model, fieldsAndValues: values, fields }, auth.token)
    console.log(res);
    if (res.data.data && res.data.data.length > 0) {
      console.log(res.data.data)
      res = sort(res.data.data)
      console.log(res)
      setReadData(res)
    }
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

  if (!model) model = 'user'
  let newaddstr = 'Agregar'
  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {
    newaddstr = addstr ? 'Agrega ' : 'Agregar'

    const newItem = e => {
      e.preventDefault()
      setAdd(true)
      setId('')
    }

    const saveItem = async () => {
      try {
        console.log('item to save or edit', values)
        let res;
        let newArr = []
        if (id) {
          newArr = []
          readData.forEach(row => {
            if (row._id == id) {
              row[Object.keys(values)[0]] = Object.values(values)[0]
              newArr.push(row)
            } else {
              newArr.push(row)
            }
          })

          setReadData(newArr);

          res = await putDataAPI(`editRow/${id}`, { model, values, forallusersflag }, auth.token)
          await getItems()
        } else {
          newArr = []
          readData.forEach(row => {
            newArr.push(row)
          })

          newArr.push(values)

          setReadData(newArr);

          res = await postDataAPI('createField', { model, values, fields, modelRef, forallusersflag }, auth.token)
          await getItems()
        }

        console.log('res', res);
        // setReadData(res.data.data)
        console.log(readData)

      } catch (error) {
        console.error(error)
      }
    }

    const handleChange = e => {
      const { name, value } = e.target;

      console.log(name, value);
      setValues({ ...values, [name]: value });
    }

    const handleEditItem = (item, field) => {
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setId(item._id);
      setAdd(true)
      setValues({ ...values, [Object.keys(fields)[0]]: item[field] });
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleDialogClose = () => {
      setOpen(false);
    };

    const handleDeleteItem = (item, field) => {
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setItemToDelete(item)
      handleClickOpen()
    };

    const handleAction = async (action) => {
      try {
        console.log(action)
        if (action == 'cancel') {
          setItemToDelete(null)
          handleDialogClose()
        } else {
          let newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })

          // console.log('newArr')
          // console.log(newArr)
          setReadData(newArr);
          handleDialogClose()
          console.log(itemToDelete)
          console.log(auth.token);
          if (!itemToDelete) return console.error('Error, item no encontrado')
          await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
          await getItems()
        }
      } catch (error) {
        console.error(error);
        throw error
      }
    };

    return (
      <>
        <Approve
          desc={`¿Estás seguro de que desea eliminar el registro ${itemToDelete ? Object.values(itemToDelete)[3] + ' con id No. ' + Object.values(itemToDelete)[1] : ''}?`}
          isOpen={isOpen}
          handleClose={handleDialogClose}
          handleAction={handleAction}
        />
        {/* d-flex -- INPUTS*/}
        <div className={`input-group ${add ? '' : 'd-none'}`}>
          {
            manyDinamicFieldsFlag
              ? Object.keys(fields).map(field => ( // En construcción lo dinamico muy dinamico
                <div className="col-12">
                  <input type="text" value={values[field]} id={field} name={field} onChange={handleChange}
                    className="form-control"

                    placeholder={Object.entries(addstr).forEach(placeholder => {
                      if (placeholder[0] == field) {
                        return 'Ingresa ' + placeholder[1]
                      }
                    })}
                  />
                </div>
              ))
              : <div className="col-12">
                <input type="text" value={values[Object.keys(fields)[0]]} id={Object.keys(fields)[0]} name={Object.keys(fields)[0]} onChange={handleChange}
                  className="form-control"
                  placeholder={`Ingresa ${Object.entries(addstr)[0][1]}`}
                />
              </div>
          }

          <div className="col-12 justify-content-center text-center mt-2">
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
                onClick={() => { setAdd(false); setId('') }}
                className="btn btn-danger btn-sm text-initial ms-2"
              >
                <i className="fas fa-window-close"></i> Cancelar
              </button>
            </Tooltip>
          </div>
        </div>
        {/* END INPUTS */}


        {
          Object.keys(fields).map(field => (
            callToActionCmpFlag
              ? cloneElement(callToActionCmp, { ref: addRef, className: `${add ? 'd-none' : ''}`, onClick: newItem })
              : <a href="#" ref={addRef} className={`${add ? 'd-none' : ''}`} onClick={e => { newItem(e); setValues(fields) }}>{readData && readData.length > 0
                ? newaddstr + '' + Object.entries(addstr).map(placeholder => {
                  return placeholder[0] == field ? placeholder[1].replace('tu', 'un') : 'item'
                })
                : newaddstr + '' + Object.entries(addstr).map(placeholder => {
                  return placeholder[0] == field ? placeholder[1] : 'item'
                })}
              </a>
          ))
        }

        {/* // Si si hay datos */}
        {
          readData && readData.length > 0 &&
          <div className="mt-2">
            {
              optional.tabletype == 'list' &&
              <>
                {
                  readData.map((item, index) => (
                    Object.keys(fields).map(field => (
                      <p className="fs-6 fw-semi-bold border-bottom" key={index}>{item[field]}

                        <Tooltip content={`Eliminar ${Object.entries(addstr).map(placeholder => {
                          return placeholder[0] == field ? placeholder[1] : 'item'
                        })}`} placement="bottom" className="float-end" style={{ float: 'right', marginRight: '0.5rem' }}>
                          <i className="fas h-100 align-self-center align-items-center d-flex float-end ms-2 fa-trash text-end text-danger pointer"
                            onClick={() => handleDeleteItem(item, field)}
                          ></i>
                        </Tooltip>

                        <Tooltip content={`Editar ${Object.entries(addstr).map(placeholder => {
                          return placeholder[0] == field ? placeholder[1] : 'item'
                        })}`} placement="bottom" className="float-end" style={{ float: 'right' }}>
                          <i className="fas float-end fa-edit text-end text-warning pointer"
                            onClick={() => handleEditItem(item, field)}></i>
                        </Tooltip>
                      </p>
                    ))
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
                          <p className="fs-6 fw-semi-bold border-bottom" key={index}>{phone}

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
        }

      </>
    )
  }
}

export default Crud