


import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, } from 'react-redux';
import store from './store/index'
import App from "./App";

import './css/Main.css'
import './css/Fonts.css'
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

window.Buffer = window.Buffer || require("buffer").Buffer;

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <TonConnectUIProvider manifestUrl="https://gray-adequate-kiwi-828.mypinata.cloud/ipfs/bafkreib36s6k32hcllx3zqqbwhlac7eqjwquwe3rqvux2pxsljioxl2t4i">
                <App />
            </TonConnectUIProvider>
        </Provider>
    // </React.StrictMode> */}
);



