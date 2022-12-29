import axios from "axios"
// const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getDataAPI = async (url, token) => {
  return await axios.get(`/api/${url}`, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  })
}

export const postDataAPI = async (url, post, token) => {
  return await axios.post(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  })
}

export const putDataAPI = async (url, post, token) => {
  return await axios.put(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  })
}

export const patchDataAPI = async (url, post, token) => {
  return await axios.patch(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  })
}

export const deleteDataAPI = async (url, token) => {
  return await axios.delete(`/api/${url}`, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  })
}
