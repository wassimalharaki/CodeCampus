import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import { Provider } from "react-redux";
import store, {Persistor} from "./Store/store.js"
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store = {store}>
            <PersistGate persistor = {Persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);