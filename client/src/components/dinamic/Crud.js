import { cloneElement, useEffect, useRef, useState } from "react";
import Tooltip from "react-simple-tooltip";
import { postDataAPI, putDataAPI } from "../../utils/fetchData";
import { getEsDate } from "../../utils/functions";
import MTable from './MTable';

const Crud = ({ arr, addstr, forallusersflag, auth, model, fields, optional, callToActionCmp, callToActionCmpFlag }) => {

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
  const [id, setId] = useState('');

  useEffect(() => {

    let res;
    const getItems = async () => {
      res = await postDataAPI('getDataField', { model, fieldsAndValues: values }, auth.token)
      console.log(res);
      setReadData(res.data.data.Users[0])
      console.log('readData', readData);
    }

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

  if (!model) model = 'Users'
  // console.log('auth.token', auth, typeof auth)

  // Si no hay datos
  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {
    let newaddstr = addstr ? 'Agrega ' + addstr : 'Agregar'

    const newItem = e => {
      e.preventDefault()
      setAdd(true)
    }

    const saveItem = async () => {
      console.log('valuesSS', values)
      let res;
      if (id) {
        res = await putDataAPI(`editRow/${id}`, { model, values, forallusersflag }, auth.token)
      } else {
        res = await postDataAPI('createField', { model, values, forallusersflag }, auth.token)
      }
      console.log('values', values)
      console.log('res', res);
    }

    const handleChange = e => {
      const { name, value } = e.target;

      console.log(name, value);
      setValues({ ...values, [name]: value });
    }

    // Editar Categoría
    const handleEditItem = (item) => {
      console.log('item', item);
      console.log('values', values);
      console.log('fields', fields);
      setId(item._id);
      setAdd(true)
      setValues({ ...values, [Object.keys(fields)[0]]: item.phone });
      // Object.keys(obj)[0]
      // setName(category.name);
      // setCancelUpdate('d-inline');
    };

    return (
      <>
        {/* d-flex -- INPUTS*/}
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
        {/* END INPUTS */}

        {
          callToActionCmpFlag
            ? cloneElement(callToActionCmp, { ref: addRef, className: `${add ? 'd-none' : ''}`, onClick: newItem })
            : <a href="#" ref={addRef} className={`${add ? 'd-none' : ''}`} onClick={newItem}>{readData && readData.length > 0 ? newaddstr.replace('tu', 'un') : newaddstr}
            </a>
        }

        {/* // Si si hay datos */}
        {
          readData && readData.phones &&
          <div className="mt-2">
            {
              optional.tabletype == 'list' &&
              <>
                {
                  readData.phones.map((item, index) => (
                    <p className="fs-6 fw-semi-bold border-bottom" key={index}>{item.phone}

                      <Tooltip content={`Eliminar ${newaddstr.split(" ").splice(-1)}`} placement="bottom" className="float-end" style={{ float: 'right', marginRight: '0.5rem' }}>
                        <i className="fas h-100 align-self-center align-items-center d-flex float-end ms-2 fa-trash text-end text-danger pointer"
                        // onClick={() => handleEditItem(item)}
                        ></i>
                      </Tooltip>

                      <Tooltip content={`Editar ${newaddstr.split(" ").splice(-1)}`} placement="bottom" className="float-end" style={{ float: 'right' }}>
                        <i className="fas float-end fa-edit text-end text-warning pointer"
                          onClick={() => handleEditItem(item)}></i>
                      </Tooltip>
                    </p>
                  ))
                }
              </>
            }

            {
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
            }

          </div>
        }

      </>
    )
  }
}

export default Crud