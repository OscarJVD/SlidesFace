import axios from "axios";
// const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: {
      Authorization: token,
      // headers: { Authorization: `Bearer ${token}`
    },
  });
  return res;
};
