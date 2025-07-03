import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "x-init-data":process.env.REACT_APP_INIT_DATA ?? window.Telegram.WebApp.initData
  },
});

export default $api;