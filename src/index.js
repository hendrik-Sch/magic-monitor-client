import React from 'react';
import ReactDOM from 'react-dom/client';
import 'moment/locale/de';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

fetch("./config.json")
    .then(res => res.json())
    .then(config => {
        root.render(
            <React.StrictMode>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
                    <App config={config} />
                </LocalizationProvider>
            </React.StrictMode>
        );
    });