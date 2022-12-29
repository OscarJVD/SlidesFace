// AQUI SE DEFINE EL NOMBRE PARA SER LLAMADOS del obj ESTADO GLOBAL

import { combineReducers } from "redux"

import alert from "./alertReducer"
import auth from "./authReducer"
import profile from "./profileReducer"
import theme from "./themeReducer"

export default combineReducers({ auth, alert, theme, profile })
