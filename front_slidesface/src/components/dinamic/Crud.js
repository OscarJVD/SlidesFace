import { useEffect, useRef, useState } from "react"
import imageCompression from 'browser-image-compression'
import TextField from 'react-autocomplete-input'
import { Oval } from 'react-loader-spinner'
import NumericInput from 'react-numeric-input'
import ReactPasswordToggleIcon from "react-password-toggle-icon"
import { useDispatch } from "react-redux"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Tooltip from "react-simple-tooltip"

import { Box, Modal } from "@mui/material"

import { GLOBAL_TYPES } from "../../redux/actions/globalTypes"
import { postDataAPI, putDataAPI } from "../../utils/fetchData"
import { capFirstLetter, defaultVal, getRandomNum, imageUpload, noEsPrimero, randomKey, sort } from "../../utils/functions"
import Approve from "../alert/Approve"
import Toast from "../alert/Toast"

import MTable from './MTable'

import 'react-autocomplete-input/dist/bundle.css'

const Crud = ({ user, arr, limit, addstr, modelRef = 'user', forallusersflag = false, auth, model = 'user', fields, optional = {
  withDetail: false,
  tableType: 'list'
} }) => {

  let [addTitle, setAddTitle] = useState("")
  let [addTitleAlone, setAddTitleAlone] = useState("")
  let [addTxt, setAddTxt] = useState("Agregar")
  let [add, setAdd] = useState(false)
  let [showValidInputs, setShowValidInputs] = useState({ flag: false, str: '' })
  let [showLoader, setShowLoader] = useState(false)
  let [values, setValues] = useState(fields)
  let [subRows, setSubRows] = useState({})
  let [mTableCols, setMTableCols] = useState([])
  let [readData, setReadData] = useState([])
  const [isArrFields, setIsArrFields] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)
  const dispatch = useDispatch()
  const [open, setOpenModal] = useState(false)
  const [defaultDataList, setDefaultDataList] = useState([])
  const [noResultsSubModel, setNoResultsSubModel] = useState(false)
  const [defaultDataListString, setDefaultDataListString] = useState('')

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleEditItem = (item) => {
    setOpenModal(true)
    console.log('item', item)
    console.log('values', values)
    console.log('fields', fields)
    setId(item._id)
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

    console.log('newObj', newObj)

    setValues(newObj)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const prepareDeleteItem = (item) => {
    setItemToDelete(item)
    handleClickOpen()
  }

  const getItems = async (subModel) => {

    setShowLoader(true)
    let subModelFlag = subModel ? true : false

    let getObj = { model: subModelFlag ? subModel : model }

    if (auth.user._id !== user._id)
      getObj.otherUser = user._id

    let res = await postDataAPI('getDataField', getObj, auth.token)

    console.log('Data subModel', subModel, res)

    if (!res.data.data || res.data.data.length <= 0) {
      setShowLoader(false)
      return console.info('No se encontraron datos para el modelo: ' + subModelFlag ? subModel : model)
    }

    res = sort(res.data.data)

    if (subModelFlag) {
      setShowLoader(false)
      return res
    }

    setReadData([...res])

    let arrSimpleFieldsJoin = []

    if (fields && Array.isArray(fields)) {
      fields.map(field => {
        if (field.hasOwnProperty("tableShow") && field.tableShow == false) {

        } else {
          let newTitle = field.title.toLowerCase().trim().replace('un ', '').replace('tu ', '').trim()

          // SOLO VALIDACIÓN PARA TIPO DE CAMPOS LARGO
          let arrSimpleFieldsJoinProps = {
            field: field.inputAndModelName,
            title: capFirstLetter(newTitle)
          }

          if (field.inputType == 'image') {

            arrSimpleFieldsJoinProps.render = (rowData, index) => (
              <img key={index} src={rowData[field.inputAndModelName] ? rowData[field.inputAndModelName] : "https://res.cloudinary.com/solumobil/image/upload/v1639261011/user/icons8-usuario-masculino-en-c%C3%ADrculo-96_ipicdt.png"} alt="Avatar" style={{ width: '50px' }} />
            )
          }

          arrSimpleFieldsJoin.push(arrSimpleFieldsJoinProps)
        }
      })
    } else {
      Object.keys(fields).map(field => {
        Object.entries(addstr).map(titles => {
          if (field == titles[0]) {
            let newTitle = titles[1].replace('un, ').replace('tu', '').trim()
            arrSimpleFieldsJoin.push({
              field,
              title: capFirstLetter(newTitle)
            })
          }
        })
      })
    }

    let arrColumnsMTable = []

    arrSimpleFieldsJoin.map(field => {

      let arrColsTableProps = {
        title: field.title,
        field: field.field,
        render: field.render,
      }

      arrColumnsMTable.push(arrColsTableProps)
    })

    // Acciones
    arrColumnsMTable.push({
      title: '',
      field: 'anyany',
      render: (rowData, index) => (
        <div className="justify-content-center text-center d-flex align-items-center col-3" key={index}>
          <div className="row align-items-center text-center justify-content-center d-flex">

            <div className="col-md-5 align-items-center text-center justify-content-center d-flex m-1">
              <Tooltip content={`Editar fila`} placement="left" className="">
                <i className="text-center border border-warning justify-content-center h-100 align-items-center d-flex edit-crud-btn  btn fas fa-edit text-warning pointer"
                  onClick={() => handleEditItem(rowData)} />
              </Tooltip>
            </div>

            <div className="col-md-5 align-items-center text-center justify-content-center d-flex m-1">
              <Tooltip content={`Eliminar fila`} placement="left" className="">
                <i style={{
                  paddingRight: '1.07rem',
                  paddingLeft: '1.07rem'
                }} className="delete-crud-button border border-danger text-center justify-content-center btn fas h-100 align-items-center d-flex fa-trash text-danger pointer"
                  onClick={() => { prepareDeleteItem(rowData) }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      ),
    })

    setMTableCols(arrColumnsMTable)
    setShowLoader(false)

    console.log('readData', readData, readData.data, model)
  }

  // EYE ICON
  const showIcon = () => (
    <i className="fas fa-eye pointer" aria-hidden="true" />
  )

  const hideIcon = () => (
    <i className="fas fa-eye-slash pointer" aria-hidden="true" />
  )
  // END EYE ICON

  useEffect(() => {
    /**
   *  Default validations
   */
    if (fields && Array.isArray(fields)) {
      setIsArrFields(true)

      let errorFlag = { bool: false, msg: '' }

      const subModelDupli = []

      fields.forEach(field => {
        if (field.hasOwnProperty('inputAndModelName')) {
          subModelDupli.push(field['inputAndModelName'])
          if (field['inputAndModelName'] == model) {
            errorFlag.bool = true
            errorFlag.msg = `El modelo ${model} no puede ser igual al del campo ${field.hasOwnProperty('title') ? field.title : ''}`
            return console.error(errorFlag.msg)
          }
        }
      })

      if (subModelDupli.some(noEsPrimero)) {
        errorFlag.bool = true
        errorFlag.msg = `No puede haber duplicados en nombres de submodelos`
      }

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
    if (fields && Array.isArray(fields)) {
      setIsArrFields(true)
    } else {
      setIsArrFields(false)
    }

    getItems()

    let addString = addstr ? 'Agrega ' : 'Agregar'
    setAddTxt(addString)
    let str = '', strAlone = '', fieldTitleSet = new Set()

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

  // Seteo de subfilas para datalists y selectores
  useEffect(() => {

    if (fields && Array.isArray(fields)) {
      let subModelsObj = {}

      const setSubModelData = async () => {
        await Promise.all(
          fields.map(async (field) => {
            let dataSubModel = await getItems(field.inputAndModelName)

            if (field.inputAndModelName == 'pruebaloca') {
              console.log('dataSubModel 🙂: ', dataSubModel)
            }

            if (Array.isArray(dataSubModel) && dataSubModel.length > 0) {
              console.log('dataSubModel: ', dataSubModel)
              let dataSubModelArr = []

              dataSubModel.forEach(dataSubMod => {
                dataSubModelArr.push(
                  {
                    name: dataSubMod[field.inputAndModelName],
                    value: dataSubMod[field.inputAndModelName],
                    id: dataSubMod._id
                  }
                )
              })

              if (field.inputAndModelName == 'pruebaloca') {
                console.log('dataSubModelArr 🙂: ', dataSubModelArr)
              }

              subModelsObj[field.inputAndModelName] = dataSubModelArr
            }
          })
        )
      }

      setSubModelData()
      setSubRows(subModelsObj)

      console.log('subModelsObj', subModelsObj)
      console.log('subRows', subRows)
    }

  }, [])
  // END Seteo de subfilas para datalists y selectores

  // REFS
  let inputPasswordIconRef = useRef()
  let addRef = useRef()
  let inputsNewItemRef = useRef()
  // END REFS

  let manyDinamicFieldsFlag = false
  if (typeof fields !== undefined && typeof fields == 'object' && fields) {
    manyDinamicFieldsFlag = true
  } else {
    if (!fields){
      return (
        <span className="text-danger">
          INGRESA EL ID DEL CAMPO POR DEFECTO QUE SE VA A GENERAR DINAMICAMENTE
        </span>
      )
    }
  }

  if (!arr || arr.length <= 0 || Object.keys(arr).length <= 0) {

    const prepareNewItem = e => {
      e.preventDefault()
      setAdd(true)
      setId('')

      setTimeout(() => {
        if (
          inputsNewItemRef.current &&
          inputsNewItemRef.current.children &&
          inputsNewItemRef.current.children.length > 0
        ) {

          Array.from(inputsNewItemRef.current.children).forEach((div, index) => {
            if (
              inputsNewItemRef.current.children[index].children[0] &&
              inputsNewItemRef.current.children[index].children[0].type == 'text' &&
              inputsNewItemRef.current.children[index].children[0].placeholder
            ) {
              inputsNewItemRef.current.children[index].children[0].placeholder = inputsNewItemRef.current.children[index].children[0].placeholder.replace(/,/g, '')
            }
          })
        }
      }, 0.00001)

      let newArr = fields
      setValues(newArr)
    }

    const submitItem = async (subModelFlag = false) => {
      try {
        console.log('item to save or edit', values)

        // return;
        let newValues = {}, newFields = [], tempObj = [], formDataPostFlag = false

        let valuesKeys = Object.keys(values)
        console.log(fields)

        let stopFlag = false, stopMsg = ''

        if (fields && Array.isArray(fields)) {
          fields.forEach(field => {
            if (field.required && !subModelFlag)
              if (!valuesKeys.includes(field.inputAndModelName)) {
                stopFlag = true
                stopMsg = `El campo ${capFirstLetter(field.title.toLowerCase().replace('un ', '').replace('tu ', ''))} es requerido`
              }
          })
        }

        // PREVALIDATION VALUES
        Object.entries(values).forEach((val) => {
          if (typeof val[1] != 'object') {
            newValues[val[0]] = val[1]
          }
          else {
            tempObj.push(val[1])
          }
        })

        if (stopFlag)
          return dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { error: stopMsg ? stopMsg : 'Todos los campos son obligatorios' },
          })

        tempObj.forEach((val) => {
          Object.entries(values).forEach(valueObj => {
            if (val.inputAndModelName == valueObj[0]) {
              let newObj = {}
              newObj = val
              newObj["value"] = valueObj[1]
              newFields.push(newObj)
            }
          })
        })

        // VALIDAR CAMPOS VACIOS
        let entries = Object.entries(newValues)
        let resReturnFlag = false

        entries.map(input => {

          if (input[1] == '' || !input[1]) {
            resReturnFlag = true
            return dispatch({
              type: GLOBAL_TYPES.ALERT,
              payload: { error: 'Todos los campos son obligatorios' },
            })
          }
        })

        if (resReturnFlag) return
        // END VALIDAR CAMPOS VACIOS

        setOpenModal(false)

        // PRE SET EDIT
        let res, newArr = [], resMsg = '', idToEdit

        if (id) {
          idToEdit = id
          setAdd(false)
          setId('')

          if (!subModelFlag) {
            newArr = []

            readData.forEach(row => {
              if (row._id == idToEdit) {
                Object.keys(values).forEach(key => {
                  if (values[key] instanceof Blob) {
                    row[key] = URL.createObjectURL(values[key])
                  } else {
                    row[key] = values[key]
                  }
                })
                newArr.push(row)
              } else {
                newArr.push(row)
              }
            })

            setReadData(newArr)
          }
        }

        // PRE SET EDIT
        setAdd(false)
        // Subida de imagen
        let newFmtValues = values
        for (const key in values) {

          if (values[key].hasOwnProperty('value') && values[key].value instanceof Blob && values[key].value) {

            let media = await imageUpload([values[key].value], {
              preset_name: 'slidesface',
              cloud_name: 'ionix'
            })

            let imageURL = media[0].url
            newFmtValues[key]['value'] = imageURL
          }

          if (!values[key].hasOwnProperty('value') && values[key] instanceof Blob && values[key]) {
            let media2 = await imageUpload([values[key]])
            let imageURL2 = media2[0].url
            newFmtValues[key] = imageURL2
          }
        }

        delete newFmtValues.tableData
        setValues(newFmtValues)
        // END Subida de imagen

        newFields = newFmtValues

        if (id) {
          res = await putDataAPI(`editRow/${idToEdit}`,
            {
              model,
              values,
              forallusersflag
            }, auth.token)
          await getItems()
          resMsg = 'Editado'
        }

        if (!id) {
          setAdd(false)
          setId('')

          if (!subModelFlag) {
            newArr = []
            readData.forEach(row => newArr.push(row))
            newArr.push(values)
            setReadData(newArr)
          }

          console.log('circular dependency')
          console.log({
            model: fields &&
              Array.isArray(fields) &&
              subModelFlag
              ? Object.keys(values)[1]
              : model,
            values,
            fields,
            newFields,
            modelRef,
            forallusersflag,
            subModelFlag
          })

          const body = {
            model: fields &&
              Array.isArray(fields) &&
              subModelFlag
              ? Object.keys(values)[1]
              : model,
            values,
            fields,
            newFields,
            modelRef,
            forallusersflag,
            subModelFlag,
          }

          res = await postDataAPI('createField', body, auth.token)
          await getItems()
          resMsg = 'Creado'
        }

        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { success: resMsg },
        })

      } catch (error) {
        console.error(error)
      }
    }

    const handleChange = ({ e, objCustomInput, isSmartSelect, fieldSmartSelectName }) => {

      let inputAttrs = {}
      if (typeof e == 'string') {
        inputAttrs = objCustomInput
      }
      else if (isSmartSelect && typeof e == 'object') {
        let newObjCustomInput = {
          name: fieldSmartSelectName,
          value: e.hasOwnProperty('value') ? e.value : console.error('ERROR OBJETO AUTOCOMPLETE SELECT')
        }

        inputAttrs = newObjCustomInput
      }
      else {
        inputAttrs = e.target
      }

      const { name, value } = inputAttrs

      console.log(name, value)
      console.log(values)
      setValues({ ...values, [name]: value })

      if (!isSmartSelect) {
        e.target.focus()
      } else {
        if (fields && Array.isArray(fields)) {
          let newSubValuesModel = {}
          newSubValuesModel = values
          newSubValuesModel[name] = value
          setValues(newSubValuesModel)
          submitItem(true) // Send sub model data to the backend
        }
      }

    }

    const handleImage = async (e) => {
      let image = e.target.files[0]

      if (!image) {

        // debugger
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { error: 'La imagen no existe' },
        })
      }
      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        // debugger
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { error: 'El formato de imagen puede ser .jpeg o .png' },
        })
      }

      if (image.size > 1024 * 1024 * 2)
        // 2mb
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            error: 'El tamaño maximo aceptado para la imagen es de 2mb',
          },
        })
      // IMG COMPRESOR
      let options = {
        maxSizeMB: 2, // 1
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }

      let compressedImage
      if (image) compressedImage = await imageCompression(image, options)
      if (!compressedImage)
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { error: 'Error de compresión. Intentalo mas tarde' },
        })

      let definitiveImage = compressedImage

      let indexObjImage, newValuesObje = values

      Object.entries(values).forEach((valu, index) => {
        newValuesObje[valu[0]] = valu[1]
        if (typeof valu[1] == 'object' && (valu[1].inputAndModelName == e.target.name || valu[1].inputAndModelName == e.target.name)) {
          newValuesObje[index].value = definitiveImage
        }
      })

      setValues({ ...values, [e.target.name]: definitiveImage })
    }

    const handleDialogClose = () => {
      setOpen(false)
    }

    const handleDelete = async (action) => {
      try {
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
          setReadData(newArr)
          // END ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO

          handleDialogClose()

          if (!itemToDelete) return console.error('Error, item no encontrado')
          if (!itemToDelete || !itemToDelete._id) {
            setTimeout(async () => {
              await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
            }, 1000)
          }
          await putDataAPI(`softDeleteRow/${itemToDelete._id}`, { model, item: itemToDelete, forallusersflag }, auth.token)
          setShowLoader(false)
          await getItems()

          // ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO
          newArr = []
          readData.forEach(row => {
            if (row._id != itemToDelete._id) newArr.push(row)
          })
          setReadData(newArr)
          // END ACTUALIZAR ESTADO SIN EL ITEM ELIMINADO

          return dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: { success: 'Eliminado' },
          })

        }
      } catch (error) {
        console.error(error)
        throw error
      }
    }

    const handleCancelAdd = () => {
      setOpenModal(false)
      setAdd(false)
      setId('')
    }

    const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(string, results)

      setNoResultsSubModel(false)
      if (subRows && Array.isArray(subRows)) {
        console.log('HAHAHAHH')
        subRows.forEach(subRow => {
          if (subRow != defaultDataListString || !subRows.includes(defaultDataListString)) {
            setNoResultsSubModel(true)
          }
        })
      }

      // if (!results || results.length <= 0 || (results.length == 1 && results[0].id == 1)) setNoResultsSubModel(false)
      // else if (results.length > 1 && results[0].id != 1) {
      //   console.log('HOLA AMIGUITO');
      //   setNoResultsSubModel(true)
      // }
      // else setNoResultsSubModel(false)
      console.log('noResultsSubModel: ', noResultsSubModel)

      console.log('defaultDataListString: ', defaultDataListString)

      // if (string != '' && string != undefined && string != null) {
      setDefaultDataList([{
        name: string,
        value: string,
        id: 1,
      }])
      setDefaultDataListString(string)

      console.log('defaultDataListString: ', defaultDataListString)
      console.log('defaultDataList: ', defaultDataList)

      // }
    }

    const handleOnHover = (result) => {
      // the item hovered
      console.log(result)
      // setDefaultDataListString(defaultDataListString)
    }

    const handleOnSelect = (item) => {
      // the item selected
      console.log(item)
      // setDefaultDataListString(defaultDataListString)

      // if(item.id == 1){

      // }
    }

    const handleOnFocus = () => {
      // console.log('Focused')
      // if (defaultDataListString) {
      // setDefaultDataListString(defaultDataListString)
      // } else {
      //   setDefaultDataListString('')

      // }
      // setDefaultDataListString(defaultDataListString)

    }

    const handleOnClear = () => {
      // setDefaultDataListString('')
    }

    const formatResult = (item) => {

      // setNoResultsSubModel(false)
      // if (subRows && Array.isArray(subRows)) {
      //   subRows.forEach(subRow => {
      //     if (subRow != defaultDataListString || !subRows.includes(defaultDataListString)) {
      //       setNoResultsSubModel(true)
      //     }
      //   })
      // }

      return (
        <>
          {!noResultsSubModel && <i className="fas fa-plus" />} {item.name}
          {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
          {/* <span style={{ display: 'block', textAlign: 'left' }}>name:  */}

          {/* </span> */}
        </>
      )
    }

    // --------- Datalist ----------
    const addItemDatalist = (field, value) => {
      console.log(field)
      console.log(value)
      console.log(values)

      submitItem(true)
    }

    let inputsBox =
      <div className={`input-group ${add ? '' : 'd-none'}`}>

        {/* INPUTS */}
        <div ref={inputsNewItemRef} className="justify-content-center" style={{ display: 'contents' }}>
          {
            manyDinamicFieldsFlag
              ?
              // Tipos de campos (TEXT😉, DATALIST, NUMBER, DATE, DATETIME, SELECT(MULTIPLE), CHECKBOX, TOGGLE, RADIO BUTTON, RANGE, COLOR)
              (
                isArrFields || Array.isArray(fields)
                  ?
                  fields.map((field, index) => ( // En construcción lo dinamico muy dinamico
                    <div className="col-12 my-1" style={{ zIndex: '500' }} key={index}>

                      {
                        subRows
                        && Object.keys(subRows).length > 0
                        && (
                          Object
                            .keys(subRows)
                            .map((subRow, index) =>
                            (
                              subRow == field.inputAndModelName &&
                              field.inputType == 'autocomplete' &&

                              <ReactSearchAutocomplete
                                fuseOptions={{ keys: ["name", "value"] }}
                                resultStringKeyName="value"
                                name={field.inputAndModelName}
                                value={values[field.inputAndModelName]
                                  ? values[field.inputAndModelName]
                                  : defaultVal(field.type)}
                                showClear={true}
                                key={index}
                                showItemsOnFocus={true}
                                inputDebounce={0}
                                onSearch={handleOnSearch}
                                onHover={handleOnHover}
                                onSelect={(e) => handleChange(
                                  {
                                    e,
                                    isSmartSelect: true,
                                    fieldSmartSelectName: field.inputAndModelName
                                  }
                                )}
                                onFocus={handleOnFocus}
                                onClear={handleOnClear}
                                inputSearchString={defaultDataListString}
                                items={
                                  subRows[subRow] &&
                                    Array.isArray(subRows[subRow]) &&
                                    subRows[subRow].length > 0
                                    ? (noResultsSubModel
                                      ? subRows[subRow]
                                      : defaultDataList)
                                    : defaultDataListString
                                      ? defaultDataList
                                      : []
                                }
                                autoFocus
                                formatResult={formatResult}
                              />

                            ))
                        )
                      }

                      {
                        ((field.inputType == 'text' || field.inputType == 'string' || !field.inputType) &&
                          <input
                            type="text"
                            value={values[field.inputAndModelName]
                              ? values[field.inputAndModelName]
                              : defaultVal(field.type)}
                            id={field.inputAndModelName}
                            name={field.inputAndModelName}
                            onChange={(e) => handleChange({ e })}
                            className="form-control"
                            placeholder={`Ingresa ${field.title.toLowerCase()}`}
                          />
                        )
                      }

                      {
                        subRows && Object.keys(subRows).length > 0
                          ? Object.keys(subRows).map((subRow, index) => (
                            subRow == field.inputAndModelName &&
                            field.inputType == 'datalist' &&

                            <div className="d-flex" key={index}>
                              <input
                                autoComplete="off"
                                id={field.inputAndModelName}
                                name={field.inputAndModelName}
                                value={
                                  values[field.inputAndModelName]
                                    ? values[field.inputAndModelName]
                                    : defaultVal(field.type)
                                }
                                onChange={(e) => handleChange({ e })}
                                className="form-control"
                                placeholder="Buscar y seleccionar"
                                list="list"
                              />

                              <datalist id="list" autoComplete="off">
                                {
                                  subRows[subRow].map(subR => (
                                    <option label="HOLA" value="HOLA" />
                                  ))
                                }
                                <option label="oscar" value="oscar" />
                                <option label="clau" value="clau" />
                              </datalist>

                              {
                                values[field.inputAndModelName] &&
                                <button onClick={() => addItemDatalist(field.inputAndModelName, values[field.inputAndModelName])} type="button" className="m-1 btn btn-primary btn-sm">
                                  <i className="fas fa-plus" />
                                </button>
                              }
                            </div>

                          ))
                          : <div className="d-flex" key={index}>
                            <input
                              autoComplete="off"
                              id={field.inputAndModelName}
                              name={field.inputAndModelName}
                              value={
                                values[field.inputAndModelName]
                                  ? values[field.inputAndModelName]
                                  : defaultVal(field.type)
                              }
                              onChange={(e) => handleChange({ e })}
                              className="form-control"
                              placeholder="Buscar y seleccionar"
                              list="list"
                            />

                            <datalist id="list" autoComplete="off" />

                            {
                              values[field.inputAndModelName] &&
                              <button onClick={() => addItemDatalist(field.inputAndModelName, values[field.inputAndModelName])} type="button" className="m-1 btn btn-primary btn-sm">
                                <i className="fas fa-plus" />
                              </button>
                            }
                          </div>
                      }

                      {
                        ((field.inputType == 'image') &&

                          <div className="mb-3">
                            <label htmlFor={field.inputAndModelName} className="form-label">{`Ingresa ${field.title.toLowerCase()}`}</label>
                            <input
                              type="file"
                              value={
                                values[field.inputAndModelName]
                                  ? values[field.inputAndModelName]
                                  : defaultVal(field.type)
                              }
                              id={field.inputAndModelName}
                              name={field.inputAndModelName}
                              onChange={handleImage}
                              className="form-control"
                              placeholder={`Ingresa ${field.title.toLowerCase()}`}
                            />
                          </div>
                        )
                      }

                      {
                        ((field.inputType == 'password') &&

                          <div className="form-group">
                            <div className="position-relative">
                              <input
                                type="password"
                                ref={inputPasswordIconRef}
                                value={values[field.inputAndModelName]
                                  ? values[field.inputAndModelName]
                                  : defaultVal(field.type)}
                                id={field.inputAndModelName}
                                name={field.inputAndModelName}
                                onChange={(e) => handleChange({ e })}
                                className="form-control my-2"
                                placeholder={`Ingresa ${field.title.toLowerCase()}`}
                              />

                              <ReactPasswordToggleIcon
                                inputRef={inputPasswordIconRef}
                                showIcon={showIcon}
                                hideIcon={hideIcon}
                              />
                            </div>
                          </div>
                        )
                      }

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
                              value={values[field.inputAndModelName]
                                ? values[field.inputAndModelName]
                                : defaultVal(field.type)}
                              id={field.inputAndModelName}
                              name={field.inputAndModelName}
                              onChange={(e) => handleChange({ e })}
                              className="form-check-input"
                            />
                            &nbsp;{capFirstLetter(field.title)}
                          </label>)
                      }

                      {
                        ((field.inputType == 'select') &&
                          <div className="input-group mb-3 p-2">

                            <select
                              aria-label="Example text with button addon" aria-describedby="button-addon1"
                              value={values[field.inputAndModelName]
                                ? values[field.inputAndModelName]
                                : defaultVal(field.type)}
                              id={field.inputAndModelName}
                              name={field.inputAndModelName}
                              onChange={(e) => handleChange({ e })}
                              required={field.required}
                              className="form-select my-2"
                              style={{ height: '50px' }}>
                              <option selected value="">{capFirstLetter(field.title)}</option>
                            </select>

                            <button className="btn btn-sm btn-primary my-2 px-3" style={{ height: '50px' }} type="button" id="button-addon1">
                              <i className="fas fa-plus" />
                            </button>
                          </div>)

                      }

                      {
                        ((field.inputType == 'number') &&
                          <NumericInput
                            value={values[field.inputAndModelName]
                              ? values[field.inputAndModelName]
                              : defaultVal(field.type)}
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

                    </div>
                  ))
                  :
                  Object.keys(fields).map((field, index) => ( // En construcción lo dinamico muy dinamico
                    <div className="col-12 my-1" key={index}>

                      {
                        field.inputType == 'select' &&
                        <select
                          value={values[field]}
                          id={field}
                          name={field}
                          onChange={(e) => handleChange({ e })}
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
                          // id={field}
                          name={field}
                          onChange={(e) => handleChange({ e })}
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
              :
              // Nunca va a llegar acá
              <div className="col-12 my-1">
                <input type="text" value={values[Object.keys(fields)[0][0]]} id={Object.keys(fields)[0][0]} name={Object.keys(fields)[0][0]} onChange={(e) => handleChange({ e })}
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
              onClick={e => submitItem()}
              className={`btn mb-1 btn-${id ? 'warning' : 'primary'} btn-sm text-initial`}
            >
              <i className={`fas fa-${id ? 'edit' : 'save'}`} /> {id ? 'Editar' : 'Guardar'}
            </button>
          </Tooltip>

          <Tooltip content="Cancelar" placement="bottom">
            <button
              type="button"
              onClick={handleCancelAdd}
              className="btn mb-1 btn-danger btn-sm text-initial ms-2"
            >
              <i className="fas fa-window-close" /> Cancelar
            </button>
          </Tooltip>
        </div>
      </div>

    return (
      <>
        <div className="w-100 p-4">
          {/* <SimpleModalWrapped /> */}

          {
            showValidInputs.flag &&
            <Toast
              msg={{ title: showValidInputs.str, body: "" }}
              handleShow={() => {
                setShowValidInputs(false)
                dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })
              }}
              bgColor="bg-danger"
              onlyTitle={true}
            />
          }

          <Approve
            desc={`¿Estás seguro de que desea eliminar la fila ${itemToDelete && Object.values(itemToDelete)[1] ? 'con id terminado en: ...' + Object.values(itemToDelete)[1].slice(19, Object.values(itemToDelete)[1].length) + '?' : ''}`}
            isOpen={isOpen}
            handleClose={handleDialogClose}
            handleAction={handleDelete}
          />

          <Modal
            hideBackdrop
            open={open}
            onClose={(_, reason) => {
              if (reason !== "backdropClick") {
                handleClose()
              }
            }}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: "auto" }}>
              {inputsBox}
            </Box>
          </Modal>

          {!id && inputsBox}
          {/* END SAVE - EDIT - CANCEL BUTTON */}

          {/* ADD NEW REGISTER BUTTON */}
          <div role="create button" className={`mb-3 ${(optional && optional.textAddBtnType && optional.textAddBtnType != 'simple') ? 'text-left justify-content-start' : 'text-right justify-content-end float-right'}`}>
            {
              !optional || optional.addBtnType == 'a' || !optional.hasOwnProperty('addBtnType') &&
              ((!forallusersflag && user && user.username === auth.user.username) && (readData.length < limit || !limit)) &&
              <a href="#" className={`h-100 d-flex align-items-center ${add ? 'd-none' : ''}`} onClick={prepareNewItem}>
                <i className="fas fa-lg fa-plus-circle" />&nbsp;
                <span ref={addRef}>
                  {optional && optional.textAddBtnType && optional.textAddBtnType != 'simple' ? addTitle : 'Nuevo'}
                </span>
              </a>
            }

            {
              optional && optional.addBtnType == 'button' &&
              ((!forallusersflag && user && user.username === auth.user.username) && (readData.length < limit || !limit)) &&
              <button className={`btn btn-primary h-100 d-flex align-items-center ${add ? 'd-none' : ''}`} onClick={prepareNewItem}>
                <i className="fas fa-lg fa-plus-circle" />&nbsp;
                <span ref={addRef}>
                  {optional && optional.textAddBtnType && optional.textAddBtnType != 'simple' ? addTitle : 'Nuevo'}
                </span>
              </button>
            }
          </div>

          {
            !forallusersflag &&
            <div className="mt-2 w-100">
              {
                optional.tableType == 'list' &&
                <>
                  {
                    !showLoader && readData.map((item, index) => (
                      <div className="row w-100 ms-1 my-2 border card-crud p-2" style={{ overflow: 'hidden' }} key={randomKey()}>
                        <div className={`mb-2 col-${(!forallusersflag && user && user.username !== auth.user.username) ? '12' : '9'}`}>
                          {
                            isArrFields || Array.isArray(fields)
                              ? fields.map((fieldMap, fieldIndex) => (
                                <div key={randomKey()}>

                                  {
                                    fieldMap.inputType == 'password' &&
                                    <input type="password" className="form-control border-0 d-block ps-0 pb-0 mb-0" disabled value={item[fieldMap.inputAndModelName]} />
                                  }

                                  {
                                    fieldMap.inputType != 'password' &&
                                    <p
                                      className={`fs-6 fw-semi-bold border-bottom ${fieldIndex > 0 ? 'mt-2' : ''} pb-0 mb-0 ${fieldIndex == 0 ? 'pt-2' : ''}`}
                                      style={{ wordWrap: 'break-word' }}>
                                      {
                                        item[fieldMap.inputAndModelName]
                                      }
                                    </p>
                                  }

                                  <span className="fw-bold text-muted p-0 fs-8 fst-italic text-capitalize">
                                    {fieldMap && fieldMap.title && fieldMap.title.replace('un', '')}
                                  </span>
                                </div>
                              ))
                              : Object.keys(fields).map((fieldMap, fieldIndex) => (
                                <div key={randomKey()}>
                                  <p className={`fs-6 fw-semi-bold border-bottom ${fieldIndex > 0 ? 'mt-2' : ''} pb-0 mb-0 ${fieldIndex == 0 ? 'pt-2' :
                                    ''}`} style={{ wordWrap: 'break-word' }} key={randomKey()}>{item[isArrFields || Array.isArray(fields) ? fieldMap : fieldMap]}</p>
                                  {
                                    <span className="fw-bold text-muted p-0 fs-8 fst-italic text-capitalize">
                                      {
                                        readData && readData.length > 0
                                          ? Object.entries(addstr).map(placeholder => {
                                            return placeholder[0] == fieldMap
                                              ? (Object.keys(addstr).length == 2 ? placeholder[1].replace('tu', '').replace('-', '').replace(' - ', '').replace('>', '').replace('y', '')
                                                : placeholder[1].replace('tu', '')).replace('-', '').replace(' - ', '').replace('>', '').replace('y', '') : ''
                                          })
                                          : Object.entries(addstr).map(placeholder => {
                                            return placeholder[0] == fieldMap
                                              ? (Object.keys(addstr).length == 2
                                                ? placeholder[1].replace('-', '').replace(' - ', '').replace('>', '').replace('y', '')
                                                : placeholder[1]).replace('-', '').replace(' - ', '').replace('>', '').replace('y', '')
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
                            <div className="justify-content-center text-center d-flex align-items-center col-3" key={randomKey()}>
                              <div className="row align-items-center text-center justify-content-center d-flex">

                                <div className="col-md-5 align-items-center text-center justify-content-center d-flex m-1">
                                  <Tooltip content={`Editar fila`} placement="left" className="">
                                    <i className="text-center border border-warning justify-content-center h-100 align-items-center d-flex edit-crud-btn  btn fas fa-edit text-warning pointer"
                                      onClick={() => handleEditItem(item)} />
                                  </Tooltip>
                                </div>

                                <div className="col-md-5 align-items-center text-center justify-content-center d-flex m-1">
                                  <Tooltip content={`Eliminar fila`} placement="left" className="">
                                    <i style={{
                                      paddingRight: '1.07rem',
                                      paddingLeft: '1.07rem'
                                    }} className="delete-crud-button border border-danger text-center justify-content-center btn fas h-100 align-items-center d-flex fa-trash text-danger pointer"
                                      onClick={() => { prepareDeleteItem(item) }}
                                    />
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

              {
                optional.tableType == 'table' &&
                <MTable
                  title={<h3 className='text-uppercase'>{optional.generalTitle}</h3>}
                  data={readData}
                  columns={mTableCols}
                />
              }

            </div>
          }
        </div>

      </>
    )
  }
}

export default Crud