import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
    "x-init-data": window.Telegram.WebApp.initData,
  },
});

export default $api;