import axios from "axios";
import parseTelegramData from "../functions/parseTelegramData";

const $api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "x-init-data": parseTelegramData(window.Telegram.WebApp.initData),
  },
});

export default $api;